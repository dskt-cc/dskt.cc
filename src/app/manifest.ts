import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Desktop Mate Modding",
    short_name: "dskt.cc",
    description:
      "Desktop Mate modding community - Create, share, and discover mods",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b0c",
    theme_color: "#86cecb", // Miku teal
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    prefer_related_applications: false,
    categories: ["developer tools", "utilities"],
    shortcuts: [
      {
        name: "Browse Mods",
        url: "/mods",
        description: "Browse available mods",
      },
      {
        name: "Documentation",
        url: "/docs",
        description: "Read the documentation",
      },
    ],
    orientation: "any",
    screenshots: [
      {
        src: "/screenshot-desktop.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshot-mobile.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
