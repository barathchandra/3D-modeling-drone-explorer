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
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToSection = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(SECTION_COUNT - 1, index));
      if (clamped === activeIndex.current && locking.current) return;

      locking.current = true;
      activeIndex.current = clamped;
      syncSection(clamped);
      scrollStore.requestOrbitReset();

      if (lenis && typeof window !== "undefined" && window.innerWidth >= 768) {
        lenis.scrollTo(clamped * window.innerHeight, {
          duration: 0.8,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          onComplete: () => {
            locking.current = false;
          },
        });
      }

      // Hard cooldown lock: precisely one part per scroll gesture
      if (lockTimer.current) clearTimeout(lockTimer.current);
      lockTimer.current = setTimeout(() => {
        locking.current = false;
      }, 600);
    },
    [lenis],
  );

  // Desktop observer for Lenis scroll sync
  useEffect(() => {
    if (!lenis || typeof window === "undefined" || window.innerWidth < 768) return;

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

  // Strict 1-scroll-to-1-part wheel & touch controls
  useEffect(() => {
    const step = (delta: number) => {
      if (locking.current) return;
      const next = activeIndex.current + delta;
      if (next < 0 || next >= SECTION_COUNT) return;
      scrollToSection(next);
    };

    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;

      // If user is scrolling inside the scrollable specification text, allow inner scroll
      const specScroll = target.closest("[data-spec-scroll]") as HTMLElement | null;
      if (specScroll) {
        const atTop = specScroll.scrollTop <= 1;
        const atBottom = specScroll.scrollTop + specScroll.clientHeight >= specScroll.scrollHeight - 2;
        // If content can scroll vertically, don't trigger section jump
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
          return;
        }
      }

      // Minimal threshold to ignore mouse jitter
      if (Math.abs(e.deltaY) < 12) return;
      e.preventDefault();

      if (locking.current) return;
      step(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        step(-1);
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!e.changedTouches[0]) return;
      const target = e.target as HTMLElement;
      const deltaX = touchStartX - e.changedTouches[0].clientX;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      const duration = Date.now() - touchStartTime;

      // Inside spec sheet: horizontal swipe switches components; vertical scroll is reserved for text
      const inSpecSheet = !!target.closest("[data-spec-panel]");
      if (inSpecSheet) {
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
          step(deltaX > 0 ? 1 : -1);
        }
        return;
      }

      // On 3D viewport or other areas: deliberate quick swipe changes exactly one part
      if (duration < 500) {
        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
          step(deltaX > 0 ? 1 : -1);
        } else if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX) * 1.3) {
          step(deltaY > 0 ? 1 : -1);
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      if (lockTimer.current) clearTimeout(lockTimer.current);
    };
  }, [scrollToSection]);

  return { sectionRefs, scrollToSection };
}

export { getActiveComponentIndex, MVP_SECTIONS, SECTION_COUNT };
