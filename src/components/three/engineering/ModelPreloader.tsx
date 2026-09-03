"use client";

import { useEffect } from "react";
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

/** Prioritized & staggered GLB preloader to ensure instant startup time without freezing the browser */
export function ModelPreloader() {
  useEffect(() => {
    // 1. Immediately preload the overview model required for the landing view
    useGLTF.preload(MODEL_PATHS.overview);
    useGLTF.preload(MODEL_PATHS.propeller);

    // 2. Queue remaining models sequentially during idle periods
    const remainingModels = [
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
    ];

    let currentIndex = 0;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const loadNext = () => {
      if (currentIndex >= remainingModels.length) return;
      const modelPath = remainingModels[currentIndex];
      currentIndex += 1;
      useGLTF.preload(modelPath);

      // Give browser time between models to keep UI smooth at 60fps
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => {
          timerId = setTimeout(loadNext, 400);
        });
      } else {
        timerId = setTimeout(loadNext, 500);
      }
    };

    // Begin background preloading shortly after first paint
    const initialTimer = setTimeout(loadNext, 800);

    return () => {
      clearTimeout(initialTimer);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return null;
}
