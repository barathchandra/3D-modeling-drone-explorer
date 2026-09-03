"use client";

import type { ReactNode } from "react";
import { MODEL_PATHS } from "@/lib/modelPaths";
import { INSPECT_TARGET_SIZE } from "@/lib/componentFocus";
import { LazyGlbPart } from "./LazyGlbPart";

const MODEL_PATH = MODEL_PATHS.esc;
const TARGET_SIZE = INSPECT_TARGET_SIZE;
const ESC_SLIDE_INDEX = 2;

type EscUnitsProps = {
  placeholder: ReactNode;
};

export function EscUnits({ placeholder }: EscUnitsProps) {
  return (
    <LazyGlbPart
      modelPath={MODEL_PATH}
      targetSize={TARGET_SIZE}
      slideIndex={ESC_SLIDE_INDEX}
      // Render only a single ESC at the center of the frame
      placements={[{ position: [0, 0, 0] }]}
      placeholder={placeholder}
    />
  );
}

export { MODEL_PATH as ESC_MODEL_PATH };
