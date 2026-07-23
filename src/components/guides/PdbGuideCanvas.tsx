"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Component, Suspense, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { prepareGltfScene } from "@/components/three/engineering/gltfUtils";
import { MODEL_PATHS } from "@/lib/modelPaths";

/* ── Types ────────────────────────────────────────────────────────────────── */
type Mode = "assembled" | "exploded";

const QUAD = [
  { x: -1, z: -1 },
  { x:  1, z: -1 },
  { x: -1, z:  1 },
  { x:  1, z:  1 },
] as const;

/* ── Smooth animated part ─────────────────────────────────────────────────── *
 *  Lerps world position and material opacity between assembled / exploded.    *
 * ──────────────────────────────────────────────────────────────────────────── */
function AnimatedPart({
  mode,
  assembled,
  exploded,
  assembledOpacity = 0.5,
  children,
}: {
  mode: Mode;
  assembled: [number, number, number];
  exploded:  [number, number, number];
  assembledOpacity?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const cur = useRef({
    x: assembled[0], y: assembled[1], z: assembled[2],
    op: assembledOpacity,
  });

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const k = 1 - Math.exp(-5 * dt);           // smooth, frame-rate independent
    const isA = mode === "assembled";
    const [tx, ty, tz] = isA ? assembled : exploded;
    const top = isA ? assembledOpacity : 1.0;

    cur.current.x  += (tx  - cur.current.x)  * k;
    cur.current.y  += (ty  - cur.current.y)  * k;
    cur.current.z  += (tz  - cur.current.z)  * k;
    cur.current.op += (top - cur.current.op) * k;

    g.position.set(cur.current.x, cur.current.y, cur.current.z);

    g.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];
        for (const m of mats) {
          if (m && (m as THREE.Material).transparent)
            (m as THREE.MeshStandardMaterial).opacity = cur.current.op;
        }
      }
    });
  });

  return (
    <group ref={ref} position={assembled}>
      {children}
    </group>
  );
}

/* ── Part geometries with natural drone colors ───────────────────────────── */

function Arm({ angle, mode, assembled, exploded }: {
  angle: number;
  mode: Mode;
  assembled: [number, number, number];
  exploded:  [number, number, number];
}) {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#2a2e32", roughness: 0.55, metalness: 0.3,
    transparent: true, opacity: 0.5, depthWrite: false,
  }), []);
  return (
    <AnimatedPart mode={mode} assembled={assembled} exploded={exploded} assembledOpacity={0.5}>
      <mesh material={mat} rotation={[0, -angle, 0]}>
        <boxGeometry args={[0.44, 0.014, 0.026]} />
      </mesh>
    </AnimatedPart>
  );
}

function Motor({ mode, assembled, exploded }: {
  mode: Mode;
  assembled: [number, number, number];
  exploded:  [number, number, number];
}) {
  const body = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#8a8e9a", roughness: 0.35, metalness: 0.7,
    transparent: true, opacity: 0.5, depthWrite: false,
  }), []);
  const coil = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#c87a30", roughness: 0.5, metalness: 0.5,
    transparent: true, opacity: 0.5, depthWrite: false,
  }), []);
  return (
    <AnimatedPart mode={mode} assembled={assembled} exploded={exploded} assembledOpacity={0.5}>
      <mesh material={body}>
        <cylinderGeometry args={[0.032, 0.038, 0.056, 16]} />
      </mesh>
      <mesh material={coil} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <torusGeometry args={[0.026, 0.007, 8, 20]} />
      </mesh>
    </AnimatedPart>
  );
}

function Propeller({ mode, assembled, exploded }: {
  mode: Mode;
  assembled: [number, number, number];
  exploded:  [number, number, number];
}) {
  const carbon = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#1e2224", roughness: 0.45, metalness: 0.2,
    transparent: true, opacity: 0.45, depthWrite: false,
  }), []);
  // two blades
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0.035, 0); s.quadraticCurveTo(0.19, 0.024, 0.32, 0.008);
    s.quadraticCurveTo(0.19, -0.018, 0.035, 0);
    return s;
  }, []);
  const geom = useMemo(() =>
    new THREE.ExtrudeGeometry(shape, { depth: 0.01, bevelEnabled: false }),
  [shape]);
  return (
    <AnimatedPart mode={mode} assembled={assembled} exploded={exploded} assembledOpacity={0.45}>
      {[0, Math.PI].map((ry, i) => (
        <mesh key={i} geometry={geom} material={carbon}
          rotation={[0.1, ry, 0]} position={[0, 0.007, 0]} />
      ))}
    </AnimatedPart>
  );
}

function Battery({ mode }: { mode: Mode }) {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#1e3a26", roughness: 0.6, metalness: 0.15,
    transparent: true, opacity: 0.5, depthWrite: false,
  }), []);
  const label = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#2a5036", roughness: 0.7,
    transparent: true, opacity: 0.5, depthWrite: false,
  }), []);
  return (
    <AnimatedPart mode={mode}
      assembled={[0, -0.06, 0]} exploded={[0, -0.95, 0]} assembledOpacity={0.5}>
      <mesh material={mat}><boxGeometry args={[0.25, 0.046, 0.13]} /></mesh>
      <mesh material={label} position={[0, 0.026, 0]}><boxGeometry args={[0.18, 0.004, 0.08]} /></mesh>
    </AnimatedPart>
  );
}

