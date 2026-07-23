/** Four motor corners on the quad — x/z signs only. */
export const QUAD_CORNERS = [
  { x: -1, z: -1 },
  { x: 1, z: -1 },
  { x: -1, z: 1 },
  { x: 1, z: 1 },
] as const;

export const PROPELLER_PLACEMENTS = QUAD_CORNERS.map((q) => ({
  position: [q.x * 0.52, 0.14, q.z * 0.52] as [number, number, number],
}));

export const ESC_PLACEMENTS = QUAD_CORNERS.map((q) => ({
  position: [q.x * 0.22, 0.04, q.z * 0.22] as [number, number, number],
}));
