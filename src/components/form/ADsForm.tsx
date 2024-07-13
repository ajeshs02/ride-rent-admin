import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { AdsFormType } from '@/types/types'
import { AdFormDefaultValues } from '@/constants'
import { AdsFormSchema } from '@/lib/validator'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

type AdsFormProps = {
  type: 'Add' | 'Update'
  adsData?: AdsFormType | null
}

export default function ADsForm({ type, adsData }: AdsFormProps) {
  const [previewURL, setPreviewURL] = useState<string | null>(null)

  let initialValues =
    type === 'Update' && adsData ? adsData : AdFormDefaultValues

  // 1. Define your form.
  const form = useForm<z.infer<typeof AdsFormSchema>>({
    resolver: zodResolver(AdsFormSchema),
    defaultValues: initialValues,
  })

  const fileRef = form.register('imageSrc')

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AdsFormSchema>) {
    // console.log('values', values)

    if (type === 'Update' && adsData?.imageSrc === values.imageSrc) {
      console.log('No changes made to AD image. Skipping update.')
      return
    }

    const formData = new FormData()

    // Append other form data

    if (values.imageSrc instanceof FileList) {
      formData.append('image', values.imageSrc[0])
    } else if (typeof values.imageSrc === 'string') {
      formData.append('existing_image', values.imageSrc)
    }

    for (let pair of formData.entries()) {
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
    if (type === 'Update' && adsData) {
      setPreviewURL(adsData?.imageSrc)
      form.setValue('imageSrc', adsData?.imageSrc)
    }
  }, [type, adsData, form])

  const validateFile = (file: File) => {
    const maxSize = 500 * 1024 // 300kb
    const maxWidth = 500
    const maxHeight = 500

    if (file.size > maxSize) {
      form.setError('imageSrc', {
        type: 'manual',
        message: 'File size should be less than 500kb',
      })
      return false
    }

    return new Promise((resolve) => {
      const img = new window.Image()
      img.onload = () => {
        if (img.width > maxWidth || img.height > maxHeight) {
          form.setError('imageSrc', {
            type: 'manual',
            message: 'Image dimensions should be 500x500 pixels or less',
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
        form.clearErrors('imageSrc')
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-2 mx-auto bg-white w-fit rounded-3xl md:p-3 "
      >
        <div className="flex flex-col gap-x-10 ">
          {previewURL && (
            <div className="w-40 h-56 mx-auto mt-2 overflow-hidden rounded-xl">
              <img
                src={previewURL}
                alt="Logo Preview"
                className="object-cover w-full h-full max-w-full "
              />
            </div>
          )}
          {/* input field */}
          <FormField
            control={form.control}
            name="imageSrc"
            render={({ field }) => (
              <FormItem className=" max-w-96">
                <FormLabel className="ml-2 ">AD Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Upload AD image"
                    {...fileRef}
                    className="text-center cursor-pointer h-14 rounded-xl flex-center hover:bg-gray-200"
                    onChange={(e) => {
                      field.onChange(e)
                      handleFileChange(e)
                    }}
                  />
                </FormControl>
                <FormDescription className="ml-2">
                  Upload a logo with a maximum file size of 500KB. The logo
                  should have dimensions not exceeding 500x500 pixels
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
          {type === 'Add' ? 'Publish Ad' : 'Update Ad'}
        </Button>
      </form>
    </Form>
  )
}
