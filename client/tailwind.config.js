/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "feature-1": 
        "url('http://localhost:3000/images/feature1.jpg')",
        "feature-2": 
        "url('http://localhost:3000/images/feature2.jpg')",
        "feature-3": 
        "url('http://localhost:3000/images/feature3.jpg')",
        "feature-4": 
        "url('http://localhost:3000/images/sellerCard.webp')",
        "logo":
        "url('http://localhost:3000/images/logo.png')"
      },
      fontFamily: {
        "roboto": 'Roboto Mono',
        'rowdies': 'Rowdies',
        'gochi': 'Gochi Hand',
        'montserrat': 'Montserrat',
        'cinzel': 'Cinzel Decorative',
        'nunito': "'Nunito', sans-serif"
      },
      colors:{
        "sale": '#204eff',
        "sub-feature-1":  "#bed50f",
        "custom-purple": "#9F78FF",
        "dark-purple": "#1d2547"
      },
      fontSize: {
        "7.5xl": "7rem"
      }
    },
  },
  plugins: [],
}
