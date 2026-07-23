"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { focusBoundsStore } from "@/lib/focusBoundsStore";
import { MODEL_PATHS } from "@/lib/modelPaths";
import { scrollStore } from "@/lib/scrollStore";
import { prepareGltfScene } from "./gltfUtils";

const MODEL_PATH = MODEL_PATHS.overview;
const TARGET_SIZE = 1.05;

function OverviewGlbMesh() {
  const root = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);
  const model = useMemo(() => prepareGltfScene(scene, TARGET_SIZE), [scene]);

  useFrame(() => {
    if (!root.current) return;
    const box = new THREE.Box3().setFromObject(root.current);
    if (box.isEmpty()) return;
    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);
    focusBoundsStore.setOverview({
      center: sphere.center.clone(),
      radius: Math.max(sphere.radius, 0.2),
    });
  });

  return (
    <group ref={root}>
      <primitive object={model} />
    </group>
  );
}

class OverviewErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/** Full textured drone shown on the Overview section only. */
export function OverviewModel() {
  const [section, setSection] = useState(scrollStore.sectionIndex);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => scrollStore.subscribeSection(setSection), []);

  const isOverview = section === 0;

  useEffect(() => {
    if (isOverview) setHasLoaded(true);
    if (!isOverview) focusBoundsStore.clearOverview();
  }, [isOverview]);

  if (!isOverview && !hasLoaded) return null;

  return (
    <group visible={isOverview}>
      <OverviewErrorBoundary>
        <Suspense fallback={null}>
          {isOverview ? <OverviewGlbMesh /> : null}
        </Suspense>
      </OverviewErrorBoundary>
    </group>
  );
}
