"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EXPLODE_SLIDES, type ExplodeSlideId } from "@/lib/droneComponents";
import { getActiveComponentIndex } from "@/lib/sections";
import { scrollStore } from "@/lib/scrollStore";
import { COMPONENT_UI_COPY, OVERVIEW_COPY } from "@/lib/uiCopy";

const panelEase = [0.22, 1, 0.36, 1] as const;

export function RightPanel() {
  const [section, setSection] = useState(0);

  useEffect(() => scrollStore.subscribeSection(setSection), []);

  const isOverview = section === 0;
  const componentIndex = getActiveComponentIndex(section);
  const slideId =
    componentIndex >= 0 ? (EXPLODE_SLIDES[componentIndex]?.id as ExplodeSlideId) : null;

  return (
    <aside
      data-spec-panel
      className="glass-panel pointer-events-auto fixed bottom-0 right-0 z-10 flex h-[46vh] w-full flex-col justify-start overflow-y-auto md:bottom-auto md:top-0 md:h-screen md:w-[var(--explorer-panel-w)] md:justify-center"
    >
      <div className="flex min-h-full flex-col justify-center px-6 py-6 md:px-10 md:py-12 lg:px-12 2xl:px-16">
        <AnimatePresence mode="wait">
          {isOverview ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: panelEase }}
            >
              <OverviewContent />
            </motion.div>
          ) : slideId ? (
            <motion.div
              key={slideId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: panelEase }}
            >
              <ComponentSpec
                title={EXPLODE_SLIDES[componentIndex]!.title}
                slideId={slideId}
                copy={COMPONENT_UI_COPY[slideId]}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </aside>
  );
}

function OverviewContent() {
  return (
    <div className="max-w-md">
      <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#6b6b6b]">
        {OVERVIEW_COPY.eyebrow}
      </p>
      <h1 className="mt-5 whitespace-pre-line font-display text-2xl font-semibold leading-[1.15] tracking-tight text-gradient md:text-[1.75rem] lg:text-3xl">
        {OVERVIEW_COPY.title}
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-[#4a4a4a] md:text-[0.9375rem]">
        {OVERVIEW_COPY.subtitle}
      </p>
      <div className="mt-10 flex items-center gap-3">
        <span className="inline-block h-px w-8 bg-black/15" />
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#6b6b6b]">
          {OVERVIEW_COPY.hint}
        </p>
      </div>
    </div>
  );
}

function ComponentSpec({
  title,
  slideId,
  copy,
}: {
  title: string;
  slideId: ExplodeSlideId;
  copy: (typeof COMPONENT_UI_COPY)[ExplodeSlideId];
}) {
  return (
    <div className="max-w-md">
      <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#6b6b6b]">
        {copy.eyebrow}
      </p>
      <h2 className="mt-4 font-display text-xl font-semibold tracking-tight text-[#1a1a1a] md:text-2xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#5a5a5a]">{copy.tagline}</p>

      <div className="mt-10 space-y-8">
        <section>
          <h3 className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
            Purpose
          </h3>
          <p className="mt-3 text-sm leading-[1.7] text-[#2a2a2a] md:text-[0.9375rem]">
            {copy.purpose}
          </p>
        </section>

        <section>
          <h3 className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
            Specifications
          </h3>
          <ul className="mt-4 space-y-3">
            {copy.bullets.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-[#3d3d3d] md:text-[0.9375rem]"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#5a5a5a]" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
