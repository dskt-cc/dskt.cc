import type { Mod, ModMeta } from "@types";
import { useState, useEffect } from "react";
import { fetchModMeta } from "@lib/mods.lib";
import { FaGithub } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import { TbMelon, TbExternalLink } from "react-icons/tb";
import { HiOutlineUser, HiOutlineTag } from "react-icons/hi";
// import Link from "next/link";
import { useRouter } from "next/navigation";

interface ModCardProps {
    mod: Mod;
    onMetaLoaded?: (meta: ModMeta) => boolean;
}

export const ModCard = ({ mod, onMetaLoaded }: ModCardProps) => {
    const [meta, setMeta] = useState<ModMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const modMeta = await fetchModMeta(mod.repo);
                setMeta(modMeta);
            } catch (error) {
                console.error("Error fetching mod metadata:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeta();
    }, [mod.repo]);

    const handleGithubClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(mod.repo, '_blank', 'noopener,noreferrer');
    };

    const handleCardClick = () => {
        router.push(`/mods/${mod.name.toLowerCase()}`);
    };

    if (loading) return (
        <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm animate-pulse border border-gray-700/50">
            <div className="h-6 bg-gray-700/50 rounded-lg w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-700/50 rounded-lg w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-700/50 rounded-lg w-2/3"></div>
        </div>
    );

    if (meta && onMetaLoaded && !onMetaLoaded(meta)) return null;

    return (
        <div 
            onClick={handleCardClick}
            className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 transition-all duration-300 hover:border-gray-600/50 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer"
        >
            <div className={`absolute top-0 left-0 right-0 h-1 ${
                meta?.type === "MelonLoader" 
                    ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
            }`} />

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                            {mod.name}
                        </h3>
                        <TbExternalLink className="opacity-0 group-hover:opacity-50 transition-opacity" />
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                            meta?.type === "MelonLoader"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-purple-500/10 text-purple-400"
                        }`}>
                            {meta?.type === "MelonLoader" ? <TbMelon size={18} /> : <BiPackage size={18} />}
                        </span>
                        <button 
                            onClick={handleGithubClick}
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-300 z-10"
                        >
                            <FaGithub size={18} />
                        </button>
                    </div>
                </div>

                {meta && (
                    <>
                        <p className="text-gray-300/90 mb-6 line-clamp-2 text-sm">
                            {meta.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1.5">
                                <HiOutlineUser className="opacity-75" />
                                <span>{meta.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <HiOutlineTag className="opacity-75" />
                                <span>v{meta.version}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
        </div>
    );
};
