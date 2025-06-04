/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-maroon': '#3B0B0B',
        'bright-gold': '#FEC006',
        'soft-blue': '#6CA6E6',
        'neon-magenta': '#EA00FF',
      },
      fontFamily: {
        'mono': ['monospace'],
      }
    },
  },
  plugins: [],
} 