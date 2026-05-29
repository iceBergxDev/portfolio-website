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
        accent: '#fbbf24',
        'accent-hover': '#d97706',
        bg: '#0a0a0a',
        surface: '#111111',
        'surface-2': '#1a1a1a',
        border: '#1f2937',
        text: { DEFAULT: '#f9fafb', muted: '#9ca3af' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
