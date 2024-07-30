import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { PrimaryFormType } from '@/types/formTypes'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { FormMessage } from '@/components/ui/form'

type RentalDetailsFieldProps = {
  name?: keyof PrimaryFormType['rentalDetails']
}

const rentalPeriods = ['day', 'week', 'month'] as const

const RentalDetailsField: React.FC<RentalDetailsFieldProps> = ({ name }) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<PrimaryFormType>()

  const rentalDetails = watch('rentalDetails')

  return (
    <div className="flex flex-col gap-4">
      {rentalPeriods.map((period) => (
        <div key={period} className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Controller
              control={control}
              name={`rentalDetails.${period}.enabled` as const}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="w-5 h-5 bg-white data-[state=checked]:bg-yellow data-[state=checked]:border-none"
                  id={`rentalDetails.${period}.enabled`}
                />
              )}
            />
            <label
              htmlFor={`rentalDetails.${period}.enabled`}
              className="w-24 text-base capitalize"
            >
              {period}
            </label>
          </div>
          {rentalDetails[period].enabled && (
            <div className="flex gap-4">
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name={`rentalDetails.${period}.rentInAED` as const}
                  render={({ field }) => (
                    <Input
                      placeholder="Rent in AED"
                      {...field}
                      className="input-field"
                    />
                  )}
                />
                {errors?.rentalDetails?.[period]?.rentInAED && (
                  <FormMessage className="text-red-600">
                    {errors.rentalDetails[period]?.rentInAED?.message}
                  </FormMessage>
                )}
              </div>
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name={`rentalDetails.${period}.mileageLimit` as const}
                  render={({ field }) => (
                    <Input
                      placeholder="Mileage Limit"
                      {...field}
                      className="input-field"
                    />
                  )}
                />
                {errors?.rentalDetails?.[period]?.mileageLimit && (
                  <FormMessage className="text-red-600">
                    {errors.rentalDetails[period]?.mileageLimit?.message}
                  </FormMessage>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      {errors.rentalDetails?.message && (
        <FormMessage className="text-red-600">
          {errors.rentalDetails.message}
        </FormMessage>
      )}
    </div>
  )
}

export default RentalDetailsField
