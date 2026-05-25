import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { competences, protocols } from "@/data/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Award } from "lucide-react";

export const Route = createFileRoute("/competences/$id")({
  loader: ({ params }) => {
    const c = competences.find((x) => x.protocolId === params.id);
    const p = protocols.find((x) => x.id === params.id);
    if (!c || !p) throw notFound();
    return { c, p };
  },
  component: CompetenceDetail,
  notFoundComponent: () => <div>Grille introuvable</div>,
});

function CompetenceDetail() {
  const { c, p } = Route.useLoaderData();
  const total = c.criteria.reduce((a, b) => a + b.weight, 0);
  const [checked, setChecked] = useState<boolean[]>(c.criteria.map(() => false));
  const score = c.criteria.reduce((acc, crit, i) => acc + (checked[i] ? crit.weight : 0), 0);
  const pct = Math.round((score / total) * 100);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/competences" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Toutes les grilles
      </Link>

      <div className="rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-glow">
        <Badge className="mb-3 bg-white/15 text-white backdrop-blur">Grille d'évaluation</Badge>
        <h1 className="text-2xl font-bold md:text-3xl">{p.title}</h1>
        <div className="mt-4 flex items-center gap-4">
          <Award className="h-8 w-8" />
          <div className="flex-1">
            <div className="flex justify-between text-sm">
              <span>Score</span>
              <span className="font-bold">{score} / {total} pts ({pct}%)</span>
            </div>
            <Progress value={pct} className="mt-2 h-2 bg-white/20" />
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-soft">
        <CardContent className="p-6">
          <div className="space-y-3">
            {c.criteria.map((crit, i) => (
              <label
                key={i}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition hover:border-primary/40"
              >
                <Checkbox
                  checked={checked[i]}
                  onCheckedChange={(v) =>
                    setChecked((arr) => arr.map((b, idx) => (idx === i ? !!v : b)))
                  }
                />
                <div className="flex-1">
                  <p className="font-medium">{crit.label}</p>
                </div>
                <Badge variant="outline">{crit.weight} pt{crit.weight > 1 ? "s" : ""}</Badge>
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-accent/40 p-4">
            <div>
              <p className="text-sm text-muted-foreground">Évaluation finale</p>
              <p className="text-2xl font-bold">
                {pct >= 75 ? "✅ Acquis" : pct >= 50 ? "🟡 En cours" : "🔴 Non acquis"}
              </p>
            </div>
            <Button onClick={() => setChecked(c.criteria.map(() => false))} variant="outline">
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
