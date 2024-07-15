import { useEffect, useState } from 'react'

import {
  columns,
  NewUpdateDataType,
} from '../../components/table/new-updates/NewUpdatesColumn'
import { NewUpdateTable } from '@/components/table/new-updates/NewUpdatesTable'

async function fetchData(): Promise<NewUpdateDataType[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      agentId: '12435',
      type: 'Car',
      agent_name: 'John Doe',
      registrationDate: '2023-12-31',
    },
    {
      agentId: '21435',
      type: 'Bus',
      agent_name: 'John Doe',
      registrationDate: '2024-12-31',
    },
    {
      agentId: '31435',
      type: 'Van',
      agent_name: 'John Doe',
      registrationDate: '2024-05-31',
    },
  ]
}

export default function NewUpdatePage() {
  const [data, setData] = useState<NewUpdateDataType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true)
      const result = await fetchData()
      setData(result)
      setLoading(false)
    }

    fetchDataAsync()
  }, [])

  return (
    <section className="container min-h-screen py-10 mx-auto">
      <div className="flex flex-col items-start gap-4 mb-4">
        <div className="grid gap-1">
          <h1 className="ml-2 text-2xl font-bold tracking-tight">
            Live Listing
          </h1>
        </div>
      </div>
      <NewUpdateTable columns={columns} data={data} loading={loading} />
    </section>
  )
}
