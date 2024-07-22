import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { vehicleFeaturesData } from '@/constants/features_data/features'
import MultiSelectDropdown from '../FeaturesDropdown'
import { VehicleCategoryType } from '@/types/types'
import { formatFieldName, createFeatureSchemaForCategory } from '@/helpers/form'
import { Accordion } from '@/components/ui/accordion'

// Define the structure of the form data based on the schema
type FeaturesFormType = z.infer<
  ReturnType<typeof createFeatureSchemaForCategory>
>

type FeaturesFormProps = {
  type: 'Add' | 'Update'
  formData?: FeaturesFormType | null
  category: VehicleCategoryType // Receiving category as a prop
}

export default function FeaturesForm({
  type,
  formData,
  category = 'motorcycle',
}: FeaturesFormProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  // Create the schema dynamically based on the category
  const FeaturesFormSchema = createFeatureSchemaForCategory(
    vehicleFeaturesData[category]
  )

  // Define initial values
  const initialValues =
    formData && type === 'Update' ? formData : { features: {} }

  // Define your form
  const form = useForm<FeaturesFormType>({
    resolver: zodResolver(FeaturesFormSchema),
    defaultValues: initialValues,
  })

  // Define a submit handler
  async function onSubmit(values: FeaturesFormType) {
    console.log('values', values)

    const formData = new FormData()

    // Append other form data

    if (type === 'Add') {
      return
    }

    if (type === 'Update') {
      return
    }
  }

  const fields = vehicleFeaturesData[category]

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5 mx-auto bg-white rounded-3xl p-2 md:p-4 py-8 !pb-8"
      >
        <div className="flex flex-col gap-5 w-full max-w-full md:max-w-[800px] mx-auto">
          <Accordion type="single" collapsible>
            {fields &&
              Object.keys(fields).length > 0 &&
              Object.keys(fields).map((field, index) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={`features.${field}`}
                  render={({ field: formField }) => (
                    <FormItem className="flex w-full mb-2 max-sm:flex-col">
                      <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
                        {formatFieldName(field)}
                        <span className="mr-5 max-sm:hidden">:</span>
                      </FormLabel>
                      <div className="flex-col items-start w-full">
                        <FormControl>
                          <MultiSelectDropdown
                            uniqueValue={index.toString()}
                            onChangeHandler={formField.onChange}
                            value={formField.value}
                            placeholder={field}
                            options={fields[field]}
                          />
                        </FormControl>
                        <FormDescription className="ml-2">
                          {/* description */}
                        </FormDescription>
                        <FormMessage className="ml-2" />
                      </div>
                    </FormItem>
                  )}
                />
              ))}
          </Accordion>
        </div>

        {/* submit */}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full md:w-10/12 lg:w-8/12 mx-auto flex-center col-span-2 mt-3 !text-lg !font-semibold button bg-yellow hover:bg-darkYellow"
        >
          {type === 'Add' ? 'Add Vehicle' : 'Update Vehicle'}
        </Button>
      </form>
    </Form>
  )
}
