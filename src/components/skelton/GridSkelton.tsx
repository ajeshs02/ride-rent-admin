import { Skeleton } from '../ui/skeleton'

export default function GridSkelton() {
  return Array(12)
    .fill(null)
    .map((_, index) => (
      <div key={index} className="flex flex-col w-32 space-y-3 ">
        <Skeleton className="h-32  w-full bg-gray-200 rounded-xl " />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-gray-200" />
        </div>
      </div>
    ))
}
