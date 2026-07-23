"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const products = [
  {
    name: "Flydronics X1 Pro",
    flight: "42 min",
    camera: "8K HDR / 1\" sensor",
    range: "15 km O3+",
    payload: "1.2 kg",
    specs: ["RTK positioning", "IP55 rated", "AI tracking"],
  },
  {
    name: "Flydronics Surveyor S",
    flight: "55 min",
    camera: "61MP mapping cam",
    range: "12 km",
    payload: "0.8 kg",
    specs: ["PPK/RTK", "LiDAR ready", "BVLOS certified"],
  },
  {
    name: "Flydronics Titan H",
    flight: "38 min",
    camera: "Dual thermal + 4K",
    range: "20 km",
    payload: "2.5 kg",
    specs: ["Heavy-lift arms", "Redundant ESC", "Military-grade link"],
  },
];

export function ProductLineup() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="products" className="section-pad border-t border-white/5" aria-labelledby="products-title">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.35em] text-fly-neon">Product Lineup</p>
        <h2 id="products-title" className="mt-4 font-display text-4xl font-light md:text-5xl">
          Next-Generation UAV Fleet
        </h2>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ scale: 1.02 }}
              className="glass overflow-hidden rounded-2xl"
              data-cursor-hover
            >
              <div className="relative aspect-[4/3] bg-gradient-to-b from-fly-neon/10 to-black">
                <Image
                  src="/images/drone-reference.png"
                  alt={p.name}
                  fill
                  className={`object-contain p-8 transition-transform duration-700 ${
                    hovered === i ? "scale-110 rotate-3" : "scale-100"
                  }`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(0,168,255,0.15),transparent)]" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium">{p.name}</h3>
                <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-white/35">Flight Time</dt>
                    <dd className="text-white">{p.flight}</dd>
                  </div>
                  <div>
                    <dt className="text-white/35">Camera</dt>
                    <dd className="text-white">{p.camera}</dd>
                  </div>
                  <div>
                    <dt className="text-white/35">Range</dt>
                    <dd className="text-white">{p.range}</dd>
                  </div>
                  <div>
                    <dt className="text-white/35">Payload</dt>
                    <dd className="text-white">{p.payload}</dd>
                  </div>
                </dl>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.specs.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
