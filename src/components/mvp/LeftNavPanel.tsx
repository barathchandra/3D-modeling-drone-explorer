"use client";

import { useEffect, useState } from "react";
import { EXPLORER_NAV_ITEMS } from "@/lib/explorerNav";
import { SECTION_COUNT } from "@/lib/sections";
import { scrollStore } from "@/lib/scrollStore";
import { useSnapScroll } from "@/providers/SnapScrollContext";
import { FlydronicsLogo } from "@/components/FlydronicsLogo";

export function LeftNavPanel() {
  const { scrollToSection } = useSnapScroll();
  const [section, setSection] = useState(0);

  useEffect(() => scrollStore.subscribeSection(setSection), []);

  const progress = SECTION_COUNT > 1 ? (section / (SECTION_COUNT - 1)) * 100 : 0;

  return (
    <nav
      className="explorer-nav pointer-events-auto fixed left-0 top-0 z-20 flex w-full flex-col border-b border-black/[0.06] bg-[rgba(255,255,255,0.92)] backdrop-blur-xl md:h-screen md:w-[var(--explorer-nav-w)] md:flex-col md:border-b-0 md:border-r"
      aria-label="Component navigation"
    >
      <div className="sticky top-0 z-10 border-b border-black/[0.06] bg-[rgba(255,255,255,0.96)] px-4 py-4 md:px-5 md:py-5">
        <FlydronicsLogo size="sm" />
        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[#6b6b6b]">
          Components
        </p>
        <label className="mt-3 block">
          <span className="sr-only">Jump to component</span>
          <select
            value={section}
            onChange={(e) => scrollToSection(Number(e.target.value))}
            className="mt-1 w-full cursor-pointer appearance-none rounded-lg border border-black/[0.08] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] shadow-sm outline-none transition focus:border-[#5a7a94] focus:ring-2 focus:ring-[#5a7a94]/20"
          >
            {EXPLORER_NAV_ITEMS.map((item) => (
              <option key={item.sectionIndex} value={item.sectionIndex}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul className="hidden min-h-0 flex-1 list-none overflow-y-auto px-2 py-3 md:block md:px-3 md:py-4">
        {EXPLORER_NAV_ITEMS.map((item) => {
          const active = section === item.sectionIndex;
          return (
            <li key={item.sectionIndex}>
              <button
                type="button"
                onClick={() => scrollToSection(item.sectionIndex)}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-[13px] transition md:px-3.5 md:py-2.5 ${
                  active
                    ? "bg-[#2a2a2a] font-medium text-white shadow-sm"
                    : "text-[#4a4a4a] hover:bg-black/[0.04]"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-black/[0.06] px-4 py-4 md:px-5 md:py-5">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#6b6b6b]">
          <span>Progress</span>
          <span className="tabular-nums text-[#2a2a2a]">
            {String(section + 1).padStart(2, "0")} / {String(SECTION_COUNT).padStart(2, "0")}
          </span>
        </div>
        <div
          className="mt-2 h-1 overflow-hidden rounded-full bg-black/[0.06]"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-[#3d5a6e] transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </nav>
  );
}
