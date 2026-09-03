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
      className="explorer-nav pointer-events-auto fixed left-0 top-0 z-20 flex w-full border-b border-black/[0.06] bg-[rgba(255,255,255,0.92)] backdrop-blur-xl md:h-screen md:w-[var(--explorer-nav-w)] md:flex-col md:border-b-0 md:border-r"
      aria-label="Component navigation"
    >
      {/* Mobile Top Header (compact 60px height) */}
      <div className="flex h-[var(--explorer-nav-mobile-h)] w-full items-center justify-between px-3.5 md:hidden">
        <div className="flex items-center gap-2">
          <FlydronicsLogo size="sm" />
          <span className="rounded-full bg-[#3d5a6e]/10 px-2 py-0.5 text-[9px] font-semibold text-[#3d5a6e]">
            Lab 3D
          </span>
        </div>

        {/* Mobile component selector dropdown */}
        <label className="relative flex items-center">
          <span className="sr-only">Jump to component</span>
          <select
            value={section}
            onChange={(e) => scrollToSection(Number(e.target.value))}
            className="h-8 max-w-[170px] truncate rounded-lg border border-black/10 bg-white/95 px-2.5 text-xs font-semibold text-[#1a1a1a] shadow-xs outline-none focus:ring-1 focus:ring-[#3d5a6e]"
          >
            {EXPLORER_NAV_ITEMS.map((item) => (
              <option key={item.sectionIndex} value={item.sectionIndex}>
                {String(item.sectionIndex + 1).padStart(2, "0")}. {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Desktop & Tablet Sidebar Header */}
      <div className="sticky top-0 z-10 hidden border-b border-black/[0.06] bg-[rgba(255,255,255,0.96)] px-4 py-4 md:block md:px-5 md:py-5 4k:px-7 4k:py-7">
        <FlydronicsLogo size="sm" className="4k:scale-110 4k:origin-left" />
        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[#6b6b6b] 4k:text-xs">
          Components
        </p>
      </div>

      {/* Desktop & Tablet Component List */}
      <ul className="custom-scrollbar hidden min-h-0 flex-1 list-none overflow-y-auto px-2 py-3 md:block md:px-3 md:py-4 4k:px-5 4k:py-6">
        {EXPLORER_NAV_ITEMS.map((item) => {
          const active = section === item.sectionIndex;
          return (
            <li key={item.sectionIndex}>
              <button
                type="button"
                onClick={() => scrollToSection(item.sectionIndex)}
                className={`w-full rounded-lg px-3 py-2 text-left text-[13px] transition md:px-3.5 md:py-2.5 4k:px-5 4k:py-3.5 4k:text-base ${
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

      {/* Desktop & Tablet Progress Footer */}
      <div className="hidden border-t border-black/[0.06] px-4 py-4 md:block md:px-5 md:py-5 4k:px-7 4k:py-6">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#6b6b6b] 4k:text-xs">
          <span>Progress</span>
          <span className="tabular-nums text-[#2a2a2a]">
            {String(section + 1).padStart(2, "0")} / {String(SECTION_COUNT).padStart(2, "0")}
          </span>
        </div>
        <div
          className="mt-2 h-1 overflow-hidden rounded-full bg-black/[0.06] 4k:h-1.5"
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
