"use client";

import { useGLTF } from "@react-three/drei";
import { MODEL_PATHS } from "@/lib/modelPaths";

export const ALL_COMPONENT_GLBS = [
  MODEL_PATHS.overview,
  MODEL_PATHS.propeller,
  MODEL_PATHS.motor,
  MODEL_PATHS.esc,
  MODEL_PATHS.battery,
  MODEL_PATHS.fc,
  MODEL_PATHS.pixhawk,
  MODEL_PATHS.pdb,
  MODEL_PATHS.gps,
  MODEL_PATHS.camera,
  MODEL_PATHS.frame,
  MODEL_PATHS.remote,
] as const;

/** Preloads all uploaded GLBs so motions start faster and all components are ready. */
export function ModelPreloader() {
  ALL_COMPONENT_GLBS.forEach((path) => {
    useGLTF.preload(path);
  });
  return null;
}
