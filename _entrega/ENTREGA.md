# CROFACE — Entrega do site institucional

> Esta pasta (`_entrega/`) **não deve ser enviada ao servidor**. O `.htaccess` bloqueia o acesso a ela caso seja enviada por engano.

---

## v4 — Ajustes do cliente (13/10/2026)

**O que mudou**
- **Layout claro e limpo:** header, hero, capas das páginas, seções de destaque e rodapé passaram para fundos claros. O marinho ficou só para texto, botões e detalhes.
- **Uma mensagem por tela:** as seções principais da home ocupam a altura da tela, com uma ideia central cada.
- **Home reorganizada:** hero emocional → **câmera intraoral** (diferencial) → centro de longevidade → queixas (com **dor de dente** como primeira) → primeira consulta → tratamentos → **Quem somos** (fotos reais e currículo que abre ao clicar) → **convênios** → para quem cuida → onde estamos. Saiu a seção de esterilização, equipamento e estrutura (ela continua em "Como atendemos").
- **Página nova: Clínica geral** (`/clinica-geral-vila-mariana/`), com dor de dente, dente quebrado, sensibilidade, gengiva, dente escurecido, bruxismo e tratamento de canal. As queixas da home levam para cá, e não mais para "Limpeza e prevenção".
- **Profilaxia e prevenção:** a página antiga de limpeza agora explica a profilaxia.
- **Prótese:** entraram a prótese flexível e uma seção própria de prótese sobre implantes.
- **Sem especialidades:** em "Quem somos", todos aparecem só como cirurgiões-dentistas, com o CRO. A página de cirurgia passou a se chamar **Cirurgias odontológicas** (`/cirurgias-odontologicas-vila-mariana/`), sem o termo "bucomaxilofacial" e sem atribuir especialidade a ninguém.
- **Horário:** segunda a sexta, das 9h às 21h; sábados, domingos e feriados com agendamento. Atualizado no site, no menu, no rodapé e nos dados estruturados (JSON-LD).
- **Acessibilidade:** banheiro adaptado.
- **Textos do cliente aplicados** (documento "Alterações site"): longevidade (com nutrição), "como você come, fala e dorme" com bruxismo, primeira consulta, conforto, o que acontece entre um paciente e outro, depois do plano e Quem somos.
- **Sem gerúndios:** varredura em todo o texto visível e nos textos alternativos das fotos.
- **Antes e depois:** em implante, prótese, clínica geral e profilaxia, com controle de arrastar (no toque e no teclado) ou de passar o mouse.
- **Urgência:** botão vermelho no canto inferior direito, que pisca por 5 segundos. Ele abre orientação, um WhatsApp de urgência, o telefone e o aviso de emergência grave (pronto-socorro ou 192).
- **Funil nas páginas de serviço:** chamada no meio da página ("É o seu caso?"), seção "Como agendar a sua avaliação" em 3 passos e faixa final.
- **Fotos reais aplicadas:** equipe (retratos e consultório), menu, Como atendemos, idosos, prótese (bancada), profilaxia e exame, longevidade (paciente idosa sorrindo) e biossegurança (consultório e paramentação).

**Atenção — antes e depois.** O briefing original proibia, e o cliente agora pediu. Pela Resolução CFO 196/2019, a divulgação de imagens de diagnóstico e de resultado final passou a ser permitida, mas com **autorização expressa por escrito do paciente** e dentro do Código de Ética (sem sensacionalismo nem promessa de resultado). Por isso, o componente traz o aviso "publicado com autorização" e o campo do profissional responsável. **Confirmar com o CRO-SP antes de publicar as imagens reais.**

**Urgência em loop.** A pedido do cliente, o botão tem um pulso suave contínuo (anel que se expande a cada ~2,4 s e ponto que "respira"), sem piscadas rápidas: fica bem abaixo do limite de 3 piscadas por segundo, então sem risco para pessoas fotossensíveis. A animação pausa ao passar o mouse, no foco do teclado e com o painel aberto, e é desligada para quem ativou "reduzir movimento" no sistema. Observação: a WCAG 2.2.2 recomenda um controle de pausa para animações que duram mais de 5 s; o respeito à preferência do sistema cobre a maior parte dos casos.

