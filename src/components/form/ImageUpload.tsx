import React, { useState, useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

type ImageUploadProps = {
  name: string
  label: string
  multiple?: boolean
  existingFiles?: (File | string)[]
  description: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  name,
  label,
  multiple = false,
  existingFiles = [],
  description,
}) => {
  const { control, setValue } = useFormContext()
  const [files, setFiles] = useState<(File | string)[]>(existingFiles)

  useEffect(() => {
    setValue(name, files)
  }, [files, setValue, name])

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let selectedFiles = Array.from(event.target.files || [])

    // Apply the limit for the respective field
    if (name === 'photos') {
      selectedFiles = selectedFiles.slice(0, 8 - files.length)
    } else if (name === 'regCard') {
      selectedFiles = selectedFiles.slice(0, 2 - files.length)
    } else if (name === 'commercialLicense') {
      selectedFiles = selectedFiles.slice(0, 1 - files.length)
    }

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
  }

  const handleDeleteFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  // Function to check whether the selected file is a PDF or not to render it accordingly
  const isPDF = (file: File | string) => {
    if (typeof file === 'string') {
      return file.toLowerCase().endsWith('.pdf')
    } else {
      return file.type === 'application/pdf'
    }
  }

  // Determine if input should be disabled based on file limit
  const isInputDisabled = () => {
    if (name === 'photos') {
      return files.length >= 8
    } else if (name === 'regCard') {
      return files.length >= 2
    } else if (name === 'commercialLicense') {
      return files.length >= 1
    }
    return false
  }

  return (
    <FormItem className="flex w-full mb-2 max-sm:flex-col">
      <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
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
                accept={
                  name === 'commercialLicense' ? 'image/*,.pdf' : 'image/*'
                }
                multiple={multiple}
                onChange={handleFilesChange}
                className="cursor-pointer input-field"
                disabled={isInputDisabled()}
              />
            )}
          />
        </FormControl>
        <FormDescription className="ml-2">{description}</FormDescription>
        <FormMessage />

        {/* display selected files */}
        <div className="grid grid-cols-4 gap-2 mt-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
          {files.map((file, index) => (
            <div
              key={index}
              className={`relative w-16 h-16 ${
                isPDF(file) && 'w-fit min-w-[100px] max-w-[200px] h-fit'
              } overflow-hidden rounded-lg`}
            >
              {isPDF(file) ? (
                <div className="flex items-center justify-center w-full h-10 px-4 text-sm text-center bg-gray-200">
                  {typeof file === 'string' ? (
                    file.split('/').pop()
                  ) : (
                    <span className="w-full truncate whitespace-nowrap">
                      {file.name}
                    </span>
                  )}
                </div>
              ) : (
                <img
                  src={
                    typeof file === 'string' ? file : URL.createObjectURL(file)
                  }
                  alt={`file-${index}`}
                  className="object-cover w-full h-full"
                />
              )}
              <Button
                type="button"
                onClick={() => handleDeleteFile(index)}
                className="absolute top-0 right-0 w-6 h-6 p-1 text-red-500 bg-white rounded-full hover:bg-red-600 hover:text-white"
                aria-label={`delete file`}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </FormItem>
  )
}

export default ImageUpload
