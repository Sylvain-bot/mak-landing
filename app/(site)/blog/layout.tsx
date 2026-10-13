import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { blogSchema } from "@/lib/schemas/blog.schema";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog Kiné | Ressources cliniques et pratique libérale — Mon Assistant Kiné",
  description: "Guides cliniques, ressources bibliographiques et conseils pour la pratique libérale des kinésithérapeutes. Rédigé par des kinés D.E.",
  alternates: {
    canonical: "https://www.monassistantkine.fr/blog",
  },
  openGraph: {
    title: "Blog — Ressources pour kinésithérapeutes libéraux",
    url: "https://www.monassistantkine.fr/blog",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={blogSchema} />
      {children}
    </>
  );
}
