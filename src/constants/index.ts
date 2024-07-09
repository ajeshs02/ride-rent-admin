import { FaRectangleList } from 'react-icons/fa6'
import { IoIosNotifications } from 'react-icons/io'
import { BiSolidCategory } from 'react-icons/bi'
import { PiListStarFill } from 'react-icons/pi'
import { FaLocationDot } from 'react-icons/fa6'
import { RiLinksFill } from 'react-icons/ri'
import { RiAdvertisementFill } from 'react-icons/ri'
import { TbLayoutDashboardFilled } from 'react-icons/tb'

export const sidebarContent = [
  { label: 'Dashboard', icon: TbLayoutDashboardFilled, link: '/' },
  { label: 'Live Listings', icon: FaRectangleList, link: '/live-listing' },
  {
    label: 'New Updates',
    icon: IoIosNotifications,
    link: '/new-updates',
  },
  {
    label: 'Categories',
    icon: BiSolidCategory,
    link: '/manage-categories',
  },
  { label: 'Brands', icon: PiListStarFill, link: '/manage-brands' },
  { label: 'Locations', icon: FaLocationDot, link: '/manage-locations' },
  {
    label: 'Links ',
    icon: RiLinksFill,
    link: '/manage-links',
  },
  { label: 'Ads', icon: RiAdvertisementFill, link: '/manage-ads' },
]
