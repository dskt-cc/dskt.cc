'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { DocsStructure } from '@/types/docs';

const DOCS_STRUCTURE: DocsStructure = {
    'getting-started': {
        title: 'Getting Started',
        items: [
            { title: 'Installation', slug: 'installation' },
            { title: 'Quick Start', slug: 'quick-start' },
        ],
    },
    'creating-mods': {
        title: 'Creating Mods',
        items: [
            { title: 'Setup', slug: 'setup' },
            { title: 'Publishing', slug: 'publishing' },
        ],
    },
    'submitting-mods': {
        title: 'Submitting Mods',
        items: [
            { title: 'Guidelines', slug: 'guidelines' },
        ],
    },
};

export function DocsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <div className="flex container mx-auto px-4 pt-24 pb-16">
                <aside className="w-64 flex-shrink-0">
                    <nav className="space-y-8 sticky top-24">
                        {Object.entries(DOCS_STRUCTURE).map(([section, { title, items }]) => (
                            <div key={section}>
                                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-3">
                                    {title}
                                </h3>
                                <ul className="space-y-2">
                                    {items.map((item) => (
                                        <li key={item.slug}>
                                            <Link
                                                href={`/docs/${section}/${item.slug}`}
                                                className={`block px-3 py-2 rounded-lg text-sm ${
                                                    pathname === `/docs/${section}/${item.slug}`
                                                        ? 'bg-purple-500/10 text-purple-400'
                                                        : 'text-gray-400 hover:text-gray-300'
                                                }`}
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>
                <main className="flex-1 ml-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
