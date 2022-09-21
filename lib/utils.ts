interface FormatOptions {
  weekday: "long" | "short";
  month: "long" | "short" | "numeric" | "2-digit" | "narrow" | undefined
  day: "numeric" | "2-digit" | undefined
  year: "numeric" | "2-digit"
  timeZone: string
}

export const getFormattedDate = (milliseconds: number): string => {
  const formatOptions: FormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }
  const date = new Date(milliseconds)
  return date.toLocaleDateString(undefined, formatOptions)
}
