import GridSkelton from '@/components/skelton/GridSkelton'
import { useState } from 'react'
import { linksData, LinkType } from '.'
import LinkModal from '@/components/modal/LinkModal'
import { Link } from 'react-router-dom'

export default function ManageLinksPage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <section className="container h-auto min-h-screen pb-10">
      <h1 className="mt-6 mb-8 text-2xl font-bold text-center sm:text-left">
        Currently Active Links In Dubai
      </h1>
      <div className="flex flex-col gap-2 max-w-[800px]">
        {isLoading ? (
          <GridSkelton />
        ) : (
          linksData
            .concat({ id: 'addMore', label: '', link: '' })
            .map((data: LinkType) =>
              data.id === 'addMore' ? (
                <div
                  key={data.id}
                  className="w-full flex-center col-span-2 !text-lg !font-semibold button bg-yellow hover:bg-yellow/90 text-white mt-6"
                >
                  <LinkModal type="Add" />
                </div>
              ) : (
                <div
                  className="p-2 bg-white flex-between rounded-2xl"
                  key={data.id}
                >
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{data.label}</p>
                    <Link
                      to={data.link}
                      target="_blank"
                      className="text-blue-500"
                    >
                      <span className="font-semibold text-black">link : </span>
                      {data.link}
                    </Link>
                  </div>
                  <div>
                    <LinkModal type="Update" linkData={data} />
                  </div>
                </div>
              )
            )
        )}
      </div>
    </section>
  )
}