**Pendências novas (cliente)**
- [x] Resumo profissional em composição padrão (frase-resumo + linhas Atuação / Formação / Cursos; linha sem informação não aparece). Dra. Renata e Dr. Marcelo aplicados.
- [ ] Resumo profissional do Dr. Wesley (frase-resumo, atuação, formação, cursos). Hoje o currículo dele mostra só "Cirurgião-dentista da equipe da CROFACE."
- [ ] Dr. Marcelo: confirmar o **registro da especialidade em Saúde Coletiva no CRO-SP**. Pelo Código de Ética Odontológica, "especializado/especialista" só pode ser anunciado com o registro; sem ele, o texto passa a "pós-graduação em Saúde Coletiva". (O aviso visível foi retirado da home a pedido; a confirmação continua pendente.)
- [x] CRO do Dr. Wesley (CROSP 171404) e do Dr. Marcelo (CROSP 169331).
- [ ] Equipe multidisciplinar: nome e CRO de quem atende endodontia, ortodontia e implantodontia.
- [x] **"Em qualquer idade." em letra de assinatura** no hero: fonte Allura (SIL OFL 1.1, 25 KB, hospedada em `assets/fonts/`, licença em `LICENSE-allura.txt`), em tamanho grande e reta, azul do logo, efeito de escrita da esquerda para a direita (desligado para quem pede menos movimento). O texto continua real dentro do H1.
- [x] **Home sem [CONFIRMAR]:** retirados o aviso da equipe multidisciplinar (nomes/CRO continuam pendentes), o ponto de referência na rua, o aviso de especialidade do Dr. Marcelo e os campos vazios do Dr. Wesley. As coordenadas `geo` (que estavam como texto de placeholder e invalidavam os dados estruturados) foram removidas de todas as páginas até termos latitude/longitude reais.
- [x] **Curadoria de imagens (14/10):** trocadas 4 fotos de banco genéricas (idosos posando em fundo liso, sem relação com a clínica) e 3 placeholders por recortes de fotos reais da CROFACE: `consulta-4-diagnostico` (Dr. Marcelo no consultório, logo no monitor), `consulta-5-plano` e `prevencao-3-orientacao` (Dra. Renata em atendimento), `cirurgia-3-pos` (Dr. Wesley no consultório), `cirurgia-2-sala` e `implante-2-cirurgia` (consultório), `implante-1-avaliacao` (Dr. Marcelo em atendimento). Legendas (alt) reescritas para descrever o que aparece de fato.
- [x] **Logo oficial** (CorelDRAW, 10/11/2025) aplicado: versão horizontal no cabeçalho (`logo-croface-h.svg`, montada a partir das peças do logo: símbolo à esquerda, nome à direita), versão vertical original no rodapé e na 404 (`logo-croface.svg`), símbolo no favicon/ícone do celular e PNG 600×600 para o Google (`logo-croface.png`). **Confirmar com a clínica se a versão horizontal pode ser usada.** O logo diz "Odontologia"; o site mantém o nome "CROFACE — Centro de Reabilitação Orofacial" no texto.
- [x] Convênios: Plena Saúde, Sempre Odonto, Ideal Odonto, OdontoGroup, Dental Plus, Dental Uni e Dentalpar. Os 6 logos foram baixados dos sites oficiais das operadoras (`assets/img/convenios/`).
- [x] **Dental Plus:** logo enviado pelo cliente e aplicado (`convenios/dental-plus`). Site oficial da operadora: planodentalplus.com.br (Santo André, SP; selo ANS no site, sem número publicado). O domínio dentalplus.com.br é de outra empresa, uma loja de produtos.
- [ ] Pedir a cada operadora o kit de marca oficial: o contrato de credenciamento costuma ter regras de uso do logo. O arquivo da Dentalpar tem baixa resolução (168×33).
- [ ] Como funciona a urgência fora do horário.
- [x] Acessibilidade: no térreo, sem degraus na entrada, com banheiro adaptado (confirmado).
- [ ] **Autorização de uso de imagem** dos pacientes que aparecem nas fotos (paciente com a Dra. Renata, paciente idosa com o Dr. Wesley e paciente idosa com o Dr. Marcelo).
- [ ] Foto do hero da home: a atual é de banco de imagem. Substituir por foto real autorizada.
- [ ] Fotos que ainda faltam: **câmera intraoral com a imagem na tela** (prioridade, porque é o diferencial), dentista conversando com paciente (etapa 1 da consulta), exames, diagnóstico, plano, autoclave, instrumental embalado, fachada, Conatus, capas de implante e de cirurgias, e os 4 pares de antes e depois.
- [ ] Revisar a chamada emocional do hero (opções em SECOES-E-IMAGENS.md).

