import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Decorative animated ECG/SpO2 trace — pure SVG, no external deps.
 * Used as a "live" visual signature for medical content.
 */
export function AnimatedVitals({ className = "" }: { className?: string }) {
  const [bpm, setBpm] = useState(138);
  const [spo2, setSpo2] = useState(98);

  useEffect(() => {
    const id = setInterval(() => {
      setBpm((b) => Math.max(124, Math.min(152, b + (Math.random() * 6 - 3))));
      setSpo2((s) => Math.max(95, Math.min(100, s + (Math.random() * 1.4 - 0.7))));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border bg-card p-5 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Monitorage néonatal · démonstration
          </p>
          <p className="mt-1 font-serif text-sm italic text-muted-foreground">
            Tracé synthétique illustratif — ne reflète pas un patient réel.
          </p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-rose-500">FC</p>
            <p className="font-mono text-2xl font-bold text-rose-500">{Math.round(bpm)}</p>
            <p className="text-[10px] text-muted-foreground">bpm</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-sky-500">SpO₂</p>
            <p className="font-mono text-2xl font-bold text-sky-500">{spo2.toFixed(0)}</p>
            <p className="text-[10px] text-muted-foreground">%</p>
          </div>
        </div>
      </div>

      <svg viewBox="0 0 600 120" className="mt-3 h-24 w-full">
        <defs>
          <linearGradient id="ecg-fade" x1="0" x2="1">
            <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="0.5" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* baseline grid */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={i * 50} x2={i * 50} y1="0" y2="120" stroke="currentColor" strokeOpacity="0.05" />
        ))}
        <motion.path
          d="M0 60 L80 60 L90 60 L100 30 L110 90 L120 60 L200 60 L210 60 L220 30 L230 90 L240 60 L320 60 L330 30 L340 90 L350 60 L440 60 L450 30 L460 90 L470 60 L560 60 L600 60"
          fill="none"
          stroke="url(#ecg-fade)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        />
      </svg>

      <motion.div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}
