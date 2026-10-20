# Prompt para Claude Code

Implemente as imagens de IA já produzidas para o site CROFACE, neste projeto:
`/Users/henriquem.silva/Documents/Henrique/Clients/CROFACE`.

O objetivo é preencher os 10 espaços que ainda usavam imagens de placeholder, mantendo a estrutura visual, os componentes e as interações existentes. Os arquivos estão prontos; não gere novas imagens.

## Antes de alterar

1. Leia as instruções aplicáveis do projeto e confira `git status` e `git diff`. Já existem mudanças locais anteriores a esta entrega: preserve-as integralmente.
2. Leia `_entrega/imagens-ia/MAPEAMENTO.md` e `_entrega/imagens-ia/manifesto.json`.
3. Inspecione as imagens e o HTML atual. A geração desta entrega não modificou HTML, CSS ou JS.

## Arquivos e substituições

Todos os novos arquivos públicos ficam em `/assets/img/ia/`. Cada nome abaixo existe em `.webp` e `.jpg`.

| Referência atual em `/assets/img/` | Novo nome em `/assets/img/ia/` | Onde aplicar |
|---|---|---|
| `antes-implante` | `antes-implante-ia` | `implante-dentario-vila-mariana/index.html`, comparador |
| `depois-implante` | `depois-implante-ia` | Mesma página e comparador |
| `antes-protese` | `antes-protese-ia` | `protese-dentaria-vila-mariana/index.html`, comparador |
| `depois-protese` | `depois-protese-ia` | Mesma página e comparador |
| `antes-clinica` | `antes-clinica-ia` | `clinica-geral-vila-mariana/index.html`, comparador |
| `depois-clinica` | `depois-clinica-ia` | Mesma página e comparador |
| `antes-prevencao` | `antes-prevencao-ia` | `limpeza-e-prevencao-vila-mariana/index.html`, comparador |
| `depois-prevencao` | `depois-prevencao-ia` | Mesma página e comparador |
| `consulta-3-exames` | `consulta-3-exames-ia` | `index.html`, painel `#st-3`, e `como-atendemos/index.html`, nas versões inline e fixa |
| `cirurgia-1-avaliacao` | `cirurgia-1-avaliacao-ia` | `cirurgias-odontologicas-vila-mariana/index.html`, nas versões inline e fixa |

Atualize conjuntamente os `source[srcset]` e `img[src]`, incluindo todas as ocorrências das versões de desktop e celular. Não sobrescreva os arquivos antigos para realizar a integração.

## Exportações e carregamento

- As nove imagens horizontais principais têm **1440 × 1080**, proporção 4:3. As versões menores têm **720 × 540**, com sufixo `-720`: por exemplo, `antes-implante-ia-720.webp`.
- A imagem vertical `cirurgia-1-avaliacao-ia` tem **1120 × 1400**, proporção 4:5. Sua versão menor tem **640 × 800**, com sufixo `-640`.
- Utilize `<picture>` com WebP preferencial e JPG de fallback; acrescente `srcset` com as duas larguras e `sizes` compatível com a largura real de cada componente.
- Atualize os atributos `width` e `height` para a dimensão da imagem principal. Mantenha `loading="lazy"` e `decoding="async"`.
- Nos comparadores, as duas imagens precisam ter exatamente o mesmo `sizes`, dimensões, `object-fit` e `object-position`. Preserve a sobreposição e o controle de arraste existentes, inclusive a navegação por teclado. Não inverta antes/depois.
- Preserve o enquadramento central dos sorrisos. Na avaliação cirúrgica, mantenha o tablet e o exame visíveis. Faça somente ajustes de CSS locais se a verificação visual demonstrar necessidade.
- Sirva apenas os JPG/WebP de `assets/img/ia/`; os PNG de `_entrega/imagens-ia/originais/` são arquivos de origem, não imagens para carregar na página.

## Legendas e origem das imagens

Os quatro pares são **simulações ilustrativas geradas por IA**. Não são pacientes reais, casos clínicos ou resultados realizados pela CROFACE. É necessário corrigir os textos atuais do componente, que dizem “Caso de paciente da CROFACE, publicado com autorização por escrito”.

Em cada uma das quatro seções de comparação:

