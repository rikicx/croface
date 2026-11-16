#!/usr/bin/env python3
"""
CROFACE — gera uma cópia autocontida do site.

Cada página vira UM arquivo .html que abre direto do disco (duplo clique),
sem servidor e sem nenhum arquivo externo:

- CSS embutido em <style>, com as fontes (Inter Tight e Allura) em data URI;
- JavaScript (abertura com o logo + comportamento do site) embutido em <script>;
- ícones: o sprite assets/icons.svg vai inline no topo do <body>;
- fotos, logos e favicons embutidos em data URI (base64);
- links entre páginas reescritos para os arquivos da cópia
  ("/implante-dentario-vila-mariana/#x" -> "implante-dentario-vila-mariana.html#x").

O que fica igual ao original: textos, títulos, meta description, canonical,
robots, Open Graph, Twitter Card, JSON-LD, alt das imagens, width/height,
loading/decoding/fetchpriority, classes, data-* (eventos de conversão) e todas
as animações (CSS + JS).

Decisões (ver _entrega/copia-html/LEIA-ME.txt):
- Em cada <picture>, entra só a versão WebP na maior resolução do srcset.
  O CSS do site já exige navegador moderno (aspect-ratio, svh), que lê WebP;
  repetir o JPG e as versões menores só triplicaria o arquivo, porque numa
  cópia autocontida tudo é baixado de uma vez.
- og:image, canonical e JSON-LD continuam apontando para https://croface.com.br:
  robôs e redes sociais exigem URL absoluta (data URI não vale nesses campos).
- O mapa do Google continua "clique para carregar": é um serviço externo por
  natureza e só é acionado se a pessoa pedir.

Uso:  python3 _entrega/gerar-copia-html.py
Saída: _entrega/copia-html/  e  _entrega/croface-copia-html.zip (a mesma pasta compactada)
"""
import base64
import pathlib
import re
import sys
import zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / '_entrega' / 'copia-html'
ZIP = ROOT / '_entrega' / 'croface-copia-html.zip'

MIME = {
    '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
}

_cache = {}
problems = []


def local_path(url, base=ROOT):
    """'/assets/img/x.webp?v=3' -> Path no disco (relativo à raiz do site ou a `base`)."""
    clean = url.split('#')[0].split('?')[0]
    p = (ROOT / clean.lstrip('/')) if clean.startswith('/') else (base / clean)
    p = p.resolve()
    if ROOT not in p.parents:
        raise ValueError(f'caminho fora do site: {url}')
    return p


def data_uri(url, base=ROOT):
    p = local_path(url, base)
    if p not in _cache:
        mime = MIME.get(p.suffix.lower())
        if not mime:
            raise ValueError(f'tipo não previsto: {p}')
        _cache[p] = f'data:{mime};base64,' + base64.b64encode(p.read_bytes()).decode('ascii')
    return _cache[p]


def best_candidate(srcset):
    """Escolhe a maior resolução de um srcset ('a.webp 960w, b.webp 1920w' -> 'b.webp')."""
    best, best_w = None, -1
    for cand in srcset.split(','):
        parts = cand.strip().split()
        if not parts:
            continue
        w = 0
        if len(parts) > 1:
            d = parts[1]
            w = float(d[:-1]) * (1 if d.endswith('w') else 10000)
        if w > best_w:
            best, best_w = parts[0], w
    return best


def get_attr(tag, name):
    m = re.search(r'\s' + name + r'="([^"]*)"', tag)
    return m.group(1) if m else None


def set_attr(tag, name, value):
    if get_attr(tag, name) is not None:
        return re.sub(r'(\s' + name + r'=")[^"]*(")', lambda m: m.group(1) + value + m.group(2), tag, count=1)
    return re.sub(r'^<(\w+)', lambda m: f'<{m.group(1)} {name}="{value}"', tag, count=1)


def del_attr(tag, name):
    return re.sub(r'\s' + name + r'="[^"]*"', '', tag)


# ---------------------------------------------------------------- recursos comuns
css_path = ROOT / 'assets' / 'css' / 'site.css'
CSS = css_path.read_text(encoding='utf-8')
CSS = re.sub(
    r'url\((["\']?)([^)"\']+)\1\)',
    lambda m: m.group(0) if m.group(2).startswith('data:') else f'url("{data_uri(m.group(2), css_path.parent)}")',
    CSS,
)
if '</style' in CSS:
    sys.exit('site.css contém "</style": não dá para embutir com segurança.')

