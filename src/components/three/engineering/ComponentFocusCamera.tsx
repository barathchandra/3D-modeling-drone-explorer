"use client";

import gsap from "gsap";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  FOCUS_TWEEN_DURATION,
  FOCUS_TWEEN_EASE,
  INSPECT_CENTER,
} from "@/lib/componentFocus";
import { focusBoundsStore } from "@/lib/focusBoundsStore";
import { ORBIT_LIMITS } from "@/lib/orbitLimits";
import { PRESENTATION_CAMERA } from "@/lib/scenePresentation";
import { getActiveComponentIndex } from "@/lib/sections";
import { scrollStore } from "@/lib/scrollStore";

const DEFAULT_TARGET = new THREE.Vector3(...PRESENTATION_CAMERA.target);
const DEFAULT_CAMERA = new THREE.Vector3(...PRESENTATION_CAMERA.position);
const FIT_PADDING = 1.22;
const MIN_DISTANCE = ORBIT_LIMITS.minDistance;
const MAX_DISTANCE = ORBIT_LIMITS.maxDistance;

function fitDistanceForSphere(
  radius: number,
  camera: THREE.PerspectiveCamera,
  aspect: number,
): number {
  const vFov = (camera.fov * Math.PI) / 180;
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
  const distV = radius / Math.sin(vFov / 2);
  const distH = radius / Math.sin(hFov / 2);
  return THREE.MathUtils.clamp(Math.max(distV, distH) * FIT_PADDING, MIN_DISTANCE, MAX_DISTANCE);
}

function offsetCameraFromTarget(
  target: THREE.Vector3,
  distance: number,
  direction: THREE.Vector3,
): THREE.Vector3 {
  return target.clone().add(direction.clone().normalize().multiplyScalar(distance));
}

export function ComponentFocusCamera() {
  const { camera, size, controls } = useThree();
  const tween = useRef<gsap.core.Tween | null>(null);
  const viewDir = useRef(
    DEFAULT_CAMERA.clone().sub(DEFAULT_TARGET).normalize(),
  );
  const fitted = useRef({ target: DEFAULT_TARGET.clone(), position: DEFAULT_CAMERA.clone() });

  const applyFit = (slideIndex: number) => {
    const bounds = focusBoundsStore.get(slideIndex);
    const aspect = size.width / Math.max(size.height, 1);
    const target = new THREE.Vector3(...INSPECT_CENTER);
    let distance = fitDistanceForSphere(0.42, camera as THREE.PerspectiveCamera, aspect);

    if (bounds && bounds.radius > 0.001) {
      target.copy(bounds.center);
      distance = fitDistanceForSphere(bounds.radius, camera as THREE.PerspectiveCamera, aspect);
    }

    const position = offsetCameraFromTarget(target, distance, viewDir.current);
    fitted.current.target.copy(target);
    fitted.current.position.copy(position);

    tween.current?.kill();
    tween.current = gsap.to(camera.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: FOCUS_TWEEN_DURATION,
      ease: FOCUS_TWEEN_EASE,
      overwrite: true,
      onUpdate: () => {
        const ctrl = controls as OrbitControlsImpl | null;
        if (ctrl) {
          ctrl.target.copy(target);
          ctrl.update();
        }
      },
    });

    const ctrl = controls as OrbitControlsImpl | null;
    if (ctrl) {
      gsap.to(ctrl.target, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: FOCUS_TWEEN_DURATION,
        ease: FOCUS_TWEEN_EASE,
        overwrite: true,
        onUpdate: () => ctrl.update(),
      });
    }
  };

  const applyOverview = () => {
    const bounds = focusBoundsStore.getOverview();
    if (bounds && bounds.radius > 0.001) {
      const aspect = size.width / Math.max(size.height, 1);
      const target = bounds.center.clone();
      const distance = fitDistanceForSphere(
        bounds.radius,
        camera as THREE.PerspectiveCamera,
        aspect,
      );
      const position = offsetCameraFromTarget(target, distance, viewDir.current);
      fitted.current.target.copy(target);
      fitted.current.position.copy(position);

      tween.current?.kill();
      tween.current = gsap.to(camera.position, {
        x: position.x,
        y: position.y,
        z: position.z,
        duration: FOCUS_TWEEN_DURATION,
        ease: FOCUS_TWEEN_EASE,
        overwrite: true,
        onUpdate: () => {
          const ctrl = controls as OrbitControlsImpl | null;
          if (ctrl) {
            ctrl.target.copy(target);
            ctrl.update();
          }
        },
      });
      const ctrl = controls as OrbitControlsImpl | null;
      if (ctrl) {
        gsap.to(ctrl.target, {
          x: target.x,
          y: target.y,
          z: target.z,
          duration: FOCUS_TWEEN_DURATION,
          ease: FOCUS_TWEEN_EASE,
          overwrite: true,
          onUpdate: () => ctrl.update(),
        });
      }
      return;
    }

    fitted.current.target.copy(DEFAULT_TARGET);
    fitted.current.position.copy(DEFAULT_CAMERA);
    tween.current?.kill();
    tween.current = gsap.to(camera.position, {
      x: DEFAULT_CAMERA.x,
      y: DEFAULT_CAMERA.y,
      z: DEFAULT_CAMERA.z,
      duration: FOCUS_TWEEN_DURATION,
      ease: FOCUS_TWEEN_EASE,
      overwrite: true,
      onUpdate: () => {
        const ctrl = controls as OrbitControlsImpl | null;
        if (ctrl) {
          ctrl.target.copy(DEFAULT_TARGET);
          ctrl.update();
        }
      },
    });
    const ctrl = controls as OrbitControlsImpl | null;
    if (ctrl) {
      gsap.to(ctrl.target, {
        x: DEFAULT_TARGET.x,
        y: DEFAULT_TARGET.y,
        z: DEFAULT_TARGET.z,
        duration: FOCUS_TWEEN_DURATION,
        ease: FOCUS_TWEEN_EASE,
        overwrite: true,
        onUpdate: () => ctrl.update(),
      });
    }
  };

  useEffect(() => {
    const onSection = (section: number) => {
      const active = getActiveComponentIndex(section);
      if (section === 0 || active < 0) {
        applyOverview();
        return;
      }
      applyFit(active);
    };

    const onBounds = () => {
      if (scrollStore.sectionIndex === 0) {
        applyOverview();
        return;
      }
      const active = getActiveComponentIndex(scrollStore.sectionIndex);
      if (active >= 0) applyFit(active);
    };

    onSection(scrollStore.sectionIndex);
    const unsubSection = scrollStore.subscribeSection(onSection);
    const unsubBounds = focusBoundsStore.subscribe(onBounds);
    return () => {
      unsubSection();
      unsubBounds();
      tween.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- camera rig reacts to viewport + scroll
  }, [camera, size.width, size.height, controls]);

  useEffect(
    () =>
      scrollStore.subscribeOrbitReset(() => {
        camera.position.copy(fitted.current.position);
        const ctrl = controls as OrbitControlsImpl | null;
        if (ctrl) {
          ctrl.target.copy(fitted.current.target);
          ctrl.update();
        }
        if (controls) {
          viewDir.current
            .copy(camera.position)
            .sub(ctrl?.target ?? fitted.current.target)
            .normalize();
        }
      }),
    [camera, controls],
  );

  return null;
}
