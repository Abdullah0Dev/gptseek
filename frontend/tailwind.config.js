/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.tsx'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e293b',
          100: '#36383F',
          200: '#20222A',
          300: '#36383F',
        },
        secondary: {
          DEFAULT: '#FFFFFF',
          100: '#FCFCFC',
        },
        accent: '#FF4D67',
      },
      fontFamily: {
        Roboto: ["Roboto-Regular", "sans-serif"],
        "Roboto-Medium": ["Roboto-Medium", "sans-serif"],
        "Roboto-Bold": ["Roboto-Bold", "sans-serif"],
        "Roboto-Black": ["Roboto-Black", "sans-serif"],
        "Roboto-ExtraBold": ["Roboto-ExtraBold", "sans-serif"],
        "Roboto-SemiBold": ["Roboto-SemiBold", "sans-serif"],
        "Roboto-Thin": ["Roboto-Thin", "sans-serif"],
        "Roboto-Light": ["Roboto-Light", "sans-serif"],
        "Roboto-ExtraLight": ["Roboto-ExtraLight", "sans-serif"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