INTRO_JS = (ROOT / 'assets' / 'js' / 'intro.js').read_text(encoding='utf-8')
HOME_TEST = "var home = location.pathname === '/' || location.pathname === '/index.html';"
if HOME_TEST not in INTRO_JS:
    sys.exit('intro.js mudou: atualize HOME_TEST neste script.')

SITE_JS = (ROOT / 'assets' / 'js' / 'site.js').read_text(encoding='utf-8')
for name, js in (('intro.js', INTRO_JS), ('site.js', SITE_JS)):
    if '</script' in js.lower():
        sys.exit(f'{name} contém "</script": não dá para embutir com segurança.')

sprite = (ROOT / 'assets' / 'icons.svg').read_text(encoding='utf-8')
SPRITE = re.sub(
    r'^\s*<svg\b[^>]*>',
    '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" '
    'style="position:absolute;width:0;height:0;overflow:hidden">',
    sprite.strip(), count=1,
)
SPRITE_IDS = set(re.findall(r'<symbol id="([^"]+)"', SPRITE))

# ---------------------------------------------------------------- páginas
SLUGS = sorted(p.parent.name for p in ROOT.glob('*/index.html') if not p.parent.name.startswith(('_', '.')))
PAGES = [('index.html', 'index.html')] + [(f'{s}/index.html', f'{s}.html') for s in SLUGS] + [('404.html', '404.html')]


def rewrite_internal(href):
    """Links do site ('/', '/#x', '/slug/', '/slug/#x') -> arquivos da cópia."""
    path, _, frag = href.partition('#')
    frag = f'#{frag}' if frag else ''
    path = path.split('?')[0]
    if path in ('/', '/index.html'):
        return 'index.html' + frag
    slug = path.strip('/')
    if slug in SLUGS:
        return f'{slug}.html' + frag
    problems.append(f'link interno sem página correspondente: {href}')
    return href


def expected_images(html):
    """Arquivo que cada <img> do original deve receber, na ordem do documento."""
    out = []
    for m in re.finditer(r'<picture\b[^>]*>.*?</picture>|<img\b[^>]*>', html, flags=re.S):
        block = m.group(0)
        src = re.search(r'<source\b[^>]*type="image/webp"[^>]*>', block)
        img = re.search(r'<img\b[^>]*>', block).group(0)
        if src:
            out.append(best_candidate(get_attr(src.group(0), 'srcset')))
        else:
            out.append(best_candidate(get_attr(img, 'srcset')) if get_attr(img, 'srcset') else get_attr(img, 'src'))
    return out


