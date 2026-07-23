import type { Vector3Tuple } from "three";

export type DronePartId =
  | "prop-fl"
  | "prop-fr"
  | "prop-rl"
  | "prop-rr"
  | "motor-fl"
  | "motor-fr"
  | "motor-rl"
  | "motor-rr"
  | "arm-fl"
  | "arm-fr"
  | "arm-rl"
  | "arm-rr"
  | "shell-upper"
  | "shell-lower"
  | "camera"
  | "battery"
  | "flight-controller"
  | "pdb"
  | "gps"
  | "telemetry"
  | "esc-1"
  | "esc-2"
  | "esc-3"
  | "esc-4"
  | "sensors"
  | "wiring"
  | "frame";

export type DronePart = {
  id: DronePartId;
  label: string;
  category: "propulsion" | "structure" | "power" | "navigation" | "core";
  basePosition: Vector3Tuple;
  explodeDirection: Vector3Tuple;
  explodeDistance: number;
  stage: number;
  color?: string;
  scale?: Vector3Tuple;
};

/** Explosion offsets tuned for quadcopter layout — scroll stages 1–5 map to stage field */
export const DRONE_PARTS: DronePart[] = [
  { id: "prop-fl", label: "Front Left Propeller", category: "propulsion", basePosition: [-0.55, 0.08, -0.55], explodeDirection: [-1, 0.3, -1], explodeDistance: 1.2, stage: 2, scale: [0.15, 0.02, 0.15] },
  { id: "prop-fr", label: "Front Right Propeller", category: "propulsion", basePosition: [0.55, 0.08, -0.55], explodeDirection: [1, 0.3, -1], explodeDistance: 1.2, stage: 2, scale: [0.15, 0.02, 0.15] },
  { id: "prop-rl", label: "Rear Left Propeller", category: "propulsion", basePosition: [-0.55, 0.08, 0.55], explodeDirection: [-1, 0.3, 1], explodeDistance: 1.2, stage: 2, scale: [0.15, 0.02, 0.15] },
  { id: "prop-rr", label: "Rear Right Propeller", category: "propulsion", basePosition: [0.55, 0.08, 0.55], explodeDirection: [1, 0.3, 1], explodeDistance: 1.2, stage: 2, scale: [0.15, 0.02, 0.15] },
  { id: "motor-fl", label: "Front Left Motor", category: "propulsion", basePosition: [-0.5, 0, -0.5], explodeDirection: [-1, 0.2, -1], explodeDistance: 0.9, stage: 2, scale: [0.12, 0.14, 0.12] },
  { id: "motor-fr", label: "Front Right Motor", category: "propulsion", basePosition: [0.5, 0, -0.5], explodeDirection: [1, 0.2, -1], explodeDistance: 0.9, stage: 2, scale: [0.12, 0.14, 0.12] },
  { id: "motor-rl", label: "Rear Left Motor", category: "propulsion", basePosition: [-0.5, 0, 0.5], explodeDirection: [-1, 0.2, 1], explodeDistance: 0.9, stage: 2, scale: [0.12, 0.14, 0.12] },
  { id: "motor-rr", label: "Rear Right Motor", category: "propulsion", basePosition: [0.5, 0, 0.5], explodeDirection: [1, 0.2, 1], explodeDistance: 0.9, stage: 2, scale: [0.12, 0.14, 0.12] },
  { id: "arm-fl", label: "Front Left Arm", category: "structure", basePosition: [-0.35, -0.02, -0.35], explodeDirection: [-1, 0, -1], explodeDistance: 0.75, stage: 3, scale: [0.08, 0.04, 0.35] },
  { id: "arm-fr", label: "Front Right Arm", category: "structure", basePosition: [0.35, -0.02, -0.35], explodeDirection: [1, 0, -1], explodeDistance: 0.75, stage: 3, scale: [0.08, 0.04, 0.35] },
  { id: "arm-rl", label: "Rear Left Arm", category: "structure", basePosition: [-0.35, -0.02, 0.35], explodeDirection: [-1, 0, 1], explodeDistance: 0.75, stage: 3, scale: [0.08, 0.04, 0.35] },
  { id: "arm-rr", label: "Rear Right Arm", category: "structure", basePosition: [0.35, -0.02, 0.35], explodeDirection: [1, 0, 1], explodeDistance: 0.75, stage: 3, scale: [0.08, 0.04, 0.35] },
  { id: "shell-upper", label: "Upper Body Shell", category: "structure", basePosition: [0, 0.12, 0], explodeDirection: [0, 1, 0], explodeDistance: 0.5, stage: 3, scale: [0.45, 0.08, 0.45] },
  { id: "shell-lower", label: "Lower Body Shell", category: "structure", basePosition: [0, -0.08, 0], explodeDirection: [0, -1, 0], explodeDistance: 0.45, stage: 3, scale: [0.42, 0.06, 0.42] },
  { id: "camera", label: "Camera Module", category: "structure", basePosition: [0, -0.05, -0.28], explodeDirection: [0, -0.3, -1], explodeDistance: 0.55, stage: 3, scale: [0.1, 0.08, 0.08] },
  { id: "battery", label: "Battery Pack", category: "power", basePosition: [0, -0.02, 0.05], explodeDirection: [0, -1, 0.2], explodeDistance: 0.65, stage: 4, scale: [0.28, 0.06, 0.18], color: "#1a3a1a" },
  { id: "flight-controller", label: "Flight Controller", category: "power", basePosition: [0, 0.04, 0], explodeDirection: [0, 1, 0], explodeDistance: 0.7, stage: 4, scale: [0.18, 0.03, 0.18], color: "#0a2540" },
  { id: "pdb", label: "Power Distribution Board", category: "power", basePosition: [0, 0, 0], explodeDirection: [0, 0, 0], explodeDistance: 0.35, stage: 4, scale: [0.22, 0.02, 0.22], color: "#1a1a2e" },
  { id: "gps", label: "GPS Module", category: "navigation", basePosition: [0, 0.18, 0.1], explodeDirection: [0, 1.2, 0.3], explodeDistance: 1.1, stage: 5, scale: [0.1, 0.04, 0.1], color: "#002244" },
  { id: "telemetry", label: "Telemetry Module", category: "navigation", basePosition: [0.12, 0.14, 0], explodeDirection: [1, 1, 0], explodeDistance: 0.85, stage: 5, scale: [0.08, 0.05, 0.12], color: "#001833" },
  { id: "esc-1", label: "ESC Module 1", category: "power", basePosition: [-0.2, 0.02, -0.2], explodeDirection: [-1, 0.5, -1], explodeDistance: 0.55, stage: 4, scale: [0.06, 0.04, 0.1] },
  { id: "esc-2", label: "ESC Module 2", category: "power", basePosition: [0.2, 0.02, -0.2], explodeDirection: [1, 0.5, -1], explodeDistance: 0.55, stage: 4, scale: [0.06, 0.04, 0.1] },
  { id: "esc-3", label: "ESC Module 3", category: "power", basePosition: [-0.2, 0.02, 0.2], explodeDirection: [-1, 0.5, 1], explodeDistance: 0.55, stage: 4, scale: [0.06, 0.04, 0.1] },
  { id: "esc-4", label: "ESC Module 4", category: "power", basePosition: [0.2, 0.02, 0.2], explodeDirection: [1, 0.5, 1], explodeDistance: 0.55, stage: 4, scale: [0.06, 0.04, 0.1] },
  { id: "sensors", label: "Sensor Array", category: "navigation", basePosition: [0, 0.1, -0.15], explodeDirection: [0, 0.5, -0.8], explodeDistance: 0.5, stage: 5, scale: [0.14, 0.03, 0.06] },
  { id: "wiring", label: "Internal Wiring", category: "core", basePosition: [0, 0.02, 0], explodeDirection: [0.3, 0.3, 0.3], explodeDistance: 0.25, stage: 4, scale: [0.2, 0.15, 0.2], color: "#222" },
  { id: "frame", label: "Main Structural Frame", category: "core", basePosition: [0, -0.04, 0], explodeDirection: [0, -0.5, 0], explodeDistance: 0.4, stage: 3, scale: [0.35, 0.05, 0.35], color: "#111" },
];

