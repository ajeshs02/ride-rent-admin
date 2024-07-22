import { PrimaryFormType } from '@/types/formTypes'
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
    label: 'Types',
    icon: CarFront,
    link: '/manage-types',
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

// Location form default values
export const LocationFormDefaultValues = {
  meta_title: '',
  meta_description: '',
  location_name: '',
  location_value: '',
  sub_heading: '',
  logo: '',
}

// Link form default values
export const LinkFormDefaultValues = {
  label: '',
  link: 'https://ride.rent/',
}

// ads form default values
export const AdFormDefaultValues = {
  imageSrc: '',
}

// navbar origin dropdown temporary value/s
export const orgs = [{ id: 1, label: 'UAE', value: 'uae' }]

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

// primary details form default values
export const PrimaryFormDefaultValues: PrimaryFormType = {
  category: 'car',
  type: '',
  brand: '',
  model: '',
  photos: [],
  reg_year: '',
  reg_card: [], // 2 registration card photos
  commercial_license: '', // commercial license pdf
  lease: false,
  specification: 'UAE',
  rentalDetails: {
    day: { enabled: false, rentInAED: '', mileageLimit: '' },
    week: { enabled: false, rentInAED: '', mileageLimit: '' },
    month: { enabled: false, rentInAED: '', mileageLimit: '' },
  },
  mobile: '',
  location: '',
  cities: '',
}
