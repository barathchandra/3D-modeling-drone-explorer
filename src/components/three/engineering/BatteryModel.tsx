"use client";

import type { ReactNode } from "react";
import { MODEL_PATHS } from "@/lib/modelPaths";
import { INSPECT_TARGET_SIZE } from "@/lib/componentFocus";
import { LazyGlbPart } from "./LazyGlbPart";

const MODEL_PATH = MODEL_PATHS.battery;
const TARGET_SIZE = INSPECT_TARGET_SIZE;
const BATTERY_SLIDE_INDEX = 3;

type BatteryModelProps = {
  placeholder: ReactNode;
};

export function BatteryModel({ placeholder }: BatteryModelProps) {
  return (
    <LazyGlbPart
      modelPath={MODEL_PATH}
      targetSize={TARGET_SIZE}
      slideIndex={BATTERY_SLIDE_INDEX}
      placeholder={placeholder}
    />
  );
}

export { MODEL_PATH as BATTERY_MODEL_PATH };
