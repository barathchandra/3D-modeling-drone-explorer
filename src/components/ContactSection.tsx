"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden border-t border-white/5" aria-labelledby="contact-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,102,255,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.35em] text-fly-neon">Contact</p>
        <h2 id="contact-title" className="mt-4 font-display text-4xl font-light md:text-5xl">
          Start Your Mission
        </h2>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="glass-strong space-y-6 rounded-2xl p-8"
          >
            <h3 className="text-lg font-medium">Contact Form</h3>
            {sent ? (
              <p className="text-fly-neon">Thank you. Our team will respond within 24 hours.</p>
            ) : (
              <>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/40">Name</span>
                  <input
                    required
                    className="mt-2 w-full border-b border-white/15 bg-transparent py-2 text-white outline-none focus:border-fly-neon"
                    name="name"
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/40">Email</span>
                  <input
                    required
                    type="email"
                    className="mt-2 w-full border-b border-white/15 bg-transparent py-2 text-white outline-none focus:border-fly-neon"
                    name="email"
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/40">Message</span>
                  <textarea
                    required
                    rows={4}
                    className="mt-2 w-full resize-none border-b border-white/15 bg-transparent py-2 text-white outline-none focus:border-fly-neon"
                    name="message"
                  />
                </label>
                <button type="submit" className="btn-primary w-full" data-cursor-hover>
                  Send Message
                </button>
              </>
            )}
          </motion.form>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="glass space-y-6 rounded-2xl p-8"
          >
            <h3 className="text-lg font-medium">Demo Request</h3>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-white/40">Organization</span>
              <input
                required
                className="mt-2 w-full border-b border-white/15 bg-transparent py-2 text-white outline-none focus:border-fly-neon"
                name="org"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-white/40">Use Case</span>
              <select
                name="usecase"
                className="mt-2 w-full border-b border-white/15 bg-transparent py-2 text-white outline-none focus:border-fly-neon"
              >
                <option value="agriculture">Agriculture</option>
                <option value="mapping">Mapping</option>
                <option value="surveillance">Surveillance</option>
                <option value="defense">Defense</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-white/40">Fleet Size</span>
              <input
                type="number"
                min={1}
                className="mt-2 w-full border-b border-white/15 bg-transparent py-2 text-white outline-none focus:border-fly-neon"
                name="fleet"
              />
            </label>
            <button type="submit" className="btn-primary w-full" data-cursor-hover>
              Request Demo
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
