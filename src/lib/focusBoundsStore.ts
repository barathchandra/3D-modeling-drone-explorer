"use client";

import * as THREE from "three";

import { FOCUS_DEPTH_ACTIVE, INSPECT_CENTER } from "./componentFocus";

export type FocusBounds = {
  center: THREE.Vector3;
  radius: number;
};

const DEFAULT_BOUNDS: Record<number, { radius: number }> = {
  0: { radius: 0.28 }, // Propeller
  1: { radius: 0.28 }, // Motors
  2: { radius: 0.28 }, // ESC
  3: { radius: 0.28 }, // Battery
  4: { radius: 0.28 }, // FC
  5: { radius: 0.28 }, // Pixhawk
  6: { radius: 0.28 }, // PDB
  7: { radius: 0.28 }, // GPS
  8: { radius: 0.28 }, // Camera
  9: { radius: 0.28 }, // Airframe
  10: { radius: 0.28 }, // Remote
};

const boundsBySlide = new Map<number, FocusBounds>();
let overviewBounds: FocusBounds | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

function boundsEqual(a: FocusBounds | null, b: FocusBounds | null): boolean {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return (
    a.center.distanceTo(b.center) < 0.005 &&
    Math.abs(a.radius - b.radius) < 0.005
  );
}

export const focusBoundsStore = {
  set(slideIndex: number, bounds: FocusBounds | null) {
    const prev = boundsBySlide.get(slideIndex) ?? null;
    if (boundsEqual(prev, bounds)) return;
    if (bounds) {
      boundsBySlide.set(slideIndex, bounds);
    } else {
      boundsBySlide.delete(slideIndex);
    }
    notify();
  },
  get(slideIndex: number): FocusBounds | null {
    const existing = boundsBySlide.get(slideIndex);
    if (existing) return existing;
    const def = DEFAULT_BOUNDS[slideIndex];
    if (def) {
      return {
        center: new THREE.Vector3(
          INSPECT_CENTER[0],
          INSPECT_CENTER[1],
          INSPECT_CENTER[2] + FOCUS_DEPTH_ACTIVE,
        ),
        radius: def.radius,
      };
    }
    return null;
  },
  clearSlide(slideIndex: number) {
    if (!boundsBySlide.has(slideIndex)) return;
    boundsBySlide.delete(slideIndex);
    notify();
  },
  setOverview(bounds: FocusBounds | null) {
    if (boundsEqual(overviewBounds, bounds)) return;
    overviewBounds = bounds;
    notify();
  },
  getOverview(): FocusBounds | null {
    return overviewBounds;
  },
  clearOverview() {
    if (!overviewBounds) return;
    overviewBounds = null;
    notify();
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
