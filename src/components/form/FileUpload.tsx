import React, { useState, useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type FileUploadProps = {
  name: string
  label: string
  existingFiles?: (File | string)[]
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  existingFiles = [],
}) => {
  const { control, setValue } = useFormContext()
  const [files, setFiles] = useState<(File | string)[]>(existingFiles)

  useEffect(() => {
    setValue(name, files)
  }, [files, setValue, name])

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
  }

  const handleDeleteFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <Input
                type="file"
                accept="image/*,.pdf"
                multiple={false}
                onChange={handleFilesChange}
              />
              <div className="mt-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {typeof file === 'string' ? (
                      <a
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {file}
                      </a>
                    ) : (
                      <span>{file.name}</span>
                    )}
                    <Button
                      type="button"
                      onClick={() => handleDeleteFile(index)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default FileUpload
