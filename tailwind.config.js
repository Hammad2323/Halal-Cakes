/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        bakery: {
          light: "#FFF5F7",   // pastel pink
          DEFAULT: "#FFDEE9", // soft pink gradient base
          dark: "#FF9AA2",    // accent pink
          accent: "#FF7B54",  // orange highlight
          cream: "#FFF8E7",   // background cream
          brown: "#5D3A00",   // text accent
        },
      },
      fontFamily: {
        heading: ["'Lobster'", "cursive"],
        body: ["'Poppins'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 10px rgba(0,0,0,0.08)",
        card: "0 6px 20px rgba(0,0,0,0.1)",
        hover: "0 8px 30px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "bounce-slow": "bounceSlow 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
