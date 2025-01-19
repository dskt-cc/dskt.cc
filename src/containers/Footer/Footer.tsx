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
    <footer className="border-t border-gray-700/50 bg-gray-800/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <p className="font-mono text-sm text-gray-400">
            © 2025-{currentYear} dskt.cc
          </p>

          <p className="text-sm text-gray-400">
            Not affiliated with Desktop Mate and/or infiniteloop
          </p>

          <div className="flex items-center gap-2 text-gray-400 bg-purple-500/10 px-4 py-2 rounded-lg">
            <SiNextdotjs size={16} />
            <SiReact size={16} />
            <SiTailwindcss size={16} />
            <span className="font-mono text-xs border-l border-gray-600 pl-2 ml-1">
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
