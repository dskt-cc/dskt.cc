export interface DocFrontMatter {
    title: string;
    description?: string;
    date?: string;
    order?: number;
    [key: string]: unknown;
}

export interface Doc {
    slug: string;
    frontMatter: DocFrontMatter;
    content: string;
}

export interface Section {
    title: string;
    items: {
        title: string;
        slug: string;
    }[];
}

export interface DocsStructure {
    [key: string]: Section;
}
