import { VehicleCategoriesType } from '@/types/types'

export const VehicleCategories: VehicleCategoriesType[] = [
  {
    id: 1,
    label: 'Car',
    value: 'car',
    link: '/manage-categories/car',
  },
  {
    id: 2,
    label: 'Sports Car',
    value: 'sports_car',
    link: '/manage-categories/sports_car',
  },
  {
    id: 3,
    label: 'Cycle',
    value: 'cycle',
    link: '/manage-categories/cycle',
  },
  {
    id: 4,
    label: 'Motorcycle',
    value: 'motorcycle',
    link: '/manage-categories/motorcycle',
  },
  {
    id: 5,
    label: 'Sports Bike',
    value: 'sports_bike',
    link: '/manage-categories/sports_bike',
  },
  {
    id: 6,
    label: 'Leisure Boat',
    value: 'leisure_boat',
    link: '/manage-categories/leisure_boat',
  },
  {
    id: 7,
    label: 'Charter',
    value: 'charter',
    link: '/manage-categories/charter',
  },
]

type RegularVehicleType = {
  key: number
  name: string
  options: number
  value: string
  src: string
}

type AddMoreType = {
  key: 'addMore'
}

type VehicleType = RegularVehicleType | AddMoreType

type VehicleTypes = {
  [key: string]: VehicleType[]
}

