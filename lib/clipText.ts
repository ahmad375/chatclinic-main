export const clipText = (text: string, limit: number): string => {
  if (text.length > limit) {
    return text.slice(0, limit) + '...'
  } else {
    return text
  }
}
