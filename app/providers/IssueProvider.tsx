'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface IssueContextType {
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  refreshIssues: () => void
}

const IssueContext = createContext<IssueContextType | undefined>(undefined)

export const useIssueContext = () => {
  const context = useContext(IssueContext)
  if (context === undefined) {
    console.error('IssueContext is undefined. Make sure IssueProvider is wrapping the component.')
    throw new Error('useIssueContext must be used within an IssueProvider')
  }
  return context
}

interface IssueProviderProps {
  children: ReactNode
}

export const IssueProvider = ({ children }: IssueProviderProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const refreshIssues = () => {
    // This function can be called to trigger a refresh of issues
    // The actual refresh logic is handled in the IssueTableClient component
    console.log('Refresh issues triggered')
  }

  const contextValue: IssueContextType = {
    selectedStatus,
    setSelectedStatus,
    isLoading,
    setIsLoading,
    refreshIssues,
  }

  console.log('IssueProvider rendered with context:', contextValue)

  return <IssueContext.Provider value={contextValue}>{children}</IssueContext.Provider>
}

// Debug component to test context
export const IssueContextDebug = () => {
  try {
    const context = useIssueContext()
    return (
      <div style={{ fontSize: '12px', color: 'gray', padding: '4px' }}>
        Context Debug: Status={context.selectedStatus}, Loading={context.isLoading.toString()}
      </div>
    )
  } catch (error) {
    return (
      <div style={{ fontSize: '12px', color: 'red', padding: '4px' }}>
        Context Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  }
}

export default IssueProvider
