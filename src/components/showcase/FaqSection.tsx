"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What industries does Flydronics serve?",
    a: "Agriculture, surveying, inspection, construction, and logistics — with modular payloads and fleet management.",
  },
  {
    q: "Is RTK positioning supported?",
    a: "Yes. Our GNSS module supports multi-band RTK for centimeter-level accuracy in open and mixed environments.",
  },
  {
    q: "Can we request a live demo?",
    a: "Contact our team to schedule an on-site or virtual demonstration tailored to your mission profile.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad border-t border-white/10">
      <p className="text-xs tracking-[0.4em] text-fly-neon">FAQ</p>
      <h2 className="mt-3 font-display text-3xl font-light">Questions</h2>
      <ul className="mx-auto mt-10 max-w-2xl space-y-3">
        {faqs.map((item, i) => (
          <li key={item.q} className="glass overflow-hidden rounded-xl">
            <button
              type="button"
              className="flex w-full items-center justify-between px-6 py-4 text-left text-sm text-white/90"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.q}
              <span className="text-fly-neon">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p className="border-t border-white/10 px-6 pb-4 text-sm text-white/50">{item.a}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
