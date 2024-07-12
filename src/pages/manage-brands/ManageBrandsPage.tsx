import { Link, useNavigate, useParams } from 'react-router-dom'

import { sampleBrands } from '.'
import { useEffect, useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import { BrandType, VehicleCategoriesType } from '@/types/types'
import GridSkelton from '@/components/loading-skelton/GridSkelton'
import Pagination from '@/components/Pagination'
import SearchComponent from '@/components/Search'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { VehicleCategories } from '../manage-categories'

export default function ManageBrandsPage() {
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(VehicleCategories[0])

  const { category } = useParams()
  const navigate = useNavigate()

  const handleCategorySelect = (category: VehicleCategoriesType) => {
    setSelectedCategory(category)
    navigate(`/manage-brands/${category.value}`)
  }

  useEffect(() => {
    const initialCategory = category
      ? VehicleCategories.find((cat) => cat.value === category)
      : VehicleCategories[0]

    setSelectedCategory(initialCategory || VehicleCategories[0])

    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timeoutId) // Cleanup the timeout if the component unmounts
  }, [selectedCategory])

  return (
    <section className="container h-auto min-h-screen pb-10">
      <div className="h-20 px-10 mb-6 flex-between">
        <SearchComponent isLoading={isLoading} />
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
            {VehicleCategories.map((cat) => (
              <DropdownMenuGroup key={cat.id}>
                <DropdownMenuItem
                  onClick={() => handleCategorySelect(cat)}
                  className={`${
                    cat.value === category && 'bg-yellow text-white '
                  } font-semibold cursor-pointer`}
                >
                  {cat.label}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuGroup>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* vehicle types grid */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 place-items-center gap-y-4">
        {isLoading ? (
          <GridSkelton />
        ) : (
          sampleBrands.map((data) => (
            <Link
              to={`/manage-brands/${category}/edit/${data.id}`}
              key={data.id}
              className=""
            >
              <figure className="flex flex-col items-center w-auto h-32 p-2 bg-white border rounded-xl">
                <img
                  src={data.icon}
                  alt={data.brandName}
                  className="object-contain w-[95%] h-full max-w-28"
                />
                <figcaption className="max-w-full mt-2 text-sm font-semibold text-center">
                  {data.brandName}
                </figcaption>
              </figure>
            </Link>
          ))
        )}
      </div>

      <button className="fixed px-3 py-2 text-white shadow-gray-400 shadow-lg hover:scale-[1.02]  transition-all bg-yellow flex-center w-fit rounded-xl right-10 bottom-10">
        <Link
          className="flex items-center gap-x-2"
          to={`/manage-brands/${category}/add-brand`}
        >
          New Brand <Plus />
        </Link>
      </button>

      <Pagination page={page} setPage={setPage} totalPages={8} />
    </section>
  )
}
