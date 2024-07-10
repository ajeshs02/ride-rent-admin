import * as z from 'zod'

export const generalFormSchema = z.object({
  meta_title: z.string().min(1, 'Meta title is required'),
  meta_description: z.string().min(1, 'Meta description is required'),
  page_title: z.string().min(1, 'Page title is required'),
  sub_heading: z.string().optional(),
  page_link: z.string().url('Link must be a valid URL').optional(),
  logoSrc: z.string().url('Source must be a valid URL').optional(),
})
