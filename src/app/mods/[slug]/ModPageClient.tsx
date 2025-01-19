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

const convertImageUrls = (markdown: string, repo: string): string => {
  return markdown.replace(
    /!\[(.*?)\]\(((?!http).*?)\)/g,
    (match, alt, path) => {
      const rawUrl = `${repo.replace("github.com", "raw.githubusercontent.com")}/main/${path}`;
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

  const fullImageUrl = src.startsWith("http")
    ? src
    : `${repo.replace("github.com", "raw.githubusercontent.com")}/main/${src}`;

  return (
    <div className="relative w-full h-[400px] my-8">
      <Image
        src={fullImageUrl}
        alt={alt}
        fill
        className="object-contain rounded-lg border border-gray-700"
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

        const readmeUrl =
          mod.repo
            .replace("github.com", "raw.githubusercontent.com")
            .replace(/\/$/, "") + "/main/README.md";

        const [meta, readmeResponse] = await Promise.all([
          fetchModMeta(mod.repo),
          fetch(readmeUrl),
        ]);

        const readme = await readmeResponse.text();
        const processedReadme = convertImageUrls(readme, mod.repo);

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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-gray-800/50 rounded-lg w-2/3"></div>
              <div className="h-6 bg-gray-800/50 rounded-lg w-1/2"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-800/50 rounded-lg"></div>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {mod.name}
                </h1>
                <p className="text-lg text-gray-300">{meta.description}</p>
              </div>
              <div className="flex gap-3 md:self-center">
                <Link
                  href={`${mod.repo}/releases/latest`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all hover:scale-105"
                >
                  <TbDownload size={20} />
                  <span>Download</span>
                </Link>
                <Link
                  href={mod.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 bg-gray-700/50 hover:bg-gray-700 text-gray-200 rounded-lg transition-all hover:scale-105"
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
                icon={<HiOutlineUser />}
                isAuthor
              />
              <ModSlugCard
                title="Version"
                value={meta.version}
                icon={<HiOutlineTag />}
              />
              <ModSlugCard
                title="Type"
                value={meta.type}
                icon={<HiOutlineCube />}
              />
              <ModSlugCard
                title="Categories"
                value={meta.category}
                icon={<HiOutlineCollection />}
              />
            </div>
          </motion.div>

          <div className="prose prose-invert prose-lg max-w-none">
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
                      className="text-purple-400 hover:text-purple-300 transition-colors"
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
