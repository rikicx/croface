# CROFACE — Seções e imagens do site

> **Atualizado em 13/10/2026 (v4).** A home e as páginas mudaram; veja o resumo em ENTREGA.md. Fotos reais já aplicadas: `equipe-*` (retratos e consultório), `menu-recepcao`, `atendimento-hero`, `idosos-hero`, `idosos-atendimento`, `prevencao-hero`, `clinica-hero`, `protese-hero`, `protese-1/2/3`, `prevencao-1/2`, `longevidade-consultorio` (Dra. Renata no consultório; substituiu a selfie), `avaliacao-exame`, `consulta-1-exame`, `seg-estrutura-consultorio`, `seg-equip-paramentacao`. Novas fotos a captar: `camera-intraoral` (prioridade) e os pares `antes-*` / `depois-*` (implante, protese, clinica, prevencao), com autorização por escrito do paciente.
>
> **Opções de chamada emocional para o hero** (no ar hoje: a primeira):
> 1. Sorrisos saudáveis para uma vida mais plena. (em uso; definido pelo cliente em 16/10/2026)
> 2. Volte a pedir o que quiser no cardápio.
> 3. A mesa de domingo é melhor quando nada incomoda.
> 4. Rir sem cobrir a boca. Comer sem escolher pelo dente.
> 5. Mais anos à mesa, ao lado de quem você ama.


Mapa de todas as páginas: o que cada seção faz, o que ela diz e qual foto precisa.
Hoje todas as fotos são placeholders marcados **FOTO A CAPTAR**. Para trocar, salve a foto real em `assets/img/` com o **mesmo nome**, em **.jpg e .webp**.

**Regras para todas as fotos**
- Foto real da clínica, com luz do consultório ou natural. Nada de banco de imagem e nada de filtro.
- Nenhum rosto de paciente sem **autorização de uso de imagem por escrito**.
- Nenhuma foto de dentes ou boca de paciente: não pode parecer "antes e depois", que é vedado pelo CFO.
- Nenhum valor, preço ou tabela visível na foto.
- Exportar em JPG com qualidade ~75 e em WebP. Os tamanhos estão na tabela do fim.

---

## Estrutura do site

```
/                                          Início (página longa, porta de entrada)
/implante-dentario-vila-mariana/           Implante dentário
/protese-dentaria-vila-mariana/            Prótese dentária
/cirurgia-bucomaxilofacial-vila-mariana/   Cirurgia bucomaxilofacial
/limpeza-e-prevencao-vila-mariana/         Limpeza e prevenção
/dentista-para-idosos-vila-mariana/        Dentista para idosos (mastigação, autonomia, familiares)
/como-atendemos/                           Primeira consulta, preparo, conforto, biossegurança
```

Cada página de tratamento mira **uma** busca ("implante dentário Vila Mariana", "prótese dentária Vila Mariana" etc.). A home não compete com elas: resume e manda para lá.

## Elementos que aparecem em todas as páginas

| Elemento | O que faz | Foto |
|---|---|---|
| Barra fina no topo | WhatsApp, Ligar e endereço, sempre clicáveis | — |
| Header | Logo à esquerda, barra escura no centro, botão de menu à direita | — |
| Mega-menu **Queixas** | 8 sintomas em linguagem de paciente, cada um leva à página e ao trecho certos | — (ícones) |
| Mega-menu **Tratamentos** | 5 miniaturas com foto e legenda, uma por página de tratamento | Miniaturas `*-thumb`, geradas das fotos de capa |
| Menu em tela cheia | Foto à esquerda com cartão de contato; lista de páginas à direita | `menu-recepcao` |
| Barra de seções | Gruda no topo ao rolar; atalhos da página e botão de WhatsApp | — |
| Rodapé | Dados da clínica, CNPJ, responsável técnico, CROs e links de todas as páginas | — |

---

## Página inicial `/`

