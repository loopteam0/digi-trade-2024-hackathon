/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ["BentonSans Regular", ...defaultTheme.fontFamily.sans],
        serif: ["BentonSans Regular", ...defaultTheme.fontFamily.serif],
      },

      colors: {
        primary: "#0062E1",
        darkPrimary: "#0033AA",
        "light-blue": "#BFDCFC",
        "min-primary": "#3B82F6",
        "stanbic-blue": "#0033AA",
        muted: "#6B7280",
        muted2: "#9CA3AF",
        muted3: "#5C6C80",
        neutral: "#1A314D",
        positive: "#008533",
        danger: "#D32F2F",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
