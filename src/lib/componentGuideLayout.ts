import type { ExplodeSlideId } from "@/lib/droneComponents";

export type GuideComponentSlot = {
  id: ExplodeSlideId;
  label: string;
  color: string;
  /** Representative box center for callout anchor */
  anchor: [number, number, number];
  size: [number, number, number];
  /** Label position — leader line runs label → anchor */
  labelPosition: [number, number, number];
  /** Optional quad corner offsets from anchor (props, motors, esc) */
  quadOffsets?: [number, number, number][];
};

const QUAD_ARM_OFFSET = 0.44;

export const GUIDE_COMPONENT_SLOTS: GuideComponentSlot[] = [
  {
    id: "propellers",
    label: "Propellers",
    color: "#1e2224",
    anchor: [0, 0.074, 0],
    size: [0.28, 0.012, 0.28],
    labelPosition: [0, 0.38, 0.12],
    quadOffsets: [
      [-QUAD_ARM_OFFSET, 0, -QUAD_ARM_OFFSET],
      [QUAD_ARM_OFFSET, 0, -QUAD_ARM_OFFSET],
      [-QUAD_ARM_OFFSET, 0, QUAD_ARM_OFFSET],
      [QUAD_ARM_OFFSET, 0, QUAD_ARM_OFFSET],
    ],
  },
  {
    id: "motors",
    label: "Motors",
    color: "#8a8e9a",
    anchor: [0, 0.032, 0],
    size: [0.08, 0.056, 0.08],
    labelPosition: [0.52, 0.22, 0.08],
    quadOffsets: [
      [-QUAD_ARM_OFFSET, 0, -QUAD_ARM_OFFSET],
      [QUAD_ARM_OFFSET, 0, -QUAD_ARM_OFFSET],
      [-QUAD_ARM_OFFSET, 0, QUAD_ARM_OFFSET],
      [QUAD_ARM_OFFSET, 0, QUAD_ARM_OFFSET],
    ],
  },
  {
    id: "esc",
    label: "ESC",
    color: "#1a4012",
    anchor: [0, 0.04, 0],
    size: [0.1, 0.016, 0.13],
    labelPosition: [-0.5, 0.2, 0.1],
    quadOffsets: [
      [-0.22, 0, -0.22],
      [0.22, 0, -0.22],
      [-0.22, 0, 0.22],
      [0.22, 0, 0.22],
    ],
  },
  {
    id: "battery",
    label: "Battery",
    color: "#1e3a26",
    anchor: [0, -0.062, 0],
    size: [0.25, 0.046, 0.13],
    labelPosition: [0, -0.28, 0.14],
  },
  {
    id: "flight-controller",
    label: "Flight Controller",
    color: "#1a4012",
    anchor: [0, 0.065, 0],
    size: [0.18, 0.013, 0.18],
    labelPosition: [-0.42, 0.28, 0.05],
  },
  {
    id: "pixhawk",
    label: "Pixhawk",
    color: "#e87830",
    anchor: [0, 0.11, 0],
    size: [0.12, 0.014, 0.14],
    labelPosition: [0.38, 0.3, 0.02],
  },
  {
    id: "pdb",
    label: "Power Distribution Board",
    color: "#204016",
    anchor: [0, 0.012, 0],
    size: [0.16, 0.009, 0.16],
    labelPosition: [0, -0.12, 0.22],
  },
  {
    id: "gps",
    label: "GPS Module",
    color: "#1e2c38",
    anchor: [0, 0.155, 0],
    size: [0.08, 0.04, 0.08],
    labelPosition: [0, 0.42, -0.08],
  },
  {
    id: "camera",
    label: "Camera / Gimbal",
    color: "#1a1f24",
    anchor: [0, -0.06, -0.22],
    size: [0.09, 0.07, 0.07],
    labelPosition: [0, 0.02, -0.48],
  },
  {
    id: "airframe",
    label: "Airframe",
    color: "#242628",
    anchor: [0, -0.003, 0],
    size: [0.22, 0.009, 0.22],
    labelPosition: [-0.38, 0.08, -0.2],
  },
  {
    id: "remote-controller",
    label: "Remote Controller",
    color: "#2e3438",
    anchor: [0, 0.02, 0],
    size: [0.3, 0.055, 0.17],
    labelPosition: [0, 0.28, 0.22],
  },
];

export function getGuideSlot(componentId: string): GuideComponentSlot | undefined {
  return GUIDE_COMPONENT_SLOTS.find((s) => s.id === componentId);
}
