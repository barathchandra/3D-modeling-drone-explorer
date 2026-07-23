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
      <div ref={scrollRootRef} className="relative min-h-screen bg-[#bfbfbf]">
      <div className="pointer-events-none relative z-0">
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
      <div className="pointer-events-none fixed bottom-4 right-4 z-30 md:bottom-8 md:right-8">
        <Rotate360Button />
      </div>
      <RightPanel />
    </div>
    </SnapScrollProvider>
  );
}
