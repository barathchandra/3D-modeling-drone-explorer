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
    <div className="explorer-chrome pointer-events-none fixed left-0 top-0 z-[6] flex h-[58vh] w-full flex-col justify-between p-6 md:h-screen md:p-10">
      <div className="flex items-center gap-3">
        <FlydronicsLogo size="sm" />
        <span className="h-3 w-px bg-black/15" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#4a4a4a]">
          Component Lab
        </span>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <p className="max-w-xs text-[11px] leading-relaxed text-[#6b6b6b]">
          Drag to rotate
          <span className="mx-2 text-black/15">·</span>
          Scroll to zoom
          <span className="mx-2 text-black/15">·</span>
          360° to auto-spin
          <span className="mx-2 text-black/15">·</span>
          Double-click to reset
        </p>
        <div className="flex items-center gap-4 text-right">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#5a5a5a]">{label}</p>
          <p className="font-display text-sm tabular-nums text-[#2a2a2a]">
            {indexStr}
            <span className="text-[#8a8a8a]"> / {totalStr}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