def convert(src_rel, out_name):
    html = (ROOT / src_rel).read_text(encoding='utf-8')
    is_home = out_name == 'index.html'
    canonical = get_attr(re.search(r'<link rel="canonical"[^>]*>', html).group(0), 'href') if '<link rel="canonical"' in html else None
    expected = expected_images(html)
    # CSS, JS e sprite entram só no fim (marcadores abaixo): o CSS tem comentários que citam
    # "<picture>" e "<img>", e as regex de marcação não podem enxergar esse texto.
    inline = {}

    # 1) Preloads: com tudo embutido, não há o que pré-carregar.
    html = re.sub(r'[ \t]*<link rel="preload"[^>]*>\n?', '', html)

    # 2) Favicons em data URI.
    html = re.sub(
        r'<link rel="(icon|apple-touch-icon)"[^>]*>',
        lambda m: set_attr(m.group(0), 'href', data_uri(get_attr(m.group(0), 'href'))),
        html,
    )

    # 3) CSS embutido (marcador).
    inline['<!--@@CSS@@-->'] = '<style>\n' + CSS + '\n</style>'
    html, n = re.subn(r'<link rel="stylesheet" href="/assets/css/site\.css[^"]*">', '<!--@@CSS@@-->', html)
    if n != 1:
        problems.append(f'{src_rel}: folha de estilo encontrada {n} vez(es)')

    # 4) JS: abertura no <head> (antes da primeira pintura, como no original);
    #    site.js no fim do <body> (equivale ao "defer").
    intro = INTRO_JS.replace(
        HOME_TEST,
        f"var home = {'true' if is_home else 'false'}; /* cópia autocontida: {'esta é' if is_home else 'esta não é'} a página inicial */",
    )
    html, n = re.subn(r'<script src="/assets/js/intro\.js[^"]*"></script>', '<!--@@INTRO@@-->', html)
    if n:
        inline['<!--@@INTRO@@-->'] = '<script>\n' + intro + '</script>'
    had_site_js = bool(re.search(r'<script src="/assets/js/site\.js[^"]*" defer></script>', html))
    html = re.sub(r'[ \t]*<script src="/assets/js/site\.js[^"]*" defer></script>\n?', '', html)
    if had_site_js:
        inline['<!--@@SITEJS@@-->'] = '<script>\n' + SITE_JS + '</script>'
        html = html.replace('</body>', '<!--@@SITEJS@@-->\n</body>', 1)

    # 5) <picture>: fica a versão WebP de maior resolução, direto no <img>.
    def picture(m):
        block = m.group(0)
        sources = re.findall(r'<source\b[^>]*>', block)
        img = re.search(r'<img\b[^>]*>', block).group(0)
        webp = [s for s in sources if get_attr(s, 'type') == 'image/webp' and get_attr(s, 'media') is None]
        if len(sources) != len(webp) or len(webp) > 1:
            problems.append(f'{src_rel}: <picture> com <source> não previsto (media/tipo): {sources}')
            return block
        url = best_candidate(get_attr(webp[0], 'srcset')) if webp else (best_candidate(get_attr(img, 'srcset')) if get_attr(img, 'srcset') else get_attr(img, 'src'))
        new_img = del_attr(del_attr(img, 'srcset'), 'sizes')
        new_img = set_attr(new_img, 'src', data_uri(url))
        for s in sources:
            block = re.sub(r'[ \t]*' + re.escape(s) + r'\n?', '', block, count=1)
        return block.replace(img, new_img, 1)

    html = re.sub(r'<picture\b[^>]*>.*?</picture>', picture, html, flags=re.S)

    # 6) Demais <img> (logos SVG, convênio): data URI.
    def img(m):
        tag = m.group(0)
        src = get_attr(tag, 'src')
        if src is None or src.startswith('data:'):
            return tag
        url = best_candidate(get_attr(tag, 'srcset')) if get_attr(tag, 'srcset') else src
        tag = del_attr(del_attr(tag, 'srcset'), 'sizes')
        return set_attr(tag, 'src', data_uri(url))

    html = re.sub(r'<img\b[^>]*>', img, html)

    # 7) Ícones: sprite inline + <use href="#i-...">.
    used = set(re.findall(r'href="/assets/icons\.svg#([^"]+)"', html))
    missing = used - SPRITE_IDS
    if missing:
        problems.append(f'{src_rel}: ícones sem símbolo no sprite: {sorted(missing)}')
    html = re.sub(r'href="/assets/icons\.svg#([^"]+)"', r'href="#\1"', html)
    if used:
        inline['<!--@@SPRITE@@-->'] = SPRITE
        html = re.sub(r'(<body\b[^>]*>)', lambda m: m.group(1) + '\n<!--@@SPRITE@@-->', html, count=1)

    # 8) Compartilhar: no celular, o compartilhamento nativo usa location.href, que na
    #    cópia seria um caminho de arquivo. Fixa o endereço público da página.
    if canonical:
        html = re.sub(
            r'<a\b[^>]*\bjs-share\b[^>]*>',
            lambda m: m.group(0) if get_attr(m.group(0), 'data-share-url') else set_attr(m.group(0), 'data-share-url', canonical),
            html,
        )

    # 9) Links internos -> arquivos da cópia.
    html = re.sub(r'(\shref=")(/(?!/)[^"]*)(")', lambda m: m.group(1) + rewrite_internal(m.group(2)) + m.group(3), html)

    # 10) Nota da cópia logo após o <meta charset> (que precisa ficar nos primeiros 1024 bytes).
    note = ('\n<!-- CÓPIA AUTOCONTIDA gerada por _entrega/gerar-copia-html.py a partir de '
            f'{src_rel}. Não edite aqui: edite o site original e gere de novo. -->')
    html = html.replace('<meta charset="utf-8">', '<meta charset="utf-8">' + note, 1)

    # Conferência 1: nada na marcação pode continuar apontando para arquivos do site.
    leftovers = re.findall(r'\s(?:src|srcset|href|imagesrcset|poster)="(/(?!/)[^"]*)"|url\(([^)]*)\)', html)
    for a, b in leftovers:
        problems.append(f'{out_name}: referência que sobrou: {a or b}')
    if re.search(r'<source\b', html):
        problems.append(f'{out_name}: sobrou <source>')

    # Conferência 2: cada <img>, na ordem, recebeu exatamente o arquivo esperado.
    got = [get_attr(t, 'src') for t in re.findall(r'<img\b[^>]*>', html)]
    if len(got) != len(expected):
        problems.append(f'{out_name}: {len(expected)} imagens no original, {len(got)} na cópia')
    for i, (want, have) in enumerate(zip(expected, got)):
        if data_uri(want) != have:
            problems.append(f'{out_name}: imagem {i + 1} não corresponde a {want}')

    for marker, content in inline.items():
        if html.count(marker) != 1:
            problems.append(f'{out_name}: marcador {marker} aparece {html.count(marker)} vez(es)')
        html = html.replace(marker, content, 1)

    (OUT / out_name).write_text(html, encoding='utf-8')
    return len(html.encode('utf-8'))


