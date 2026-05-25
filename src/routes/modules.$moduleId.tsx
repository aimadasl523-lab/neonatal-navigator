import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { modules, protocols, type Module } from "@/data/content";
import { moduleImages } from "@/lib/module-images";
import { ChevronRight, Clock, BookMarked } from "lucide-react";

export const Route = createFileRoute("/modules/$moduleId")({
  component: ModuleDetail,
  notFoundComponent: () => <div>Module introuvable</div>,
  loader: ({ params }) => {
    const mod = modules.find((m) => m.id === params.moduleId);
    if (!mod) throw notFound();
    return { mod };
  },
});

const levelColors: Record<string, string> = {
  Essentiel: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Intermédiaire: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Avancé: "bg-rose-500/15 text-rose-700 dark:text-rose-400",
};

function ModuleDetail() {
  const { mod } = Route.useLoaderData() as { mod: Module };
  const list = protocols.filter((p) => p.moduleId === mod.id);
  const img = moduleImages[mod.id];
  const Icon = mod.icon;
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl text-white shadow-glow"
      >
        {img && (
          <img
            src={img}
            alt={mod.title}
            width={1024}
            height={640}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} mix-blend-multiply opacity-80`} />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-transparent to-transparent" />
        <Icon className="absolute right-8 top-1/2 h-32 w-32 -translate-y-1/2 text-white/15" />
        <div className="relative p-8 md:p-12">
          <Badge className="mb-3 border-white/20 bg-white/15 text-white backdrop-blur">Module · corpus standardisé</Badge>
          <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">{mod.title}</h1>
          <p className="mt-3 max-w-2xl font-serif text-white/90 md:text-lg">{mod.description}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-start gap-3 rounded-2xl border-l-4 border-primary bg-accent/40 p-5"
      >
        <BookMarked className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="font-serif text-sm leading-relaxed text-foreground/85">
          <span className="font-semibold not-italic">Note de l'auteure —</span> les fiches qui
          suivent ont été revues lors d'un consensus Delphi à trois tours auprès d'un panel
          interprofessionnel (médecins néonatologistes, IDE puéricultrices, sages-femmes). Le seuil
          de convergence retenu est de <span className="font-mono not-italic text-xs">80&nbsp;%</span>.
        </p>
      </motion.div>

      <div className="grid gap-3">
        {list.map((p) => (
          <Link key={p.id} to="/protocoles/$id" params={{ id: p.id }}>
            <Card className="border-0 shadow-soft transition hover:shadow-glow">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-lg font-bold text-primary-foreground">
                  {list.indexOf(p) + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{p.title}</h3>
                    <Badge className={levelColors[p.level]}>{p.level}</Badge>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {p.duration} · {p.category}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
