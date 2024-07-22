import React, { useState, useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'

type PdfUploadProps = {
  name: string
  label: string
  description: string
  initialUrls?: string[]
  control?: any
}

const PdfUpload: React.FC<PdfUploadProps> = ({
  name,
  label,
  description,
  initialUrls = [],
  control,
}) => {
  const {
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext()
  const [previewURL, setPreviewURL] = useState<string | null>(
    initialUrls[0] || null
  )
  const [fileName, setFileName] = useState<string | null>(
    initialUrls[0]?.split('/').pop() || null
  )

  useEffect(() => {
    setValue(name, initialUrls[0] || null)
  }, [initialUrls, setValue, name])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const fileURL = file.type.startsWith('image/')
      ? URL.createObjectURL(file)
      : null
    setPreviewURL(fileURL)
    setFileName(file.name)
    setValue(name, file) // Ensure the value is set as a File object

    // Clear errors related to this field
    clearErrors(name)

    // Log the file type and value to debug
    console.log('File type:', file.type)
    console.log('File value:', file)
  }

  const handleDelete = () => {
    setPreviewURL(null)
    setFileName(null)
    setValue(name, null)
  }

  return (
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
                accept="image/*,application/pdf"
                className="h-16 text-center cursor-pointer w-96"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null
                  field.onChange(file)
                  handleFileChange(e)
                }}
              />
            )}
          />
        </FormControl>
        <FormDescription className="ml-2">{description}</FormDescription>
        {errors[name] && <FormMessage className="ml-2" />}

        {(previewURL || fileName) && (
          <div className="relative flex flex-col items-center mt-2 w-fit">
            {previewURL ? (
              <div className="relative w-32 h-32 m-2">
                <img
                  src={previewURL}
                  alt="Preview"
                  className="object-cover w-full h-full max-w-full rounded-md"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-32 h-32 m-2 bg-gray-100 border border-gray-400 border-dashed rounded-md">
                <span>{fileName}</span>
              </div>
            )}
            <button
              type="button"
              className="absolute top-0 right-0 p-1 text-red-500 bg-white rounded-full"
              onClick={handleDelete}
            >
              &#x2715;
            </button>
          </div>
        )}
      </div>
    </FormItem>
  )
}

export default PdfUpload
