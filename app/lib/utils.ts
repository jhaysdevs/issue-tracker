export const formatDate = (date: Date | string, shortened?: boolean) => {
  // Convert string to Date if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date

  // Validate the date
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date'
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: shortened ? '2-digit' : 'numeric',
    month: shortened ? 'numeric' : 'short',
    day: 'numeric',
  }).format(dateObj)

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(dateObj)

  return `${formattedDate}${shortened ? ' ' : ', '}${formattedTime}`
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
