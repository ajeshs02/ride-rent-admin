import { Skeleton } from '../ui/skeleton'

export default function GridSkelton() {
  return Array(12)
    .fill(null)
    .map((_, index) => (
      <div key={index} className="flex flex-col w-32 space-y-3 ">
        <Skeleton className="w-full h-32 bg-gray-200 rounded-xl " />
        <div className="space-y-2">
          <Skeleton className="w-full h-4 bg-gray-200" />
        </div>
      </div>
    ))
}
