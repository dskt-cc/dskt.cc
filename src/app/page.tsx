"use client";

import { motion } from "framer-motion";
import { DiscordButton } from "@/components/Button/DiscordButton";
import { GradientButton } from "@/components/Button/GradientButton";
import { TbDownload, TbBook, TbCube } from "react-icons/tb";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            Enhance Your Desktop Mate
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Discover and install mods to customize your Desktop Mate experience.
            Join our community of creators and enthusiasts!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <DiscordButton />
            <GradientButton href="/mods">
              <TbCube />
              Browse Mods
            </GradientButton>
          </div>

          {/* @TODO: make these card things components */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">
                Getting Started
              </h3>
              <p className="text-gray-400 mb-4">
                New to modding? Follow our simple installation guide to get
                started.
              </p>
              <GradientButton href="/docs/getting-started" gradient="secondary">
                <TbDownload />
                Installation Guide
              </GradientButton>
            </div>

            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">
                Create Mods
              </h3>
              <p className="text-gray-400 mb-4">
                Learn how to create and share your own mods with our
                documentation.
              </p>
              <GradientButton href="/docs/creating-mods" gradient="secondary">
                <TbBook />
                Read the Docs
              </GradientButton>
            </div>

            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">
                Submit Mods
              </h3>
              <p className="text-gray-400 mb-4">
                Created something cool? Share it with the community through our
                repo.
              </p>
              <GradientButton href="/docs/submitting-mods" gradient="secondary">
                <TbCube />
                Submit Your Mod
              </GradientButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
