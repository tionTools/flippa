import { z } from 'zod'

// Helper: convert empty string / null to undefined, otherwise parse as number
function optNum(schema: z.ZodNumber) {
  return z.preprocess(
    (v) => (v === '' || v == null ? undefined : Number(v)),
    schema.optional(),
  )
}

const positiveNum = optNum(z.number().positive('Must be a positive number'))
const naturalNum = optNum(z.number().int().min(0, 'Must be 0 or greater'))

export const projectSchema = z.object({
  // Basic
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title is too long'),
  category: z.string().min(1, 'Please select a category'),
  status: z.enum(['active', 'under-offer', 'draft'] as const),
  short_description: z.string().max(300, 'Max 300 characters'),
  full_description: z.string(),

  // Financial
  asking_price: positiveNum,
  monthly_revenue: naturalNum,
  monthly_profit: naturalNum,
  revenue_multiple: positiveNum,
  monetization_model: z.string(),
  business_model: z.string(),

  // Metrics
  monthly_traffic: naturalNum,
  total_users: naturalNum,
  app_installs: naturalNum,
  growth_rate: optNum(z.number().min(-100).max(10000)),
  founded_year: optNum(
    z.number().int().min(1900, 'Invalid year').max(new Date().getFullYear(), 'Invalid year'),
  ),
  team_size: naturalNum,
  tech_stack: z.string(),  // comma-separated, split on save

  // Additional
  what_is_included: z.string(), // newline-separated, split on save
  growth_opportunities: z.string(),
  risks_and_notes: z.string(),

  // Media & flags
  image_url: z.string(),
  is_featured: z.boolean(),
})

export type ProjectFormData = z.infer<typeof projectSchema>
