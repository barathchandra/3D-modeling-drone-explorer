"use client";

import type { ReactNode } from "react";
import { MODEL_PATHS } from "@/lib/modelPaths";
import { LazyGlbPart } from "./LazyGlbPart";

const MODEL_PATH = MODEL_PATHS.camera;
const TARGET_SIZE = 0.16;
const CAMERA_SLIDE_INDEX = 8;

type CameraModelProps = {
  placeholder: ReactNode;
};

export function CameraModel({ placeholder }: CameraModelProps) {
  return (
    <LazyGlbPart
      modelPath={MODEL_PATH}
      targetSize={TARGET_SIZE}
      slideIndex={CAMERA_SLIDE_INDEX}
      placeholder={placeholder}
    />
  );
}
