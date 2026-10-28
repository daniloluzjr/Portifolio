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
    marginLeft: 175,
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
      y: 75,
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
      y: 110,
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
      align: 'start'
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
  milestones: [
    {
      id: 'it-gd',
      category: 'it',
      year: 2005.0,
      title: 'Graphic Design & IT Foundations',
      period: '2005 – 2010',
      institution: 'Freelance & Design Studios',
      role: 'Graphic Designer & Helpdesk Support',
      detail: 'Creation of corporate visual identities, typography, branding assets in Photoshop/Corel, alongside hands-on helpdesk, system backups, and server maintenance.',
      skills: 'Graphic Design • Photoshop • Typography • Helpdesk & Systems'
    },
    {
      id: 'edu-bachelor',
      category: 'education',
      year: 2010.0,
      title: 'Bachelor in Physical Education',
      period: '2006 – 2010',
      institution: 'YMCA Brazil (ACM Faculty)',
      role: 'Undergraduate & Student Researcher',
      detail: 'Four-year degree focused on kinesiology, human anatomy, exercise physiology, motor development, and sports pedagogy.',
      skills: 'Kinesiology • Exercise Physiology • Human Anatomy • Pedagogy'
    },
    {
      id: 'hc-postgrad',
      category: 'healthcare',
      year: 2012.0,
      title: 'Postgraduate in Biomechanics',
      period: '2012 – 2014',
      institution: 'Universidade Gama Filho',
      role: 'Biomechanics Specialist',
      detail: 'Specialization diploma in Biomechanics of Physical Activity and Health, focusing on gait analysis, musculoskeletal loading, and therapeutic movement protocols.',
      skills: 'Gait Analysis • Clinical Biomechanics • Ergonomics • Joint Kinetics'
    },
    {
      id: 'hc-master',
      category: 'healthcare',
      year: 2013.8,
      title: 'Master of Science (M.Sc.) in Biomechanics',
      period: '2014 – 2018',
      institution: 'Universidade São Judas Tadeu',
      role: 'Master of Science & Academic Researcher',
      detail: 'Scientific thesis research investigating kinematic motion capture, clinical biostatistics, electromyography, and laboratory movement modeling.',
      skills: 'Scientific Research • Biostatistics • Motion Capture • Academic Writing'
    },
    {
      id: 'hc-aux',
      category: 'healthcare',
      year: 2015.8,
      title: 'Auxiliary & Technician Nurse Certification',
      period: '2016 – 2018',
      institution: 'Ciclo Vittal Nursing School',
      role: 'Nursing Student & Clinical Intern',
      detail: 'Hands-on clinical qualification covering patient triage, pharmacology, vital signs monitoring, bedside procedures, and hospital emergency care.',
      skills: 'Clinical Nursing • Pharmacology • Bedside Care • Triage'
    },
    {
      id: 'hc-tech',
      category: 'healthcare',
      year: 2017.5,
      title: 'Technician Nurse in Hospital Care',
      period: '2017 – 2018',
      institution: 'Public & Private Hospital Units',
      role: 'Hospital Staff Nurse Technician',
      detail: 'Frontline hospital inpatient nursing, emergency room patient stabilization, medication administration, and interdisciplinary patient monitoring.',
      skills: 'Acute Care • Bedside Procedures • Patient Safety • Teamwork'
    },
    {
      id: 'hc-surgical',
      category: 'healthcare',
      year: 2018.6,
      title: 'Surgical Assistant Nurse',
      period: '2018 – 2020',
      institution: 'CENEP • Hospital Votorantim • AMHEMED',
      role: 'Surgical Assistant & Operating Room Nurse',
      detail: 'Certified surgical instrumentation and operating theater management across general and orthopedic surgeries, sterile field preservation, and front-line Covid-19 response.',
      skills: 'Operating Room Protocols • Surgical Instrumentation • Aseptic Field • Crisis Response'
    },
    {
      id: 'edu-lic',
      category: 'education',
      year: 2020.0,
      title: 'Bachelor in Education & University Professor',
      period: '2017 – 2020',
      institution: 'Higher Education Universities',
      role: 'Faculty Professor & Licensed Educator',
      detail: 'University lecturing in Human Anatomy, Systemic Physiology, and Movement Biomechanics for undergraduate Nursing, Physiotherapy, and Physical Education cohorts.',
      skills: 'Higher Education Teaching • Applied Anatomy • Physiology • Curriculum Design'
    },
    {
      id: 'hc-intl',
      category: 'healthcare',
      year: 2021.5,
      title: 'Healthcare Assistant (Ireland & Portugal)',
      period: '2021 – 2024',
      institution: 'InisCare • The Marlay Nursing Home • Portugal',
      role: 'Senior Healthcare Assistant',
      detail: 'Delivering person-centered elderly care, complex palliative assistance, and rehabilitation support in Dublin and Portugal according to international standards.',
      skills: 'Geriatric Care • International Standards • Person-Centered Care • Palliative Support'
    },
    {
      id: 'it-ads',
      category: 'it',
      year: 2025.0,
      title: 'Technologist in Systems Analysis & HealthTech Dev',
      period: '2023 – 2026',
      institution: 'LuxSolutions.tech • Higher ADS College & Alura Dev',
      role: 'Full-Stack Developer & Founder',
      detail: 'Graduating as a Technologist in Systems Analysis and building digital health web and mobile applications with LuxSolutions.tech to optimize clinical workflows.',
      skills: 'Web Applications • HTML5 / CSS3 • JavaScript • MySQL • HealthTech UX'
    },
    {
      id: 'hc-emt',
      category: 'healthcare',
      year: 2026.0,
      title: 'Emergency Medical Technician (EMT) & Supervisor',
      period: '2024 – 2026',
      institution: 'Medicall Emergency Training Ireland',
      role: 'EMT Trainee & Healthcare Supervisor',
      detail: 'PHECC-certified emergency medical training in pre-hospital trauma, advanced basic life support (CPR/AED), pediatric emergency care, and volunteer ambulance response.',
      skills: 'Emergency Medical Care • Pre-Hospital Trauma • CPR / AED • Ambulance Operations'
    }
  ]
};
