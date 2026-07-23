"use client";

type Listener = (active: boolean) => void;

let active = false;
const listeners = new Set<Listener>();

export const autoRotateStore = {
  get active() {
    return active;
  },
  toggle() {
    active = !active;
    listeners.forEach((fn) => fn(active));
  },
  set(value: boolean) {
    if (active === value) return;
    active = value;
    listeners.forEach((fn) => fn(active));
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    fn(active);
    return () => {
      listeners.delete(fn);
    };
  },
};