---

## 1. Arquivos

```
index.html                                   Início
implante-dentario-vila-mariana/index.html    Implante dentário
protese-dentaria-vila-mariana/index.html     Prótese dentária
cirurgia-bucomaxilofacial-vila-mariana/...   Cirurgia bucomaxilofacial
limpeza-e-prevencao-vila-mariana/...         Limpeza e prevenção
dentista-para-idosos-vila-mariana/...        Dentista para idosos
como-atendemos/index.html                    Como atendemos
404.html · .htaccess · robots.txt · sitemap.xml (7 URLs)
favicon.svg · favicon-32.png · apple-touch-icon.png
assets/css/site.css      estilo único — variáveis no topo; HEADER e RODAPÉ demarcados
assets/js/site.js        menu, mega-menus, foto fixa que troca, abas, reveal, parallax, mapa
assets/icons.svg         ícones (um arquivo, em cache para todas as páginas)
assets/fonts/            Inter Tight auto-hospedada (54 KB)
assets/img/              placeholders "FOTO A CAPTAR" — trocar mantendo o nome
```

**Como editar sem instalar nada:** cada página é um `index.html` dentro da sua pasta. Header e rodapé se repetem em todas: para mudar telefone, horário ou CRO, use "Localizar e substituir em todos os arquivos" do editor (buscar `964480760`, `HORARIO`, `CRO`). Ao editar `site.css` ou `site.js`, aumente o número de `?v=5` (ex.: `?v=6`) em todas as páginas.

Os trechos a confirmar dentro do texto aparecem com **fundo azul-claro tracejado** no navegador (`<mark class="tbc">`), para facilitar a revisão com a clínica. Nenhum pode ir ao ar.

---

## 2. Seções e fotos

Ver **[SECOES-E-IMAGENS.md](SECOES-E-IMAGENS.md)**: cada página e seção, o que faz e qual foto usa, mais a lista de captação organizada por sessão de fotos.

---

## 3. Informações a confirmar com a clínica

Todas aparecem no site entre `[COLCHETES]`.

**Profissionais e responsabilidade técnica**
- [x] Responsável técnica: **Dra. Renata Cristina F. Beltrame — CROSP 170047** (confirmado; aparece no hero e no rodapé).
- [x] Dr. Wesley Santos Lestido — CROSP 171404.
- [ ] Se o Dr. Wesley tem **registro de especialista** em Cirurgia e Traumatologia Bucomaxilofacial no CRO. Sem registro, o site não pode usar "especialista" e o texto deve ficar como está ("cirurgião-dentista · cirurgia bucomaxilofacial").
- [x] Dr. Marcelo Lisboa — CROSP 169331 (aparece como cirurgião-dentista, sem especialidade).
- [ ] Área de atuação da Dra. Renata (e se tem especialidade registrada).

**Clínica**
- [ ] Horário de atendimento (dias e horas; o Google indica fechamento às 21h). Atualizar em 3 lugares + JSON-LD.
- [x] CNPJ 62.849.183/0001-71 (rodapé de todas as páginas e `taxID` no JSON-LD).
- [ ] Andar/sala dentro do prédio e ponto de referência na rua.
- [ ] Acessibilidade: elevador ou rampa, degraus, banheiro adaptado, estacionamento ou local de embarque/desembarque.
- [ ] Se existe telefone fixo além do WhatsApp (hoje o "Ligar" usa o mesmo número do WhatsApp).
- [ ] Latitude e longitude exatas (pegar no Google Maps, clicando no pin do endereço) → JSON-LD.
- [ ] Link do perfil da clínica no Google (para "Ver avaliações no Google"; hoje é uma busca pelo endereço).
- [ ] Site da Conatus (para link na seção 2, se desejado).

**Conteúdo clínico**
- [ ] Lista de procedimentos de **cirurgia bucomaxilofacial** (4 itens do card).
- [ ] 4º item de Prevenção ("cuidado com a gengiva" — confirmar se é feito).
- [ ] Protocolo real de biossegurança entre pacientes (seção 5, texto de abertura).
- [ ] Duração média da primeira consulta.
- [ ] Se algum exame de imagem é feito na própria clínica.
- [ ] Se há comunicação entre as equipes da CROFACE e da Conatus (com autorização do paciente) e como funciona.
- [ ] Se o paciente pode vir acompanhado na consulta (texto já assume que sim).

