import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

export function prepareGltfScene(scene: THREE.Object3D, targetSize: number): THREE.Object3D {
  const cloned = SkeletonUtils.clone(scene) as THREE.Object3D;
  cloned.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return;
    node.castShadow = true;
    node.receiveShadow = true;
    if (Array.isArray(node.material)) {
      node.material = node.material.map((m) => m.clone());
    } else if (node.material) {
      node.material = node.material.clone();
    }
  });

  const box = new THREE.Box3().setFromObject(cloned);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = targetSize / maxDim;

  cloned.position.sub(center);
  cloned.scale.setScalar(scale);

  return cloned;
}
