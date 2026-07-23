"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { scrollStore } from "@/lib/scrollStore";

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    return scrollStore.subscribeSection((idx) => setVisible(idx === 0));
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pointer-events-none fixed bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-3"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5"
      >
        <span className="h-2 w-1 rounded-full bg-fly-neon" />
      </motion.div>
      <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">Scroll to Explore</p>
    </motion.div>
  );
}
