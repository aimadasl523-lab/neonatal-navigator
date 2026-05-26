import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Heart, Thermometer, Wind, Target, AlertTriangle, Clock } from "lucide-react";
import { scenarios } from "@/data/content";

export const Route = createFileRoute("/simulations/")({
  component: SimulationsPage,
  head: () => ({ meta: [{ title: "Scénarios de Simulation · NéoFiches" }] }),
});

const levelColor: Record<string, string> = {
  Débutant: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  Intermédiaire: "text-gold border-gold/40 bg-gold/10",
  Expert: "text-rose-400 border-rose-400/40 bg-rose-400/10",
};

function SimulationsPage() {
  const [active, setActive] = useState(scenarios[0]);
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <header className="text-center">
        <span className="mono-label text-primary">Haute Fidélité · Cas Cliniques</span>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Scénarios de Simulation</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Confronter sa décision clinique à des situations critiques inspirées de la littérature néonatale internationale.
        </p>
      </header>
      <div className="grid gap-3 md:grid-cols-3">
        {scenarios.map((s) => (
          <button key={s.id} onClick={() => setActive(s)}
            className={`group border bg-card p-5 text-left transition hover:border-primary ${active.id === s.id ? "border-primary" : "border-border"}`}>
            <span className={`mono-label inline-block rounded-full border px-2.5 py-1 ${levelColor[s.level]}`}>{s.level}</span>
            <h3 className="mt-3 font-display text-lg font-semibold leading-tight">{s.title}</h3>
            <div className="mono-label mt-2 text-muted-foreground">{s.pole} · {s.duration}</div>
          </button>
        ))}
      </div>
      <motion.div key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="grid gap-px border border-border bg-border md:grid-cols-[2fr_1fr]">
        <div className="space-y-6 bg-card p-8">
          <div>
            <span className="mono-label text-primary">Briefing Patient</span>
            <h2 className="mt-2 font-display text-2xl font-semibold">{active.title}</h2>
            <p className="mt-3 font-serif leading-relaxed text-foreground/85">{active.briefing}</p>
          </div>
          <div>
            <div className="mono-label flex items-center gap-2 text-primary">
              <Target className="h-3.5 w-3.5" /> Objectifs pédagogiques
            </div>
            <ul className="mt-3 space-y-2">
              {active.objectives.map((o, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="font-mono text-xs text-primary/70">{String(i + 1).padStart(2, "0")}</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono-label flex items-center gap-2 text-gold">
              <AlertTriangle className="h-3.5 w-3.5" /> Déclencheurs scénarisés
            </div>
            <ul className="mt-3 space-y-2 border-l-2 border-gold/40 pl-4">
              {active.triggers.map((t, i) => (<li key={i} className="text-sm text-foreground/80">{t}</li>))}
            </ul>
          </div>
        </div>
        <div className="space-y-4 bg-card p-8">
          <div className="mono-label flex items-center gap-2 text-primary">
            <Activity className="h-3.5 w-3.5" /> Constantes initiales
          </div>
          <VitalsRow icon={Heart} label="FC" value={`${active.vitals.fc} bpm`} alert={active.vitals.fc > 160} />
          <VitalsRow icon={Wind} label="SpO₂" value={`${active.vitals.spo2} %`} alert={active.vitals.spo2 < 90} />
          <VitalsRow icon={Activity} label="FR" value={`${active.vitals.fr} /min`} alert={active.vitals.fr > 60} />
          <VitalsRow icon={Thermometer} label="T°" value={`${active.vitals.temp} °C`} alert={active.vitals.temp < 36.5 || active.vitals.temp > 37.5} />
          <div className="mt-6 border-t border-border pt-4 mono-label flex items-center gap-2 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> Durée estimée : {active.duration}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function VitalsRow({ icon: Icon, label, value, alert }: { icon: typeof Heart; label: string; value: string; alert: boolean }) {
  return (
    <div className={`flex items-center justify-between border-l-2 bg-background/40 px-4 py-3 ${alert ? "border-rose-500" : "border-primary"}`}>
      <div className="flex items-center gap-3">
        <Icon className={`h-4 w-4 ${alert ? "text-rose-400" : "text-primary"}`} />
        <span className="mono-label text-muted-foreground">{label}</span>
      </div>
      <span className={`font-mono text-lg font-bold tabular-nums ${alert ? "text-rose-400" : "text-foreground"}`}>{value}</span>
    </div>
  );
}
