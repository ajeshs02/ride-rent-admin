import { useNavigate, useParams } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { VehicleCategoriesType } from '@/types/types'
import { VehicleCategories } from '@/pages/manage-types'

interface CategoryDropdownProps {
  selectedCategory: VehicleCategoriesType
  setSelectedCategory: (category: VehicleCategoriesType) => void
  type: 'brand' | 'type'
}

export default function CategoryDropdown({
  selectedCategory,
  setSelectedCategory,
  type,
}: CategoryDropdownProps) {
  const params = useParams()
  const navigate = useNavigate()

  const handleCategorySelect = (category: VehicleCategoriesType) => {
    setSelectedCategory(category)
    if (type === 'type') {
      navigate(`/manage-types/${category.value}`)
    } else if (type === 'brand') {
      navigate(`/manage-brands/${category.value}`)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="!h-10 text-white outline-none cursor-pointer w-36 !rounded-3xl bg-slate-900"
      >
        <div className="flex items-center h-12 pl-4 pr-1 font-semibold tracking-wider rounded-lg whitespace-nowrap ">
          {selectedCategory.label} <ChevronDown className="ml-auto" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-8 w-44">
        <DropdownMenuLabel className="mb-2 font-bold bg-slate-100">
          Choose Category
        </DropdownMenuLabel>
        {VehicleCategories.map((category) => (
          <DropdownMenuGroup key={category.id}>
            <DropdownMenuItem
              onClick={() => handleCategorySelect(category)}
              className={`${
                category.value === params.category
                  ? 'bg-slate-800 hover:bg-slate-800 text-white '
                  : 'hover:bg-slate-200 text-black'
              } font-semibold cursor-pointer`}
            >
              {category.label}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
