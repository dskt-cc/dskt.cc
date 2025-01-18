'use client';

import { motion } from "framer-motion";
import Link from "next/link";

interface GradientButtonProps {
    href: string;
    children: React.ReactNode;
    gradient?: "primary" | "secondary";
}

export const GradientButton = ({ href, children, gradient = "primary" }: GradientButtonProps) => {
    const gradientClasses = {
        primary: "from-green-400 to-blue-500",
        secondary: "from-purple-400 to-pink-500"
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Link 
                href={href}
                className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${gradientClasses[gradient]} text-white rounded-lg`}
            >
                {children}
            </Link>
        </motion.div>
    );
};