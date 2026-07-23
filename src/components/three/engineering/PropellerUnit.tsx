"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  brushedAluminumMaterial,
  carbonFiberMaterial,
  screwMaterial,
} from "../materials/pbrMaterials";

function Screw({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const screw = useMemo(() => screwMaterial(), []);
  const s = 0.014 * scale;
  return (
    <group position={position} scale={scale}>
      <mesh material={screw} castShadow>
        <cylinderGeometry args={[s * 0.55, s * 0.55, s * 2.2, 8]} />
      </mesh>
      <mesh material={screw} position={[0, s * 1.2, 0]} castShadow>
        <cylinderGeometry args={[s * 1.1, s * 1.1, s * 0.5, 8]} />
      </mesh>
    </group>
  );
}

function PropellerBlade({ rotationY }: { rotationY: number }) {
  const carbon = useMemo(() => carbonFiberMaterial(), []);
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0.04, 0);
    s.quadraticCurveTo(0.2, 0.028, 0.34, 0.01);
    s.quadraticCurveTo(0.2, -0.022, 0.04, 0);
    return s;
  }, []);
  const geom = useMemo(
    () =>
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.012,
        bevelEnabled: true,
        bevelThickness: 0.002,
        bevelSize: 0.002,
        bevelSegments: 2,
      }),
    [shape],
  );
  return (
    <mesh
      geometry={geom}
      material={carbon}
      rotation={[0.12, rotationY, 0]}
      position={[0, 0.014, 0]}
      castShadow
    />
  );
}

/** Two-blade propeller — single unit for inspect view or one corner of the quad. */
export function PropellerUnit({
  position = [0, 0.14, 0],
}: {
  position?: [number, number, number];
}) {
  const carbon = useMemo(() => carbonFiberMaterial(), []);
  const alum = useMemo(() => brushedAluminumMaterial(), []);

  return (
    <group position={position}>
      <mesh material={alum} castShadow>
        <cylinderGeometry args={[0.035, 0.04, 0.028, 24]} />
      </mesh>
      <mesh material={carbon} position={[0, 0.016, 0]} castShadow>
        <torusGeometry args={[0.028, 0.004, 12, 24]} />
      </mesh>
      {[0, 1].map((i) => (
        <PropellerBlade key={i} rotationY={i * Math.PI} />
      ))}
      <Screw position={[0, 0.022, 0]} scale={0.85} />
    </group>
  );
}

/** Four corner propellers for full-assembly placeholder. */
export function QuadPropellerUnits() {
  const corners = [
    [-0.52, 0.14, -0.52],
    [0.52, 0.14, -0.52],
    [-0.52, 0.14, 0.52],
    [0.52, 0.14, 0.52],
  ] as const;

  return (
    <>
      {corners.map((position, i) => (
        <PropellerUnit key={i} position={[...position]} />
      ))}
    </>
  );
}
