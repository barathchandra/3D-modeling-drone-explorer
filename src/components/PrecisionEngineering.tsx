"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { DRONE_PARTS, PART_INFO } from "@/lib/droneParts";

export function PrecisionEngineering() {
  const [active, setActive] = useState<string | null>(null);
  const info = active ? PART_INFO[active] : null;

  return (
    <section className="section-pad relative border-t border-white/5 bg-black" aria-labelledby="precision-title">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-fly-neon">Precision Engineering</p>
          <h2 id="precision-title" className="mt-4 font-display text-4xl font-light text-white md:text-5xl">
            Interactive Exploded View
          </h2>
          <p className="mt-4 max-w-2xl text-white/50">
            Hover components to reveal aerospace-grade specifications. Every module is
            engineered for modularity, thermal efficiency, and mission-critical reliability.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { id: "motor-fl", label: "Motors" },
            { id: "esc-1", label: "ESCs" },
            { id: "pdb", label: "PDB" },
            { id: "flight-controller", label: "Flight Controller" },
            { id: "gps", label: "GPS" },
            { id: "battery", label: "Battery" },
            { id: "sensors", label: "Sensors" },
          ].map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onMouseEnter={() => setActive(item.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(item.id)}
              onBlur={() => setActive(null)}
              data-cursor-hover
              className={`glass group rounded-xl p-6 text-left transition-all duration-300 ${
                active === item.id ? "border-fly-neon/50 shadow-[0_0_40px_rgba(0,168,255,0.15)]" : ""
              }`}
            >
              <div className="mb-4 h-1 w-8 bg-fly-neon/60 transition-all group-hover:w-12" />
              <h3 className="text-lg font-medium text-white">{item.label}</h3>
              <p className="mt-2 text-sm text-white/40">
                {DRONE_PARTS.find((p) => p.id === item.id)?.label ?? "Core subsystem"}
              </p>
            </motion.button>
          ))}
        </div>

        <motion.div
          layout
          className="glass-strong mt-10 min-h-[120px] rounded-2xl p-8"
        >
          {info ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-xl text-fly-neon">{info.title}</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {info.specs.map((s) => (
                  <li key={s} className="text-sm text-white/60">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <p className="text-white/35">Select a component to view technical specifications.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
