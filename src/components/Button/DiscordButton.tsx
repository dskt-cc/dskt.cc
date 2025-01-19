"use client";

import { TbBrandDiscord } from "react-icons/tb";
import { motion } from "framer-motion";

export const DiscordButton = () => {
  return (
    <motion.a
      href="https://discord.gg/Xu7pEU24kw"
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center gap-2 px-6 py-3 
        bg-[#5865F2] hover:bg-[#4752C4] 
        text-white rounded-lg 
        transition-all duration-200
        shadow-lg shadow-miku-deep/20
        hover:shadow-[#5865F2]/30
        border border-[#5865F2]/50
        hover:border-[#4752C4]/50
        font-medium
        backdrop-blur-sm
      "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <TbBrandDiscord className="text-xl transition-transform duration-200 group-hover:rotate-12" />
      <span className="relative">
        Join our Discord
        <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </span>
    </motion.a>
  );
};
