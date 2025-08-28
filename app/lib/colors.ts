// Radix UI color mappings for BadgeColor to hex values
export const badgeColorToHex: Record<string, string> = {
  gray: '#6f6e77',
  blue: '#0091ff',
  green: '#30a46c',
  amber: '#f5a524',
  red: '#e5484d',
  gold: '#fdb022',
  ruby: '#e93d58',
  bronze: '#f76808',
  brown: '#ad7f58',
  yellow: '#f5d90a',
  orange: '#f76808',
  tomato: '#e54d2e',
  crimson: '#e93d58',
  pink: '#d6409f',
  plum: '#ab4aba',
  purple: '#8e4ec6',
  violet: '#6e56cf',
  iris: '#5b5bd6',
  indigo: '#3e63dd',
  cyan: '#05a2c2',
  teal: '#12a594',
  jade: '#00a46c',
  grass: '#46a758',
  lime: '#82c91e',
  mint: '#00c853',
  sky: '#0ea5e9',
}

export const getBadgeColorHex = (color: string): string => {
  return badgeColorToHex[color] || '#6f6e77' // fallback to gray
}
