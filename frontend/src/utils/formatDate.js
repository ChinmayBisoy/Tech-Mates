import { formatDistanceToNow, format, isBefore, addDays } from 'date-fns'

export const formatDate = (date) => {
  return format(new Date(date), 'dd MMM yyyy')
}

export const formatRelative = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const formatAbsolute = (date) => {
  return format(new Date(date), 'dd MMM yyyy')
}

export const formatTime = (date) => {
  return format(new Date(date), 'HH:mm')
}

export const formatDateTime = (date) => {
  return format(new Date(date), 'dd MMM yyyy HH:mm')
}

export const formatDeadline = (deadline) => {
  const deadline_date = new Date(deadline)
  const today = new Date()

  if (isBefore(deadline_date, today)) {
    const overdueDays = Math.floor(
      (today - deadline_date) / (1000 * 60 * 60 * 24)
    )
    return `Overdue by ${overdueDays} day${overdueDays > 1 ? 's' : ''}`
  }

  const distance = formatDistanceToNow(deadline_date)
  return `${distance} left`
}
