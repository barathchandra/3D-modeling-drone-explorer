"use client";

import type { ReactNode } from "react";
import { MODEL_PATHS } from "@/lib/modelPaths";
import { INSPECT_TARGET_SIZE } from "@/lib/componentFocus";
import { LazyGlbPart } from "./LazyGlbPart";

const MODEL_PATH = MODEL_PATHS.propeller;
const TARGET_SIZE = INSPECT_TARGET_SIZE;
const PROPELLER_SLIDE_INDEX = 0;

type PropellerModelProps = {
  placeholder: ReactNode;
};

/** GLB propeller when inspecting; procedural quad layout in assembly view. */
export function PropellerModel({ placeholder }: PropellerModelProps) {
  return (
    <LazyGlbPart
      modelPath={MODEL_PATH}
      targetSize={TARGET_SIZE}
      slideIndex={PROPELLER_SLIDE_INDEX}
      placeholder={placeholder}
    />
  );
}