**Conteúdo das páginas novas**
- [ ] Quem é o responsável por **implantes** e por **próteses** (nome e CRO), citado nas páginas.
- [ ] Convênios aceitos ou atendimento particular, e formas de pagamento (aparece nas perguntas frequentes de todas as páginas).
- [ ] Se a clínica faz **tratamento de canal** ou encaminha (página de prevenção, "dente escurecido").
- [ ] Se faz **tratamento periodontal** (raspagem mais profunda).
- [ ] Se o Dr. Wesley atende casos **hospitalares** e onde.
- [ ] Se há **encaminhamento para a fisioterapia da Conatus** em casos de dor na mandíbula (ATM).
- [ ] Orientação sobre **vir acompanhado** em cirurgias.
- [ ] Se há **atendimento domiciliar**.
- [ ] Estacionamento próprio, conveniado ou local de embarque/desembarque.
- [ ] Revisar com os dentistas todo o texto clínico das páginas (etapas, cuidados, perguntas). O texto é educativo e conservador, mas precisa do aval deles.

---

## 4. Tarefas de publicação

**Antes de subir**
1. [ ] Substituir todos os `[COLCHETES]` (buscar `[` no `index.html`). Nenhum placeholder pode ir ao ar.
2. [ ] Substituir as 37 fotos (JPG + WebP, mesmo nome) e gerar as miniaturas `*-thumb` e a `hero-atendimento-960`.
3. [ ] Validar o JSON-LD em https://validator.schema.org e no Teste de Pesquisa Aprimorada do Google.

