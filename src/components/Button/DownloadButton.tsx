"use client";

import { useState } from "react";
import Link from "next/link";
import { TbDownload } from "react-icons/tb";
import { incrementModDownloads } from "@lib/mods.lib";
import type { Mod } from "@/types";

interface DownloadButtonProps {
  mod: Mod;
  className?: string;
}

export const DownloadButton = ({
  mod,
  className = "",
}: DownloadButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await incrementModDownloads(mod.name);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      href={`${mod.repo}/releases/latest`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleDownload}
      className={`
        flex items-center gap-2 px-5 py-2.5 
        bg-gradient-to-r from-miku-teal to-miku-waterleaf 
        hover:from-miku-waterleaf hover:to-miku-teal 
        text-white rounded-lg transition-all duration-200 
        hover:scale-105 shadow-lg shadow-miku-teal/20
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${className}
      `}
    >
      <TbDownload size={20} className={isLoading ? "animate-bounce" : ""} />
      <span>{isLoading ? "Opening..." : "Download"}</span>
    </Link>
  );
};
