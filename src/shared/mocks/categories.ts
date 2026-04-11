export type ProjectCategoryId =
  | 'all'
  | 'saas'
  | 'mobile-apps'
  | 'ecommerce'
  | 'content'
  | 'marketplace'
  | 'ai-tools'
  | 'browser-extensions'
  | 'communities'
  | 'digital-products'

export interface Category {
  id: ProjectCategoryId
  label: string
}

export const categories: Category[] = [
  { id: 'all', label: 'All' },
  { id: 'saas', label: 'SaaS' },
  { id: 'mobile-apps', label: 'Mobile Apps' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'content', label: 'Content' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'ai-tools', label: 'AI Tools' },
  { id: 'browser-extensions', label: 'Browser Extensions' },
  { id: 'communities', label: 'Communities' },
  { id: 'digital-products', label: 'Digital Products' },
]

export function getCategoryLabel(id: ProjectCategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id
}
