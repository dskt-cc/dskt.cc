import type { Metadata } from "next";
import type { ReactNode } from "react";

interface ModLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Mods | dskt.cc",
  description: "Desktop Mate modding community",
  themeColor: "#86cecb",
};

export default function ModLayout({ children }: ModLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-miku-gray to-black">
      {children}
    </div>
  );
}
