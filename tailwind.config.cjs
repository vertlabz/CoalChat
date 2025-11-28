module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coal: {
          900: '#071014',
          800: '#0b141a',
        },
        accent: {
          500: '#7c3aed',
          600: '#6d28d9'
        }
      },
      boxShadow: {
        'soft': '0 6px 24px rgba(2,6,23,0.6)',
      }
    },
  },
  plugins: [],
}
