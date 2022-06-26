/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content:['./ENV/index.html', './src/**/*.{js,ts,jsx,tsx}','./component/**/*.{js,ts,jsx,tsx}']
  },
  darkMode: 'media',
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
