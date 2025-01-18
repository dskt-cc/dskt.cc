/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';
import { getDocBySlug, getSectionDocs } from '@/lib/mdx.lib';
import { DocsLayout } from '@containers/Docs/DocsLayout';
import { MDXContent } from '@containers/Docs/MDXContent';
import { notFound, redirect } from 'next/navigation';

type Props = {
    params: any;  // Temporarily use 'any' to bypass type checking
    searchParams: any;  // Temporarily use 'any' to bypass type checking
};


export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    try {
        if (params.slug.length === 1) {
            const sectionDocs = await getSectionDocs(params.slug[0]);
            if (sectionDocs.length > 0) {
                return {
                    title: `${sectionDocs[0].title} | Documentation`,
                    description: sectionDocs[0].description || '',
                };
            }
        } else if (params.slug.length === 2) {
            const [section, docSlug] = params.slug;
            const { frontMatter } = await getDocBySlug(section, docSlug);
            return {
                title: `${frontMatter.title} | Documentation`,
                description: frontMatter.description || '',
            };
        }
        return {
            title: 'Documentation',
        };
    } catch (error) {
        console.error('Metadata generation error:', error);
        return {
            title: 'Documentation',
        };
    }
}

export default async function DocPage({ params }: Props) {
    try {
        // Handle section routes (e.g., /docs/getting-started)
        if (params.slug.length === 1) {
            const section = params.slug[0];
            const sectionDocs = await getSectionDocs(section);
            
            if (sectionDocs.length > 0) {
                return redirect(`/docs/${section}/${sectionDocs[0].slug}`);
            }
            return notFound();
        }

        // Handle document routes (e.g., /docs/getting-started/installation)
        if (params.slug.length === 2) {
            const [section, docSlug] = params.slug;
            const { mdxSource, frontMatter } = await getDocBySlug(section, docSlug);

            return (
                <DocsLayout>
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold mb-6">{frontMatter.title}</h1>
                        <MDXContent source={mdxSource} />
                    </div>
                </DocsLayout>
            );
        }

        return notFound();
    } catch (error) {
        console.error('Doc loading error:', error);
        return notFound();
    }
}
