import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      fontSize: {
        xxs: "0.6rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "radial-gradient":
          "radial-gradient(circle at center, rgba(255,255,255,0.8) 50%, white 100%, transparent 0%)",
        wppbackground: "url('/images/wpp-background.jpg')",
      },
      screens: {
        sm: "40em",
        md: "48em",
        lg: "64em",
        xl: "80em",
        "2xl": "96em",
      },
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
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        wppMessageBg: {
          DEFAULT: "#005C2A",
        },
      },
      clipPath: {
        "clip-login": "polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%)",
      },
      gridTemplateRows: {
        "product-row": "repeat(auto-fill, minmax(6rem, 1fr))",
      },
      gridTemplateColumns: {
        "product-collunm": "repeat(8, minmax(5rem, 10rem))",
      },
      keyframes: {
        "shine-continuous": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        quicar: {
          "0%": {
            transform: "translateY(-300px) rotate(30deg)",
          },
          "25%": {
            transform: "translateY(0px) rotate(30deg)",
          },
          "35%": {
            transform: "translateY(-50px) rotate(-15deg)",
          },
          "45%": {
            transform: "translateY(0px) rotate(-15deg)",
          },
          "55%": {
            transform: "translateY(-20px) rotate(10deg)",
          },
          "65%": {
            transform: "translateY(0px) rotate(10deg)",
          },
          "75%": {
            transform: "translateY(-10px) rotate(0deg)",
          },
          "100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
        },
        decrase: {
          "0%": {
            width: "190px",
          },
          "25%": {
            width: "64px",
          },
          "35%": {
            width: "114px",
          },
          "45%": {
            width: "64px",
          },
          "55%": {
            width: "94px",
          },
          "65%": {
            width: "64px",
          },
          "75%": {
            width: "84px",
          },
          "100%": {
            width: "64px",
          },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        quicar: "quicar 3s ease-in-out",
        decrase: "decrase 3s ease-in-out",
        "shine-continuous": "shine-continuous 2s infinite linear",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }: any) {
      const newUtilities = {
        ".clip-login": {
          clipPath: theme("clipPath.clip-login"),
        },
      };
      addUtilities(newUtilities);
    },
    require("tailwindcss-animate"),
  ],
} satisfies Config;

export default config;
