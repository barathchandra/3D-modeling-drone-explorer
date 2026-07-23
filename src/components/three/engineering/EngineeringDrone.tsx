"use client";

import gsap from "gsap";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  FOCUS_TWEEN_DURATION,
  FOCUS_TWEEN_EASE,
  OVERVIEW_SCALE,
} from "@/lib/componentFocus";
import { scrollStore } from "@/lib/scrollStore";
import { MODEL_PATHS } from "@/lib/modelPaths";
import { EscUnits } from "./EscModel";
import { AirframeModel } from "./AirframeModel";
import { CameraModel } from "./CameraModel";
import { GpsModel } from "./GpsModel";
import { BatteryModel } from "./BatteryModel";
import { OverviewModel } from "./OverviewModel";
import { MotorUnits } from "./MotorModel";
import { PropellerModel } from "./PropellerModel";
import { QuadPropellerUnits } from "./PropellerUnit";
import { LazyGlbPart } from "./LazyGlbPart";
import { PartGroup } from "./PartGroup";
import { PdbModel } from "./PdbModel";
import { RemoteModel } from "./RemoteModel";
import {
  anodizedMaterial,
  batteryMaterial,
  brushedAluminumMaterial,
  carbonFiberMaterial,
  connectorMaterial,
  copperMaterial,
  lensMaterial,
  pcbChipMaterial,
  pcbMaterial,
  plasticMaterial,
  screwMaterial,
  wireMaterial,
} from "../materials/pbrMaterials";

const FC_MODEL = MODEL_PATHS.fc;
const PIXHAWK_MODEL = MODEL_PATHS.pixhawk;

const QUAD = [
  { x: -1, z: -1 },
  { x: 1, z: -1 },
  { x: -1, z: 1 },
  { x: 1, z: 1 },
] as const;

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

function MotorUnit({ x, z }: { x: number; z: number }) {
  const alum = useMemo(() => brushedAluminumMaterial(), []);
  const copper = useMemo(() => copperMaterial(), []);
  const body = useMemo(() => plasticMaterial("#3a4248"), []);
  return (
    <group position={[x * 0.48, 0.06, z * 0.48]}>
      <mesh material={body} castShadow>
        <cylinderGeometry args={[0.055, 0.065, 0.09, 32]} />
      </mesh>
      <mesh material={copper} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} castShadow>
        <torusGeometry args={[0.042, 0.014, 16, 36]} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i * Math.PI) / 3;
        return (
        <mesh
          key={i}
          material={copper}
          rotation={[0, a, 0]}
          position={[Math.cos(a) * 0.038, 0.01, Math.sin(a) * 0.038]}
        >
          <boxGeometry args={[0.008, 0.022, 0.014]} />
        </mesh>
        );
      })}
      <mesh material={alum} position={[0, -0.05, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.04, 16]} />
      </mesh>
      <mesh material={alum} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.048, 0]}>
        <torusGeometry args={[0.05, 0.003, 12, 32]} />
      </mesh>
    </group>
  );
}

function EscBoard({ x, z }: { x: number; z: number }) {
  const pcb = useMemo(() => pcbMaterial(), []);
  const chip = useMemo(() => pcbChipMaterial(), []);
  const conn = useMemo(() => connectorMaterial(), []);
  return (
    <group position={[x * 0.22, 0.04, z * 0.22]}>
      <mesh material={pcb} castShadow>
        <boxGeometry args={[0.1, 0.018, 0.14]} />
      </mesh>
      <mesh material={chip} position={[0, 0.012, 0]}>
        <boxGeometry args={[0.04, 0.008, 0.04]} />
      </mesh>
      {[-0.04, 0.04].map((px) => (
        <mesh key={px} material={conn} position={[px, 0.014, 0.06]}>
          <boxGeometry args={[0.018, 0.006, 0.025]} />
        </mesh>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} material={chip} position={[-0.03 + i * 0.015, 0.011, -0.04]}>
          <boxGeometry args={[0.008, 0.004, 0.008]} />
        </mesh>
      ))}
    </group>
  );
}

/** Dedicated FC stack — offset from PDB/battery/ESC for clear separation in assembly. */
const FC_ASSEMBLY_OFFSET: [number, number, number] = [0, 0.11, 0.05];

function FlightControllerBoard() {
  const pcb = useMemo(() => pcbMaterial(), []);
  const chip = useMemo(() => pcbChipMaterial(), []);
  const alum = useMemo(() => anodizedMaterial("#2a3a4a"), []);
  const conn = useMemo(() => connectorMaterial(), []);
  return (
    <group position={[0, 0, 0]}>
      <mesh material={pcb} castShadow>
        <boxGeometry args={[0.2, 0.022, 0.2]} />
      </mesh>
      <mesh material={chip} position={[0, 0.016, 0]}>
        <boxGeometry args={[0.055, 0.012, 0.055]} />
      </mesh>
      <mesh material={chip} position={[0, 0.02, 0]}>
        <boxGeometry args={[0.022, 0.006, 0.022]} />
      </mesh>
      {[
        [-0.05, 0.014, -0.05],
        [0.05, 0.014, -0.05],
        [-0.05, 0.014, 0.05],
        [0.05, 0.014, 0.05],
      ].map((p, i) => (
        <mesh key={i} material={chip} position={p as [number, number, number]}>
          <boxGeometry args={[0.02, 0.008, 0.02]} />
        </mesh>
      ))}
      {[-0.09, 0.09].map((px) => (
        <mesh key={px} material={conn} position={[px, 0.015, 0]}>
          <boxGeometry args={[0.02, 0.008, 0.03]} />
        </mesh>
      ))}
      <mesh material={alum} position={[0, 0.018, 0.08]}>
        <boxGeometry args={[0.08, 0.008, 0.02]} />
      </mesh>
    </group>
  );
}

