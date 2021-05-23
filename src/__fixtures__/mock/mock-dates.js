const today = new Date()
const yesterday = new Date()
const dayBeforeYesterday = new Date()
const threeDaysAgo = new Date()
const fourDaysAgo = new Date()
yesterday.setDate(today.getDate() - 1)
dayBeforeYesterday.setDate(yesterday.getDate() - 1)
threeDaysAgo.setDate(dayBeforeYesterday.getDate() - 1)
fourDaysAgo.setDate(threeDaysAgo.getDate() - 1)

export { today, yesterday, dayBeforeYesterday, threeDaysAgo, fourDaysAgo }
