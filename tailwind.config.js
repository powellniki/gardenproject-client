/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['handwriting'],
        arsenal: ['arsenal']
      },
      textShadow: {
        'sm': '2px 2px 4px rgba(0, 0, 0, 0.3)',
        'md': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '2px 2px 4px rgba(1, 1, 1, 1.0)'
      },
      colors: {
        'heading-main': '',
      }
    },
  },
  plugins: [],
}