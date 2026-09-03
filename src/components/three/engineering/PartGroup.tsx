"use client";

import gsap from "gsap";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  FOCUS_TWEEN_DURATION,
  FOCUS_TWEEN_EASE,
  getPartFocusState,
} from "@/lib/componentFocus";
import { getActiveComponentIndex } from "@/lib/sections";
import { scrollStore } from "@/lib/scrollStore";

type PartGroupProps = {
  slideIndex: number;
  children: React.ReactNode;
};

export function PartGroup({ slideIndex, children }: PartGroupProps) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  const focus = useRef({
    px: 0,
    py: 0,
    pz: 0,
    scale: 1,
  });

  const activeSlide = useRef(-1);
  const isOverview = useRef(true);
  const tween = useRef<gsap.core.Tween | null>(null);

  const tweenToFocus = (section: number) => {
    const overview = section === 0;
    const activeIndex = getActiveComponentIndex(section);
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
    const { px, py, pz, scale } = focus.current;
    outer.current.position.set(px, py, pz);
    outer.current.scale.setScalar(scale);
  });

  return (
    <group ref={outer}>
      <group ref={inner}>{children}</group>
    </group>
  );
}
