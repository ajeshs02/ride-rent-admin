import { Button } from '@/components/ui/button'
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

import { Vehicle_Types, VehicleCategories } from '.'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { VehicleCategoriesType } from '@/types/types'
import LoadingGrid from '@/components/general/LoadingGrid'

export default function ManageCategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(VehicleCategories[0])
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()
  const navigate = useNavigate()

  const handleCategorySelect = (category: VehicleCategoriesType) => {
    setSelectedCategory(category)
    navigate(category.link)
  }

  useEffect(() => {
    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timeoutId) // Cleanup the timeout if the component unmounts
  }, [selectedCategory])

  return (
    <section className="h-screen">
      <div className="flex-between px-10 flex-center  h-20 mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="w-36 outline-none border border-gray-500 cursor-pointer"
          >
            <div className="flex items-center h-12 rounded-lg font-semibold tracking-wider pl-4 whitespace-nowrap pr-1  ">
              {selectedCategory.label} <ChevronDown className="ml-auto" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 ml-8">
            <DropdownMenuLabel className="font-bold bg-slate-100 mb-2">
              Choose Category
            </DropdownMenuLabel>
            {VehicleCategories.map((category) => (
              <DropdownMenuGroup key={category.id}>
                <DropdownMenuItem
                  onClick={() => handleCategorySelect(category)}
                  className={`${
                    category.value === params.category &&
                    'bg-yellow text-white '
                  } font-semibold cursor-pointer`}
                >
                  {category.label}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuGroup>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button>Add</Button>
      </div>

      {/* vehicle types grid */}
      {/*  */}
      <div className="container ">
        <h1 className="text-2xl mb-6 font-bold">
          {selectedCategory.label} types
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 place-items-center gap-2 gap-y-4">
          {isLoading ? (
            <LoadingGrid />
          ) : (
            Vehicle_Types[selectedCategory.value].map((data) => (
              <figure className="w-auto flex flex-col items-center border p-2 rounded-xl bg-white">
                <img
                  src={data.src}
                  alt="Car Logo"
                  className="object-contain w-full h-full max-w-36"
                />
                <figcaption className="font-semibold mt-2">Car</figcaption>
              </figure>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
