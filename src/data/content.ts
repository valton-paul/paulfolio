import type { Project, SkillGroup, Stage, TimelineItem, Trophy } from '@/types'

export const PROFILE = {
  firstName: 'Paul',
  lastName: 'Valton',
  fullName: 'Paul Valton',
  role: 'Développeur logiciel · apprenti DevOps',
  company: 'CA-GIP',
  companyLong: 'Crédit Agricole Group Infrastructure Platform',
  location: 'Montpellier, France',
  school: 'Avignon Université',
  degree: 'Master 2 Informatique - ILSEN (Génie logiciel)',
  degreePeriod: '2025 – 2027',
  languages: 'français (natif) · anglais (B1, technique)',
  email: 'paul.valton@icloud.com',
  github: 'https://github.com/valton-paul',
  githubUser: 'valton-paul',
  linkedin: 'https://www.linkedin.com/in/paul-valton-5617a3230/',
  tryhackme: 'https://tryhackme.com/p/Ppaul',
  site: 'https://wemio.fr',
  pitch:
    'Passionné d’architecture logicielle et d’automatisation : CI/CD, qualité logicielle, ITSM, SEO & GEO.',
  knowsAbout: [
    'DevOps',
    'CI/CD',
    'Docker',
    'Kubernetes',
    'TypeScript',
    'Vue.js',
    'architecture logicielle',
    'qualité logicielle',
    'GitLab CI',
  ],
}

/** URL canonique du portfolio (à aligner avec le domaine de prod). */
export const SITE = {
  url: 'https://mypaulfolio.vercel.app',
  name: 'myPaulFolio',
  locale: 'fr_FR',
  get title() {
    return `${PROFILE.fullName} — ${PROFILE.role} | ${this.name}`
  },
  get description() {
    return `${PROFILE.fullName}, ${PROFILE.role} à ${PROFILE.location}. Alternant chez ${PROFILE.company} (${PROFILE.companyLong}). Étudiant en ${PROFILE.degree} à ${PROFILE.school}. Portfolio interactif orienté CI/CD, automatisation et qualité logicielle.`
  },
  get image() {
    return `${this.url}/og.svg`
  },
}

export const STAGES: Stage[] = [
  {
    id: 'checkout',
    name: 'checkout',
    description: 'À propos',
    icon: '📥',
    logs: [
      'git clone git@github.com:valton-paul/paulfolio',
      'Résolution des deltas… 100 %',
      '✓ Paul Valton récupéré · Montpellier, France',
    ],
  },
  {
    id: 'build',
    name: 'build',
    description: 'Compétences',
    icon: '🔧',
    logs: [
      'docker build -t paul-skills .',
      'Step 1/4 : FROM curiosity:latest',
      'Step 4/4 : COPY ./stack /usr/local',
      '✓ Image construite en 4,2 s',
    ],
  },
  {
    id: 'test',
    name: 'test',
    description: 'Projets',
    icon: '🧪',
    logs: [
      'npm test',
      'Exécution de 4 suites…',
      'PASS devsecops-learning-path',
      'PASS docker-php-node-mysql',
      'PASS paulfolio',
      'PASS CERISoNet',
      '✓ 4/4 projets verts',
    ],
  },
  {
    id: 'scan',
    name: 'security-scan',
    description: 'Sécu & certifs',
    icon: '🛡️',
    logs: [
      'trivy fs --severity HIGH .',
      'Analyse des dépendances…',
      '0 vulnérabilité critique',
      'ITIL® 4 Foundation : à venir ⏳',
      '✓ Scan terminé',
    ],
  },
  {
    id: 'deploy',
    name: 'deploy',
    description: 'Contact',
    icon: '🚀',
    logs: [
      'kubectl rollout status deploy/paul',
      'Pods prêts : 3/3',
      '✓ Paul est disponible en production 🚀',
    ],
  },
]

export const TROPHIES: Trophy[] = [
  { icon: '🚀', label: 'Premier build' },
  { icon: '🟢', label: 'Tout au vert' },
  { icon: '🕶️', label: 'Hacker du terminal' },
  { icon: '🥚', label: 'Easter egg trouvé' },
  { icon: '🎉', label: 'Embauché !' },
  { icon: '💊', label: 'Bug dans la matrix' },
]

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Langages',
    items: ['TypeScript', 'JavaScript', 'Java', 'PHP', 'Python', 'Bash'],
  },
  {
    label: 'Frameworks',
    items: ['Vue.js', 'Nuxt', 'NestJS', 'Next.js', 'Node.js', 'Symfony', 'Spring Boot', 'FastAPI'],
  },
  {
    label: 'DevOps & Cloud',
    items: ['Docker', 'Kubernetes', 'Git', 'GitLab CI', 'Elasticsearch', 'Kibana', 'Prometheus'],
  },
  {
    label: 'Bases de données',
    items: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    label: 'Visibilité',
    items: ['SEO', 'GEO'],
  },
]

export const PROJECTS: Project[] = [
  {
    slug: 'devsecops-learning-path',
    description: 'Parcours d’apprentissage DevSecOps.',
  },
  {
    slug: 'docker-php-node-mysql',
    description: 'Environnement Docker PHP / Node / MySQL.',
  },
  {
    slug: 'paulfolio',
    description: 'Ce portfolio, version pipeline CI/CD.',
  },
  {
    slug: 'CERISoNet',
    description: 'Projet de réseau social en TypeScript.',
  },
]

export const EDUCATION: TimelineItem[] = [
  {
    title: 'Master Informatique - ILSEN',
    period: '2025 – 2027',
    place: 'CERI, Avignon Université',
    details: 'Ingénierie du Logiciel de la Société Numérique · Génie logiciel',
  },
  {
    title: 'BUT Informatique - RACDV',
    period: '2021 – 2025',
    place: 'IUT de Montpellier-Sète',
    details: 'Réalisation d’Applications : Conception, Développement, Validation',
  },
  {
    title: 'Baccalauréat STI2D - SIN',
    period: '2021',
    place: 'Lycée Jean-François Champollion, Montpellier',
    details: 'Systèmes d’Information et Numérique',
  },
]

export const EXPERIENCES: TimelineItem[] = [
  {
    title: 'Apprenti DevOps',
    period: 'Septembre 2025 – Août 2027',
    place: 'CA-GIP · Crédit Agricole Group Infrastructure Platform',
    details:
      'Développement et maintenance d’une application interne pour les équipes DevOps. Collaboration avec les Ops et montée en compétences opérationnelles.',
  },
  {
    title: 'Stage Développeur Full-Stack',
    period: 'Avril 2025 – Août 2025',
    place: 'CA-GIP',
    details:
      'Déploiement d’une solution conteneurisée sur Kubernetes pour l’automatisation et l’audit des données DevOps.',
  },
  {
    title: 'Stage Conception de process métier',
    period: 'Avril 2024 – Juin 2024',
    place: 'Nexecur (Groupe Crédit Agricole)',
    details: 'Conception et mise en œuvre de processus métiers automatisés.',
  },
]

export const TYPEWRITER_PHRASES = [
  'Développeur logiciel · apprenti DevOps',
  'CI/CD, qualité, automatisation',
  'Montpellier · Crédit Agricole Group Infrastructure Platform',
  'Ici, tout est numérique.',
]

export const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
] as const
