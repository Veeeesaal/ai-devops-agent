/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0f172a",
        panelBg: "#1e293b",
        accent: "#3b82f6",
      },
    },
  },
  plugins: [],
}