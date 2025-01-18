'use client';

import { TbBrandDiscord } from "react-icons/tb";
import { motion } from "framer-motion";

export const DiscordButton = () => {
    return (
        <motion.a
            href="https://discord.gg/Xu7pEU24kw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <TbBrandDiscord className="text-xl" />
            Join our Discord
        </motion.a>
    );
};
