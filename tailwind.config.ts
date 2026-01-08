import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Custom badge colors
        success: {
          light: "#D1FAE5",
          DEFAULT: "#059669",
        },
        warning: {
          light: "#FFEDD5",
          DEFAULT: "#EA580C",
        },
        info: {
          light: "#DBEAFE",
          DEFAULT: "#2563EB",
        },
        // Text colors
        "text-primary": "#111827",
        "text-secondary": "#6B7280",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        "page-title": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        "section-title": ["16px", { lineHeight: "1.5", fontWeight: "600" }],
        "table-text": ["14px", { lineHeight: "1.5" }],
        "badge-text": ["12px", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

