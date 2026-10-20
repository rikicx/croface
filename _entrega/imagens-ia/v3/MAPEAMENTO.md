# CROFACE: imagens v3, benefício percebido pelo paciente

Versão atual de 20/10/2026. Esta direção substitui a primeira entrega e o experimento de modelos 3D, interrompido pelo usuário. O briefing vigente pede imagens fotográficas que mostrem o ganho visível no sorriso.

## As 10 imagens

| Grupo | Antes | Depois / benefício |
|---|---|---|
| Implante | Ausência de um dente superior | Sorriso completo, com reposição ilustrativa |
| Prótese | Prótese superior com dentes desgastados e amarelados | Aparência renovada, com dentes mais claros e contornos harmoniosos |
| Restauração | Incisivo com parte da borda lascada | Dente recomposto, com contorno completo |
| Profilaxia | Depósitos e manchas superficiais nos dentes inferiores | Aspecto limpo, preservando a cor natural do esmalte |
| Exames complementares | — | Mulher idosa participa da explicação de um exame, em vez de uma tela dominar a cena |
| Avaliação cirúrgica | — | Homem idoso acompanha uma conversa de planejamento, com atenção e participação |

Os oito sorrisos têm enquadramento horizontal 2:1, concentrado na boca. Há menos área de rosto que na versão inicial. A diferença relevante deve continuar legível em uma largura de celular; os estados Depois foram editados a partir do respectivo Antes para conservar o enquadramento.

## Arquivos atuais

- **Públicos:** `assets/img/ia/v3/`, com 40 exportações: 10 imagens, em WebP e JPG, em duas larguras.
- **Originais:** `_entrega/imagens-ia/v3/originais/`, com os 10 PNG selecionados.
- Sorrisos: **1600 × 800** e **800 × 400**; versão menor com sufixo `-800`.
- Exames complementares: **1440 × 1080** e **720 × 540**; sufixo `-720`.
- Avaliação cirúrgica: **1120 × 1400** e **640 × 800**; sufixo `-640`.
- Os PNG dos sorrisos têm resolução nativa **1774 × 887**; a cena de exames, **1448 × 1086**; a cena vertical, **1122 × 1402**. As exportações são reduções, sem ampliação artificial.
- `manifesto.json`: lista completa, dimensões, tamanhos em bytes e SHA-256.
- `prompts.json`: prompts finais completos de geração e edição, incluindo o refinamento de cor da prótese. Ferramenta: **image_gen integrada**, sem CLI de geração.
- `PROMPT-CLAUDE-CODE.md`: implementação dos 10 arquivos, ajuste local do comparador para 2:1, posicionamento do controle e legendas.
- `PREVIA-COMPARATIVOS.jpg` e `PREVIA-AVALIACAO.jpg`: pranchas para consulta; seus títulos não estão gravados nas imagens públicas.

Os nomes são `antes-implante-ia-v3`, `depois-implante-ia-v3`, `antes-protese-ia-v3`, `depois-protese-ia-v3`, `antes-clinica-ia-v3`, `depois-clinica-ia-v3`, `antes-prevencao-ia-v3`, `depois-prevencao-ia-v3`, `consulta-3-exames-ia-v3` e `cirurgia-1-avaliacao-ia-v3`.

## Origem e implementação

As pessoas, os sorrisos, os profissionais e os ambientes são fictícios. As imagens não documentam pacientes, tratamentos ou resultados realizados pela CROFACE. Conforme a revisão solicitada pelo usuário, os textos alternativos e as legendas públicas não mencionam IA. O prompt usa descrições naturais dos tratamentos e do benefício para o público 50+, apresenta a comparação como ilustrativa e substitui as legendas que atribuíam o material a casos reais. A origem permanece registrada na documentação interna.

Clareamento foi usado pelo usuário como exemplo da lógica de mostrar um benefício. Não foi acrescentado um tratamento novo: o par de profilaxia mostra limpeza; o par de prótese mostra uma nova aparência da peça.

As fotos reais existentes foram preservadas. Cirurgias e Dentista para idosos continuam sem novos comparadores. Esta entrega não alterou HTML, CSS ou JS: a integração fica com o Claude Code, conforme solicitado.

## Conferência da entrega

Os quatro pares foram inspecionados lado a lado e em reduções de **360 × 180**, para avaliar a leitura da diferença em celular. As duas cenas de avaliação foram conferidas visualmente. Os 40 arquivos públicos foram decodificados para verificar dimensões e integridade, e seus hashes foram conferidos contra o manifesto. Os WebP principais têm entre **78 e 128 KiB**. A verificação em navegador dentro das páginas reais continua sendo parte da integração descrita no prompt.
