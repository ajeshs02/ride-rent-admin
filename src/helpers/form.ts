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

// mapping function to format the label name .
// For example, "year_of_manufacture" will be converted to "Year Of Manufacturer
export const formatFieldName = (field: string): string => {
  return field
    .replace(/_/g, ' ') // Replace underscores with spaces
    .split(' ') // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' ') // Join words with spaces
}
