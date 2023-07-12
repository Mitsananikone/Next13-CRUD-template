/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FBF4B5',
        secondary: '#FFF9D4',
        accent: '#C1A87D',
        highlight: '#D3A13B',
        dark: '#B58D3D',
      },
      screens: {
        'xs': '320px',
        'sm': '321px',
        'md': '481px',
        'lg': '769px',
        'xl': '1025px',
        '2xl': '1201px',
      },
      container: {
        center: true,
        width: '100%',
        height: '100%',
      },
      maxWidth: {
        'none': '100%',
      },
    },
  },
  plugins: [],
}