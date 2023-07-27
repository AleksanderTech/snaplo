/** @type {import('tailwindcss').Config} */

const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue
      ? `hsl(var(${variable}) / ${opacityValue})`
      : `hsl(var(${variable}) / 1)`;
};

export default {
  content: ["./docs/**/*.md", "./docs/**/*.vue", "./docs/**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: {
          DEFAULT: generateColorClass("--color-gray-500"),
          50: generateColorClass("--color-gray-50"),
          100: generateColorClass("--color-gray-100"),
          200: generateColorClass("--color-gray-200"),
          300: generateColorClass("--color-gray-300"),
          400: generateColorClass("--color-gray-400"),
          500: generateColorClass("--color-gray-500"),
          600: generateColorClass("--color-gray-600"),
          700: generateColorClass("--color-gray-700"),
          800: generateColorClass("--color-gray-800"),
          900: generateColorClass("--color-gray-900"),
        },
      },
    },
  },
  plugins: [],
};
