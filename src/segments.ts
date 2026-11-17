export type Speaker = 'ANA' | 'RAFAEL' | 'HELENA' | 'NIKOS' | 'CAROL';

export type Section =
  | 'abertura'
  | 'linha-do-tempo'
  | 'economia'
  | 'campo'
  | 'politica'
  | 'consequencias'
  | 'fechamento';

export interface Segment {
  id: string;
  speaker: Speaker;
  /** Texto exibido na legenda. */
  text: string;
  /** Texto otimizado para TTS (símbolos por extenso). */
  tts: string;
  section: Section;
  /** Descrição do B-roll de apoio (placeholder licenciado). */
  broll?: string;
  /** Dados/chaves a destacar em letras grandes na tela. */
  highlight?: string[];
  lowerThird?: string; // papel exibido abaixo do nome
}

export const SPEAKERS: Record<Speaker, { name: string; role: string; color: string }> = {
  ANA: { name: 'ANA', role: 'Apresentadora e mediadora', color: '#2563eb' },
  RAFAEL: { name: 'RAFAEL', role: 'Economista', color: '#0f766e' },
  HELENA: { name: 'HELENA', role: 'Cientista política', color: '#7c3aed' },
  NIKOS: { name: 'NIKOS', role: 'Produtor rural', color: '#b45309' },
  CAROL: { name: 'CAROL', role: 'Correspondente na Europa', color: '#dc2626' },
};

export const SECTIONS: Record<Section, { label: string; start: number; end: number }> = {
  abertura: { label: 'Abertura', start: 0, end: 40 },
  'linha-do-tempo': { label: 'O que aconteceu', start: 40, end: 120 },
  economia: { label: 'Economia', start: 120, end: 210 },
  campo: { label: 'O campo', start: 210, end: 285 },
  politica: { label: 'Política', start: 285, end: 360 },
  consequencias: { label: 'Consequências', start: 360, end: 435 },
  fechamento: { label: 'Fechamento', start: 435, end: 480 },
};

