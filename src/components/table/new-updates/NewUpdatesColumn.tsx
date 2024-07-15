import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export type NewUpdateDataType = {
  agentId: string
  type: string
  agent_name: string
  registrationDate: string
}

export const columns: ColumnDef<NewUpdateDataType>[] = [
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
    accessorKey: 'registrationDate',
    header: 'Registration Date',
  },
  {
    accessorKey: 'status',
    header: '',
    cell: () => {
      return (
        <div className="flex gap-x-3">
          <Button className="text-green-500 transition-colors bg-white border border-green-500 rounded-lg hover:bg-green-500 hover:text-white">
            Approve
          </Button>{' '}
          <Button className="text-red-500 transition-colors bg-white border border-red-500 rounded-lg hover:bg-red-500 hover:text-white">
            Reject
          </Button>
        </div>
      )
    },
  },
]
