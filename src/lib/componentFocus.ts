import type { Vector3Tuple } from "three";
import { SLIDE_COUNT } from "./droneComponents";

/** Showcase anchor — center of the 3D canvas viewport (world origin). */
export const INSPECT_CENTER: Vector3Tuple = [0, 0, 0];

export const ACTIVE_SCALE = 2.06; // +25% size increase (from 1.65)
export const INACTIVE_SCALE = 0.35;
export const OVERVIEW_SCALE = 1.10; // +25% size increase (from 0.88)
export const INSPECT_TARGET_SIZE = 0.22; // Matches FlySky transmitter size across all components

export const FOCUS_DEPTH_ACTIVE = 0.22; // Move active component forward toward camera

export const FOCUS_TWEEN_DURATION = 1.2;
export const FOCUS_TWEEN_EASE = "power3.inOut";

/**
 * Fixed edge slots per component (when inactive).
 * Distributes parts around the viewport — no overlap at center.
 */
export const INACTIVE_CORNER_POSITIONS: Vector3Tuple[] = [
  [-0.58, 0.34, -0.28], // 0 propellers — top-left
  [0.58, 0.34, -0.28], // 1 motors — top-right
  [0.58, -0.24, -0.28], // 2 esc — bottom-right
  [0, -0.38, -0.3], // 3 battery — bottom center
  [-0.44, 0.16, -0.22], // 4 flight controller — left mid
  [0.44, 0.24, -0.22], // 5 pixhawk — right upper
  [-0.64, 0.04, -0.26], // 6 pdb — far left
  [0, 0.42, -0.24], // 7 gps — top center
  [0, -0.1, -0.46], // 8 camera — front low
  [-0.42, -0.36, -0.26], // 9 airframe — bottom-left edge
  [0.5, 0.08, -0.3], // 10 remote controller — right mid
];

export type PartFocusState = {
  position: Vector3Tuple;
  scale: number;
};

export function getInactiveCornerPosition(slideIndex: number): Vector3Tuple {
  if (slideIndex >= 0 && slideIndex < INACTIVE_CORNER_POSITIONS.length) {
    return INACTIVE_CORNER_POSITIONS[slideIndex]!;
  }
  const angle = (slideIndex / SLIDE_COUNT) * Math.PI * 2;
  const r = 0.55;
  return [Math.cos(angle) * r, Math.sin(angle) * 0.25, -0.28];
}

export function getPartFocusState(
  slideIndex: number,
  activeIndex: number,
  isOverview: boolean,
): PartFocusState {
  if (isOverview) {
    return { position: [0, 0, 0], scale: 1 };
  }
  if (activeIndex < 0) {
    return { position: [0, 0, 0], scale: 1 };
  }
  if (slideIndex === activeIndex) {
    return {
      position: [
        INSPECT_CENTER[0],
        INSPECT_CENTER[1],
        INSPECT_CENTER[2] + FOCUS_DEPTH_ACTIVE,
      ],
      scale: ACTIVE_SCALE,
    };
  }
  return {
    position: getInactiveCornerPosition(slideIndex),
    scale: INACTIVE_SCALE,
  };
}
