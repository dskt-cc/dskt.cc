"use client";

import { useEffect, useState } from "react";
import type { Mod, ModType } from "@types";
import { fetchMods } from "@lib/mods.lib";
import { ModCard } from "@components/Card/ModCard";
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
      colors: "bg-white/10 shadow-white/5",
    },
    {
      type: "MelonLoader" as const,
      icon: <TbMelon className="text-lg" />,
      label: "MelonLoader",
      colors: "from-green-500 to-green-600 shadow-green-500/20",
    },
    {
      type: "BepInEx" as const,
      icon: <BiPackage className="text-lg" />,
      label: "BepInEx",
      colors: "from-purple-500 to-purple-600 shadow-purple-500/20",
    },
    {
      type: "Both" as const,
      icon: <BiSolidPackage className="text-lg" />,
      label: "Both",
      colors: "from-blue-500 to-blue-600 shadow-blue-500/20",
    },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <div className="text-lg text-gray-300 font-medium">
              Loading mods...
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-red-500/10 text-red-400 px-6 py-4 rounded-lg border border-red-500/20">
            {error}
          </div>
        </div>
      );
    }

    if (mods.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-gray-800/50 text-gray-400 px-6 py-4 rounded-lg border border-gray-700/50">
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
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
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
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${
                  selectedType === type
                    ? `bg-gradient-to-r ${colors} text-white shadow-lg scale-105`
                    : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:scale-105"
                }`}
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
