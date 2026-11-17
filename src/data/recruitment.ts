import { PROFILE } from '@/data/content'

export type Speaker = 'rh' | 'cto' | 'narrator'

export type RecruitmentPhase = 'boot' | 'story' | 'approved'

export type CharacterMood =
  | 'idle'
  | 'talk'
  | 'think'
  | 'shock'
  | 'celebrate'
  | 'joy'
  | 'angry'
  | 'surprise'
  | 'disappointed'
  | 'confused'
  | 'confident'
  | 'embarrassed'

export type CtoSpot = 'desk' | 'coffee'

export type CameraBeat = 'neutral' | 'dossier' | 'coffee' | 'hire'

export interface DialogueLine {
  speaker: Speaker
  text: string
  mood?: Partial<Record<'rh' | 'cto', CharacterMood>>
  showDossier?: boolean
  /** RH walks to the CTO and hands over the candidate dossier */
  handOffDossier?: boolean
  pauseMs?: number
  ctoSpot?: CtoSpot
  camera?: CameraBeat
}

export const RECRUITMENT_CANDIDATE = {
  name: PROFILE.fullName,
  role: 'Développeur logiciel',
  bullets: [
    'Passionné par le développement et l’automatisation.',
    'Expérience avec JavaScript, TypeScript et les technologies web.',
    'Intérêt pour le DevOps, Docker et Kubernetes.',
    'Curieux, autonome et toujours prêt à apprendre.',
  ],
}

export const RECRUITMENT_DIALOGUE: DialogueLine[] = [
  {
    speaker: 'rh',
    text: 'Entretien du jour. Candidat intéressant.',
    mood: { rh: 'talk', cto: 'idle' },
    camera: 'neutral',
  },
  {
    speaker: 'cto',
    text: 'Encore un ?',
    mood: { rh: 'idle', cto: 'talk' },
  },
  {
    speaker: 'rh',
    text: `Il s’appelle ${PROFILE.fullName}.`,
    mood: { rh: 'talk', cto: 'think' },
  },
  {
    speaker: 'cto',
    text: 'Voyons ça.',
    mood: { rh: 'idle', cto: 'confident' },
  },
  {
    speaker: 'rh',
    text: 'J’ai son dossier.',
    mood: { rh: 'confident', cto: 'surprise' },
    showDossier: true,
    handOffDossier: true,
    camera: 'dossier',
    pauseMs: 700,
  },
  {
    speaker: 'rh',
    text: 'TypeScript, web, DevOps… il shippe.',
    mood: { rh: 'talk', cto: 'think' },
    showDossier: true,
    camera: 'dossier',
  },
  {
    speaker: 'cto',
    text: 'Pas mal. Une question essentielle.',
    mood: { rh: 'joy', cto: 'talk' },
  },
  {
    speaker: 'rh',
    text: 'Je vous écoute.',
    mood: { rh: 'talk', cto: 'confident' },
  },
  {
    speaker: 'cto',
    text: 'Sait-il faire du café ?',
    mood: { rh: 'surprise', cto: 'talk' },
  },
  {
    speaker: 'rh',
    text: '… Pas sur le CV.',
    mood: { rh: 'confused', cto: 'angry' },
  },
  {
    speaker: 'cto',
    text: 'Problématique.',
    mood: { rh: 'embarrassed', cto: 'disappointed' },
    ctoSpot: 'desk',
    pauseMs: 800,
  },
  {
    speaker: 'narrator',
    text: '',
    mood: { rh: 'idle', cto: 'think' },
    ctoSpot: 'coffee',
    pauseMs: 1500,
    camera: 'coffee',
  },
  {
    speaker: 'cto',
    text: '… Et la machine ?',
    mood: { rh: 'idle', cto: 'talk' },
    ctoSpot: 'coffee',
    camera: 'coffee',
  },
  {
    speaker: 'rh',
    text: 'Il sait automatiser.',
    mood: { rh: 'talk', cto: 'surprise' },
    ctoSpot: 'coffee',
  },
  {
    speaker: 'cto',
    text: 'Automatiser le café ?',
    mood: { rh: 'joy', cto: 'confused' },
    ctoSpot: 'coffee',
  },
  {
    speaker: 'rh',
    text: 'Café as a Service.',
    mood: { rh: 'confident', cto: 'think' },
    ctoSpot: 'coffee',
  },
  {
    speaker: 'narrator',
    text: '…',
    mood: { rh: 'idle', cto: 'think' },
    ctoSpot: 'coffee',
    pauseMs: 850,
  },
  {
    speaker: 'cto',
    text: 'EMBAUCHEZ-LE !',
    mood: { rh: 'shock', cto: 'celebrate' },
    ctoSpot: 'desk',
    camera: 'hire',
  },
]
