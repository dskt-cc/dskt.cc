"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
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
  HiOutlineEye,
} from "react-icons/hi";

import { fetchModByName } from "@lib/mods.lib";

import type { Mod } from "@/types";

import { DownloadButton } from "@components/Button/DownloadButton";
import { ModSlugCard } from "@components/Card/ModSlugCard";

import { CustomParagraph } from "@components/Markdown/CustomParagraph";
import { CustomImage } from "@components/Markdown/CustomImage";
import { YouTubeEmbed } from "@components/Markdown/YoutubeEmbed";

interface ModPageClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slug: any;
}

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

async function fetchReadme(repo: string): Promise<string> {
  const baseUrl = repo.replace("github.com", "raw.githubusercontent.com");

  // Try main branch first, then master
  for (const branch of ["main", "master"]) {
    try {
      const response = await fetch(`${baseUrl}/${branch}/README.md`);
      if (response.ok) {
        const text = await response.text();
        return text.replace(
          /!\[(.*?)\]\(((?!http).*?)\)/g,
          (_, alt, path) => `![${alt}](${baseUrl}/${branch}/${path})`,
        );
      }
    } catch (error) {
      console.error(`Error fetching README from ${branch} branch:`, error);
    }
  }

  return "No README available";
}

export function ModPageClient({ slug }: ModPageClientProps) {
  const [mod, setMod] = useState<Mod | null>(null);
  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModData = async () => {
      try {
        const modData = await fetchModByName(slug);
        setMod(modData);

        const readmeContent = await fetchReadme(modData.repo);
        setReadme(readmeContent);
      } catch (error) {
        console.error("Error loading mod data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadModData();
  }, [slug]);

  if (loading) return <LoadingSkeleton />;
  if (!mod) return notFound();

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
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-miku-deep via-miku-teal to-miku-waterleaf truncate">
                  {mod.name}
                </h1>
                <p className="text-base sm:text-lg text-miku-light break-words mb-3">
                  {mod.meta.description}
                </p>
                <div className="flex gap-4 items-center text-sm text-miku-light/50">
                  <div className="flex items-center gap-1.5">
                    <TbDownload className="flex-shrink-0" size={16} />
                    <span>{mod.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HiOutlineEye className="flex-shrink-0" size={16} />
                    <span>{mod.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 md:self-center">
                <DownloadButton mod={mod} />
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
                value={mod.meta.author}
                icon={<HiOutlineUser className="text-miku-waterleaf" />}
                isAuthor
              />
              <ModSlugCard
                title="Version"
                value={mod.meta.version}
                icon={<HiOutlineTag className="text-miku-teal" />}
              />
              <ModSlugCard
                title="Type"
                value={mod.meta.type}
                icon={<HiOutlineCube className="text-miku-pink" />}
              />
              <ModSlugCard
                title="Categories"
                value={mod.meta.category}
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
                    <CustomImage src={src} alt={alt || ""} repo={mod.repo} />
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
