import type { Vector3Tuple } from "three";

export type ExplodeSlideId =
  | "propellers"
  | "motors"
  | "esc"
  | "battery"
  | "flight-controller"
  | "pixhawk"
  | "pdb"
  | "gps"
  | "camera"
  | "airframe"
  | "remote-controller";

export type ExplodeSlideMeta = {
  id: ExplodeSlideId;
  index: number;
  title: string;
  purpose: string;
  bullets: string[];
  explodeDirection: Vector3Tuple;
  explodeDistance: number;
};

export const EXPLODE_SLIDES: ExplodeSlideMeta[] = [
  {
    id: "propellers",
    index: 0,
    title: "PROPELLERS",
    purpose: "Generate lift and thrust.",
    bullets: ["Carbon Fiber", "Lightweight", "High Efficiency", "Weather Resistant"],
    explodeDirection: [0, 0.45, 0],
    explodeDistance: 0.32,
  },
  {
    id: "motors",
    index: 1,
    title: "MOTORS",
    purpose: "High-efficiency brushless DC motors provide smooth, reliable thrust.",
    bullets: ["Brushless DC", "360KV", "High Torque", "Quad-motor"],
    explodeDirection: [0, 0.2, 0],
    explodeDistance: 0.28,
  },
  {
    id: "esc",
    index: 2,
    title: "ESC",
    purpose: "Precision control for efficient propulsion.",
    bullets: ["40A Continuous", "Three-phase control", "MOSFET design", "Fast response"],
    explodeDirection: [0.35, 0.25, 0.25],
    explodeDistance: 0.22,
  },
  {
    id: "battery",
    index: 3,
    title: "BATTERY",
    purpose: "High-capacity energy for extended flight.",
    bullets: ["LiPo 6S", "10,000 mAh", "50C Discharge", "22.2V Nominal"],
    explodeDirection: [0, -0.5, 0],
    explodeDistance: 0.26,
  },
  {
    id: "flight-controller",
    index: 4,
    title: "FLIGHT CONTROLLER",
    purpose: "The intelligent core of the aircraft.",
    bullets: ["32-bit ARM MCU", "Integrated IMU", "PWM/DShot support", "USB Configurable"],
    explodeDirection: [0, 0.4, 0],
    explodeDistance: 0.22,
  },
  {
    id: "pixhawk",
    index: 5,
    title: "CUBE ORANGE+ AUTOPILOT",
    purpose: "Mission-critical intelligence for autonomous flight.",
    bullets: ["Triple IMU", "STM32H7 MCU", "Dual Barometers", "RTK & LiDAR Ready"],
    explodeDirection: [0, 0.35, 0.05],
    explodeDistance: 0.22,
  },
  {
    id: "pdb",
    index: 6,
    title: "POWER DISTRIBUTION BOARD (PDB)",
    purpose: "Reliable power delivery for every onboard system.",
    bullets: ["High-current traces", "6S LiPo Compatible", "Filtered Rails", "XT60 Connector"],
    explodeDirection: [0, -0.15, 0],
    explodeDistance: 0.2,
  },
  {
    id: "gps",
    index: 7,
    title: "GPS MODULE",
    purpose: "Precision positioning for autonomous flight.",
    bullets: ["Multi-constellation", "High Precision", "Integrated Compass", "UART Interface"],
    explodeDirection: [0, 0.5, 0.08],
    explodeDistance: 0.24,
  },
  {
    id: "camera",
    index: 8,
    title: "FPV CAMERA",
    purpose: "Real-time vision for confident flight.",
    bullets: ["Low-latency video", "Wide FOV", "Low-light optimized", "HD Sensor"],
    explodeDirection: [0, -0.08, -0.45],
    explodeDistance: 0.24,
  },
  {
    id: "airframe",
    index: 9,
    title: "DRONE FRAME",
    purpose: "Engineered for strength, stability, and mission versatility.",
    bullets: ["Foldable Quadcopter", "High-strength Carbon", "Integrated Landing Gear", "Modular Design"],
    explodeDirection: [0, 0.12, 0],
    explodeDistance: 0.18,
  },
  {
    id: "remote-controller",
    index: 10,
    title: "FLYSKY FS-i6 TRANSMITTER",
    purpose: "Reliable control with precision at your fingertips.",
    bullets: ["FlySky FS-i6", "2.4 GHz AFHDS 2A", "6 Channels", "Backlit LCD"],
    explodeDirection: [0, 0.1, 0.2],
    explodeDistance: 0.22,
  },
];

export const SLIDE_COUNT = EXPLODE_SLIDES.length;

export {
  getPartFocusState as getPartState,
  type PartFocusState as PartState,
} from "./componentFocus";
