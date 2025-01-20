"use client";

import Link from "next/link";

import { FaGithub } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import { TbMelon, TbExternalLink, TbDownload } from "react-icons/tb";
import { HiOutlineUser, HiOutlineTag } from "react-icons/hi";

import { Mod } from "@/types";

interface ModCardProps {
  mod: Mod;
}

const getTypeColors = (type: string | undefined) => {
  switch (type) {
    case "MelonLoader":
      return {
        gradient: "from-miku-aquamarine to-miku-waterleaf",
        bg: "bg-miku-deep/20",
        icon: "text-miku-aquamarine",
      };
    case "BepInEx":
      return {
        gradient: "from-miku-deep to-miku-teal",
        bg: "bg-miku-deep/20",
        icon: "text-miku-teal",
      };
    case "Both":
      return {
        gradient: "from-miku-teal to-miku-waterleaf",
        bg: "bg-miku-deep/20",
        icon: "text-miku-waterleaf",
      };
    default:
      return {
        gradient: "from-miku-deep to-miku-teal",
        bg: "bg-miku-deep/20",
        icon: "text-miku-teal",
      };
  }
};
export const ModCard = ({ mod }: ModCardProps) => {
  const handleGithubClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(mod.repo, "_blank", "noopener,noreferrer");
  };

  const colors = getTypeColors(mod.meta?.type);

  return (
    <div className="relative group h-[240px] rounded-xl bg-miku-gray/50 backdrop-blur-sm border border-miku-deep/30 hover:border-miku-teal/50 transition-all duration-300 overflow-hidden">
      <div
        className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${colors.gradient}`}
      />

      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-miku-deep/30 backdrop-blur-sm border border-miku-deep/20">
        <TbDownload className="text-miku-waterleaf" size={16} />
        <span className="text-sm font-medium text-miku-light">
          {mod.downloads.toLocaleString()}
        </span>
      </div>

      <div className="p-6 flex flex-col h-full">
        <Link
          href={`/mods/${mod.name.toLowerCase()}`}
          className="group/title flex items-center gap-2 mb-3"
        >
          <h3 className="text-2xl text-miku-light font-medium group-hover/title:text-miku-teal transition-colors duration-300 line-clamp-1">
            {mod.name}
          </h3>
          <TbExternalLink
            className="text-miku-light/0 group-hover/title:text-miku-teal transition-all duration-300 flex-shrink-0"
            size={20}
          />
        </Link>

        <p className="text-miku-light/70 line-clamp-3">
          {mod.meta?.description}
        </p>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 text-sm text-miku-light/50">
              <div className="flex items-center gap-1.5">
                <HiOutlineUser className="flex-shrink-0" size={16} />
                <span className="truncate max-w-[100px]">
                  {mod.meta?.author}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineTag className="flex-shrink-0" size={16} />
                <span className="truncate">v{mod.meta?.version}</span>
              </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <div
                className={`w-9 h-9 rounded-lg ${colors.bg} ${colors.icon} flex items-center justify-center`}
              >
                {mod.meta?.type === "MelonLoader" ? (
                  <TbMelon size={20} />
                ) : (
                  <BiPackage size={20} />
                )}
              </div>
              <button
                onClick={handleGithubClick}
                className="w-9 h-9 rounded-lg bg-miku-deep/20 text-miku-light hover:text-miku-teal flex items-center justify-center transition-colors duration-300"
              >
                <FaGithub size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
