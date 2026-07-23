"use client";

import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { PRESENTATION_CAMERA } from "@/lib/scenePresentation";
import { ORBIT_LIMITS } from "@/lib/orbitLimits";
import { autoRotateStore } from "@/lib/autoRotateStore";
const DEFAULT_TARGET = new THREE.Vector3(...PRESENTATION_CAMERA.target);
const DEFAULT_CAMERA = new THREE.Vector3(...PRESENTATION_CAMERA.position);

export function OrbitControlsSetup() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera, gl } = useThree();
  const [autoRotate, setAutoRotate] = useState(autoRotateStore.active);

  useEffect(() => autoRotateStore.subscribe(setAutoRotate), []);

  useEffect(() => {
    camera.position.copy(DEFAULT_CAMERA);
    if (controlsRef.current) {
      controlsRef.current.target.copy(DEFAULT_TARGET);
      controlsRef.current.update();
    }
  }, [camera]);

  useEffect(() => {
    gl.domElement.style.touchAction = "none";
  }, [gl]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableRotate
      enableZoom
      enableDamping
      dampingFactor={ORBIT_LIMITS.dampingFactor}
      rotateSpeed={ORBIT_LIMITS.rotateSpeed}
      zoomSpeed={ORBIT_LIMITS.zoomSpeed}
      minDistance={ORBIT_LIMITS.minDistance}
      maxDistance={ORBIT_LIMITS.maxDistance}
      minPolarAngle={ORBIT_LIMITS.minPolarAngle}
      maxPolarAngle={ORBIT_LIMITS.maxPolarAngle}
      autoRotate={autoRotate}
      autoRotateSpeed={1.15}
      target={DEFAULT_TARGET}
    />
  );
}
