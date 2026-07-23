"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, memo, useCallback, useMemo, useState, useEffect } from "react";
import { EngineeringDrone } from "../three/engineering/EngineeringDrone";
import { ModelPreloader } from "../three/engineering/ModelPreloader";
import { SceneEnvironment } from "../three/SceneEnvironment";
import { OrbitControlsSetup } from "./OrbitControlsSetup";
import { RendererSetup } from "./RendererSetup";
import { scrollStore } from "@/lib/scrollStore";
import { ComponentFocusCamera } from "../three/engineering/ComponentFocusCamera";
import { PRESENTATION_CAMERA } from "@/lib/scenePresentation";
const SceneContent = memo(function SceneContent() {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={PRESENTATION_CAMERA.position}
        fov={PRESENTATION_CAMERA.fov}
        near={PRESENTATION_CAMERA.near}
        far={PRESENTATION_CAMERA.far}
      />
      <RendererSetup />
      <SceneEnvironment />
      <ModelPreloader />
      <Suspense fallback={null}>
        <EngineeringDrone />
      </Suspense>
      <OrbitControlsSetup />
      <ComponentFocusCamera />
    </>
  );
});

export function DroneCanvas() {
  const stopScroll = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
  }, []);

  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const deviceDpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      setDpr(w < 768 ? 1 : Math.min(2.0, deviceDpr));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const glConfig = useMemo(
    () => ({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance" as const,
      stencil: false,
    }),
    [],
  );

  return (
    <div
      data-viewport="3d"
      className="explorer-canvas pointer-events-auto fixed left-0 top-0 z-[5] h-[58vh] w-full cursor-grab active:cursor-grabbing md:h-screen"
      style={{ touchAction: "none" }}
      onDoubleClick={() => scrollStore.requestOrbitReset()}
      onWheel={stopScroll}
    >
      <Canvas
        dpr={dpr}
        gl={glConfig}
        className="!absolute inset-0 h-full w-full touch-none"
        frameloop="always"
        style={{ touchAction: "none" }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
