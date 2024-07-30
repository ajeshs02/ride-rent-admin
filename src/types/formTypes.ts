import { VehicleCategoryType } from './types'

export type RentalDetailType = {
  enabled: boolean
  rentInAED?: string
  mileageLimit?: string
}

export type PrimaryFormType = {
  category?: VehicleCategoryType | ''
  vehicleType: string
  brand: string
  model: string
  photos: (File | string)[] // Array of files or URLs
  regYear: string
  regCard: (File | string)[] // Array of files or URLs
  commercialLicense: (File | string)[] // File or URL
  lease: boolean
  specification: 'UAE' | 'USA' | 'Other'
  rentalDetails: {
    day: RentalDetailType
    week: RentalDetailType
    month: RentalDetailType
  }
  mobile: string
  location: string
  cities: string
}
