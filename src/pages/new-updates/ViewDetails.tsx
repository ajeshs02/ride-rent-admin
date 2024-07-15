import { CircleArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ViewDetails() {
  const navigate = useNavigate()
  return (
    <section className="container h-auto min-h-screen pb-10">
      <div className="mb-5 ml-5 flex-center w-fit gap-x-4">
        <button
          onClick={() => navigate(-1)}
          className="transition-colors border-none outline-none w-fit flex-center hover:text-yellow"
        >
          <CircleArrowLeft />
        </button>
        <h1 className="text-center h3-bold sm:text-left">
          New Update Details Page
        </h1>
      </div>
    </section>
  )
}
