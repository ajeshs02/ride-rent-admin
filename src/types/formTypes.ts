import { VehicleCategoryType } from './types'

export type PrimaryFormType = {
  category?: VehicleCategoryType | ''
  type: string
  brand: string
  model: string
  photos: string[]
  reg_year: string
  reg_card: string[] // 2 photos of the registration card
  commercial_license: string //commercial license/Mulkia in UAE
  location: string
  cities: string
}
