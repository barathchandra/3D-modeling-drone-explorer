"use client";

import { useEffect, useRef, useState } from "react";
import { scrollStore } from "@/lib/scrollStore";

export type ActiveSection = {
  /** Current active section index */
  section: number;
  /** +1 when moving forward (down), -1 when moving backward (up) */
  direction: 1 | -1;
};

/**
 * Tracks the active section and the direction of the last change.
 * Used to drive direction-aware slide transitions.
 */
export function useActiveSection(): ActiveSection {
  const [section, setSection] = useState(scrollStore.sectionIndex);
  const directionRef = useRef<1 | -1>(1);
  const [, force] = useState(0);

  useEffect(() => {
    let prev = scrollStore.sectionIndex;
    return scrollStore.subscribeSection((next) => {
      if (next !== prev) {
        directionRef.current = next > prev ? 1 : -1;
        prev = next;
        force((n) => n + 1);
      }
      setSection(next);
    });
  }, []);

  return { section, direction: directionRef.current };
}
