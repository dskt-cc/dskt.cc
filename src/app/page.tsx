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
    icon: <TbDownload className="text-miku-waterleaf" />,
    buttonText: "Installation Guide",
  },
  {
    title: "Create Mods",
    description:
      "Ready to create? Dive into our documentation covering both MelonLoader and BepInEx mod development.",
    href: "/docs/creating-mods/setup",
    icon: <TbBook className="text-miku-waterleaf" />,
    buttonText: "Read the Docs",
  },
  {
    title: "Submit Mods",
    description:
      "Built something amazing? Learn how to share your creation with the Desktop Mate community.",
    href: "/docs/submitting-mods/guidelines",
    icon: <TbCube className="text-miku-waterleaf" />,
    buttonText: "Publishing Guide",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-miku-gray to-black">
      <div className="container mx-auto px-4 pt-16 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl py-2 md:text-6xl font-bold mb-8 bg-gradient-to-r from-miku-deep via-miku-teal to-miku-waterleaf text-transparent bg-clip-text">
            Desktop Mate Modding
          </h1>
          <p className="text-xl text-miku-light mb-12 leading-relaxed">
            Transform your Desktop Mate experience with mods. Whether you prefer
            MelonLoader or BepInEx, we&apos;ve got everything you need to get
            started, create, and share mods with the community.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <GradientButton href="/mods" gradient="primary">
              <TbCube className="text-xl" />
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

          <p className="mt-16 text-sm text-miku-light/60 hover:text-miku-light/80 transition-colors duration-200">
            Desktop Mate modding supports both MelonLoader and BepInEx mod
            loaders. Choose your preferred platform and start customizing today!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
