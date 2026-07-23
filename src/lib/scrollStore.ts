"use client";

type SectionListener = (index: number) => void;
type OrbitResetListener = () => void;

let sectionIndex = 0;

const sectionListeners = new Set<SectionListener>();
const orbitResetListeners = new Set<OrbitResetListener>();

export const scrollStore = {
  get sectionIndex() {
    return sectionIndex;
  },
  setSectionIndex(index: number) {
    sectionIndex = Math.max(0, index);
    sectionListeners.forEach((fn) => fn(sectionIndex));
  },
  subscribeSection(fn: SectionListener) {
    sectionListeners.add(fn);
    fn(sectionIndex);
    return () => {
      sectionListeners.delete(fn);
    };
  },
  requestOrbitReset() {
    orbitResetListeners.forEach((fn) => fn());
  },
  subscribeOrbitReset(fn: OrbitResetListener) {
    orbitResetListeners.add(fn);
    return () => {
      orbitResetListeners.delete(fn);
    };
  },
};
