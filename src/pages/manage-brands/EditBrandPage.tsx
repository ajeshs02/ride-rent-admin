import { useEffect, useState } from 'react'
import {
  BrandFormType,
  VehicleCategoryType,
  VehicleFormType,
} from '@/types/types'
import { CircleArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import FormSkelton from '@/components/loading-skelton/FormSkelton'
import BrandForm from '@/components/form/BrandForm'

const sampleFormData: BrandFormType = {
  brand_name: 'Airport Pickup',
  brand_value: 'airport_pickup',
  category: 'cycle',
  sub_heading: 'Convenient airport pickups for travelers',
  meta_title: 'Airport Pickup Service',
  meta_description:
    'Efficient and convenient airport pickup services for all travelers.',
  logo: 'https://images.unsplash.com/photo-1720329461017-d6ed9f66beb5?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}

export default function EditBrandPage() {
  const { category, brandId } = useParams<{
    category: string
    brandId: string
  }>()
  const validCategory = category as VehicleCategoryType
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<BrandFormType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // Mimic a delay to fetch data
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setFormData(sampleFormData)
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <section className="container min-h-screen pt-5 pb-32">
      <div className="mb-5 ml-5 flex-center w-fit gap-x-4">
        <button
          onClick={() => navigate(-1)}
          className="transition-colors border-none outline-none w-fit flex-center hover:text-yellow"
        >
          <CircleArrowLeft />
        </button>
        <h1 className="text-center h3-bold sm:text-left">Update Brand</h1>
      </div>
      {loading ? (
        <FormSkelton />
      ) : (
        <BrandForm type="Update" category={validCategory} formData={formData} />
      )}
    </section>
  )
}
