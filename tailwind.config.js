/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#60a5fa",   // light blue
          DEFAULT: "#3b82f6", // medium blue
          dark: "#1465d7ff",    // dark blue
        },
        secondary: {
          light: "#fbbf24",
          DEFAULT: "#f59e0b",
          dark: "#b45309",
        },
        background: {
          light: "#ffffff",
          DEFAULT: "#ffffff",  // same as light or use your choice
          dark: "#001023",
        },
        text: {
          light: "#1f2937",
          DEFAULT: "#1f2937",
          dark: "#f3f4f6",
        },
        hover: {
          light: "#e5e7eb",  // gray-200
          dark: "#374151",   // gray-700
        },
      },
    },
  },
  plugins: [],
};
