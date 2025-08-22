'use client'

import React, { PropsWithChildren, createContext, useContext } from 'react'

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

interface StatusConfig {
  key: string
  label: string
  color: BadgeColor
}

interface StatusContextType {
  statusBadges: StatusConfig[]
  getStatusByKey: (key: string) => StatusConfig | undefined
  getStatusColor: (key: string) => BadgeColor
}

const StatusContext = createContext<StatusContextType | undefined>(undefined)

const defaultStatusBadges: StatusConfig[] = [
  { key: 'ALL', label: 'All', color: 'gray' },
  { key: 'OPEN', label: 'Open', color: 'blue' },
  { key: 'CLOSED', label: 'Closed', color: 'gray' },
  { key: 'IN_PROGRESS', label: 'In Progress', color: 'orange' },
  { key: 'ON_HOLD', label: 'On Hold', color: 'amber' },
  { key: 'CANCELLED', label: 'Cancelled', color: 'red' },
  { key: 'COMPLETED', label: 'Completed', color: 'green' },
  { key: 'ARCHIVED', label: 'Archived', color: 'gold' },
]

export const useStatus = () => {
  const context = useContext(StatusContext)
  if (context === undefined) {
    throw new Error('useStatus must be used within a StatusProvider')
  }
  return context
}

interface StatusProviderProps extends PropsWithChildren {
  statusBadges?: StatusConfig[]
}

const StatusProvider = ({ children, statusBadges = defaultStatusBadges }: StatusProviderProps) => {
  const getStatusByKey = (key: string) => {
    return statusBadges.find((status) => status.key === key)
  }

  const getStatusColor = (key: string) => {
    const status = getStatusByKey(key)
    return status?.color || 'gray'
  }

  const contextValue: StatusContextType = {
    statusBadges,
    getStatusByKey,
    getStatusColor,
  }

  return <StatusContext.Provider value={contextValue}>{children}</StatusContext.Provider>
}

export default StatusProvider
