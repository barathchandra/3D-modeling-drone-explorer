"use client";

import { Float, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function RadarHologram() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.15;
  });

  return (
    <group ref={ref} position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {[2.2, 3, 3.8, 4.6].map((r, i) => (
        <mesh key={r}>
          <ringGeometry args={[r - 0.02, r, 64]} />
          <meshBasicMaterial
            color="#00a8ff"
            transparent
            opacity={0.08 - i * 0.015}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      <mesh rotation={[0, 0, 0]}>
        <planeGeometry args={[5, 0.02]} />
        <meshBasicMaterial color="#00a8ff" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function AtmosphericParticles() {
  const count = 400;
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00a8ff" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

export function SceneEffects({ fogIntensity = 0.4 }: { fogIntensity?: number }) {
  return (
    <>
      <fog attach="fog" args={["#000000", 4, 14]} />
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#00a8ff" />
      <pointLight position={[0, 2, 0]} intensity={0.8} color="#0066ff" distance={8} />
      <spotLight
        position={[0, -2, 2]}
        angle={0.5}
        penumbra={1}
        intensity={1.5 * fogIntensity}
        color="#00a8ff"
        castShadow
      />
      <Stars radius={80} depth={40} count={1200} factor={3} saturation={0} fade speed={0.5} />
      <AtmosphericParticles />
      <RadarHologram />
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
        <mesh position={[3.5, 1, -2]}>
          <boxGeometry args={[0.01, 1.2, 0.8]} />
          <meshBasicMaterial color="#00a8ff" transparent opacity={0.06} wireframe />
        </mesh>
      </Float>
    </>
  );
}
