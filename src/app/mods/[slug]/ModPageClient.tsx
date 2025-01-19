"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { TbBrandGithub, TbDownload } from "react-icons/tb";
import {
  HiOutlineUser,
  HiOutlineTag,
  HiOutlineCube,
  HiOutlineCollection,
} from "react-icons/hi";

import { fetchMods, fetchModMeta } from "@lib/mods.lib";
import { ModSlugCard } from "@components/Card/ModSlugCard";
import type { Mod, ModMeta } from "@types";

type ImageDomainConfig = {
  domain: string;
  handler: (src: string) => {
    src: string;
    props:
      | (Partial<React.ComponentProps<typeof Image>> & {
          width: number;
          height: number;
        })
      | {
          fill: true;
        };
  };
};

const IMAGE_CONFIGS: ImageDomainConfig[] = [
  {
    domain: "img.shields.io",
    handler: (src) => ({
      src,
      props: {
        width: 124,
        height: 28,
        className: "inline-block",
      },
    }),
  },
  {
    domain: "i.imgur.com",
    handler: (src) => ({
      src,
      props: {
        fill: true,
        className: "object-contain",
      },
    }),
  },
  {
    domain: "private-user-images.githubusercontent.com",
    handler: (src) => ({
      src,
      props: {
        fill: true,
        unoptimized: true,
        className: "object-contain",
      },
    }),
  },
  {
    domain: "avatars.githubusercontent.com",
    handler: (src) => ({
      src,
      props: {
        fill: true,
        className: "object-contain",
      },
    }),
  },
  {
    domain: "raw.githubusercontent.com",
    handler: (src) => ({
      src,
      props: {
        fill: true,
        className: "object-contain",
      },
    }),
  },
] as const;

const getImageConfig = (src: string) => {
  return IMAGE_CONFIGS.find((config) => src.includes(config.domain));
};

const YOUTUBE_PATTERNS = [
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/i,
  /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/i,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^?]+)/i,
] as const;

interface ModPageClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slug: any;
}

const getYouTubeVideoId = (url: string): string | null => {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const tryFetchWithBranch = async (url: string, branch: string) => {
  const branchUrl = url.replace("/main/", `/${branch}/`);
  const response = await fetch(branchUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
};

const convertImageUrls = (
  markdown: string,
  repo: string,
  branch: string,
): string => {
  return markdown.replace(/!\[(.*?)\]\(((?!http).*?)\)/g, (_, alt, path) => {
    const rawUrl = `${repo.replace(
      "github.com",
      "raw.githubusercontent.com",
    )}/${branch}/${path}`;
    return `![${alt}](${rawUrl})`;
  });
};

const YouTubeEmbed = ({ url }: { url: string }) => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return <a href={url}>{url}</a>;

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full aspect-video rounded-lg my-4"
    />
  );
};

const CustomParagraph = ({
  children,
  node,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any;
}) => {
  // Check if paragraph only contains an image
  const hasOnlyImage =
    node.children.length === 1 &&
    node.children[0].type === "element" &&
    node.children[0].tagName === "img";

  // Check if paragraph only contains a YouTube embed
  const hasOnlyYouTube =
    node.children.length === 1 &&
    node.children[0].type === "element" &&
    node.children[0].tagName === "a" &&
    (node.children[0].properties?.href?.includes("youtube.com") ||
      node.children[0].properties?.href?.includes("youtu.be"));

  // If it only contains an image or YouTube embed, don't wrap in <p>
  if (hasOnlyImage || hasOnlyYouTube) {
    return <>{children}</>;
  }

  return <p>{children}</p>;
};
const CustomImage = ({
  src,
  alt,
  repo,
}: {
  src: string;
  alt: string;
  repo: string;
}) => {
  const [error, setError] = useState(false);
  const [imageData, setImageData] = useState<{
    src: string;
    props: Partial<React.ComponentProps<typeof Image>>;
  }>({
    src,
    props: {
      fill: true,
      className: "object-contain",
    },
  });

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (src.startsWith("http")) {
          const config = getImageConfig(src);
          if (config) {
            setImageData({ src, ...config.handler(src) });
            return;
          }
          setError(true);
          return;
        }

        const branches = ["main", "master"];
        for (const branch of branches) {
          const rawUrl = `${repo.replace(
            "github.com",
            "raw.githubusercontent.com",
          )}/${branch}/${src}`;

          const response = await fetch(rawUrl);
          if (response.ok) {
            setImageData({
              src: rawUrl,
              props: {
                fill: true,
                priority: true,
                className: "object-contain",
              },
            });
            return;
          }
        }

        setError(true);
      } catch {
        setError(true);
      }
    };

    loadImage();
  }, [src, repo]);

  if (error) return null;

  const { src: finalSrc, props } = imageData;

  // For images that use fill property
  if (props.fill) {
    return (
      <div className="relative w-full h-[400px] my-4">
        <Image
          src={finalSrc}
          alt={alt}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          onError={() => setError(true)}
          {...props}
        />
      </div>
    );
  }

  // For images with explicit dimensions (like badges)
  return (
    <Image src={finalSrc} alt={alt} onError={() => setError(true)} {...props} />
  );
};

