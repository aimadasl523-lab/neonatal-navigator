/**
 * Animated ECG trace SVG — repeats a clinical waveform across the viewport.
 * Pure CSS animation via stroke-dashoffset (see .animate-ecg in styles.css).
 */
export function EcgBackground({ className = "" }: { className?: string }) {
  // Build a repeating PQRST-ish waveform spanning 2000 units
  const unit = 200;
  const segments = Array.from({ length: 10 }).map((_, i) => {
    const x = i * unit;
    return `M ${x} 60 L ${x + 40} 60 L ${x + 55} 56 L ${x + 70} 64 L ${x + 80} 20 L ${x + 90} 100 L ${x + 100} 50 L ${x + 130} 60 L ${x + 160} 60`;
  });
  return (
    <svg
      viewBox="0 0 2000 120"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id="ecg-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset="30%" stopColor="var(--primary)" stopOpacity="0.9" />
          <stop offset="70%" stopColor="var(--gold)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={segments.join(" ")}
        fill="none"
        stroke="url(#ecg-grad)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray="2000"
        className="animate-ecg"
      />
    </svg>
  );
}
