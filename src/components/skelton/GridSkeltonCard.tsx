import { Skeleton } from '@/components/ui/skeleton'

export function GridSkeltonCard() {
  return (
    <div className="flex flex-col w-32 space-y-3 ">
      <Skeleton className="h-32  w-full bg-gray-200 rounded-xl " />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-gray-200" />
      </div>
    </div>
  )
}
