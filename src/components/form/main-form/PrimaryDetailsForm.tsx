import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import 'react-datepicker/dist/react-datepicker.css'

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import CategoryFormDropdown from '../FormCategoryDropdown'
import { PrimaryFormDefaultValues } from '@/constants'
import { PrimaryFormSchema } from '@/lib/validator'
import { PrimaryFormType } from '@/types/formTypes'

// date picker
import * as React from 'react'
import YearPicker from '../YearPicker'
import FileUpload from '../file-upload/ImagesUpload'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import RentalDetailsFormField from '../RentalDetailsFormField'
import PdfUpload from '../file-upload/PdfUpload'

type PrimaryFormProps = {
  type: 'Add' | 'Update'
  formData?: PrimaryFormType | null
}

export default function PrimaryForm({ type, formData }: PrimaryFormProps) {
  const [previewURLs, setPreviewURLs] = useState<{ [key: string]: string[] }>({
    reg_card: [],
    commercial_license: [],
    photos: [],
  })

  const [isEdit, setIsEdit] = useState<boolean>(false)

  const initialValues =
    formData && type === 'Update' ? formData : PrimaryFormDefaultValues

  // Define your form.
  const form = useForm<z.infer<typeof PrimaryFormSchema>>({
    resolver: zodResolver(PrimaryFormSchema),
    defaultValues: initialValues,
  })

  const photosRef = form.register('photos')
  const regCardRef = form.register('reg_card')
  const commercialLicenseRef = form.register('commercial_license')

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof PrimaryFormSchema>) {
    console.log('values', values)

    const formData = new FormData()

    // Append other form data

    if (type === 'Add') {
      return
    }

    if (type === 'Update') {
      return
    }
  }

  const validateFile = (file: File) => {
    const maxSize = 300 * 1024 // 300kb
    const maxWidth = 300
    const maxHeight = 300

    return {}
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof PrimaryFormType
  ) => {
    const files = event.target.files
    if (!files) return

    const fileArray = Array.from(files)
    const newPreviewURLs = await Promise.all(
      fileArray.map((file) => URL.createObjectURL(file))
    )

    setPreviewURLs((prev) => ({
      ...prev,
      [name]: newPreviewURLs,
    }))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5  mx-auto bg-white  rounded-3xl p-2 md:p-4 py-8 !pb-8  "
      >
        <div className="flex flex-col gap-5 w-full max-w-full md:max-w-[800px] mx-auto ">
          {/* category of the vehicle */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex w-full mb-2 max-sm:flex-col ">
                <FormLabel className="flex justify-between mt-4 ml-2 text-base max-sm:w-fit w-72 lg:text-lg">
                  Vehicle Category <span className="mr-5 max-sm:hidden">:</span>
                </FormLabel>

                <div className="flex-col items-start w-full">
                  <FormControl>
                    <CategoryFormDropdown
                      onChangeHandler={field.onChange}
                      value={initialValues.category}
                      placeholder="category"
                      isDisabled={true}
                    />
                  </FormControl>
                  <FormDescription className="ml-2">
                    Category of the vehicle
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* type of the vehicle */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex w-full mb-2 max-sm:flex-col ">
                <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
                  Vehicle Type <span className="mr-5 max-sm:hidden">:</span>
                </FormLabel>

                <div className="flex-col items-start w-full">
                  <FormControl>
                    <CategoryFormDropdown
                      onChangeHandler={field.onChange}
                      value={initialValues.type}
                      placeholder="types"
                    />
                  </FormControl>
                  <FormDescription className="ml-2">
                    Type of the vehicle
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          {/* brand name */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="flex w-full mb-2 max-sm:flex-col ">
                <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
                  Brand Name <span className="mr-5 max-sm:hidden">:</span>
                </FormLabel>
                <div className="flex-col items-start w-full">
                  <FormControl>
                    <CategoryFormDropdown
                      onChangeHandler={field.onChange}
                      value={initialValues.brand}
                      placeholder="brand"
                      isDisabled={false}
                    />
                  </FormControl>
                  <FormDescription className="ml-2">
                    Add your Brand Name
                  </FormDescription>
                  <FormMessage className="ml-2" />
                </div>
              </FormItem>
            )}
          />
          {/* model name */}
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="flex w-full mb-2 max-sm:flex-col ">
                <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
                  Model <span className="mr-5 max-sm:hidden">:</span>
                </FormLabel>
                <div className="flex-col items-start w-full">
                  <FormControl>
                    <Input
                      placeholder="eg: 'Model'"
                      {...field}
                      className={`input-field`}
                    />
                  </FormControl>
                  <FormDescription className="ml-2">
                    Add Model Name
                  </FormDescription>
                  <FormMessage className="ml-2" />
                </div>
              </FormItem>
            )}
          />
          {/* Vehicle Photos */}
          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FileUpload
                name="photos"
                label="Vehicle Photos"
                control={form.control}
                description="Upload up to 8 photos of the vehicle with a maximum file size of 300KB each. The images should have dimensions not exceeding 300x300 pixels."
                initialUrls={type === 'Update' ? initialValues.photos : []}
              />
            )}
          />

          {/* registered year */}
          <FormField
            control={form.control}
            name="reg_year"
            render={({ field }) => (
              <FormItem className="flex w-full mb-2 max-sm:flex-col ">
                <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
                  Registered Year <span className="mr-5 max-sm:hidden">:</span>
                </FormLabel>
                <div className="flex-col items-start w-full">
                  <FormControl>
                    <YearPicker
                      onChangeHandler={field.onChange}
                      value={initialValues.reg_year}
                      placeholder="year"
                    />
                  </FormControl>
                  <FormDescription className="ml-2">
                    This value will be used for API interaction. Eg: for "2020"
                  </FormDescription>
                  <FormMessage className="ml-2" />
                </div>
              </FormItem>
            )}
          />
          {/* Registration Card*/}
          <FormField
            control={form.control}
            name="reg_card"
            render={({ field }) => (
              <FileUpload
                name="reg_card"
                label="Registration Card"
                control={form.control}
                description="Upload 2 registration card images with a maximum file size of 300KB each. The images should have dimensions not exceeding 300x300 pixels."
                maxFiles={2}
                initialUrls={type === 'Update' ? initialValues.reg_card : []}
              />
            )}
          />

          {/* commercial license */}
          <FormField
            control={form.control}
            name="commercial_license"
            render={({ field }) => (
              <PdfUpload
                name="commercial_license"
                label="Commercial License / Mulkia"
                control={form.control}
                description="Upload images or PDF documents as supporting files."
                initialUrls={
                  type === 'Update'
                    ? initialValues.commercial_license
                      ? [initialValues.commercial_license]
                      : []
                    : []
                }
              />
            )}
          />

          {/* Lease */}
          <FormField
            control={form.control}
            name="lease"
            render={({ field }) => (
              <FormItem className="flex w-full mb-2 max-sm:flex-col">
                <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
                  Lease <span className="mr-5 max-sm:hidden">:</span>
                </FormLabel>
                <div className="flex-col items-start w-full">
                  <FormControl>
                    <div className="flex items-center mt-3 space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="w-5 h-5 bg-white data-[state=checked]:bg-yellow data-[state=checked]:border-none"
                        id="lease"
                      />
                      <label
                        htmlFor="lease"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Available for lease?
                      </label>
                    </div>
                  </FormControl>
                  <FormDescription className="mt-1 ml-2">
                    Select if this vehicle is available for lease
                  </FormDescription>
                  <FormMessage className="ml-2" />
                </div>
              </FormItem>
            )}
          />

          {/* Specification */}
          <FormField
            control={form.control}
            name="specification"
            render={({ field }) => (
              <FormItem className="flex w-full mb-2 max-sm:flex-col">
                <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
                  Specification <span className="mr-5 max-sm:hidden">:</span>
                </FormLabel>
                <div className="flex-col items-start w-full ">
                  <FormControl className="mt-2">
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex items-center gap-x-5"
                      defaultValue="UAE"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="UAE" id="UAE" />
                        <Label htmlFor="UAE">UAE</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="USA" id="USA" />
                        <Label htmlFor="USA">USA</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Others" id="others" />
                        <Label htmlFor="others">Others</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription className="mt-1 ml-2">
                    Select the specification region
                  </FormDescription>
                  <FormMessage className="ml-2" />
                </div>
              </FormItem>
            )}
          />

          {/* mobile */}
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem className="flex w-full mb-2 max-sm:flex-col">
                <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
                  Mobile <span className="mr-5 max-sm:hidden">:</span>
                </FormLabel>
                <div className="flex-col items-start w-full">
                  <FormControl>
                    <PhoneInput
                      defaultCountry="ae"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      className="flex items-center"
                      inputClassName="input-field !w-full !text-base"
                      countrySelectorStyleProps={{
                        className:
                          'bg-white !border-none outline-none !rounded-xl  mr-1',
                        style: {
                          border: 'none ',
                        },
                        buttonClassName:
                          '!border-none outline-none !h-[52px] !w-[50px] !rounded-xl ',
                      }}
                    />
                  </FormControl>
                  <FormDescription className="ml-2">
                    Add Mobile Number
                  </FormDescription>
                  <FormMessage className="ml-2" />
                </div>
              </FormItem>
            )}
          />

          {/* rental details */}
          <FormField
            control={form.control}
            name="rentalDetails"
            render={({ field }) => (
              <FormItem className="flex w-full mb-2 max-sm:flex-col">
                <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
                  Rental Details <span className="mr-5 max-sm:hidden">:</span>
                </FormLabel>
                <div className="flex-col items-start w-full">
                  <FormControl>
                    <RentalDetailsFormField rentalDetails={field.value} />
                  </FormControl>
                  <FormDescription className="mt-2 ml-2">
                    Add Rental Details
                  </FormDescription>
                  <FormMessage className="ml-2" />
                </div>
              </FormItem>
            )}
          />

          {/* Location(state) */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex w-full mb-2 max-sm:flex-col ">
                <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
                  Location <span className="mr-5 max-sm:hidden">:</span>
                </FormLabel>
                <div className="flex-col items-start w-full">
                  <FormControl>
                    <CategoryFormDropdown
                      onChangeHandler={field.onChange}
                      value={initialValues.location}
                      placeholder="location"
                    />
                  </FormControl>
                  <FormDescription className="ml-2">
                    Choose your state/location
                  </FormDescription>
                  <FormMessage className="ml-2" />
                </div>
              </FormItem>
            )}
          />
          {/* cities */}
          <FormField
            control={form.control}
            name="cities"
            render={({ field }) => (
              <FormItem className="flex w-full mb-2 max-sm:flex-col ">
                <FormLabel className="flex justify-between mt-4 ml-2 text-base w-72 lg:text-lg">
                  Cities / Serving Areas{' '}
                  <span className="mr-5 max-sm:hidden">:</span>
                </FormLabel>
                <div className="flex-col items-start w-full">
                  <FormControl>
                    <CategoryFormDropdown
                      onChangeHandler={field.onChange}
                      value={initialValues.cities}
                    />
                  </FormControl>
                  <FormDescription className="ml-2">
                    Choose your cities / serving areas
                  </FormDescription>
                  <FormMessage className="ml-2" />
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* submit  */}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full md:w-10/12 lg:w-8/12 mx-auto flex-center col-span-2 mt-3 !text-lg !font-semibold button bg-yellow hover:bg-darkYellow"
        >
          {type === 'Add' ? 'Add Vehicle' : 'Update Vehicle'}
        </Button>
      </form>
    </Form>
  )
}
