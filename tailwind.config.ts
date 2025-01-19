import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        miku: {
          // Base colors
          gray: "#373b3e", // slate
          light: "#bec8d1", // light gray/blue
          teal: "#86cecb", // signature teal
          deep: "#137a7f", // deep teal
          pink: "#e12885", // accent pink

          // Additional teal spectrum
          aquamarine: "#80d4e5", // bright aqua
          waterleaf: "#a1e2e8", // soft teal
          padua: "#a6e3d2", // mint teal
          iceCold1: "#b1f1e2", // light ice
          iceCold2: "#c1f6da", // pale ice

          // RGB variations
          teal100: "rgb(128, 212, 229)", // aquamarine
          teal200: "rgb(161, 226, 232)", // waterleaf
          teal300: "rgb(166, 227, 210)", // padua
          teal400: "rgb(177, 241, 226)", // ice cold 1
          teal500: "rgb(193, 246, 218)", // ice cold 2
        },
      },
      typography: {
        miku: {
          css: {
            "--tw-prose-body": "#bec8d1",
            "--tw-prose-headings": "#86cecb",
            "--tw-prose-links": "#e12885",
            "--tw-prose-bold": "#a1e2e8",
            "--tw-prose-counters": "#86cecb",
            "--tw-prose-bullets": "#86cecb",
            "--tw-prose-hr": "#137a7f",
            "--tw-prose-quotes": "#a1e2e8",
            "--tw-prose-quote-borders": "#137a7f",
            "--tw-prose-captions": "#bec8d1",
            "--tw-prose-code": "#bec8d1",
            "--tw-prose-pre-code": "#bec8d1",
            "--tw-prose-pre-bg": "#373b3e",
            "--tw-prose-th-borders": "#137a7f",
            "--tw-prose-td-borders": "#137a7f",
          },
        },
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#bec8d1",
            h1: {
              color: "#86cecb",
              fontWeight: "700",
            },
            h2: {
              color: "#86cecb",
              fontWeight: "600",
            },
            h3: {
              color: "#86cecb",
              fontWeight: "600",
            },
            h4: {
              color: "#86cecb",
              fontWeight: "600",
            },
            a: {
              color: "#e12885",
              fontWeight: "600",
              textDecoration: "none",
              "&:hover": {
                color: "#86cecb",
                textDecoration: "underline",
              },
            },
            strong: {
              color: "#a1e2e8",
              fontWeight: "600",
            },
            code: {
              color: "#e12885",
              backgroundColor: "#373b3e",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.375rem",
              fontWeight: "500",
              "&::before": {
                content: '""',
              },
              "&::after": {
                content: '""',
              },
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "#373b3e",
              color: "#bec8d1",
              code: {
                backgroundColor: "transparent",
                color: "inherit",
                padding: "0",
                fontWeight: "400",
              },
            },
            ul: {
              listStyleType: "disc",
              color: "#bec8d1",
            },
            "ul > li": {
              color: "#bec8d1",
              "&::marker": {
                color: "#86cecb",
              },
            },
            "ul > li::marker": {
              color: "#86cecb",
            },
            hr: {
              borderColor: "#137a7f",
            },
            blockquote: {
              color: "#a1e2e8",
              borderLeftColor: "#137a7f",
              fontStyle: "italic",
            },
            "blockquote p:first-of-type::before": {
              content: '""',
            },
            "blockquote p:last-of-type::after": {
              content: '""',
            },
            em: {
              color: "#a1e2e8",
            },
            thead: {
              color: "#86cecb",
              borderBottomColor: "#137a7f",
            },
            "tbody tr": {
              borderBottomColor: "#137a7f",
            },
          },
        },
      },
      backgroundImage: {
        "miku-gradient": "linear-gradient(to right, #86cecb, #e12885)",
        "miku-dark": "linear-gradient(to right, #137a7f, #86cecb)",
        "miku-light": "linear-gradient(to right, #bec8d1, #86cecb)",
        "miku-teal": "linear-gradient(to right, #80d4e5, #c1f6da)",
        "miku-ice": "linear-gradient(to right, #a6e3d2, #b1f1e2)",
      },
    },
  },
  darkMode: "class",
  plugins: [typography],
};

export default config;
