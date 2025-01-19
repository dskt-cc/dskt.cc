"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { TbMenu2, TbX } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import type { DocsStructure } from "@/types/docs";

const DOCS_STRUCTURE: DocsStructure = {
  "getting-started": {
    title: "Getting Started",
    items: [
      { title: "Installation", slug: "installation" },
      { title: "Quick Start", slug: "quick-start" },
    ],
  },
  "creating-mods": {
    title: "Creating Mods",
    items: [
      { title: "Setup", slug: "setup" },
      { title: "Publishing", slug: "publishing" },
    ],
  },
  "submitting-mods": {
    title: "Submitting Mods",
    items: [{ title: "Guidelines", slug: "guidelines" }],
  },
};

function SidebarContent({ 
    pathname, 
    onClose 
  }: { 
    pathname: string; 
    onClose: () => void;
  }) {
    return (
      <nav className="h-full lg:h-auto p-6 lg:p-0 space-y-8 lg:sticky lg:top-28">
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg bg-miku-deep/20 text-miku-light hover:text-miku-teal"
        >
          <TbX size={24} />
        </button>
        {Object.entries(DOCS_STRUCTURE).map(([section, { title, items }]) => (
          <div key={section}>
            <h3 className="text-sm font-semibold text-miku-teal uppercase tracking-wider mb-3">
              {title}
            </h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/docs/${section}/${item.slug}`}
                    onClick={onClose}
                    className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      pathname === `/docs/${section}/${item.slug}`
                        ? "bg-miku-deep/20 text-miku-teal"
                        : "text-miku-light hover:text-miku-waterleaf hover:bg-miku-deep/10"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    );
  }
  
  export function DocsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
  
    useEffect(() => {
      const checkScreenSize = () => {
        setIsLargeScreen(window.innerWidth >= 1024);
      };
  
      checkScreenSize();
      const handleResize = () => {
        checkScreenSize();
        if (window.innerWidth >= 1024) {
          setIsSidebarOpen(false);
        }
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-miku-gray to-black">
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="lg:hidden flex justify-end mb-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg bg-miku-deep/20 text-miku-light hover:text-miku-teal transition-colors duration-200"
              >
                <TbMenu2 size={24} />
              </button>
            </div>
  
            <div className="flex flex-col lg:flex-row relative">
              <AnimatePresence mode="wait">
                {(isSidebarOpen || isLargeScreen) && (
                  <motion.aside
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="lg:w-64 lg:flex-shrink-0 fixed lg:static top-[5.5rem] lg:top-auto inset-x-0 bottom-0 lg:bottom-auto lg:inset-auto z-30 bg-miku-gray/95 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none overflow-y-auto"
                  >
                    <SidebarContent pathname={pathname} onClose={closeSidebar} />
                  </motion.aside>
                )}
              </AnimatePresence>
  
              <main className="flex-1 lg:ml-8">
                <div className="prose prose-invert prose-sm sm:prose lg:prose-lg max-w-none">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }
  