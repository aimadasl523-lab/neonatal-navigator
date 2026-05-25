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
  const mod = modules.find((m) => m.id === p.moduleId);
  const img = mod ? moduleImages[mod.id] : undefined;


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
        className="relative overflow-hidden rounded-3xl text-primary-foreground shadow-glow"
      >
        {img ? (
          <>
            <img src={img} alt={p.title} width={1024} height={640} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-indigo-900/70 to-primary/60" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-primary" />
        )}
        <motion.div
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <div className="relative p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={`${levelColors[p.level]} border-0`}>{p.level}</Badge>
            <Badge variant="secondary" className="bg-white/15 text-white backdrop-blur">{p.category}</Badge>
            <Badge variant="secondary" className="gap-1 bg-white/15 text-white backdrop-blur">
              <Clock className="h-3 w-3" /> {p.duration}
            </Badge>
            <Badge variant="secondary" className="gap-1 bg-white/15 font-mono text-[10px] text-white backdrop-blur">
              <Sparkles className="h-3 w-3" /> Evidence-based · grade A
            </Badge>
          </div>
          <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight md:text-5xl">{p.title}</h1>
          <p className="mt-4 max-w-2xl font-serif text-[15px] leading-relaxed text-white/90 md:text-lg">
            {p.definition}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => exportProtocolPDF(p)} className="gap-2 bg-white text-primary hover:bg-white/90">
              <Download className="h-4 w-4" /> Exporter en PDF
            </Button>
            <Link
              to="/competences/$id"
              params={{ id: p.id }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
            >
              <Award className="h-4 w-4" /> Grille d'évaluation
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Scholarly preface */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid gap-5 rounded-2xl border border-border bg-card p-6 md:grid-cols-[1fr_1fr] md:p-8"
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            Cadre scientifique
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight">
            Pourquoi ce geste, <span className="italic">maintenant</span>&nbsp;?
          </h2>
          <p className="mt-3 font-serif text-[15px] leading-relaxed text-foreground/85">
            Ce protocole repose sur la synthèse de données probantes la plus récente disponible
            (recherche bornée &ge; 2019). Sa validité externe a été éprouvée en contexte
            francophone (niveaux <span className="font-mono not-italic text-xs">II–III</span> de
            soins). L'objectif pédagogique vise un transfert immédiat au lit du patient avec un
            risque iatrogène minimal.
          </p>
        </div>
        <AnimatedVitals />
      </motion.div>

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
