import useIsSmallScreen from '@/hooks/useIsSmallScreen'
import { AdminContextType } from '@/types/types'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

const AdminContext = createContext<AdminContextType | null>(null)

const useAdminContext = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdminContext must be used within an AppProvider')
  }
  return context
}

type AdminProviderProps = {
  children: ReactNode
}

type orgType = {
  id?: string | number
  label: string
  value: string
}
type locationType = {
  id?: string | number
  location: string
  value: string
}

const AdminProvider = ({ children }: AdminProviderProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [org, setOrg] = useState<orgType>({ label: 'UAE', value: 'uae' })
  const [location, setLocation] = useState<locationType>({
    location: 'Dubai',
    value: 'dubai',
  })

  const isSmallScreen = useIsSmallScreen(1100)

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(false)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <AdminContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        isSmallScreen,
        org,
        setOrg,
        location,
        setLocation,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export { useAdminContext, AdminProvider }