| # | Seção | Para que serve / interação | Foto |
|---|---|---|---|
| — | **Hero** (tela cheia, centralizado) | Promessa principal, **um** botão (WhatsApp) + link "Como é a primeira consulta", responsável técnica. Fica **preso** ao rolar: o conteúdo sobe por cima, o texto some e a foto escurece | `hero-atendimento` (e a versão `-960`) |
| — | **Barra de seções** (vidro leitoso) | Sobre a base do hero, meio transparente; ao grudar no topo fica opaca e mostra o botão "WhatsApp" | — |
| 1 | **Qual é a sua queixa?** | **Explorador**: 8 sintomas à esquerda, detalhe à direita (troca ao clicar), com link para a página certa | — (ícones) |
| 2 | **Odontologia dentro de um centro de longevidade** | Foto fixa com o texto rolando à esquerda; a foto troca no meio | `longevidade-consultorio` (etapas 1 e 2) → `avaliacao-exame` |
| 3 | **Como é a primeira consulta** | **Rolagem horizontal presa** (desktop): a seção fica fixa e as 5 etapas passam para o lado conforme a página rola. No celular: toque nas etapas ou deslize | `consulta-1-exame` … `consulta-5-plano` |
| 4 | **O que tratamos** | **Carrossel arrastável** com 6 cards (5 tratamentos + Como atendemos) | Capas das páginas: `implante-hero`, `protese-hero`, `cirurgia-hero`, `prevencao-hero`, `idosos-hero`, `atendimento-hero` (reaproveitadas) |
| 5 | **Segurança e esterilização** | Galeria com abas: Estrutura / Esterilização / Equipamento | 6 fotos `seg-*` |
| 6 | **Quem atende você** | 3 sócios com nome, função e CRO; o card abre o WhatsApp | `equipe-wesley`, `equipe-renata`, `equipe-marcelo` |
| 7 | **Para quem cuida de alguém** | Sinais do dia a dia e botão "Enviar esta página" | `cuidador-familia` |
| 8 | **Onde estamos + contato** | Endereço, referência, horário, acessibilidade, botão grande de WhatsApp, telefone, rota, Instagram; mapa ao lado (carrega só no clique) | — |

**Sempre visíveis:** no celular, o botão redondo de WhatsApp fica fixo no canto inferior direito. Em todas as telas, a seta de "voltar ao topo" aparece depois de rolar.

## Páginas de tratamento (mesmo modelo nas 5)

Todas seguem a mesma sequência:

1. **Capa**: navegação de volta ao início (breadcrumb), título com o termo de busca e bairro, resumo, botão de WhatsApp e 2–3 fatos curtos. A foto fica à direita, sangrando até a borda.
2. **Seções numeradas** com o conteúdo, detalhadas abaixo.
3. Um bloco de **foto fixa + etapas rolando à esquerda**, com a foto trocando conforme a etapa.
4. **Perguntas frequentes**, em blocos que abrem e fecham.
5. **Faixa de agendamento**: bloco escuro com um cartão claro deslocado por cima.
6. **Veja também**: miniaturas dos outros tratamentos.

### Implante dentário `/implante-dentario-vila-mariana/`

| # | Seção | Conteúdo | Foto |
|---|---|---|---|
| — | Capa | O que é o implante e para que serve | `implante-hero` — dentista mostrando modelo de implante ao paciente |
| 1 | Quando o implante faz sentido | Para quem é, o que é avaliado antes, idade não é contraindicação | — |
| 2 | Como funciona o tratamento *(foto fixa)* | 6 etapas: avaliação e tomografia → planejamento → instalação → cicatrização → prótese → manutenção | `implante-1-avaliacao` (tomografia na tela, dentista e paciente juntos) · `implante-2-cirurgia` (sala e kit organizados) · `implante-3-protese` (coroa sobre implante em modelo) |
| 3 | Um dente, vários ou todos | Unitário, ponte, protocolo, dentadura presa em implantes | — |
| 4 | Cuidados | Primeiros dias × dia a dia | — |
| 5 | Perguntas frequentes | Dor, idade, diabetes/osteoporose, provisório, prazo, durabilidade, custo, convênio | — |

### Prótese dentária `/protese-dentaria-vila-mariana/`

| # | Seção | Conteúdo | Foto |
|---|---|---|---|
| — | Capa | Prótese que incomoda não precisa ser aceita | `protese-hero` — prótese nas mãos do dentista, em conversa com o paciente |
| 1 | Quando a prótese precisa de atenção | Sinais, por que a prótese deixa de encaixar, o que pode ser feito (ajuste, reembasamento, conserto, nova, implante) | — |
| 2 | Tipos de prótese | Coroa, ponte, parcial removível, total, sobre implante | — |
| 3 | Como a prótese é feita *(foto fixa)* | Avaliação → moldagem → mordida/cor → prova → ajustes → acompanhamento | `protese-1-moldagem` (materiais de moldagem) · `protese-2-prova` (escala de cores) · `protese-3-ajuste` (ajuste na bancada) |
| 4 | Adaptação e cuidados | Primeiras semanas × todo dia | — |
| 5 | Perguntas frequentes | Cola, durabilidade, dormir de prótese, fixa × removível, aproveitar a atual | — |

### Cirurgia bucomaxilofacial `/cirurgia-bucomaxilofacial-vila-mariana/`