export const SCROLL_STAGES = [
  {
    id: 1,
    range: [0, 0.2] as const,
    headline: "Built To Fly.\nEngineered To Lead.",
    bullets: [] as string[],
  },
  {
    id: 2,
    range: [0.2, 0.4] as const,
    headline: "Propulsion Reveal",
    bullets: ["Carbon Fiber Propellers", "Brushless Motors"],
  },
  {
    id: 3,
    range: [0.4, 0.6] as const,
    headline: "Structural Reveal",
    bullets: ["Precision Engineering", "Impact Protection", "Aerodynamic Optimization"],
  },
  {
    id: 4,
    range: [0.6, 0.8] as const,
    headline: "Power and Control",
    bullets: [
      "Power Distribution Board",
      "Voltage Regulation",
      "Current Monitoring",
      "Flight Controller",
      "Navigation",
      "Autonomous Flight",
      "Failsafe Systems",
    ],
  },
  {
    id: 5,
    range: [0.8, 1] as const,
    headline: "Telemetry & Navigation",
    bullets: [
      "Real-Time Monitoring",
      "GPS Positioning",
      "Ground Station Connectivity",
      "Mission Safety",
      "BVLOS Operations",
    ],
  },
];

export function getExplodeFactor(globalProgress: number, partStage: number): number {
  const stageStarts = [0, 0.15, 0.35, 0.55, 0.75];
  const start = stageStarts[partStage - 1] ?? 0;
  const end = Math.min(start + 0.22, 1);
  if (globalProgress <= start) return 0;
  if (globalProgress >= end) return 1;
  const t = (globalProgress - start) / (end - start);
  return t * t * (3 - 2 * t);
}

