"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface GradientButtonProps {
  href: string;
  children: React.ReactNode;
  gradient?: "primary" | "secondary";
  className?: string;
}

export const GradientButton = ({
  href,
  children,
  gradient = "primary",
  className = "",
}: GradientButtonProps) => {
  const gradientClasses = {
    primary:
      "from-miku-deep from-10% via-miku-teal/90 via-50% to-miku-waterleaf/80 to-90%",
    secondary:
      "from-miku-deep from-10% via-miku-teal/90 via-50% to-miku-waterleaf/80 to-90%",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <Link
        href={href}
        className={`
          relative
          inline-flex items-center gap-2 px-6 py-3 
          rounded-lg 
          shadow-lg shadow-miku-deep/20
          hover:shadow-miku-teal/20 
          transition-all duration-200
          font-medium
          backdrop-blur-sm
          overflow-hidden
          group
        `}
      >
        <div
          className={`
          absolute inset-0 
          bg-gradient-to-r ${gradientClasses[gradient]}
          group-hover:brightness-105
          transition-all duration-200
        `}
        />
        <div className="absolute inset-0 border border-miku-teal/10 group-hover:border-miku-teal/20 rounded-lg transition-colors duration-200" />
        <div className="relative flex items-center gap-2 text-white">
          {children}
        </div>
      </Link>
    </motion.div>
  );
};
