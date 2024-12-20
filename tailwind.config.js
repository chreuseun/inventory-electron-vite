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
        secondaryBackground: '#1D3D53',
        primaryText: '#D6DEEB',
        secondaryText: '#7E8E9E',
        accent: '#2EC4B6',
        highlight: '#FFBF69',
        border: '#AFAFAF',
        light: '#FFF',
        dark: '#121212',
        sectBorder: '#374151',
        error: '#EF4444',
        success: '#66ff00'
      },
      width: {
        perc48: '48%'
      },
      fontSize: {
        px9: '9px' // Add font size 9px
      }
    }
  },
  plugins: []
}
