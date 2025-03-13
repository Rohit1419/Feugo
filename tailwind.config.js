/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#FFC000", // Main yellow
          secondary: "#FF4D4D", // Coral red for CTAs
          dark: "#2D2D2D", // Text and headings
        },
        spacing: {
          "safe-top": "env(safe-area-inset-top)",
          "safe-bottom": "env(safe-area-inset-bottom)",
          "safe-left": "env(safe-area-inset-left)",
          "safe-right": "env(safe-area-inset-right)",
        },
        food: {
          yellow: {
            50: "#FFF9E5",
            100: "#FFF2CC",
            200: "#FFE699",
            300: "#FFD966",
            400: "#FFCC33",
            500: "#FFC000", // Our main brand color
            600: "#E6AC00",
            700: "#CC9900",
            800: "#B38600",
            900: "#996600",
          },
          red: "#FF4D4D", // For order now, add to cart buttons
          green: "#00B852", // For success states, veg indicators
        },
        ui: {
          background: "#FFFFFF",
          card: "#F9F9F9",
          border: "#E8E8E8",
          muted: "#757575",
        },
      },
    },
  },
  plugins: [],
};
