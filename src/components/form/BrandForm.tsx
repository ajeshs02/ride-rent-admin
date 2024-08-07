import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BrandFormType, VehicleCategoryType } from '@/types/types'
import { BrandFormSchema } from '@/lib/validator'
import { BrandFormDefaultValues } from '@/constants'
import { Textarea } from '../ui/textarea'
import FormDropdown from './FormDropdown'

type BrandFormProps = {
  type: 'Add' | 'Update'
  category: VehicleCategoryType
  formData?: BrandFormType | null
}

export default function BrandForm({
  type,
  category,
  formData,
}: BrandFormProps) {
  const [previewURL, setPreviewURL] = useState<string | null>(null)

  const initialValues =
    formData && type === 'Update' ? formData : BrandFormDefaultValues

  // 1. Define your form.
  const form = useForm<z.infer<typeof BrandFormSchema>>({
    resolver: zodResolver(BrandFormSchema),
    defaultValues: initialValues,
  })

  const fileRef = form.register('logo')

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof BrandFormSchema>) {
    console.log('values', values)
    const formData = new FormData()

    // Append other form data

    formData.append('brand_name', values.brand_name)
    formData.append('brand_value', values.brand_value)
    formData.append('sub_heading', values.sub_heading)
    formData.append('meta_title', values.meta_title)
    formData.append('meta_description', values.meta_description)

    if (values.logo instanceof FileList) {
      formData.append('logo', values.logo[0])
    } else if (typeof values.logo === 'string') {
      formData.append('existing_logo_url', values.logo)
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    if (type === 'Add') {
      return
    }

    if (type === 'Update') {
      return
    }
  }

  useEffect(() => {
    if (type === 'Update' && formData?.logo) {
      setPreviewURL(formData.logo)
    }
  }, [type, formData])

  const validateFile = (file: File) => {
    const maxSize = 300 * 1024 // 300kb
    const maxWidth = 300
    const maxHeight = 300

    if (file.size > maxSize) {
      form.setError('logo', {
        type: 'manual',
        message: 'File size should be less than 300kb',
      })
      return false
    }

    return new Promise((resolve) => {
      const img = new window.Image()
      img.onload = () => {
        if (img.width > maxWidth || img.height > maxHeight) {
          form.setError('logo', {
            type: 'manual',
            message: 'Image dimensions should be 300x300 pixels or less',
          })
          resolve(false)
        } else {
          resolve(true)
        }
      }
      img.src = URL.createObjectURL(file)
    })
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const isValid = await validateFile(file)
      if (isValid) {
        const fileURL = URL.createObjectURL(file)
        setPreviewURL(fileURL)
        form.clearErrors('logo')
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5 max-w-[700px] mx-auto  bg-white rounded-3xl p-2 md:p-4 py-8 !pb-8  shadow-md"
      >
        <div className="flex flex-col gap-5 r ">
          {/* type title */}
          <FormField
            control={form.control}
            name="brand_name"
            render={({ field }) => (
              <FormItem className="w-full mb-2 ">
                <FormLabel className="ml-2 ">Brand Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: 'Land Rover'"
                    {...field}
                    className={`input-field`}
                    readOnly
                  />
                </FormControl>
                <FormDescription className="ml-2">
                  Add your Brand Name
                </FormDescription>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />

          {/* type value */}
          <FormField
            control={form.control}
            name="brand_value"
            render={({ field }) => (
              <FormItem className="w-full mb-2 ">
                <FormLabel className="ml-2 ">Brand Value</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: 'land_rover'"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormDescription className="ml-2">
                  This value will be used for API interaction. Eg: for "Land
                  Rover", value will be "land_rover"
                </FormDescription>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full mb-2 ">
                <FormLabel className="ml-2 ">Vehicle Category</FormLabel>
                <FormControl>
                  <FormDropdown
                    onChangeHandler={field.onChange}
                    value={category}
                  />
                </FormControl>
                <FormDescription className="ml-2">
                  Category of the vehicle
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sub_heading"
            render={({ field }) => (
              <FormItem className="w-full mb-2 ">
                <FormLabel className="ml-2 ">Brand Subheading</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Page Sub Heading"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormDescription className="ml-2">
                  Add the subheading for the brand
                </FormDescription>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          <div className="flex max-sm:flex-col gap-x-10">
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem className=" max-w-96">
                  <FormLabel className="ml-2 ">Type Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Upload logo"
                      {...fileRef}
                      className="h-16 text-center cursor-pointer flex-center"
                      onChange={(e) => {
                        field.onChange(e)
                        handleFileChange(e)
                      }}
                    />
                  </FormControl>
                  <FormDescription className="ml-2">
                    Upload a logo with a maximum file size of 300KB. The logo
                    should have dimensions not exceeding 300x300 pixels
                  </FormDescription>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
            {previewURL && (
              <div className="mt-6 w-44 ">
                <img
                  src={previewURL}
                  alt="Logo Preview"
                  className="object-contain h-auto max-w-full rounded-md"
                />
              </div>
            )}
          </div>

          <FormField
            control={form.control}
            name="meta_title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="ml-2 ">Page Meta Title </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Meta Tag"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormDescription className="ml-2">
                  Meta title for the page
                </FormDescription>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="ml-2 ">Page Meta Description </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Meta Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormDescription className="ml-2">
                  Meta description for the page
                </FormDescription>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
        </div>

        {/* submit  */}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full flex-center col-span-2 mt-3 !text-lg !font-semibold button bg-yellow hover:bg-yellow/90"
        >
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Brand `}{' '}
          {false && (
            <svg
              className="w-5 h-5 ml-2 text-white m animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </Button>
      </form>
    </Form>
  )
}
