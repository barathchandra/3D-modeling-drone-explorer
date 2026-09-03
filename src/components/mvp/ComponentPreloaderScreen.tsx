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

  // Brief smooth transition buffer (400ms instead of 2200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const [simulatedProgress, setSimulatedProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedProgress((prev) => {
        // Real progress from drei useProgress or quick ascent once initial overview loaded
        const target = Math.max(progress, loaded > 0 ? (loaded / Math.max(total, 2)) * 100 : 0);
        if (prev < target) {
          return Math.min(target, prev + 12);
        }
        if (minTimeElapsed && (!active || target >= 90)) {
          return 100;
        }
        return Math.min(100, prev + 8);
      });
    }, 25);

    return () => clearInterval(interval);
  }, [progress, loaded, total, active, minTimeElapsed]);

  const displayProgress = Math.min(100, Math.round(simulatedProgress));
  const isLoaded = displayProgress >= 100 || (!active && minTimeElapsed);

  // Auto-dismiss smoothly once loaded so user does not need to wait or click
  useEffect(() => {
    if (isLoaded && !userDismissed) {
      const autoDismiss = setTimeout(() => {
        setUserDismissed(true);
      }, 500);
      return () => clearTimeout(autoDismiss);
    }
  }, [isLoaded, userDismissed]);

  return (
    <AnimatePresence>
      {!userDismissed && (
        <motion.div
          key="preloader-light"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#bfbfbf] p-3 text-[#1a1a1a] select-none sm:p-6 md:p-8"
        >
          {/* Subtle background overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/5 pointer-events-none" />

          {/* Light Frosted Glass Container - responsive & scrollable on small mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-black/[0.08] bg-[rgba(255,255,255,0.94)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:p-6 md:p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 sm:pb-4">
              <div>
                <FlydronicsLogo size="sm" />
                <h1 className="mt-1 font-display text-lg font-semibold tracking-tight text-[#1a1a1a] sm:text-xl md:text-2xl">
                  Loading Components
                </h1>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold text-[#2a2a2a] sm:text-sm">
                  {String(Math.min(12, Math.floor((displayProgress / 100) * 12))).padStart(2, "0")} / 12
                </span>
                <p className="text-[9px] uppercase tracking-[0.15em] text-[#6b6b6b] sm:text-[10px]">Ready</p>
              </div>
            </div>

            {/* Progress Display */}
            <div className="mt-4 sm:mt-6">
              <div className="flex items-end justify-between">
                <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#6b6b6b] sm:text-[10px]">
                  Progress
                </span>
                <span className="font-mono text-xl font-bold text-[#2a2a2a] sm:text-2xl">
                  {displayProgress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06] sm:h-2">
                <motion.div
                  className="h-full rounded-full bg-[#3d5a6e] transition-[width] duration-200 ease-out"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
            </div>

            {/* Component Status Grid (responsive cols) */}
            <div className="mt-4 grid grid-cols-2 gap-1.5 sm:mt-6 sm:gap-2 sm:grid-cols-3">
              {COMPONENT_LIST.map((comp, idx) => {
                const threshold = ((idx + 1) / COMPONENT_LIST.length) * 100;
                const isCompLoaded = displayProgress >= threshold || isLoaded;

                return (
                  <div
                    key={comp.id}
                    className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-[11px] transition-colors sm:px-3 sm:py-2 sm:text-xs ${
                      isCompLoaded
                        ? "border-black/[0.08] bg-white text-[#1a1a1a] shadow-sm"
                        : "border-black/[0.04] bg-black/[0.02] text-[#8a8a8a]"
                    }`}
                  >
                    <span className="truncate font-medium">{comp.label}</span>
                    {isCompLoaded ? (
                      <span className="ml-1 shrink-0 text-[10px] font-bold text-[#3d5a6e] sm:text-[11px]">
                        ✓
                      </span>
                    ) : (
                      <span className="ml-1 h-1.5 w-1.5 shrink-0 animate-ping rounded-full bg-black/20" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Action / Status */}
            <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-3 sm:mt-7 sm:pt-4">
              <p className="text-[11px] text-[#6b6b6b] sm:text-xs">
                {isLoaded ? "Ready — entering explorer..." : "Loading 3D scene..."}
              </p>

              <button
                type="button"
                onClick={() => setUserDismissed(true)}
                className="rounded-lg bg-[#2a2a2a] px-3.5 py-2 text-[11px] font-medium text-white shadow-sm transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-black/20 sm:px-5 sm:py-2.5 sm:text-xs"
              >
                {isLoaded ? "Enter Explorer →" : "Skip to Explorer →"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
