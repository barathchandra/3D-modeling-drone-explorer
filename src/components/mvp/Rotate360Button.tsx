"use client";

import { useEffect, useState } from "react";
import { autoRotateStore } from "@/lib/autoRotateStore";

type Rotate360ButtonProps = {
  /** When set, uses local state instead of the global home-page store. */
  active?: boolean;
  onToggle?: () => void;
  className?: string;
};

export function Rotate360Button({ active, onToggle, className = "" }: Rotate360ButtonProps) {
  const [globalActive, setGlobalActive] = useState(autoRotateStore.active);

  useEffect(() => {
    if (onToggle) return;
    return autoRotateStore.subscribe(setGlobalActive);
  }, [onToggle]);

  const isActive = onToggle ? (active ?? false) : globalActive;

  const handleClick = () => {
    if (onToggle) {
      onToggle();
      return;
    }
    autoRotateStore.toggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isActive}
      aria-label={isActive ? "Stop 360 rotation" : "Start 360 rotation"}
      className={`pointer-events-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition ${
        isActive
          ? "border-[#2a3a48] bg-[#2a3a48] text-white shadow-sm"
          : "border-black/[0.12] bg-white/95 text-[#3a3a3a] hover:bg-white"
      } ${className}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full border-2 ${
          isActive ? "border-white border-t-transparent animate-spin" : "border-[#3a3a3a] border-r-transparent"
        }`}
        aria-hidden
      />
      360°
    </button>
  );
}
