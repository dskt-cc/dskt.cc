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

export type DocsStructure = {
  [key: string]: {
    title: string;
    items: Array<{
      title: string;
      slug: string;
      subitems?: Array<{
        title: string;
        slug: string;
      }>;
    }>;
  };
};
