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

export type AdminContextType = {
  isSidebarOpen: boolean
  setSidebarOpen?: (value: boolean) => void
  toggleSidebar: () => void
  isSmallScreen: boolean
  org: orgType
  setOrg: (origin: orgType) => void
  location: locationType
  setLocation: (location: locationType) => void
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
  id: number | string
  label: string
  value: VehicleCategoryType
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

export type BrandFormType = {
  id?: string
  brand_name: string
  brand_value: string
  category: VehicleCategoryType
  sub_heading: string
  meta_title: string
  meta_description: string
  logo: any
}

export type LocationFormType = {
  id?: string
  location_name: string
  location_value: string
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

export type AdsFormType = {
  id?: string
  imageSrc: string
}

export type BrandType = {
  id: number | string
  label: string
  value: VehicleCategoryType
  link: string
}
