"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const nodes = [
  { id: "drone", label: "Drone", x: 50, y: 50 },
  { id: "ground", label: "Ground Station", x: 15, y: 30 },
  { id: "satellite", label: "Satellite", x: 85, y: 20 },
  { id: "cloud", label: "Cloud", x: 80, y: 75 },
  { id: "ai", label: "AI Systems", x: 20, y: 78 },
];

const links = [
  ["drone", "ground"],
  ["drone", "satellite"],
  ["drone", "cloud"],
  ["drone", "ai"],
  ["ground", "cloud"],
  ["satellite", "cloud"],
];

export function TechnologyEcosystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    const particles: { x: number; y: number; t: number; link: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      links.forEach(([a, b], li) => {
        const na = nodes.find((n) => n.id === a)!;
        const nb = nodes.find((n) => n.id === b)!;
        const x1 = (na.x / 100) * w;
        const y1 = (na.y / 100) * h;
        const x2 = (nb.x / 100) * w;
        const y2 = (nb.y / 100) * h;
        ctx.strokeStyle = `rgba(0,168,255,${0.15 + Math.sin(frame * 0.02 + li) * 0.1})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      if (frame % 20 === 0 && particles.length < 40) {
        const link = Math.floor(Math.random() * links.length);
        const [a, b] = links[link];
        const na = nodes.find((n) => n.id === a)!;
        const nb = nodes.find((n) => n.id === b)!;
        particles.push({
          x: (na.x / 100) * w,
          y: (na.y / 100) * h,
          t: 0,
          link,
        });
      }

      particles.forEach((p, i) => {
        const [a, b] = links[p.link];
        const na = nodes.find((n) => n.id === a)!;
        const nb = nodes.find((n) => n.id === b)!;
        p.t += 0.015;
        if (p.t > 1) {
          particles.splice(i, 1);
          return;
        }
        const x1 = (na.x / 100) * w;
        const y1 = (na.y / 100) * h;
        const x2 = (nb.x / 100) * w;
        const y2 = (nb.y / 100) * h;
        p.x = x1 + (x2 - x1) * p.t;
        p.y = y1 + (y2 - y1) * p.t;
        ctx.fillStyle = "#00a8ff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="ecosystem" className="section-pad border-t border-white/5" aria-labelledby="ecosystem-title">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.35em] text-fly-neon">Technology Ecosystem</p>
        <h2 id="ecosystem-title" className="mt-4 font-display text-4xl font-light md:text-5xl">
          Connected Intelligence Network
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass relative mt-16 aspect-[16/9] overflow-hidden rounded-2xl md:aspect-[21/9]"
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
          {nodes.map((n) => (
            <div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                    n.id === "drone"
                      ? "border-fly-neon bg-fly-neon/20 shadow-[0_0_30px_rgba(0,168,255,0.4)]"
                      : "border-white/20 bg-white/5"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-fly-neon" />
                </div>
                <span className="text-xs uppercase tracking-widest text-white/60">{n.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
