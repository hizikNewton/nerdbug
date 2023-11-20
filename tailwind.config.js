/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        day: 'url(assets/day.jpg)',
        night: 'url(assets/night.jpg)',
        hero: 'url(assets/hero.svg)',
      },
    },
  },

  plugins: [],
};
