export const disseminationChannels = [
  'LinkedIn',
  'X',
  'WhatsApp',
  'ResearchGate',
  'Email',
  'Second Share',
]

export const disseminationRegistry = [
  {
    id: 'blog-001',
    slug: 'why-the-way-children-think-about-mathematics-matters',
    publishedUrl:
      'https://egbedeyitemitope.com/blog/why-the-way-children-think-about-mathematics-matters/',
    indexing: {
      sitemap: true,
      requestedIndexing: true,
    },
    channels: {
      LinkedIn: 'pending',
      X: 'pending',
      WhatsApp: 'pending',
      ResearchGate: 'pending',
      Email: 'not-planned',
      'Second Share': 'pending',
    },
    notes:
      'Use different hooks on each platform. Do not copy and paste the same promotional text everywhere.',
  },
]

export function getDisseminationRecord(slug) {
  return disseminationRegistry.find((item) => item.slug === slug) || null
}
