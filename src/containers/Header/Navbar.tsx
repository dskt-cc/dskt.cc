"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbCube, TbHome, TbBrandGithub, TbBook, TbMenu2 } from "react-icons/tb";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <TbHome className="text-xl" />,
    },
    {
      name: "Mods",
      path: "/mods",
      icon: <TbCube className="text-xl" />,
    },
    {
      name: "Docs",
      path: "/docs",
      icon: <TbBook className="text-xl" />,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-miku-gray/90 backdrop-blur-sm border-b border-miku-deep/30">
      <nav className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-miku-teal">dskt.cc</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative flex items-center gap-2 text-base ${
                  pathname === item.path
                    ? "text-miku-teal bg-miku-deep/20 px-4 py-2 rounded-lg"
                    : "text-miku-light hover:text-miku-waterleaf transition-colors duration-200"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/dskt-cc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-miku-light hover:text-miku-pink transition-colors duration-200"
            >
              <TbBrandGithub className="text-xl" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-miku-light hover:text-miku-teal transition-colors duration-200"
            >
              <TbMenu2 className="text-xl" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-miku-deep/30"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    pathname === item.path
                      ? "text-miku-teal bg-miku-deep/20"
                      : "text-miku-light hover:bg-miku-deep/10"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
