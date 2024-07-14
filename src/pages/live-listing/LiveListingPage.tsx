import { useEffect, useState } from 'react'
import { DataTable } from '@/components/table/data-table'
import { columns, AgentDataType } from './column'

async function fetchData(): Promise<AgentDataType[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      id: '728ed52f',
      type: 'Sales',
      agent_name: 'John Doe',
      expiry: '2023-12-31',
      status: 'Active',
    },
    {
      id: '9a1b3c4d',
      type: 'Support',
      agent_name: 'Alice Smith',
      expiry: '2023-11-15',
      status: 'Inactive',
    },
    {
      id: '5e6f7g8h',
      type: 'Technical',
      agent_name: 'Robert Johnson',
      expiry: '2024-02-28',
      status: 'Active',
    },
    // Add more objects as needed
  ]
}

export default function LiveListingPage() {
  const [data, setData] = useState<AgentDataType[]>([])
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
    <div className="container min-h-screen py-10 mx-auto">
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  )
}
