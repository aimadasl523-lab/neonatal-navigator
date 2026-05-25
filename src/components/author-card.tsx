import { motion } from "framer-motion";
import { GraduationCap, Quote, Award, BookOpen } from "lucide-react";
import author from "@/assets/author.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AuthorCard() {
  return (
    <Card className="overflow-hidden border-0 shadow-soft">
      <CardContent className="grid gap-6 p-0 md:grid-cols-[260px_1fr]">
        <div className="relative h-64 md:h-auto">
          <motion.img
            src={author}
            alt="Portrait de la Dre Hélène Marcoux, PhD"
            loading="lazy"
            width={768}
            height={768}
            className="h-full w-full object-cover"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent mix-blend-multiply" />
          <Badge className="absolute left-4 top-4 gap-1 bg-white/90 text-primary backdrop-blur">
            <GraduationCap className="h-3 w-3" /> PhD · Sciences infirmières
          </Badge>
        </div>
        <div className="p-6 md:p-8">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
          >
            Rédaction scientifique
          </motion.p>
          <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight md:text-3xl">
            Dre Hélène Marcoux, PhD, IPS-NN
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Chercheuse clinicienne, Unité de néonatologie tertiaire — CHU Sainte-Marguerite ·
            Professeure agrégée, Faculté des sciences infirmières.
          </p>

          <div className="relative mt-5 rounded-2xl border-l-4 border-primary bg-accent/40 p-5">
            <Quote className="absolute -left-3 top-3 h-5 w-5 rounded-full bg-primary p-1 text-primary-foreground" />
            <p className="font-serif text-[15px] leading-relaxed italic text-foreground/90">
              « Le soin néonatal n'est pas la simple exécution d'un geste : c'est l'orchestration
              d'une physiologie immature, d'une famille bouleversée et d'une éthique de la
              vulnérabilité. Cette plateforme traduit dix années de recherche translationnelle en
              gestes reproductibles, mesurables, et profondément humains. »
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { icon: BookOpen, label: "42 publications", sub: "Lancet, JAMA Peds, NEJM" },
              { icon: Award, label: "Prix Florence", sub: "Excellence pédagogique 2024" },
              { icon: GraduationCap, label: "10 ans NICU", sub: "Réanimation niveau III" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="rounded-xl border border-border bg-card/50 p-3"
              >
                <m.icon className="h-4 w-4 text-primary" />
                <p className="mt-1.5 text-sm font-semibold">{m.label}</p>
                <p className="text-[11px] text-muted-foreground">{m.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
