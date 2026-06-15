/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.12)',
      },
      colors: {
        ink: {
          950: '#07111f',
          900: '#0b1b31',
          800: '#123153',
        },
      },
    },
  },
  plugins: [],
};
