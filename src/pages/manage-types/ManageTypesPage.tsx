import { Link, useParams } from 'react-router-dom'

import { Vehicle_Types, VehicleCategories } from '.'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import GridSkelton from '@/components/loading-skelton/GridSkelton'
import CategoryDropdown from '@/components/VehicleCategoryDropdown'

export default function ManageTypesPage() {
  const [selectedCategory, setSelectedCategory] = useState(VehicleCategories[0])
  const [isLoading, setIsLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const initialCategory = params.category
      ? VehicleCategories.find((category) => category.value === params.category)
      : VehicleCategories[0]

    setSelectedCategory(initialCategory || VehicleCategories[0])

    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timeoutId) // Cleanup the timeout if the component unmounts
  }, [selectedCategory])

  useEffect(() => {}, [params])

  const vehicleTypeData = Vehicle_Types[selectedCategory.value]

  return (
    <section className="container h-auto min-h-screen pb-10">
      {/* vehicle types grid */}

      <div className="h-20 px-10 mb-6 flex-between">
        <h1 className="text-2xl font-bold ">
          Manage <span className="text-yellow">{selectedCategory.label}</span>{' '}
          types
        </h1>
        <CategoryDropdown
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          type="type"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 place-items-center gap-y-4">
        {isLoading ? (
          <GridSkelton type="category" />
        ) : (
          vehicleTypeData.map((data) => (
            <Link
              to={`/manage-types/${selectedCategory.value}/edit/${data.key}`}
              key={data.key}
              className=""
            >
              <figure className="flex flex-col items-center w-auto p-2 bg-white border h-36 rounded-xl">
                <img
                  src={data.src}
                  alt={data.name}
                  className="object-contain w-full h-full max-w-36"
                />
                <figcaption className="max-w-full mt-2 font-semibold text-center">
                  {data.name}
                </figcaption>
              </figure>
            </Link>
          ))
        )}
      </div>

      {/* add new category */}
      <button className="fixed z-30 overflow-hidden cursor-pointer w-fit h-fit rounded-xl right-10 bottom-10 shadow-xl  hover:scale-[1.02]  transition-all">
        <Link
          className="flex-center gap-x-1 px-3 py-2 text-white  shadow-xl hover:scale-[1.02]  transition-all bg-yellow flex-center"
          to={`/manage-types/${selectedCategory.value}/add`}
        >
          New Category <Plus />
        </Link>
      </button>
    </section>
  )
}
