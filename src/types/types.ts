export type AdminContextType = {
  isSidebarOpen: boolean
  setSidebarOpen?: (value: boolean) => void
  toggleSidebar: () => void
  isSmallScreen: boolean
}

export type VehicleCategoriesType = {
  id: number
  label: string
  value: string
  link: string
}
