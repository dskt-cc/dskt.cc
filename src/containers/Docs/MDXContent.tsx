"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div
      className="prose prose-invert prose-sm sm:prose lg:prose-lg max-w-none 
      prose-pre:overflow-x-auto
      prose-img:rounded-xl
      prose-img:w-full
      prose-img:max-w-full
      prose-headings:scroll-mt-24"
    >
      <MDXRemote {...source} />
    </div>
  );
}
