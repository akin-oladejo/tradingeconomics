/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'trade-green': "#66C69A"
      },
    },
    fontFamily: {
      'sans': ['Onest', 'sans-serif']
    }
  },
  plugins: [],
}

