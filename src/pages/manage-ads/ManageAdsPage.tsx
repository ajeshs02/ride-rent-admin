import { useEffect, useState } from 'react'
import { useAdminContext } from '@/context/AdminContext'
import { adsData, adsType } from '.'
import AdsModal from '@/components/modal/AdsModal'
import AdsPreviewModal from '@/components/modal/AdsPreviewModal'
import DeleteModal from '@/components/modal/DeleteModal'
import AdsSkelton from '@/components/loading-skelton/AdsSkelton'

export default function ManageAdsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const { location } = useAdminContext()

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
        Currently Published Ads In{' '}
        <span className="text-yellow">{location.location}</span>
      </h1>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <AdsSkelton />
        ) : (
          adsData.map((data: adsType) => (
            <div
              key={data.id}
              className="relative w-full overflow-hidden rounded-lg h-72 group"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 z-10 transition-opacity duration-300 opacity-0 flex-center bg-black/80 group-hover:opacity-100">
                {/* Modal Trigger */}
                <div className="z-20 flex-center gap-x-4 ">
                  {/* image preview modal */}
                  <AdsPreviewModal src={data.imageSrc} />

                  {/* image edit modal */}
                  <AdsModal type="Update" adsData={data} />

                  {/* image delete modal */}
                  <DeleteModal onDelete={() => {}} />
                </div>
              </div>

              {/* Image */}
              <img
                src={data.imageSrc}
                alt="ad image"
                loading="lazy"
                className="z-0 object-cover w-full h-full rounded-lg"
              />
            </div>
          ))
        )}
      </div>

      <div className="fixed z-30 px-3 py-2 text-white  shadow-xl hover:scale-[1.02]  transition-all bg-yellow flex-center w-fit rounded-xl right-10 bottom-10">
        <AdsModal type="Add" />
      </div>
    </section>
  )
}
