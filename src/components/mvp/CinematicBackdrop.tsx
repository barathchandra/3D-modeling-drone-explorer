"use client";

export function CinematicBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-aerospace-ash" />
      <div className="absolute inset-0 bg-aerospace-vignette" />
      <div className="absolute inset-0 bg-premium-grain opacity-[0.12]" />
    </div>
  );
}
