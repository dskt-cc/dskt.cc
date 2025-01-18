export type ModType = "MelonLoader" | "BepInEx";

export enum ModCategory {
    Performance = "Performance",
    QualityOfLife = "Quality of Life",
    Content = "Content",
    Overhaul = "Overhaul",
    Other = "Other",
}

export type Mod = {
    name: string;
    repo: string;
}

export type ModMeta = {
    description: string;
    author: string;
    category: ModCategory[];
    type: ModType;
    version: string;
}
