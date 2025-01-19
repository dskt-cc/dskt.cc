"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TbBrandGithub, TbDownload } from "react-icons/tb";
import { fetchMods, fetchModMeta } from "@lib/mods.lib";
import type { Mod, ModMeta } from "@types";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { ModSlugCard } from "@components/Card/ModSlugCard";
import {
  HiOutlineUser,
  HiOutlineTag,
  HiOutlineCube,
  HiOutlineCollection,
} from "react-icons/hi";

interface ModPageClientProps {
  slug: string;
}

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
  return markdown.replace(
    /!\[(.*?)\]\(((?!http).*?)\)/g,
    (match, alt, path) => {
      const rawUrl = `${repo.replace("github.com", "raw.githubusercontent.com")}/${branch}/${path}`;
      return `![${alt}](${rawUrl})`;
    },
  );
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
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    const loadImage = async () => {
      if (src.includes("img.shields.io")) return;
      if (src.includes("i.imgur.com")) return;
      if (src.startsWith("http")) return;

      const mainUrl = `${repo.replace("github.com", "raw.githubusercontent.com")}/main/${src}`;
      const masterUrl = `${repo.replace("github.com", "raw.githubusercontent.com")}/master/${src}`;

      try {
        const mainRes = await fetch(mainUrl);
        if (mainRes.ok) {
          setImageSrc(mainUrl);
          return;
        }
        const masterRes = await fetch(masterUrl);
        if (masterRes.ok) {
          setImageSrc(masterUrl);
          return;
        }
        setError(true);
      } catch {
        setError(true);
      }
    };

    loadImage();
  }, [src, repo]);

  if (error) return null;

  if (src.includes("img.shields.io")) {
    return (
      <Image
        src={src}
        alt={alt}
        width={124}
        height={28}
        className="inline-block"
      />
    );
  }

  return (
    <div className="relative w-full h-[400px] my-4 mb-4">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        onError={() => setError(true)}
      />
    </div>
  );
};

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
          // Try main branch first
          const mainResponse = await tryFetchWithBranch(
            `${baseReadmeUrl}/main/README.md`,
            "main",
          );
          readme = await mainResponse.text();
          branch = "main";
        } catch {
          try {
            const masterResponse = await tryFetchWithBranch(
              `${baseReadmeUrl}/master/README.md`,
              "master",
            );
            readme = await masterResponse.text();
            branch = "master";
          } catch (masterError) {
            console.error(
              "Failed to fetch README from master branch:",
              masterError,
            );
            throw new Error(
              "Failed to fetch README from both main and master branches",
            );
          }
        }

        const [meta] = await Promise.all([fetchModMeta(mod.repo)]);

        const processedReadme = convertImageUrls(readme, mod.repo, branch);

        setModData({
          mod,
          meta,
          readme: processedReadme,
        });
      } catch (error) {
        console.error("Error loading mod data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadModData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-miku-gray to-black pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-miku-deep/20 rounded-lg w-2/3"></div>
              <div className="h-6 bg-miku-deep/20 rounded-lg w-1/2"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-24 bg-miku-deep/20 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!modData.mod || !modData.meta) return notFound();

  const { mod, meta, readme } = modData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-miku-gray to-black pt-24">
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
                a: ({ href, children }) =>
                  href ? (
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
                  ) : null,
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
