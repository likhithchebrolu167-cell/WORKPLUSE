/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B0F19',
          900: '#101426', // Deep Navy
          850: '#151B30', // Sidebar Deep Navy
          800: '#1E2540', // Sidebar Border / Dark Card
          700: '#2A3356',
        },
        primary: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#795CF6', // Primary Violet
          600: '#6744E8',
          700: '#5332CE',
          800: '#4326A6',
          900: '#341D82',
        },
        electric: {
          500: '#4285F4', // Electric Blue
          600: '#2B72E7',
        },
        success: {
          50: '#ECFDF5',
          500: '#22C58B', // Success Green
          600: '#1BA875',
        },
        warning: {
          50: '#FFFBEB',
          500: '#F5A623', // Warning Orange
          600: '#D98F15',
        },
        danger: {
          50: '#FEF2F2',
          500: '#F05B67', // Danger Red
          600: '#D94350',
        },
        surface: {
          light: '#F5F6FA',
          card: '#FFFFFF',
          dark: '#0B0F19',
          darkCard: '#151B30',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 20, 38, 0.05), 0 1px 2px -1px rgba(16, 20, 38, 0.05)',
        'premium': '0 4px 20px -2px rgba(16, 20, 38, 0.08), 0 2px 6px -2px rgba(16, 20, 38, 0.04)',
        'premium-hover': '0 10px 25px -3px rgba(121, 92, 246, 0.12), 0 4px 10px -2px rgba(16, 20, 38, 0.04)',
        'glow-violet': '0 0 20px rgba(121, 92, 246, 0.35)',
        'glow-blue': '0 0 20px rgba(66, 133, 244, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