export const WHITELISTED_DOMAINS = IMAGE_CONFIGS.map((config) => config.domain);

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-b from-miku-gray to-black pt-24">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-miku-deep/20 rounded-lg w-2/3" />
          <div className="h-6 bg-miku-deep/20 rounded-lg w-1/2" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-miku-deep/20 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function ModPageClient({ slug }: ModPageClientProps) {
  const [modData, setModData] = useState<{
    mod: Mod | null;
    meta: ModMeta | null;
    readme: string | null;
  }>({
    mod: null,
    meta: null,
    readme: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const loadModData = async () => {
      try {
        const mods = await fetchMods();
        const mod = mods.find(
          (m) => m.name.toLowerCase() === slug.toLowerCase(),
        );

        if (!mod) {
          setLoading(false);
          return;
        }

        const baseReadmeUrl = mod.repo
          .replace("github.com", "raw.githubusercontent.com")
          .replace(/\/$/, "");

        let readme: string;
        let branch: string;

        try {
          const mainResponse = await tryFetchWithBranch(
            `${baseReadmeUrl}/main/README.md`,
            "main",
          );
          readme = await mainResponse.text();
          branch = "main";
        } catch {
          const masterResponse = await tryFetchWithBranch(
            `${baseReadmeUrl}/master/README.md`,
            "master",
          );
          readme = await masterResponse.text();
          branch = "master";
        }

        const [meta] = await Promise.all([fetchModMeta(mod.repo)]);
        const processedReadme = convertImageUrls(readme, mod.repo, branch);

        setModData({
          mod,
          meta,
          readme: processedReadme,
        });
      } catch {
        // Silently handle any errors
      } finally {
        setLoading(false);
      }
    };

    loadModData();
  }, [slug]);

  if (loading) return <LoadingSkeleton />;
  if (!modData.mod || !modData.meta) return notFound();

  const { mod, meta, readme } = modData;

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-miku-deep via-miku-teal to-miku-waterleaf">
                  {mod.name}
                </h1>
                <p className="text-lg text-miku-light">{meta.description}</p>
              </div>
              <div className="flex gap-3 md:self-center">
                <Link
                  href={`${mod.repo}/releases/latest`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-miku-teal to-miku-waterleaf hover:from-miku-waterleaf hover:to-miku-teal text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-miku-teal/20"
                >
                  <TbDownload size={20} />
                  <span>Download</span>
                </Link>
                <Link
                  href={mod.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 bg-miku-deep/20 hover:bg-miku-deep/30 text-miku-light rounded-lg transition-all duration-200 hover:scale-105 border border-miku-deep/30 hover:border-miku-deep/50"
                >
                  <TbBrandGithub size={20} />
                  <span>GitHub</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-1">
              <ModSlugCard
                title="Author"
                value={meta.author}
                icon={<HiOutlineUser className="text-miku-waterleaf" />}
                isAuthor
              />
              <ModSlugCard
                title="Version"
                value={meta.version}
                icon={<HiOutlineTag className="text-miku-teal" />}
              />
              <ModSlugCard
                title="Type"
                value={meta.type}
                icon={<HiOutlineCube className="text-miku-pink" />}
              />
              <ModSlugCard
                title="Categories"
                value={meta.category}
                icon={<HiOutlineCollection className="text-miku-aquamarine" />}
              />
            </div>
          </motion.div>

          <div className="prose prose-invert prose-lg max-w-none [&>*:first-child]:mt-0">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                p: CustomParagraph,
                img: ({ src, alt }) => {
                  if (!src) return null;
                  return (
                    <CustomImage
                      src={src}
                      alt={alt || ""}
                      repo={modData.mod?.repo || ""}
                    />
                  );
                },
                a: ({ href, children }) => {
                  if (!href) return null;

                  if (
                    href.includes("youtube.com") ||
                    href.includes("youtu.be")
                  ) {
                    return <YouTubeEmbed url={href} />;
                  }

                  return (
                    <Link
                      href={href}
                      className="text-miku-teal hover:text-miku-waterleaf transition-colors duration-200"
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {children}
                    </Link>
                  );
                },
              }}
            >
              {readme || "No README available"}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
