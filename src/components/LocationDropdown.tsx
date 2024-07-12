import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useAdminContext } from '@/context/AdminContext'
import { ChevronDown, MapPin } from 'lucide-react'

type LocationOption = {
  id: string | number
  location: string
  value: string
}

type GeneralDropdownProps = {
  options: LocationOption[]
}

const GeneralDropdown = ({ options }: GeneralDropdownProps) => {
  const { location, setLocation } = useAdminContext()

  const handleSelect = (option: LocationOption) => {
    setLocation(option)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="!outline-none !border-none cursor-pointer min-w-32 w-fit"
      >
        <div className="flex items-center h-10 pl-4 pr-1 font-semibold tracking-wider outline rounded-3xl whitespace-nowrap ">
          <MapPin className="mr-2" size={20} />
          {location.location}
          <ChevronDown className="ml-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-8 w-44">
        <DropdownMenuLabel className="mb-2 font-bold bg-slate-100">
          Choose location
        </DropdownMenuLabel>
        {options.map((option) => (
          <DropdownMenuGroup key={option.id}>
            <DropdownMenuItem
              onClick={() => handleSelect(option)}
              className={`font-semibold cursor-pointer ${
                option.value === location.value
                  ? 'text-white bg-slate-900 hover:bg-slate-900'
                  : 'hover:bg-gray-300'
              }`}
            >
              {option.location}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default GeneralDropdown
