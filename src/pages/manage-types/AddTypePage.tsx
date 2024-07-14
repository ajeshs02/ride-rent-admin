import VehicleTypeForm from '@/components/form/VehicleTypesForm'
import { VehicleCategoryType } from '@/types/types'
import { CircleArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

export default function AddTypePage() {
  const { category } = useParams<{ category: VehicleCategoryType }>()

  const validCategory = category as VehicleCategoryType
  const navigate = useNavigate()

  return (
    <section className="container pt-5 pb-32">
      <div className="mb-5 ml-5 flex-center w-fit gap-x-4">
        <button
          onClick={() => navigate(-1)}
          className="transition-colors border-none outline-none w-fit flex-center hover:text-yellow"
        >
          <CircleArrowLeft />
        </button>
        <h3 className="text-center h3-bold sm:text-left">
          Add New <span className="capitalize text-yellow ">{category}</span>{' '}
          Type
        </h3>
      </div>
      <VehicleTypeForm type="Add" category={validCategory} />
    </section>
  )
}
