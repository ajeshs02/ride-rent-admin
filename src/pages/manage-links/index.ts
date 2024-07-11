export type RegularLinkData = {
  id: string | 'addMore'
  label: string
  link: string
}

export type LinkType = RegularLinkData

export const linksData: LinkType[] = [
  {
    id: '1',
    label: 'Explore the Best Car Rental Deals in Dubai',
    link: 'https://ride.rent/car-rental/dubai',
  },
  {
    id: '2',
    label: 'Browse Luxury Vehicles for Rent in Abu Dhabi',
    link: 'https://ride.rent/car-rental/abu-dhabi',
  },
  {
    id: '3',
    label: 'Find Affordable Rental Cars in Sharjah',
    link: 'https://ride.rent/car-rental/sharjah',
  },
  {
    id: '4',
    label: 'Discover Family-Friendly Rentals in Ajman',
    link: 'https://ride.rent/car-rental/ajman',
  },
]
