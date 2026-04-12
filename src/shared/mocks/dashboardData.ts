import type { ProjectCategoryId } from './categories'

// ─── Projects ────────────────────────────────────────────────────────────────

export type ProjectStatus = 'active' | 'under-offer' | 'draft'

export interface DashboardProject {
  id: string
  title: string
  category: ProjectCategoryId
  askingPrice: number
  monthlyRevenue: number
  status: ProjectStatus
  offersCount: number
  questionsCount: number
  viewsThisMonth: number
  updatedAt: string
}

export const dashboardProjects: DashboardProject[] = [
  {
    id: '1',
    title: 'CloudSync AI',
    category: 'saas',
    askingPrice: 420000,
    monthlyRevenue: 14200,
    status: 'active',
    offersCount: 3,
    questionsCount: 5,
    viewsThisMonth: 2840,
    updatedAt: '2026-04-10T14:22:00Z',
  },
  {
    id: '2',
    title: 'StorePilot',
    category: 'ecommerce',
    askingPrice: 1200000,
    monthlyRevenue: 31000,
    status: 'under-offer',
    offersCount: 1,
    questionsCount: 2,
    viewsThisMonth: 4120,
    updatedAt: '2026-04-11T09:05:00Z',
  },
  {
    id: '3',
    title: 'NestMetrics',
    category: 'saas',
    askingPrice: 340000,
    monthlyRevenue: 8500,
    status: 'active',
    offersCount: 2,
    questionsCount: 8,
    viewsThisMonth: 1380,
    updatedAt: '2026-04-09T17:44:00Z',
  },
  {
    id: '6',
    title: 'PageCraft',
    category: 'saas',
    askingPrice: 560000,
    monthlyRevenue: 17600,
    status: 'draft',
    offersCount: 0,
    questionsCount: 0,
    viewsThisMonth: 0,
    updatedAt: '2026-04-07T11:00:00Z',
  },
]

// ─── KPIs ─────────────────────────────────────────────────────────────────────

export interface DashboardKpi {
  label: string
  value: string
  sub: string
  trend?: 'up' | 'neutral'
}

export const dashboardKpis: DashboardKpi[] = [
  {
    label: 'Active Listings',
    value: '3',
    sub: '1 draft not published',
    trend: 'neutral',
  },
  {
    label: 'Open Offers',
    value: '6',
    sub: '3 awaiting your response',
    trend: 'up',
  },
  {
    label: 'New Inquiries',
    value: '15',
    sub: '5 unread messages',
    trend: 'up',
  },
  {
    label: 'Portfolio Value',
    value: '$1.96M',
    sub: 'across 3 active listings',
    trend: 'neutral',
  },
]

// ─── Activity feed ────────────────────────────────────────────────────────────

export type ActivityType = 'bid' | 'question' | 'view_spike' | 'offer' | 'deal'

export interface ActivityItem {
  id: string
  type: ActivityType
  projectTitle: string
  projectId: string
  description: string
  timeAgo: string
}

export const recentActivity: ActivityItem[] = [
  {
    id: 'a1',
    type: 'bid',
    projectTitle: 'CloudSync AI',
    projectId: '1',
    description: 'New offer of $390,000 received',
    timeAgo: '2h ago',
  },
  {
    id: 'a2',
    type: 'question',
    projectTitle: 'NestMetrics',
    projectId: '3',
    description: '"What is the current churn rate?"',
    timeAgo: '4h ago',
  },
  {
    id: 'a3',
    type: 'deal',
    projectTitle: 'StorePilot',
    projectId: '2',
    description: 'Deal initiated — LOI signed at $1.1M',
    timeAgo: '1d ago',
  },
  {
    id: 'a4',
    type: 'question',
    projectTitle: 'CloudSync AI',
    projectId: '1',
    description: '"Are there any long-term customer contracts?"',
    timeAgo: '1d ago',
  },
  {
    id: 'a5',
    type: 'view_spike',
    projectTitle: 'StorePilot',
    projectId: '2',
    description: 'Listing views up 34% vs last week',
    timeAgo: '2d ago',
  },
  {
    id: 'a6',
    type: 'bid',
    projectTitle: 'NestMetrics',
    projectId: '3',
    description: 'New offer of $310,000 received',
    timeAgo: '2d ago',
  },
  {
    id: 'a7',
    type: 'question',
    projectTitle: 'CloudSync AI',
    projectId: '1',
    description: '"Can you share a revenue breakdown by plan?"',
    timeAgo: '3d ago',
  },
  {
    id: 'a8',
    type: 'question',
    projectTitle: 'NestMetrics',
    projectId: '3',
    description: '"What tech stack is the platform built on?"',
    timeAgo: '4d ago',
  },
]

// ─── Chart data ───────────────────────────────────────────────────────────────

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Aggregate portfolio views across all listings, last 12 months
export const portfolioViewsData: number[] = [
  11200, 13800, 12600, 15900, 14700, 18400, 17100, 21300, 20600, 25400, 23800, 28100,
]

// Inquiry volume (questions + bids) last 12 months
export const inquiryTrendData: number[] = [
  4, 6, 5, 9, 7, 11, 10, 14, 13, 17, 15, 19,
]
