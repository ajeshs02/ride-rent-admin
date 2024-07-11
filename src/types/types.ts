export type AdminContextType = {
  isSidebarOpen: boolean
  setSidebarOpen?: (value: boolean) => void
  toggleSidebar: () => void
  isSmallScreen: boolean
}

export type VehicleCategoryType =
  | 'car'
  | 'sports_car'
  | 'cycle'
  | 'motorcycle'
  | 'sports_bike'
  | 'leisure_boat'
  | 'charter'
  | 'bus'
  | 'van'
  | 'buggy'
  | 'yacht'

export type VehicleCategoriesType = {
  id: number
  label: string
  value: VehicleCategoryType
  link: string
}

export type VehicleFormType = {
  id?: string
  type_name: string
  type_value: string
  sub_heading: string
  meta_title: string
  meta_description: string
  logo: any
}

export type LinkFormType = {
  id: string
  label: string
  link: string
}
