"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/lib/scrollStore";

type Props = { onTop: () => void };

export function BackToTop({ onTop }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    return scrollStore.subscribeSection((idx) => setShow(idx > 2));
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={onTop}
      className="pointer-events-auto fixed bottom-6 right-6 z-30 glass rounded-full p-3 text-[10px] uppercase tracking-widest text-white/70 hover:text-fly-neon md:right-10"
      data-cursor-hover
      aria-label="Back to top"
    >
      ↑ Top
    </button>
  );
}
