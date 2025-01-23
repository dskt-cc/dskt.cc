"use client";

import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

const components = {};

export function ClientMDX({ source }: { source: MDXRemoteSerializeResult }) {
  return (
    <div
      className="prose prose-invert prose-sm sm:prose lg:prose-lg max-w-none 
      prose-pre:overflow-x-auto
      prose-img:rounded-xl
      prose-img:w-full
      prose-img:max-w-full
      prose-headings:scroll-mt-24"
    >
      <MDXRemote {...source} components={components} />
    </div>
  );
}
