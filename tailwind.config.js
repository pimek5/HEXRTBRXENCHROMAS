/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-2px,2px)' },
          '40%': { transform: 'translate(-2px,-2px)' },
          '60%': { transform: 'translate(2px,2px)' },
          '80%': { transform: 'translate(2px,-2px)' },
        },
      },
      animation: {
        glitch: 'glitch 1s infinite linear',
      },
    },
  },
  plugins: [],
}
