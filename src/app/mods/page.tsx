'use client';

import { useEffect, useState } from "react";
import type { Mod, ModType } from "@types";
import { fetchMods } from "@lib/mods.lib";
import { ModCard } from "@components/Card/ModCard";
import { TbMelon } from "react-icons/tb";
import { BiPackage } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

export default function ModsPage() {
    const [mods, setMods] = useState<Mod[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<ModType | 'All'>('All');

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

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                        <div className="text-lg text-gray-300 font-medium">Loading mods...</div>
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
                                onMetaLoaded={(meta) => selectedType === 'All' || meta.type === selectedType}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-900 to-black"> {/* 4rem = 16 (navbar height) */}
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
                        className="flex gap-3"
                    >
                        <button 
                            onClick={() => setSelectedType('All')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${
                                selectedType === 'All' 
                                    ? 'bg-white/10 text-white shadow-lg shadow-white/5 scale-105' 
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:scale-105'
                            }`}
                        >
                            All
                        </button>
                        <button 
                            onClick={() => setSelectedType('MelonLoader')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${
                                selectedType === 'MelonLoader' 
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/20 scale-105' 
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:scale-105'
                            }`}
                        >
                            <TbMelon className="text-lg" /> MelonLoader
                        </button>
                        <button 
                            onClick={() => setSelectedType('BepInEx')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${
                                selectedType === 'BepInEx' 
                                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 scale-105' 
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:scale-105'
                            }`}
                        >
                            <BiPackage className="text-lg" /> BepInEx
                        </button>
                    </motion.div>
                </div>
                
                {renderContent()}
            </div>
        </div>
    );
}
