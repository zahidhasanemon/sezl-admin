export default {
  content: [
    './resources/js/frontend/**/*.{vue,js,jsx,ts,tsx}',
    './resources/views/frontend.blade.php',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-black': '#0a0a0a',
        'primary-gray': '#000000a3',
        'border-primary': '#eceef2',
        'border-gray': '#949494',
        'success': '#34a853',
        'error': '#d4183d',
        'product-bg': '#f4f4f4',
      },
      spacing: {
        '4.5': '1.125rem',
        '6.5': '1.625rem',
        '15': '3.75rem',
        '25': '6.25rem',
        '120': '30rem',
        '156': '39rem',
      },
      lineHeight: {
        '6.5': '1.625rem',
      },
      dropShadow: {
        'theme': '0px 8px 24px 0px #0000000f',
      },
      boxShadow: {
        'theme': '0px 1px 2px 0px #1018280d',
      },
    },
  },
  plugins: [],
}


