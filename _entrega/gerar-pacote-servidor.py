#!/usr/bin/env python3
"""
CROFACE — gera o ZIP que o cliente envia para a Locaweb.

Um único arquivo: _entrega/croface-site.zip
Dentro dele, o site original (o mesmo que roda aqui), com os arquivos na RAIZ
do ZIP — ao extrair dentro de public_html, tudo cai no lugar certo:

    index.html, 404.html, <pagina>/index.html (7 páginas),
    assets/ (só o que as páginas usam), robots.txt, sitemap.xml,
    favicons e .htaccess (HTTPS, redirecionamentos, cabeçalhos de segurança).

Por que o site original e não a cópia em arquivo único (_entrega/copia-html):
- URLs iguais às do canonical, do sitemap e do JSON-LD (/implante-dentario-vila-mariana/);
- CSS, JS, fontes e fotos em cache entre páginas e fotos sob demanda (Core Web Vitals);
- compatível com a CSP do .htaccess (a cópia tem CSS/JS embutidos, que a CSP bloqueia).

O script para com erro se qualquer página, foto, fonte ou link interno citado
pelo site não estiver no pacote.

Uso:  python3 _entrega/gerar-pacote-servidor.py
"""
import pathlib
import re
import sys
import zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / '_entrega' / 'croface-site.zip'

# Arquivos de servidor que não são citados por nenhuma página.
FIXOS = ['.htaccess', 'robots.txt', 'sitemap.xml', 'favicon.ico', 'assets/fonts/LICENSE.txt']

# Páginas: index.html, 404.html e toda pasta pública com index.html.
paginas = ['index.html', '404.html'] + sorted(
    f'{d.name}/index.html' for d in ROOT.iterdir()
    if d.is_dir() and not d.name.startswith(('.', '_')) and d.name != 'assets'
    and (d / 'index.html').is_file()
)

ASSET = re.compile(r'/(assets/[A-Za-z0-9_./-]+\.[A-Za-z0-9]+|[A-Za-z0-9_-]+\.(?:ico|png|svg|webmanifest))(?=[\s"\'),?#]|$)')
LINK = re.compile(r'href="(?:https://croface\.com\.br)?(/[^"#?]*)')
CSS_URL = re.compile(r'url\(["\']?([^"\')]+)["\']?\)')

arquivos = set(FIXOS) | set(paginas)
erros = []


def ler(rel):
    return (ROOT / rel).read_text(encoding='utf-8')


fila = list(paginas) + ['sitemap.xml']
vistos = set()
while fila:
    rel = fila.pop()
    if rel in vistos:
        continue
    vistos.add(rel)
    texto = ler(rel)
    # Arquivos citados (src, srcset, href, og:image, JSON-LD, manifest...).
    for m in ASSET.finditer(texto):
        alvo = m.group(1)
        arquivos.add(alvo)
        if alvo.endswith(('.css', '.js', '.webmanifest')):
            fila.append(alvo)
    # url(...) relativos dentro do CSS (fontes).
    if rel.endswith('.css'):
        base = pathlib.PurePosixPath(rel).parent
        for u in CSS_URL.findall(texto):
            if u.startswith(('data:', 'http', '/', '#')):
                continue
            alvo = str(pathlib.PurePosixPath(*(base / u).parts))
            partes = []
            for p in alvo.split('/'):
                if p == '..':
                    partes.pop()
                elif p != '.':
                    partes.append(p)
            arquivos.add('/'.join(partes))
    # Links internos: toda página citada precisa existir.
    if rel.endswith('.html'):
        for caminho in LINK.findall(texto):
            if caminho.startswith('/assets/') or '.' in caminho.rsplit('/', 1)[-1]:
                continue
            pagina = caminho.strip('/')
            alvo = f'{pagina}/index.html' if pagina else 'index.html'
            if alvo not in arquivos:
                erros.append(f'{rel}: link para {caminho} sem página correspondente')

for rel in sorted(arquivos):
    if not (ROOT / rel).is_file():
        erros.append(f'arquivo citado e inexistente: {rel}')

if erros:
    print('ERRO — o pacote não foi gerado:')
    for e in sorted(set(erros)):
        print('  -', e)
    sys.exit(1)

OUT.unlink(missing_ok=True)
with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for rel in sorted(arquivos):
        z.write(ROOT / rel, rel)

total = sum((ROOT / r).stat().st_size for r in arquivos)
print(f'OK: {OUT.relative_to(ROOT)}')
print(f'    {len(arquivos)} arquivos, {len(paginas)} páginas, '
      f'{total / 1e6:.1f} MB descompactado, {OUT.stat().st_size / 1e6:.1f} MB o ZIP')
