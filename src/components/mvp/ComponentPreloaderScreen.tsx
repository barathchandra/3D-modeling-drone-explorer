"use client";

import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FlydronicsLogo } from "@/components/FlydronicsLogo";

const COMPONENT_LIST = [
  { id: "overview", label: "Overview" },
  { id: "propellers", label: "Propellers" },
  { id: "motors", label: "Motors" },
  { id: "esc", label: "ESC" },
  { id: "battery", label: "Battery" },
  { id: "fc", label: "Flight Controller" },
  { id: "pixhawk", label: "Pixhawk" },
  { id: "pdb", label: "Power Distribution Board (PDB)" },
  { id: "gps", label: "GPS Module" },
  { id: "camera", label: "Camera/Gimbal" },
  { id: "airframe", label: "Airframe" },
  { id: "remote", label: "Remote Controller" },
];

export function ComponentPreloaderScreen() {
  const { progress, active, loaded, total } = useProgress();
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [userDismissed, setUserDismissed] = useState(false);

  // Smooth minimum loading window to ensure clean transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const [simulatedProgress, setSimulatedProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedProgress((prev) => {
        const target = Math.max(progress, loaded > 0 ? (loaded / Math.max(total, 12)) * 100 : 0);
        if (prev < target) {
          return Math.min(target, prev + 5);
        }
        if (minTimeElapsed && target >= 95) {
          return 100;
        }
        return Math.min(98, prev + 2);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [progress, loaded, total, minTimeElapsed]);

  const displayProgress = Math.round(simulatedProgress);
  const isLoaded = displayProgress >= 100 || (!active && minTimeElapsed);

  return (
    <AnimatePresence>
      {!userDismissed && (
        <motion.div
          key="preloader-light"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#bfbfbf] p-4 text-[#1a1a1a] select-none md:p-8"
        >
          {/* Subtle background overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/5 pointer-events-none" />

          {/* Light Frosted Glass Container matching Component Lab template */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-xl md:max-w-2xl 2xl:max-w-3xl rounded-2xl border border-black/[0.08] bg-[rgba(255,255,255,0.92)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl md:p-8 2xl:p-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
              <div>
                <FlydronicsLogo size="sm" />
                <h1 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-[#1a1a1a] md:text-2xl">
                  Loading Components
                </h1>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-bold text-[#2a2a2a]">
                  {String(Math.min(12, Math.floor((displayProgress / 100) * 12))).padStart(2, "0")} / 12
                </span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#6b6b6b]">Ready</p>
              </div>
            </div>

            {/* Progress Display */}
            <div className="mt-6">
              <div className="flex items-end justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6b6b]">
                  Progress
                </span>
                <span className="font-mono text-2xl font-bold text-[#2a2a2a]">
                  {displayProgress}%
                </span>
              </div>

              {/* Progress Bar matching Left Nav style */}
              <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-[#3d5a6e] transition-[width] duration-300 ease-out"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
            </div>

            {/* Component Status Grid */}
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {COMPONENT_LIST.map((comp, idx) => {
                const threshold = ((idx + 1) / COMPONENT_LIST.length) * 100;
                const isCompLoaded = displayProgress >= threshold || isLoaded;

                return (
                  <div
                    key={comp.id}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs transition-colors ${
                      isCompLoaded
                        ? "border-black/[0.08] bg-white text-[#1a1a1a] shadow-sm"
                        : "border-black/[0.04] bg-black/[0.02] text-[#8a8a8a]"
                    }`}
                  >
                    <span className="truncate font-medium">{comp.label}</span>
                    {isCompLoaded ? (
                      <span className="ml-1 shrink-0 text-[11px] font-bold text-[#3d5a6e]">
                        ✓
                      </span>
                    ) : (
                      <span className="ml-1 h-2 w-2 shrink-0 animate-ping rounded-full bg-black/20" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Action / Status */}
            <div className="mt-7 flex items-center justify-between border-t border-black/[0.06] pt-4">
              <p className="text-xs text-[#6b6b6b]">
                {isLoaded ? "All 3D models initialized." : "Preloading 3D models into memory..."}
              </p>

              {isLoaded ? (
                <button
                  type="button"
                  onClick={() => setUserDismissed(true)}
                  className="rounded-lg bg-[#2a2a2a] px-5 py-2.5 text-xs font-medium text-white shadow-sm transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-black/20"
                >
                  Enter Explorer →
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs text-[#5a5a5a]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3d5a6e]" />
                  <span>Loading...</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
