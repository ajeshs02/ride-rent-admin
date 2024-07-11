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

// Vehicle type form default values
export const VehicleTypeFormDefaultValues = {
  meta_title: '',
  meta_description: '',
  type_name: '',
  type_value: '',
  sub_heading: '',
}

// Link form default values
export const LinkFormDefaultValues = {
  label: '',
  link: 'https://',
}
