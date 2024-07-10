import GeneralForm from '@/components/form/GeneralForm'
import { useParams } from 'react-router-dom'

export default function AddTypePage() {
  const { category } = useParams()
  return (
    <section className="container pt-5 pb-10">
      <h1 className="mb-5 ml-5 text-xl">
        Add <span className="capitalize">{category}</span> Type
      </h1>
      <GeneralForm type="Add" category="car" typeId="typeId" />
    </section>
  )
}
