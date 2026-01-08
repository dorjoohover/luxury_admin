/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px", // extra small
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px", // custom large
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      // backgroundImage: {
      //   "diagonal-fade":
      //     "linear-gradient(55deg, #202020 20%, rgba(0,0,0,0) 80%)",
      //   "text-gradient":
      //     "linear-gradient(to right, #5330f1 12.31%, #c585d8 31.82%, #fa4b9a 55.82%, #ff8c6c 74.32%, #ff3800 95.82%)",
      // },
      colors: {
        background: {
          DEFAULT: "rgb(var(--background))",
        },
        foreground: {
          DEFAULT: "rgb(var(--foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
        },
        input: {
          DEFAULT: "rgb(var(--input))",
          foreground: "rgb(var(--input-background))",
          switch: "rgb(var(--switch-background))",
        },
        sidebar: {
          DEFAULT: "rgb(var(--sidebar))",
          foreground: "rgb(var(--sidebar-foreground))",
          primary: "rgb(var(--sidebar-primary))",
          accent: "rgb(var(--sidebar-accent))",
          border: "rgb(var(--sidebar-border))",
          ring: "rgb(var(--sidebar-ring))",
          primary_foreground: "rgb(var(--sidebar-primary-foreground))",
          accent_foreground: "rgb(var(--sidebar-accent-foreground))",
          switch: "rgb(var(--switch-background))",
        },
        border: {
          DEFAULT: "rgb(var(--border))",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

module.exports = config;
