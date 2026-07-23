"use client";

import type { ReactNode } from "react";
import { MODEL_PATHS } from "@/lib/modelPaths";
import { LazyGlbPart } from "./LazyGlbPart";

const MODEL_PATH = MODEL_PATHS.frame;
const TARGET_SIZE = 0.24;
const AIRFRAME_SLIDE_INDEX = 9;

type AirframeModelProps = {
  placeholder: ReactNode;
};

export function AirframeModel({ placeholder }: AirframeModelProps) {
  return (
    <LazyGlbPart
      modelPath={MODEL_PATH}
      targetSize={TARGET_SIZE}
      slideIndex={AIRFRAME_SLIDE_INDEX}
      placeholder={placeholder}
    />
  );
}
