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
  const [files, setFiles] = useState<File[]>([])
  const [urls, setUrls] = useState<string[]>(initialUrls)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : []
    const combinedFiles = [...files, ...newFiles].slice(0, maxFiles)
    const newUrls = combinedFiles.map((file) => URL.createObjectURL(file))
    setFiles(combinedFiles)
    setUrls(newUrls)
    setValue(name, combinedFiles) // Update the form value
    clearErrors(name) // Clear errors related to this field
  }

  const handleDelete = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    const updatedUrls = updatedFiles.map((file) => URL.createObjectURL(file))
    setFiles(updatedFiles)
    setUrls(updatedUrls)
    setValue(name, updatedFiles) // Update the form value
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
                multiple={true}
                accept="image/*"
                className="h-16 text-center cursor-pointer w-96"
                onChange={(e) => {
                  field.onChange(e.target.files)
                  handleFileChange(e)
                }}
              />
            )}
          />
        </FormControl>
        <FormDescription className="ml-2">{description}</FormDescription>
        {errors[name] && <FormMessage className="ml-2" />}

        {urls.length > 0 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 w-fit">
            {urls.map((url, index) => (
              <div className="relative w-16 h-16 m-2" key={index}>
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full max-w-full rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 p-1 text-red-500 bg-white rounded-full"
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
  )
}

export default FileUpload
