"use client";

type FlydronicsLogoProps = {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
};

export function FlydronicsLogo({
  className = "",
  iconOnly = false,
  size = "md",
  dark = true,
}: FlydronicsLogoProps) {
  if (iconOnly) return null;

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Render text-only branding watermark */}
      <span
        className={`font-display font-semibold uppercase tracking-[0.25em] ${
          size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm"
        } ${dark ? "text-[#1a1a1a]" : "text-white"}`}
      >
        FLYDRONICS
      </span>
    </div>
  );
}
