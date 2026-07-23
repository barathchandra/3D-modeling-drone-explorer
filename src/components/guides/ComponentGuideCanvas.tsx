"use client";

import { Html, Line, OrbitControls } from "@react-three/drei";
import { scrollStore } from "@/lib/scrollStore";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { Rotate360Button } from "@/components/mvp/Rotate360Button";
import {
  getGuideSlot,
  GUIDE_COMPONENT_SLOTS,
  type GuideComponentSlot,
} from "@/lib/componentGuideLayout";
import { PropellerUnit } from "@/components/three/engineering/PropellerUnit";

const QUAD = [
  { x: -1, z: -1 },
  { x: 1, z: -1 },
  { x: -1, z: 1 },
  { x: 1, z: 1 },
] as const;

const DRONE_CAMERA: [number, number, number] = [0.65, 0.85, 2.35];
const REMOTE_CAMERA: [number, number, number] = [0, 0.12, 1.85];
const ORBIT_TARGET: [number, number, number] = [0, 0.05, 0];

function PartMat({
  color,
  metalness = 0.25,
  roughness = 0.55,
  highlight = false,
}: {
  color: string;
  metalness?: number;
  roughness?: number;
  highlight?: boolean;
}) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={metalness}
      roughness={roughness}
      transparent={!highlight}
      opacity={highlight ? 1 : 0.42}
      emissive={highlight ? "#2a4a62" : "#000000"}
      emissiveIntensity={highlight ? 0.32 : 0}
    />
  );
}

function DirectionArrow({
  from,
  to,
  color = "#5a7a94",
}: {
  from: [number, number, number];
  to: [number, number, number];
  color?: string;
}) {
  const { midpoint, rotation } = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const dir = end.clone().sub(start);
    const len = dir.length();
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize(),
    );
    return {
      midpoint: mid,
      rotation: new THREE.Euler().setFromQuaternion(quat),
      length: len,
    };
  }, [from, to]);

  const linePoints = useMemo(
    () => [new THREE.Vector3(...from), new THREE.Vector3(...to)],
    [from, to],
  );

  const shaftLen = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    return Math.max(start.distanceTo(end) - 0.028, 0.04);
  }, [from, to]);

  return (
    <group>
      <Line points={linePoints} color={color} lineWidth={2} />
      <mesh position={midpoint} rotation={rotation}>
        <cylinderGeometry args={[0.003, 0.003, shaftLen, 6]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={to} rotation={rotation}>
        <coneGeometry args={[0.012, 0.03, 10]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function ComponentCallout({ slot, showBoxes = true }: { slot: GuideComponentSlot; showBoxes?: boolean }) {
  const { label, anchor, labelPosition, color, size, quadOffsets } = slot;
  const isPropellers = slot.id === "propellers";

  return (
    <group>
      <DirectionArrow from={labelPosition} to={anchor} color="#3d5a72" />

      {showBoxes &&
        (quadOffsets ? (
          quadOffsets.map((offset, i) => (
            <group
              key={i}
              position={[anchor[0] + offset[0], anchor[1] + offset[1], anchor[2] + offset[2]]}
            >
              {isPropellers ? (
                <PropellerUnit position={[0, 0, 0]} />
              ) : (
                <mesh>
                  <boxGeometry args={size} />
                  <PartMat color={color} highlight />
                </mesh>
              )}
            </group>
          ))
        ) : (
          <mesh position={anchor}>
            <boxGeometry args={size} />
            <PartMat color={color} highlight />
          </mesh>
        ))}

      <Html position={labelPosition} center distanceFactor={6} style={{ pointerEvents: "none" }}>
        <div className="whitespace-nowrap rounded-md border border-[#3d5a72]/25 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2a3a48] shadow-sm">
          {label}
        </div>
      </Html>
    </group>
  );
}

function GhostDroneStructure({ activeId }: { activeId: string }) {
  const hi = (id: string) => activeId === id;

  return (
    <>
      <group position={[0, -0.003, 0]}>
        <mesh>
          <boxGeometry args={[0.22, 0.009, 0.22]} />
          <PartMat color="#242628" highlight={hi("airframe")} />
        </mesh>
      </group>

      {QUAD.map((q, i) => {
        const angle = Math.atan2(q.z, q.x);
        return (
          <group key={`arm-${i}`} position={[q.x * 0.23, 0.002, q.z * 0.23]} rotation={[0, -angle, 0]}>
            <mesh>
              <boxGeometry args={[0.44, 0.013, 0.025]} />
              <PartMat color="#2a2e32" metalness={0.3} highlight={hi("airframe")} />
            </mesh>
          </group>
        );
      })}

      {GUIDE_COMPONENT_SLOTS.filter((s) => s.id !== activeId && s.id !== "remote-controller").map((slot) => {
        if (slot.quadOffsets) {
          return slot.quadOffsets.map((offset, i) => (
            <mesh
              key={`${slot.id}-${i}`}
              position={[
                slot.anchor[0] + offset[0],
                slot.anchor[1] + offset[1],
                slot.anchor[2] + offset[2],
              ]}
            >
              <boxGeometry args={slot.size} />
              <PartMat color={slot.color} />
            </mesh>
          ));
        }
        return (
          <mesh key={slot.id} position={slot.anchor}>
            <boxGeometry args={slot.size} />
            <PartMat color={slot.color} />
          </mesh>
        );
      })}

      <group position={[0, 0.155, 0]}>
        <mesh position={[0, -0.03, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.055, 8]} />
          <PartMat color="#1e2c38" roughness={0.6} highlight={hi("gps")} />
        </mesh>
      </group>

      <DirectionArrow from={[0, 0.06, -0.12]} to={[0, 0.02, -0.28]} color="#9aa8b2" />
      <Html position={[0, 0.08, -0.34]} center distanceFactor={7} style={{ pointerEvents: "none" }}>
        <div className="rounded border border-black/10 bg-white/90 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#6b7a85]">
          Front
        </div>
      </Html>
    </>
  );
}

function RemoteStructure({ slot }: { slot: GuideComponentSlot }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={slot.size} />
        <meshStandardMaterial color={slot.color} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.038, 0.02]}>
        <boxGeometry args={[0.14, 0.008, 0.09]} />
        <meshStandardMaterial color="#0a1018" roughness={0.4} />
      </mesh>
      {[-0.2, 0.2].map((x) => (
        <group key={x} position={[x, 0.01, -0.06]}>
          <mesh>
            <boxGeometry args={[0.07, 0.1, 0.05]} />
            <meshStandardMaterial color="#1e2428" roughness={0.55} />
          </mesh>
        </group>
      ))}
      <ComponentCallout slot={slot} showBoxes={false} />
    </group>
  );
}

