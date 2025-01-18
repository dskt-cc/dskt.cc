'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXContentProps {
    source: MDXRemoteSerializeResult;
}

export function MDXContent({ source }: MDXContentProps) {
    return (
        <div className="prose prose-invert max-w-none">
            <MDXRemote {...source} />
        </div>
    );
}