import { useEffect, useState } from 'react'
import { useAdminContext } from '@/context/AdminContext'
import { LOCATIONS_DATA, locationType } from './index'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import LocationSkelton from '@/components/loading-skelton/LocationSkelton'

export default function ManageLocationsPage() {
  const [isLoading, setIsLoading] = useState(true)

  const { org } = useAdminContext()

  useEffect(() => {
    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <section className="container h-auto min-h-screen pb-10">
      <h1 className="mt-6 mb-8 text-2xl font-bold text-center sm:text-left">
        Locations Under <span className="text-yellow">{org.label}</span> Org
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading ? (
          <LocationSkelton />
        ) : (
          LOCATIONS_DATA.map((data: locationType) => (
            <Link
              to={`/manage-locations/edit/${data.id}`}
              key={data.id}
              className="relative w-full overflow-hidden bg-white shadow-md rounded-xl h-44 group"
            >
              <div className="absolute top-0 bottom-0 left-0 right-0  bg-gradient-to-t from-black to-50% z-10" />
              <div className="z-10 w-full h-full ">
                {/* Image */}
                <img
                  src={data.src}
                  alt="ad image"
                  loading="lazy"
                  className="z-20 object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                />
              </div>

              <p className="absolute bottom-0 z-10 p-0 mt-1 font-bold text-center text-white transform -translate-x-1/2 whitespace-nowrap left-1/2 ">
                {data.name}
              </p>
            </Link>
          ))
        )}
      </div>
      <button className="fixed z-30 overflow-hidden cursor-pointer w-fit h-fit rounded-xl right-10 bottom-10 shadow-xl  hover:scale-[1.02]  transition-all ">
        <Link
          className="px-3 py-2 text-white flex-center gap-x-1 bg-yellow"
          to={`/manage-locations/add`}
        >
          New Location <Plus />
        </Link>
      </button>
    </section>
  )
}
