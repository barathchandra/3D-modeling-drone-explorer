"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSplit() {
  return (
    <div className="pointer-events-none relative z-10 flex h-full w-full flex-col justify-center px-6 md:max-w-[48%] md:px-12 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-display text-sm font-semibold tracking-[0.35em] text-white">FLYDRONICS</p>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.4em] text-fly-neon">Aerospace Intelligence</p>
        <h1
          id="hero"
          className="mt-4 font-display text-3xl font-light leading-[1.05] tracking-tight text-gradient neon-text sm:text-4xl md:text-5xl lg:text-6xl"
        >
          REDEFINING THE
          <br />
          FUTURE OF FLIGHT
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
          Advanced autonomous drone systems engineered for precision, intelligence, and performance — built for
          missions that demand aerospace-grade reliability.
        </p>
        <div className="pointer-events-auto mt-10 flex flex-wrap gap-4">
          <Link href="#engineering-propellers" className="btn-primary" data-cursor-hover>
            Explore
          </Link>
          <button
            type="button"
            className="btn-ghost glass rounded-sm"
            data-cursor-hover
            onClick={() => document.getElementById("final")?.scrollIntoView({ behavior: "smooth" })}
          >
            Watch Demo
          </button>
        </div>
      </motion.div>
    </div>
  );
}
