import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { protocols, modules } from "@/data/content";
import { Search, Clock, Filter } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/protocoles/")({
  component: ProtocolsPage,
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Protocoles — NéoFiches" }] }),
});

const levelColors: Record<string, string> = {
  Essentiel: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Intermédiaire: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Avancé: "bg-rose-500/15 text-rose-700 dark:text-rose-400",
};

function ProtocolsPage() {
  const { q: initialQ } = Route.useSearch();
  const [q, setQ] = useState(initialQ ?? "");
  const [moduleFilter, setModuleFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = q.toLowerCase().trim();
    return protocols.filter((p) => {
      if (moduleFilter && p.moduleId !== moduleFilter) return false;
      if (!term) return true;
      return (
        p.title.toLowerCase().includes(term) ||
        p.definition.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.indications.some((i) => i.toLowerCase().includes(term))
      );
    });
  }, [q, moduleFilter]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Protocoles & fiches techniques</h1>
        <p className="mt-1 text-muted-foreground">
          {filtered.length} fiche{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher (titre, indication, mot-clé…)"
            className="pl-9 h-11"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Button
            size="sm"
            variant={moduleFilter === null ? "default" : "outline"}
            onClick={() => setModuleFilter(null)}
          >
            Tous
          </Button>
          {modules.map((m) => (
            <Button
              key={m.id}
              size="sm"
              variant={moduleFilter === m.id ? "default" : "outline"}
              onClick={() => setModuleFilter(m.id)}
            >
              {m.title}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.map((p) => (
          <Link key={p.id} to="/protocoles/$id" params={{ id: p.id }}>
            <Card className="border-0 shadow-soft transition hover:shadow-glow">
              <CardContent className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{p.title}</h3>
                  <Badge className={levelColors[p.level]}>{p.level}</Badge>
                  <Badge variant="outline">{p.category}</Badge>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.definition}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {p.duration}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
            Aucun protocole ne correspond à ta recherche.
          </div>
        )}
      </div>
    </div>
  );
}
