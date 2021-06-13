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
  const parsedDate = Number.isInteger(date) ? new Date(date) : date
  if (isSameDay(parsedDate, yesterday)) {
    return 'Yesterday'
  }
  if (isSameDay(parsedDate, today)) {
    return 'Today'
  }
  if (isSameDay(parsedDate, tomorrow)) {
    return 'Tomorrow'
  }
  return withWeekday
    ? toStringWithLocaleWithWeekday(parsedDate)
    : toStringWithLocale(parsedDate)
}

export function convertEpochToDateString(epoch) {
  const date = new Date(epoch)
  const yyyy = date.getFullYear().toString().padStart(2, '0')
  const mm = (date.getMonth() + 1).toString().padStart(2, '0')
  const dd = date.getDate().toString().padStart(2, '0')
  console.log(yyyy)
  console.log(mm)
  console.log(dd)
  return `${yyyy}-${mm}-${dd}`
}
