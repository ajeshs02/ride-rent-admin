import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export type AgentDataType = {
  id: string
  type: string
  agent_name: string
  expiry: string
  status: string
}

export const columns: ColumnDef<AgentDataType>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'agent_name',
    header: ({ column }) => {
      const [searchValue, setSearchValue] = useState('')

      const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
      }

      return (
        <div>
          <Input
            placeholder="Search Agent"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'expiry',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Expiry
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Plan Status',
  },
  {
    accessorKey: 'toggleStatus',
    header: '',
    cell: () => {
      return <Switch />
    },
  },
]
