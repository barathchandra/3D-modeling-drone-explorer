"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export function DroneCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 280, damping: 28 });
  const springY = useSpring(y, { stiffness: 280, damping: 28 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);
  const trailSeq = useRef(0);
  const lastTrailAt = useRef(0);

  const onMove = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const now = performance.now();
      if (now - lastTrailAt.current < 32) return;
      lastTrailAt.current = now;
      trailSeq.current += 1;
      const id = trailSeq.current;
      setTrail((prev) => [...prev, { id, x: e.clientX, y: e.clientY }].slice(-8));
    },
    [x, y],
  );

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      setHovering(
        !!t.closest("a, button, [data-cursor-hover], input, textarea, select"),
      );
    };
    const onDown = () => {
      setClicking(true);
      setTimeout(() => setClicking(false), 400);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
    };
  }, [onMove]);

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  if (mobile) return null;

  const scale = hovering ? 1.55 : 1;
  const glow = hovering ? "0 0 28px rgba(0,168,255,0.9)" : "0 0 14px rgba(0,168,255,0.5)";

  return (
    <>
      {trail.map((p, i) => (
        <motion.div
          key={p.id}
          className="pointer-events-none fixed z-[9998] h-1 w-1 rounded-full bg-fly-neon/40"
          style={{ left: p.x - 2, top: p.y - 2 }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: i * 0.02 }}
        />
      ))}

      {clicking && (
        <motion.div
          className="pointer-events-none fixed z-[9997] rounded-full border border-fly-neon/60"
          style={{ left: springX, top: springY, x: "-50%", y: "-50%" }}
          initial={{ width: 20, height: 20, opacity: 0.8 }}
          animate={{ width: 120, height: 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      )}

      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          scale,
          opacity: visible ? 1 : 0,
          filter: `drop-shadow(${glow})`,
        }}
        animate={clicking ? { rotate: 720 } : { rotate: 0 }}
        transition={clicking ? { duration: 0.4, ease: "easeOut" } : { duration: 0 }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden>
          <circle cx="18" cy="18" r="4" fill="#00a8ff" opacity={hovering ? 1 : 0.7} />
          <line x1="18" y1="18" x2="8" y2="8" stroke="#00a8ff" strokeWidth="1.2" opacity="0.8" />
          <line x1="18" y1="18" x2="28" y2="8" stroke="#00a8ff" strokeWidth="1.2" opacity="0.8" />
          <line x1="18" y1="18" x2="8" y2="28" stroke="#00a8ff" strokeWidth="1.2" opacity="0.8" />
          <line x1="18" y1="18" x2="28" y2="28" stroke="#00a8ff" strokeWidth="1.2" opacity="0.8" />
          {[
            [8, 8],
            [28, 8],
            [8, 28],
            [28, 28],
          ].map(([cx, cy], i) => (
            <g key={i} transform={`translate(${cx},${cy})`}>
              <motion.ellipse
                rx="5"
                ry="1.2"
                fill="none"
                stroke="#00a8ff"
                strokeWidth="0.8"
                opacity="0.9"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.15 + i * 0.02, ease: "linear" }}
                style={{ transformOrigin: "0px 0px" }}
              />
            </g>
          ))}
        </svg>
      </motion.div>
    </>
  );
}
