import type { DocsStructure } from "@/types/docs";

const DOCS_STRUCTURE: DocsStructure = {
  "getting-started": {
    title: "Getting Started",
    items: [
      {
        title: "Installation",
        slug: "installation",
      },
      {
        title: "File Structure",
        slug: "file-structure",
      },
      {
        title: "Community",
        slug: "community",
      },
    ],
  },
  troubleshooting: {
    title: "Troubleshooting",
    items: [
      {
        title: "Miscellaneous",
        slug: "miscellaneous",
      },
    ],
  },
  "creating-mods": {
    title: "Creating Mods",
    items: [
      {
        title: "Setup",
        slug: "setup",
      },
      {
        title: "Tools",
        slug: "tools",
      },
      {
        title: "Publishing",
        slug: "publishing",
      },
    ],
  },
  "desktop-mate": {
    title: "Desktop Mate",
    items: [
      {
        title: "Assets",
        slug: "assets",
      },
      {
        title: "Menus",
        slug: "menus",
      },
      {
        title: "VRM Models",
        slug: "vrm-models",
      },
    ],
  },
  "submitting-mods": {
    title: "Submitting Mods",
    items: [
      { title: "Guidelines", slug: "guidelines" },
      {
        title: "Submission",
        slug: "submission",
      },
      { title: "Support Server", slug: "support-server" },
    ],
  },
};

export default DOCS_STRUCTURE;
