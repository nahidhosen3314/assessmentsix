/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./**/*.html",
    "./assets/js/*.js"
  ],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    fontFamily:{
      'primary': ["Mulish", ...defaultTheme.fontFamily.sans],
      'secondary': ["Inter", ...defaultTheme.fontFamily.sans],
    },

    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1170px',
    },
    extend: {
      colors:{
        'primary' : '#797DFC',
        'secondary' : '#F73859',
        'heading' : '#12132D',
        'text' : '#3E4549',
        'paragraph' : '#13131890',
        'light' : '#F3F3F5',
        'blight' : '#13131810',
        
      }
    },
  },
  plugins: [],
}