| # | Seção | Conteúdo | Foto |
|---|---|---|---|
| — | Capa | Responsável identificado com CRO | `cirurgia-hero` — Dr. Wesley em conversa de planejamento |
| 1 | O que é | A área e o que é feito no consultório | `equipe-wesley` (reaproveitada, em miniatura) |
| 2 | Procedimentos | Extrações/sisos, enxertos, pré-protéticas, implantes, lesões/biópsias, ATM (**lista a confirmar**) | — |
| 3 | Dor na mandíbula | Sinais, causas, tratamento conservador primeiro | — |
| 4 | Como é uma cirurgia *(foto fixa)* | Avaliação → preparo → o dia → pós-operatório → retorno | `cirurgia-1-avaliacao` (tomografia/panorâmica na tela) · `cirurgia-2-sala` (sala montada, instrumental estéril) · `cirurgia-3-pos` (orientações de pós entregues ao paciente) |
| 5 | Se você toma remédios | Anticoagulantes, osteoporose, pressão, diabetes; nunca suspender por conta própria | — |
| 6 | Perguntas frequentes | Dor, acompanhante, recuperação, siso, idade, custo, convênio | — |

### Limpeza e prevenção `/limpeza-e-prevencao-vila-mariana/`

| # | Seção | Conteúdo | Foto |
|---|---|---|---|
| — | Capa | Prevenir para manter a mastigação | `prevencao-hero` — limpeza profissional em plano aberto |
| 1 | Por que muda depois dos 50 | Gengiva que retrai, boca seca, restaurações antigas, doença da gengiva | — |
| 2 | O que cada sinal pode indicar | Blocos: gengiva que sangra, sensibilidade, dente quebrado, dente escurecido (destinos dos cartões de queixa) | — |
| 3 | Consulta de manutenção *(foto fixa)* | Saúde → exame → limpeza → orientação → retorno | `prevencao-1-exame` (exame da gengiva com sonda) · `prevencao-2-limpeza` (limpeza em andamento) · `prevencao-3-orientacao` (orientação com escovas interdentais) |
| 4 | Cuidados em casa | Todo dia × quando as mãos já não ajudam tanto | — |
| 5 | Perguntas frequentes | Dor, frequência, prótese, implante | — |

### Dentista para idosos `/dentista-para-idosos-vila-mariana/`

| # | Seção | Conteúdo | Foto |
|---|---|---|---|
| — | Capa | Odontologia para autonomia, no mesmo prédio da Conatus | `idosos-hero` — paciente 60+ conversando com o dentista, com familiar ao lado |
| 1 | A boca no começo da cadeia *(foto fixa, fundo escuro)* | Sarcopenia, a cadeia até a autonomia, clínica e Conatus lado a lado | `longevidade-consultorio`, foto única (reaproveitadas) |
| 2 | Sinais na mastigação | 8 sinais observáveis e para onde levar | — |
| 3 | O que é diferente aqui | Sem pressa, você decide, remédios, câmera, acompanhante, acesso | — |
| 4 | Para filhos e familiares | Como abrir a conversa sem tirar a autonomia, e botão de enviar a página | — |
| 5 | Perguntas frequentes | Medo, idade, remédios, acompanhar, marcar pelo pai, domicílio | — |

### Como atendemos `/como-atendemos/`

| # | Seção | Conteúdo | Foto |
|---|---|---|---|
| — | Capa | O método da clínica | `atendimento-hero` — recepção com paciente sendo recebido |
| 1 | Primeira consulta *(foto fixa)* | 6 etapas detalhadas | `consulta-1` … `consulta-5` (reaproveitadas da home) |
| 2 | O que levar e bom saber | Documentos, remédios, exames, próteses; sem jejum | — |
| 3 | Para quem tem medo de dentista | O que garantimos na primeira consulta | — |
| 4 | Biossegurança | Protocolo entre pacientes e 4 fotos | `seg-estrutura-consultorio`, `seg-esterilizacao-autoclave`, `seg-esterilizacao-embalagem`, `seg-equip-paramentacao` (reaproveitadas) |
| 5 | Tratamento e acompanhamento | O que acontece depois do plano | — |
| 6 | Perguntas frequentes | Agendamento, custo da avaliação, duração, estacionamento, horário | — |

---

## Lista completa de fotos (37 captações + 1 opcional)

### Formatos

| Uso | Proporção | Tamanho do arquivo |
|---|---|---|
| Hero da home | 16:10 horizontal | 1920×1200 **e** 960×600 (`-960`) |
| Capas das páginas internas (`*-hero`) | 4:3 horizontal | 1200×900 |
| Foto fixa das etapas (`*-1-*`, `*-2-*`, `*-3-*`) | 4:5 **vertical** | 1000×1250 |
| Consulta, segurança, Conatus | 4:3 horizontal | 1200×900 |
| Retratos da equipe | 4:5 vertical | 900×1125 |
| Fachada, recepção do menu, familiar | 4:5 vertical | 1200×1500 |
| Compartilhamento (`og-croface`) | 1,91:1 | 1200×630 |
| Miniaturas dos menus (`*-thumb`) | 4:3 | 480×360, **redução da capa** da página, sem foto nova |

