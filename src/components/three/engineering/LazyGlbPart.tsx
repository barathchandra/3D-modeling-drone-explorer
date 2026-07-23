"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import type { Vector3Tuple } from "three";
import { getActiveComponentIndex } from "@/lib/sections";
import { scrollStore } from "@/lib/scrollStore";
import { prepareGltfScene } from "./gltfUtils";
import { SkeletonUtils } from "three-stdlib";

export type GlbPlacement = {
  position: Vector3Tuple;
  rotationY?: number;
};

type GlbMeshProps = {
  modelPath: string;
  targetSize: number;
  playing: boolean;
  placements?: GlbPlacement[];
};

function GlbMesh({ modelPath, targetSize, playing, placements }: GlbMeshProps) {
  const root = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  const prepared = useMemo(() => prepareGltfScene(scene, targetSize), [scene, targetSize]);

  // Remove/hide thin wires, cables, or connectors inside certain models (eg. ESC)
  // Match by node name or material name patterns to avoid deleting unknown meshes.
  useMemo(() => {
    try {
      const stripPattern = /wire|cable|lead|connector|solder|wires|cables/i;
      prepared.traverse((node: any) => {
        if (!(node instanceof THREE.Mesh)) return;
        const nodeName = (node.name || "").toString();
        const matName = (node.material && (Array.isArray(node.material) ? node.material[0]?.name : node.material.name)) || "";
        if (stripPattern.test(nodeName) || stripPattern.test(matName)) {
          node.visible = false;
        }
      });
    } catch (e) {
      // swallow errors — non-critical
    }
  }, [prepared]);
  const instances = useMemo(() => {
    if (!placements?.length) return null;
    return placements.map((p) => ({
      object: SkeletonUtils.clone(prepared) as THREE.Object3D,
      position: p.position,
      rotationY: p.rotationY ?? 0,
    }));
  }, [prepared, placements]);
  const { actions, mixer } = useAnimations(animations, root);

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;

    if (playing) {
      for (const action of Object.values(actions)) {
        action?.reset().fadeIn(0.35).play();
      }
    } else {
      for (const action of Object.values(actions)) {
        action?.fadeOut(0.25);
      }
    }
  }, [playing, actions]);

  useFrame((_, delta) => {
    if (playing && mixer) {
      mixer.update(delta);
    }
  });

  if (instances) {
    return (
      <group ref={root}>
        {instances.map((inst, i) => (
          <group key={i} position={inst.position} rotation={[0, inst.rotationY, 0]}>
            <primitive object={inst.object} />
          </group>
        ))}
      </group>
    );
  }

  return (
    <group ref={root}>
      <primitive object={prepared} />
    </group>
  );
}

type ErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

type ErrorBoundaryState = { hasError: boolean };

class GlbErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

type LazyGlbPartProps = {
  modelPath: string;
  targetSize: number;
  slideIndex: number;
  position?: Vector3Tuple;
  placements?: GlbPlacement[];
  placeholder: ReactNode;
};

export function LazyGlbPart({
  modelPath,
  targetSize,
  slideIndex,
  position,
  placements,
  placeholder,
}: LazyGlbPartProps) {
  const [section, setSection] = useState(scrollStore.sectionIndex);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => scrollStore.subscribeSection(setSection), []);

  const isActive = getActiveComponentIndex(section) === slideIndex;

  useEffect(() => {
    if (isActive) setHasLoaded(true);
  }, [isActive]);

  if (!isActive && !hasLoaded) {
    return <>{placeholder}</>;
  }

  const mesh = (
    <GlbErrorBoundary fallback={placeholder}>
      <Suspense fallback={null}>
        <group visible={isActive}>
          <GlbMesh
            modelPath={modelPath}
            targetSize={targetSize}
            playing={isActive}
            placements={placements}
          />
        </group>
      </Suspense>
    </GlbErrorBoundary>
  );

  if (!isActive) {
    return (
      <>
        {placeholder}
        <group visible={false}>{mesh}</group>
      </>
    );
  }

  if (position) {
    return <group position={position}>{mesh}</group>;
  }
  return mesh;
}
