/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}', // Include renderer templates
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        background: '#011627',
        secondaryBackground: '#1D3B53',
        primaryText: '#D6DEEB',
        secondaryText: '#7E8E9E',
        accent: '#2EC4B6',
        highlight: '#FFBF69',
        border: '#1D3B53',
        light: '#FFF',
        dark: '#121212'
      }
    }
  },
  plugins: []
}
