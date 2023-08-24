import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'light-blue' : '#2E5A6A',
      'dark-blue': '#18292F',
      'extralight-blue': '#6BB0C6',
      'red': '#FF0000',
      'extradark-blue': '#172327',
      'marine-blue': '#1D3E65',
      'dark-gray': '#797979'
    },
    fontSize: {
      '4xl': '2.5rem',
      'base': '1rem'
    },
    borderRadius: {
      '1xl': '1.25rem',
      '3xl': '1.563rem'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