export const SEGMENTS: Segment[] = [
  {
    id: 's1',
    speaker: 'ANA',
    section: 'abertura',
    text:
      'Tratores bloqueando estrada. Estudantes acampados na frente do Parlamento. Professores e médicos de greve. A Grécia, que saiu de uma das maiores crises da Europa, voltou para as ruas. E isso não é só um problema grego: faz parte de uma onda que atravessa o continente. Hoje a gente conversa sobre o que está por trás: política, dinheiro e o que vem pela frente. Vamos nessa.',
    tts:
      'Tratores bloqueando estrada. Estudantes acampados na frente do Parlamento. Professores e médicos de greve. A Grécia, que saiu de uma das maiores crises da Europa, voltou para as ruas. E isso não é só um problema grego: faz parte de uma onda que atravessa o continente. Hoje a gente conversa sobre o que está por trás: política, dinheiro e o que vem pela frente. Vamos nessa.',
    broll: 'Tratores bloqueando rodovia; tendas diante do Parlamento em Atenas; professores e médicos em greve',
  },
  {
    id: 's2',
    speaker: 'CAROL',
    section: 'linha-do-tempo',
    text:
      'Vou resumir em ordem. Fim de novembro de 2025: agricultores começam a bloquear estradas por causa de atrasos em subsídios europeus, depois de um escândalo na agência que paga esse dinheiro, a OPEKEPE. Fevereiro de 2026: atos nos três anos da tragédia de Tempi, o acidente de trem que matou 57 pessoas. Março: protestos contra o gasto militar, com uma bandeira da União Europeia queimada diante do escritório do bloco em Atenas. Setembro: mais de 25 mil pessoas em Salônica contra o custo de vida, segundo a polícia.',
    tts:
      'Vou resumir em ordem. Fim de novembro de dois mil e vinte e cinco: agricultores começam a bloquear estradas por causa de atrasos em subsídios europeus, depois de um escândalo na agência que paga esse dinheiro, a O P E K E P E. Fevereiro de dois mil e vinte e seis: atos nos três anos da tragédia de Tempi, o acidente de trem que matou cinquenta e sete pessoas. Março: protestos contra o gasto militar, com uma bandeira da União Europeia queimada diante do escritório do bloco em Atenas. Setembro: mais de vinte e cinco mil pessoas em Salônica contra o custo de vida, segundo a polícia.',
    highlight: [
      'LINHA DO TEMPO 2025–2026',
      'Nov/2025 · OPEKEPE',
      'Fev/2026 · Tempi · 57 vítimas',
      'Mar/2026 · Gasto militar',
      'Set/2026 · 25 mil em Salônica',
    ],
    broll: 'Gráfico: linha do tempo 2025–2026',
  },
  {
    id: 's3',
    speaker: 'ANA',
    section: 'linha-do-tempo',
    text: 'E em outubro?',
    tts: 'E em outubro?',
  },
  {
    id: 's4',
    speaker: 'CAROL',
    section: 'linha-do-tempo',
    text:
      'Dia 21. Estudantes, professores e funcionários públicos tomam Atenas. A polícia fala em 5 a 10 mil pessoas só na capital, com atos também em Salônica e Patras. Os manifestantes gritavam “da Grécia à França, queremos educação pública e gratuita”.',
    tts:
      'Dia vinte e um. Estudantes, professores e funcionários públicos tomam Atenas. A polícia fala em cinco a dez mil pessoas só na capital, com atos também em Salônica e Patras. Os manifestantes gritavam: da Grécia à França, queremos educação pública e gratuita.',
    highlight: ['21/10 · 5 a 10 mil em Atenas', '“Da Grécia à França, educação pública e gratuita”'],
  },
  {
    id: 's5',
    speaker: 'HELENA',
    section: 'linha-do-tempo',
    text:
      'E esse grito é o ponto. Há solidariedade com França e Espanha, e a onda chegou também à Itália e à Albânia. A Grécia não está isolada.',
    tts:
      'E esse grito é o ponto. Há solidariedade com França e Espanha, e a onda chegou também à Itália e à Albânia. A Grécia não está isolada.',
    highlight: ['Onda na Europa: França, Espanha, Itália e Albânia'],
  },
  {
    id: 's6',
    speaker: 'RAFAEL',
    section: 'economia',
    text:
      'O paradoxo é este. No papel, a Grécia vai bem: crescimento de 2,1% no ano passado, superávit nas contas e dívida caindo em proporção do PIB. A inflação foi de 2,7% em julho, abaixo dos 3,9% de junho. O governo diz que está entregando.',
    tts:
      'O paradoxo é este. No papel, a Grécia vai bem: crescimento de dois vírgula um por cento no ano passado, superávit nas contas e dívida caindo em proporção do PIB. A inflação foi de dois vírgula sete por cento em julho, abaixo dos três vírgula nove por cento de junho. O governo diz que está entregando.',
    highlight: ['CRESCIMENTO 2,1%', 'INFLAÇÃO 2,7% (jul)'],
    lowerThird: 'Rafael · Economista',
  },
  {
    id: 's7',
    speaker: 'ANA',
    section: 'economia',
    text: 'Mas a rua discorda.',
    tts: 'Mas a rua discorda.',
  },
  {
    id: 's8',
    speaker: 'RAFAEL',
    section: 'economia',
    text:
      'Porque o salário médio, uns 1.500 euros, segundo a Reuters, continua no nível de 2009. A Grécia tem o segundo menor salário médio da União Europeia e o segundo maior aumento de aluguel. A dívida da crise, que levou a três resgates de cerca de 290 bilhões de euros entre 2009 e 2018, deixou cicatrizes. Na educação, o país gastou 3,3% do PIB em 2023, contra 4,7% da média europeia, e os sindicatos falam em 15 mil professores a menos no secundário.',
    tts:
      'Porque o salário médio, uns mil e quinhentos euros, segundo a Reuters, continua no nível de dois mil e nove. A Grécia tem o segundo menor salário médio da União Europeia e o segundo maior aumento de aluguel. A dívida da crise, que levou a três resgates de cerca de duzentos e noventa bilhões de euros entre dois mil e nove e dois mil e dezoito, deixou cicatrizes. Na educação, o país gastou três vírgula três por cento do PIB em dois mil e vinte e três, contra quatro vírgula sete por cento da média europeia, e os sindicatos falam em quinze mil professores a menos no secundário.',
    highlight: [
      'Salário médio ~€1.500 (nível de 2009)',
      'Educação: 3,3% do PIB vs 4,7% média UE',
      '15 mil professores a menos no secundário',
    ],
  },
  {
    id: 's9',
    speaker: 'HELENA',
    section: 'economia',
    text:
      'O governo responde com números também. Cita mais de 733 milhões de euros em moradia estudantil e obras em escolas, cerca de 1 bilhão em ajuda contra a alta de energia e um plano de cerca de 30 medidas, de tributos a salários, que custaria 3,5 bilhões até 2030. Os críticos dizem que é pouco e chega perto de eleição.',
    tts:
      'O governo responde com números também. Cita mais de setecentos e trinta e três milhões de euros em moradia estudantil e obras em escolas, cerca de um bilhão em ajuda contra a alta de energia e um plano de cerca de trinta medidas, de tributos a salários, que custaria três vírgula cinco bilhões até dois mil e trinta. Os críticos dizem que é pouco e chega perto de eleição.',
    highlight: [
      '733 milhões euros moradia estudantil',
      '~1 bilhão ajuda energia',
      '3,5 bilhões plano até 2030',
    ],
  },
  {
    id: 's10',
    speaker: 'RAFAEL',
    section: 'economia',
    text:
      'E tem a defesa. Dados da Otan citados pela imprensa põem o gasto militar grego em 3,65% do PIB, entre os mais altos da aliança. Parte do eleitorado apoia, por causa da tensão com a Turquia. Outra parte pergunta por que o dinheiro não vai para hospitais e escolas.',
    tts:
      'E tem a defesa. Dados da Otan citados pela imprensa põem o gasto militar grego em três vírgula sessenta e cinco por cento do PIB, entre os mais altos da aliança. Parte do eleitorado apoia, por causa da tensão com a Turquia. Outra parte pergunta por que o dinheiro não vai para hospitais e escolas.',
    highlight: ['Gasto militar 3,65% do PIB (Otan)'],
  },
  {
    id: 's11',
    speaker: 'NIKOS',
    section: 'campo',
    text:
      'Eu olho para o campo, e lá o estopim foi o escândalo da OPEKEPE. A Procuradoria Europeia apontou 324 pessoas que teriam recebido 19,6 milhões de euros de forma ilegal. Resultado: o dinheiro de quem trabalha direito atrasou também. Os produtores reclamam de combustível e energia caros, de preço baixo, como no azeite, e da diferença entre o que recebem e o que o consumidor paga na prateleira. Muitos temem a concorrência do acordo comercial da UE com países sul-americanos, o Mercosul.',
    tts:
      'Eu olho para o campo, e lá o estopim foi o escândalo da O P E K E P E. A Procuradoria Europeia apontou trezentos e vinte e quatro pessoas que teriam recebido dezenove vírgula seis milhões de euros de forma ilegal. Resultado: o dinheiro de quem trabalha direito atrasou também. Os produtores reclamam de combustível e energia caros, de preço baixo, como no azeite, e da diferença entre o que recebem e o que o consumidor paga na prateleira. Muitos temem a concorrência do acordo comercial da U E com países sul-americanos, o Mercosul.',
    highlight: ['OPEKEPE: 324 pessoas, 19,6 milhões € irregulares', 'Concorrência do Mercosul'],
    broll: 'Bloqueio em Nikaia, perto de Larissa; fila de caminhões na fronteira',
  },
  {
    id: 's12',
    speaker: 'ANA',
    section: 'campo',
    text: 'O governo diz o quê?',
    tts: 'O governo diz o quê?',
  },
  {
    id: 's13',
    speaker: 'NIKOS',
    section: 'campo',
    text:
      'Que os subsídios estão em nível recorde, 3,7 bilhões de euros em 2025, e que bloquear estrada não ajuda os próprios agricultores. Só que a Comissão Europeia mandou a Grécia abrir mão de cerca de 400 milhões de euros em 2026, mais de 20% dos pagamentos diretos, e o governo prometeu extinguir a OPEKEPE até o fim do ano. Os agricultores exigem fiscalização forte e não querem a agência absorvida pela Receita.',
    tts:
      'Que os subsídios estão em nível recorde, três vírgula sete bilhões de euros em dois mil e vinte e cinco, e que bloquear estrada não ajuda os próprios agricultores. Só que a Comissão Europeia mandou a Grécia abrir mão de cerca de quatrocentos milhões de euros em dois mil e vinte e seis, mais de vinte por cento dos pagamentos diretos, e o governo prometeu extinguir a O P E K E P E até o fim do ano. Os agricultores exigem fiscalização forte e não querem a agência absorvida pela Receita.',
    highlight: [
      'Subsídios recorde: 3,7 bilhões € (2025)',
      'Perda de ~400 milhões € (2026, >20%)',
      'Fim da OPEKEPE até o fim do ano',
    ],
  },
  {
    id: 's14',
    speaker: 'HELENA',
    section: 'politica',
    text:
      'Politicamente, é o seguinte. Kyriakos Mitsotakis está no poder desde 2019 e as eleições devem ocorrer na primavera ou em meados de 2027. O governo carrega o peso de Tempi, do caso de espionagem com o software Predator e da OPEKEPE. O premiê diz que a Grécia não vai voltar à instabilidade social dos anos de austeridade.',
    tts:
      'Politicamente, é o seguinte. Quiríacos Mitsotakis está no poder desde dois mil e dezenove e as eleições devem ocorrer na primavera ou em meados de dois mil e vinte e sete. O governo carrega o peso de Tempi, do caso de espionagem com o software Predator e da O P E K E P E. O premiê diz que a Grécia não vai voltar à instabilidade social dos anos de austeridade.',
    highlight: ['ELEIÇÕES PREVISTAS PARA 2027', 'Mitsotakis no poder desde 2019'],
    broll: 'Kyriakos Mitsotakis; Parlamento grego',
  },
  {
    id: 's15',
    speaker: 'ANA',
    section: 'politica',
    text: 'E a oposição?',
    tts: 'E a oposição?',
  },
  {
    id: 's16',
    speaker: 'HELENA',
    section: 'politica',
    text:
      'Fragmentada. Por isso a energia das ruas não vira voto automaticamente. A Nova Democracia segue como o maior partido, em torno de 25% a 30% nas pesquisas, mas análises dizem que governar sozinha ficou mais difícil: seriam necessários cerca de 36% a 37% dos votos para uma maioria própria no sistema grego.',
    tts:
      'Fragmentada. Por isso a energia das ruas não vira voto automaticamente. A Nova Democracia segue como o maior partido, em torno de vinte e cinco por cento a trinta por cento nas pesquisas, mas análises dizem que governar sozinha ficou mais difícil: seriam necessários cerca de trinta e seis por cento a trinta e sete por cento dos votos para uma maioria própria no sistema grego.',
    highlight: ['Nova Democracia ~25% a 30%', '36% a 37% para maioria própria'],
  },
  {
    id: 's17',
    speaker: 'CAROL',
    section: 'politica',
    text:
      'E os protestos mudam o tom do governo. Em setembro vieram as promessas de corte de impostos e aumento de salários. Em outubro, a ministra da Educação disse que está ouvindo os estudantes. Pressão de rua vira agenda.',
    tts:
      'E os protestos mudam o tom do governo. Em setembro vieram as promessas de corte de impostos e aumento de salários. Em outubro, a ministra da Educação disse que está ouvindo os estudantes. Pressão de rua vira agenda.',
    highlight: ['Pressão de rua vira agenda do governo'],
  },
  {
    id: 's18',
    speaker: 'RAFAEL',
    section: 'consequencias',
    text:
      'Na economia, 2026 é o ano em que o fundo europeu de recuperação começa a acabar. Há quem fale em “efeito penhasco”: como crescer sem esse dinheiro? Com a dívida perto de 360 bilhões de euros, qualquer promessa de gasto na eleição tem de caber nas regras fiscais. E a tensão no Oriente Médio mexe com a energia, que já pesa no bolso.',
    tts:
      'Na economia, dois mil e vinte e seis é o ano em que o fundo europeu de recuperação começa a acabar. Há quem fale em efeito penhasco: como crescer sem esse dinheiro? Com a dívida perto de trezentos e sessenta bilhões de euros, qualquer promessa de gasto na eleição tem de caber nas regras fiscais. E a tensão no Oriente Médio mexe com a energia, que já pesa no bolso.',
    highlight: [
      'Fundo europeu de recuperação acaba em 2026',
      '“Efeito penhasco”',
      'Dívida perto de 360 bilhões €',
    ],
  },
  {
    id: 's19',
    speaker: 'NIKOS',
    section: 'consequencias',
    text:
      'No campo, o risco é perder fundos e confiança. Bloqueio atrasa exportação e trava fronteira. Se o dinheiro não chega e a reforma da agência demora, o ciclo se repete na próxima safra.',
    tts:
      'No campo, o risco é perder fundos e confiança. Bloqueio atrasa exportação e trava fronteira. Se o dinheiro não chega e a reforma da agência demora, o ciclo se repete na próxima safra.',
    highlight: ['Campo: risco de perder fundos e confiança'],
  },
  {
    id: 's20',
    speaker: 'HELENA',
    section: 'consequencias',
    text:
      'Na política, o cenário é de coalizões e eleição em dois turnos. E sem confiança na Justiça, o julgamento de Tempi continua sendo um símbolo.',
    tts:
      'Na política, o cenário é de coalizões e eleição em dois turnos. E sem confiança na Justiça, o julgamento de Tempi continua sendo um símbolo.',
    highlight: ['Política: coalizões e eleição em dois turnos', 'Julgamento de Tempi: símbolo'],
  },
  {
    id: 's21',
    speaker: 'CAROL',
    section: 'consequencias',
    text:
      'E tem a juventude. Um estudante contou que o auxílio-aluguel de 120 euros não paga nem metade de um mês. Se jovens não conseguem morar nas cidades, o debate vira: ficam ou emigram? É uma pergunta que analistas e famílias já fazem.',
    tts:
      'E tem a juventude. Um estudante contou que o auxílio aluguel de cento e vinte euros não paga nem metade de um mês. Se jovens não conseguem morar nas cidades, o debate vira: ficam ou emigram? É uma pergunta que analistas e famílias já fazem.',
    highlight: ['Auxílio-aluguel: 120 € (não paga metade do aluguel)', 'Ficam ou emigram?'],
  },
  {
    id: 's22',
    speaker: 'ANA',
    section: 'fechamento',
    text:
      'Resumindo: a Grécia tem números macroeconômicos melhores, mas salários baixos, aluguel alto e instituições sob desconfiança. O governo aponta crescimento, superávit e pacotes de ajuda. Os manifestantes respondem que isso não chegou ao bolso. As eleições de 2027 vão dizer quem convenceu mais gente.',
    tts:
      'Resumindo: a Grécia tem números macroeconômicos melhores, mas salários baixos, aluguel alto e instituições sob desconfiança. O governo aponta crescimento, superávit e pacotes de ajuda. Os manifestantes respondem que isso não chegou ao bolso. As eleições de dois mil e vinte e sete vão dizer quem convenceu mais gente.',
  },
  {
    id: 's23',
    speaker: 'RAFAEL',
    section: 'fechamento',
    text: 'Fique de olho em salários e energia.',
    tts: 'Fique de olho em salários e energia.',
  },
  {
    id: 's24',
    speaker: 'NIKOS',
    section: 'fechamento',
    text: 'E nos pagamentos do campo.',
    tts: 'E nos pagamentos do campo.',
  },
  {
    id: 's25',
    speaker: 'HELENA',
    section: 'fechamento',
    text: 'E em como a oposição se organiza.',
    tts: 'E em como a oposição se organiza.',
  },
  {
    id: 's26',
    speaker: 'CAROL',
    section: 'fechamento',
    text: 'E nas ruas da Europa, porque essa onda está longe de acabar.',
    tts: 'E nas ruas da Europa, porque essa onda está longe de acabar.',
  },
  {
    id: 's27',
    speaker: 'ANA',
    section: 'fechamento',
    text: 'E você, o que acha? Comenta aqui e segue o perfil para a próxima conversa.',
    tts: 'E você, o que acha? Comenta aqui e segue o perfil para a próxima conversa.',
    highlight: ['Comenta e segue para a próxima conversa'],
  },
];