function PdbPlaceholder() {
  const pcb = useMemo(() => pcbMaterial(), []);
  const alum = useMemo(() => brushedAluminumMaterial(), []);
  return (
    <group position={[0, 0.02, 0]}>
      <mesh material={pcb} castShadow>
        <boxGeometry args={[0.18, 0.016, 0.18]} />
      </mesh>
      <mesh material={alum} position={[0, 0.012, 0]}>
        <boxGeometry args={[0.06, 0.006, 0.06]} />
      </mesh>
    </group>
  );
}

function PixhawkPlaceholder() {
  const pcb = useMemo(() => pcbMaterial(), []);
  const chip = useMemo(() => pcbChipMaterial(), []);
  const conn = useMemo(() => connectorMaterial(), []);
  return (
    <group position={[0, 0, 0]}>
      <mesh material={pcb} castShadow>
        <boxGeometry args={[0.12, 0.018, 0.14]} />
      </mesh>
      <mesh material={chip} position={[0, 0.012, 0]}>
        <boxGeometry args={[0.04, 0.008, 0.04]} />
      </mesh>
      <mesh material={conn} position={[0, 0.014, 0.05]}>
        <boxGeometry args={[0.02, 0.006, 0.025]} />
      </mesh>
    </group>
  );
}

function PdbBoard() {
  return <PdbModel placeholder={<PdbPlaceholder />} />;
}

function GpsModule() {
  const body = useMemo(() => plasticMaterial("#1e2830"), []);
  const alum = useMemo(() => brushedAluminumMaterial(), []);
  return (
    <group position={[0, 0.16, 0.02]}>
      <mesh material={body} castShadow>
        <boxGeometry args={[0.1, 0.028, 0.1]} />
      </mesh>
      <mesh material={alum} position={[0, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.07, 12]} />
      </mesh>
      <mesh material={alum} position={[0, 0.075, 0]}>
        <sphereGeometry args={[0.012, 12, 12]} />
      </mesh>
    </group>
  );
}

function BatteryPack() {
  const bat = useMemo(() => batteryMaterial(), []);
  const label = useMemo(() => anodizedMaterial("#2a4030"), []);
  const wire = useMemo(() => wireMaterial(), []);
  return (
    <group position={[0, -0.02, 0]}>
      <mesh material={bat} castShadow>
        <boxGeometry args={[0.28, 0.055, 0.16]} />
      </mesh>
      <mesh material={label} position={[0, 0.028, 0]}>
        <boxGeometry args={[0.2, 0.004, 0.08]} />
      </mesh>
      {[-0.08, 0, 0.08].map((px) => (
        <mesh key={px} material={bat} position={[px, 0, 0]} castShadow>
          <boxGeometry args={[0.085, 0.05, 0.14]} />
        </mesh>
      ))}
      <mesh material={wire} position={[0.12, 0.04, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.14, 8]} />
      </mesh>
      <mesh material={wire} position={[-0.12, 0.04, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.003, 0.003, 0.12, 8]} />
      </mesh>
    </group>
  );
}

function CameraGimbal() {
  const body = useMemo(() => plasticMaterial("#1a1f24"), []);
  const lens = useMemo(() => lensMaterial(), []);
  const alum = useMemo(() => brushedAluminumMaterial(), []);
  return (
    <group position={[0, -0.06, -0.22]}>
      <mesh material={alum} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.055, 0.006, 16, 32]} />
      </mesh>
      <mesh material={body} castShadow>
        <boxGeometry args={[0.1, 0.08, 0.08]} />
      </mesh>
      <mesh material={lens} position={[0, 0, -0.05]}>
        <cylinderGeometry args={[0.04, 0.045, 0.04, 24]} />
      </mesh>
    </group>
  );
}

function AntennaMast({ position }: { position: [number, number, number] }) {
  const alum = useMemo(() => brushedAluminumMaterial(), []);
  return (
    <group position={position}>
      <mesh material={alum}>
        <cylinderGeometry args={[0.003, 0.003, 0.08, 8]} />
      </mesh>
      <mesh material={alum} position={[0, 0.045, 0]}>
        <sphereGeometry args={[0.006, 8, 8]} />
      </mesh>
    </group>
  );
}

