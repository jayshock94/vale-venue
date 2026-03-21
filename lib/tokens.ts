// Re-export design system tokens for use in code
// The source JSON lives at /public/vale-design-system.json

export const tokens = {
  colors: {
    gold: {
      50: '#FAF5EE',
      100: '#F2E6D4',
      200: '#E5CBA8',
      300: '#D9B082',
      400: '#C9A06E',
      500: '#B8892F',
      600: '#9A7128',
    },
    neutral: {
      50: '#F5F0E8',
      100: '#EDE7D9',
      200: '#DDD6CA',
      300: '#C8BFAF',
      400: '#A09890',
      500: '#7C7469',
      600: '#4A4641',
      700: '#2E2B27',
      800: '#1C1917',
    },
    rule: '#D9D2C5',
    ruleLight: '#EDE7D9',
  },
  fonts: {
    serif: 'Playfair Display',
    sans: 'DM Sans',
  },
  spacing: {
    page: '48px',
    section: '96px',
  },
} as const

export default tokens
