import * as THREE from "three";

function weaveNormalMap(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);
  for (let y = 0; y < size; y += 4) {
    for (let x = 0; x < size; x += 4) {
      const v = ((x + y) / 4) % 2 === 0 ? 140 : 200;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x, y, 4, 4);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  return tex;
}

const weaveMap = typeof document !== "undefined" ? weaveNormalMap() : null;

export function carbonFiberMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#14181c"),
    metalness: 0.35,
    roughness: 0.28,
    clearcoat: 0.85,
    clearcoatRoughness: 0.12,
    normalMap: weaveMap ?? undefined,
    normalScale: new THREE.Vector2(0.35, 0.35),
    envMapIntensity: 1.8,
  });
}

export function brushedAluminumMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#b8bcc4"),
    metalness: 0.95,
    roughness: 0.22,
    envMapIntensity: 2,
  });
}

export function anodizedMaterial(color = "#2a3544") {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.88,
    roughness: 0.32,
    envMapIntensity: 1.6,
  });
}

export function copperMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#c9783a"),
    metalness: 0.92,
    roughness: 0.35,
    envMapIntensity: 1.4,
  });
}

export function pcbMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#1a5c38"),
    metalness: 0.15,
    roughness: 0.65,
    envMapIntensity: 0.8,
  });
}

export function pcbChipMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#111"),
    metalness: 0.6,
    roughness: 0.4,
  });
}

export function batteryMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#1a2218"),
    metalness: 0.2,
    roughness: 0.55,
    clearcoat: 0.3,
  });
}

export function lensMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#0a1520"),
    metalness: 0.15,
    roughness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2,
  });
}

export function wireMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#1a1a1a"),
    metalness: 0.5,
    roughness: 0.5,
  });
}

export function screwMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#8a9098"),
    metalness: 0.92,
    roughness: 0.38,
    envMapIntensity: 1.5,
  });
}

export function plasticMaterial(color = "#2a3038") {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.05,
    roughness: 0.62,
    clearcoat: 0.15,
  });
}

export function connectorMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#d4af37"),
    metalness: 0.85,
    roughness: 0.25,
    envMapIntensity: 1.8,
  });
}
