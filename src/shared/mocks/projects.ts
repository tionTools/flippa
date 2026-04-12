import type { ProjectCategoryId } from './categories'

export interface ProjectMetrics {
  monthlyRevenue?: number
  monthlyProfit?: number
  monthlyTraffic?: number
  ageInYears?: number
}

export interface Project {
  id: string
  userId: string
  title: string
  description: string
  category: ProjectCategoryId
  askingPrice: number
  metrics: ProjectMetrics
  createdAt: string
  slug?: string
  image_url?: string
}

export const projects: Project[] = [
  {
    id: '1',
    userId: 'user_001',
    title: 'CloudSync AI',
    description:
      'AI-powered cloud storage and file management SaaS with automated organization, smart search, and team collaboration tools.',
    category: 'saas',
    askingPrice: 420000,
    metrics: { monthlyRevenue: 14200, monthlyProfit: 8100, monthlyTraffic: 28000, ageInYears: 3 },
    createdAt: '2026-01-15T10:00:00Z',
    slug: 'cloudsync-ai',
  },
  {
    id: '2',
    userId: 'user_002',
    title: 'StorePilot',
    description:
      'Niche e-commerce store focused on outdoor and hiking gear. Consistent revenue, loyal customer base, Shopify-based with low operational overhead.',
    category: 'ecommerce',
    askingPrice: 1200000,
    metrics: { monthlyRevenue: 31000, monthlyProfit: 19500, monthlyTraffic: 74000, ageInYears: 5 },
    createdAt: '2026-02-03T14:30:00Z',
    slug: 'storepilot',
  },
  {
    id: '3',
    userId: 'user_001',
    title: 'NestMetrics',
    description:
      'Analytics and reporting tool for property managers and landlords. Tracks occupancy, maintenance costs, and revenue across multiple properties.',
    category: 'saas',
    askingPrice: 340000,
    metrics: { monthlyRevenue: 8500, monthlyProfit: 5200, monthlyTraffic: 12000, ageInYears: 2 },
    createdAt: '2026-03-20T09:15:00Z',
    slug: 'nestmetrics',
  },
  {
    id: '4',
    userId: 'user_003',
    title: 'SendLoop',
    description:
      'Email automation platform for e-commerce brands. Deep Shopify and WooCommerce integrations, visual flow builder, and advanced segmentation.',
    category: 'saas',
    askingPrice: 2100000,
    metrics: { monthlyRevenue: 68000, monthlyProfit: 41000, monthlyTraffic: 95000, ageInYears: 6 },
    createdAt: '2026-01-28T11:00:00Z',
    slug: 'sendloop',
  },
  {
    id: '5',
    userId: 'user_004',
    title: 'AdFlow Pro',
    description:
      'Ad creative management and performance tracking tool for marketing agencies. Connects to Meta, Google, and TikTok Ads with unified reporting.',
    category: 'ai-tools',
    askingPrice: 780000,
    metrics: { monthlyRevenue: 22400, monthlyProfit: 14800, monthlyTraffic: 41000, ageInYears: 2 },
    createdAt: '2026-02-14T08:45:00Z',
    slug: 'adflow-pro',
  },
  {
    id: '6',
    userId: 'user_005',
    title: 'PageCraft',
    description:
      'No-code landing page builder tailored for indie makers and solo founders. 3,800 active users, monthly subscription model.',
    category: 'saas',
    askingPrice: 560000,
    metrics: { monthlyRevenue: 17600, monthlyProfit: 11200, monthlyTraffic: 34000, ageInYears: 3 },
    createdAt: '2026-01-10T07:30:00Z',
    slug: 'pagecraft',
  },
  {
    id: '7',
    userId: 'user_006',
    title: 'GearVault',
    description:
      'Curated e-commerce brand selling premium cycling accessories. Strong repeat purchase rate and established supplier relationships.',
    category: 'ecommerce',
    askingPrice: 890000,
    metrics: { monthlyRevenue: 24000, monthlyProfit: 13800, monthlyTraffic: 52000, ageInYears: 4 },
    createdAt: '2026-02-22T13:00:00Z',
    slug: 'gearvault',
  },
  {
    id: '8',
    userId: 'user_007',
    title: 'PromptStack',
    description:
      'Marketplace for buying and selling curated AI prompt templates. Passive revenue model with a growing community of contributors.',
    category: 'ai-tools',
    askingPrice: 195000,
    metrics: { monthlyRevenue: 5800, monthlyProfit: 4100, monthlyTraffic: 19000, ageInYears: 1 },
    createdAt: '2026-03-01T10:00:00Z',
    slug: 'promptstack',
  },
  {
    id: '9',
    userId: 'user_008',
    title: 'FinScope Weekly',
    description:
      'Curated fintech newsletter with 11,000 subscribers and a 44% average open rate. Monetized via sponsorships and a paid tier.',
    category: 'content',
    askingPrice: 310000,
    metrics: { monthlyRevenue: 9200, monthlyProfit: 7600, monthlyTraffic: 22000, ageInYears: 3 },
    createdAt: '2026-01-05T09:00:00Z',
    slug: 'finscope-weekly',
  },
  {
    id: '10',
    userId: 'user_009',
    title: 'DevCircle',
    description:
      'Paid community platform for senior software engineers. 1,400 active members, monthly cohorts, and a job board with sponsor partnerships.',
    category: 'communities',
    askingPrice: 430000,
    metrics: { monthlyRevenue: 13500, monthlyProfit: 9800, monthlyTraffic: 16000, ageInYears: 2 },
    createdAt: '2026-02-08T11:30:00Z',
    slug: 'devcircle',
  },
  {
    id: '11',
    userId: 'user_010',
    title: 'TabFlow',
    description:
      'Chrome extension for tab and workspace management with 80,000+ installs. Freemium model with a growing Pro subscriber base.',
    category: 'browser-extensions',
    askingPrice: 240000,
    metrics: { monthlyRevenue: 7100, monthlyProfit: 5600, monthlyTraffic: 48000, ageInYears: 2 },
    createdAt: '2026-03-10T08:00:00Z',
    slug: 'tabflow',
  },
  {
    id: '12',
    userId: 'user_011',
    title: 'FitTrack Mobile',
    description:
      'iOS and Android fitness tracking app with habit streaks, workout logging, and a social feed. 24,000 MAU with in-app purchase revenue.',
    category: 'mobile-apps',
    askingPrice: 620000,
    metrics: { monthlyRevenue: 18900, monthlyProfit: 12400, monthlyTraffic: 0, ageInYears: 3 },
    createdAt: '2026-01-18T14:00:00Z',
    slug: 'fittrack-mobile',
  },
  {
    id: '13',
    userId: 'user_012',
    title: 'UIBundle',
    description:
      'Digital product shop with 200+ Figma UI kits, icon sets, and design templates. One-time purchase and bundle model. Fully passive.',
    category: 'digital-products',
    askingPrice: 160000,
    metrics: { monthlyRevenue: 4800, monthlyProfit: 4200, monthlyTraffic: 28000, ageInYears: 2 },
    createdAt: '2026-02-28T10:15:00Z',
    slug: 'uibundle',
  },
  {
    id: '14',
    userId: 'user_013',
    title: 'LocalMart',
    description:
      'Two-sided marketplace connecting local artisan producers with regional buyers. Active in 3 cities with a growing GMV.',
    category: 'marketplace',
    askingPrice: 750000,
    metrics: { monthlyRevenue: 21000, monthlyProfit: 11500, monthlyTraffic: 37000, ageInYears: 3 },
    createdAt: '2026-01-25T12:00:00Z',
    slug: 'localmart',
  },
  {
    id: '15',
    userId: 'user_014',
    title: 'EcoCart',
    description:
      'Sustainable e-commerce store selling eco-friendly household products. Strong brand identity, repeat buyers, and a subscription box option.',
    category: 'ecommerce',
    askingPrice: 480000,
    metrics: { monthlyRevenue: 14600, monthlyProfit: 8900, monthlyTraffic: 31000, ageInYears: 2 },
    createdAt: '2026-03-05T09:30:00Z',
    slug: 'ecocart',
  },
]

export function getProjects(): Project[] {
  return projects
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getProjectsByUserId(userId: string): Project[] {
  return projects.filter((p) => p.userId === userId)
}

export function getProjectsByCategory(categoryId: string): Project[] {
  if (categoryId === 'all') return projects
  return projects.filter((p) => p.category === categoryId)
}

export function getFeaturedProjects(limit = 3): Project[] {
  return projects.slice(0, limit)
}
