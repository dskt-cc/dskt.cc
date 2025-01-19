import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  /* config options here */
  images: {
    domains: [
      "img.shields.io",
      "i.imgur.com",
      "raw.githubusercontent.com",
      "private-user-images.githubusercontent.com",
      "avatars.githubusercontent.com",
      "github.com",
    ],
    unoptimized: true, // For GitHub private images
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
