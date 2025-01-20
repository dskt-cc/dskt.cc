"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ModCard } from "@components/Card/ModCard";
import { TbDownload, TbBook, TbCube, TbArrowRight } from "react-icons/tb";
import { fetchFeaturedMods, fetchModStats } from "@lib/mods.lib";
import type { Mod } from "@/types";
import Link from "next/link";

interface Stats {
  totalMods: number;
  totalDownloads: number;
  totalViews: number;
}

const QuickLink = ({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) => (
  <Link href={href}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="group p-4 sm:p-6 bg-gradient-to-br from-miku-deep/10 to-miku-deep/20 rounded-xl border border-miku-deep/20 transition-all duration-300 hover:border-miku-teal/30 hover:from-miku-deep/20 hover:to-miku-deep/30"
    >
      <div className="text-miku-teal mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-miku-waterleaf">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-miku-waterleaf mb-2 transition-colors duration-300 group-hover:text-miku-teal">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-miku-light/70">{description}</p>
    </motion.div>
  </Link>
);

const StatsCard = ({ value, label }: { value: number; label: string }) => (
  <div className="p-4 sm:p-6 bg-gradient-to-br from-miku-deep/10 to-miku-deep/20 rounded-xl border border-miku-deep/20 backdrop-blur-sm">
    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-miku-teal to-miku-waterleaf text-transparent bg-clip-text mb-2">
      {value.toLocaleString()}
    </div>
    <div className="text-sm sm:text-base text-miku-light/70">{label}</div>
  </div>
);

const SkeletonLoader = () => (
  <div className="min-h-screen bg-gradient-to-b from-miku-gray/50 to-black">
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(134,206,203,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-32">
          <div className="h-20 w-3/4 bg-gradient-to-r from-miku-deep/10 to-miku-deep/20 rounded-xl mb-6 mx-auto animate-pulse" />
          <div className="h-16 w-1/2 bg-gradient-to-r from-miku-deep/10 to-miku-deep/20 rounded-xl mb-12 mx-auto animate-pulse" />
          <div className="flex justify-center gap-6">
            <div className="h-14 w-40 bg-gradient-to-r from-miku-deep/10 to-miku-deep/20 rounded-xl animate-pulse" />
            <div className="h-14 w-40 bg-gradient-to-r from-miku-deep/10 to-miku-deep/20 rounded-xl animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gradient-to-r from-miku-deep/10 to-miku-deep/20 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default function HomePage() {
  const [stats, setStats] = useState<Stats>({
    totalMods: 0,
    totalDownloads: 0,
    totalViews: 0,
  });
  const [featuredMods, setFeaturedMods] = useState<Mod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, featuredModsData] = await Promise.all([
          fetchModStats(),
          fetchFeaturedMods(),
        ]);

        if (statsData) {
          setStats({
            totalMods: statsData.length,
            totalDownloads: statsData.reduce(
              (acc, mod) => acc + (mod.downloads || 0),
              0,
            ),
            totalViews: statsData.reduce(
              (acc, mod) => acc + (mod.views || 0),
              0,
            ),
          });
        }

        if (featuredModsData) {
          setFeaturedMods(
            Array.isArray(featuredModsData) ? featuredModsData : [],
          );
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <SkeletonLoader />;
  return (
    <div className="min-h-screen bg-gradient-to-b from-miku-gray/50 to-black">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(134,206,203,0.05)_1px,transparent_1px)] [background-size:24px_24px] z-0" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 sm:mb-24 lg:mb-32"
          >
            {/* Hero Title */}
            <h1 className="text-4xl pb-2 sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-miku-teal via-miku-waterleaf to-miku-aquamarine text-transparent bg-clip-text">
              Desktop Mate
              <br className="hidden sm:block" />
              Modding
            </h1>

            <p className="text-base sm:text-lg text-miku-light/60 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Supporting both MelonLoader and BepInEx mod loaders. Choose your
              preferred platform and start customizing today!
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 relative z-10 w-full max-w-xl mx-auto px-4">
              <Link
                href="/mods"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-miku-deep to-miku-teal rounded-xl text-white font-medium text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-miku-teal/20 hover:scale-105 relative z-10 w-full sm:w-auto"
              >
                Browse Mods
                <TbArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/docs/getting-started/installation"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-br from-miku-deep/10 to-miku-deep/20 border border-miku-deep/20 rounded-xl text-white font-medium text-base sm:text-lg transition-all duration-300 hover:border-miku-teal/30 hover:from-miku-deep/20 hover:to-miku-deep/30 hover:scale-105 relative z-10 w-full sm:w-auto"
              >
                Get Started
                <TbArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4"
          >
            <StatsCard value={stats.totalMods} label="Available Mods" />
            <StatsCard value={stats.totalDownloads} label="Downloads" />
            <StatsCard value={stats.totalViews} label="Views" />
          </motion.div>
        </div>
      </section>

      {/* Featured Mods Section */}
      {featuredMods.length > 0 && (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-miku-teal to-miku-waterleaf text-transparent bg-clip-text mb-3 sm:mb-4">
                Featured Mods
              </h2>
              <p className="text-base sm:text-lg text-miku-light/70">
                Check out these amazing community creations
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredMods.map((mod) => (
                <ModCard key={mod._id} mod={mod} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Links Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <QuickLink
              icon={<TbDownload size={24} />}
              title="Installation Guide"
              description="Get up and running with mods in minutes"
              href="/docs/getting-started/installation"
            />
            <QuickLink
              icon={<TbBook size={24} />}
              title="Create Mods"
              description="Learn how to build your own mods"
              href="/docs/creating-mods/setup"
            />
            <QuickLink
              icon={<TbCube size={24} />}
              title="Submit Mods"
              description="Share your creations with the community"
              href="/docs/submitting-mods/guidelines"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
