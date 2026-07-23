"use client";

const logos = ["AeroScan", "FieldVision", "SkyGrid", "TerraMap", "Volta Air"];

export function ClientLogos() {
  return (
    <section className="section-pad border-t border-white/10">
      <p className="text-center text-xs tracking-[0.4em] text-white/40">Trusted by mission teams</p>
      <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-8 md:gap-14">
        {logos.map((name) => (
          <span
            key={name}
            className="font-display text-sm tracking-[0.25em] text-white/25 transition hover:text-white/50"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
