import { EXPLODE_SLIDES, type ExplodeSlideId } from "./droneComponents";
import { MVP_SECTIONS } from "./sections";

const DISPLAY_LABELS: Partial<Record<ExplodeSlideId, string>> = {
  pdb: "Power Distribution Board (PDB)",
  camera: "FPV Camera",
  "flight-controller": "Flight Controller",
  pixhawk: "Cube Orange+ Autopilot",
  airframe: "Drone Frame",
  "remote-controller": "FlySky FS-i6 Transmitter",
};

export type ExplorerNavItem = {
  sectionIndex: number;
  label: string;
};

export const EXPLORER_NAV_ITEMS: ExplorerNavItem[] = MVP_SECTIONS.map((section, sectionIndex) => {
  if (section.kind === "overview") {
    return { sectionIndex, label: "Overview" };
  }
  const slide = EXPLODE_SLIDES[section.componentIndex ?? 0];
  const label =
    slide && DISPLAY_LABELS[slide.id]
      ? DISPLAY_LABELS[slide.id]!
      : slide
        ? titleCase(slide.title)
        : section.label;
  return { sectionIndex, label };
});

function titleCase(title: string): string {
  return title
    .split(" ")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}
