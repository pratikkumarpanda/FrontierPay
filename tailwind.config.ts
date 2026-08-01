import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
          sans: ['Inter', 'sans-serif'],
          display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'], // Using Outfit for brand font
          mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
          brand: {
              50: '#f0f9ff',
              100: '#e0f2fe',
              200: '#bae6fd',
              300: '#7dd3fc',
              400: '#38bdf8',
              500: '#0ea5e9',
              600: '#0284c7',
              700: '#0369a1',
              800: '#075985',
              900: '#0c4a6e',
              950: '#082f49',
          },
          trade: {
              up: '#10b981',   
              down: '#ef4444', 
              warn: '#f59e0b', 
              info: '#3b82f6' 
          }
      },
      animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'slide-in': 'slideIn 0.4s ease-out forwards',
          'fade-in': 'fadeIn 0.5s ease-out forwards',
          'spin-slow': 'spin 3s linear infinite',
          'bounce-subtle': 'bounceSubtle 2s infinite',
          'width-expand': 'widthExpand 1s ease-out forwards',
      },
      keyframes: {
          slideIn: {
              '0%': { transform: 'translateY(20px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' }
          },
          fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' }
          },
          bounceSubtle: {
              '0%, 100%': { transform: 'translateY(-2px)' },
              '50%': { transform: 'translateY(2px)' },
          },
          widthExpand: {
              '0%': { width: '0%' },
              '100%': { width: '100%' }
          }
      },
      boxShadow: {
          'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
          'card-hover': '0 15px 30px -5px rgba(0, 0, 0, 0.1)',
          'input-focus': '0 0 0 4px rgba(14, 165, 233, 0.1)',
      }
    }
  },
  plugins: [],
};

export default config;
