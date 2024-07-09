import { GridSkeltonCard } from '../skelton/GridSkeltonCard'

export default function LoadingGrid() {
  return Array(12)
    .fill(null)
    .map((_, index) => <GridSkeltonCard key={index} />)
}
