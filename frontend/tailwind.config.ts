// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderRadius: { xl: 'var(--radius)' },
    },
  },
  plugins: [],
} satisfies Config
