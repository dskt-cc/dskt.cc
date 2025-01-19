"use client";

import { useEffect, useState } from "react";
import type { Mod, ModType } from "@types";
import { fetchMods } from "@lib/mods.lib";
import { ModCard } from "@components/Card/ModCard";
import { SkeletonModCard } from "@components/Card/SkeletonModCard";
import { TbMelon } from "react-icons/tb";
import { BiPackage, BiSolidPackage } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

export default function ModsPage() {
  const [mods, setMods] = useState<Mod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ModType | "All">("All");

  useEffect(() => {
    const loadMods = async () => {
      try {
        const modsData = await fetchMods();
        setMods(modsData);
      } catch (err) {
        setError("Failed to load mods");
        console.error("Error loading mods:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMods();
  }, []);

  const modTypeButtons = [
    {
      type: "All" as const,
      icon: null,
      label: "All",
      colors:
        "from-miku-aquamarine/90 from-10% via-miku-waterleaf/80 via-50% to-miku-teal/90 to-90%",
    },
    {
      type: "MelonLoader" as const,
      icon: <TbMelon className="text-lg" />,
      label: "MelonLoader",
      colors:
        "from-miku-aquamarine/90 from-10% via-miku-waterleaf/80 via-50% to-miku-teal/90 to-90%",
    },
    {
      type: "BepInEx" as const,
      icon: <BiPackage className="text-lg" />,
      label: "BepInEx",
      colors:
        "from-miku-aquamarine/90 from-10% via-miku-waterleaf/80 via-50% to-miku-teal/90 to-90%",
    },
    {
      type: "Both" as const,
      icon: <BiSolidPackage className="text-lg" />,
      label: "Both",
      colors:
        "from-miku-aquamarine/90 from-10% via-miku-waterleaf/80 via-50% to-miku-teal/90 to-90%",
    },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonModCard key={i} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-red-500/10 text-red-400 px-6 py-4 rounded-lg border border-red-500/20 backdrop-blur-sm">
            {error}
          </div>
        </div>
      );
    }

    if (mods.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-miku-gray/50 text-miku-light px-6 py-4 rounded-lg border border-miku-deep/30 backdrop-blur-sm">
            No mods available
          </div>
        </div>
      );
    }

    return (
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {mods.map((mod) => (
            <motion.div
              key={mod.repo}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ModCard
                mod={mod}
                onMetaLoaded={(meta) =>
                  selectedType === "All" || meta.type === selectedType
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-miku-gray to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-miku-aquamarine/90 from-10% via-miku-waterleaf/80 via-50% to-miku-teal/90 to-90%"
          >
            Available Mods
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {modTypeButtons.map(({ type, icon, label, colors }) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-lg 
                  transition-all duration-200 
                  backdrop-blur-sm
                  ${
                    selectedType === type
                      ? `bg-gradient-to-r ${colors} text-white shadow-lg shadow-miku-teal/20 scale-105`
                      : `bg-miku-gray/50 text-miku-light hover:bg-miku-deep/20 hover:scale-105`
                  }
                `}
              >
                {icon} {label}
              </button>
            ))}
          </motion.div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
