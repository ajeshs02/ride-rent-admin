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

// general form default values
export const generalFormDefaultValues = {
  meta_title: '',
  meta_description: '',
  page_title: '',
  sub_heading: '',
  page_Link: '',
  logoSrc: '',
}
