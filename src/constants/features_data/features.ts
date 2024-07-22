import { VehicleCategoryType } from '@/types/types'

type FeatureOption = { label: string; value: string }

type FeatureField = {
  [fieldName: string]: FeatureOption[]
}

type VehicleFeaturesDataType = {
  [category in VehicleCategoryType]: FeatureField
}

export const vehicleFeaturesData: VehicleFeaturesDataType = {
  car: {
    'Comfort and Convenience': [
      { label: 'Air Conditioning', value: 'air_conditioning' },
      { label: 'Power Steering', value: 'power_steering' },
      // Add more features here
    ],
    Entertainment: [
      { label: 'CD Player', value: 'cd_player' },
      { label: 'Bluetooth', value: 'bluetooth' },
      // Add more features here
    ],
    // Add more feature fields here
  },
  sports_car: {
    Performance: [
      { label: 'Turbo', value: 'turbo' },
      { label: 'Supercharger', value: 'supercharger' },
      // Add more features here
    ],
    Safety: [
      { label: 'Airbags', value: 'airbags' },
      { label: 'Traction Control', value: 'traction_control' },
      // Add more features here
    ],
    // Add more feature fields here
  },
  cycle: {
    'General Features': [
      { label: 'Lightweight Frame', value: 'lightweight_frame' },
      { label: 'Gear System', value: 'gear_system' },
      // Add more features here
    ],
    // Add more feature fields here
  },
  motorcycle: {
    'Speciality Features': [
      { label: 'ABS', value: 'abs' },
      { label: 'Traction Control', value: 'traction_control' },
      // Add more features here
    ],
    // Add more feature fields here
  },
  sports_bike: {
    Performance: [
      { label: 'High-Speed Engine', value: 'high_speed_engine' },
      { label: 'Lightweight Body', value: 'lightweight_body' },
      // Add more features here
    ],
    // Add more feature fields here
  },
  leisure_boat: {
    'Comfort Features': [
      { label: 'Sun Deck', value: 'sun_deck' },
      { label: 'Luxury Cabins', value: 'luxury_cabins' },
      // Add more features here
    ],
    // Add more feature fields here
  },
  charter: {
    Amenities: [
      { label: 'Full Kitchen', value: 'full_kitchen' },
      { label: 'Private Rooms', value: 'private_rooms' },
      // Add more features here
    ],
    // Add more feature fields here
  },
  bus: {
    'Passenger Features': [
      { label: 'Reclining Seats', value: 'reclining_seats' },
      { label: 'Onboard WiFi', value: 'onboard_wifi' },
      // Add more features here
    ],
    // Add more feature fields here
  },
  van: {
    'Cargo Features': [
      { label: 'Large Storage', value: 'large_storage' },
      { label: 'Easy Loading', value: 'easy_loading' },
      // Add more features here
    ],
    // Add more feature fields here
  },
  buggy: {
    'Offroad Features': [
      { label: 'All-Terrain Tires', value: 'all_terrain_tires' },
      { label: 'Roll Cage', value: 'roll_cage' },
      // Add more features here
    ],
    // Add more feature fields here
  },
  yacht: {
    Luxury: [
      { label: 'Jacuzzi', value: 'jacuzzi' },
      { label: 'Helipad', value: 'helipad' },
      // Add more features here
    ],
    // Add more feature fields here
  },
}
