export const formatDate = (date: Date) => {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	}).format(date)
}

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
