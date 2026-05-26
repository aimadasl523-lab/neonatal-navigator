import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCw, Layers } from "lucide-react";
import { flashcards } from "@/data/content";

export const Route = createFileRoute("/flashcards/")({
  component: FlashcardsPage,
  head: () => ({ meta: [{ title: "Flashcards — Concepts-clés · NéoFiches" }] }),
});

function FlashcardsPage() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const c = flashcards[i];
  const next = () => { setFlipped(false); setI((p) => (p + 1) % flashcards.length); };
  const prev = () => { setFlipped(false); setI((p) => (p - 1 + flashcards.length) % flashcards.length); };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="text-center">
        <span className="mono-label text-primary">Mémorisation Active</span>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Flashcards Cliniques</h1>
        <p className="mt-3 text-muted-foreground">Concepts essentiels · répétition espacée · auto-questionnement.</p>
      </header>
      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span className="mono-label">Carte {String(i + 1).padStart(2, "0")} / {String(flashcards.length).padStart(2, "0")}</span>
        <span className="mono-label text-gold">{c.category}</span>
      </div>
      <div className="relative h-[420px] [perspective:1200px]">
        <AnimatePresence mode="wait">
          <motion.button key={c.id + (flipped ? "-b" : "-f")}
            initial={{ opacity: 0, rotateY: flipped ? 90 : -90 }} animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: flipped ? -90 : 90 }} transition={{ duration: 0.45, ease: "easeOut" }}
            onClick={() => setFlipped((f) => !f)}
            className="group relative flex h-full w-full flex-col items-center justify-center overflow-hidden border border-border bg-card p-10 text-center shadow-soft transition hover:border-primary/50">
            <Layers className="absolute right-6 top-6 h-5 w-5 text-primary/30" />
            <span className="mono-label text-primary">{flipped ? "Réponse" : "Question"}</span>
            <p className="mt-6 max-w-xl font-display text-2xl leading-snug text-foreground md:text-3xl">
              {flipped ? c.back : c.front}
            </p>
            <span className="mono-label absolute bottom-6 text-muted-foreground">
              {flipped ? "Cliquer pour cacher" : "Cliquer pour révéler"}
            </span>
          </motion.button>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button onClick={prev} className="inline-flex items-center gap-2 border border-border bg-card px-5 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary">
          <ChevronLeft className="h-4 w-4" /> Précédent
        </button>
        <button onClick={() => setFlipped((f) => !f)} className="inline-flex items-center gap-2 bg-primary px-6 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition hover:bg-gold hover:text-background">
          <RotateCw className="h-4 w-4" /> Retourner
        </button>
        <button onClick={next} className="inline-flex items-center gap-2 border border-border bg-card px-5 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary">
          Suivant <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
