import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { quizzes, modules } from "@/data/content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, RotateCcw, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/quiz/")({
  component: QuizPage,
  head: () => ({ meta: [{ title: "Quiz — NéoFiches" }] }),
});

function QuizPage() {
  const [moduleId, setModuleId] = useState<string | null>(null);
  const list = useMemo(
    () => (moduleId ? quizzes.filter((q) => q.moduleId === moduleId) : quizzes),
    [moduleId]
  );
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = list[i];

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (i + 1 >= list.length) {
      setDone(true);
      return;
    }
    setI(i + 1);
    setPicked(null);
  };

  const reset = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (!list.length) return <div>Aucune question pour ce module.</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quiz interactifs</h1>
        <p className="mt-1 text-muted-foreground">Teste tes connaissances par module.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={moduleId === null ? "default" : "outline"} onClick={() => { setModuleId(null); reset(); }}>
          Tous
        </Button>
        {modules.map((m) => (
          <Button
            key={m.id}
            size="sm"
            variant={moduleId === m.id ? "default" : "outline"}
            onClick={() => { setModuleId(m.id); reset(); }}
          >
            {m.title}
          </Button>
        ))}
      </div>

      {done ? (
        <Card className="border-0 shadow-glow">
          <CardContent className="p-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
              <Brain className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">Quiz terminé !</h2>
            <p className="mt-2 text-muted-foreground">
              Tu as obtenu <strong className="text-foreground">{score} / {list.length}</strong> ({Math.round((score / list.length) * 100)}%)
            </p>
            <Button className="mt-6 gap-2" onClick={reset}>
              <RotateCcw className="h-4 w-4" /> Recommencer
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                <span>Question {i + 1} / {list.length}</span>
                <span>Score : {score}</span>
              </div>
              <Progress value={((i + 1) / list.length) * 100} className="h-1.5" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="outline" className="mb-3">{modules.find((m) => m.id === q.moduleId)?.title}</Badge>
                <h2 className="text-lg font-semibold leading-relaxed md:text-xl">{q.question}</h2>

                <div className="mt-5 space-y-2">
                  {q.options.map((opt, idx) => {
                    const isCorrect = idx === q.answer;
                    const isPicked = picked === idx;
                    const reveal = picked !== null;
                    return (
                      <button
                        key={idx}
                        onClick={() => choose(idx)}
                        disabled={reveal}
                        className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition ${
                          reveal && isCorrect
                            ? "border-success bg-success/10"
                            : reveal && isPicked && !isCorrect
                            ? "border-destructive bg-destructive/10"
                            : "border-border hover:border-primary/40 hover:bg-accent/30"
                        }`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {reveal && isCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
                        {reveal && isPicked && !isCorrect && <XCircle className="h-5 w-5 text-destructive" />}
                      </button>
                    );
                  })}
                </div>

                {picked !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-xl bg-accent/40 p-4 text-sm"
                  >
                    <p className="font-semibold">💡 Explication</p>
                    <p className="mt-1 text-muted-foreground">{q.explanation}</p>
                  </motion.div>
                )}

                {picked !== null && (
                  <Button className="mt-4 w-full" onClick={next}>
                    {i + 1 >= list.length ? "Voir le résultat" : "Question suivante →"}
                  </Button>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
