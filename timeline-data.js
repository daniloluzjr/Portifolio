/**
 * Career Trajectory Matrix Data
 * Danilo Luz Jr. — Multi-disciplinary Experience (Tech, Healthcare, Education)
 */
const TIMELINE_DATA = {
  config: {
    minYear: 2004,
    maxYear: 2027,
    currentYear: 2026.2,
    viewBoxWidth: 1200,
    viewBoxHeight: 420,
    marginLeft: 170,
    marginRight: 60,
    marginTop: 40,
    marginBottom: 70
  },
  categories: {
    it: {
      id: 'it',
      name: 'IT & Software Dev',
      shortName: 'IT & Dev',
      tagline: 'Systems Analysis • HealthTech • Full-Stack Development',
      color: '#f97316',
      colorLight: '#fb923c',
      colorGlow: 'rgba(249, 115, 22, 0.45)',
      colorBg: 'rgba(249, 115, 22, 0.12)',
      icon: '💻',
      trackY: 300,
      badgeClass: 'badge-it'
    },
    education: {
      id: 'education',
      name: 'Academic & Science',
      shortName: 'Education',
      tagline: 'M.Sc. Biomechanics • University Professor • Kinetics',
      color: '#06b6d4',
      colorLight: '#38bdf8',
      colorGlow: 'rgba(6, 182, 212, 0.45)',
      colorBg: 'rgba(6, 182, 212, 0.12)',
      icon: '🎓',
      trackY: 200,
      badgeClass: 'badge-edu'
    },
    healthcare: {
      id: 'healthcare',
      name: 'Healthcare & Clinical',
      shortName: 'Healthcare',
      tagline: 'Surgical Nursing • EMT • Geriatric & Critical Care',
      color: '#10b981',
      colorLight: '#34d399',
      colorGlow: 'rgba(16, 185, 129, 0.45)',
      colorBg: 'rgba(16, 185, 129, 0.12)',
      icon: '🩺',
      trackY: 100,
      badgeClass: 'badge-health'
    }
  },
  // Continuous track segments (bars)
  bars: [
    // Healthcare Track
    {
      id: 'bar-hc-1',
      category: 'healthcare',
      start: 2012,
      end: 2014,
      label: 'Postgrad Biomechanics',
      sublabel: 'Gama Filho'
    },
    {
      id: 'bar-hc-2',
      category: 'healthcare',
      start: 2014,
      end: 2018,
      label: 'M.Sc. Biomechanics',
      sublabel: 'São Judas Tadeu'
    },
    {
      id: 'bar-hc-3',
      category: 'healthcare',
      start: 2016,
      end: 2021,
      label: 'Clinical & Surgical Nursing',
      sublabel: 'Hospital Votorantim & AMHEMED (OR & Covid Care)'
    },
    {
      id: 'bar-hc-4',
      category: 'healthcare',
      start: 2021,
      end: 2024.5,
      label: 'International Healthcare (Ireland & Portugal)',
      sublabel: 'InisCare • The Marlay • Geriatric & Community Care'
    },
    {
      id: 'bar-hc-5',
      category: 'healthcare',
      start: 2024.5,
      end: 2026.3,
      label: 'EMT & Emergency Care',
      sublabel: 'Medicall Ireland • Ambulance Volunteer'
    },

    // Education Track
    {
      id: 'bar-edu-1',
      category: 'education',
      start: 2006,
      end: 2010,
      label: 'B.Sc. Physical Education',
      sublabel: 'YMCA Brazil (ACM)'
    },
    {
      id: 'bar-edu-2',
      category: 'education',
      start: 2012,
      end: 2016.5,
      label: 'P.Ed. Teacher & Sports Coach',
      sublabel: 'Schools & International Soccer Coaching (Australia)'
    },
    {
      id: 'bar-edu-3',
      category: 'education',
      start: 2017,
      end: 2020.8,
      label: 'University Professor & B.Ed. Degree',
      sublabel: 'Anatomy, Physiology & Biomechanics'
    },

    // IT & Software Track
    {
      id: 'bar-it-1',
      category: 'it',
      start: 2005,
      end: 2010,
      label: 'Graphic & Digital Design',
      sublabel: 'Visual Identity, Helpdesk & Infrastructure'
    },
    {
      id: 'bar-it-2',
      category: 'it',
      start: 2023,
      end: 2026.3,
      label: 'Systems Analysis & HealthTech Apps',
      sublabel: 'LuxSolutions.tech • Web & App Development'
    }
  ],
  // Discrete Milestones (Interactive Nodes)
  milestones: [
    // ================= HEALTHCARE =================
    {
      id: 'hc-postgrad',
      category: 'healthcare',
      year: 2012,
      title: 'Postgraduate in Biomechanics',
      institution: 'Universidade Gama Filho',
      location: 'São Paulo, Brazil',
      period: '2012 – 2014',
      highlight: 'Postgraduate Specialization in Biomechanics of Physical Activity and Health.',
      description: 'Advanced study of human kinetics, joint loading, neuromuscular mechanics, and therapeutic exercise strategies to optimize patient recovery.',
      skills: ['Biomechanics', 'Human Movement', 'Kinetics Analysis', 'Health Science'],
      image: 'assets/FotoTeach.png',
      badge: 'Academic Specialization'
    },
    {
      id: 'hc-master',
      category: 'healthcare',
      year: 2014,
      title: 'Master of Science (M.Sc.) in Biomechanics',
      institution: 'Universidade São Judas Tadeu',
      location: 'São Paulo, Brazil',
      period: '2014 – 2018',
      highlight: 'Master’s Degree Thesis with distinction in musculoskeletal movement and clinical data analysis.',
      description: 'Conducted high-level biomechanical research, laboratory motion analysis, electromyography, and data modeling for health and rehabilitation science.',
      skills: ['Scientific Research', 'Biostatistics', 'Motion Analysis', 'Thesis Defense'],
      image: 'assets/FotoTeach.png',
      badge: 'Master’s Degree'
    },
    {
      id: 'hc-aux-cert',
      category: 'healthcare',
      year: 2016,
      title: 'Auxiliary & Technical Nurse Certification',
      institution: 'Ciclo Vittal Escola de Enfermagem',
      location: 'Brazil',
      period: '2016 – 2018',
      highlight: 'Formal clinical healthcare licensing and emergency bedside hospital training.',
      description: 'Comprehensive clinical immersion covering hospital care protocols, vital signs management, medication administration, and sterile technique.',
      skills: ['Clinical Nursing', 'Pharmacology', 'Bedside Care', 'Emergency Procedures'],
      image: 'assets/FotoNurse.png',
      badge: 'Clinical Qualification'
    },
    {
      id: 'hc-surgical-cert',
      category: 'healthcare',
      year: 2018,
      title: 'Surgical Assistant Nurse Certification',
      institution: 'CENEP Specialized Institute',
      location: 'Brazil',
      period: '2018',
      highlight: 'Operating room (OR) specialization, surgical instrumentation, and sterile field maintenance.',
      description: 'Rigorous specialized education in aseptic protocols, surgical team coordination, perioperative safety, and immediate postoperative patient stabilization.',
      skills: ['Surgical Instrumentation', 'Aseptic Technique', 'Operating Room Coordination'],
      image: 'assets/FotoNurse.png',
      badge: 'Surgical Specialization'
    },
    {
      id: 'hc-or-nurse',
      category: 'healthcare',
      year: 2019,
      title: 'Operating Room Nurse & Covid Response',
      institution: 'Hospital Votorantim & AMHEMED',
      location: 'Brazil',
      period: '2019 – 2020',
      highlight: 'Front-line surgical nurse and intensive care support during high-demand surgical and pandemic shifts.',
      description: 'Direct intraoperative nursing across general and orthopedic surgeries, patient safety oversight, and frontline response throughout the Covid-19 pandemic.',
      skills: ['Surgical Care', 'Crisis Response', 'Critical Care Nursing', 'Patient Safety'],
      image: 'assets/Photos/IMG_20201211_120744724.jpg',
      badge: 'Hospital Experience'
    },
    {
      id: 'hc-intl',
      category: 'healthcare',
      year: 2021.5,
      title: 'Healthcare Assistant (Ireland & Portugal)',
      institution: 'InisCare, The Marlay Nursing Home & GSSDCRM',
      location: 'Dublin, Ireland & Portugal',
      period: '2021 – 2024',
      highlight: 'International patient care across leading healthcare facilities and specialized home nursing.',
      description: 'Delivered high-standard, person-centered geriatric care and palliative support in Ireland and Portugal, adhering to HIQA standards and multidisciplinary communication.',
      skills: ['Geriatric Care', 'International Standards', 'Person-Centered Care', 'Care Planning'],
      image: 'assets/Photos/IMG_20201124_080003058.jpg',
      badge: 'International Experience'
    },
    {
      id: 'hc-emt',
      category: 'healthcare',
      year: 2025.5,
      title: 'Emergency Medical Technician (EMT)',
      institution: 'Medicall Emergency Medical Training',
      location: 'Ireland',
      period: '2025 – Present',
      highlight: 'PHECC-certified emergency response, pre-hospital trauma care, and rescue volunteering.',
      description: 'Advanced pre-hospital clinical assessment, cardiopulmonary resuscitation (CPR/AED), pediatric emergency care, trauma management, and volunteer ambulance team support.',
      skills: ['Emergency Medical Care', 'Pre-Hospital Trauma', 'Advanced First Aid', 'Triage & Rescue'],
      image: 'assets/FotoNurse.png',
      badge: 'EMT Qualification'
    },

    // ================= EDUCATION =================
    {
      id: 'edu-bachelor',
      category: 'education',
      year: 2006,
      title: 'Bachelor in Physical Education',
      institution: 'YMCA Brazil (Faculdade de Educação Física ACM)',
      location: 'Sorocaba / São Paulo, Brazil',
      period: '2006 – 2010',
      highlight: 'Scientific foundation in kinesiology, anatomy, exercise physiology, and educational philosophy.',
      description: 'Comprehensive 4-year bachelor degree exploring human mechanics, motor skill acquisition, functional anatomy, and pedagogical communication.',
      skills: ['Kinesiology', 'Exercise Physiology', 'Pedagogical Planning', 'Sports Science'],
      image: 'assets/FotoTeach.png',
      badge: 'Bachelor Degree'
    },
    {
      id: 'edu-teacher',
      category: 'education',
      year: 2012,
      title: 'Physical Education Teacher & Sports Coach',
      institution: 'Public & Private Schools • Australia',
      location: 'Brazil & Australia',
      period: '2012 – 2016',
      highlight: 'Teaching physical literacy and coaching competitive soccer squads abroad in Australia (2015).',
      description: 'Designed school curricula, coordinated sports events, and coached young athletes with a strong focus on team dynamics, safety, and healthy development.',
      skills: ['Curriculum Design', 'Youth Coaching', 'Sports Psychology', 'Group Leadership'],
      image: 'assets/Photos/1566915343285.jpg',
      badge: 'Teaching Practice'
    },
    {
      id: 'edu-professor',
      category: 'education',
      year: 2017.5,
      title: 'University Professor (Higher Education)',
      institution: 'Universidade São Judas & Anhanguera',
      location: 'Brazil',
      period: '2017 – 2020',
      highlight: 'Higher education lecturer for undergraduate Nursing, Physiotherapy, and Physical Education courses.',
      description: 'Taught foundational and applied courses in Human Anatomy, Systemic Physiology, and Movement Biomechanics, guiding students through laboratory dissections and clinical case studies.',
      skills: ['Higher Education', 'Applied Anatomy', 'Systemic Physiology', 'Academic Mentorship'],
      image: 'assets/Photos/IMG_20210113_091914446.jpg',
      badge: 'Faculty Professor'
    },
    {
      id: 'edu-second-degree',
      category: 'education',
      year: 2020,
      title: 'Bachelor in Education (Licenciatura)',
      institution: 'Higher Education Institute',
      location: 'Brazil',
      period: '2020',
      highlight: 'Graduation in Educational Pedagogy and Didactic Methodologies.',
      description: 'Deepened expertise in learning methodologies, educational technology, inclusive teaching models, and pedagogical assessment frameworks.',
      skills: ['Pedagogical Theory', 'Educational Tech', 'Learning Assessment', 'Didactics'],
      image: 'assets/FotoTeach.png',
      badge: 'Education Degree'
    },

    // ================= IT & SOFTWARE =================
    {
      id: 'it-graphic',
      category: 'it',
      year: 2005,
      title: 'Graphic & Digital Designer',
      institution: 'Independent Studio & Agencies',
      location: 'Brazil',
      period: '2005 – 2010',
      highlight: 'Brand identity design, editorial layouts, vector illustrations, and client visual assets.',
      description: 'Mastered Adobe Photoshop, Illustrator, CorelDraw, and vector graphics to create corporate brand guidelines, marketing assets, and digital artwork.',
      skills: ['Photoshop', 'Visual Identity', 'Typography', 'UI Basics', 'Graphic Production'],
      image: 'assets/FotoTech.png',
      badge: 'Digital Design'
    },
    {
      id: 'it-systems-college',
      category: 'it',
      year: 2023,
      title: 'Systems Analysis & Development (ADS)',
      institution: 'Higher Tech Institute & Alura Dev School',
      location: 'Hybrid / Ireland & Brazil',
      period: '2023 – 2025',
      highlight: 'Accelerated software engineering program focused on modern web architectures and databases.',
      description: 'Mastered algorithmic problem solving, object-oriented design, relational database modeling (MySQL/PostgreSQL), and responsive frontend engineering.',
      skills: ['Systems Analysis', 'HTML5 & CSS3', 'Modern JavaScript', 'MySQL', 'Git & CI/CD'],
      image: 'assets/FotoTech.png',
      badge: 'Software Engineering'
    },
    {
      id: 'it-luxsolutions',
      category: 'it',
      year: 2024.5,
      title: 'Founder & Full-Stack HealthTech Dev',
      institution: 'LuxSolutions.tech',
      location: 'Ireland / Remote',
      period: '2024 – Present',
      highlight: 'Creating digital healthcare applications that bridge clinical workflows with cutting-edge software.',
      description: 'Developing specialized healthcare tools to streamline nurse-to-patient communication, shift handovers, and structured clinical documentation for elderly and home care.',
      skills: ['HealthTech', 'Full-Stack Web', 'UI/UX Design', 'API Integration', 'Healthcare UX'],
      link: 'https://luxsolutions.tech',
      image: 'assets/FotoTech.png',
      badge: 'Founder & Builder'
    },
    {
      id: 'it-app-deploy',
      category: 'it',
      year: 2025.5,
      title: 'Technologist in Systems Analysis & App Launch',
      institution: 'LuxSolutions.tech / ADS Degree',
      location: 'Ireland / International',
      period: '2025 – 2026',
      highlight: 'Formal degree completion in Systems Analysis and launch of dedicated clinical care web app.',
      description: 'Synthesizing two decades of hands-on healthcare experience with modern web development to deploy scalable, human-centered digital tools for healthcare teams worldwide.',
      skills: ['System Architecture', 'Production Deploy', 'Cross-Disciplinary Innovation', 'Agile'],
      image: 'assets/FotoTech.png',
      badge: 'Degree & Production App'
    }
  ]
};
