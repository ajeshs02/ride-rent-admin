import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PrimaryFormType, RentalDetailType } from '@/types/formTypes'

type RentalDetailsFormFieldProps = {
  rentalDetails: {
    day: RentalDetailType
    week: RentalDetailType
    month: RentalDetailType
  }
}

const RentalDetailsFormField: React.FC<RentalDetailsFormFieldProps> = ({
  rentalDetails,
}) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<PrimaryFormType>()

  return (
    <div className="flex flex-col gap-5">
      {(['day', 'week', 'month'] as const).map((period) => (
        <div key={period} className="flex flex-col gap-3">
          <FormItem className="flex items-center border-b">
            <FormControl>
              <Controller
                name={`rentalDetails.${period}.enabled`}
                control={control}
                defaultValue={rentalDetails[period].enabled}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-5 h-5 bg-white data-[state=checked]:bg-yellow data-[state=checked]:border-none"
                    id={`${period}-enabled`}
                  />
                )}
              />
            </FormControl>
            <FormLabel
              htmlFor={`${period}-enabled`}
              className="ml-2 text-base "
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </FormLabel>
          </FormItem>

          {rentalDetails[period].enabled && (
            <>
              <FormItem className="flex items-center">
                <FormLabel
                  htmlFor={`${period}-rentInAED`}
                  className="w-24 mt-2"
                >
                  Rent in AED
                </FormLabel>
                <FormControl>
                  <Input
                    id={`${period}-rentInAED`}
                    placeholder={`Enter rent in AED for ${period}`}
                    {...register(`rentalDetails.${period}.rentInAED`)}
                    className="bg-gray-100 h-[42px] w-full max-w-64 focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-2xl p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage>
                  {errors?.rentalDetails?.[period]?.rentInAED && (
                    <p>{errors.rentalDetails[period].rentInAED.message}</p>
                  )}
                </FormMessage>
              </FormItem>
              <FormItem className="flex items-center">
                <FormLabel
                  htmlFor={`${period}-mileageLimit`}
                  className="w-24 mt-2"
                >
                  Mileage Limit
                </FormLabel>
                <FormControl>
                  <Input
                    id={`${period}-mileageLimit`}
                    placeholder={`Enter mileage limit for ${period}`}
                    {...register(`rentalDetails.${period}.mileageLimit`)}
                    className="bg-gray-100 h-[42px] w-full max-w-64 focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-2xl p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage>
                  {errors?.rentalDetails?.[period]?.mileageLimit && (
                    <p>{errors.rentalDetails[period].mileageLimit.message}</p>
                  )}
                </FormMessage>
              </FormItem>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default RentalDetailsFormField
