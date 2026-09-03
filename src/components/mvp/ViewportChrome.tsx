"use client";

import { useEffect, useState } from "react";
import { EXPLODE_SLIDES } from "@/lib/droneComponents";
import { getActiveComponentIndex, SECTION_COUNT } from "@/lib/sections";
import { scrollStore } from "@/lib/scrollStore";

import { FlydronicsLogo } from "@/components/FlydronicsLogo";

export function ViewportChrome() {
  const [section, setSection] = useState(0);

  useEffect(() => scrollStore.subscribeSection(setSection), []);

  const componentIndex = getActiveComponentIndex(section);
  const label =
    section === 0
      ? "Overview"
      : componentIndex >= 0
        ? EXPLODE_SLIDES[componentIndex]?.title ?? ""
        : "";

  const indexStr = String(section + 1).padStart(2, "0");
  const totalStr = String(SECTION_COUNT).padStart(2, "0");

  return (
    <div className="explorer-chrome pointer-events-none fixed z-[6] flex flex-col justify-between p-3 sm:p-5 md:p-8 4k:p-12">
      {/* Top watermark - shown on desktop/tablet since mobile nav already shows logo */}
      <div className="hidden items-center gap-3 md:flex">
        <FlydronicsLogo size="sm" className="4k:scale-110 4k:origin-left" />
        <span className="h-3 w-px bg-black/15" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#4a4a4a] 4k:text-xs">
          Component Lab
        </span>
      </div>

      {/* Empty placeholder on mobile top to preserve justify-between layout */}
      <div className="h-2 md:hidden" aria-hidden />

      {/* Viewport bottom controls hint & active badge */}
      <div className="flex items-end justify-between gap-2">
        <p className="hidden max-w-xs text-[11px] leading-relaxed text-[#6b6b6b] sm:block 4k:max-w-md 4k:text-sm">
          Drag to rotate
          <span className="mx-1.5 text-black/15 sm:mx-2">·</span>
          Scroll to zoom
          <span className="mx-1.5 text-black/15 sm:mx-2">·</span>
          360° to spin
          <span className="mx-1.5 text-black/15 sm:mx-2">·</span>
          Double-click reset
        </p>
        <p className="block text-[10px] text-[#6b6b6b] sm:hidden">
          Touch to rotate & zoom
        </p>

        <div className="flex items-center gap-2 text-right sm:gap-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#5a5a5a] sm:text-[11px] sm:tracking-[0.18em] 4k:text-sm">{label}</p>
          <p className="font-display text-xs tabular-nums text-[#2a2a2a] sm:text-sm 4k:text-base">
            {indexStr}
            <span className="text-[#8a8a8a]"> / {totalStr}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