function FlightController({ mode }: { mode: Mode }) {
  const pcb = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#1a4012", roughness: 0.55, metalness: 0.1,
    transparent: true, opacity: 0.5, depthWrite: false,
  }), []);
  const chip = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#2a2e32", roughness: 0.4, metalness: 0.2,
    transparent: true, opacity: 0.5, depthWrite: false,
  }), []);
  return (
    <AnimatedPart mode={mode}
      assembled={[0, 0.065, 0]} exploded={[0, 0.6, 0]} assembledOpacity={0.5}>
      <mesh material={pcb}><boxGeometry args={[0.18, 0.013, 0.18]} /></mesh>
      <mesh material={chip} position={[0, 0.01, 0]}><boxGeometry args={[0.05, 0.006, 0.05]} /></mesh>
    </AnimatedPart>
  );
}

function Gps({ mode }: { mode: Mode }) {
  const body = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#1e2c38", roughness: 0.6, metalness: 0.2,
    transparent: true, opacity: 0.5, depthWrite: false,
  }), []);
  return (
    <AnimatedPart mode={mode}
      assembled={[0, 0.155, 0]} exploded={[0, 1.15, 0]} assembledOpacity={0.5}>
      <mesh material={body} position={[0, -0.03, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.055, 8]} />
      </mesh>
      <mesh material={body}>
        <cylinderGeometry args={[0.036, 0.036, 0.016, 12]} />
      </mesh>
    </AnimatedPart>
  );
}

function Frame({ mode }: { mode: Mode }) {
  const carbon = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#242628", roughness: 0.55, metalness: 0.25,
    transparent: true, opacity: 0.45, depthWrite: false,
  }), []);
  return (
    <AnimatedPart mode={mode}
      assembled={[0, -0.003, 0]} exploded={[0, -0.3, 0]} assembledOpacity={0.45}>
      <mesh material={carbon}><boxGeometry args={[0.22, 0.009, 0.22]} /></mesh>
      {QUAD.map((q, i) => (
        <mesh key={i} material={carbon} position={[q.x * 0.16, -0.086, q.z * 0.16]}>
          <cylinderGeometry args={[0.007, 0.007, 0.071, 8]} />
        </mesh>
      ))}
    </AnimatedPart>
  );
}

/* ── PDB GLB — always at full opacity ─────────────────────────────────────── */
function PdbGlb() {
  const { scene } = useGLTF(MODEL_PATHS.pdb);
  const model = useMemo(() => prepareGltfScene(scene, 0.2), [scene]);
  return (
    <group position={[0, 0.012, 0]}>
      <primitive object={model} />
    </group>
  );
}

class GlbErrorBoundary extends Component<
  { children: React.ReactNode }, { err: boolean }
> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? null : this.props.children; }
}

/* ── Full scene ───────────────────────────────────────────────────────────── */
function DroneScene({ mode }: { mode: Mode }) {
  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 8, 5]}  intensity={2.6} castShadow={false} />
      <directionalLight position={[-3, 3, -4]} intensity={1.0} />
      <pointLight position={[0, 2, 1]} intensity={0.7} color="#f8f4ee" />

      {/* ── Frame + vertical stack ── */}
      <Frame mode={mode} />
      <Battery mode={mode} />
      <FlightController mode={mode} />
      <Gps mode={mode} />

      {/* ── Arms + motors + props per corner ── */}
      {QUAD.map((q, i) => {
        const angle = Math.atan2(q.z, q.x);
        const ax = q.x * 0.23, az = q.z * 0.23;
        const mx = q.x * 0.44, mz = q.z * 0.44;
        const ex = q.x * 1.05, ez = q.z * 1.05;
        return (
          <group key={i}>
            <Arm
              angle={angle} mode={mode}
              assembled={[ax, 0.002, az]}
              exploded={[ex * 0.85, 0.06, ez * 0.85]}
            />
            <Motor mode={mode}
              assembled={[mx, 0.032, mz]}
              exploded={[ex, 0.2, ez]}
            />
            <Propeller mode={mode}
              assembled={[mx, 0.072, mz]}
              exploded={[ex, 0.52, ez]}
            />
          </group>
        );
      })}

      {/* ── PDB — full quality, centered ── */}
      <GlbErrorBoundary>
        <Suspense fallback={null}>
          <PdbGlb />
        </Suspense>
      </GlbErrorBoundary>

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        rotateSpeed={0.9}
        zoomSpeed={1.3}
        minDistance={0.3}
        maxDistance={7}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        target={[0, 0.05, 0]}
        makeDefault
      />
    </>
  );
}

/* ── Export with toggle ────────────────────────────────────────────────────── */
export function PdbGuideCanvas() {
  const [mode, setMode] = useState<Mode>("assembled");

  return (
    <div className="flex h-full flex-col">
      {/* Toggle */}
      <div className="flex items-center justify-center gap-2 pb-3">
        {(["assembled", "exploded"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-full px-5 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition ${
              mode === m
                ? "bg-[#2a2e32] text-white shadow-sm"
                : "border border-black/[0.1] text-[#4a4a4a] hover:bg-black/[0.04]"
            }`}
          >
            {m}
          </button>
        ))}
        <span className="ml-3 text-[11px] text-[#8a8a8a]">
          {mode === "assembled" ? "PDB dominant · others dimmed" : "All parts separated · full color"}
        </span>
      </div>

      {/* Canvas with white background */}
      <div className="flex-1 overflow-hidden rounded-2xl shadow-inner"
        style={{ background: "#ffffff", minHeight: 0 }}>
        <Canvas
          camera={{ position: [0.6, 0.9, 2.3], fov: 36, near: 0.04, far: 60 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: false }}
          frameloop="always"
        >
          <DroneScene mode={mode} />
        </Canvas>
      </div>
    </div>
  );
}
