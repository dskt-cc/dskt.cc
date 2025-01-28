export type ModType = "MelonLoader" | "BepInEx" | "Both";

export enum ModCategory {
  Performance = "Performance",
  QualityOfLife = "Quality of Life",
  Content = "Content",
  Overhaul = "Overhaul",
  Other = "Other",
}

export interface ModMeta {
  description: string;
  author: string;
  category: ModCategory[];
  type: ModType;
  version: string;
  requires?: string[];
  sponsor?: {
    name: string;
    url: string;
  };
  locale?: {
    default: string;
    supported: string[];
  };
}

export interface Mod {
  _id: string;
  name: string;
  repo: string;
  downloads: number;
  views: number;
  meta: ModMeta;
  featured: boolean;
}
