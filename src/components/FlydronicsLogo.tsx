"use client";

type FlydronicsLogoProps = {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
};

export function FlydronicsLogo({
  className = "",
  iconOnly = false,
  size = "md",
  color = "#1890e8",
}: FlydronicsLogoProps) {
  const dimension = size === "sm" ? 24 : size === "lg" ? 40 : 32;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Flydronics Drone Emblem (Transparent Background) */}
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Top Ring Arc */}
        <path
          d="M 41.5 39.8 A 16.5 16.5 0 1 1 58.5 39.8"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Left Ring Arc */}
        <path
          d="M 37.2 49.7 A 16.5 16.5 0 1 0 37.2 70.3"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Right Ring Arc */}
        <path
          d="M 62.8 70.3 A 16.5 16.5 0 1 0 62.8 49.7"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Central Solid Drone Body */}
        <path
          d="
            M 50 20.5
            C 53.5 20.5 54.5 24 54.5 31
            C 54.5 45.5 61.5 54.5 76 56.5
            C 81 57.2 82.5 60 81.5 62.8
            C 80.5 65 77 65 71 63.5
            C 58 60 54 65 54 77
            C 54 84 52.5 86.5 50 86.5
            C 47.5 86.5 46 84 46 77
            C 46 65 42 60 29 63.5
            C 23 65 19.5 65 18.5 62.8
            C 17.5 60 19 57.2 24 56.5
            C 38.5 54.5 45.5 45.5 45.5 31
            C 45.5 24 46.5 20.5 50 20.5 Z
          "
          fill={color}
        />
      </svg>

      {/* Flydronics Brand Wordmark */}
      {!iconOnly && (
        <span
          className={`font-display font-bold uppercase tracking-[0.25em] ${
            size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm"
          } text-[#1a1a1a]`}
        >
          FLYDRONICS
        </span>
      )}
    </div>
  );
}
