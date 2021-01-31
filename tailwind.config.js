const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.jsx',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem',
      },
      fontFamily: {
        sans: ['Alegreya Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: '#439B84',
        'primary-darkest': '#3A8772',
        'primary-dark': '#3F927C',
        'primary-light': '#49AB91',
        'primary-lightest': '#54B69B',
      },
      borderWidth: {
        '3': '3px',
      },
      backgroundImage: theme => ({
        'hola': "url('/images/hola.png')",
      })
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [],
}
