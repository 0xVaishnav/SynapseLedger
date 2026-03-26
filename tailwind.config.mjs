/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        synapseBlue: "#1A73E8",
        synapsePurple: "#7C3AED"
      },
      backgroundImage: {
        "synapse-gradient":
          "linear-gradient(135deg, #7C3AED 0%, #1A73E8 50%, #38BDF8 100%)"
      }
    }
  },
  plugins: []
};
