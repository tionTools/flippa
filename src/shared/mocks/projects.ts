export interface Project {
  id: string
  userId: string
  title: string
  description: string
  createdAt: string
}

export const projects: Project[] = [
  {
    id: '1',
    userId: 'user_001',
    title: 'SaaS Analytics Dashboard',
    description: 'A subscription-based analytics tool for small businesses. Includes real-time reporting, custom dashboards, and CSV export.',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: '2',
    userId: 'user_002',
    title: 'E-commerce Store',
    description: 'A niche e-commerce store focused on outdoor gear. Consistent revenue, low overhead, Shopify-based.',
    createdAt: '2026-02-03T14:30:00Z',
  },
  {
    id: '3',
    userId: 'user_001',
    title: 'Newsletter Business',
    description: 'Curated weekly newsletter in the fintech space. 8,000 subscribers, 42% open rate, monetized via sponsorships.',
    createdAt: '2026-03-20T09:15:00Z',
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
