/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#00d25e",
          "secondary": "#8fda5a",
          "accent": "#38bdf8",
          "neutral": "#f5f5f4",
          "base-100": "#e7e5e4",
          "info": "#365314",
          "success": "#00ff00",
          "warning": "#fef08a",
          "error": "#ff0000",
        },
      },
    ],
  },
}

