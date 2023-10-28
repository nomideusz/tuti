import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const round = num =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const em = (px, base) => `${round(px / base)}em`;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@shipbit/svane/**/*.{html,js,svelte}'
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '800px',
      lg: '960px',
      xl: '1300px',
      '2xl': '1350px'
    },
    colors: {
      primary: '#000',
      accent: '#d2232b',
      surface: '#000',
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      white: '#fff',
      black: '#000',
      'gray-dark': '#273444',
      'gray-light': '#d3dce6'
    },
    fontFamily: {
      sans: ['Arial', 'ui-sans-serif', 'system-ui'],
      rounded: ['Arial-Rounded'],
      display: ['Arial-Bold']
    },
    container: {
      padding: {
        DEFAULT: '6dvw'
        // sm: '2rem',
        // lg: '2rem',
        // xl: '4rem'
      },
      center: true
    },
    extend: {
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh']
      },
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
              lineHeight: '1em'
            },
            'p:first-child': {
              marginTop: '0'
            },
            'p:last-child': {
              marginBottom: '0'
            },
            h2: {
              fontSize: em(20, 14),
              marginTop: em(32, 20),
              marginBottom: em(4, 20),
              lineHeight: round(28 / 20)
            },
            blockquote: {
              fontWeight: 'normal',
              fontStyle: 'normal',
              color: '',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              quotes: ''
            },
            'blockquote p:first-of-type::before': {
              content: ''
            },
            'blockquote p:last-of-type::after': {
              content: ''
            }
          }
        },
        lg: {
          css: {
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
              lineHeight: '1.15em'
            },
            'p:first-child': {
              marginTop: '0'
            },
            'p:last-child': {
              marginBottom: '0'
            },
            h2: {
              fontSize: em(20, 14),
              marginTop: em(32, 20),
              marginBottom: em(4, 20),
              lineHeight: round(28 / 20)
            },
            blockquote: {
              fontWeight: 'normal',
              fontStyle: 'normal',
              color: '',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              quotes: ''
            },
            'blockquote p:first-of-type::before': {
              content: ''
            },
            'blockquote p:last-of-type::after': {
              content: ''
            }
          }
        }
      }
    }
  },
  plugins: [forms, typography]
};
