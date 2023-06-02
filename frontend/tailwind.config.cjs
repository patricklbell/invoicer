/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontFamily: {
      sans: ['Helvetica', 'sans-serif'],
      serif: ['Roboto', 'serif']
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-100': 'rgb(var(--color-primary-100) / <alpha-value>)',
        'primary-200': 'rgb(var(--color-primary-200) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        neutral: 'rgb(var(--color-neutral) / <alpha-value>)',
        warn: 'rgb(var(--color-warn) / <alpha-value>)',
        'warn-100': 'rgb(var(--color-warn-100) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        'background-50': 'rgb(var(--color-background-50) / <alpha-value>)',
        'background-100': 'rgb(var(--color-background-100) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        'foreground-100': 'rgb(var(--color-foreground-100) / <alpha-value>)'
      }
    }
  },
  plugins: [require('@headlessui/tailwindcss')]
};
