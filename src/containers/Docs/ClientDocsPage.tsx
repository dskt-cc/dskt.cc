"use client";

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { DocsLayout } from "./DocsLayout";
import { MDXContent } from "./MDXContent";
import type { DocFrontMatter } from "@/types/docs";

interface ClientDocsPageProps {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: DocFrontMatter;
}

export function ClientDocsPage({
  mdxSource,
  frontMatter,
}: ClientDocsPageProps) {
  return (
    <DocsLayout>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-miku-deep via-miku-teal to-miku-waterleaf text-transparent bg-clip-text">
          {frontMatter.title}
        </h1>
        {frontMatter.description && (
          <p className="text-base sm:text-lg text-miku-light/90 mb-6 sm:mb-8">
            {frontMatter.description}
          </p>
        )}
        {frontMatter.date && (
          <p className="text-sm text-miku-light/70 mb-4">
            Last updated: {new Date(frontMatter.date).toLocaleDateString()}
          </p>
        )}
        <div className="prose prose-invert prose-sm sm:prose lg:prose-lg max-w-none">
          <MDXContent source={mdxSource} />
        </div>
      </div>
    </DocsLayout>
  );
}
