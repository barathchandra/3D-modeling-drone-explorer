"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "AI Navigation",
    desc: "Neural path planning with real-time terrain adaptation and wind compensation.",
  },
  {
    title: "Obstacle Avoidance",
    desc: "360° perception mesh with predictive collision avoidance under 10ms latency.",
  },
  {
    title: "Autonomous Flight",
    desc: "Mission-grade autonomy with waypoint intelligence and dynamic rerouting.",
  },
  {
    title: "Smart Return Home",
    desc: "Multi-sensor RTH with battery-aware landing zone selection.",
  },
  {
    title: "Real-Time Mapping",
    desc: "Onboard photogrammetry with centimeter-level orthomosaic generation.",
  },
  {
    title: "Predictive Flight Intelligence",
    desc: "Fleet learning models that optimize routes across operational history.",
  },
];

export function IntelligentFlight() {
  return (
    <section id="flight" className="section-pad border-t border-white/5 bg-black" aria-labelledby="flight-title">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-fly-neon">Intelligent Flight Systems</p>
          <h2 id="flight-title" className="mt-4 font-display text-4xl font-light md:text-5xl">
            Autonomy at Scale
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="glass group rounded-2xl p-8 transition-shadow hover:shadow-[0_0_50px_rgba(0,168,255,0.08)]"
              data-cursor-hover
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-fly-neon/30 bg-fly-neon/5">
                <span className="font-mono text-xs text-fly-neon">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="text-xl font-medium text-white">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/45">{f.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