function GuideScene({
  componentId,
  autoRotate,
}: {
  componentId: string;
  autoRotate: boolean;
}) {
  const slot = getGuideSlot(componentId);
  const isRemote = componentId === "remote-controller";
  const camera = isRemote ? REMOTE_CAMERA : DRONE_CAMERA;
  const target = isRemote ? ([0, 0.02, 0] as [number, number, number]) : ORBIT_TARGET;
  const { camera: cam } = useThree();

  useEffect(() => {
    cam.position.set(...camera);
  }, [cam, camera]);

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 8, 5]} intensity={2.8} />
      <directionalLight position={[-3, 3, -4]} intensity={1.0} />
      <pointLight position={[0, 2, 0.8]} intensity={0.7} />

      {isRemote && slot ? (
        <RemoteStructure slot={slot} />
      ) : (
        <>
          <GhostDroneStructure activeId={componentId} />
          {slot ? <ComponentCallout slot={slot} /> : null}
        </>
      )}

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        rotateSpeed={0.9}
        zoomSpeed={1.3}
        minDistance={0.35}
        maxDistance={8}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        autoRotate={autoRotate}
        autoRotateSpeed={1.15}
        target={target}
        makeDefault
      />
    </>
  );
}

/** Structural drone diagram — labeled placement with direction arrow, no GLB. */
export function ComponentGuideCanvas({ componentId }: { componentId: string }) {
  const [autoRotate, setAutoRotate] = useState(false);
  const slot = getGuideSlot(componentId);
  const isRemote = componentId === "remote-controller";

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 pb-3">
        <p className="text-[11px] text-[#7a7a7a]">
          {isRemote
            ? "Ground controller placement"
            : slot
              ? `${slot.label} placement on the drone — arrow points to install location`
              : "Component placement on the drone"}
        </p>
        <Rotate360Button active={autoRotate} onToggle={() => setAutoRotate((v) => !v)} />
      </div>

      <div
        className="relative flex-1 overflow-hidden rounded-2xl"
        style={{ background: "#ffffff", minHeight: 0 }}
        onDoubleClick={() => {
          // If viewing the ESC guide, make the ESC component active in the main explorer
          if (componentId === "esc") {
            scrollStore.setSectionIndex(2);
          }
        }}
      >
        <Canvas
          camera={{
            position: isRemote ? REMOTE_CAMERA : DRONE_CAMERA,
            fov: 36,
            near: 0.04,
            far: 60,
          }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: false }}
          frameloop="always"
        >
          <GuideScene componentId={componentId} autoRotate={autoRotate} />
        </Canvas>
      </div>
    </div>
  );
}
