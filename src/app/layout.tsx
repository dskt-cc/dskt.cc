import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@containers/Header/Navbar";
import { Footer } from "@containers/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dskt.cc - Desktop Mate Modding",
  description: "Desktop Mate Modding Repository",
  themeColor: "#86cecb", // Miku teal
};

export const viewport: Viewport = {
  themeColor: "#86cecb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          font-sans 
          bg-background 
          text-foreground
          selection:bg-miku-teal/30
          selection:text-miku-light
        `}
        style={
          {
            "--background": "#0a0b0c",
            "--foreground": "#bec8d1",
          } as React.CSSProperties
        }
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>

        <div
          className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--miku-teal-transparent),transparent_50%),radial-gradient(ellipse_at_bottom,_var(--miku-deep-transparent),transparent_50%)]"
          style={
            {
              "--miku-teal-transparent": "#86cecb15",
              "--miku-deep-transparent": "#137a7f15",
            } as React.CSSProperties
          }
        />
      </body>
    </html>
  );
}
