"use client";

import { ContactShadows, Grid } from "@react-three/drei";

const ASH_BG = "#bfbfbf";
const ASH_FOG = "#c8c8c8";

/** Scene lights & environment only — ash industrial studio, soft shadows. */
export function SceneEnvironment() {
  return (
    <>
      <color attach="background" args={[ASH_BG]} />
      <fog attach="fog" args={[ASH_FOG, 18, 32]} />
      <ambientLight intensity={0.58} color="#f2f2f2" />
      <hemisphereLight args={["#ffffff", "#a8a8a8", 0.45]} />
      <directionalLight
        position={[5, 8, 6]}
        intensity={1.15}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={22}
        shadow-camera-left={-3.5}
        shadow-camera-right={3.5}
        shadow-camera-top={3.5}
        shadow-camera-bottom={-3.5}
        shadow-bias={-0.0002}
        shadow-radius={4}
      />
      <directionalLight position={[-4, 5, 4]} intensity={0.45} color="#e8eef5" />
      <directionalLight position={[0, 2, -5]} intensity={0.28} color="#d0d4d8" />
      <ContactShadows
        position={[0, -0.72, 0]}
        opacity={0.35}
        scale={12}
        blur={2.2}
        far={3.5}
        color="#6a6a6a"
      />
      <Grid
        position={[0, -0.75, 0]}
        args={[14, 14]}
        cellSize={0.4}
        cellThickness={0.35}
        cellColor="#9a9a9a"
        sectionSize={1.6}
        sectionThickness={0.5}
        sectionColor="#888888"
        fadeDistance={12}
        fadeStrength={1}
        infiniteGrid
      />
    </>
  );
}
