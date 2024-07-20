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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const fileURL = file.type.startsWith('image/')
      ? URL.createObjectURL(file)
      : null
    setPreviewURL(fileURL)
    setFileName(file.name)
    setValue(name, file)

    // Clear errors related to this field
    clearErrors(name)
  }

  const handleDelete = () => {
    setPreviewURL(null)
    setFileName(null)
    setValue(name, null)
  }

  useEffect(() => {
    setValue(name, initialUrls[0] || null)
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
                    accept="image/*,application/pdf"
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

            {(previewURL || fileName) && (
              <div className="flex flex-col items-center w-fit relative mt-2">
                {previewURL ? (
                  <div className="w-32 h-32 m-2 relative">
                    <img
                      src={previewURL}
                      alt="Preview"
                      className="object-cover w-full h-full max-w-full rounded-md"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center bg-gray-100 border border-dashed border-gray-400 rounded-md m-2">
                    <span>{fileName}</span>
                  </div>
                )}
                <button
                  type="button"
                  className="absolute right-0 top-0 text-red-500 bg-white rounded-full p-1"
                  onClick={handleDelete}
                >
                  &#x2715;
                </button>
              </div>
            )}
          </div>
        </FormItem>
      )}
    />
  )
}

export default PdfUpload
