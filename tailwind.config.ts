import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#6366f1",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#d1d5db',
            'h1, h2, h3, h4': {
              color: '#4f46e5',
            },
            a: {
              color: '#6366f1',
              fontWeight: 'bold',
              '&:hover': {
                color: '#4f46e5',
              },
            },
            code: {
              color: '#e5e7eb',
              backgroundColor: '#374151',
              padding: '0.3rem 0.5rem',
              borderRadius: '0.375rem',
            },
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [typography],
};

export default config;
