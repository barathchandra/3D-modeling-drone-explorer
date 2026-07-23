"use client";

import type { ReactNode } from "react";
import { MODEL_PATHS } from "@/lib/modelPaths";
import { LazyGlbPart } from "./LazyGlbPart";

const MODEL_PATH = MODEL_PATHS.gps;
const TARGET_SIZE = 0.14;
const GPS_SLIDE_INDEX = 7;

type GpsModelProps = {
  placeholder: ReactNode;
};

export function GpsModel({ placeholder }: GpsModelProps) {
  return (
    <LazyGlbPart
      modelPath={MODEL_PATH}
      targetSize={TARGET_SIZE}
      slideIndex={GPS_SLIDE_INDEX}
      placeholder={placeholder}
    />
  );
}
