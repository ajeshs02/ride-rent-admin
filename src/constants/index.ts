import { VehicleCategoryType } from '@/types/types'
import {
  BellPlus,
  CarFront,
  LayoutDashboard,
  Link,
  List,
  MapPin,
  Megaphone,
  Star,
} from 'lucide-react'

// sidebar content
export const sidebarContent = [
  { label: 'Dashboard', icon: LayoutDashboard, link: '/' },
  { label: 'Live Listings', icon: List, link: '/live-listing' },
  {
    label: 'New Updates',
    icon: BellPlus,
    link: '/new-updates',
  },
  {
    label: 'Categories',
    icon: CarFront,
    link: '/manage-categories',
  },
  { label: 'Brands', icon: Star, link: '/manage-brands' },
  { label: 'Locations', icon: MapPin, link: '/manage-locations' },
  {
    label: 'Links ',
    icon: Link,
    link: '/manage-links',
  },
  { label: 'Ads', icon: Megaphone, link: '/manage-ads' },
]

// sample vehicle categories
export const VehicleGeneralCategories = [
  {
    id: 1,
    label: 'Car',
    value: 'car',
  },
  {
    id: 2,
    label: 'Sports Car',
    value: 'sports_car',
  },
  {
    id: 3,
    label: 'Cycle',
    value: 'cycle',
  },
  {
    id: 4,
    label: 'Motorcycle',
    value: 'motorcycle',
  },
  {
    id: 5,
    label: 'Sports Bike',
    value: 'sports_bike',
  },
  {
    id: 6,
    label: 'Leisure Boat',
    value: 'leisure_boat',
  },
  {
    id: 7,
    label: 'Charter',
    value: 'charter',
  },
]

// Vehicle type form default values
export const VehicleTypeFormDefaultValues = {
  meta_title: '',
  meta_description: '',
  type_name: '',
  type_value: '',
  sub_heading: '',
}

// Vehicle type form default values
export const BrandFormDefaultValues = {
  meta_title: '',
  meta_description: '',
  brand_name: '',
  brand_value: '',
  sub_heading: '',
  brand_category: 'car',
}

// Link form default values
export const LinkFormDefaultValues = {
  label: '',
  link: 'https://ride.rent/',
}

// navbar origin dropdown temporary value/s
export const orgs = [
  { id: 1, label: 'UAE', value: 'uae' },
  { id: 2, label: 'aasdf', value: 'uasfaae' },
]

// navbar origin dropdown temporary value/s
export const locations = [
  { id: 1, location: 'Abu Dhabi', value: 'abu-dhabi' },
  { id: 2, location: 'Dubai', value: 'dubai' },
  { id: 3, location: 'Sharjah', value: 'sharjah' },
  { id: 4, location: 'Ras Al Khaimah', value: 'ras-al-khaimah' },
  { id: 5, location: 'Ajman', value: 'ajman' },
  { id: 6, location: 'Umm Al Qaiwain', value: 'umm-al-qaiwain' },
  { id: 7, location: 'Fujairah', value: 'fujairah' },
  { id: 8, location: 'Al Ain', value: 'al-ain' },
]
