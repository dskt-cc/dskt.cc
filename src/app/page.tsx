"use client";

import { motion } from "framer-motion";
import { GradientButton } from "@/components/Button/GradientButton";
import { LandingCard } from "@/components/Card/LandingCard";
import { TbDownload, TbBook, TbCube } from "react-icons/tb";

const LANDING_CARDS = [
  {
    title: "Getting Started",
    description:
      "New to modding? Learn how to install MelonLoader or BepInEx and get your first mods running in minutes.",
    href: "/docs/getting-started/installation",
    icon: <TbDownload />,
    buttonText: "Installation Guide",
  },
  {
    title: "Create Mods",
    description:
      "Ready to create? Dive into our documentation covering both MelonLoader and BepInEx mod development.",
    href: "/docs/creating-mods/setup",
    icon: <TbBook />,
    buttonText: "Read the Docs",
  },
  {
    title: "Submit Mods",
    description:
      "Built something amazing? Learn how to share your creation with the Desktop Mate community.",
    href: "/docs/submitting-mods/guidelines",
    icon: <TbCube />,
    buttonText: "Publishing Guide",
  },
];

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
            Desktop Mate Modding
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Transform your Desktop Mate experience with mods. Whether you prefer
            MelonLoader or BepInEx, we&apos;ve got everything you need to get
            started, create, and share mods with the community.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <GradientButton href="/mods">
              <TbCube />
              Browse Mods
            </GradientButton>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {LANDING_CARDS.map((card) => (
              <LandingCard
                key={card.title}
                title={card.title}
                description={card.description}
                href={card.href}
                icon={card.icon}
                buttonText={card.buttonText}
              />
            ))}
          </div>

          <p className="mt-16 text-sm text-gray-500">
            Desktop Mate modding supports both MelonLoader and BepInEx mod
            loaders. Choose your preferred platform and start customizing today!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
