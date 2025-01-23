"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchMods } from "@lib/mods.lib";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

interface Contributor {
  username: string;
  avatarUrl: string;
  contributions: string[];
  role?: string;
  id: string; // Add unique ID
}

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContributors = async () => {
      try {
        const mods = await fetchMods();
        
        // Get unique authors from mods
        const authorMap = new Map<string, string[]>();
        mods.forEach(mod => {
          if (mod.meta?.author) {
            const existing = authorMap.get(mod.meta.author) || [];
            authorMap.set(mod.meta.author, [...existing, mod.name]);
          }
        });

        // Fetch GitHub data for all contributors
        const contributorPromises = Array.from(authorMap.entries()).map(
          async ([username, mods]) => {
            try {
              const response = await fetch(`https://api.github.com/users/${username}`);
              const data = await response.json();
              return {
                username,
                avatarUrl: data.avatar_url,
                contributions: mods,
                id: `author-${username}`, // Add unique ID prefix
              };
            } catch (error) {
              console.error(`Error fetching data for ${username}:`, error);
              return null;
            }
          }
        );

        const modAuthors = (await Promise.all(contributorPromises)).filter(
          (author): author is Contributor => author !== null
        );

        // If dvhsh is in modAuthors, merge the contributions with the lead developer entry
        const dvhshAuthor = modAuthors.find(author => author.username === "dvhsh");
        const otherAuthors = modAuthors.filter(author => author.username !== "dvhsh");

        const leadDeveloper: Contributor = {
          username: "dvhsh",
          avatarUrl: dvhshAuthor?.avatarUrl || "https://api.github.com/users/dvhsh",
          contributions: dvhshAuthor?.contributions || [],
          role: "Lead Developer",
          id: "lead-dvhsh", // Unique ID for lead developer entry
        };

        setContributors([leadDeveloper, ...otherAuthors]);
      } catch (error) {
        console.error("Error loading contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContributors();
  }, []);

  const ContributorCard = ({ contributor }: { contributor: Contributor }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-miku-gray/50 backdrop-blur-sm rounded-xl border border-miku-deep/20 hover:border-miku-teal/30 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16">
            <Image
              src={contributor.avatarUrl}
              alt={contributor.username}
              fill
              className="object-cover rounded-lg ring-2 ring-miku-teal/20"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-miku-waterleaf">
              {contributor.username}
            </h3>
            {contributor.role && (
              <p className="text-miku-teal">{contributor.role}</p>
            )}
          </div>
          <a
            href={`https://github.com/${contributor.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-miku-light hover:text-miku-teal transition-colors duration-200"
          >
            <FaGithub size={24} />
          </a>
        </div>
        {contributor.contributions.length > 0 && (
          <div>
            <h4 className="text-sm text-miku-light/70 mb-2">Contributions:</h4>
            <div className="flex flex-wrap gap-2">
              {contributor.contributions.map((mod) => (
                <a
                  key={mod}
                  href={`/mods/${mod.toLowerCase()}`}
                  className="px-3 py-1 text-sm bg-miku-deep/20 text-miku-teal rounded-full hover:bg-miku-deep/30 hover:text-miku-waterleaf transition-all duration-200"
                >
                  {mod}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );  

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-miku-gray/50 to-black py-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-miku-deep/20 rounded-xl border border-miku-deep/30"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-miku-gray/50 to-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-miku-teal via-miku-waterleaf to-miku-aquamarine text-transparent bg-clip-text">
            Contributors
          </h1>
          <p className="text-miku-light/70">
            Meet the people who make dskt.cc & Desktop Mate modding possible
          </p>
        </div>

        <div className="grid gap-6">
          {contributors.map((contributor) => (
            <ContributorCard key={contributor.id} contributor={contributor} />
          ))}
        </div>
      </div>
    </div>
  );
}
