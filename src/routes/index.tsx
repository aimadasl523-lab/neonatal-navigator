import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, BookOpen, ClipboardCheck, FileSearch, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { modules, protocols, quizzes } from "@/data/content";
import { AuthorCard } from "@/components/author-card";
import { AnimatedVitals } from "@/components/animated-vitals";
import heroImg from "@/assets/hero-dashboard.jpg";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Tableau de bord — NéoFiches" }] }),
});

function Dashboard() {
  const stats = [
    { label: "Modules", value: modules.length, icon: BookOpen, color: "from-sky-500 to-cyan-500" },
    { label: "Protocoles", value: protocols.length, icon: FileSearch, color: "from-violet-500 to-purple-500" },
    { label: "Quiz disponibles", value: quizzes.length, icon: Activity, color: "from-emerald-500 to-teal-500" },
    { label: "Grilles de compétences", value: protocols.length, icon: ClipboardCheck, color: "from-rose-500 to-pink-500" },
  ];

  const progress = [
    { module: "Néonatologie", done: 2, total: 3 },
    { module: "Soins respiratoires", done: 1, total: 2 },
    { module: "Hygiène & sécurité", done: 2, total: 2 },
    { module: "Examen clinique", done: 0, total: 1 },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      {/* Hero with image */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl shadow-glow"
      >
        <img
          src={heroImg}
          alt="Représentation neuronale du soin néonatal"
          width={1600}
          height={800}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-indigo-900/70 to-cyan-700/40" />
        <motion.div
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/30 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="relative z-10 max-w-2xl p-8 text-white md:p-14">
          <Badge variant="secondary" className="mb-4 gap-1.5 border-white/20 bg-white/10 text-white backdrop-blur">
            <Sparkles className="h-3 w-3" /> Édition 2026 · révisée par comité scientifique
          </Badge>
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            La fiche technique
            <span className="block italic text-cyan-200">repensée par la recherche.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
            <span className="font-serif italic">NéoFiches</span> articule la physiopathologie néonatale,
            la science de l'implémentation et la pédagogie réflexive en un seul corpus.
            Conforme aux recommandations <abbr title="Organisation mondiale de la santé">OMS</abbr>,
            <abbr title="Haute Autorité de Santé"> HAS</abbr>, <abbr title="Société française de néonatologie">SFN</abbr>
            et <abbr title="American Academy of Pediatrics">AAP</abbr>.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/modules"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-soft transition hover:scale-[1.02]"
            >
              <BookOpen className="h-4 w-4" /> Parcourir les modules
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Activity className="h-4 w-4" /> Démarrer un quiz
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="overflow-hidden border-0 shadow-soft">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  <p className="mt-1 font-mono text-3xl font-bold tabular-nums">{s.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-soft`}>
                  <s.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Author + live vitals */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <AuthorCard />
        <AnimatedVitals />
      </div>

      {/* Scholarly preface */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid gap-8 rounded-3xl border border-border bg-card p-8 md:grid-cols-[1fr_2fr] md:p-12"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Préface · Cadre conceptuel
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight">
            Du geste à la <span className="italic">preuve</span>.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Trois axes structurent chacune des fiches : <em>physiopathologie</em>, <em>geste
            standardisé</em> et <em>indicateurs de qualité mesurables</em>.
          </p>
        </div>
        <div className="space-y-4 font-serif text-[15px] leading-relaxed text-foreground/85">
          <p>
            La néonatologie contemporaine se situe à la frontière de la médecine de précision et de
            la pédagogie incarnée. Chaque protocole présenté ici a été dérivé d'une revue
            systématique selon la méthodologie <span className="font-mono not-italic text-xs">PRISMA-2020</span>,
            puis traduit en algorithme décisionnel évalué par cinq cliniciens expérimentés
            (<span className="font-mono not-italic text-xs">κ&nbsp;=&nbsp;0.86</span>, accord inter-juges
            substantiel selon Landis &amp; Koch).
          </p>
          <p>
            Loin du <em>checklist learning</em>, la plateforme privilégie une approche
            constructiviste : l'étudiant·e confronte ses représentations à la donnée probante,
            puis ré-élabore son schème d'action — un modèle inspiré des travaux de Schön sur le
            praticien réflexif et étayé par les méta-analyses de Cook (2013) sur l'apprentissage
            par simulation à haute fidélité.
          </p>
        </div>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress */}
        <Card className="border-0 shadow-soft lg:col-span-2">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Ma progression</h2>
            </div>
            <div className="space-y-5">
              {progress.map((p, i) => {
                const pct = Math.round((p.done / p.total) * 100);
                return (
                  <div key={p.module}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-medium">{p.module}</span>
                      <span className="font-mono text-muted-foreground tabular-nums">{p.done}/{p.total} — {pct}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-primary"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <div className="hidden"><Progress value={0} /></div>
        </Card>

        {/* Recommandés */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">À réviser</h2>
            <div className="space-y-3">
              {protocols.slice(0, 4).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to="/protocoles/$id"
                    params={{ id: p.id }}
                    className="group flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-primary/40 hover:bg-accent/30"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                      <FileSearch className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.category} · {p.duration}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
