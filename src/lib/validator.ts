import * as z from 'zod'

export const VehicleTypeFormSchema = z.object({
  meta_title: z.string().min(1, 'Meta title is required'),
  meta_description: z.string().min(1, 'Meta description is required'),
  type_name: z
    .string()
    .min(3, 'Vehicle Type title should be at least 3 characters long')
    .regex(
      /^[A-Za-z\s]+$/,
      'Vehicle Type title should only contain letters and spaces'
    ),
  type_value: z
    .string()
    .min(3, 'Vehicle Type value should be at least 3 characters long')
    .regex(
      /^[A-Za-z_]+$/,
      'Vehicle Type value should only contain letters and underscores'
    ),
  sub_heading: z.string().min(1, 'Title subheading required'),

  // Define logo as a union type of FileList and string
  logo: z
    .union([
      z.instanceof(FileList), // For when a file is selected
      z.string(), // For when a URL from backend is used
    ])
    .refine((value) => {
      // Custom refinement to check if it's either FileList or string (URL)
      if (value instanceof FileList) {
        return value.length === 1 // Ensure only one file is selected
      } else if (typeof value === 'string') {
        return true // Accept strings (URLs from backend)
      }
      return false
    }, 'Logo must be either a File or a URL'),
})

export const LinkFormSchema = z.object({
  label: z
    .string()
    .min(1, 'Label is required')
    .max(100, 'Label should not exceed 100 characters'),
  link: z.string().min(1, 'Link is required').url('Link must be a valid URL'),
})
