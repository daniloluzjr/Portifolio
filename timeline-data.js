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
    marginLeft: 150,
    marginRight: 60
  },
  categories: {
    healthcare: {
      id: 'healthcare',
      label: 'Healthcare',
      color: '#2d8a4e',
      colorHover: '#38b765',
      y: 130
    },
    education: {
      id: 'education',
      label: 'Education',
      color: '#2b78c6',
      colorHover: '#4597ea',
      y: 270
    },
    it: {
      id: 'it',
      label: 'IT',
      color: '#e6731e',
      colorHover: '#ff8933',
      y: 410
    }
  },
  // As barras sólidas horizontais
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
  // Textos estáticos que ficam no próprio gráfico (acima ou abaixo da barra)
  labels: [
    // HEALTHCARE LABELS
    {
      text: 'Postgraduate in Biomechanics',
      year: 2012,
      yOffset: -30,
      category: 'healthcare',
      align: 'middle',
      type: 'academic'
    },
    {
      text: 'Master in Biomechanics',
      year: 2013.8,
      yOffset: 34,
      category: 'healthcare',
      align: 'middle',
      type: 'academic'
    },
    {
      text: 'Auxiliary Nurse Certification',
      year: 2015.8,
      yOffset: -30,
      category: 'healthcare',
      align: 'middle',
      type: 'academic'
    },
    {
      text: 'Technician Nurse Certification',
      year: 2017.5,
      yOffset: 48,
      category: 'healthcare',
      align: 'middle',
      type: 'academic'
    },
    {
      text: 'Technician Nurse',
      year: 2017.5,
      yOffset: 30,
      category: 'healthcare',
      align: 'middle',
      type: 'job'
    },
    {
      text: 'Surgical Assistant Nurse',
      year: 2018.4,
      yOffset: -30,
      category: 'healthcare',
      align: 'middle',
      type: 'academic'
    },
    {
      text: 'Surgical Nurse',
      year: 2018.7,
      yOffset: -12,
      category: 'healthcare',
      align: 'middle',
      type: 'job'
    },
    {
      text: 'Healthcare Assistant',
      year: 2021.5,
      yOffset: 30,
      category: 'healthcare',
      align: 'middle',
      type: 'job',
      hasLine: true,
      lineStart: 2019.2,
      lineEnd: 2024.0
    },
    {
      text: 'Healthcare Supervisor',
      year: 2025.2,
      yOffset: -30,
      category: 'healthcare',
      align: 'middle',
      type: 'job'
    },
    {
      text: 'Emergency Medical Technician (EMT)',
      year: 2026.0,
      yOffset: 36,
      category: 'healthcare',
      align: 'middle',
      type: 'academic'
    },

    // EDUCATION LABELS
    {
      text: 'Bachelor in Physical Education',
      year: 2010.0,
      yOffset: 34,
      category: 'education',
      align: 'middle',
      type: 'academic'
    },
    {
      text: 'P.Ed. Teacher',
      year: 2014.2,
      yOffset: 30,
      category: 'education',
      align: 'middle',
      type: 'job',
      hasLine: true,
      lineStart: 2012.3,
      lineEnd: 2016.2
    },
    {
      text: 'College Professor',
      year: 2018.5,
      yOffset: 30,
      category: 'education',
      align: 'middle',
      type: 'job',
      hasLine: true,
      lineStart: 2016.8,
      lineEnd: 2020.0
    },
    {
      text: 'Bachelor in Education',
      year: 2020.0,
      yOffset: 48,
      category: 'education',
      align: 'middle',
      type: 'academic'
    },

    // IT LABELS
    {
      text: 'Graphic Design',
      year: 2005.0,
      yOffset: -26,
      category: 'it',
      align: 'middle',
      type: 'academic'
    },
    {
      text: 'Graphic Design',
      year: 2007.5,
      yOffset: 30,
      category: 'it',
      align: 'middle',
      type: 'job',
      hasLine: true,
      lineStart: 2005.8,
      lineEnd: 2009.2
    },
    {
      text: 'Technologist in Systems Analysis',
      year: 2025.2,
      yOffset: -28,
      category: 'it',
      align: 'middle',
      type: 'academic'
    },
    {
      text: 'Web and App Developer',
      year: 2025.0,
      yOffset: 30,
      category: 'it',
      align: 'middle',
      type: 'job'
    }
  ],
  // Bolinhas interativas com hover e informações detalhadas
  milestones: [
    {
      id: 'it-gd-start',
      category: 'it',
      year: 2005.0,
      title: 'Graphic Design & IT Foundations',
      detail: 'Início da atuação com design gráfico, criação visual, helpdesk e suporte a servidores.',
      institution: 'Freelance & Agências',
      period: '2005 – 2010',
      skills: 'Design Gráfico • Identidade Visual • Photoshop • Helpdesk'
    },
    {
      id: 'it-ads-finish',
      category: 'it',
      year: 2025.2,
      title: 'Technologist in Systems Analysis & App Dev',
      detail: 'Graduação em Análise e Desenvolvimento de Sistemas e desenvolvimento de aplicações web/mobile voltadas para a saúde pela LuxSolutions.tech.',
      institution: 'LuxSolutions.tech • Ensino Superior',
      period: '2023 – 2026',
      skills: 'Sistemas Web • HTML/CSS/JS • MySQL • HealthTech'
    },
    {
      id: 'edu-ped-bachelor',
      category: 'education',
      year: 2010.0,
      title: 'Bachelor in Physical Education',
      detail: 'Formação em Educação Física com forte base em cinesiologia, anatomia, fisiologia do exercício e didática.',
      institution: 'ACM / YMCA Brasil',
      period: '2006 – 2010',
      skills: 'Cinesiologia • Fisiologia • Biomecânica Básica'
    },
    {
      id: 'edu-ped-lic',
      category: 'education',
      year: 2020.0,
      title: 'Bachelor in Education & University Professor',
      detail: 'Conclusão da Licenciatura em Educação e atuação como Professor Universitário lecionando Anatomia, Fisiologia e Biomecânica para Enfermagem e Fisioterapia.',
      institution: 'Ensino Superior Universitário',
      period: '2017 – 2020',
      skills: 'Docência Universitária • Anatomia Aplicada • Fisiologia'
    },
    {
      id: 'hc-postgrad',
      category: 'healthcare',
      year: 2012.0,
      title: 'Postgraduate in Biomechanics',
      detail: 'Especialização de Pós-Graduação em Biomecânica da Atividade Física e Saúde.',
      institution: 'Universidade Gama Filho',
      period: '2012 – 2014',
      skills: 'Biomecânica Clínica • Análise de Movimento • Saúde'
    },
    {
      id: 'hc-master',
      category: 'healthcare',
      year: 2013.8,
      title: 'Master of Science (M.Sc.) in Biomechanics',
      detail: 'Mestrado científico com pesquisa em análise cinemática, estatística e saúde do aparelho locomotor.',
      institution: 'Universidade São Judas Tadeu',
      period: '2014 – 2018',
      skills: 'Pesquisa Científica • Bioestatística • Biomecânica Avançada'
    },
    {
      id: 'hc-aux-nurse',
      category: 'healthcare',
      year: 2015.8,
      title: 'Auxiliary & Technician Nurse Certification',
      detail: 'Formação técnica em enfermagem com prática hospitalar de urgência e cuidados ao paciente.',
      institution: 'Escola de Enfermagem Ciclo Vittal',
      period: '2016 – 2018',
      skills: 'Enfermagem Clínica • Farmacologia • Cuidados Hospitalares'
    },
    {
      id: 'hc-tech-nurse',
      category: 'healthcare',
      year: 2017.5,
      title: 'Technician Nurse in Hospital Care',
      detail: 'Atuação clínica em hospitais públicos e privados, prestando assistência direta a pacientes em internação e pronto atendimento.',
      institution: 'Hospitais Públicos e Privados',
      period: '2017 – 2018',
      skills: 'Procedimentos Clínicos • Triagem • Trabalho em Equipe'
    },
    {
      id: 'hc-surgical-nurse',
      category: 'healthcare',
      year: 2018.4,
      title: 'Surgical Assistant Nurse',
      detail: 'Certificação em Instrumentação e Assistência Cirúrgica pelo CENEP. Atuação em centro cirúrgico nos hospitais Votorantim e AMHEMED, incluindo atuação intensiva na linha de frente da pandemia.',
      institution: 'CENEP • Hospital Votorantim • AMHEMED',
      period: '2018 – 2020',
      skills: 'Centro Cirúrgico • Instrumentação • Assepsia • Covid-19'
    },
    {
      id: 'hc-emt',
      category: 'healthcare',
      year: 2026.0,
      title: 'Emergency Medical Technician (EMT) & Supervisor',
      detail: 'Treinamento e certificação em Atendimento Pré-Hospitalar (EMT na Irlanda) e supervisão em cuidados de saúde.',
      institution: 'Medicall Emergency Training Ireland',
      period: '2024 – 2026',
      skills: 'APH / Trauma • Suporte Básico de Vida • EMT Ireland'
    }
  ]
};
