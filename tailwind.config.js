/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "custom-white": "#F0F0F0",
        "custom-black": "#0F0F0F",
        "custom-beige": "#FFF3E3",
      }
    },
  },
  plugins: [],
};


