import { useEffect, useState } from 'react'
import { useAdminContext } from '@/context/AdminContext'
import { LOCATIONS_DATA, locationType } from './index'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import LocationSkelton from '@/components/loading-skelton/LocationSkelton'

export default function ManageLocationsPage() {
  const [isLoading, setIsLoading] = useState(false)

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
              className="relative w-full overflow-hidden bg-white rounded-lg shadow-md h-44 group"
            >
              <div className="h-[80%] max-h-[80%] w-full">
                {/* Image */}
                <img
                  src={data.src}
                  alt="ad image"
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="p-0 mt-1 text-center lg:text-lg">{data.name}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      <button className="fixed px-3 py-2 text-white shadow-gray-400 shadow-lg hover:scale-[1.02]  transition-all bg-yellow flex-center w-fit rounded-xl right-10 bottom-10">
        <Link
          className="flex items-center gap-x-2"
          to={`/manage-locations/add`}
        >
          New Location <Plus />
        </Link>
      </button>
    </section>
  )
}
