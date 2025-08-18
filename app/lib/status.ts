type BadgeColor =
  | 'gray'
  | 'blue'
  | 'green'
  | 'amber'
  | 'red'
  | 'gold'
  | 'ruby'
  | 'bronze'
  | 'brown'
  | 'yellow'
  | 'orange'
  | 'tomato'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'grass'
  | 'lime'
  | 'mint'
  | 'sky'
  | undefined

export const StatusBadges: { key: string; label: string; color: BadgeColor }[] = [
  { key: 'ALL', label: 'All', color: 'gray' },
  { key: 'OPEN', label: 'Open', color: 'blue' },
  { key: 'CLOSED', label: 'Closed', color: 'gray' },
  { key: 'IN_PROGRESS', label: 'In Progress', color: 'orange' },
  { key: 'ON_HOLD', label: 'On Hold', color: 'amber' },
  { key: 'CANCELLED', label: 'Cancelled', color: 'red' },
  { key: 'COMPLETED', label: 'Completed', color: 'green' },
  { key: 'ARCHIVED', label: 'Archived', color: 'gold' },
]

export const getStatusByKey = (key: string) => {
  return StatusBadges.find(status => status.key === key)
}

export const getStatusColor = (key: string): BadgeColor => {
  const status = getStatusByKey(key)
  return status?.color || 'gray'
}