**Servidor (Locaweb)**
4. [ ] **Ativar e confirmar o certificado TLS (Let's Encrypt) no painel da Locaweb** para `croface.com.br` e `www.croface.com.br`. Hoje o site responde só em HTTP — verificado em 24/09/2026: `https://croface.com.br` não responde.
5. [ ] Abrir `https://croface.com.br` no navegador e confirmar o cadeado **antes** de enviar o `.htaccess` (ele força HTTPS e liga HSTS; sem certificado, o site fica inacessível).
6. [ ] **Remover do servidor todos os arquivos do site antigo:** o `index` em frameset, `top.htm`, `main.htm`, **`contato.htm`**, **o script de envio de e-mail que atende esse formulário** (provavelmente `.php` ou `.asp` — identificar pelo `action` do formulário em `contato.htm`), `format.css`, imagens e quaisquer outros remanescentes. Fazer backup local antes.
7. [ ] **`contato.htm` é hoje a única superfície executável do domínio e deve sair do ar junto com a publicação.** O `.htaccess` novo redireciona `contato.htm` para `/#contato` e bloqueia a execução de qualquer `.php`, `.asp`, `.pl`, `.cgi` como segunda camada — mas o arquivo do script deve ser **apagado**, não só bloqueado.
8. [ ] Enviar os arquivos do site novo (tudo, exceto `_entrega/`, `.claude/` e `.impeccable/`).

**Depois de subir**
9. [ ] Testar: `http://croface.com.br`, `http://www.croface.com.br` e `https://www.croface.com.br` devem cair em `https://croface.com.br/` com **um único** 301. Se entrar em loop, a Locaweb está terminando o TLS num proxy: consultar a documentação deles para a regra de redirecionamento HTTPS correta e ajustar o bloco 1 do `.htaccess`.
10. [ ] Testar `https://croface.com.br/contato.htm` → 301 para `/#contato`; `/qualquer-coisa` → 404 com a página nova.
11. [ ] Conferir cabeçalhos em https://securityheaders.com (esperado: A ou A+).
12. [ ] Clicar em "Mostrar mapa aqui" e confirmar que o Google Maps carrega (se a CSP bloquear, o navegador mostra aviso no console).
13. [ ] Testar o preview no WhatsApp: enviar o link para si mesmo. Se a imagem antiga aparecer, usar o Sharing Debugger do Facebook (mesmo cache do WhatsApp) para forçar nova leitura.
14. [ ] PageSpeed Insights (mobile): meta LCP < 2,5 s, CLS < 0,1.
15. [ ] Google Search Console: verificar a propriedade de domínio (DNS), enviar `sitemap.xml` (7 URLs), pedir indexação da home e das páginas de tratamento.
16. [ ] Google Business Profile: conferir que nome, endereço e telefone são **idênticos** aos do site (NAP) e colocar `https://croface.com.br/` como site.
17. [ ] (Opcional) GA4: o site já dispara eventos (`whatsapp_hero`, `whatsapp_contato`, `telefone_*`, `rota_*`, `whatsapp_compartilhar`, `mapa_carregado` etc.) assim que o GA4/GTM for instalado. Instalar exige **incluir o script como arquivo externo** e **acrescentar os domínios do Google na CSP** (`script-src`, `connect-src`, `img-src`), e **exibir aviso de cookies** (LGPD). Não instalar sem isso.
18. [ ] Depois de 1–2 semanas estável em HTTPS, considerar HSTS com `includeSubDomains` — só se todos os subdomínios (ex.: webmail) tiverem HTTPS.

**Conta e domínio**
19. [ ] Ativar MFA na conta da Locaweb e no Registro.br.
20. [ ] Verificar DNS por registros antigos/sem uso (subdomínios abandonados).

---

## 5. Decisões e interpretações

- **Funil de decisão (v3).** A home segue a ordem reconhecer → identificar-se (queixas) → confiar (longevidade, método, segurança, equipe) → escolher (tratamentos) → agir (WhatsApp), com um desvio para o familiar (enviar a página). Regras: **um botão sólido por tela**, sempre a ação principal (WhatsApp); o resto são links com seta. O botão persistente só aparece quando o do conteúdo sai de vista (a barra de seções mostra "WhatsApp" só depois de grudar; no celular, quem faz esse papel é o botão flutuante). Saiu o botão de WhatsApp do header, e o número segue na barra de cima.
- **Menos "linguiça" (v3).** Queixas em explorador lateral, primeira consulta em rolagem horizontal presa, tratamentos em carrossel, "Onde estamos" e "Fale conosco" juntos. As páginas internas ganharam carrossel nas grades maiores.
- **Várias páginas (v2).** Uma página por intenção de busca: implante, prótese, cirurgia bucomaxilofacial, limpeza/prevenção e dentista para idosos, mais "Como atendemos". A home virou porta de entrada e manda para elas: os cartões de queixa, o mega-menu e os cards de tratamento apontam para o trecho certo de cada página. O conteúdo novo é educativo, geral e conservador: nada de garantia, preço ou superlativo. Só os fatos específicos da clínica ficaram marcados para confirmar.
- **Foto fixa com o texto rolando à esquerda**, como na referência. Usada na home (longevidade e primeira consulta) e em todas as páginas de tratamento; a foto troca conforme a etapa que está no centro da tela. No celular, cada etapa mostra a própria foto acima do texto.
- **Escala reduzida (v2).** Títulos, espaçamentos, botões, numerais dos capítulos e header ficaram menores. O corpo de texto continua com 18px, que é o piso de acessibilidade do briefing.
- **Perguntas frequentes sem marcação FAQ no JSON-LD.** O Google hoje só mostra FAQ em destaque para sites governamentais e de saúde de grande autoridade. Cada página tem BreadcrumbList, WebPage e Service ligados à clínica.
- **Domínio canônico `https://croface.com.br/` (sem www).** Confirmado que o domínio atual é `croface.com.br` (frameset em HTTP). O `www` redireciona para ele.
- **Fonte: Inter Tight** (neo-grotesca, variável, 54 KB subsetada para latim). Uma família só, pesos 200–800. Escolhida por ser a neo-grotesca disponível localmente para auto-hospedar sem CDN e por ter bom desenho de acentos em português. Licença SIL OFL 1.1 — pode ser trocada por outra neo-grotesca mudando só o `@font-face`.
- **Mega-menu de queixas sem fotos por sintoma.** O template usa foto + legenda; aqui as miniaturas usam ícone de linha pequeno + legenda. Fotografar "dente quebrado" ou "gengiva sangrando" seria foto clínica de paciente, próxima do antes/depois vedado e oposta ao tom respeitoso pedido.
- **Queixa → área:** dente quebrado, gengiva, dente escurecido e sensibilidade levam a Prevenção e manutenção; prótese, mastigação e falta de dentes a Reabilitação oral; dor na mandíbula a Cirurgia bucomaxilofacial. Confirmar com a clínica — em especial a dor na mandíbula (ATM/DTM pode ser de outra área).
- **Cards da equipe levam ao WhatsApp** com mensagem pré-preenchida ("agendar com Dr. X"), já que não há páginas individuais. A seta do template ganhou função.
- **Mapa com "clique para carregar"** em vez de iframe automático: não pesa no carregamento, não envia dados ao Google antes do clique (LGPD) e mantém a CSP mínima (única exceção: `frame-src` do Google).
- **"Enviar esta página"** abre o compartilhamento nativo do celular quando existe (escolhe WhatsApp e contato); em computador, abre o WhatsApp Web com texto + link.
- **Barra de seções:** no celular, rola horizontalmente com esmaecimento na borda indicando que há mais itens.
- **Menu sem JavaScript também funciona** (via `#menu`), assim como a galeria (mostra todas as fotos) e o reveal (tudo visível).
- **Hero com responsável técnico e CRO** logo abaixo dos botões: a publicidade odontológica exige nome e CRO do responsável técnico.
- **Termos-alvo** entram no title/description e no texto de forma natural ("implante dentário e prótese dentária" no card, "dentista para seu pai… em Vila Mariana" na seção de familiares, "cirurgia bucomaxilofacial em Vila Mariana" no hero). "Reabilitação orofacial" fica só como marca e contexto, sem disputar o termo com o CROF.
- **Chapters numerados 1–9** mantidos como pede o briefing; a cadeia mastigação → autonomia usa conectores visuais em vez de "01/02/03" para não duplicar numeração.
- Não foi usado nenhum número, ano, quantidade de pacientes, equipamento ou certificação que não estivesse no briefing.

---

## 6. Auditoria

### SEO
- ✅ Um H1; H2 por seção; H3 nos subitens; hierarquia sem saltos.
- ✅ Title (53 caracteres) e description escritos para intenção local; canonical; `robots` index; `sitemap.xml`; `robots.txt`; 404 real com `noindex`.
- ✅ JSON-LD `Dentist` (endereço, telefone, sameAs, área) — sintaxe validada no navegador.
- ✅ Open Graph + Twitter Card completos com imagem 1200×630 em URL absoluta.
- ✅ Todas as imagens com `alt`, `width`/`height`, WebP + JPG; lazy-load abaixo da dobra; hero **sem** lazy e com `fetchpriority="high"` + preload responsivo.
- ✅ Todo o conteúdo como texto real; nenhum texto em imagem (exceto placeholders temporários e a imagem OG).
- ✅ Testado em 375px: sem rolagem lateral; alvos de toque ≥ 48px.
- ✅ 301 dos endereços antigos (`contato.htm`, `main.htm`, `top.htm`) para a página nova.
- ⚠️ Horário e coordenadas no JSON-LD ainda são placeholders — **não publicar assim**.
- ⚠️ Fotos são placeholders: LCP real só pode ser medido com a foto final (manter hero ≤ 150 KB em WebP).
- 🔗 Search Console, Google Business Profile (NAP idêntico), GA4.
- 📈 Monitorar: impressões por termo (implante dentário / prótese dentária / bucomaxilofacial / dentista para idoso + Vila Mariana), cliques no WhatsApp, Core Web Vitals de campo.

### Segurança (site estático — sem formulário, banco, login ou endpoint)
- ✅ Nenhum formulário, nenhum endpoint, nenhum script de terceiros, nenhuma dependência, nenhum build/lockfile.
- ✅ CSP restritiva sem `unsafe-inline`; HTML sem `style=` nem script inline (conferido); `form-action 'none'`; `frame-ancestors 'none'`; `object-src 'none'`.
- ✅ HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options, COOP; listagem de diretórios desligada.
- ✅ Execução de `.php/.asp/.pl/.cgi` bloqueada; arquivos ocultos, backups e `.md` bloqueados.
- ✅ Links externos com `rel="noopener"`; nenhum dado pessoal em URL (as mensagens pré-preenchidas do WhatsApp são texto fixo).
- ✅ Mapa só carrega sob demanda (nenhum dado vai ao Google sem ação do visitante).
- 🚨 **Bloqueia o deploy:** certificado TLS ainda não ativo (o `.htaccess` força HTTPS). Ativar primeiro.
- 🚨 **Bloqueia o deploy:** `contato.htm` e o script de envio de e-mail do site antigo precisam ser **apagados** no mesmo momento da publicação.
- 🔗 MFA na Locaweb e no Registro.br; revisão de DNS.
- 📈 Revisar `securityheaders.com` após cada mudança no `.htaccess`; se instalar GA4, reavaliar CSP e LGPD.
