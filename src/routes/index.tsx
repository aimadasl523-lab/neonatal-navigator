import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, BookOpen, ClipboardCheck, FileSearch, Sparkles, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { modules, protocols, quizzes } from "@/data/content";

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
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 shadow-glow md:p-12"
      >
        <div className="relative z-10 max-w-2xl text-primary-foreground">
          <Badge variant="secondary" className="mb-4 gap-1.5 bg-white/15 text-white backdrop-blur">
            <Sparkles className="h-3 w-3" /> Édition 2026
          </Badge>
          <h1 className="text-3xl font-bold md:text-5xl">
            Bonjour, prêt à réviser tes fiches techniques&nbsp;?
          </h1>
          <p className="mt-3 text-base text-white/85 md:text-lg">
            Manuel interactif standardisé pour la pratique infirmière en néonatologie et pédiatrie.
            Inspiré des recommandations OMS, HAS, SFN et AAP.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/modules"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition hover:scale-[1.02]"
            >
              <BookOpen className="h-4 w-4" /> Parcourir les modules
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Activity className="h-4 w-4" /> Démarrer un quiz
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" />
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
                  <p className="mt-1 text-3xl font-bold">{s.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-soft`}>
                  <s.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress */}
        <Card className="border-0 shadow-soft lg:col-span-2">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Ma progression</h2>
            </div>
            <div className="space-y-5">
              {progress.map((p) => {
                const pct = Math.round((p.done / p.total) * 100);
                return (
                  <div key={p.module}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-medium">{p.module}</span>
                      <span className="text-muted-foreground">{p.done}/{p.total} — {pct}%</span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recommandés */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">À réviser</h2>
            <div className="space-y-3">
              {protocols.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  to="/protocoles/$id"
                  params={{ id: p.id }}
                  className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-primary/40 hover:bg-accent/30"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                    <FileSearch className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.category} · {p.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
