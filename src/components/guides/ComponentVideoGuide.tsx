"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { type ComponentGuideConfig, type GuideMarker, formatClock } from "@/lib/videoGuides";
import { ComponentGuideCanvas } from "./ComponentGuideCanvas";

export function ComponentVideoGuide({ guide }: { guide: ComponentGuideConfig }) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [videoActiveId, setVideoActiveId] = useState<string | null>(null);
  const [scrollActiveId, setScrollActiveId] = useState<string | null>(guide.markers[0]?.id ?? null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const markerRefs = useRef<(HTMLElement | null)[]>([]);

  const activeId     = videoActiveId ?? scrollActiveId;
  const activeMarker = guide.markers.find((m) => m.id === activeId);

  /* Scroll-driven activation */
  useEffect(() => {
    const els = markerRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = markerRefs.current.indexOf(e.target as HTMLElement);
            if (i >= 0) setScrollActiveId(guide.markers[i]?.id ?? null);
          }
        }
      },
      { threshold: 0.55 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [guide.markers]);

  const seekTo = useCallback((marker: GuideMarker) => {
    const v = videoRef.current; if (!v) return;
    v.currentTime = marker.timeSeconds;
    v.pause();
    setVideoActiveId(marker.id);
    setExpandedId(marker.id);
  }, []);

  const playFrom = useCallback((marker: GuideMarker) => {
    const v = videoRef.current; if (!v) return;
    v.currentTime = marker.timeSeconds;
    v.play().catch(() => undefined);
    setVideoActiveId(marker.id);
  }, []);

  const toggleExpand = (marker: GuideMarker) => {
    setExpandedId((prev) => (prev === marker.id ? null : marker.id));
    seekTo(marker);
  };

  return (
    <div className="min-h-screen bg-[#f2f3f4]">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
          <div className="flex items-center gap-4">
            <Link href="/"
              className="rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[12px] text-[#2a2a2a] transition hover:bg-black/[0.04]">
              ← Explorer
            </Link>
            <span className="hidden h-4 w-px bg-black/[0.1] md:block" />
            <div className="hidden md:block">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#6b6b6b]">
                {guide.eyebrow} · Assembly Guide
              </p>
              <p className="text-sm font-semibold text-[#1a1a1a]">{guide.title}</p>
            </div>
          </div>
          {activeMarker && (
            <div className="hidden items-center gap-2 md:flex">
              <span className="rounded-md bg-[#2a3a48] px-2.5 py-1 font-mono text-[11px] text-white">
                {activeMarker.timeLabel}
              </span>
              <span className="text-sm font-medium text-[#1a1a1a]">{activeMarker.title}</span>
            </div>
          )}
        </div>
      </header>

      {/* ── Row 1: Video + Timeline side by side ── */}
      <section className="mx-auto max-w-7xl px-6 pt-8 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">

          {/* Video */}
          <div className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-2xl bg-black shadow-xl shadow-black/[0.14]">
              <video ref={videoRef} className="aspect-video w-full bg-black"
                src={guide.videoPath} controls playsInline preload="metadata"
                onTimeUpdate={() => {
                  const t = videoRef.current?.currentTime ?? 0;
                  const near = guide.markers.find((m) => Math.abs(m.timeSeconds - t) < 0.65);
                  setVideoActiveId(near?.id ?? null);
                }}
                onPause={() => setVideoActiveId(null)}
                onEnded={() => setVideoActiveId(null)}>
                Your browser does not support video.
              </video>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#5a5a5a]">{guide.description}</p>
          </div>

          {/* Timeline */}
          <aside className="w-full shrink-0 md:w-[320px] lg:w-[360px]" aria-label="Video timeline">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.28em] text-[#6b6b6b]">
              Timeline · {guide.title}
            </p>
            <p className="mb-4 text-[12px] text-[#7a7a7a]">
              Click a marker to pause the video at that moment. Scroll to activate the 3D view below.
            </p>

            <ol className="space-y-2.5">
              {guide.markers.map((marker, idx) => {
                const isActive   = activeId === marker.id;
                const isExpanded = expandedId === marker.id;
                return (
                  <li key={marker.id} ref={(el) => { markerRefs.current[idx] = el; }}>
                    <div className={`rounded-xl border transition-all duration-200 ${
                      isActive
                        ? "border-[#2a3a48] bg-white shadow-md shadow-black/[0.06]"
                        : "border-black/[0.08] bg-white/80"
                    }`}>
                      <div className="flex items-center gap-2 p-3">
                        <button type="button" onClick={() => seekTo(marker)}
                          className="flex min-w-0 flex-1 items-center gap-3 rounded-lg px-1 py-1 text-left transition hover:bg-black/[0.03]">
                          <span className={`shrink-0 rounded-lg px-2.5 py-1.5 font-mono text-[11px] tabular-nums ${
                            isActive ? "bg-[#2a3a48] text-white" : "bg-black/[0.06] text-[#4a4a4a]"
                          }`}>
                            {marker.timeLabel}
                          </span>
                          <span className="min-w-0">
                            <span className={`block text-[13px] font-semibold ${isActive ? "text-[#1a1a1a]" : "text-[#2a2a2a]"}`}>
                              {marker.title}
                            </span>
                            <span className="mt-0.5 block text-[11px] text-[#7a7a7a]">
                              {formatClock(marker.timeSeconds)}
                            </span>
                          </span>
                        </button>
                        <button type="button" onClick={() => toggleExpand(marker)}
                          className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] transition ${
                            isExpanded
                              ? "bg-[#2a3a48] text-white"
                              : "border border-black/[0.08] text-[#4a4a4a] hover:bg-black/[0.04]"
                          }`}
                          aria-expanded={isExpanded}>
                          {isExpanded ? "Hide" : "Info"}
                        </button>
                      </div>

                      {isActive && !isExpanded && (
                        <div className="border-t border-black/[0.06] px-4 py-2.5">
                          <p className="text-[12px] leading-relaxed text-[#4a4a4a]">{marker.summary}</p>
                        </div>
                      )}

                      {isExpanded && (
                        <div className="border-t border-black/[0.06] px-4 pb-4 pt-3">
                          <p className="text-[13px] leading-relaxed text-[#3a3a3a]">{marker.summary}</p>
                          <ul className="mt-3 space-y-2">
                            {marker.details.map((line) => (
                              <li key={line} className="flex items-start gap-2 text-[12px] text-[#4a4a4a]">
                                <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[#2a3a48]" />
                                <span className="leading-relaxed">{line}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex gap-2">
                            <button type="button" onClick={() => playFrom(marker)}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2a3a48] px-3 py-2 text-[11px] font-medium text-white transition hover:bg-[#223040]">
                              ▶ Play from {marker.timeLabel}
                            </button>
                            <button type="button" onClick={() => seekTo(marker)}
                              className="rounded-lg border border-black/[0.08] px-3 py-2 text-[11px] text-[#4a4a4a] transition hover:bg-black/[0.04]">
                              Pause here
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </aside>
        </div>
      </section>

      {/* ── Row 2: 3D Component view ── */}
      <section className="mx-auto mt-10 max-w-7xl px-6 pb-20 md:px-10">
        <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-lg shadow-black/[0.05]">
          <div className="border-b border-black/[0.06] px-8 py-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#6b6b6b]">
                  3D Component View
                </p>
                <p className="mt-0.5 text-base font-semibold text-[#1a1a1a]">
                  {activeMarker ? activeMarker.title : guide.title}
                </p>
                {activeMarker && (
                  <p className="mt-0.5 max-w-lg text-[12px] text-[#6b6b6b]">{activeMarker.summary}</p>
                )}
              </div>
              <div className="flex items-center gap-4 text-[11px] text-[#7a7a7a]">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-sm bg-[#3d6b8a]" />
                  Active component
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-sm bg-[#2a2e32] opacity-70" />
                  Drone structure
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 pt-5" style={{ height: 520 }}>
            <ComponentGuideCanvas componentId={guide.componentId} />
          </div>

          <div className="border-t border-black/[0.05] px-8 py-3">
            <p className="text-[11px] text-[#8a8a8a]">
              Drag to rotate · Scroll to zoom ·{" "}
              <span className="text-[#2a3a48]">360°</span> starts auto-rotation
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
