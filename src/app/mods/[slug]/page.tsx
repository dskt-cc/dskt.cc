import { Suspense } from "react";
import { fetchModByName, incrementModViews } from "@lib/mods.lib";
import { ModPageClient } from "./ModPageClient";
import type { Metadata } from "next";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}

const LoadingSkeleton = () => (
  <div className="pt-24">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-miku-deep/20 rounded-lg w-2/3" />
          <div className="h-6 bg-miku-deep/20 rounded-lg w-1/2" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-miku-deep/20 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default async function ModPage({ params }: Props) {
  const { slug } = params;

  try {
    // Track the view before rendering the page
    await incrementModViews(slug);
  } catch (error) {
    // Silently handle view tracking errors
    console.error("Failed to track view:", error);
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ModPageClient slug={slug} />
    </Suspense>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  try {
    const mod = await fetchModByName(slug);

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

    return {
      title: `${mod.name} | dskt.cc`,
      description: mod.meta.description,
      openGraph: {
        title: `${mod.name} | dskt.cc`,
        description: mod.meta.description,
        type: "article",
        url: `/mods/${slug}`,
      },
      twitter: {
        card: "summary",
        title: `${mod.name} | dskt.cc`,
        description: mod.meta.description,
      },
      authors: [{ name: mod.meta.author }],
      keywords: [
        "desktop mate",
        "mod",
        mod.name,
        mod.meta.type,
        ...mod.meta.category,
      ],
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
      themeColor: "#86cecb",
    };
  }
}