export const Vehicle_Types: VehicleTypes = {
  car: [
    {
      key: 1,
      name: 'Luxury',
      options: 10,
      value: 'luxury',
      src: '/assets/logo/vehicle-types/cars/LUXURY.webp',
    },
    {
      key: 2,
      name: 'Car With Driver',
      options: 8,
      value: 'car_with_driver',
      src: '/assets/logo/vehicle-types/cars/CAR WITH DRIVER.webp',
    },
    {
      key: 3,
      name: 'Airport Pickup',
      options: 5,
      value: 'airport_pickup',
      src: '/assets/logo/vehicle-types/cars/AIRPORT PICKUP.webp',
    },
    {
      key: 4,
      name: 'SUVs',
      options: 7,
      value: 'suvs',
      src: '/assets/logo/vehicle-types/cars/SUVs.webp',
    },
    {
      key: 5,
      name: 'Desert Safari',
      options: 6,
      value: 'desert_safari',
      src: '/assets/logo/vehicle-types/cars/DESERT SAFARI.webp',
    },
    {
      key: 6,
      name: 'Monthly Rentals',
      options: 9,
      value: 'monthly_rentals',
      src: '/assets/logo/vehicle-types/cars/MONTHLY RENTALS.webp',
    },
    {
      key: 7,
      name: 'Electric Cars',
      options: 4,
      value: 'electric_cars',
      src: '/assets/logo/vehicle-types/cars/ELECTRIC CARS.webp',
    },
    {
      key: 8,
      name: 'Convertible',
      options: 3,
      value: 'convertible',
      src: '/assets/logo/vehicle-types/cars/CONVERTIBLE.webp',
    },
    {
      key: 9,
      name: 'Vintage Cars',
      options: 2,
      value: 'vintage_cars',
      src: '/assets/logo/vehicle-types/cars/VINTAGE CARS.webp',
    },
    {
      key: 10,
      name: 'Muscle Cars',
      options: 1,
      value: 'muscle_cars',
      src: '/assets/logo/vehicle-types/cars/MUSCLE CARS.webp',
    },
    {
      key: 11,
      name: 'Vans',
      options: 11,
      value: 'vans',
      src: '/assets/logo/vehicle-types/cars/VANs.webp',
    },
    {
      key: 12,
      name: 'Pickup Trucks',
      options: 12,
      value: 'pickup_trucks',
      src: '/assets/logo/vehicle-types/cars/PICKUP TRUCKS.webp',
    },
    {
      key: 13,
      name: 'Buses',
      options: 13,
      value: 'buses',
      src: '/assets/logo/vehicle-types/cars/BUSES.webp',
    },
    {
      key: 14,
      name: 'Buggy',
      options: 14,
      value: 'buggy',
      src: '/assets/logo/vehicle-types/cars/BUGGY.webp',
    },
    {
      key: 15,
      name: 'Special Edition',
      options: 15,
      value: 'special_edition',
      src: '/assets/logo/vehicle-types/cars/SPECIAL EDITION.webp',
    },
  ],
  sports_car: [
    {
      key: 1,
      name: 'Hyper Sports Cars',
      options: 10,
      value: 'hyper_sports_cars',
      src: '/assets/logo/vehicle-types/sports_cars/HYPER SPORTS CARS.webp',
    },
    {
      key: 2,
      name: 'Race Track Cars',
      options: 8,
      value: 'race_track_cars',
      src: '/assets/logo/vehicle-types/sports_cars/RACE TRACK CARS.webp',
    },
  ],
  cycle: [
    {
      key: 1,
      name: 'BMX Bicycles',
      options: 10,
      value: 'bmx_bicycles',
      src: '/assets/logo/vehicle-types/cycles/BMX BICYCLES.webp',
    },
    {
      key: 2,
      name: 'Hybrid Bicycles',
      options: 8,
      value: 'hybrid_bicycles',
      src: '/assets/logo/vehicle-types/cycles/HYBRID BICYCLES.webp',
    },
    {
      key: 3,
      name: 'Cruiser Bicycles',
      options: 5,
      value: 'cruiser_bicycles',
      src: '/assets/logo/vehicle-types/cycles/CRUISER BICYCLES.webp',
    },
    {
      key: 4,
      name: 'Cyclocross Bicycles',
      options: 7,
      value: 'cyclocross_bicycles',
      src: '/assets/logo/vehicle-types/cycles/CYCLOCROSS BICYCLES.webp',
    },
    {
      key: 5,
      name: 'Electric Bicycles',
      options: 6,
      value: 'electric_bicycles',
      src: '/assets/logo/vehicle-types/cycles/ELECTRIC BICYCLES.webp',
    },
    {
      key: 6,
      name: 'Fat Bicycles',
      options: 9,
      value: 'fat_bicycles',
      src: '/assets/logo/vehicle-types/cycles/FAT BICYCLES.webp',
    },
    {
      key: 7,
      name: 'Folding Bicycles',
      options: 4,
      value: 'folding_bicycles',
      src: '/assets/logo/vehicle-types/cycles/FOLDING BICYCLES.webp',
    },
    {
      key: 8,
      name: 'Kick Scooter',
      options: 3,
      value: 'kick_scooter',
      src: '/assets/logo/vehicle-types/cycles/KICK SCOOTER.webp',
    },
    {
      key: 9,
      name: 'Road Bicycles',
      options: 2,
      value: 'road_bicycles',
      src: '/assets/logo/vehicle-types/cycles/ROAD BICYCLES.webp',
    },
    {
      key: 10,
      name: 'Touring Bicycles',
      options: 1,
      value: 'touring_bicycles',
      src: '/assets/logo/vehicle-types/cycles/TOURING BICYCLES.webp',
    },
  ],
  motorcycle: [
    {
      key: 1,
      name: 'Adventure',
      options: 10,
      value: 'adventure',
      src: '/assets/logo/vehicle-types/motorcycles/ADVENTURE.webp',
    },
    {
      key: 2,
      name: 'Cruiser',
      options: 8,
      value: 'cruiser',
      src: '/assets/logo/vehicle-types/motorcycles/CRUISER.webp',
    },
    {
      key: 3,
      name: 'Dirt Bikes',
      options: 6,
      value: 'dirt_bikes',
      src: '/assets/logo/vehicle-types/motorcycles/DIRT BIKES.webp',
    },
    {
      key: 4,
      name: 'Electric',
      options: 5,
      value: 'electric',
      src: '/assets/logo/vehicle-types/motorcycles/ELECTRIC.webp',
    },
    {
      key: 5,
      name: 'Standard',
      options: 7,
      value: 'standard',
      src: '/assets/logo/vehicle-types/motorcycles/STANDARD.webp',
    },
    {
      key: 6,
      name: 'Touring',
      options: 9,
      value: 'touring',
      src: '/assets/logo/vehicle-types/motorcycles/TOURING.webp',
    },
  ],
  sports_bike: [
    {
      key: 1,
      name: 'General Bikes',
      options: 5,
      value: 'general_bikes',
      src: '/assets/logo/vehicle-types/sports_bikes/GENERAL.webp',
    },
    {
      key: 2,
      name: 'Hyperbikes',
      options: 7,
      value: 'hyperbikes',
      src: '/assets/logo/vehicle-types/sports_bikes/HYPERBIKES.webp',
    },
    {
      key: 3,
      name: 'Superbikes',
      options: 6,
      value: 'superbikes',
      src: '/assets/logo/vehicle-types/sports_bikes/SUPERBIKES.webp',
    },
    {
      key: 4,
      name: 'Track Bikes',
      options: 8,
      value: 'track_bikes',
      src: '/assets/logo/vehicle-types/sports_bikes/TRACK BIKES.webp',
    },
  ],
  leisure_boat: [
    {
      key: 1,
      name: 'Catamarans',
      options: 7,
      value: 'catamarans',
      src: '/assets/logo/vehicle-types/leisure_boats/Catamarans.webp',
    },
    {
      key: 2,
      name: 'Center Console',
      options: 5,
      value: 'center_console',
      src: '/assets/logo/vehicle-types/leisure_boats/Center Console.webp',
    },
    {
      key: 3,
      name: 'Deck Boats',
      options: 6,
      value: 'deck_boats',
      src: '/assets/logo/vehicle-types/leisure_boats/Deck Boats.webp',
    },
    {
      key: 4,
      name: 'Fishing Boats',
      options: 8,
      value: 'fishing_boats',
      src: '/assets/logo/vehicle-types/leisure_boats/Fishing Boats.webp',
    },
    {
      key: 5,
      name: 'Jet',
      options: 4,
      value: 'jet',
      src: '/assets/logo/vehicle-types/leisure_boats/Jet.webp',
    },
    {
      key: 6,
      name: 'Pontoon Boats',
      options: 9,
      value: 'pontoon_boats',
      src: '/assets/logo/vehicle-types/leisure_boats/Pontoon Boats.webp',
    },
    {
      key: 7,
      name: 'Sail',
      options: 3,
      value: 'sail',
      src: '/assets/logo/vehicle-types/leisure_boats/Sail.webp',
    },
  ],
  charter: [
    {
      key: 1,
      name: 'Charters',
      options: 10,
      value: 'charters',
      src: '/assets/logo/vehicle-types/charters/Charters.webp',
    },
    {
      key: 2,
      name: 'Helicopters',
      options: 8,
      value: 'helicopters',
      src: '/assets/logo/vehicle-types/charters/Helicopters.webp',
    },
  ],
}
