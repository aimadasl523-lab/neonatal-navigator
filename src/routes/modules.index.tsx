import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { modules, protocols } from "@/data/content";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/modules/")({
  component: ModulesPage,
  head: () => ({ meta: [{ title: "Modules — NéoFiches" }] }),
});

function ModulesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Modules par domaine</h1>
        <p className="mt-1 text-muted-foreground">
          Explore les différents domaines de soins en néonatologie et pédiatrie.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m, i) => {
          const count = protocols.filter((p) => p.moduleId === m.id).length;
          const Icon = m.icon;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to="/modules/$moduleId" params={{ moduleId: m.id }}>
                <Card className="group h-full overflow-hidden border-0 shadow-soft transition hover:shadow-glow">
                  <div className={`h-32 bg-gradient-to-br ${m.color} relative`}>
                    <Icon className="absolute right-4 top-4 h-16 w-16 text-white/30" />
                    <div className="absolute bottom-3 left-4">
                      <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur">
                        {count} fiches
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold">{m.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
                      Découvrir <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
