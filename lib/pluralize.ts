export const pluralize = (n: number, unit: string): string =>
  `${unit}${n === 1 ? '' : 's'}`
