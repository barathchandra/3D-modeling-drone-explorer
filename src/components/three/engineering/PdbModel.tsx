"use client";

import type { ReactNode } from "react";
import { LazyGlbPart } from "./LazyGlbPart";

import { MODEL_PATHS } from "@/lib/modelPaths";
import { INSPECT_TARGET_SIZE } from "@/lib/componentFocus";

const MODEL_PATH = MODEL_PATHS.pdb;
const TARGET_SIZE = INSPECT_TARGET_SIZE;
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
      placeholder={placeholder}
    />
  );
}

export { MODEL_PATH as PDB_MODEL_PATH };
