"use client";

import type { ReactNode } from "react";
import { MODEL_PATHS } from "@/lib/modelPaths";
import { LazyGlbPart } from "./LazyGlbPart";

const MODEL_PATH = MODEL_PATHS.motor;
const TARGET_SIZE = 0.16;
const MOTOR_SLIDE_INDEX = 1;

type MotorUnitsProps = {
  placeholder: ReactNode;
};

/** Single GLB when inspecting motors; procedural quad layout otherwise. */
export function MotorUnits({ placeholder }: MotorUnitsProps) {
  return (
    <LazyGlbPart
      modelPath={MODEL_PATH}
      targetSize={TARGET_SIZE}
      slideIndex={MOTOR_SLIDE_INDEX}
      placeholder={placeholder}
    />
  );
}

export { MODEL_PATH as MOTOR_MODEL_PATH };
