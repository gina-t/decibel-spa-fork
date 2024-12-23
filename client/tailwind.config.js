/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      }
    },
  },
  plugins: [
    // require('tailwind-scrollbar')({ nocompatible: true }), // Use modern styles and add rounded support
  ],
}

