/** Orbit interaction limits — shared by controls and auto-fit camera. */
export const ORBIT_LIMITS = {
  minDistance: 0.35,
  maxDistance: 20,
  minPolarAngle: 0.06,
  maxPolarAngle: Math.PI - 0.06,
  rotateSpeed: 0.9,
  zoomSpeed: 1.4,
  dampingFactor: 0.06,
} as const;
