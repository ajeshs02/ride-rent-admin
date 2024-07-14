import { useEffect, useState } from 'react'
import { linksData, LinkType } from '.'
import LinkModal from '@/components/modal/LinkModal'
import { Link } from 'react-router-dom'
import LinkSkelton from '@/components/loading-skelton/LinksSkelton'
import { Link as LinkIcon, Navigation } from 'lucide-react'
import { useAdminContext } from '@/context/AdminContext'

export default function ManageLinksPage() {
  const [isLoading, setIsLoading] = useState(true)

  const { location } = useAdminContext()

  useEffect(() => {
    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <section className="container h-auto min-h-screen pb-10">
      <h1 className="mt-6 mb-8 text-2xl font-bold text-center sm:text-left">
        Currently Active Links In{' '}
        <span className="text-yellow">{location.location}</span>
      </h1>
      <div className="flex flex-col gap-3 max-w-[800px]">
        {isLoading ? (
          <LinkSkelton />
        ) : (
          linksData.map((data: LinkType) => (
            <div
              className="p-2 bg-white shadow flex-between rounded-2xl"
              key={data.id}
            >
              <div className="flex flex-col gap-y-1 ">
                <p className="flex items-center font-semibold gap-x-2">
                  <Navigation size={16} className="mt-1" />
                  {data.label}
                </p>
                <Link
                  to={data.link}
                  target="_blank"
                  className="flex items-center text-blue-500 gap-x-3"
                >
                  <LinkIcon size={17} />
                  {data.link}
                </Link>
              </div>
              <div>
                <LinkModal type="Update" linkData={data} />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed z-30 overflow-hidden cursor-pointer w-fit h-fit rounded-xl right-10 bottom-10 shadow-xl  hover:scale-[1.02]  transition-all ">
        <LinkModal type="Add" />
      </div>
    </section>
  )
}
