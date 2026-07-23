import type { Metadata } from "next";
import { ComponentVideoGuide } from "@/components/guides/ComponentVideoGuide";
import { GUIDE_BY_SLUG } from "@/lib/videoGuides";

export const metadata: Metadata = {
  title: "PDB Video Guide — Flydronics",
  description: "Interactive Matek PDB-XT60 video guide with timeline markers.",
};

export default function PdbVideoGuidePage() {
  const guide = GUIDE_BY_SLUG["pdb"]!;
  return <ComponentVideoGuide guide={guide} />;
}
