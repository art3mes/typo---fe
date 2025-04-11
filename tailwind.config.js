import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'
import animate from 'tailwindcss-animate'

export const darkMode = ['class']
export const content = ['./**/*.{js,jsx}']
export const prefix = ''
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    boxShadow: {
      line: '0px 0px 0px 3px hsl(var(--background))',
    },
    fontFamily: {
      player: ['Helvetica-Neue', ..._fontFamily.sans],
      robotoMono: ['Roboto Mono', ..._fontFamily.sans],
      jetbrains: ['JetBrains Mono', ..._fontFamily.sans],
      plexMono: ['IBM Plex Mono', ..._fontFamily.sans],
      reddit: ['Reddit Sans', ..._fontFamily.sans],
      poppins: ['Poppins', ..._fontFamily.sans],
    },

    colors: {
      background: 'hsl(var(--sub-alt-color))',
      main: 'hsl(var(--main-color))',
      caret: 'hsl(var(--caret-color))',
      sub: 'hsl(var(--sub-color))',
      subAlt: 'hsl(var(--sub-alt-color))',
      text: 'hsl(var(--text-color))',
      error: 'hsl(var(--error-color))',
      errorExtra: 'hsl(var(--error-extra-color))',
      colorfulError: 'hsl(var(--colorful-error-color))',
      colorfulErrorExtra: 'hsl(var(--colorful-error-extra-color))',

      border: 'hsl(var(--sub-color)/0.4)',
      input: 'hsl(var(--sub-alt-color))',
      ring: 'hsl(var(--text-color))',
      foreground: 'hsl(var(--text-color))',
      primary: {
        DEFAULT: 'hsl(var(--main-color))',
        foreground: 'hsl(var(--bg-color))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--sub-color) /0.2)',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--error-color))',
        foreground: 'hsl(var(--bg-color))',
      },
      muted: {
        DEFAULT: 'hsl(var(--bg-color))',
        foreground: 'hsl(var(--text-color)/0.6)',
      },
      accent: {
        DEFAULT: 'hsl(var(--bg-color))',
        foreground: 'hsl(var(--text-color))',
      },
      popover: {
        DEFAULT: 'hsl(var(--sub-alt-color))',
        foreground: 'hsl(var(--text-color))',
      },
      card: {
        DEFAULT: 'hsl(var(--sub-alt-color))',
        foreground: 'hsl(var(--text-color))',
      },
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    transitionTimingFunction: {
      spring: 'cubic-bezier(0.3, 2.7, 0.3, 0.9)',
    },
    keyframes: {
      playing: {
        '0%': { transform: 'scaleY(0.2)' },
        '50%': { transform: 'scaleY(1)' },
        '100%': { transform: 'scaleY(0.2)' },
      },
      gradient: {
        to: {
          backgroundPosition: 'var(--bg-size) 0',
        },
      },
      shimmer: {
        '0%, 90%, 100%': {
          backgroundPosition: 'calc(-100% - var(--shimmer-width)) 0',
        },
        '30%, 60%': {
          backgroundPosition: 'calc(100% + var(--shimmer-width)) 0',
        },
      },
      blink: {
        '0%': { opacity: '0' },
        '50%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
      customBounce: {
        '0%': { padding: '0px' },
        '50%': { padding: '0px' },
        '100%': { padding: '0px' },
      },
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    animation: {
      playing: 'playing 1s ease-out infinite',
      spinOnce: 'spin 0.5s ease-out',
      gradient: 'gradient 8s linear infinite',
      shimmer: 'shimmer 8s infinite',
      blink: 'blink 1s linear infinite',
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
  },
}
export const plugins = [animate]
