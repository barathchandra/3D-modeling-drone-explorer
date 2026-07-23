"use client";

import type { ReactNode } from "react";
import { LazyGlbPart } from "./LazyGlbPart";

import { MODEL_PATHS } from "@/lib/modelPaths";

const MODEL_PATH = MODEL_PATHS.pdb;
const TARGET_SIZE = 0.18;
const PDB_SLIDE_INDEX = 6;

type Props = {
  placeholder: ReactNode;
};

export function PdbModel({ placeholder }: Props) {
  return (
    <LazyGlbPart
      modelPath={MODEL_PATH}
      targetSize={TARGET_SIZE}
      slideIndex={PDB_SLIDE_INDEX}
      position={[0, 0.02, 0]}
      placeholder={placeholder}
    />
  );
}

export { MODEL_PATH as PDB_MODEL_PATH };
