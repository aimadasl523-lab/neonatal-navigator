import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, BookOpen, Sparkles, FileSearch, Quote, Languages } from "lucide-react";
import {
  modules, protocols, quizzes, poles, matriceRubriques, methodologie,
  organismes, tickerTerms, author, resumes,
} from "@/data/content";
import { EcgBackground } from "@/components/ecg-background";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "NéoFiches — Manuel de Fiches Techniques Standardisées · Néonatologie & Pédiatrie" }] }),
});

type Lang = "fr" | "en" | "ar";

function Dashboard() {
  const [lang, setLang] = useState<Lang>("fr");
  const resume = resumes[lang];
  const stats = [
    { v: "20", l: "Fiches Techniques" },
    { v: "5", l: "Pôles Cliniques" },
    { v: "14", l: "Rubriques par Fiche" },
    { v: "150+", l: "Références Scientifiques" },
  ];

  return (
    <div className="relative -mx-4 md:-mx-8">
      <div className="noise-overlay" />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-12 md:px-16 md:pt-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-primary/30 blur-[120px] animate-orb" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-gold/25 blur-[100px] animate-orb" style={{ animationDelay: "3s" }} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="pointer-events-none absolute right-8 top-32 hidden rounded-full border border-primary/30 bg-background/70 px-3 py-1.5 font-mono text-[10px] tracking-widest text-primary backdrop-blur md:block">
          SpO₂ 98% — STABLE
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
          className="pointer-events-none absolute left-12 top-44 hidden rounded-full border border-gold/40 bg-background/70 px-3 py-1.5 font-mono text-[10px] tracking-widest text-gold backdrop-blur md:block">
          FC 142 BPM — NORMO
        </motion.div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="mono-label mx-auto inline-flex rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-primary">
            Projet de Fin d'Études · Licence INP · 2024–2025
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.35em] text-gold">
            ISPITS Béni Mellal — Filière Soins Infirmiers
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}
            className="mt-6 font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-foreground">
            Élaboration d'un{" "}
            <span className="italic text-primary">manuel de fiches techniques standardisées</span>
            <span className="block">en néonatologie et en pédiatrie</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Un levier pour l'amélioration de la qualité et de la sécurité des soins infantiles.{" "}
            <span className="text-foreground/80">20 fiches techniques · 5 pôles cliniques · Matrice de 14 rubriques.</span>
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Meta label="Élaboré par" value={author.name} />
            <Sep /><Meta label="Encadrants" value={author.encadrants} />
            <Sep /><Meta label="Paradigme" value="Médecine Fondée sur les Preuves" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
            className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/modules" className="group inline-flex items-center gap-2 bg-primary px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition hover:-translate-y-0.5 hover:bg-gold hover:text-background hover:shadow-glow">
              <BookOpen className="h-4 w-4" /> Explorer les Pôles
            </Link>
            <Link to="/protocoles" className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary transition hover:border-primary hover:bg-primary/10">
              <FileSearch className="h-4 w-4" /> Lire les Fiches
            </Link>
          </motion.div>
        </div>
        <EcgBackground className="pointer-events-none absolute -bottom-2 left-0 right-0 h-32 w-full opacity-50" />
      </section>

      {/* TICKER */}
      <div className="relative overflow-hidden border-y border-border bg-primary/[0.03] py-4">
        <div className="animate-ticker flex w-max gap-12 whitespace-nowrap">
          {[...tickerTerms, ...tickerTerms].map((t, i) => (
            <span key={i} className="mono-label flex items-center gap-12 text-muted-foreground">
              {t} <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="relative grid grid-cols-2 border-b border-border bg-primary/[0.02] md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.l} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="group relative overflow-hidden border-r border-border px-6 py-12 text-center last:border-r-0">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative block font-display text-5xl font-bold leading-none text-primary md:text-6xl">
              {s.v.replace("+", "")}<span className="text-gold">{s.v.includes("+") ? "+" : ""}</span>
            </span>
            <span className="mono-label relative mt-3 block text-muted-foreground">{s.l}</span>
          </motion.div>
        ))}
      </div>

      {/* POLES */}
      <SectionHeader label="Architecture Clinique" title="Les Cinq Pôles du Référentiel"
        body="Chaque pôle constitue une entité clinique autonome et interdépendante, conçue pour une prise en charge holistique et intégrée du nouveau-né." />
      <div className="mx-6 grid grid-cols-1 gap-px border border-border bg-border md:mx-16 md:grid-cols-3">
        {poles.map((p, i) => {
          const hex = p.gradient.match(/#\w+/)?.[0] ?? "#00C6C6";
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className={`group relative overflow-hidden bg-card p-8 transition hover:bg-secondary ${i === 4 ? "md:col-span-2" : ""}`}>
              <div className="absolute left-0 right-0 top-0 h-[3px] opacity-60 transition-opacity group-hover:opacity-100" style={{ background: p.gradient }} />
              <span className="absolute right-6 top-4 font-display text-6xl font-bold leading-none opacity-10" style={{ color: hex }}>{p.number}</span>
              <span className="block text-2xl">{p.icon}</span>
              <span className={`mono-label mt-4 inline-block rounded-full px-3 py-1 ${p.accent}`} style={{ background: `${hex}15` }}>{p.tag}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.procedures.map((proc) => (
                  <span key={proc} className="font-mono text-[10px] tracking-wider rounded-full border border-border bg-background/40 px-2.5 py-1 text-foreground/70">{proc}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MATRICE 14 */}
      <SectionHeader label="Architecture Documentaire" title="La Matrice de 14 Rubriques"
        body="Chaque fiche technique constitue une unité d'analyse complète structurée autour de cette matrice rigoureuse." />
      <div className="mx-6 grid grid-cols-2 gap-px border border-border bg-border md:mx-16 md:grid-cols-4 lg:grid-cols-7">
        {matriceRubriques.map((r, i) => (
          <motion.div key={r.num} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
            className="group relative bg-card p-5 transition hover:bg-primary/5">
            <span className="absolute right-3 top-3 font-mono text-[10px] tracking-wider text-primary/60">{r.num}</span>
            <span className="block text-xl">{r.icon}</span>
            <div className="mt-3 font-display text-sm font-semibold leading-tight text-foreground">{r.title}</div>
            <div className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{r.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="mx-6 my-12 md:mx-auto md:max-w-3xl">
        <blockquote className="relative border-l-[3px] border-primary bg-primary/[0.03] px-8 py-6">
          <Quote className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-primary p-1 text-primary-foreground" />
          <p className="font-display text-lg italic leading-relaxed text-foreground/90 md:text-xl">
            « Cette architecture matricielle impose une exhaustivité qui garantit que tous les aspects cliniques, techniques, humains et légaux d'une procédure sont considérés — transformant l'information brute en un outil utilisable au quotidien. »
          </p>
        </blockquote>
      </div>

      {/* METHODOLOGIE */}
      <SectionHeader label="Rigueur Scientifique" title="Processus Méthodologique"
        body="Une revue systématique et critique de la littérature scientifique internationale, croisant les données probantes avec les recommandations des instances de régulation sanitaire de référence." />
      <div className="mx-6 max-w-3xl space-y-px md:mx-auto">
        {methodologie.map((m, i) => (
          <motion.div key={m.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="relative grid grid-cols-[auto_1fr] gap-6 border-l border-border py-6 pl-6">
            <div className="absolute -left-5 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-background text-lg shadow-glow">{m.icon}</div>
            <div className="col-start-2">
              <div className="mono-label text-primary">{m.num}</div>
              <h3 className="mt-1 font-display text-xl font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ORGANISMES */}
      <SectionHeader label="Références de Référence" title="Instances Scientifiques Consultées"
        body="Le référentiel croise les données probantes avec les recommandations des plus hautes autorités sanitaires mondiales." />
      <div className="mx-6 mb-20 flex flex-wrap justify-center gap-2 md:mx-16">
        {organismes.map((o, i) => (
          <motion.span key={o} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
            className="font-mono text-[11px] tracking-wider rounded-full border border-border bg-card px-4 py-2 text-foreground/80 transition hover:border-primary hover:text-primary">
            {o}
          </motion.span>
        ))}
      </div>

      {/* RÉSUMÉ MULTILINGUE */}
      <SectionHeader label="Synthèse Scientifique" title="Résumé du Projet" />
      <div className="mx-6 mb-16 max-w-4xl space-y-6 md:mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border pb-3">
          <Languages className="h-4 w-4 text-primary" />
          {(Object.keys(resumes) as Lang[]).map((k) => (
            <button key={k} onClick={() => setLang(k)}
              className={`mono-label rounded-full px-4 py-1.5 transition ${lang === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}>
              {resumes[k].label}
            </button>
          ))}
        </div>
        <motion.div key={lang} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} dir={resume.dir}
          className="space-y-4 font-serif text-[15px] leading-[1.9] text-foreground/85">
          {resume.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          <div className={`mt-6 flex flex-wrap gap-2 ${resume.dir === "rtl" ? "justify-end" : ""}`}>
            {resume.keywords.map((k) => (
              <span key={k} className="font-mono text-[10px] tracking-wider rounded-full border border-primary/40 px-3 py-1 text-primary">{k}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AUTEUR */}
      <div className="mx-6 mb-20 max-w-4xl md:mx-auto">
        <div className="grid items-center gap-8 border border-border bg-card p-8 md:grid-cols-[auto_1fr] md:p-12">
          <div className="relative mx-auto h-32 w-32">
            <div className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-primary" />
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-primary bg-secondary text-5xl shadow-glow">👨‍⚕️</div>
          </div>
          <div>
            <h3 className="font-display text-3xl font-semibold">{author.name}</h3>
            <p className="mono-label mt-1 text-primary">{author.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
            <p className="mt-3 font-display text-base italic text-foreground/80">{author.citation}</p>
            <div className="mt-5 flex flex-wrap gap-6">
              <MiniMeta label="Institution" value={author.institution} />
              <MiniMeta label="Encadrants" value={author.encadrants} />
            </div>
          </div>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="mx-6 mb-16 grid gap-4 md:mx-auto md:max-w-4xl md:grid-cols-3">
        <QuickLink to="/quiz" icon={Sparkles} title={`${quizzes.length} quiz`} sub="Auto-évaluation immédiate" />
        <QuickLink to="/protocoles" icon={FileSearch} title={`${protocols.length} protocoles`} sub="Fiches détaillées + PDF" />
        <QuickLink to="/modules" icon={BookOpen} title={`${modules.length} modules`} sub="Parcours pédagogique" />
      </div>
    </div>
  );
}

function SectionHeader({ label, title, body }: { label: string; title: string; body?: string }) {
  return (
    <div className="px-6 pb-12 pt-24 text-center md:px-16">
      <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mono-label text-primary">{label}</motion.span>
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.1] text-foreground md:text-5xl">{title}</motion.h2>
      {body && (
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{body}</motion.p>
      )}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="mono-label text-primary/70">{label}</span>
      <span className="font-display text-base font-semibold text-foreground">{value}</span>
    </div>
  );
}
function MiniMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mono-label text-primary/70">{label}</div>
      <div className="mt-1 text-sm text-foreground">{value}</div>
    </div>
  );
}
function Sep() { return <span className="hidden h-10 w-px bg-border md:block" />; }

function QuickLink({ to, icon: Icon, title, sub }: { to: string; icon: typeof Sparkles; title: string; sub: string }) {
  return (
    <Link to={to} className="group flex items-center gap-4 border border-border bg-card p-5 transition hover:border-primary hover:bg-primary/5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="font-display text-lg font-semibold">{title}</div>
        <div className="mono-label text-muted-foreground">{sub}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
    </Link>
  );
}
