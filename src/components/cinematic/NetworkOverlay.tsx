"use client";

import { useEffect, useRef } from "react";

export type NetworkNode = { id: string; label: string; x: number; y: number; primary?: boolean };

type NetworkOverlayProps = {
  nodes: NetworkNode[];
  links: [string, string][];
  className?: string;
};

export function NetworkOverlay({ nodes, links, className }: NetworkOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    const particles: { t: number; link: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const nodeAt = (id: string) => nodes.find((n) => n.id === id)!;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      links.forEach(([a, b], li) => {
        const na = nodeAt(a);
        const nb = nodeAt(b);
        const x1 = (na.x / 100) * w;
        const y1 = (na.y / 100) * h;
        const x2 = (nb.x / 100) * w;
        const y2 = (nb.y / 100) * h;
        ctx.strokeStyle = `rgba(0,168,255,${0.12 + Math.sin(frame * 0.02 + li) * 0.08})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      if (frame % 14 === 0 && particles.length < 60) {
        particles.push({ t: 0, link: Math.floor(Math.random() * links.length) });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const [a, b] = links[p.link];
        const na = nodeAt(a);
        const nb = nodeAt(b);
        p.t += 0.016;
        if (p.t > 1) {
          particles.splice(i, 1);
          continue;
        }
        const x1 = (na.x / 100) * w;
        const y1 = (na.y / 100) * h;
        const x2 = (nb.x / 100) * w;
        const y2 = (nb.y / 100) * h;
        const x = x1 + (x2 - x1) * p.t;
        const y = y1 + (y2 - y1) * p.t;
        ctx.fillStyle = "#00a8ff";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      frame++;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [nodes, links]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      {nodes.map((n) => (
        <div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                n.primary
                  ? "border-fly-neon bg-fly-neon/20 shadow-[0_0_30px_rgba(0,168,255,0.45)]"
                  : "border-white/20 bg-white/5"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-fly-neon" />
            </div>
            <span className="whitespace-nowrap text-[10px] uppercase tracking-widest text-white/60">
              {n.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
