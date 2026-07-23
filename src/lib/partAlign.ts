import * as THREE from "three";
import { INSPECT_CENTER } from "./componentFocus";

const ANCHOR = new THREE.Vector3(...INSPECT_CENTER);

/** World-space bounds of visible meshes only. */
export function getVisibleWorldBounds(root: THREE.Object3D): THREE.Box3 | null {
  const box = new THREE.Box3();
  let empty = true;

  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh) || !obj.visible) return;
    box.expandByObject(obj);
    empty = false;
  });

  return empty ? null : box;
}

/**
 * Places `outer` so visible content in `inner` sits at the inspect anchor.
 * Position/scale must be set on `outer` before calling.
 */
export function alignPartToInspectCenter(
  outer: THREE.Object3D,
  inner: THREE.Object3D,
): THREE.Box3 | null {
  outer.updateWorldMatrix(true, true);
  const box = getVisibleWorldBounds(inner);
  if (!box) return null;

  const worldCenter = box.getCenter(new THREE.Vector3());
  outer.position.add(ANCHOR.clone().sub(worldCenter));

  outer.updateWorldMatrix(true, true);
  return getVisibleWorldBounds(inner);
}

export function getInspectAnchor(): THREE.Vector3 {
  return ANCHOR.clone();
}
