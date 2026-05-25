import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { competences, protocols } from "@/data/content";
import { Award } from "lucide-react";

export const Route = createFileRoute("/competences/")({
  component: () => {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Grilles de compétences</h1>
          <p className="mt-1 text-muted-foreground">
            Évalue ta maîtrise pour chaque geste technique.
          </p>
        </div>
        <div className="grid gap-3">
          {competences.map((c) => {
            const p = protocols.find((x) => x.id === c.protocolId)!;
            return (
              <Link key={c.id} to="/competences/$id" params={{ id: p.id }}>
                <Card className="border-0 shadow-soft transition hover:shadow-glow">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                      <Award className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{p.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.criteria.length} critères · {c.criteria.reduce((a, b) => a + b.weight, 0)} pts
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    );
  },
});
