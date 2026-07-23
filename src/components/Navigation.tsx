"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#engineering-propellers", label: "Engineering" },
  { href: "#technology", label: "Technology" },
  { href: "#products", label: "Products" },
  { href: "#industries", label: "Industries" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-black/40 px-6 py-4 backdrop-blur-md md:px-12"
    >
      <Link
        href="#hero"
        className="font-display text-lg font-semibold tracking-[0.2em] text-white"
        data-cursor-hover
      >
        FLYDRONICS
      </Link>
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-fly-neon"
            data-cursor-hover
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <Link
        href="#contact"
        className="glass hidden rounded-full px-5 py-2 text-xs uppercase tracking-widest text-white/90 md:inline-flex"
        data-cursor-hover
      >
        Request Demo
      </Link>
    </motion.header>
  );
}
