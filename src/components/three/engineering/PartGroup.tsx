"use client";

import gsap from "gsap";
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import {
  FOCUS_TWEEN_DURATION,
  FOCUS_TWEEN_EASE,
  getPartFocusState,
} from "@/lib/componentFocus";
import { focusBoundsStore } from "@/lib/focusBoundsStore";
import { getActiveComponentIndex } from "@/lib/sections";
import { scrollStore } from "@/lib/scrollStore";

type PartGroupProps = {
  slideIndex: number;
  children: React.ReactNode;
};

export function PartGroup({ slideIndex, children }: PartGroupProps) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const pivot = useRef(new THREE.Vector3());
  const pivotReady = useRef(false);

  const focus = useRef({
    px: 0,
    py: 0,
    pz: 0,
    scale: 1,
  });

  const activeSlide = useRef(-1);
  const isOverview = useRef(true);
  const tween = useRef<gsap.core.Tween | null>(null);

  const recalcPivot = () => {
    if (!inner.current) return false;
    const box = new THREE.Box3().setFromObject(inner.current);
    if (box.isEmpty()) return false;
    box.getCenter(pivot.current);
    pivotReady.current = true;
    return true;
  };

  useLayoutEffect(() => {
    pivotReady.current = false;
    recalcPivot();
  }, []);

  const tweenToFocus = (section: number) => {
    const overview = section === 0;
    const activeIndex = getActiveComponentIndex(section);

    if (activeSlide.current !== activeIndex || isOverview.current !== overview) {
      pivotReady.current = false;
    }

    isOverview.current = overview;
    activeSlide.current = activeIndex;

    const target = getPartFocusState(slideIndex, activeIndex, overview);

    tween.current?.kill();
    tween.current = gsap.to(focus.current, {
      px: target.position[0],
      py: target.position[1],
      pz: target.position[2],
      scale: target.scale,
      duration: FOCUS_TWEEN_DURATION,
      ease: FOCUS_TWEEN_EASE,
      overwrite: true,
    });
  };

  useEffect(() => {
    const onSection = (section: number) => tweenToFocus(section);
    onSection(scrollStore.sectionIndex);
    return scrollStore.subscribeSection(onSection);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- slideIndex scopes PartGroup identity
  }, [slideIndex]);

  useFrame(() => {
    if (!outer.current) return;
    if (!pivotReady.current) recalcPivot();

    const inspecting = !isOverview.current && activeSlide.current === slideIndex;
    const { px, py, pz, scale } = focus.current;

    const position = new THREE.Vector3(px, py, pz);
    if (inspecting && pivotReady.current) {
      position.sub(pivot.current.clone().multiplyScalar(scale));
    }

    outer.current.position.copy(position);
    outer.current.scale.setScalar(scale);

    if (inspecting) {
      const box = new THREE.Box3().setFromObject(outer.current);
      if (!box.isEmpty()) {
        const sphere = new THREE.Sphere();
        box.getBoundingSphere(sphere);
        focusBoundsStore.set(slideIndex, {
          center: sphere.center.clone(),
          radius: Math.max(sphere.radius, 0.08),
        });
      }
    } else {
      focusBoundsStore.clearSlide(slideIndex);
    }
  });

  return (
    <group ref={outer}>
      <group ref={inner}>{children}</group>
    </group>
  );
}
