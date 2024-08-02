import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const RentalDetailField = ({
  period,
}: {
  period: 'day' | 'week' | 'month'
}) => {
  const { control, watch } = useFormContext()
  const isEnabled = watch(`rentalDetails.${period}.enabled`)

  return (
    <>
      <Controller
        name={`rentalDetails.${period}.enabled`}
        control={control}
        render={({ field }) => (
          <div className="flex items-center mt-3 space-x-2">
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="w-5 h-5 bg-white data-[state=checked]:bg-yellow data-[state=checked]:border-none"
              id={`rentalDetails-${period}-enabled`}
            />
            <label
              htmlFor={`rentalDetails-${period}-enabled`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </label>
          </div>
        )}
      />
      {isEnabled && (
        <>
          <Controller
            name={`rentalDetails.${period}.rentInAED`}
            control={control}
            render={({ field }) => (
              <div className="mt-2">
                <label
                  htmlFor={`rentalDetails-${period}-rentInAED`}
                  className="block text-sm font-medium"
                >
                  Rent in AED
                </label>
                <Input {...field} placeholder="Rent in AED" />
              </div>
            )}
          />
          <Controller
            name={`rentalDetails.${period}.mileageLimit`}
            control={control}
            render={({ field }) => (
              <div className="mt-2">
                <label
                  htmlFor={`rentalDetails-${period}-mileageLimit`}
                  className="block text-sm font-medium"
                >
                  Mileage Limit
                </label>
                <Input {...field} placeholder="Mileage Limit" />
              </div>
            )}
          />
        </>
      )}
    </>
  )
}

const RentalDetailsFormField = () => {
  return (
    <div className="flex flex-col">
      <RentalDetailField period="day" />
      <RentalDetailField period="week" />
      <RentalDetailField period="month" />
    </div>
  )
}

export default RentalDetailsFormField
