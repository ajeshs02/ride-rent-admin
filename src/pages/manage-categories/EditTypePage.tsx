import React, { useEffect, useState } from 'react'
import VehicleTypeForm from '@/components/form/VehicleTypesForm'
import { VehicleCategoryType, VehicleFormType } from '@/types/types'
import { CircleArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import FormSkelton from '@/components/skelton/FormSkelton'

const sampleFormData: VehicleFormType = {
  type_name: 'Airport Pickup',
  type_value: 'airport_pickup',
  sub_heading: 'Convenient airport pickups for travelers',
  meta_title: 'Airport Pickup Service',
  meta_description:
    'Efficient and convenient airport pickup services for all travelers.',
  logo: 'https://images.unsplash.com/photo-1720329461017-d6ed9f66beb5?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}

export default function UpdateTypesPage() {
  const { category, typeId } = useParams<{ category: string; typeId: string }>()
  const validCategory = category as VehicleCategoryType
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<VehicleFormType | null>(null)

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
        <h1 className="text-center h3-bold sm:text-left">Update Type</h1>
      </div>
      {loading ? (
        <FormSkelton />
      ) : (
        <VehicleTypeForm
          type="Update"
          category={validCategory}
          formData={formData}
        />
      )}
    </section>
  )
}
