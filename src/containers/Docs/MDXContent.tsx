'use client';

import { MDXRemote } from "next-mdx-remote";

import { MDXRemoteSerializeResult } from "next-mdx-remote";

export function MDXContent({ source }: { source: MDXRemoteSerializeResult }) {
    return (
        <div className="prose prose-invert max-w-none">
            <MDXRemote {...source} />
        </div>
    );
}
