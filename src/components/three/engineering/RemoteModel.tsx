"use client";

import type { ReactNode } from "react";
import { MODEL_PATHS } from "@/lib/modelPaths";
import { INSPECT_TARGET_SIZE } from "@/lib/componentFocus";
import { LazyGlbPart } from "./LazyGlbPart";

const MODEL_PATH = MODEL_PATHS.remote;
const TARGET_SIZE = INSPECT_TARGET_SIZE;
const REMOTE_SLIDE_INDEX = 10;

type RemoteModelProps = {
  placeholder: ReactNode;
};

export function RemoteModel({ placeholder }: RemoteModelProps) {
  return (
    <LazyGlbPart
      modelPath={MODEL_PATH}
      targetSize={TARGET_SIZE}
      slideIndex={REMOTE_SLIDE_INDEX}
      placeholder={placeholder}
    />
  );
}

export { MODEL_PATH as REMOTE_MODEL_PATH };
