import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Calculator, ChevronRight, RotateCcw } from 'lucide-react'

export const Route = createFileRoute('/calculateurs')({
  component: Calculateurs,
})

// ─── APGAR ───────────────────────────────────────────────────────────────────
type ApgarKey = 'apparence' | 'pouls' | 'grimace' | 'activite' | 'respiration'

const apgarCriteria: { key: ApgarKey; label: string; options: [string, string, string] }[] = [
  { key: 'apparence', label: 'Coloration (Apparence)', options: ['Cyanose généralisée (0)', 'Extrémités cyanosées (1)', 'Rose/Normal (2)'] },
  { key: 'pouls', label: 'Fréquence cardiaque', options: ['Absente (0)', '< 100/min (1)', '≥ 100/min (2)'] },
  { key: 'grimace', label: 'Réactivité (Grimace)', options: ['Aucune réaction (0)', 'Grimace (1)', 'Pleurs, toux (2)'] },
  { key: 'activite', label: 'Tonus musculaire', options: ['Flaccide (0)', 'Légère flexion (1)', 'Mouvements actifs (2)'] },
  { key: 'respiration', label: 'Respiration', options: ['Absente (0)', 'Irrégulière (1)', 'Régulière, cri vigoureux (2)'] },
]

function ApgarCalculator() {
  const [scores, setScores] = useState<Record<ApgarKey, number>>({
    apparence: -1,
    pouls: -1,
    grimace: -1,
    activite: -1,
    respiration: -1,
  })

  const total = Object.values(scores)
    .filter(v => v >= 0)
    .reduce((a, b) => a + b, 0)

  const allFilled = Object.values(scores).every(v => v >= 0)

  const getInterpretation = (score: number) => {
    if (score >= 7) return { text: 'Normal — Bonne adaptation à la vie extra-utérine', color: 'var(--accent-green)' }
    if (score >= 4) return { text: 'Dépression modérée — Stimulation et O2 nécessaires', color: 'var(--accent-amber)' }
    return { text: 'Dépression sévère — Réanimation immédiate requise', color: 'var(--accent-rose)' }
  }

  const reset = () =>
    setScores({
      apparence: -1,
      pouls: -1,
      grimace: -1,
      activite: -1,
      respiration: -1,
    })

  return (
    <div>
      <div className="space-y-3 mb-5">
        {apgarCriteria.map(c => (
          <div key={c.key}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 6,
              }}
            >
              {c.label}
            </div>

            <div className="flex gap-2 flex-wrap">
              {c.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setScores(prev => ({ ...prev, [c.key]: i }))}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: 12,
                    cursor: 'pointer',
                    border: '1px solid',
                    transition: 'all 0.15s ease',
                    background:
                      scores[c.key] === i
                        ? 'rgba(0,183,235,0.15)'
                        : 'transparent',
                    borderColor:
                      scores[c.key] === i
                        ? 'rgba(0,183,235,0.5)'
                        : 'var(--border-subtle)',
                    color:
                      scores[c.key] === i
                        ? 'var(--accent-cyan-bright)'
                        : 'var(--text-secondary)',
                    flex: '1 1 auto',
                    textAlign: 'center',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {allFilled && (
        <div className="calc-result">
          <div className="flex items-center justify-between mb-3">
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Score APGAR total
            </div>

            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 36,
                fontWeight: 800,
                color: getInterpretation(total).color,
              }}
            >
              {total}/10
            </div>
          </div>

          <div
            style={{
              fontSize: 13,
              color: getInterpretation(total).color,
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            {getInterpretation(total).text}
          </div>
        </div>
      )}

      <button className="btn-ghost mt-4" onClick={reset}>
        <RotateCcw size={13} /> Réinitialiser
      </button>
    </div>
  )
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

const calculators = [
  {
    id: 'apgar',
    label: 'Score APGAR',
    category: 'Réanimation',
    desc: 'Évaluation de l’adaptation néonatale',
    component: ApgarCalculator,
  },
]

const categoryColor: Record<string, string> = {
  Réanimation: 'var(--accent-rose)',
}

function Calculateurs() {
  const [active, setActive] = useState(calculators[0])
  const ActiveComponent = active.component

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Calculateurs Néonataux"
          subtitle="Scores cliniques validés et calculs posologiques"
        />

        <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Sidebar */}
            <div className="space-y-3">
              <div className="section-title">Calculateurs disponibles</div>

              {calculators.map((calc, i) => {
                const color = categoryColor[calc.category]

                return (
                  <div
                    key={calc.id}
                    className="glass-card rounded-xl p-4 cursor-pointer animate-fade-in-up"
                    style={{
                      animationDelay: `${i * 100}ms`,
                      border:
                        active.id === calc.id
                          ? `1px solid ${color}40`
                          : '1px solid var(--border-subtle)',
                      background:
                        active.id === calc.id
                          ? `${color}08`
                          : 'var(--glass-bg)',
                    }}
                    onClick={() => setActive(calc)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 9,
                            flexShrink: 0,
                            background: `${color}15`,
                            border: `1px solid ${color}30`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Calculator size={16} style={{ color }} />
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              fontFamily: 'Syne, sans-serif',
                              color: 'var(--text-primary)',
                            }}
                          >
                            {calc.label}
                          </div>

                          <span
                            style={{
                              fontSize: 10,
                              padding: '2px 7px',
                              borderRadius: 4,
                              background: `${color}12`,
                              color,
                              border: `1px solid ${color}20`,
                              fontFamily: 'DM Mono, monospace',
                            }}
                          >
                            {calc.category}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        size={14}
                        style={{ color: 'var(--text-muted)' }}
                      />
                    </div>

                    <p
                      style={{
                        fontSize: 12,
                        color: 'var(--text-muted)',
                        marginTop: 8,
                        lineHeight: 1.5,
                      }}
                    >
                      {calc.desc}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Active calculator */}
            <div className="lg:col-span-2 glass-card rounded-xl">
              <div className="p-5">
                <ActiveComponent />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default Calculateurs
