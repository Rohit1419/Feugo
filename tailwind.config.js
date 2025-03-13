/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF9E5",
          100: "#FFF2CC",
          200: "#FFE699",
          300: "#FFD966",
          400: "#FFCC33",
          500: "#FFC000", // Main brand color
          600: "#E6AC00",
          700: "#CC9900",
          800: "#B38600",
          900: "#996600",
        },
        secondary: {
          50: "#FFE5E5",
          100: "#FFCCCC",
          200: "#FF9999",
          300: "#FF6666",
          400: "#FF4D4D", // Main accent color
          500: "#FF3333",
          600: "#FF1A1A",
          700: "#FF0000",
          800: "#E60000",
          900: "#CC0000",
        },
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        success: "#00B852", // For success states, veg indicators
        warning: "#FFC000", // For warning states
        error: "#FF4D4D", // For error states
        background: {
          light: "#FFFFFF",
          dark: "#F9F9F9",
          muted: "#F3F4F6",
        },
        text: {
          primary: "#1F2937",
          secondary: "#4B5563",
          muted: "#6B7280",
          light: "#FFFFFF",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
