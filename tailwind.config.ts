import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem", /* 9px */
        md: ".375rem", /* 6px */
        sm: ".1875rem", /* 3px */
      },
      colors: {
        // Flat / base colors (regular buttons)
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          border: "hsl(var(--card-border) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          border: "hsl(var(--popover-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          border: "var(--accent-border)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          border: "var(--destructive-border)",
        },
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
        },
        "sidebar-primary": {
          DEFAULT: "hsl(var(--sidebar-primary) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          border: "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT: "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "var(--sidebar-accent-border)"
        },
        status: {
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "flash": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "arrow-flash": {
          "0%, 45%": { opacity: "1", color: "rgb(255, 255, 255)", textShadow: "0 0 12px rgba(99, 179, 255, 1), 0 0 24px rgba(99, 179, 255, 0.8)" },
          "50%": { opacity: "0", color: "rgb(96, 165, 250)", textShadow: "none" },
          "55%, 100%": { opacity: "1", color: "rgb(255, 255, 255)", textShadow: "0 0 12px rgba(99, 179, 255, 1), 0 0 24px rgba(99, 179, 255, 0.8)" },
        },
        "cover-flash": {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
        "word-sequence": {
          "0%": { opacity: "0" },
          "8%": { opacity: "1" },
          "28%": { opacity: "1" },
          "36%": { opacity: "0" },
          "37%, 100%": { opacity: "0" },
        },
        "arrow-seq-flash": {
          "0%, 9%": { opacity: "0" },
          "10%, 21%": { opacity: "1" },
          "22%, 100%": { opacity: "0" },
        },
        "word-fade": {
          '0%': { opacity: '0' },
          '10%': { opacity: '1' },
          '21%': { opacity: '1' },
          '31%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
        "word-cover": {
          "0%": { opacity: "1" },
          "8%": { opacity: "0" },
          "28%": { opacity: "0" },
          "36%": { opacity: "1" },
          "37%, 100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "flash": "flash 3.12s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "arrow-flash": "arrow-flash 5.4s linear infinite",
        "cover-flash": "cover-flash 5.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "arrow-seq-flash": "arrow-seq-flash 5.4s linear infinite",
        "word-fade": "word-fade 5.4s linear infinite",
        "word-sequence": "word-sequence 16.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "word-cover": "word-cover 16.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
