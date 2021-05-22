export function toStringWithLocaleWithWeekday(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('de-CH', options)
}

export function toStringWithLocale(date) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }
  return date.toLocaleDateString('de-CH', options)
}
