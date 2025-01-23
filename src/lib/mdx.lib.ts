import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import type { DocFrontMatter, GetDocBySlugResult } from "@/types/docs";

const ROOT_PATH = process.cwd();
const DOCS_PATH = path.join(ROOT_PATH, "src/content/docs");

// Add cache for production
const contentCache = new Map<string, GetDocBySlugResult>();

export async function getSectionDocs(
  section: string,
): Promise<DocFrontMatter[]> {
  try {
    const sectionPath = path.join(DOCS_PATH, section);
    const files = await fs.readdir(sectionPath);

    const docs = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const filePath = path.join(sectionPath, file);
          const content = await fs.readFile(filePath, "utf8");
          const { data } = matter(content);
          return {
            ...(data as DocFrontMatter),
            slug: file.replace(/\.mdx$/, ""),
          };
        }),
    );

    return docs.sort((a, b) => {
      const orderA = a.order ?? Infinity;
      const orderB = b.order ?? Infinity;
      return orderA - orderB;
    });
  } catch (error) {
    console.error(`Error loading section ${section}:`, error);
    return [];
  }
}

export async function getDocBySlug(
  section: string,
  slug: string,
): Promise<GetDocBySlugResult> {
  const cacheKey = `${section}/${slug}`;

  // Check cache in production
  if (process.env.NODE_ENV === "production" && contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)!;
  }

  try {
    const fullPath = path.join(DOCS_PATH, section, `${slug}.mdx`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeHighlight],
      },
      scope: data,
      parseFrontmatter: true,
    });

    const result: GetDocBySlugResult = {
      mdxSource,
      frontMatter: data as DocFrontMatter,
    };

    // Cache in production
    if (process.env.NODE_ENV === "production") {
      contentCache.set(cacheKey, result);
    }

    return result;
  } catch (error) {
    console.error(`Error loading doc ${section}/${slug}:`, error);
    throw new Error(`Failed to load doc: ${section}/${slug}`);
  }
}
