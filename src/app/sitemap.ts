import { MetadataRoute } from "next";
import { fetchMods } from "@lib/mods.lib";
import { getSectionDocs } from "@lib/mdx.lib";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dskt.cc";

  const mods = await fetchMods();

  const modUrls = mods.map((mod) => ({
    url: `${baseUrl}/mods/${mod.name.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // @NOTE : static docs sections
  const docSections = ["getting-started", "creating-mods", "submitting-mods"];
  const docUrls: MetadataRoute.Sitemap = [];

  for (const section of docSections) {
    const sectionDocs = await getSectionDocs(section);

    sectionDocs.forEach((doc) => {
      docUrls.push({
        url: `${baseUrl}/docs/${section}/${doc.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      });
    });
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/mods`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...modUrls, ...docUrls].sort((a, b) => {
    // Sort by priority (highest first) and then by URL length (shortest first)
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }
    return a.url.length - b.url.length;
  });
}
