/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'sm': '2px 2px 4px rgba(0, 0, 0, 0.3)',
        'md': '2px 2px 4px rgba(0, 0, 0, 0.5)'
      },
      colors: {
        'heading-main': '',
        'heading-second': '',
        'button': '',
        'paragraph': '',
        'off-white': '',
        'dark-brown': '',
        'teal': '',
      }
    },
  },
  plugins: [],
}