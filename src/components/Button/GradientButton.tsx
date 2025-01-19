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
    primary: "from-miku-deep via-miku-teal to-miku-waterleaf",
    secondary: "from-miku-deep via-miku-teal to-miku-waterleaf",
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
          inline-flex items-center gap-2 px-6 py-3 
          bg-gradient-to-r ${gradientClasses[gradient]} 
          text-white rounded-lg 
          shadow-lg shadow-miku-deep/20
          hover:shadow-miku-teal/20 
          transition-all duration-200
          font-medium
          hover:brightness-110
        `}
      >
        {children}
      </Link>
    </motion.div>
  );
};
