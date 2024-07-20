import { VehicleCategoryType } from '@/types/types'

type SpecificationOption = { label: string; value: string }

type Specifications = {
  [key in VehicleCategoryType]: {
    [field: string]: SpecificationOption[]
  }
}

export const specificationsData: Specifications = {
  car: {
    brand: [
      { label: 'Tata Motors', value: 'tata_motors' },
      { label: 'Maruti Suzuki', value: 'maruti_suzuki' },
      // add more brands
    ],
    year_of_manufacture: [
      { label: '2020', value: '2020' },
      { label: '2021', value: '2021' },
      // add more years
    ],
    engine_type: [
      { label: 'Petrol', value: 'petrol' },
      { label: 'Diesel', value: 'diesel' },
      // add more engine types
    ],
    // add more fields specific to cars
  },
  sports_car: {
    // add specifications specific to sports cars
  },
  cycle: {
    // add specifications specific to cycles
  },
  motorcycle: {
    helmet: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    performance: [
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' },
    ],
    abs: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    // add more fields specific to motorcycles
  },
  sports_bike: {
    // add specifications specific to sports bikes
  },
  leisure_boat: {
    // add specifications specific to leisure boats
  },
  charter: {
    // add specifications specific to charters
  },
  bus: {
    // add specifications specific to buses
  },
  van: {
    // add specifications specific to vans
  },
  buggy: {
    // add specifications specific to buggies
  },
  yacht: {
    // add specifications specific to yachts
  },
}
