import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
import { GeneralFormType, VehicleCategoryType } from '@/types/types'
import { generalFormSchema } from '@/lib/validator'
import { generalFormDefaultValues } from '@/constants'
import { Textarea } from '../ui/textarea'
import { Image, Upload } from 'lucide-react'

type GeneralFormProps = {
  typeId?: string
  type: 'Add' | 'Update'
  category: VehicleCategoryType
  formData?: GeneralFormType
}

export default function GeneralForm({
  typeId,
  type,
  category,
  formData,
}: GeneralFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const initialValues =
    formData && type === 'Update' ? formData : generalFormDefaultValues

  // 1. Define your form.
  const form = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: initialValues,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof generalFormSchema>) {
    console.log('onSubmit ', values)
    if (type === 'Add') {
    }

    if (type === 'Update') {
      if (!typeId) {
        return
      }
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null
    setFile(selectedFile)

    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile))
    } else {
      setPreviewUrl(null)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5 max-w-[700px] mx-auto px-2 bg-white rounded-2xl p-2"
      >
        <div className="flex flex-col gap-5 r ">
          <div className="flex flex-col gap-2 md:items-center md:flex-row ">
            {/* type title */}
            <FormField
              control={form.control}
              name="page_title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Page Title"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="sub_heading"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="">
                  <Input
                    placeholder="Page Sub Heading"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* image upload */}
          <div
            className={`h-28 w-full mx-auto p-1 rounded-xl flex-between gap-x-4 bg-gray-100`}
            // onMouseOver={() => setIndex(ind)}
          >
            <div className="overflow-hidden flex flex-col items-center justify-between w-28 border-gray-100  rounded-lg h-[95%] ">
              {previewUrl ? (
                <div className="h-full w-fit ">
                  <img
                    loading="lazy"
                    src={previewUrl || ''}
                    alt={previewUrl ? 'Selected logo' : ''}
                    className={`object-contain w-full bg-white border rounded-lg h-[85%] max-w-[85%] max-h-full`}
                    onClick={() => {}}
                  />
                  <span className="text-xs text-gray-600">selected logo</span>
                </div>
              ) : (
                <Image
                  size={60}
                  strokeWidth={2}
                  className="my-auto text-gray-400"
                />
              )}
            </div>

            <label
              className={`h-[93%]  w-full pb-1 flex-center bg-white rounded-lg cursor-pointer`}
            >
              <input
                type="file"
                className="hidden w-full h-full bg-red-400"
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
              <div className="gap-2 flex-center">
                <Upload className="my-auto text-gray-400" />
                Click here to upload logo
              </div>
            </label>
          </div>

          <FormField
            control={form.control}
            name="meta_title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Meta Tag"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="Meta Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="page_link"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="">
                  <Input
                    placeholder="Page Link"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* submit  */}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full col-span-2 button"
        >
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Type `}
        </Button>
      </form>
    </Form>
  )
}
