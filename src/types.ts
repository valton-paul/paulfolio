export type ThemeName = 'dark' | 'light' | 'matrix'

export type LogTone = 'ok' | 'wa' | 'er' | 'mu' | 'bl' | ''

export type StageId = 'checkout' | 'build' | 'test' | 'scan' | 'deploy'

export interface Stage {
  id: StageId
  name: string
  description: string
  icon: string
  logs: string[]
}

export interface Trophy {
  icon: string
  label: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Project {
  slug: string
  description: string
}

export interface TimelineItem {
  title: string
  period: string
  place: string
  details: string
}

export interface LogLine {
  id: number
  text: string
  tone: LogTone
}

export interface TermLine {
  id: number
  kind: 'in' | 'out' | 'hint'
  text: string
}

export interface ConfettiPiece {
  id: number
  left: number
  hue: number
  delay: number
}
