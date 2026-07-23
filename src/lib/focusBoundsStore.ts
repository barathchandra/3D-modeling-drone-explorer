"use client";

import * as THREE from "three";

export type FocusBounds = {
  center: THREE.Vector3;
  radius: number;
};

const boundsBySlide = new Map<number, FocusBounds>();
let overviewBounds: FocusBounds | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

export const focusBoundsStore = {
  set(slideIndex: number, bounds: FocusBounds | null) {
    if (bounds) {
      boundsBySlide.set(slideIndex, bounds);
    } else {
      boundsBySlide.delete(slideIndex);
    }
    notify();
  },
  get(slideIndex: number): FocusBounds | null {
    return boundsBySlide.get(slideIndex) ?? null;
  },
  clearSlide(slideIndex: number) {
    boundsBySlide.delete(slideIndex);
    notify();
  },
  setOverview(bounds: FocusBounds | null) {
    overviewBounds = bounds;
    notify();
  },
  getOverview(): FocusBounds | null {
    return overviewBounds;
  },
  clearOverview() {
    overviewBounds = null;
    notify();
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
