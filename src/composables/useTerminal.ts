import { nextTick, ref } from 'vue'

import { PROFILE, STAGES } from '@/data/content'
import type { TermLine } from '@/types'

import { useFolio } from './useFolio'
import { useRecruitment } from './useRecruitment'
import { useTheme } from './useTheme'

let lineId = 1

export function useTerminal() {
  const { done, trophy, hire } = useFolio()
  const { start: startRecruitment } = useRecruitment()
  const { apply } = useTheme()
  const lines = ref<TermLine[]>([
    {
      id: 0,
      kind: 'hint',
      text: 'Tape une commande. Il y a au moins un secret caché.',
    },
  ])
  const input = ref('')
  const history = ref<string[]>([])
  const historyIndex = ref(-1)
  const scroller = ref<HTMLElement | null>(null)
  const inputEl = ref<HTMLInputElement | null>(null)
  let blameIndex = 0

  const blameJokes = [
    'Tout est la faute de… l’environnement de test. Toujours.',
    'Bah ça marchait sur ma machine.',
    'Push en prod on verra si ça marche là bas.',
    'C’est pas un bug, c’est une feature non documentée.',
    'En fait c’est pas moi, c’est le pipeline.',
  ]

  const rejectHireJokes = [
    (name: string) =>
      `[sudo] mot de passe : ********\n✗ ${name} : personne pas qualifiée.`,
    (name: string) =>
      `[sudo] mot de passe : ********\n✗ Recrutement refusé : ${name} ne match pas le job description.`,
    (name: string) =>
      `[sudo] mot de passe : ********\n✗ ${name} : CV rejeté par le pipeline RH.`,
    (name: string) =>
      `[sudo] mot de passe : ********\n✗ Soft skills OK, hard skills KO. Au revoir ${name}.`,
  ]
  let rejectHireIndex = 0

  const commands: Record<string, () => string | null> = {
    help: () =>
      'Commandes : whoami · ls · cat · skills · projects · contact · pipeline · theme [dark|light|matrix] · clear\n(et d’autres que je ne vous dirai pas…)',
    whoami: () =>
      "Fallait lire la pipeline, je respecte le principe DRY (Don't Repeat Yourself).",
    ls: () => 'about/  skills/  projets/  certifs/  secret.txt',
    cat: () => 'cat votreFichier.txt',
    skills: () => 'Tapez whoami pour voir.',
    projects: () =>
      'devsecops-learning-path · docker-php-node-mysql · paulfolio · AI-Infrastructure-Engineer\n→ github.com/valton-paul',
    contact: () =>
      `${PROFILE.email} · linkedin.com/in/paul-valton-5617a3230 · wemio.fr`,
    pipeline: () => `Progression : ${done.value}/${STAGES.length} stages validés.`,
    'cat secret.txt': () =>
      [
        '--- secret.txt ---',
        'rm',
        'hire prenom',
        'git blame',
        'docker ps',
      ].join('\n'),
    rm: () => 'Missing parameter',
    'git blame': () => {
      const joke = blameJokes[blameIndex % blameJokes.length] ?? 'git blame : rien à signaler.'
      blameIndex += 1
      return joke
    },
    'docker ps': () =>
      'CONTAINER  IMAGE        STATUS\na1b2c3     paul:latest  Up 2 ans (healthy)',
    konami: () => 'Utilise les flèches : ↑ ↑ ↓ ↓ ← → ← → B A',
    clear: () => {
      lines.value = []
      return null
    },
  }

  function handleSudoHire(name: string): string {
    if (name === 'paul') {
      hire({ silent: true })
      trophy('easter-egg')
      void nextTick(() => {
        inputEl.value?.blur()
        startRecruitment()
      })
      return '[sudo] mot de passe : ********\n✓ Entretien RH lancé…'
    }
    const joke = rejectHireJokes[rejectHireIndex % rejectHireJokes.length]!
    rejectHireIndex += 1
    return joke(name)
  }

  function handleSudoRm(args: string): string {
    if (args === '-rf /' || args === '-rf /.' || args.startsWith('-rf')) {
      return 'Nice try. Permission denied : ce portfolio est protégé par un pipeline de sécurité.'
    }
    return 'permission denied'
  }

  function push(kind: TermLine['kind'], text: string) {
    lines.value = [...lines.value, { id: lineId++, kind, text }]
    void nextTick(() => {
      if (scroller.value) scroller.value.scrollTop = scroller.value.scrollHeight
    })
  }

  function exec(raw: string) {
    const value = raw.trim()
    if (!value) return
    history.value = [...history.value, value]
    historyIndex.value = history.value.length
    trophy('terminal-hacker')
    push('in', value)

    const key = value.toLowerCase()
    let result: string | null

    const hireMatch = /^hire(?:\s+(\S+))?$/.exec(key)
    const sudoHireMatch = /^sudo hire(?:\s+(\S+))?$/.exec(key)
    const sudoRmMatch = /^sudo rm(?:\s+(.+))?$/.exec(key)
    const rmMatch = /^rm(?:\s+(.+))?$/.exec(key)

    if (key.startsWith('theme')) {
      const arg = key.split(/\s+/)[1]
      if (arg === 'matrix') {
        result = '↑ ↑ ↓ ↓ ← → ← → B A'
        void nextTick(() => inputEl.value?.blur())
      } else if (arg === 'dark' || arg === 'light') {
        apply(arg)
        result = `Thème : ${arg}`
      } else {
        result = 'Usage : theme dark|light|matrix'
      }
    } else if (sudoHireMatch) {
      const name = sudoHireMatch[1]
      result = name ? handleSudoHire(name) : 'Usage : sudo hire <prenom>'
    } else if (hireMatch) {
      result = hireMatch[1] ? 'permission denied' : 'Usage : hire <prenom>'
    } else if (sudoRmMatch) {
      result = sudoRmMatch[1] ? handleSudoRm(sudoRmMatch[1]) : 'Missing parameter'
    } else if (rmMatch?.[1]) {
      result = 'permission denied'
    } else if (commands[key]) {
      result = commands[key]()
    } else {
      result = `commande introuvable : ${value} - essaie « help »`
    }

    if (result !== null) push('out', result)
    input.value = ''
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      exec(input.value)
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!history.value.length) return
      historyIndex.value = Math.max(0, historyIndex.value - 1)
      input.value = history.value[historyIndex.value] ?? ''
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex.value >= history.value.length - 1) {
        historyIndex.value = history.value.length
        input.value = ''
        return
      }
      historyIndex.value += 1
      input.value = history.value[historyIndex.value] ?? ''
    }
  }

  return {
    lines,
    input,
    scroller,
    inputEl,
    exec,
    onKeydown,
  }
}