/** Smoothstep easing between two edges. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * The full cinematic explode arc across the entire scroll experience.
 * Hero assembled -> engineering explodes -> held through intelligent/telemetry
 * -> gradual reassembly across products/industries/ecosystem -> final reveal assembled.
 */
export function getExplodeArc(progress: number): number {
  if (progress < 0.1) return 0;
  if (progress < 0.286) return smoothstep(0.1, 0.286, progress);
  if (progress < 0.45) return 1;
  if (progress < 0.86) return 1 - smoothstep(0.45, 0.86, progress);
  return 0;
}

/** Power-on intensity for the final reveal (blue ignition + glow). */
export function getPower(progress: number): number {
  return smoothstep(0.88, 1, progress);
}

export const PART_INFO: Record<string, { title: string; specs: string[] }> = {
  "motor-fl": { title: "Brushless Motor", specs: ["KV 2300", "Max thrust 2.1kg", "Hollow-shaft design"] },
  pdb: { title: "Power Distribution Board", specs: ["12S input", "Active current sensing", "Regulated 5V/12V"] },
  "flight-controller": { title: "Flight Controller", specs: ["Dual IMU fusion", "RTK-ready", "Autonomous mission stack"] },
  gps: { title: "GPS Module", specs: ["Multi-band GNSS", "Sub-meter accuracy", "Anti-jam filtering"] },
  battery: { title: "Intelligent Battery", specs: ["6000mAh LiPo", "Smart BMS", "Hot-swap capable"] },
  "esc-1": { title: "Electronic Speed Controller", specs: ["45A continuous", "BLHeli_32", "Telemetry feedback"] },
  sensors: { title: "Sensor Array", specs: ["LiDAR + stereo vision", "360° obstacle mesh", "10ms fusion loop"] },
};