LEIA_ME = """CROFACE — CÓPIA AUTOCONTIDA DO SITE
====================================

Cada página é UM arquivo .html que abre direto do disco (duplo clique), sem
servidor e sem internet. Comece por index.html; os links entre as páginas
levam aos outros arquivos desta pasta.

Não edite estes arquivos. Edite o site original e gere a cópia de novo:
    python3 _entrega/gerar-copia-html.py

O QUE ESTÁ DENTRO DE CADA ARQUIVO
- CSS do site, com as fontes Inter Tight e Allura embutidas;
- JavaScript: abertura com o logo, menu, mega-menus, barra de seções,
  revelações na rolagem, parallax, foto fixa que troca, carrosséis, abas,
  antes e depois, botão de urgência, compartilhar e eventos de conversão;
- ícones (sprite SVG), logos, favicons e todas as fotos (data URI).

SEO PRESERVADO (idêntico ao original, conferido pelo script)
title, meta description, canonical, robots, Open Graph, Twitter Card,
JSON-LD (Dentist, WebSite, BreadcrumbList, WebPage, Service), H1-H4, alt das
imagens, width/height, textos e âncoras.

DECISÕES
- Fotos: entra só a versão WebP na maior resolução. O original oferece também
  JPG e versões menores para economizar download; numa cópia de arquivo único
  tudo é baixado de uma vez, e o CSS do site já exige navegador moderno (que lê
  WebP). Visualmente é a mesma foto, na resolução máxima.
- canonical, og:image e JSON-LD continuam apontando para https://croface.com.br:
  Google e redes sociais exigem URL absoluta. Não são carregados pela página.
- O mapa do Google continua "clique para carregar" (serviço externo, só abre se
  a pessoa pedir). Links de WhatsApp, telefone, Instagram e rotas continuam
  funcionando como links.

NÃO USE ESTA CÓPIA COMO SITE PUBLICADO
- O .htaccess do site (CSP "script-src 'self'; style-src 'self'") bloqueia CSS
  e JS embutidos: no servidor, a cópia ficaria sem estilo e sem animações.
- Sem cache compartilhado entre páginas e sem carregamento sob demanda das
  fotos, o desempenho (Core Web Vitals) é pior que o do original.
- robots.txt, sitemap.xml e .htaccess pertencem ao servidor e ficam só no
  site original.
"""


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / 'LEIA-ME.txt').write_text(LEIA_ME, encoding='utf-8')
    total = 0
    for src_rel, out_name in PAGES:
        size = convert(src_rel, out_name)
        total += size
        print(f'{out_name:48s} {size / 1e6:5.2f} MB')
    print(f'{"total":48s} {total / 1e6:5.2f} MB  ->  {OUT.relative_to(ROOT)}/')
    if problems:
        print('\nPROBLEMAS:')
        for p in problems:
            print(' -', p)
        sys.exit(1)

    # .zip só depois de tudo conferido; recriado do zero para não levar arquivos antigos.
    if ZIP.exists():
        ZIP.unlink()
    with zipfile.ZipFile(ZIP, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for f in sorted(OUT.iterdir()):
            if f.is_file() and not f.name.startswith('.'):
                z.write(f, f'{OUT.name}/{f.name}')
    print(f'{"zip":48s} {ZIP.stat().st_size / 1e6:5.2f} MB  ->  {ZIP.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
