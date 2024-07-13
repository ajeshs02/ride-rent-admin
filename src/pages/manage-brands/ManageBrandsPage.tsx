import { Link, useParams, useSearchParams } from 'react-router-dom'

import { sampleBrands } from '.'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import GridSkelton from '@/components/loading-skelton/GridSkelton'
import Pagination from '@/components/Pagination'
import SearchComponent from '@/components/Search'

import { VehicleCategories } from '../manage-categories'
import CategoryDropdown from '@/components/VehicleCategoryDropdown'

export default function ManageBrandsPage() {
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(VehicleCategories[0])
  const [filteredBrands, setFilteredBrands] = useState(sampleBrands)

  const { category } = useParams()

  const [searchParams] = useSearchParams()

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

  useEffect(() => {
    const search = searchParams.get('search') || ''
    setIsLoading(true)

    const timeoutId = setTimeout(() => {
      if (search) {
        const filtered = sampleBrands.filter((brand) =>
          brand.brandValue.startsWith(search.toLowerCase())
        )
        setFilteredBrands(filtered)
      } else {
        setFilteredBrands(sampleBrands)
      }
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [searchParams, page])

  return (
    <section className="container h-auto min-h-screen pb-10">
      <div className="h-20 pl-2 pr-10 flex-between">
        <h1 className="text-2xl font-bold capitalize whitespace-nowrap">
          Manage <span className="text-yellow">{selectedCategory.label}</span>{' '}
          Brands
        </h1>

        <CategoryDropdown
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          type="brand"
        />
      </div>

      {/* search component */}
      <SearchComponent isLoading={isLoading} />

      {/* vehicle types grid */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 place-items-center gap-y-4">
        {isLoading ? (
          <GridSkelton type="brand" />
        ) : filteredBrands.length === 0 ? (
          <div className="flex-col text-center flex-center h-72 col-span-full">
            <p className="text-xl font-semibold text-gray-800">
              {' '}
              No results found for{' '}
              <span className="italic font-bold">
                "{searchParams.get('search')}""
              </span>
            </p>
            <p className="mt-2 italic text-gray-400">
              consider checking the spelling / selected vehicle category
            </p>
            .
          </div>
        ) : (
          filteredBrands.map((data) => (
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

      {filteredBrands.length > 0 && (
        <Pagination page={page} setPage={setPage} totalPages={8} />
      )}
    </section>
  )
}
