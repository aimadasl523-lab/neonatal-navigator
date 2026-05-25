import { createFileRoute } from "@tanstack/react-router";
import { algorithms } from "@/data/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, GitBranch, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/algorithmes/")({
  component: AlgorithmsPage,
  head: () => ({ meta: [{ title: "Algorithmes — NéoFiches" }] }),
});

const typeStyles: Record<string, { bg: string; ring: string; text: string }> = {
  start: { bg: "bg-gradient-primary", ring: "ring-primary/30", text: "text-primary-foreground" },
  decision: { bg: "bg-amber-500", ring: "ring-amber-300/40", text: "text-white" },
  action: { bg: "bg-card border", ring: "ring-border", text: "text-foreground" },
  urgent: { bg: "bg-destructive", ring: "ring-destructive/40", text: "text-destructive-foreground" },
};

function AlgorithmsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Algorithmes interactifs</h1>
        <p className="mt-1 text-muted-foreground">Suis l'arbre de décision étape par étape.</p>
      </div>

      {algorithms.map((algo) => (
        <Card key={algo.id} className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                <GitBranch className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{algo.title}</h2>
                <p className="text-sm text-muted-foreground">{algo.description}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              {algo.steps.map((s, i) => {
                const st = typeStyles[s.type] ?? typeStyles.action;
                const isDecision = s.type === "decision";
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex w-full flex-col items-center"
                  >
                    <div
                      className={`relative w-full max-w-md rounded-2xl px-5 py-4 text-center shadow-soft ring-1 ${st.bg} ${st.ring} ${st.text} ${
                        isDecision ? "rotate-0 [clip-path:polygon(8%_0,92%_0,100%_50%,92%_100%,8%_100%,0_50%)] py-6" : ""
                      }`}
                    >
                      {s.type === "urgent" && (
                        <AlertTriangle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-pulse" />
                      )}
                      <span className="text-sm font-medium">{s.label}</span>
                      {s.type === "start" && (
                        <Badge className="absolute -top-2 right-3 bg-white text-primary">Début</Badge>
                      )}
                    </div>
                    {i < algo.steps.length - 1 && (
                      <ArrowDown className="my-1 h-5 w-5 text-muted-foreground" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 rounded-xl bg-accent/40 p-4 text-xs">
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-gradient-primary" /> Départ</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Décision</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border bg-card" /> Action</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-destructive" /> Urgence</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
