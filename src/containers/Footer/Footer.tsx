"use client";

import React, { useEffect, useState } from "react";
import { SiNextdotjs, SiReact, SiTailwindcss } from "react-icons/si";
import Link from "next/link";

function FooterContent() {
  const currentYear = new Date().getFullYear();
  const [gitHash, setGitHash] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/dskt-cc/dskt.cc/commits/main")
      .then((response) => response.json())
      .then((data) => {
        setGitHash(data.sha.substring(0, 7));
      })
      .catch((error) => console.error("Error fetching Git hash:", error));
  }, []);

  return (
    <footer className="border-t border-miku-deep/30 bg-miku-gray/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col py-4">
          {/* Main footer content */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between sm:h-16">
            <p className="hidden xs:block font-mono text-sm text-miku-light hover:text-miku-teal transition-colors duration-200">
              © 2025-{currentYear} dskt.cc
            </p>

            <p className="text-sm text-center text-miku-light order-2 sm:order-none">
              Not affiliated with Desktop Mate and/or infiniteloop
            </p>

            <div className="flex items-center gap-2 text-miku-teal bg-miku-deep/20 px-4 py-2 rounded-lg hover:bg-miku-deep/30 transition-all duration-200 order-1 sm:order-none">
              <div className="flex items-center gap-2">
                <SiNextdotjs
                  size={16}
                  className="hover:text-miku-waterleaf transition-colors duration-200"
                />
                <SiReact
                  size={16}
                  className="hover:text-miku-waterleaf transition-colors duration-200"
                />
                <SiTailwindcss
                  size={16}
                  className="hover:text-miku-waterleaf transition-colors duration-200"
                />
              </div>
              <span className="hidden sm:inline font-mono text-xs border-l border-miku-deep pl-2 ml-1">
                {gitHash ? `#${gitHash}` : "..."}
              </span>
            </div>

            <p className="xs:hidden font-mono text-xs text-miku-light/70 order-3">
              © 2025-{currentYear} dskt.cc
            </p>
          </div>

          {/* Links section */}
          <div className="flex justify-center gap-x-6 pt-4 pb-2 border-t border-miku-deep/20 mt-4 text-sm">
            <Link
              href="/privacy"
              className="text-miku-light/70 hover:text-miku-teal transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-miku-light/70 hover:text-miku-teal transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="/contributors"
              className="text-miku-light/70 hover:text-miku-teal transition-colors duration-200"
            >
              Contributors
            </Link>
            <Link
              href="/bugs"
              className="text-miku-light/70 hover:text-miku-teal transition-colors duration-200"
            >
              Bugs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return <FooterContent />;
}