function AirframeShell() {
  const carbon = useMemo(() => carbonFiberMaterial(), []);
  return (
    <group>
      <mesh material={carbon} castShadow receiveShadow>
        <boxGeometry args={[0.32, 0.07, 0.32]} />
      </mesh>
      <mesh material={carbon} position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.26, 0.04, 0.26]} />
      </mesh>
      {[
        [-0.14, 0.02, -0.14],
        [0.14, 0.02, -0.14],
        [-0.14, 0.02, 0.14],
        [0.14, 0.02, 0.14],
      ].map((p, i) => (
        <Screw key={i} position={p as [number, number, number]} scale={1.1} />
      ))}
      <AntennaMast position={[-0.1, 0.08, 0.1]} />
      <AntennaMast position={[0.1, 0.08, -0.1]} />
    </group>
  );
}

function RemotePlaceholder() {
  const body = useMemo(() => plasticMaterial("#2e3438"), []);
  const grip = useMemo(() => plasticMaterial("#1e2428"), []);
  const screen = useMemo(() => plasticMaterial("#0a1018"), []);
  const alum = useMemo(() => anodizedMaterial("#4a5560"), []);
  return (
    <group position={[0, 0.02, 0]}>
      <mesh material={body} castShadow>
        <boxGeometry args={[0.3, 0.055, 0.17]} />
      </mesh>
      <mesh material={screen} position={[0, 0.038, 0.02]} castShadow>
        <boxGeometry args={[0.14, 0.008, 0.09]} />
      </mesh>
      {[-0.2, 0.2].map((x) => (
        <group key={x} position={[x, 0.01, -0.06]}>
          <mesh material={grip} castShadow>
            <boxGeometry args={[0.07, 0.1, 0.05]} />
          </mesh>
          <mesh material={alum} position={[0, 0.05, 0]} castShadow>
            <cylinderGeometry args={[0.018, 0.018, 0.04, 16]} />
          </mesh>
        </group>
      ))}
      <mesh material={alum} position={[0, 0.048, -0.07]} castShadow>
        <cylinderGeometry args={[0.006, 0.006, 0.12, 8]} />
      </mesh>
    </group>
  );
}

export function EngineeringDrone() {
  const root = useRef<THREE.Group>(null);
  const assembly = useRef<THREE.Group>(null);
  const rootScale = useRef({ value: OVERVIEW_SCALE });
  const rootTween = useRef<gsap.core.Tween | null>(null);
  const showAssembly = useRef(true);

  useEffect(
    () =>
      scrollStore.subscribeSection((section) => {
        showAssembly.current = section !== 0;
        const target = section === 0 ? OVERVIEW_SCALE : 1;
        rootTween.current?.kill();
        rootTween.current = gsap.to(rootScale.current, {
          value: target,
          duration: FOCUS_TWEEN_DURATION,
          ease: FOCUS_TWEEN_EASE,
        });
      }),
    [],
  );

  useFrame(() => {
    if (root.current) {
      root.current.scale.setScalar(rootScale.current.value);
    }
    if (assembly.current) {
      assembly.current.visible = showAssembly.current;
    }
  });

  return (
    <>
      <OverviewModel />
      <group ref={root}>
        <group ref={assembly}>
      <PartGroup slideIndex={0}>
        <PropellerModel placeholder={<QuadPropellerUnits />} />
      </PartGroup>

      <PartGroup slideIndex={1}>
        <MotorUnits
          placeholder={
            <>
              {QUAD.map((q, i) => (
                <MotorUnit key={i} x={q.x} z={q.z} />
              ))}
            </>
          }
        />
      </PartGroup>

      <PartGroup slideIndex={2}>
        <EscUnits
          placeholder={
            <>
              {QUAD.map((q, i) => (
                <EscBoard key={i} x={q.x} z={q.z} />
              ))}
            </>
          }
        />
      </PartGroup>

      <PartGroup slideIndex={3}>
        <BatteryModel placeholder={<BatteryPack />} />
      </PartGroup>

      <PartGroup slideIndex={4}>
        <group position={FC_ASSEMBLY_OFFSET}>
          <LazyGlbPart
            modelPath={FC_MODEL}
            targetSize={0.16}
            slideIndex={4}
            placeholder={<FlightControllerBoard />}
          />
        </group>
      </PartGroup>

      <PartGroup slideIndex={5}>
        <LazyGlbPart
          modelPath={PIXHAWK_MODEL}
          targetSize={0.14}
          slideIndex={5}
          placeholder={<PixhawkPlaceholder />}
        />
      </PartGroup>

      <PartGroup slideIndex={6}>
        <PdbBoard />
      </PartGroup>

      <PartGroup slideIndex={7}>
        <GpsModel placeholder={<GpsModule />} />
      </PartGroup>

      <PartGroup slideIndex={8}>
        <CameraModel placeholder={<CameraGimbal />} />
      </PartGroup>

      <PartGroup slideIndex={9}>
        <AirframeModel placeholder={<AirframeShell />} />
      </PartGroup>

      <PartGroup slideIndex={10}>
        <RemoteModel placeholder={<RemotePlaceholder />} />
      </PartGroup>
        </group>
      </group>
    </>
  );
}
