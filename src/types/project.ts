import type { ProjectCategoryId } from '@/shared/mocks/categories'

export type ProjectStatus = 'active' | 'under-offer' | 'draft'

// ─── DB record — matches Supabase column names exactly ────────────────────────
// Source of truth: src/schemas/supabase.sql

export interface ProjectRecord {
  id: string           // uuid, auto
  created_at: string   // timestamptz, auto
  updated_at: string   // timestamptz, auto via trigger

  // Basic — all NOT NULL
  title: string
  category: ProjectCategoryId
  status: ProjectStatus
  short_description: string   // NOT NULL default ''
  full_description: string    // NOT NULL default ''

  // Financial — numeric fields nullable, text fields NOT NULL default ''
  asking_price: number | null
  monthly_revenue: number | null
  monthly_profit: number | null
  revenue_multiple: number | null
  monetization_model: string  // NOT NULL default ''
  business_model: string      // NOT NULL default ''

  // Metrics — integer fields nullable, arrays NOT NULL default '{}'
  monthly_traffic: number | null
  total_users: number | null
  app_installs: number | null
  growth_rate: number | null
  founded_year: number | null
  team_size: number | null
  tech_stack: string[]        // NOT NULL default '{}'

  // Additional — text fields NOT NULL default '', array NOT NULL default '{}'
  what_is_included: string[]  // NOT NULL default '{}'
  growth_opportunities: string
  risks_and_notes: string

  // Media & flags — NOT NULL
  image_url: string           // NOT NULL default ''
  is_featured: boolean        // NOT NULL default false
}

// ─── Form values — all numeric fields are strings for <input> compatibility ──

export interface ProjectFormValues {
  title: string
  category: string
  status: string
  short_description: string
  full_description: string

  asking_price: string
  monthly_revenue: string
  monthly_profit: string
  revenue_multiple: string
  monetization_model: string
  business_model: string

  monthly_traffic: string
  total_users: string
  app_installs: string
  growth_rate: string
  founded_year: string
  team_size: string
  tech_stack: string        // comma-separated → string[] on save

  what_is_included: string  // newline-separated → string[] on save
  growth_opportunities: string
  risks_and_notes: string

  image_url: string
  is_featured: boolean
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const EMPTY_FORM_VALUES: ProjectFormValues = {
  title: '',
  category: '',
  status: 'draft',
  short_description: '',
  full_description: '',
  asking_price: '',
  monthly_revenue: '',
  monthly_profit: '',
  revenue_multiple: '',
  monetization_model: '',
  business_model: '',
  monthly_traffic: '',
  total_users: '',
  app_installs: '',
  growth_rate: '',
  founded_year: '',
  team_size: '',
  tech_stack: '',
  what_is_included: '',
  growth_opportunities: '',
  risks_and_notes: '',
  image_url: '',
  is_featured: false,
}

// ─── Conversion: DB record → form values (for edit mode) ─────────────────────

export function recordToFormValues(r: ProjectRecord): ProjectFormValues {
  return {
    title: r.title,
    category: r.category,
    status: r.status,
    short_description: r.short_description,
    full_description: r.full_description,
    asking_price: r.asking_price?.toString() ?? '',
    monthly_revenue: r.monthly_revenue?.toString() ?? '',
    monthly_profit: r.monthly_profit?.toString() ?? '',
    revenue_multiple: r.revenue_multiple?.toString() ?? '',
    monetization_model: r.monetization_model,
    business_model: r.business_model,
    monthly_traffic: r.monthly_traffic?.toString() ?? '',
    total_users: r.total_users?.toString() ?? '',
    app_installs: r.app_installs?.toString() ?? '',
    growth_rate: r.growth_rate?.toString() ?? '',
    founded_year: r.founded_year?.toString() ?? '',
    team_size: r.team_size?.toString() ?? '',
    tech_stack: r.tech_stack.join(', '),
    what_is_included: r.what_is_included.join('\n'),
    growth_opportunities: r.growth_opportunities,
    risks_and_notes: r.risks_and_notes,
    image_url: r.image_url,
    is_featured: r.is_featured,
  }
}
