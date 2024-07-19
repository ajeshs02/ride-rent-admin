import { CircleArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { lazy, Suspense } from 'react'
import LazyLoader from '@/components/loading-skelton/LazyLoader'
const PrimaryDetailsForm = lazy(
  () => import('@/components/form/main-form/PrimaryDetailsForm')
)

const SpecificationDetailsForm = lazy(
  () => import('@/components/form/main-form/SpecificationDetailsForm')
)
const FeaturesDetailsForm = lazy(
  () => import('@/components/form/main-form/FeaturesDetailsForm')
)

export default function ViewDetails() {
  const navigate = useNavigate()
  return (
    <section className="container h-auto min-h-screen pb-10 bg-white ">
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

      <div className="">
        <Tabs defaultValue="primary" className="w-full">
          <TabsList className="bg-white flex-center gap-x-4">
            <TabsTrigger value="primary">Primary Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          <TabsContent value="primary" className="flex-center">
            <Suspense fallback={<LazyLoader />}>
              <PrimaryDetailsForm type="Update" />
            </Suspense>
          </TabsContent>
          <TabsContent value="specifications" className="flex-center">
            <Suspense fallback={<LazyLoader />}>
              <SpecificationDetailsForm />
            </Suspense>
          </TabsContent>
          <TabsContent value="features" className="flex-center">
            <Suspense fallback={<LazyLoader />}>
              <FeaturesDetailsForm />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
