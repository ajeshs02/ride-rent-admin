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
import { Image, Trash2, Upload } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { validateFileSize, validateImageDimensions } from '@/helpers/form'

type FileUploadProps = {
  name: string
  label: string
  multiple?: boolean
  existingFiles?: (File | string)[]
  description: string
  maxSizeMB?: number
  maxWidth?: number
  maxHeight?: number
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  multiple = false,
  existingFiles = [],
  description,
  maxSizeMB = 1,
  maxWidth = 1920,
  maxHeight = 1080,
}) => {
  const { control, setValue, setError, clearErrors } = useFormContext()
  const [files, setFiles] = useState<(File | string)[]>(existingFiles)

  useEffect(() => {
    setValue(name, files)
  }, [files, setValue, name])

  const handleFilesChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let selectedFiles = Array.from(event.target.files || [])
    const newFiles: (File | string)[] = []

    for (const file of selectedFiles) {
      if (!validateFileSize(file, maxSizeMB)) {
        toast({
          variant: 'destructive',
          title: 'Invalid file size',
          description: `File ${file.name} exceeds the size limit of ${maxSizeMB}MB`,
        })
        continue
      }

      if (
        name !== 'commercialLicense' &&
        !(await validateImageDimensions(file, maxWidth, maxHeight))
      ) {
        toast({
          variant: 'destructive',
          title: 'Invalid file dimensions',
          description: `File ${file.name} exceeds the dimension limit of ${maxWidth}x${maxHeight}`,
        })
        continue
      }

      newFiles.push(file)
    }

    if (newFiles.length > 0) {
      clearErrors(name)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const handleDeleteFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const isPDF = (file: File | string) => {
    if (typeof file === 'string') {
      return file.toLowerCase().endsWith('.pdf')
    } else {
      return file.type === 'application/pdf'
    }
  }

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

  const getMaxCount = () => {
    if (name === 'photos') return 8
    if (name === 'regCard') return 2
    if (name === 'commercialLicense') return 1
    return 0
  }

  return (
    <FormItem className="flex w-full mb-2 max-sm:flex-col">
      <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
        {label} <span className="mr-5 max-sm:hidden">:</span>
      </FormLabel>
      <div className="flex-col items-start w-full">
        <FormControl>
          <div className="relative w-full">
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    type="file"
                    accept={
                      name === 'commercialLicense' ? 'image/*,.pdf' : 'image/*'
                    }
                    multiple={multiple}
                    onChange={handleFilesChange}
                    className="hidden"
                    id={`file-upload-${name}`}
                    disabled={isInputDisabled()}
                  />
                  <label htmlFor={`file-upload-${name}`}>
                    <div className="w-full h-20 p-4 bg-gray-100 rounded-lg cursor-pointer flex-center hover:bg-gray-200 gap-x-4">
                      <Upload size={24} className="mb-2 text-yellow" />
                      <span className="text-gray-500">Click to upload</span>
                    </div>
                  </label>
                </>
              )}
            />
          </div>
        </FormControl>
        <FormDescription className="ml-2">{description}</FormDescription>
        <FormMessage />

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
          {Array.from({ length: getMaxCount() - files.length }).map(
            (_, index) => (
              <div
                key={`placeholder-${index}`}
                className="flex items-center justify-center w-16 h-16 border-2 border-dashed rounded-lg bg-gray-50"
              >
                <Image size={24} className="text-gray-300" />
              </div>
            )
          )}
        </div>
      </div>
    </FormItem>
  )
}

export default FileUpload
