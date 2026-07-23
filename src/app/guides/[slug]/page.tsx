import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentVideoGuide } from "@/components/guides/ComponentVideoGuide";
import { COMPONENT_GUIDES, GUIDE_BY_SLUG } from "@/lib/videoGuides";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return COMPONENT_GUIDES
    .filter((g) => g.slug !== "pdb")   // pdb has its own static route
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDE_BY_SLUG[slug];
  if (!guide) return { title: "Guide not found" };
  return {
    title: `${guide.title} Video Guide — Flydronics`,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDE_BY_SLUG[slug];
  if (!guide) notFound();
  return <ComponentVideoGuide guide={guide} />;
}
