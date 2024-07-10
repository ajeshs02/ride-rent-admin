import { Button } from '@/components/ui/button'
import { Link, useNavigate, useParams } from 'react-router-dom'

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
import { ChevronDown, Plus } from 'lucide-react'
import { VehicleCategoriesType } from '@/types/types'
import GridSkelton from '@/components/skelton/GridSkelton'

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
    }, 0)

    return () => clearTimeout(timeoutId) // Cleanup the timeout if the component unmounts
  }, [selectedCategory])

  const vehicleTypeData = Vehicle_Types[selectedCategory.value]

  return (
    <section className="container h-auto min-h-screen pb-10">
      {/* vehicle types grid */}
      <div className="">
        <div className="h-20 px-10 mb-6 flex-between">
          <h1 className="text-2xl font-bold capitalize">
            {selectedCategory.label} types
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="border border-gray-500 outline-none cursor-pointer w-36"
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
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 place-items-center gap-y-4">
          {isLoading ? (
            <GridSkelton />
          ) : (
            vehicleTypeData.concat({ key: 'addMore' }).map((data) =>
              data.key === 'addMore' ? (
                <Link
                  to={`/manage-categories/${selectedCategory.value}/add`}
                  key={data.key}
                  className="flex items-center justify-center w-full h-full p-2 bg-gray-200 border border-dashed min-h-32 rounded-xl"
                >
                  <Plus />
                </Link>
              ) : (
                <Link
                  to={`/manage-categories/${selectedCategory.value}/edit/${data.key}`}
                  key={data.key}
                >
                  <figure className="flex flex-col items-center w-auto p-2 bg-white border rounded-xl">
                    <img
                      src={data.src}
                      alt={data.name}
                      className="object-contain w-full h-full max-w-36"
                    />
                    <figcaption className="max-w-full mt-2 font-semibold">
                      {data.name}
                    </figcaption>
                  </figure>
                </Link>
              )
            )
          )}
        </div>
      </div>
    </section>
  )
}
