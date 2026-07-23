"use client";

import { useCallback, useEffect, useRef } from "react";
import { MVP_SECTIONS, SECTION_COUNT, getActiveComponentIndex } from "@/lib/sections";
import { scrollStore } from "@/lib/scrollStore";
import { useLenis } from "@/providers/LenisContext";

function syncSection(index: number) {
  scrollStore.setSectionIndex(index);
}

export function useSnapSections() {
  const lenis = useLenis();
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const activeIndex = useRef(0);
  const locking = useRef(false);

  const scrollToSection = useCallback(
    (index: number) => {
      if (!lenis) return;
      const clamped = Math.max(0, Math.min(SECTION_COUNT - 1, index));
      if (locking.current || clamped === activeIndex.current) return;

      locking.current = true;
      activeIndex.current = clamped;
      syncSection(clamped);
      scrollStore.requestOrbitReset();

      lenis.scrollTo(clamped * window.innerHeight, {
        duration: 1.0,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          locking.current = false;
        },
      });
      window.setTimeout(() => {
        locking.current = false;
      }, 1050);
    },
    [lenis],
  );

  useEffect(() => {
    if (!lenis) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (locking.current) return;
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.6) continue;
          const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (idx >= 0 && idx !== activeIndex.current) {
            activeIndex.current = idx;
            syncSection(idx);
          }
        }
      },
      { threshold: 0.6 },
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    syncSection(0);

    return () => observer.disconnect();
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;

    const step = (delta: number) => {
      if (locking.current) return;
      const next = activeIndex.current + delta;
      if (next < 0 || next >= SECTION_COUNT) return;
      scrollToSection(next);
    };

    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const onViewport = !!target.closest('[data-viewport="3d"]');
      const onSpec = !!target.closest("[data-spec-panel]");

      if (onViewport) {
        return;
      }

      if (onSpec) {
        if (Math.abs(e.deltaY) < 4) return;
        e.preventDefault();
        step(e.deltaY > 0 ? 1 : -1);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        step(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKey);
    };
  }, [lenis, scrollToSection]);

  return { sectionRefs, scrollToSection };
}

export { getActiveComponentIndex, MVP_SECTIONS, SECTION_COUNT };
