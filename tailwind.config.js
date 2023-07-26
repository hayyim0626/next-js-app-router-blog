/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navbar-dark': '#222b36',
        'page-dark': '#171c24',
        'second-primary': '#03C8D1',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        4.5: '18px',
        15: '60px',
      },
      height: {
        4.5: '18px',
        7.5: '30px',
      },
      margin: {
        12.25: '49px',
      },
      spacing: {
        0.75: '3px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
