import * as z from 'zod'

// Vehicle Type Form Schema
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

// Brand Form Schema
export const BrandFormSchema = z.object({
  meta_title: z.string().min(1, 'Meta title is required'),
  meta_description: z.string().min(1, 'Meta description is required'),
  brand_name: z
    .string()
    .min(3, 'Brand title should be at least 3 characters long')
    .regex(
      /^[A-Za-z\s]+$/,
      'Brand title should only contain letters and spaces'
    ),
  brand_value: z
    .string()
    .min(3, 'Brand value should be at least 3 characters long')
    .regex(
      /^[A-Za-z_]+$/,
      'Brand value should only contain letters and underscores'
    ),
  sub_heading: z.string().min(1, 'Title subheading required'),
  category: z
    .string()
    .min(1, 'Category is required')
    .regex(
      /^[A-Za-z_]+$/,
      'Category should only contain letters and underscores'
    ),
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

// Location Form Schema
export const LocationFormSchema = z.object({
  meta_title: z.string().min(1, 'Meta title is required'),
  meta_description: z.string().min(1, 'Meta description is required'),
  location_name: z
    .string()
    .min(3, 'Brand title should be at least 3 characters long')
    .regex(
      /^[A-Za-z\s]+$/,
      'Brand title should only contain letters and spaces'
    ),
  location_value: z
    .string()
    .min(3, 'Brand value should be at least 3 characters long')
    .regex(
      /^[A-Za-z_]+$/,
      'Brand value should only contain letters and underscores'
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
        return true
      }
      return false
    }, 'Logo must be either a File or a URL'),
})

// Link Form Schema
export const LinkFormSchema = z.object({
  label: z
    .string()
    .min(1, 'Label is required')
    .max(100, 'Label should not exceed 100 characters'),
  link: z.string().min(1, 'Link is required').url('Link must be a valid URL'),
})

// Ads Form Schema
export const AdsFormSchema = z.object({
  imageSrc: z
    .union([
      z.instanceof(FileList), // For when a file is selected
      z.string(), // For when a URL from backend is used
    ])
    .refine((value) => {
      console.log('value ', value)
      // Custom refinement to check if it's either FileList or string (URL)
      if (value instanceof FileList) {
        return value.length === 1 // Ensure only one file is selected
      } else if (typeof value === 'string') {
        return true
      }
      return false
    }, 'Image must be either a File or a URL'),
})

// RentalDetailType Schema
const RentalDetailTypeSchema = z.object({
  enabled: z.boolean().optional(),
  rentInAED: z.string().optional(),
  mileageLimit: z.string().optional(),
})

// Primary Form Schema
export const PrimaryFormSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  vehicleType: z.string().min(1, 'Type is required'),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  regYear: z.string().min(1, 'Reg Year is required'),
  photos: z
    .array(
      z.union([
        z.instanceof(File), // For newly uploaded files
        z.string().url('Photo must be a valid URL'), // For existing URLs
      ])
    )
    .max(8, 'You can upload up to 8 photos only')
    .min(1, 'At least one photo is required')
    .refine(
      (arr) =>
        arr.every((item) => item instanceof File || typeof item === 'string'),
      'Each photo must be either a file or a URL'
    ),
  regCard: z
    .array(
      z.union([
        z.instanceof(File), // For newly uploaded files
        z.string().url('Registration card must be a valid URL'), // For existing URLs
      ])
    )
    .length(2, 'Exactly 2 registration card images are required')
    .refine(
      (arr) =>
        arr.every((item) => item instanceof File || typeof item === 'string'),
      'Each registration card must be either a file or a URL'
    ),
  commercialLicense: z
    .array(
      z.union([
        z.instanceof(File), // For newly uploaded files
        z.string().url('Photo must be a valid URL'), // For existing URLs
      ])
    )
    .max(1, 'You can upload up to one pdf/image only')
    .min(1, 'At least one pdf/image is required')
    .refine(
      (arr) =>
        arr.every((item) => item instanceof File || typeof item === 'string'),
      'Each pdf/photo must be either a file or a URL'
    ),
  lease: z.boolean().default(false),
  specification: z.enum(['USA', 'UAE', 'Other'], {
    required_error: 'Specification is required',
  }),
  rentalDetails: z.object({
    day: RentalDetailTypeSchema,
    week: RentalDetailTypeSchema,
    month: RentalDetailTypeSchema,
  }),
  mobile: z.string().min(1, 'Contact number is required'),
  location: z.string().min(1, 'State / location is required'),
  cities: z.string().min(1, 'Cities are required'),
})
