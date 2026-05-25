import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { modules, protocols } from "@/data/content";
import { moduleImages } from "@/lib/module-images";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/modules/")({
  component: ModulesPage,
  head: () => ({ meta: [{ title: "Modules — NéoFiches" }] }),
});

function ModulesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          Corpus pédagogique
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
          Modules par <span className="italic">domaine de soin</span>.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Chaque domaine regroupe des fiches techniques peer-reviewed, structurées selon le
          modèle <em>Bloom–Krathwohl révisé</em> : connaître, appliquer, analyser, créer.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m, i) => {
          const count = protocols.filter((p) => p.moduleId === m.id).length;
          const Icon = m.icon;
          const img = moduleImages[m.id];
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              <Link to="/modules/$moduleId" params={{ moduleId: m.id }}>
                <Card className="group h-full overflow-hidden border-0 shadow-soft transition hover:shadow-glow">
                  <div className="relative h-44 overflow-hidden">
                    {img && (
                      <motion.img
                        src={img}
                        alt={m.title}
                        loading="lazy"
                        width={1024}
                        height={640}
                        className="absolute inset-0 h-full w-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-tr ${m.color} mix-blend-multiply opacity-60`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <Icon className="absolute right-4 top-4 h-10 w-10 text-white/85 drop-shadow" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur">
                        {count} fiches
                      </Badge>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/80">
                        N°{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-serif text-xl font-semibold tracking-tight">{m.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {m.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition group-hover:translate-x-0.5">
                      Explorer le module <ArrowRight className="h-4 w-4" />
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
