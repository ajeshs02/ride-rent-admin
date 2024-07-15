import { useEffect, useState, useMemo, useRef } from 'react'
import { LiveListingTable } from '@/components/table/live-listing/LiveListingTable'
import {
  columns,
  AgentDataType,
} from '../../components/table/live-listing/LiveListingColumn'
import { Input } from '@/components/ui/input'
import { AgentSearchRadio } from '@/components/table/RadioGroup'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

async function fetchData(): Promise<AgentDataType[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      agentId: '728ed52f',
      type: 'Sales',
      agent_name: 'John Doe',
      expiry: '2023-12-31',
      status: 'Active',
    },
    {
      agentId: '9a1b3c4d',
      type: 'Support',
      agent_name: 'Alice Smith',
      expiry: '2023-11-15',
      status: 'Inactive',
    },
    {
      agentId: '5e6f7g8h',
      type: 'Technical',
      agent_name: 'Robert Johnson',
      expiry: '2024-02-28',
      status: 'Active',
    },
  ]
}

// Debounce function
function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export default function LiveListingPage() {
  const [data, setData] = useState<AgentDataType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchType, setSearchType] = useState<'name' | 'id'>('name')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true)
      const result = await fetchData()
      setData(result)
      setLoading(false)
    }

    fetchDataAsync()
  }, [])

  const handleSearch = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        setLoading(true)
        const result = await fetchData() // Simulate fetching from the database again
        const filteredData = result.filter((item) =>
          searchType === 'id'
            ? item.agentId.toLowerCase().startsWith(searchQuery.toLowerCase())
            : item.agent_name
                .toLowerCase()
                .startsWith(searchQuery.toLowerCase())
        )
        setData(filteredData)
        setLoading(false)
      }, 500),
    [searchType]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let isValid = true

    if (searchType === 'id') {
      isValid = /^[0-9]*$/.test(value)
    } else if (searchType === 'name') {
      isValid = /^[a-zA-Z]*$/.test(value)
    }

    if (isValid) {
      handleSearch(value)
    } else {
      e.target.value = value.slice(0, -1)
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
      handleSearch('')
    }
  }, [searchType, handleSearch])

  return (
    <section className="container min-h-screen py-10 mx-auto">
      <div className="flex flex-col items-start w-full gap-4 mb-4">
        <div className="w-full mb-4 flex-between">
          <h1 className="ml-2 text-2xl font-bold tracking-tight">
            Live Listing
          </h1>

          <Button className="h-8 gap-2 rounded-xl flex-center">
            Excel <Download />
          </Button>
        </div>
        <div className="flex items-center w-full gap-4">
          {/* search by id or name radio group */}
          <AgentSearchRadio
            searchType={searchType}
            setSearchType={setSearchType}
          />
          <Input
            type="search"
            ref={inputRef}
            placeholder={`Search Agent ${searchType === 'id' ? 'ID' : 'Name'}`}
            className="admin-input-field"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <LiveListingTable columns={columns} data={data} loading={loading} />
    </section>
  )
}
