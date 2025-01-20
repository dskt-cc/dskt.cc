"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkeletonModCard } from "@components/Card/SkeletonModCard";
import { ModCard } from "@components/Card/ModCard";
import { fetchMods } from "@lib/mods.lib";
import { useDebounce } from "@hooks/useDebounce";
import { modTypeButtons } from "@constants/modFilters";
import { Mod, ModType, ModCategory } from "@types";

type SortOption = {
  value: "popular" | "downloads" | "views" | "featured";
  label: string;
};

const SORT_OPTIONS: SortOption[] = [
  { value: "popular", label: "Popular" },
  { value: "downloads", label: "Most Downloads" },
  { value: "views", label: "Most Views" },
  { value: "featured", label: "Featured" },
];

const MOD_CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: ModCategory.Performance, label: "Performance" },
  { value: ModCategory.QualityOfLife, label: "Quality of Life" },
  { value: ModCategory.Content, label: "Content" },
  { value: ModCategory.Overhaul, label: "Overhaul" },
  { value: ModCategory.Other, label: "Other" },
];

export default function ModsPage() {
  const [mods, setMods] = useState<Mod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ModType | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption["value"]>("popular");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const debouncedSearch = useDebounce(searchQuery, 300);

  const getSortedMods = (modsToSort: Mod[]) => {
    switch (sortBy) {
      case "downloads":
        return [...modsToSort].sort((a, b) => b.downloads - a.downloads);
      case "views":
        return [...modsToSort].sort((a, b) => b.views - a.views);
      case "featured":
        return [...modsToSort].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
        );
      case "popular":
      default:
        return [...modsToSort].sort(
          (a, b) => b.downloads * 2 + b.views - (a.downloads * 2 + a.views),
        );
    }
  };

  const getFilteredMods = () => {
    let filteredMods = [...mods];

    if (selectedType !== "All") {
      filteredMods = filteredMods.filter(
        (mod) => mod.meta.type === selectedType,
      );
    }

    if (selectedCategory) {
      filteredMods = filteredMods.filter((mod) =>
        mod.meta.category.includes(selectedCategory as ModCategory),
      );
    }

    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      filteredMods = filteredMods.filter(
        (mod) =>
          mod.name.toLowerCase().includes(searchLower) ||
          mod.meta.description.toLowerCase().includes(searchLower) ||
          mod.meta.author.toLowerCase().includes(searchLower),
      );
    }

    return getSortedMods(filteredMods);
  };

  useEffect(() => {
    const loadMods = async () => {
      setLoading(true);
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

  const filteredAndSortedMods = getFilteredMods();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <SkeletonModCard key={index} />
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

    if (filteredAndSortedMods.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-miku-gray/50 text-miku-light px-6 py-4 rounded-lg border border-miku-deep/30 backdrop-blur-sm">
            No mods found matching your criteria
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
          {filteredAndSortedMods.map((mod) => (
            <motion.div
              key={mod._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ModCard mod={mod} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-miku-gray to-black">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Title Section */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-miku-teal via-miku-waterleaf to-miku-aquamarine text-transparent bg-clip-text">
              Browse Mods
            </h1>
            <p className="text-base sm:text-lg text-miku-light/70">
              Discover and download community-created mods
            </p>
          </div>

          {/* Search and Filters Card */}
          <div className="bg-miku-deep/10 backdrop-blur-sm border border-miku-deep/20 rounded-xl p-4 sm:p-6">
            {/* Search Bar */}
            <div className="relative mb-4 sm:mb-6">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-miku-light/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search mods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-miku-deep/20 border border-miku-deep/30 rounded-lg text-miku-light focus:outline-none focus:border-miku-teal/50 focus:ring-1 focus:ring-miku-teal/50 transition-all duration-200"
              />
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr,2fr,3fr] gap-4">
              {/* Sort Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-miku-light/70">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as SortOption["value"])
                  }
                  className="px-4 py-2.5 bg-miku-deep/20 border border-miku-deep/30 rounded-lg text-miku-light focus:outline-none focus:border-miku-teal/50 focus:ring-1 focus:ring-miku-teal/50 transition-all duration-200"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-miku-light/70">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2.5 bg-miku-deep/20 border border-miku-deep/30 rounded-lg text-miku-light focus:outline-none focus:border-miku-teal/50 focus:ring-1 focus:ring-miku-teal/50 transition-all duration-200"
                >
                  {MOD_CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mod Type Buttons */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-miku-light/70">Mod Type</label>
                <div className="flex flex-wrap gap-2">
                  {modTypeButtons.map(({ type, icon, label, colors }) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`
                        flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg 
                        transition-all duration-200 text-sm
                        ${
                          selectedType === type
                            ? `bg-gradient-to-r ${colors} text-white shadow-lg shadow-miku-teal/20 scale-105`
                            : `bg-miku-deep/20 text-miku-light hover:bg-miku-deep/30 hover:scale-105`
                        }
                      `}
                    >
                      {icon} {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Filters */}
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-miku-light/70">
                Active Filters:
              </span>
              {selectedType !== "All" && (
                <span className="px-3 py-1 text-sm bg-miku-teal/20 text-miku-teal rounded-full">
                  {selectedType}
                </span>
              )}
              {selectedCategory && (
                <span className="px-3 py-1 text-sm bg-miku-teal/20 text-miku-teal rounded-full">
                  {
                    MOD_CATEGORIES.find((c) => c.value === selectedCategory)
                      ?.label
                  }
                </span>
              )}
              {searchQuery && (
                <span className="px-3 py-1 text-sm bg-miku-teal/20 text-miku-teal rounded-full">
                  Search: {searchQuery}
                </span>
              )}
              {(selectedType !== "All" || selectedCategory || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedType("All");
                    setSelectedCategory("");
                    setSearchQuery("");
                  }}
                  className="px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm sm:text-base text-miku-light/70">
          Showing {filteredAndSortedMods.length}{" "}
          {filteredAndSortedMods.length === 1 ? "mod" : "mods"}
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
