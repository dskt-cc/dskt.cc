"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { TbMenu2, TbX, TbChevronDown } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import DOCS_STRUCTURE from "@constants/docs";

function NavItem({
  section,
  item,
  pathname,
  onClose,
}: {
  section: string;
  item: {
    title: string;
    slug: string;
    subitems?: Array<{ title: string; slug: string }>;
  };
  pathname: string;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubitems = item.subitems && item.subitems.length > 0;
  const baseUrl = `/docs/${section}/${item.slug}`;
  const isActive = pathname === baseUrl;
  const isSubitemActive = item.subitems?.some(
    (subitem) => pathname === `${baseUrl}/${subitem.slug}`,
  );

  // Auto-expand if a subitem is active
  useEffect(() => {
    if (isSubitemActive) {
      setIsOpen(true);
    }
  }, [isSubitemActive]);

  return (
    <li>
      <div className="relative">
        {hasSubitems ? (
          // If has subitems, make it a button that toggles the dropdown
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full group flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              isActive || isSubitemActive
                ? "bg-miku-deep/20 text-miku-teal"
                : "text-miku-light hover:text-miku-waterleaf hover:bg-miku-deep/10"
            }`}
          >
            <span>{item.title}</span>
            <TbChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        ) : (
          // If no subitems, make it a regular link
          <Link
            href={baseUrl}
            onClick={onClose}
            className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              isActive
                ? "bg-miku-deep/20 text-miku-teal"
                : "text-miku-light hover:text-miku-waterleaf hover:bg-miku-deep/10"
            }`}
          >
            {item.title}
          </Link>
        )}

        {hasSubitems && (
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden ml-4 mt-1 space-y-1"
              >
                {item.subitems.map((subitem) => {
                  const subitemUrl = `${baseUrl}/${subitem.slug}`;
                  return (
                    <li key={subitem.slug}>
                      <Link
                        href={subitemUrl}
                        onClick={onClose}
                        className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                          pathname === subitemUrl
                            ? "bg-miku-deep/20 text-miku-teal"
                            : "text-miku-light/80 hover:text-miku-waterleaf hover:bg-miku-deep/10"
                        }`}
                      >
                        {subitem.title}
                      </Link>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        )}
      </div>
    </li>
  );
}

function SidebarContent({
  pathname,
  onClose,
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
              <NavItem
                key={item.slug}
                section={section}
                item={item}
                pathname={pathname}
                onClose={onClose}
              />
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-miku-gray to-black">
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="lg:hidden flex justify-end mb-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg bg-miku-deep/20 text-miku-light hover:text-miku-teal transition-colors duration-200"
              aria-label="Open navigation"
            >
              <TbMenu2 size={24} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row relative">
            <AnimatePresence mode="wait">
              {(isSidebarOpen || isLargeScreen) && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/50 lg:hidden z-20"
                    onClick={() => setIsSidebarOpen(false)}
                  />
                  <motion.aside
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="lg:w-64 lg:flex-shrink-0 fixed lg:static top-[5.5rem] lg:top-auto inset-x-0 bottom-0 lg:bottom-auto lg:inset-auto z-30 bg-miku-gray/95 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none overflow-y-auto"
                  >
                    <SidebarContent
                      pathname={pathname}
                      onClose={() => setIsSidebarOpen(false)}
                    />
                  </motion.aside>
                </>
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