> As fotos fixas aparecem altas no computador e mais baixas no celular. Deixe o assunto no **centro** do quadro, com respiro nas bordas.

### Por sessão de fotos (para organizar o dia da captação)

**Espaço e prédio (sem pessoas ou com equipe)**
| Arquivo | O que mostrar |
|---|---|
| `predio-fachada` | Fachada da Rua Coronel Diogo, 484, vertical, com a identificação visível |
| ~~`predio-conatus`~~ | **Retirada (16/10/2026):** os doutores acharam que a foto da Conatus podia confundir o público. Não usar foto da Conatus no site. |
| `menu-recepcao` | Recepção/entrada, vertical |
| `seg-estrutura-consultorio` | Consultório completo e organizado |
| `seg-estrutura-recepcao` | Recepção e acesso (mostrar elevador/rampa, se houver) |
| `local-entrada` | *Opcional/reserva:* entrada vista da calçada |

**Biossegurança e equipamento (só mãos e objetos)**
| Arquivo | O que mostrar |
|---|---|
| `seg-esterilizacao-autoclave` | Autoclave em uso |
| `seg-esterilizacao-embalagem` | Instrumental embalado e selado |
| `seg-equip-camera` | A câmera intraoral |
| `seg-equip-paramentacao` | Profissional paramentado (luvas, máscara, gorro, protetor facial) |
| `implante-2-cirurgia` | Kit de implante e sala organizados |
| `cirurgia-2-sala` | Sala cirúrgica montada, instrumental estéril |
| `protese-1-moldagem` | Materiais de moldagem |
| `protese-2-prova` | Escala de cores de dentes |
| `protese-3-ajuste` | Ajuste fino de prótese na bancada |
| `implante-3-protese` | Coroa sobre implante em modelo de gesso |

**Telas e explicação (dentista + paciente ou modelo, sem close na boca)**
| Arquivo | O que mostrar |
|---|---|
| `consulta-2-camera` | Imagem da câmera intraoral no monitor (sem identificar o paciente) |
| `consulta-3-exames` | Dentista analisando radiografia/tomografia na tela |
| `implante-1-avaliacao` | Tomografia na tela, dentista e paciente olhando juntos |
| `cirurgia-1-avaliacao` | Tomografia/panorâmica sendo analisada |
| `consulta-4-diagnostico` | Dentista **sentado ao lado** do paciente, explicando |
| `consulta-5-plano` | Plano apresentado (papel ou tela), sem valores |
| `cirurgia-3-pos` | Orientações de pós-operatório sendo entregues |
| `prevencao-3-orientacao` | Orientação com escovas interdentais |

**Atendimento (exige autorização de imagem, ou usar funcionários/modelos)**
| Arquivo | O que mostrar |
|---|---|
| `hero-atendimento` | Dentista conversando com paciente 50+ na cadeira, antes do exame. Lado esquerdo mais "limpo" (o texto fica ali) |
| `consulta-1-exame` | Exame com calma, dentista sentado |
| `prevencao-1-exame` | Exame da gengiva |
| `prevencao-2-limpeza` | Limpeza em andamento, plano aberto |
| `prevencao-hero` | Limpeza profissional, plano aberto (variação da anterior) |
| `implante-hero` | Dentista mostrando modelo de implante ao paciente |
| `protese-hero` | Prótese nas mãos do dentista, em conversa |
| `idosos-hero` | Paciente 60+ com o dentista e um familiar ao lado |
| `atendimento-hero` | Paciente sendo recebido na recepção |
| `cuidador-familia` | Familiar adulto acompanhando paciente na recepção, vertical |

**Retratos (mesma luz, mesmo fundo, mesmo enquadramento)**
| Arquivo | O que mostrar |
|---|---|
| `equipe-wesley` | Dr. Wesley. Terço inferior esquerdo livre (a etiqueta com nome cobre essa área) |
| `equipe-renata` | Dra. Renata, idem |
| `equipe-marcelo` | Dr. Marcelo, idem |
| `cirurgia-hero` | Dr. Wesley em conversa de planejamento (pode ser na mesma sessão dos retratos) |

**Montagem (não é captação)**
| Arquivo | O que é |
|---|---|
| `og-croface` | Foto da clínica com o nome CROFACE legível. É a imagem que aparece quando o link é enviado no WhatsApp |
| `*-thumb` (5) | Redução automática das capas `implante-hero`, `protese-hero`, `cirurgia-hero`, `prevencao-hero`, `idosos-hero` |
| `hero-atendimento-960` | Redução do hero da home |

Também falta o **logo oficial em SVG**.
