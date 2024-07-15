import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

export type AgentDataType = {
  agentId: string
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
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Agent Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'expiry',
    header: 'Expiry',
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
