# Prompt para Claude Code: imagens de benefício no sorriso

Implemente as imagens da versão **v3** no site deste projeto:
`/Users/henriquem.silva/Documents/Henrique/Clients/CROFACE`.

A direção aprovada pelo briefing é mostrar o benefício que o paciente percebe: sorriso completo no implante, aparência renovada na prótese, dente recomposto na restauração e aspecto limpo na profilaxia. Use os comparativos fotográficos prontos, sem modelos anatômicos ou equipamentos nessas seções. As imagens de avaliação mostram a pessoa idosa participando da conversa.

## Preparação

Confira as instruções aplicáveis, `git status` e `git diff`: já há mudanças locais anteriores à produção das imagens, que devem ser preservadas. Leia `_entrega/imagens-ia/v3/MAPEAMENTO.md` e `manifesto.json`. Confira também as duas pranchas de prévia dessa pasta. Esta entrega produziu imagens e documentação; não aplicou mudanças em HTML/CSS/JS.

Use somente os novos arquivos públicos de `/assets/img/ia/v3/`. Não use a versão inicial em `/assets/img/ia/` nem o experimento de modelos 3D da v2. Não gere novas imagens.

## Mapeamento exato

Cada nome novo existe em WebP e JPG. Atualize os `source[srcset]` e `img[src]`, incluindo as versões inline e fixas das etapas.

| Nome atual em `/assets/img/` | Novo nome em `/assets/img/ia/v3/` | Aplicação |
|---|---|---|
| `antes-implante` | `antes-implante-ia-v3` | `implante-dentario-vila-mariana/index.html`, comparador |
| `depois-implante` | `depois-implante-ia-v3` | Mesmo comparador |
| `antes-protese` | `antes-protese-ia-v3` | `protese-dentaria-vila-mariana/index.html`, comparador |
| `depois-protese` | `depois-protese-ia-v3` | Mesmo comparador |
| `antes-clinica` | `antes-clinica-ia-v3` | `clinica-geral-vila-mariana/index.html`, comparador |
| `depois-clinica` | `depois-clinica-ia-v3` | Mesmo comparador |
| `antes-prevencao` | `antes-prevencao-ia-v3` | `limpeza-e-prevencao-vila-mariana/index.html`, comparador |
| `depois-prevencao` | `depois-prevencao-ia-v3` | Mesmo comparador |
| `consulta-3-exames` | `consulta-3-exames-ia-v3` | `index.html`, painel `#st-3`; `como-atendemos/index.html`, versões inline e fixa |
| `cirurgia-1-avaliacao` | `cirurgia-1-avaliacao-ia-v3` | `cirurgias-odontologicas-vila-mariana/index.html`, versões inline e fixa |

## Proporções, carregamento e controle

- **Oito sorrisos:** proporção **2:1**, arquivo principal **1600 × 800**, versão menor **800 × 400** com sufixo `-800` antes da extensão. Exemplo: `/assets/img/ia/v3/antes-implante-ia-v3-800.webp`.
- **Exames complementares:** proporção 4:3, **1440 × 1080**; versão **720 × 540**, sufixo `-720`.
- **Avaliação cirúrgica:** proporção 4:5, **1120 × 1400**; versão **640 × 800**, sufixo `-640`.
- Use `<picture>` com WebP e fallback JPG, `srcset` nas duas larguras e `sizes` coerente com o componente. Preserve `loading="lazy"` e `decoding="async"`; atualize `width` e `height` para as dimensões corretas.
- Acrescente uma classe local, por exemplo `ba--sorriso`, aos quatro comparadores e use `.ba--sorriso { aspect-ratio: 2 / 1; }`. **Não mantenha os sorrisos no recorte 4:3**, pois isso corta as extremidades da boca e perde a direção do novo enquadramento.
- Nas duas camadas de cada par, mantenha dimensões, escala, `object-fit: cover` e `object-position: center` idênticos. Não inverta as camadas Antes/Depois e não retoque os arquivos.
- Desloque o círculo de arraste para perto da base da imagem, preservando a linha vertical e a área de interação. O controle não deve esconder os dentes ou o lascado. Um ponto de partida local, compatível com o CSS atual, é `.ba--sorriso .ba__knob { top: calc(100% - 2rem); }`; confira se o círculo inteiro fica visível em 390 px.
- Mantenha arraste, toque, hover e teclado existentes. Não acrescente flash, brilho, animação de clareamento ou transição automática.
- Na imagem de exames em Como atendemos, confira a pessoa idosa, a profissional e o contexto do monitor. Se o frame vertical cortar o conteúdo essencial, aplique `object-fit: contain` apenas a essa imagem, com fundo compatível; não altere todas as imagens do scrolly.
- Não carregue no site os PNG originais da pasta de entrega.

## Benefício, legenda e acessibilidade

Mantenha o título “Antes e depois” e troque o eyebrow “Resultados” por **“Mudanças no sorriso”**. Adapte o apoio do bloco ao benefício específico:

