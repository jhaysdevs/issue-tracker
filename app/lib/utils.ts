export const formatDate = (date: Date, shortened?: boolean) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: shortened ? '2-digit' : 'numeric',
    month: shortened ? 'numeric' : 'short',
    day: 'numeric',
  }).format(date)

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)

  return `${formattedDate}${shortened ? ' ' : ', '}${formattedTime}`
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
