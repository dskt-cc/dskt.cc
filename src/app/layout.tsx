import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Navbar } from "@containers/Header/Navbar";
import { Footer } from "@containers/Footer/Footer";

const jbMono = localFont({
  src: [
    {
      path: "fonts/jetbrainsMono/JetBrainsMono-Regular.woff2",
    },
    {
      path: "fonts/jetbrainsMono/JetBrainsMono-Thin.woff2",
    },
    {
      path: "fonts/jetbrainsMono/JetBrainsMono-Bold.woff2",
    },
    {
      path: "fonts/jetbrainsMono/JetBrainsMono-Italic.woff2",
    }
  ],
});

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "dskt.cc - Desktop Mate Modding",
  },
  description:
    "Transform your Desktop Mate experience with mods. Create, share, and discover mods for both MelonLoader and BepInEx.",
  applicationName: "dskt.cc",
  authors: [{ name: "dskt.cc Team" }],
  generator: "Next.js",
  keywords: [
    "Desktop Mate",
    "modding",
    "mods",
    "MelonLoader",
    "BepInEx",
    "gaming",
    "customization",
    "development",
  ],
  creator: "dskt.cc Team",
  publisher: "dskt.cc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dskt.cc"),
  openGraph: {
    title: "dskt.cc - Desktop Mate Modding",
    description:
      "Transform your Desktop Mate experience with mods. Create, share, and discover mods for both MelonLoader and BepInEx.",
    url: "https://dskt.cc",
    siteName: "dskt.cc",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "dskt.cc - Desktop Mate Modding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dskt.cc - Desktop Mate Modding",
    description:
      "Transform your Desktop Mate experience with mods. Create, share, and discover mods for both MelonLoader and BepInEx.",
    images: ["/twitter-image.png"],
    creator: "@dskt_cc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  other: {
    "msapplication-TileColor": "#86cecb",
    "apple-mobile-web-app-title": "dskt.cc",
    "application-name": "dskt.cc",
  },
};

export const viewport: Viewport = {
  themeColor: "#86cecb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark",
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
          ${jbMono.className}
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
