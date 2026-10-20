# CROFACE: imagens ilustrativas por IA

Entrega de 20/10/2026. Foram inspecionadas as imagens referenciadas no HTML atual, comparando-as ao inventário de captação. Foram encontrados **10 placeholders ativos**, todos cobertos nesta entrega.

## Mapa dos arquivos

| Grupo | Quantidade | Arquivos públicos, sem extensão | Uso |
|---|---:|---|---|
| Implante | 2 | `antes-implante-ia`, `depois-implante-ia` | Comparação ilustrativa de um incisivo lateral ausente e sua reposição |
| Prótese | 2 | `antes-protese-ia`, `depois-protese-ia` | Comparação ilustrativa de prótese superior desgastada e renovada |
| Clínica geral | 2 | `antes-clinica-ia`, `depois-clinica-ia` | Comparação ilustrativa de pequeno lascado e restauração |
| Profilaxia | 2 | `antes-prevencao-ia`, `depois-prevencao-ia` | Comparação ilustrativa de depósitos e limpeza, sem branqueamento |
| Exames complementares | 1 | `consulta-3-exames-ia` | Home e Como atendemos; explicação de radiografia em monitor |
| Avaliação cirúrgica | 1 | `cirurgia-1-avaliacao-ia` | Etapa de planejamento; exame em tablet, mãos sem rostos identificáveis |

Cirurgias e Dentista para idosos não têm componente de antes/depois no HTML atual. As demais imagens ativas já mostram fotografias ou imagens preenchidas; foram preservadas. O componente de restauração em Clínica geral também estava pendente e foi incluído.

## Pastas e resolução real

- `assets/img/ia/`: 40 arquivos prontos para web: 10 imagens em WebP e JPG, cada uma em duas larguras.
- Horizontais: **1440 × 1080** e **720 × 540**. A versão menor usa o sufixo `-720`.
- Vertical de avaliação cirúrgica: **1120 × 1400** e **640 × 800**. A versão menor usa o sufixo `-640`.
- `_entrega/imagens-ia/originais/`: 10 PNG originais, sem compressão com perdas adicional; resolução nativa **1448 × 1086** nas horizontais e **1122 × 1402** na vertical.
- Nenhum arquivo foi ampliado artificialmente para anunciar uma resolução maior. As versões web são reduções dos originais.
- `manifesto.json`: dimensões, tamanhos em bytes e SHA-256 de cada exportação.
- `prompts.json`: prompts completos de geração e edição; ferramenta utilizada: **image_gen integrada**, sem CLI de geração.
- `PROMPT-CLAUDE-CODE.md`: instruções completas para integração posterior.
- `PREVIA.jpg`: prancha de consulta com as 10 imagens; os títulos e rótulos da prancha não estão gravados nos arquivos destinados ao site.

## Direção visual e origem

Pessoas fictícias na faixa de 65 a 72 anos, texturas de pele e dentes naturais, diferenças pontuais, iluminação suave e enquadramentos coerentes dentro de cada par. Os estados “depois” foram produzidos por edição do respectivo “antes”, buscando conservar o rosto e a composição. Há pequenas variações próprias de imagens generativas; não se trata de documentação clínica.

As cenas de exames são ilustrações sintéticas e não têm finalidade diagnóstica. Não retratam equipe, pacientes, exames ou instalações reais da CROFACE. O prompt de implementação exige que isso seja informado de forma visível e remove a atribuição indevida a casos de pacientes reais nas legendas atuais.

Nesta entrega foram criados somente os arquivos de imagem e estes documentos. A integração, a alteração de legendas no site e a verificação em navegador ficam descritas no prompt para Claude Code, conforme solicitado.

## Verificação realizada

As 10 imagens foram inspecionadas visualmente, incluindo os quatro pares lado a lado. As 40 exportações foram abertas e decodificadas para confirmar dimensões e integridade. Os WebP principais têm entre **85 e 144 KiB**. Todos os arquivos possuem correspondência no manifesto e nos prompts. A conferência da imagem integrada ao layout depende da implementação posterior.
