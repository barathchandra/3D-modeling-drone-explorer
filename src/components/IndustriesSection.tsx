"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const industries = [
  { name: "Agriculture", desc: "Precision crop monitoring, spraying, and yield analytics." },
  { name: "Surveillance", desc: "Persistent aerial intelligence with encrypted feeds." },
  { name: "Mapping", desc: "Survey-grade photogrammetry and 3D terrain models." },
  { name: "Construction", desc: "Site progress tracking and volumetric measurements." },
  { name: "Logistics", desc: "Last-mile delivery and warehouse inventory drones." },
  { name: "Infrastructure Inspection", desc: "Bridge, pipeline, and tower defect detection." },
  { name: "Defense Applications", desc: "Tactical ISR with hardened communication links." },
  { name: "Smart Cities", desc: "Urban mobility, traffic, and environmental sensing." },
];

export function IndustriesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="industries" className="section-pad border-t border-white/5" aria-labelledby="industries-title">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.35em] text-fly-neon">Industries Served</p>
        <h2 id="industries-title" className="mt-4 font-display text-4xl font-light md:text-5xl">
          Mission-Ready Across Sectors
        </h2>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            {industries.map((ind, i) => (
              <button
                key={ind.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor-hover
                className={`rounded-lg px-5 py-4 text-left transition-all ${
                  active === i
                    ? "glass border-fly-neon/40 text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <span className="text-sm font-medium uppercase tracking-widest">{ind.name}</span>
              </button>
            ))}
          </div>
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-strong flex flex-col justify-center rounded-2xl p-12"
          >
            <span className="text-6xl font-light text-fly-neon/30">
              {String(active + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-3xl font-light">{industries[active].name}</h3>
            <p className="mt-4 text-lg text-white/50">{industries[active].desc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
