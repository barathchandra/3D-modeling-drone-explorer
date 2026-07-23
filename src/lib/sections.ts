import { EXPLODE_SLIDES, type ExplodeSlideMeta } from "./droneComponents";

export type SectionKind = "overview" | "component";

export type SectionDef = {
  id: string;
  kind: SectionKind;
  label: string;
  componentIndex?: number;
};

/** Page 1 overview + 8 component slides */
export const MVP_SECTIONS: SectionDef[] = [
  { id: "overview", kind: "overview", label: "Overview" },
  ...EXPLODE_SLIDES.map((slide, i) => ({
    id: `component-${slide.id}`,
    kind: "component" as const,
    label: slide.title,
    componentIndex: i,
  })),
];

export const SECTION_COUNT = MVP_SECTIONS.length;
export const COMPONENT_COUNT = EXPLODE_SLIDES.length;
export const COMPONENT_START = 1;
export const COMPONENT_END = COMPONENT_START + COMPONENT_COUNT;

export function getActiveComponentIndex(sectionIndex: number): number {
  if (sectionIndex < COMPONENT_START || sectionIndex >= COMPONENT_END) return -1;
  return sectionIndex - COMPONENT_START;
}

export function getComponentMeta(index: number): ExplodeSlideMeta | null {
  if (index < 0 || index >= COMPONENT_COUNT) return null;
  return EXPLODE_SLIDES[index] ?? null;
}
