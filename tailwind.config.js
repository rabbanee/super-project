const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
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
      backgroundColor: ['label-checked', 'after-label-checked', 'even'],
      textColor: ['label-checked', 'after-label-checked'],
      borderColor: ['after-label-checked'],
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
        addVariant('label-checked', ({ modifySelectors, separator }) => {
            modifySelectors(
                ({ className }) => {
                  const eClassName = e(`label-checked${separator}${className}`); // escape class
                  const yourSelector = 'input[type="radio"]'; // your input selector. Could be any
                  return `${yourSelector}:checked ~ .${eClassName}`; // ~ - CSS selector for siblings
                }
            )
        })
    }),
    plugin(({ addVariant, e }) => {
        addVariant('after-label-checked', ({ modifySelectors, separator }) => {
            modifySelectors(
                ({ className }) => {
                  const eClassName = e(`after-label-checked${separator}${className}`); // escape class
                  const yourSelector = 'input[type="radio"]'; // your input selector. Could be any
                  return `${yourSelector}:checked ~ label .${eClassName}`; // ~ - CSS selector for siblings
                }
            )
        })
    }),
  ],
}
