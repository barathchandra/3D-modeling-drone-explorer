"use client";

import { useRef } from "react";
import { CinematicBackdrop } from "./CinematicBackdrop";
import { DroneCanvas } from "./DroneCanvas";
import { LeftNavPanel } from "./LeftNavPanel";
import { RightPanel } from "./RightPanel";
import { Rotate360Button } from "./Rotate360Button";
import { ViewportChrome } from "./ViewportChrome";
import { useSnapSections, MVP_SECTIONS } from "@/hooks/useSnapSections";
import { SnapScrollProvider } from "@/providers/SnapScrollContext";
import { ComponentPreloaderScreen } from "./ComponentPreloaderScreen";

export function ComponentExplorer() {
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const { sectionRefs, scrollToSection } = useSnapSections();

  return (
    <SnapScrollProvider scrollToSection={scrollToSection}>
      <ComponentPreloaderScreen />
      <div ref={scrollRootRef} className="relative h-[100dvh] md:h-auto md:min-h-screen overflow-hidden md:overflow-visible bg-[#bfbfbf]">
      <div className="pointer-events-none relative z-0 hidden md:block">
        {MVP_SECTIONS.map((section, index) => (
          <section
            key={section.id}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className="snap-section h-screen"
            aria-hidden
          />
        ))}
      </div>

      <CinematicBackdrop />
      <LeftNavPanel />
      <DroneCanvas />
      <ViewportChrome />
      <div className="pointer-events-none fixed top-[calc(var(--explorer-nav-mobile-h)+0.75rem)] right-3 z-30 md:top-auto md:bottom-8 md:right-8 4k:bottom-12 4k:right-12">
        <Rotate360Button />
      </div>
      <RightPanel />
    </div>
    </SnapScrollProvider>
  );
}
