import React, { useState, useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormField,
} from '@/components/ui/form'

type FileUploadProps = {
  name: string
  label: string
  description: string
  initialUrls?: string[]
  maxFiles?: number
  maxSize?: number // in KB
  maxWidth?: number
  maxHeight?: number
  control?: any
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  description,
  initialUrls = [],
  maxFiles = 8,
  control,
  maxSize = 300,
  maxWidth = 300,
  maxHeight = 300,
}) => {
  const {
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext()
  const [previewURLs, setPreviewURLs] = useState<string[]>(initialUrls)

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (!files) return

    const fileArray = Array.from(files).slice(0, maxFiles)
    const newPreviewURLs = await Promise.all(
      fileArray.map((file) => URL.createObjectURL(file))
    )

    setPreviewURLs((prev) => [...prev, ...newPreviewURLs])
    setValue(name, fileArray) // Update the form value

    // Clear errors related to this field
    clearErrors(name)
  }

  const handleDelete = (index: number) => {
    const updatedPreviews = previewURLs.filter((_, i) => i !== index)
    setPreviewURLs(updatedPreviews)
    setValue(
      name,
      updatedPreviews.map((url, i) => new File([], url))
    ) // Update the form value
  }

  useEffect(() => {
    setValue(name, initialUrls)
  }, [initialUrls, setValue, name])

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full mb-2 max-sm:flex-col">
          <FormLabel className="flex justify-between mt-4 ml-2 text-base w-[18rem] md:min-w-[13rem] lg:text-lg">
            {label} <span className="mr-5 max-sm:hidden">:</span>
          </FormLabel>
          <div className="flex-col items-start w-full">
            <FormControl>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <Input
                    type="file"
                    multiple={true}
                    accept="image/*"
                    className="h-16 text-center cursor-pointer w-96"
                    onChange={(e) => {
                      field.onChange(e)
                      handleFileChange(e)
                    }}
                  />
                )}
              />
            </FormControl>
            <FormDescription className="ml-2">{description}</FormDescription>
            {errors[name] && <FormMessage className="ml-2" />}

            {previewURLs.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8  w-fit">
                {previewURLs.map((url, index) => (
                  <div className="w-16 h-16 m-2 relative" key={index}>
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="object-cover w-full h-full max-w-full rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1"
                      onClick={() => handleDelete(index)}
                    >
                      &#x2715;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FormItem>
      )}
    />
  )
}

export default FileUpload
