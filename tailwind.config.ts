import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-blue' : '#2E5A6A',
        'dark-blue': '#18292F',
        'extralight-blue': '#6BB0C6',
        'red': '#FF0000',
        'extradark-blue': '#172327',
        'marine-blue': '#1D3E65',
        'dark-gray': '#797979',
        'green': '#00FF57',
        'extra-superdark-blue': '#111B1E',
        'black-opacity': 'rgba(0,0,0,.3)'
      },
      width: {
        'form': '48%',
        'form-photo': '120px',
        '136': '136px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '22': '88px'
      },
      maxHeight: {
        '813': '813px',
        '82': '82px'
      },
      maxWidth: {
        '250': '250px',
        '82': '82px'
      },
      height: {
        '885': '85.9%',
        '89': '89%',
        '83': '83%',
        '85': '85%',
        '10a9': '10.9%',
        '79': '79%',
        'form-photo': '120px',
        '136': '136px'
      },
      fontSize: {
        '4xl': '2.5rem',
        'base': '1rem'
      },
      borderRadius: {
        '1xl': '1.25rem',
        '3xl': '1.563rem',
        '50p': '50%',
        '40xl': '40px',
        '30px': '30px'
      },
      keyframes: {
        push: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0px)' }
        },
        pushReverse: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        menuDropdown: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' }
        },
        menuDropdownReverse: {
          '0%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(0)' }
        }
      },
      animation: {
        push: 'push .4s ease-in-out',
        pushReverse: 'pushReverse .4s ease-in-out',
        menuDropdown: 'menuDropdown .4s ease-in-out',
        menuDropdownReverse: 'menuDropdownReverse .4s ease-in-out'
      }
    },
  },
  plugins: [],
}
export default config
