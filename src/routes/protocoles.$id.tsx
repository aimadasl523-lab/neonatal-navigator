import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { protocols, type Protocol } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Target,
  CheckCircle2,
  XCircle,
  Package,
  ListOrdered,
  ShieldAlert,
  Eye,
  AlertTriangle,
  Award,
  BookMarked,
  Download,
  ArrowLeft,
  Sparkles,
  Clock,
} from "lucide-react";
import { exportProtocolPDF } from "@/lib/pdf";
import { motion } from "framer-motion";
import { AnimatedVitals } from "@/components/animated-vitals";
import { moduleImages } from "@/lib/module-images";
import { modules } from "@/data/content";

export const Route = createFileRoute("/protocoles/$id")({
  loader: ({ params }) => {
    const p = protocols.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return { p };
  },
  component: ProtocolDetail,
  notFoundComponent: () => (
    <div className="p-8 text-center">Protocole introuvable.</div>
  ),
});

const levelColors: Record<string, string> = {
  Essentiel: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Intermédiaire: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Avancé: "bg-rose-500/15 text-rose-700 dark:text-rose-400",
};

function ProtocolDetail() {
  const { p } = Route.useLoaderData() as { p: Protocol };

  const sections: { id: string; icon: typeof Target; title: string; items?: string[]; render?: () => React.ReactNode }[] = [
    { id: "obj", icon: Target, title: "Objectifs", items: p.objectives },
    { id: "ind", icon: CheckCircle2, title: "Indications", items: p.indications },
    { id: "ci", icon: XCircle, title: "Contre-indications", items: p.contreIndications },
    { id: "mat", icon: Package, title: "Matériel nécessaire", items: p.materiel },
    {
      id: "et",
      icon: ListOrdered,
      title: "Étapes procédurales",
      render: () => (
        <ol className="space-y-3">
          {p.etapes.map((e, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{e.titre}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{e.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    { id: "prec", icon: ShieldAlert, title: "Précautions", items: p.precautions },
    { id: "surv", icon: Eye, title: "Surveillance", items: p.surveillance },
    { id: "comp", icon: AlertTriangle, title: "Complications potentielles", items: p.complications },
    { id: "qual", icon: Award, title: "Critères de qualité", items: p.criteresQualite },
    { id: "ref", icon: BookMarked, title: "Références", items: p.references },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link to="/protocoles" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Tous les protocoles
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-glow"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={`${levelColors[p.level]} border-0`}>{p.level}</Badge>
          <Badge variant="secondary" className="bg-white/15 text-white backdrop-blur">{p.category}</Badge>
          <Badge variant="secondary" className="gap-1 bg-white/15 text-white backdrop-blur">
            <Clock className="h-3 w-3" /> {p.duration}
          </Badge>
        </div>
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">{p.title}</h1>
        <p className="mt-3 max-w-2xl text-white/90">{p.definition}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={() => exportProtocolPDF(p)} className="gap-2 bg-white text-primary hover:bg-white/90">
            <Download className="h-4 w-4" /> Exporter en PDF
          </Button>
          <Link
            to="/competences/$id"
            params={{ id: p.id }}
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
          >
            <Award className="h-4 w-4" /> Grille d'évaluation
          </Link>
        </div>
      </motion.div>

      {/* Animation placeholder */}
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-primary/30 bg-gradient-soft p-8 text-center">
        <Sparkles className="mx-auto h-8 w-8 text-primary animate-pulse-ring rounded-full" />
        <p className="mt-3 text-sm font-medium">Animation interactive</p>
        <p className="text-xs text-muted-foreground">
          Schéma animé du geste — disponible prochainement
        </p>
      </div>

      <Accordion type="multiple" defaultValue={["obj", "ind", "et"]} className="space-y-3">
        {sections.map((s) => (
          <AccordionItem
            key={s.id}
            value={s.id}
            className="rounded-2xl border border-border bg-card px-5 shadow-soft"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <s.icon className="h-4 w-4" />
                </div>
                <span className="font-semibold">{s.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-12">
                {s.render ? (
                  s.render()
                ) : (
                  <ul className="space-y-2">
                    {(s.items ?? []).map((it, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
