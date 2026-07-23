"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Flight Time", value: 45, suffix: " min" },
  { label: "Range", value: 18, suffix: " km" },
  { label: "Payload", value: 6.5, suffix: " kg", decimal: true },
];

function useCountUp(target: number, active: boolean, decimal?: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const dur = 1400;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      start = target * eased;
      setN(decimal ? Math.round(start * 10) / 10 : Math.floor(start));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, decimal]);
  return n;
}

export function SpecCounters() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-pad border-t border-white/10">
      <p className="text-center text-xs tracking-[0.4em] text-fly-neon">Performance</p>
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-3">
        {stats.map((s) => (
          <Stat key={s.label} {...s} active={active} />
        ))}
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  suffix,
  decimal,
  active,
}: {
  label: string;
  value: number;
  suffix: string;
  decimal?: boolean;
  active: boolean;
}) {
  const n = useCountUp(value, active, decimal);
  return (
    <div className="glass rounded-2xl p-8 text-center">
      <p className="font-display text-4xl text-white md:text-5xl">
        {n}
        <span className="text-lg text-fly-neon">{suffix}</span>
      </p>
      <p className="mt-2 text-xs uppercase tracking-widest text-white/50">{label}</p>
    </div>
  );
}
