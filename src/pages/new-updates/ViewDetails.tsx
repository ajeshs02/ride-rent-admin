import { CircleArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { lazy, Suspense, useEffect, useState } from 'react'
import LazyLoader from '@/components/loading-skelton/LazyLoader'
import { VehicleCategoryType } from '@/types/types'
import { useToast } from '@/components/ui/use-toast'

// Lazy-loaded components
const PrimaryDetailsForm = lazy(
  () => import('@/components/form/main-form/PrimaryDetailsForm')
)
const SpecificationDetailsForm = lazy(
  () => import('@/components/form/main-form/SpecificationDetailsForm')
)
const FeaturesDetailsForm = lazy(
  () => import('@/components/form/main-form/FeaturesDetailsForm')
)

type TabsTypes = 'primary' | 'specifications' | 'features'

export default function ViewDetails() {
  const navigate = useNavigate()
  const [category, setCategory] = useState<VehicleCategoryType | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabsTypes>('primary')

  const { toast } = useToast()

  const handleTabChange = (value: string) => {
    if (value === 'specifications' || value === 'features') {
      if (loading || !category) {
        toast({
          title: 'Oops',
          className: 'bg-gray-900 text-white',
          description: (
            <div>
              Complete the{' '}
              <span className="text-yellow">Primary Details Form</span> to
              access this tab.
            </div>
          ),
          duration: 6000,
        })
        return
      }
    }
    setActiveTab(value as TabsTypes)
  }
  useEffect(() => {
    // Mimic a database fetch with a loading time of 1.5 seconds
    setTimeout(() => {
      // Simulate fetching category from backend
      const fetchedCategory: VehicleCategoryType = 'car' // Replace with actual fetch logic
      setCategory(fetchedCategory)
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <section className="container h-auto min-h-screen pb-10 bg-white">
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

      <div>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="bg-white flex-center gap-x-4">
            <TabsTrigger value="primary">Primary Details</TabsTrigger>
            <TabsTrigger disabled={loading || !category} value="specifications">
              Specifications
            </TabsTrigger>
            <TabsTrigger disabled={loading || !category} value="features">
              Features
            </TabsTrigger>
          </TabsList>
          <TabsContent value="primary" className="flex-center">
            <Suspense fallback={<LazyLoader />}>
              <PrimaryDetailsForm type="Add" />
            </Suspense>
          </TabsContent>
          <TabsContent value="specifications" className="flex-center">
            <Suspense fallback={<LazyLoader />}>
              <SpecificationDetailsForm
                type="Add"
                category={category as VehicleCategoryType}
              />
            </Suspense>
          </TabsContent>
          <TabsContent value="features" className="flex-center">
            <Suspense fallback={<LazyLoader />}>
              <FeaturesDetailsForm type="Add" category="car" />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
