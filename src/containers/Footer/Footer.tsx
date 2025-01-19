"use client";

import React, { useEffect, useState } from "react";
import { SiNextdotjs, SiReact, SiTailwindcss } from "react-icons/si";

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
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <p className="font-mono text-sm text-miku-light hover:text-miku-teal transition-colors duration-200">
            © 2025-{currentYear} dskt.cc
          </p>

          <p className="text-sm text-miku-light">
            Not affiliated with Desktop Mate and/or infiniteloop
          </p>

          <div className="flex items-center gap-2 text-miku-teal bg-miku-deep/20 px-4 py-2 rounded-lg hover:bg-miku-deep/30 transition-all duration-200">
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
            <span className="font-mono text-xs border-l border-miku-deep pl-2 ml-1">
              {gitHash ? `#${gitHash}` : "..."}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return <FooterContent />;
}
