import { VehicleCategoryType } from './types'

export type RentalDetailType = {
  enabled: boolean
  rentInAED?: string
  mileageLimit?: string
}

export type PrimaryFormType = {
  category?: VehicleCategoryType | ''
  type: string
  brand: string
  model: string
  photos: string[]
  reg_year: string
  reg_card: string[] // 2 photos of the registration card
  commercial_license: string // commercial license/Mulkia in UAE
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
