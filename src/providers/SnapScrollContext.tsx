"use client";

import { createContext, useContext, type ReactNode } from "react";

type SnapScrollContextValue = {
  scrollToSection: (index: number) => void;
};

const SnapScrollContext = createContext<SnapScrollContextValue | null>(null);

export function SnapScrollProvider({
  scrollToSection,
  children,
}: {
  scrollToSection: (index: number) => void;
  children: ReactNode;
}) {
  return (
    <SnapScrollContext.Provider value={{ scrollToSection }}>
      {children}
    </SnapScrollContext.Provider>
  );
}

export function useSnapScroll() {
  const ctx = useContext(SnapScrollContext);
  if (!ctx) {
    throw new Error("useSnapScroll must be used within SnapScrollProvider");
  }
  return ctx;
}
