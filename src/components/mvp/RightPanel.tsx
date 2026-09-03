"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EXPLODE_SLIDES, type ExplodeSlideId } from "@/lib/droneComponents";
import { getActiveComponentIndex, SECTION_COUNT } from "@/lib/sections";
import { scrollStore } from "@/lib/scrollStore";
import { COMPONENT_UI_COPY, OVERVIEW_COPY } from "@/lib/uiCopy";
import { useSnapScroll } from "@/providers/SnapScrollContext";

const panelEase = [0.22, 1, 0.36, 1] as const;

export function RightPanel() {
  const { scrollToSection } = useSnapScroll();
  const [section, setSection] = useState(0);

  useEffect(() => scrollStore.subscribeSection(setSection), []);

  const isOverview = section === 0;
  const componentIndex = getActiveComponentIndex(section);
  const slideId =
    componentIndex >= 0 ? (EXPLODE_SLIDES[componentIndex]?.id as ExplodeSlideId) : null;

  const handlePrev = () => {
    if (section > 0) scrollToSection(section - 1);
  };

  const handleNext = () => {
    if (section < SECTION_COUNT - 1) scrollToSection(section + 1);
  };

  return (
    <aside
      data-spec-panel
      className="glass-panel pointer-events-auto fixed bottom-0 right-0 z-10 flex h-[48dvh] w-full flex-col md:bottom-auto md:top-0 md:h-screen md:w-[var(--explorer-panel-w)]"
    >
      {/* Mobile Top Controls: drag handle + thumb navigation buttons */}
      <div className="flex flex-col border-b border-black/[0.06] pt-1.5 pb-2 px-4 md:hidden">
        <div className="flex w-full justify-center pb-1">
          <span className="h-1 w-10 rounded-full bg-black/20" />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={section === 0}
            className="flex items-center gap-1 rounded-full border border-black/10 bg-white/95 px-3 py-1 text-xs font-semibold text-[#2a2a2a] shadow-xs active:scale-95 disabled:opacity-30"
          >
            ‹ Prev
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[11px] font-mono font-bold text-[#2a2a2a]">
              {String(section + 1).padStart(2, "0")} / {String(SECTION_COUNT).padStart(2, "0")}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#6a6a6a]">Swipe left/right</span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={section === SECTION_COUNT - 1}
            className="flex items-center gap-1 rounded-full border border-black/10 bg-[#2a2a2a] px-3.5 py-1 text-xs font-semibold text-white shadow-xs active:scale-95 disabled:opacity-30"
          >
            Next ›
          </button>
        </div>
      </div>

      <div
        data-spec-scroll
        className="custom-scrollbar flex h-full flex-col justify-start overflow-y-auto px-4 py-3 sm:px-6 sm:py-5 md:justify-center md:px-8 md:py-10 lg:px-10 lg:py-12 4k:px-14 4k:py-16"
      >
        <AnimatePresence mode="wait">
          {isOverview ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: panelEase }}
            >
              <OverviewContent />
            </motion.div>
          ) : slideId ? (
            <motion.div
              key={slideId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: panelEase }}
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
    <div className="max-w-md 4k:max-w-xl">
      <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#6b6b6b] sm:text-[10px] 4k:text-xs">
        {OVERVIEW_COPY.eyebrow}
      </p>
      <h1 className="mt-2 font-display text-xl font-semibold leading-[1.18] tracking-tight text-gradient sm:text-2xl md:mt-4 md:text-[1.75rem] lg:text-3xl 4k:text-5xl">
        {OVERVIEW_COPY.title}
      </h1>
      <p className="mt-2.5 text-xs leading-relaxed text-[#4a4a4a] sm:text-sm md:mt-5 md:text-[0.9375rem] 4k:text-lg 4k:leading-loose">
        {OVERVIEW_COPY.subtitle}
      </p>
      <div className="mt-4 flex items-center gap-2.5 sm:mt-6 md:mt-8 4k:mt-12">
        <span className="inline-block h-px w-6 bg-black/15 sm:w-8" />
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#6b6b6b] sm:text-[11px] 4k:text-sm">
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
    <div className="max-w-md 4k:max-w-xl">
      <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#6b6b6b] sm:text-[10px] 4k:text-xs">
        {copy.eyebrow}
      </p>
      <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-[#1a1a1a] sm:text-xl md:mt-3 md:text-2xl 4k:text-4xl">
        {title}
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-[#5a5a5a] sm:text-sm md:mt-2 4k:text-base">{copy.tagline}</p>

      <div className="mt-3 space-y-3 sm:mt-5 sm:space-y-4 md:mt-7 md:space-y-6 4k:mt-10 4k:space-y-8">
        <section>
          <h3 className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#8a8a8a] sm:text-[10px] 4k:text-xs">
            Purpose
          </h3>
          <p className="mt-1.5 text-xs leading-[1.6] text-[#2a2a2a] sm:text-sm md:mt-2.5 md:text-[0.9375rem] 4k:text-lg 4k:leading-relaxed">
            {copy.purpose}
          </p>
        </section>

        <section>
          <h3 className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#8a8a8a] sm:text-[10px] 4k:text-xs">
            Specifications
          </h3>
          <ul className="mt-1.5 space-y-1.5 sm:mt-2.5 sm:space-y-2 md:mt-3 md:space-y-2.5 4k:mt-4 4k:space-y-3.5">
            {copy.bullets.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs text-[#3d3d3d] sm:gap-2.5 sm:text-sm md:text-[0.9375rem] 4k:text-lg"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#5a5a5a] sm:h-1.5 sm:w-1.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
