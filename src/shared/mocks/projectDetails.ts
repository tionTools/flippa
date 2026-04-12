import { projects } from './projects'

export interface ProjectAnalytics {
  months: string[]
  revenue: number[]
  traffic: number[]
  users: number[]
}

export interface TrafficSource {
  label: string
  value: number
}

export interface ExternalInsights {
  trafficSources: TrafficSource[]
  topCountries: { country: string; share: string }[]
  avgSessionDuration: string
  bounceRate: string
  returningVisitors: string
}

export interface ProjectDetail {
  id: string
  fullDescription: string
  whatIsIncluded: string[]
  monetizationModel: string
  growthPotential: string
  teamSize: number
  foundedYear: number
  analytics: ProjectAnalytics
  externalInsights: ExternalInsights
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Creates a slightly irregular upward trend ending near `endValue`
function trend(endValue: number, growthFactor = 0.55): number[] {
  const noise = [-0.04, 0.03, -0.02, 0.05, -0.01, 0.03, 0.04, -0.02, 0.03, 0.05, -0.01, 0]
  const start = Math.round(endValue * growthFactor)
  const step = (endValue - start) / 11
  return MONTHS.map((_, i) => Math.max(0, Math.round((start + step * i) * (1 + noise[i]!))))
}

const defaultInsights: ExternalInsights = {
  trafficSources: [
    { label: 'Organic Search', value: 58 },
    { label: 'Direct', value: 22 },
    { label: 'Referral', value: 12 },
    { label: 'Social', value: 8 },
  ],
  topCountries: [
    { country: 'United States', share: '41%' },
    { country: 'United Kingdom', share: '14%' },
    { country: 'Canada', share: '9%' },
    { country: 'Australia', share: '7%' },
    { country: 'Germany', share: '5%' },
  ],
  avgSessionDuration: '3m 28s',
  bounceRate: '38%',
  returningVisitors: '42%',
}

const detailsMap: Record<string, Partial<ProjectDetail>> = {
  '1': {
    fullDescription:
      'CloudSync AI is a mature SaaS platform that combines cloud storage with AI-driven file management. The product has achieved strong product-market fit in the SMB segment, with consistent month-over-month growth driven entirely by organic search and word-of-mouth referrals.',
    whatIsIncluded: [
      'Full source code and infrastructure configuration',
      'All customer data and account history',
      'Domain, SSL, and cloud hosting accounts',
      'Email list and marketing assets',
      'Supplier and vendor relationships',
      'SOPs and onboarding documentation',
    ],
    monetizationModel:
      'Subscription SaaS with three tiers: Starter ($12/mo), Pro ($39/mo), and Team ($89/mo). 78% of revenue comes from Pro and Team plans. Annual plans represent 44% of ARR with 8% discount applied.',
    growthPotential:
      'Significant opportunity exists in expanding the enterprise segment, adding API access, and building integrations with popular productivity tools. The AI features have a roadmap for document summarization and auto-tagging which could drive upsell.',
    teamSize: 2,
    foundedYear: 2023,
    externalInsights: {
      trafficSources: [
        { label: 'Organic Search', value: 62 },
        { label: 'Direct', value: 21 },
        { label: 'Referral', value: 11 },
        { label: 'Social', value: 6 },
      ],
      topCountries: [
        { country: 'United States', share: '44%' },
        { country: 'United Kingdom', share: '16%' },
        { country: 'Canada', share: '10%' },
        { country: 'Australia', share: '6%' },
        { country: 'India', share: '5%' },
      ],
      avgSessionDuration: '4m 12s',
      bounceRate: '31%',
      returningVisitors: '48%',
    },
  },
  '2': {
    fullDescription:
      'StorePilot is a well-established e-commerce brand in the outdoor and hiking niche. Founded in 2021, the store has built a loyal customer base with a 28% repeat purchase rate. The brand operates entirely on Shopify with a lean supplier network and minimal team involvement.',
    whatIsIncluded: [
      'Shopify store with full product catalog',
      'All customer and order data',
      'Supplier contacts and negotiated pricing',
      'Social media accounts and email list (32K subscribers)',
      'Brand assets, photography, and copy',
      'Google Ads and Meta Ads account history',
    ],
    monetizationModel:
      'Direct-to-consumer e-commerce. Revenue is split across equipment (68%), apparel (22%), and accessories (10%). Average order value is $94. No subscription component currently.',
    growthPotential:
      'Strong opportunity for a subscription box product, wholesale distribution, and Amazon expansion. The existing email list of 32K customers is an underutilized asset for a loyalty program or brand membership.',
    teamSize: 3,
    foundedYear: 2021,
    externalInsights: {
      trafficSources: [
        { label: 'Organic Search', value: 44 },
        { label: 'Paid Ads', value: 28 },
        { label: 'Direct', value: 16 },
        { label: 'Social', value: 12 },
      ],
      topCountries: [
        { country: 'United States', share: '52%' },
        { country: 'Canada', share: '18%' },
        { country: 'United Kingdom', share: '12%' },
        { country: 'Australia', share: '9%' },
        { country: 'New Zealand', share: '4%' },
      ],
      avgSessionDuration: '2m 54s',
      bounceRate: '44%',
      returningVisitors: '31%',
    },
  },
  '4': {
    fullDescription:
      'SendLoop is a leading email automation platform designed specifically for e-commerce brands. With deep native integrations for Shopify and WooCommerce, the product has become the go-to tool for mid-market DTC brands managing post-purchase flows, win-back campaigns, and abandoned cart sequences.',
    whatIsIncluded: [
      'Full SaaS codebase (React + Node.js)',
      'All customer accounts and data',
      'AWS infrastructure and database',
      'Technical documentation and runbooks',
      'Partner and integration agreements',
      'Support and onboarding team (2 FTE)',
    ],
    monetizationModel:
      'Monthly and annual subscriptions priced by contact volume. Plans start at $49/mo (up to 5K contacts) through $499/mo (up to 100K contacts). Enterprise custom pricing above that. 61% of revenue is annual, reducing churn risk.',
    growthPotential:
      'Roadmap includes SMS and WhatsApp automation, a native AI copywriting assistant, and a self-serve analytics dashboard. The product has received significant inbound interest from PE-backed roll-ups in the martech space.',
    teamSize: 7,
    foundedYear: 2020,
  },
}

// Generate detail for any project using its metrics as a base
export function getProjectDetail(id: string): ProjectDetail {
  const project = projects.find((p) => p.id === id)
  const override = detailsMap[id] ?? {}

  const rev = project?.metrics.monthlyRevenue ?? 10000
  const traffic = project?.metrics.monthlyTraffic ?? 20000
  const users = Math.round(traffic * 0.3)
  const age = project?.metrics.ageInYears ?? 2
  const founded = 2026 - age

  return {
    id,
    fullDescription:
      override.fullDescription ??
      `${project?.title ?? 'This business'} is a well-established digital product with proven revenue and a loyal user base. The business has been operating profitably for ${age} year${age > 1 ? 's' : ''} with consistent month-over-month growth.`,
    whatIsIncluded: override.whatIsIncluded ?? [
      'Complete source code and all technical assets',
      'All customer data and account history',
      'Domain, hosting, and infrastructure accounts',
      'Documentation and operational SOPs',
      'Marketing assets and email subscriber list',
      'Supplier and vendor relationships',
    ],
    monetizationModel:
      override.monetizationModel ??
      'Primary revenue through recurring subscriptions with multiple pricing tiers. Strong MRR with low churn and increasing average revenue per user.',
    growthPotential:
      override.growthPotential ??
      'Clear opportunities exist for expanding into adjacent markets, launching new product tiers, and optimizing the existing acquisition funnel for continued compounding growth.',
    teamSize: override.teamSize ?? 2,
    foundedYear: override.foundedYear ?? founded,
    analytics: {
      months: MONTHS,
      revenue: trend(rev),
      traffic: trend(traffic),
      users: trend(users, 0.5),
    },
    externalInsights: override.externalInsights ?? defaultInsights,
  }
}
