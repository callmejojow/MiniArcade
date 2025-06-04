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
        
        'black': '#000000',
        'dark-gray': '#11151a',
        'dark-purple': '#2a1f42',
        'plum': '#5a244f',
        'purple-wine': '#7e3568',
        
        'coral': '#c05770',
        'crimson': '#8e243f',
        'red': '#e03940',
        'peach': '#f5a67d',
        'dark-brown': '#2d1b29',
        
        'brown': '#562f35',
        'rust': '#9e5132',
        'midnight': '#161023',
        'slate-purple': '#483861',
        'lavender-gray': '#6a6893',
        
        'light-blue': '#99a9c7',
        'sky-blue': '#75cefb',
        'white': '#ffffff',
        'tan': '#d9995a',
        'cream': '#eeca92',
        
        'orange': '#ff7f27',
        'yellow-gold': '#fdc748',
        'pale-yellow': '#f1bf59',
        'royal-blue': '#4c6ac8',
        'steel-blue': '#67a4e0',
        
        'violet': '#773198',
        'magenta': '#c54daa',
        'teal': '#52a593',
        'dark-teal': '#224044',
      },
      fontFamily: {
        'mono': ['monospace'],
      }
    },
  },
  plugins: [],
} 