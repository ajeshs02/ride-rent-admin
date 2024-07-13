import { useEffect, useState } from 'react'
import { LocationFormType } from '@/types/types'
import { CircleArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import FormSkelton from '@/components/loading-skelton/FormSkelton'
import LocationForm from '@/components/form/LocationForm'

const sampleFormData: LocationFormType = {
  location_name: 'Abu Dhabi',
  location_value: 'abu_dhabi',
  sub_heading: 'Vehicle for rent in Abu Dhabi',
  meta_title: 'Abu Dhabi Vehicles for rent',
  meta_description:
    'Efficient and convenient  Vehicles for rents for all travelers in Abu Dhabi.',
  logo: 'https://images.unsplash.com/photo-1602490487033-47e43479d51b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWJ1JTIwZGhhYml8ZW58MHx8MHx8fDA%3D',
}

export default function EditLocationPage() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<LocationFormType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // Mimic a delay to fetch data
      await new Promise((resolve) => setTimeout(resolve, 1500))
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
        <h1 className="text-center h3-bold sm:text-left">Update Location</h1>
      </div>
      {loading ? (
        <FormSkelton />
      ) : (
        <LocationForm type="Update" formData={formData} />
      )}
    </section>
  )
}
