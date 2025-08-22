/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // لوحة ألوان موحّدة للمشروع
        ink: {
          950: "#0B1220", // الخلفية الداكنة
          900: "#0F172A",
          800: "#141C2F",
        },
        brand: {
          50:  "#F5ECFF",
          100: "#EAD7FF",
          200: "#D5AFFF",
          300: "#B982FF",
          400: "#9C5DFF",
          500: "#7F39FB", // البنفسجي الرئيسي
          600: "#6B2EDD",
          700: "#5826B7",
          800: "#462091",
          900: "#35196E",
        },
        accent: {
          300: "#FF9C7A", // البرتقالي الوردي بالأسفل
          400: "#FF8260",
          500: "#FF6A49",
        },
        text: {
          primary: "#E6E8EE",
          muted: "#A9B0C3",
        },
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0,0,0,0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};