1. Preserve `id="antes-depois"` e os demais identificadores usados na navegação.
2. Troque o título por **“Antes e depois: simulação ilustrativa”**.
3. Troque o eyebrow “Resultados” por **“Ilustração do tratamento”**.
4. Use o texto de apoio: **“Arraste para comparar uma simulação ilustrativa criada por IA.”**
5. Mantenha os rótulos Antes e Depois e o funcionamento do slider.
6. Substitua a legenda inteira, incluindo o campo de profissional responsável desta legenda, por: **“Simulação ilustrativa gerada por inteligência artificial. Não representa paciente ou resultado da CROFACE. As possibilidades de tratamento e os resultados variam conforme a avaliação individual.”**
7. Inclua nos `alt` a origem ilustrativa e descreva o detalhe visível; não use “caso de paciente”, “resultado da clínica” ou nome de profissional real. Exemplos:
   - Implante antes: “Simulação por IA: ausência de um incisivo lateral superior em pessoa idosa.”
   - Implante depois: “Simulação por IA: reposição ilustrativa do incisivo lateral superior.”
   - Prótese antes: “Simulação por IA: prótese superior com dentes desgastados em pessoa idosa.”
   - Prótese depois: “Simulação por IA: prótese superior com contornos dentários renovados.”
   - Clínica antes: “Simulação por IA: pequeno lascado na borda de um incisivo superior.”
   - Clínica depois: “Simulação por IA: restauração ilustrativa da borda do incisivo superior.”
   - Prevenção antes: “Simulação por IA: depósitos de cálculo junto à gengiva dos dentes inferiores.”
   - Prevenção depois: “Simulação por IA: dentes inferiores após remoção ilustrativa dos depósitos.”

Para exames complementares, use `alt="Imagem ilustrativa gerada por IA: radiografia odontológica exibida em monitor durante uma explicação."` e uma legenda visível “Imagem ilustrativa gerada por IA.” junto à imagem ou ao texto da etapa. Repita a identificação em Como atendemos, incluindo o contexto visual da imagem fixa.

Para avaliação cirúrgica, use `alt="Imagem ilustrativa gerada por IA: exame odontológico em tablet durante o planejamento de uma cirurgia."` e a mesma identificação visível junto à etapa ou imagem. Não descreva o exame sintético como exame de paciente real, nem atribua a cena ao espaço ou aos profissionais da clínica. Preserve a informação existente de que os exames são realizados em centro de imagem.

## Limites da implementação

- Mantenha todas as fotos reais de equipe, pacientes, procedimentos e instalações que já estão aplicadas.
- Não crie comparador em Cirurgias ou Dentista para idosos: essas páginas não possuem esse componente no HTML atual.
- Não substitua `consulta-1-avaliacao`, `camera-intraoral-uso`, `consulta-4-diagnostico` ou `consulta-5-plano`: já têm fotos reais.
- Não mude serviços, contatos, convênios, profissionais, textos clínicos ou campos pendentes fora das legendas indicadas.
- O documento antigo `_entrega/SECOES-E-IMAGENS.md` contém orientações de captação real e trechos desatualizados. Esta solicitação autoriza IA somente para os 10 arquivos mapeados; não converta as outras imagens em IA. Atualize apenas o status desses 10 itens na documentação, preservando o histórico e a distinção entre fotografia real e simulação.
- Não faça deploy, commit ou push sem solicitação adicional.

## Verificação e entrega

1. Confirme que todas as novas URLs de imagem respondem e que não restou referência aos 10 placeholders nas páginas afetadas.
2. Verifique visualmente em desktop (1440 px) e celular (390 px): quatro comparadores, o painel Exames complementares da home, as etapas de Como atendemos e a avaliação em Cirurgias.
3. Nos sliders, teste as posições 0, 50 e 100%, além de toque e teclado; confira se boca e rosto se mantêm alinhados.
4. Confirme `srcset`, fallback JPG, carregamento sem deslocamento de layout e legendas legíveis no celular.
5. Verifique que nenhuma imagem sintética está descrita como paciente real ou resultado da CROFACE.
6. Revise o diff, preservando as mudanças anteriores. Relate os arquivos alterados, o que foi verificado em navegador e qualquer limitação real de verificação.