- Implante: **“Compare o sorriso com um dente ausente e com a reposição desse dente.”**
- Prótese: **“Compare um sorriso com prótese desgastada e uma aparência renovada.”**
- Clínica geral: **“Veja a diferença entre um dente lascado e um dente com a borda recomposta.”**
- Profilaxia: **“Veja a diferença no aspecto dos dentes após a remoção de tártaro e manchas superficiais.”**

Preserve `id="antes-depois"`, os identificadores de títulos, os rótulos Antes/Depois e o `aria-label` do controle.

As pessoas e as cenas são fictícias. Conforme solicitado pelo usuário, **não inclua “IA”, “inteligência artificial” ou “simulação por IA” nos textos alternativos nem nas legendas públicas**. Preserve a origem dos arquivos na documentação interna. Não atribua essas imagens a pacientes reais, resultados realizados pela CROFACE ou profissionais identificados da clínica.

Substitua a legenda atual inteira, que fala em “Caso de paciente da CROFACE, publicado com autorização por escrito”, incluindo o campo de responsável dessa legenda, por:

**“Comparação ilustrativa do tratamento. Cada caso depende de avaliação individual.”**

Use os textos alternativos abaixo. Eles descrevem o conteúdo e o benefício visível, com termos dos tratamentos e referências naturais a adultos acima dos 50 anos quando pertinentes. Não acrescente listas de palavras-chave, bairro, cidade, nome da clínica ou “50+” a todos os textos. A localização e o público também são contextualizados pelos títulos e textos das páginas. Não use nomes de profissionais reais.

| Imagem | `alt` final |
|---|---|
| Implante antes | “Pessoa acima dos 50 anos com ausência de um dente superior no sorriso.” |
| Implante depois | “Sorriso completo com reposição de um dente superior por implante dentário.” |
| Prótese antes | “Prótese dentária superior com dentes desgastados e amarelados.” |
| Prótese depois | “Prótese dentária superior renovada, com dentes mais claros e contornos naturais.” |
| Restauração antes | “Dente da frente com a borda lascada em um sorriso adulto.” |
| Restauração depois | “Dente da frente com a borda recomposta por restauração dentária.” |
| Profilaxia antes | “Tártaro e manchas superficiais nos dentes inferiores, próximos à gengiva.” |
| Profilaxia depois | “Dentes inferiores com aspecto limpo após limpeza dentária e remoção de tártaro.” |
| Exames | “Mulher com mais de 50 anos conversa com a dentista sobre uma radiografia odontológica.” |
| Avaliação cirúrgica | “Homem acima dos 50 anos conversa com o dentista sobre o planejamento de uma cirurgia odontológica.” |

A lista estruturada está em `_entrega/imagens-ia/v3/alt-texts.json`. Use o mesmo texto nas versões desktop, celular e nos dois formatos da mesma imagem.

Nas duas cenas de avaliação, use legendas relacionadas ao conteúdo:

- Exames: **“Esclarecimento de dúvidas sobre exames odontológicos. Imagem ilustrativa.”**
- Avaliação cirúrgica: **“Conversa sobre as etapas do tratamento odontológico. Imagem ilustrativa.”**

Não atribua os rostos ou o ambiente sintéticos aos profissionais ou à estrutura da CROFACE. Preserve a informação atual de que exames de imagem são realizados em centro de imagem.

## Preservar o restante do projeto

- Mantenha todas as fotos reais já aplicadas, inclusive `consulta-1-avaliacao`, `camera-intraoral-uso`, `consulta-4-diagnostico` e `consulta-5-plano`, equipe, procedimentos, instalações e heros.
- Cirurgias e Dentista para idosos não têm comparador no HTML atual: não acrescente um. A substituição em Cirurgias é apenas a imagem de avaliação.
- Clareamento foi um exemplo dado pelo usuário para explicar o raciocínio de benefício. Não acrescente serviço, página ou comparador de clareamento.
- Não altere informações clínicas, contatos, convênios, profissionais ou campos pendentes fora das legendas especificadas. Não transforme profilaxia em promessa de clareamento.
- Atualize o status dos 10 itens na documentação de entrega, distinguindo as simulações das fotografias reais, sem reescrever o briefing inteiro.
- Preserve os arquivos antigos para histórico. Não faça commit, push ou deploy nesta solicitação.

## Validar antes de concluir

Abra as páginas em navegador a 1440 e 390 px. Confira os quatro pares em 0, 50 e 100%, além de arraste, toque e teclado; veja se os dentes permanecem alinhados e o controle não oculta a alteração. Confirme que o enquadramento 2:1 mostra a boca inteira e que as legendas são legíveis.

Confira o painel Exames complementares da home, as versões inline/fixas em Como atendemos e a avaliação em Cirurgias. Confirme as URLs, as duas larguras e o fallback JPG. Revise o diff para preservar as mudanças anteriores e informe quais arquivos foram alterados e o que foi efetivamente verificado.
