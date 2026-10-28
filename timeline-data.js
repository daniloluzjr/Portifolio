/**
 * Career Timeline Data
 * Danilo Luz Jr. — Professional Experience & Academic Path
 */
const TIMELINE_DATA = {
  config: {
    minYear: 2005,
    maxYear: 2026.5,
    viewBoxWidth: 1240,
    viewBoxHeight: 560,
    marginLeft: 140,
    marginRight: 60
  },
  categories: {
    healthcare: {
      id: 'healthcare',
      label: 'Healthcare',
      color: '#2d8a4e',
      colorHover: '#3ec971',
      y: 140
    },
    education: {
      id: 'education',
      label: 'Education',
      color: '#2b78c6',
      colorHover: '#4da3ff',
      y: 280
    },
    it: {
      id: 'it',
      label: 'IT',
      color: '#e6731e',
      colorHover: '#ff9240',
      y: 420
    }
  },
  bars: [
    {
      category: 'healthcare',
      start: 2012,
      end: 2026.2,
      height: 16
    },
    {
      category: 'education',
      start: 2010,
      end: 2020,
      height: 16
    },
    {
      category: 'it',
      start: 2005,
      end: 2010,
      height: 16
    },
    {
      category: 'it',
      start: 2023.3,
      end: 2026,
      height: 16
    }
  ],
  // Rótulos do gráfico com posições calculadas para NUNCA encavalar
  labels: [
    // --- HEALTHCARE LABELS ---
    {
      id: 'lbl-hc-postgrad',
      milestoneId: 'hc-postgrad',
      lines: ['Postgraduate in', 'Biomechanics'],
      year: 2012,
      y: 85,
      category: 'healthcare',
      align: 'middle'
    },
    {
      id: 'lbl-hc-master',
      milestoneId: 'hc-master',
      lines: ['Master in Biomechanics'],
      year: 2013.8,
      y: 185,
      category: 'healthcare',
      align: 'middle'
    },
    {
      id: 'lbl-hc-aux',
      milestoneId: 'hc-aux',
      lines: ['Auxiliary Nurse', 'Certification'],
      year: 2015.8,
      y: 75, // Nível mais alto para não colidir com Surgical Nurse
      hasGuideLine: true,
      guideY1: 95,
      guideY2: 130,
      category: 'healthcare',
      align: 'middle'
    },
    {
      id: 'lbl-hc-tech-cert',
      milestoneId: 'hc-tech',
      lines: ['Technician Nurse', 'Certification'],
      year: 2017.5,
      y: 185,
      category: 'healthcare',
      align: 'middle'
    },
    {
      id: 'lbl-hc-surgical',
      milestoneId: 'hc-surgical',
      lines: ['Surgical Assistant Nurse'],
      year: 2018.6,
      y: 110, // Escalonado abaixo de Auxiliary Nurse
      category: 'healthcare',
      align: 'middle'
    },
    {
      id: 'lbl-hc-surgical-job',
      milestoneId: 'hc-surgical',
      lines: ['Surgical Nurse'],
      year: 2019.2,
      y: 125,
      isJob: true,
      category: 'healthcare',
      align: 'middle'
    },
    {
      id: 'lbl-hc-hca',
      milestoneId: 'hc-intl',
      lines: ['Healthcare Assistant'],
      year: 2021.5,
      y: 185,
      isJob: true,
      hasPeriodLine: true,
      lineStart: 2019.5,
      lineEnd: 2023.8,
      category: 'healthcare',
      align: 'middle'
    },
    {
      id: 'lbl-hc-sup',
      milestoneId: 'hc-emt',
      lines: ['Healthcare Supervisor'],
      year: 2025.2,
      y: 85,
      isJob: true,
      category: 'healthcare',
      align: 'middle'
    },
    {
      id: 'lbl-hc-emt',
      milestoneId: 'hc-emt',
      lines: ['Emergency Medical', 'Technician (EMT)'],
      year: 2026.0,
      y: 185,
      category: 'healthcare',
      align: 'middle'
    },

    // --- EDUCATION LABELS ---
    {
      id: 'lbl-edu-bachelor',
      milestoneId: 'edu-bachelor',
      lines: ['Bachelor in Physical Education'],
      year: 2010.0,
      y: 235,
      category: 'education',
      align: 'middle'
    },
    {
      id: 'lbl-edu-teacher',
      milestoneId: 'edu-teacher',
      lines: ['P.Ed. Teacher'],
      year: 2014.2,
      y: 320,
      isJob: true,
      hasPeriodLine: true,
      lineStart: 2012.3,
      lineEnd: 2016.2,
      category: 'education',
      align: 'middle'
    },
    {
      id: 'lbl-edu-prof',
      milestoneId: 'edu-prof',
      lines: ['College Professor'],
      year: 2018.5,
      y: 320,
      isJob: true,
      hasPeriodLine: true,
      lineStart: 2016.8,
      lineEnd: 2020.0,
      category: 'education',
      align: 'middle'
    },
    {
      id: 'lbl-edu-lic',
      milestoneId: 'edu-lic',
      lines: ['Bachelor in Education'],
      year: 2020.0,
      y: 345,
      category: 'education',
      align: 'middle'
    },

    // --- IT LABELS ---
    {
      id: 'lbl-it-gd-title',
      milestoneId: 'it-gd',
      lines: ['Graphic Design'],
      year: 2005.0,
      y: 380,
      category: 'it',
      align: 'middle'
    },
    {
      id: 'lbl-it-gd-job',
      milestoneId: 'it-gd',
      lines: ['Graphic Design'],
      year: 2007.5,
      y: 460,
      isJob: true,
      hasPeriodLine: true,
      lineStart: 2005.8,
      lineEnd: 2009.2,
      category: 'it',
      align: 'middle'
    },
    {
      id: 'lbl-it-ads',
      milestoneId: 'it-ads',
      lines: ['Technologist in Systems Analysis'],
      year: 2025.0,
      y: 380,
      category: 'it',
      align: 'middle'
    },
    {
      id: 'lbl-it-dev',
      milestoneId: 'it-ads',
      lines: ['Web and App Developer'],
      year: 2025.0,
      y: 460,
      isJob: true,
      category: 'it',
      align: 'middle'
    }
  ],
  // Milestones (bolinhas interativas)
  milestones: [
    {
      id: 'it-gd',
      category: 'it',
      year: 2005.0,
      title: 'Graphic Design & IT Foundations',
      period: '2005 – 2010',
      institution: 'Freelance & Agências de Design',
      role: 'Graphic Designer & Helpdesk Support',
      detail: 'Criação de identidades visuais, branding, arte gráfica em Photoshop e suporte técnico a computadores e servidores.',
      skills: 'Design Gráfico • Photoshop • Tipografia • Helpdesk'
    },
    {
      id: 'edu-bachelor',
      category: 'education',
      year: 2010.0,
      title: 'Bachelor in Physical Education',
      period: '2006 – 2010',
      institution: 'YMCA Brasil (ACM)',
      role: 'Graduando & Pesquisador',
      detail: 'Bacharelado com foco em ciências do movimento humano, cinesiologia, anatomia humana e fisiologia do exercício.',
      skills: 'Cinesiologia • Fisiologia • Biomecânica Humana'
    },
    {
      id: 'hc-postgrad',
      category: 'healthcare',
      year: 2012.0,
      title: 'Postgraduate in Biomechanics',
      period: '2012 – 2014',
      institution: 'Universidade Gama Filho',
      role: 'Especialista em Biomecânica',
      detail: 'Pós-graduação lato sensu em Biomecânica da Atividade Física e Saúde, analisando marcha, sobrecarga articular e reabilitação.',
      skills: 'Análise de Marcha • Biomecânica Clínica • Ergonomia'
    },
    {
      id: 'hc-master',
      category: 'healthcare',
      year: 2013.8,
      title: 'Master of Science (M.Sc.) in Biomechanics',
      period: '2014 – 2018',
      institution: 'Universidade São Judas Tadeu',
      role: 'Mestre & Pesquisador Científico',
      detail: 'Mestrado acadêmico stricto sensu com pesquisa aprofundada em análise cinemática, bioestatística e testes laboratoriais de movimento.',
      skills: 'Bioestatística • Análise Cinemática • Pesquisa Científica'
    },
    {
      id: 'hc-aux',
      category: 'healthcare',
      year: 2015.8,
      title: 'Auxiliary Nurse Certification',
      period: '2016 – 2018',
      institution: 'Escola de Enfermagem Ciclo Vittal',
      role: 'Estudante de Enfermagem & Estagiário Clínico',
      detail: 'Capacitação prática em fundamentos de enfermagem, farmacologia, aferição de sinais vitais e procedimentos hospitalares.',
      skills: 'Cuidados de Enfermagem • Farmacologia • Procedimentos Clínicos'
    },
    {
      id: 'hc-tech',
      category: 'healthcare',
      year: 2017.5,
      title: 'Technician Nurse in Hospital Care',
      period: '2017 – 2018',
      institution: 'Hospitais Públicos e Privados',
      role: 'Técnico de Enfermagem Hospitalar',
      detail: 'Atuação clínica em enfermarias e pronto-socorro, prestando assistência direta a pacientes com diferentes quadros de saúde.',
      skills: 'Atendimento Hospitalar • Triagem • Trabalho Multidisciplinar'
    },
    {
      id: 'hc-surgical',
      category: 'healthcare',
      year: 2018.6,
      title: 'Surgical Assistant Nurse',
      period: '2018 – 2020',
      institution: 'CENEP • Hospital Votorantim • AMHEMED',
      role: 'Instrumentador & Auxiliar em Centro Cirúrgico',
      detail: 'Certificação pelo CENEP e atuação intensiva em bloco cirúrgico (cirurgias gerais e ortopédicas), além de linha de frente no combate à Covid-19.',
      skills: 'Centro Cirúrgico • Instrumentação • Assepsia • Cuidados Críticos'
    },
    {
      id: 'edu-lic',
      category: 'education',
      year: 2020.0,
      title: 'Bachelor in Education & University Professor',
      period: '2017 – 2020',
      institution: 'Ensino Superior Universitário',
      role: 'Professor Universitário & Licenciado',
      detail: 'Docência no ensino superior lecionando Anatomia Humana, Fisiologia e Biomecânica para turmas de Enfermagem e Fisioterapia.',
      skills: 'Docência Universitária • Anatomia Humana • Fisiologia'
    },
    {
      id: 'hc-intl',
      category: 'healthcare',
      year: 2021.5,
      title: 'Healthcare Assistant (Ireland & Portugal)',
      period: '2021 – 2024',
      institution: 'InisCare • The Marlay Nursing Home • Portugal',
      role: 'Senior Healthcare Assistant',
      detail: 'Experiência internacional em cuidados a idosos, atendimento humanizado e rotinas de saúde em Dublin e Portugal.',
      skills: 'Cuidados Geriátricos • Protocolos Internacionais • Empatia'
    },
    {
      id: 'it-ads',
      category: 'it',
      year: 2025.0,
      title: 'Technologist in Systems Analysis & HealthTech Dev',
      period: '2023 – 2026',
      institution: 'LuxSolutions.tech • Faculdade ADS & Alura Dev',
      role: 'Full-Stack Developer & Founder',
      detail: 'Graduação em Análise e Desenvolvimento de Sistemas e desenvolvimento de aplicações web/mobile voltadas para a saúde pela LuxSolutions.tech.',
      skills: 'Sistemas Web • HTML5 / CSS3 • JavaScript • MySQL • HealthTech'
    },
    {
      id: 'hc-emt',
      category: 'healthcare',
      year: 2026.0,
      title: 'Emergency Medical Technician (EMT) & Supervisor',
      period: '2024 – 2026',
      institution: 'Medicall Emergency Training Ireland',
      role: 'EMT Trainee & Healthcare Supervisor',
      detail: 'Treinamento certificado PHECC na Irlanda em atendimento pré-hospitalar, trauma, suporte avançado e voluntariado em ambulância.',
      skills: 'Atendimento Pré-Hospitalar (APH) • Trauma • RCP / DEA'
    }
  ]
};
