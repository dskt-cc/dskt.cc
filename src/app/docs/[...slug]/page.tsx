/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { getDocBySlug, getSectionDocs } from "@/lib/mdx.lib";
import { notFound, redirect } from "next/navigation";
import DOCS_STRUCTURE from "@constants/docs";
import { ClientDocsPage } from "@containers/Docs/ClientDocsPage";
import { DocsLayout } from "@containers/Docs/DocsLayout";

type Props = {
  params: any;
  searchParams: any;
};

async function getAllSections(): Promise<string[]> {
  return Object.keys(DOCS_STRUCTURE);
}

async function getFirstAvailableDoc(): Promise<{
  section: string;
  slug: string;
} | null> {
  const sections = await getAllSections();

  for (const section of sections) {
    const docs = await getSectionDocs(section);
    if (docs.length > 0) {
      return {
        section,
        slug: docs[0].slug as string,
      };
    }
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  if (!slug || slug.length === 0) {
    return { title: "Documentation" };
  }

  if (slug.length === 1) {
    const sectionDocs = await getSectionDocs(slug[0]);
    if (sectionDocs.length > 0) {
      const firstDoc = sectionDocs[0];
      return {
        title: `${firstDoc.title} | Documentation`,
        description: firstDoc.description || "",
      };
    }
  }

  if (slug.length === 2) {
    const [section, docSlug] = slug;
    try {
      const { frontMatter } = await getDocBySlug(section, docSlug);
      return {
        title: `${frontMatter.title} | Documentation`,
        description: frontMatter.description || "",
        openGraph: {
          title: frontMatter.title,
          description: frontMatter.description,
          type: "article",
          ...(frontMatter.date && { publishedTime: frontMatter.date }),
        },
      };
    } catch {
      // If doc not found, fall through to default
    }
  }

  return { title: "Documentation" };
}

export default async function DocPage({ params }: Props) {
  const { slug } = params;

  try {
    if (!slug || slug.length === 0) {
      const firstDoc = await getFirstAvailableDoc();
      if (firstDoc) {
        return redirect(`/docs/${firstDoc.section}/${firstDoc.slug}`);
      }
      return notFound();
    }

    if (slug.length === 2) {
      const [section, docSlug] = slug;
      try {
        const { mdxSource, frontMatter } = await getDocBySlug(section, docSlug);
        return (
          <DocsLayout>
            <ClientDocsPage mdxSource={mdxSource} frontMatter={frontMatter} />
          </DocsLayout>
        );
      } catch (error) {
        console.error("Doc loading error:", error);
        return notFound();
      }
    }

    // Handle section path
    if (slug.length === 1) {
      const section = slug[0];
      const sectionDocs = await getSectionDocs(section);

      if (sectionDocs.length > 0) {
        const sortedDocs = [...sectionDocs].sort((a, b) => {
          const orderA = a.order ?? Infinity;
          const orderB = b.order ?? Infinity;
          return orderA - orderB;
        });

        return redirect(`/docs/${section}/${sortedDocs[0].slug}`);
      }
      return notFound();
    }

    return notFound();
  } catch (error) {
    console.error("Doc loading error:", error);
    return notFound();
  }
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];
  const sections = await getAllSections();

  for (const section of sections) {
    const docs = await getSectionDocs(section);
    for (const doc of docs) {
      paths.push({ slug: [section, doc.slug as string] });
    }
  }

  return paths;
}
