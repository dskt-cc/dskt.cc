"use client";

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import dynamic from "next/dynamic";
import type { DocFrontMatter } from "@/types/docs";

const MDXContent = dynamic(
  () => import("./MDXContent").then((mod) => mod.MDXContent),
  { ssr: false },
);

interface ClientDocsPageProps {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: DocFrontMatter;
}

export function ClientDocsPage({
  mdxSource,
  frontMatter,
}: ClientDocsPageProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-miku-deep via-miku-teal to-miku-waterleaf text-transparent bg-clip-text">
        {frontMatter.title}
      </h1>
      {frontMatter.description && (
        <p className="text-base sm:text-lg text-miku-light/90 mb-6 sm:mb-8">
          {frontMatter.description}
        </p>
      )}
      <MDXContent source={mdxSource} />
    </div>
  );
}
