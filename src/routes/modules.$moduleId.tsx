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
  const Icon = mod.icon;
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${mod.color} p-8 text-white shadow-glow`}>
        <Icon className="absolute right-8 top-1/2 h-32 w-32 -translate-y-1/2 text-white/20" />
        <Badge className="mb-3 bg-white/20 text-white backdrop-blur">Module</Badge>
        <h1 className="text-3xl font-bold md:text-4xl">{mod.title}</h1>
        <p className="mt-2 max-w-xl text-white/90">{mod.description}</p>
      </div>

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
