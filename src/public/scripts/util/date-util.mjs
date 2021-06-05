export function toStringWithLocaleWithWeekday(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}

export function toStringWithLocale(date) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}

export function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function convertToNearFutureString(date, withWeekday = true) {
  const yesterday = new Date()
  const today = new Date()
  const tomorrow = new Date()
  yesterday.setDate(today.getDate() - 1)
  tomorrow.setDate(today.getDate() + 1)
  if (isSameDay(date, yesterday)) {
    return 'Yesterday'
  }
  if (isSameDay(date, today)) {
    return 'Today'
  }
  if (isSameDay(date, tomorrow)) {
    return 'Tomorrow'
  }
  return withWeekday
    ? toStringWithLocaleWithWeekday(date)
    : toStringWithLocale(date)
}
