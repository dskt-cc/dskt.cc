/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { getDocBySlug, getSectionDocs } from "@/lib/mdx.lib";
import { DocsLayout } from "@containers/Docs/DocsLayout";
import { MDXContent } from "@containers/Docs/MDXContent";
import { notFound, redirect } from "next/navigation";

// @TODO: fix typing errors
type Props = {
  params: any;
  searchParams: any;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  try {
    if (resolvedParams.slug.length === 1) {
      const sectionDocs = await getSectionDocs(resolvedParams.slug[0]);
      if (sectionDocs.length > 0) {
        return {
          title: `${sectionDocs[0].title} | Documentation`,
          description: sectionDocs[0].description || "",
        };
      }
    } else if (resolvedParams.slug.length === 2) {
      const [section, docSlug] = resolvedParams.slug;
      const { frontMatter } = await getDocBySlug(section, docSlug);
      return {
        title: `${frontMatter.title} | Documentation`,
        description: frontMatter.description || "",
      };
    }
    return {
      title: "Documentation",
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Documentation",
    };
  }
}

export default async function DocPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  try {
    if (resolvedParams.slug.length === 1) {
      const section = resolvedParams.slug[0];
      const sectionDocs = await getSectionDocs(section);

      if (sectionDocs.length > 0) {
        return redirect(`/docs/${section}/${sectionDocs[0].slug}`);
      }
      return notFound();
    }

    if (resolvedParams.slug.length === 2) {
      const [section, docSlug] = resolvedParams.slug;
      const { mdxSource, frontMatter } = await getDocBySlug(section, docSlug);

      return (
        <DocsLayout>
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-miku-teal via-miku-waterleaf to-miku-pink text-transparent bg-clip-text">
              {frontMatter.title}
            </h1>
            {frontMatter.description && (
              <p className="text-lg text-miku-light/90 mb-8">
                {frontMatter.description}
              </p>
            )}
            <div className="prose prose-invert prose-miku max-w-none">
              <MDXContent source={mdxSource} />
            </div>
          </div>
        </DocsLayout>
      );
    }

    return notFound();
  } catch (error) {
    console.error("Doc loading error:", error);
    return notFound();
  }
}
