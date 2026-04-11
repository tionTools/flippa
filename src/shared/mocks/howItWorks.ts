export interface ProcessStep {
  step: number
  title: string
  description: string
}

export interface ProcessTrack {
  title: string
  subtitle: string
  cta: { label: string; to: string }
  steps: ProcessStep[]
}

export const sellingTrack: ProcessTrack = {
  title: 'Selling a Business',
  subtitle: 'List your business and connect with serious buyers through a structured, transparent process.',
  cta: { label: 'List Your Business', to: '/dashboard/listings/new' },
  steps: [
    {
      step: 1,
      title: 'Create your listing',
      description: 'Add your business details, financials, and key metrics in a structured format that buyers trust.',
    },
    {
      step: 2,
      title: 'Present clearly',
      description: 'Provide traffic data, revenue history, and growth context to attract qualified buyers.',
    },
    {
      step: 3,
      title: 'Connect with buyers',
      description: 'Review inbound interest and communicate directly with serious candidates.',
    },
    {
      step: 4,
      title: 'Review offers',
      description: 'Compare bids, ask questions, and evaluate each offer on your own terms.',
    },
    {
      step: 5,
      title: 'Close with confidence',
      description: 'Complete the deal through a structured, transparent process from offer to handover.',
    },
  ],
}

export const buyingTrack: ProcessTrack = {
  title: 'Buying a Business',
  subtitle: 'Browse verified listings, evaluate opportunities, and acquire a business with full visibility into the numbers.',
  cta: { label: 'Browse Listings', to: '/projects' },
  steps: [
    {
      step: 1,
      title: 'Browse listings',
      description: 'Explore businesses filtered by type, revenue model, size, and asking price.',
    },
    {
      step: 2,
      title: 'Evaluate opportunities',
      description: 'Review key metrics, financials, and growth data before committing to anything.',
    },
    {
      step: 3,
      title: 'Ask questions',
      description: 'Connect directly with sellers to clarify details and assess strategic fit.',
    },
    {
      step: 4,
      title: 'Place a bid',
      description: 'Submit an offer or express interest when you find the right opportunity.',
    },
    {
      step: 5,
      title: 'Complete the acquisition',
      description: 'Move through a clear, guided process from accepted offer to ownership transfer.',
    },
  ],
}
