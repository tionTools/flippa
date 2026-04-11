export interface PressItem {
  id: string
  source: string
  title: string
  excerpt: string
  date: string
  tag: string
}

export const pressItems: PressItem[] = [
  {
    id: '1',
    source: 'Forbes',
    title: 'The Digital M&A Boom: Why Online Businesses Are the New Real Estate',
    excerpt:
      'Investors are increasingly turning to online businesses as a reliable asset class, with deal volumes reaching new highs and average multiples climbing steadily.',
    date: 'March 2026',
    tag: 'M&A',
  },
  {
    id: '2',
    source: 'TechCrunch',
    title: 'SaaS Acquisitions Hit Record Highs as Buyers Seek Proven Revenue Models',
    excerpt:
      'Recurring revenue SaaS businesses continue to attract premium valuations. Buyers are prioritizing predictable cash flow over hypergrowth narratives.',
    date: 'February 2026',
    tag: 'SaaS',
  },
  {
    id: '3',
    source: 'Bloomberg',
    title: 'Digital Asset Valuations Surge as Acquisition Activity Intensifies',
    excerpt:
      'Transaction volume in the digital business market has grown significantly, driven by a new generation of search funds and individual acquirers.',
    date: 'January 2026',
    tag: 'Acquisitions',
  },
  {
    id: '4',
    source: 'Inc.',
    title: 'How Entrepreneurs Are Exiting at 6-Figure Multiples',
    excerpt:
      'A growing number of founders are discovering structured marketplaces as the fastest path to a clean, well-documented exit for their online businesses.',
    date: 'December 2025',
    tag: 'Exits',
  },
  {
    id: '5',
    source: 'The Information',
    title: 'E-commerce Consolidation: Buyers Spending More Than Ever on Digital Assets',
    excerpt:
      'Roll-up strategies in e-commerce are accelerating. Acquirers are building portfolios of niche stores with strong unit economics and loyal customer bases.',
    date: 'November 2025',
    tag: 'E-commerce',
  },
  {
    id: '6',
    source: 'Entrepreneur',
    title: 'Why Structured Listings Are Changing the Way Businesses Get Sold Online',
    excerpt:
      'Transparency in financials, traffic data, and growth metrics is becoming the new standard — and buyers are willing to pay more for it.',
    date: 'October 2025',
    tag: 'Marketplace',
  },
]
