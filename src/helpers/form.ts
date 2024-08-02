import * as z from 'zod'

type SpecificationOption = { label: string; value: string }

// function to create dynamic specification form zod schema based on the currently choose vehicle category
const createSpecificationSchemaForCategory = (
  fields: Record<string, SpecificationOption[]>
) => {
  const schemaObject = Object.keys(fields).reduce((acc, field) => {
    acc[field] = z.string() // Adjust type according to your needs
    return acc
  }, {} as Record<string, z.ZodTypeAny>)
  return z.object({ specifications: z.object(schemaObject) })
}

export default createSpecificationSchemaForCategory

type FeatureOption = { label: string; value: string }

// Function to create dynamic feature form zod schema based on the currently chosen vehicle category
export const createFeatureSchemaForCategory = (
  fields: Record<string, FeatureOption[]>
) => {
  const schemaObject = Object.keys(fields).reduce((acc, field) => {
    acc[field] = z.array(z.string()) // Each field should be an array of strings
    return acc
  }, {} as Record<string, z.ZodTypeAny>)
  return z.object({ features: z.object(schemaObject) })
}

// mapping function to format the label name .
// For example, "year_of_manufacture" will be converted to "Year Of Manufacturer
export const formatFieldName = (field: string): string => {
  return field
    .replace(/_/g, ' ') // Replace underscores with spaces
    .split(' ') // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' ') // Join words with spaces
}

// rental detail type
type RentalDetailType = {
  enabled?: boolean | undefined
  rentInAED?: string | undefined
  mileageLimit?: string | undefined
}

type RentalDetailsType = {
  day: RentalDetailType
  week: RentalDetailType
  month: RentalDetailType
}

// rental details form field validation helper function
export const validateRentalDetails = (
  rentalDetails: RentalDetailsType
): string | null => {
  const { day, week, month } = rentalDetails
  let message =
    'Rent in AED as well as Mileage should be provided for the checked values'

  if (!day.enabled && !week.enabled && !month.enabled) {
    return 'At least one rental period (day, week, or month) must be enabled'
  }

  if (day.enabled && (!day.rentInAED || !day.mileageLimit)) {
    return message
  }

  if (week.enabled && (!week.rentInAED || !week.mileageLimit)) {
    return message
  }

  if (month.enabled && (!month.rentInAED || !month.mileageLimit)) {
    return message
  }

  return null
}
