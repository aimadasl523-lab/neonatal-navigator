import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { faqItems } from "@/data/content";

export const Route = createFileRoute("/faq/")({
  component: FaqPage,
  head: () => ({ meta: [{ title: "FAQ — Questions fréquentes · NéoFiches" }] }),
});

function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="text-center">
        <span className="mono-label text-primary">Centre d'aide</span>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Questions Fréquentes</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Les réponses aux interrogations méthodologiques, pédagogiques et éthiques les plus courantes.
        </p>
      </header>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`} className="border border-border bg-card px-5">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <HelpCircle className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-display text-base font-semibold">{f.q}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pl-10 font-serif leading-relaxed text-foreground/85">{f.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
