/* eslint-disable @typescript-eslint/no-explicit-any */
import { use } from "react";
import { fetchMods, fetchModMeta } from "@lib/mods.lib";
import { ModPageClient } from "./ModPageClient";
import type { Metadata } from "next";

// @TODO: fix type error
interface Props {
  params: any;
  searchParams: any;
}

export default function ModPage(props: Props) {
  const params = use(Promise.resolve(props.params));
  const { slug } = params;

  return <ModPageClient slug={slug} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  try {
    const mods = await fetchMods();
    const mod = mods.find((m) => m.name.toLowerCase() === slug.toLowerCase());

    if (!mod) {
      return {
        title: "Mod Not Found | dskt.cc",
        description: "The requested mod could not be found.",
        openGraph: {
          title: "Mod Not Found | dskt.cc",
          description: "The requested mod could not be found.",
        },
      };
    }

    const meta = await fetchModMeta(mod.repo);

    return {
      title: `${mod.name} | dskt.cc`,
      description: meta.description,
      openGraph: {
        title: `${mod.name} | dskt.cc`,
        description: meta.description,
        type: "article",
        url: `/mods/${slug}`,
      },
      twitter: {
        card: "summary",
        title: `${mod.name} | dskt.cc`,
        description: meta.description,
      },
      authors: [{ name: meta.author }],
      keywords: ["desktop mate", "mod", mod.name, meta.type],
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "dskt.cc",
      description: "Desktop Mate modding community",
      themeColor: "#86cecb", // Miku teal
    };
  }
}
