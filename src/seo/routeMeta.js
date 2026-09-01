const SITE_URL = 'https://egbedeyitemitope.com/'
const DEFAULT_IMAGE =
  'https://raw.githubusercontent.com/Silachim/Egbedeyi-Temitope/main/Home%20page%20picture.jpg'

export const routeMeta = {
  home: {
    title: 'Temitope F. Egbedeyi | Early Childhood Mathematics Education Researcher',
    description: 'Academic website of Temitope F. Egbedeyi, an Early Childhood Mathematics Education Researcher and doctoral candidate at Kent State University studying children’s mathematical reasoning, classroom interaction, culture, place, and technology.',
  },
  about: {
    title: 'About Temitope F. Egbedeyi | Early Childhood Mathematics Education Researcher',
    description: 'Learn about Temitope F. Egbedeyi, his academic journey, research interests, leadership, awards, and work in early childhood and elementary mathematics education.',
  },
  research: {
    title: 'Mathematics Education Research | Temitope F. Egbedeyi',
    description: 'Explore Temitope F. Egbedeyi’s research on multiplicative reasoning, sociomathematical norms, eye-tracking, fraction reasoning, multi-digit operations, and place-based mathematics education.',
  },
  publications: {
    title: 'Mathematics Education Publications | Temitope F. Egbedeyi',
    description: 'Explore peer-reviewed journal articles and conference proceedings by Temitope F. Egbedeyi across mathematics education, teacher education, early childhood education, and culturally grounded learning.',
  },
  impact: {
    title: 'Research Impact & Engagement | Temitope F. Egbedeyi',
    description: 'Explore Temitope F. Egbedeyi’s research impact through scholarly dissemination, collaborative research, mentoring, professional service, public scholarship, and research-to-practice engagement.',
  },
  cv: {
    title: 'Academic CV & Professional Service | Temitope F. Egbedeyi',
    description: 'Academic experience, awards, peer review, leadership, mentoring, professional memberships, and service of Temitope F. Egbedeyi.',
  },
  blog: {
    title: 'Blog & Media | Temitope F. Egbedeyi',
    description: 'Read reflections by Temitope F. Egbedeyi on mathematics education, childhood, research, teaching and learning, and explore media coverage and public scholarship.',
  },
  contact: {
    title: 'Contact Temitope F. Egbedeyi | Research Collaboration',
    description: 'Contact Temitope F. Egbedeyi about research collaboration, speaking, educational engagement, research mentoring, media inquiries, and other professional opportunities.',
  },
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
  return element
}

export function applyRouteMeta(route, { post = null, isBlogPost = false } = {}) {
  const base = routeMeta[route] || routeMeta.home
  const isPublishedPost = route === 'blog' && isBlogPost && post?.status === 'published'
  const shouldNoIndex = route === 'blog' && isBlogPost && !isPublishedPost
  const meta = isPublishedPost
    ? {
        title: `${post.title} | Temitope F. Egbedeyi`,
        description: post.excerpt,
        type: 'article',
      }
    : { ...base, type: 'website' }

  document.title = meta.title

  upsertMeta('meta[name="description"]', { name: 'description', content: meta.description })
  upsertMeta('meta[name="robots"]', {
    name: 'robots',
    content: shouldNoIndex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large',
  })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title })
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: meta.description })
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: meta.type })
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: SITE_URL })
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: post?.featuredImage || DEFAULT_IMAGE })
  upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: post?.featuredImageAlt || 'Temitope F. Egbedeyi academic website' })
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title })
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: meta.description })
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: post?.featuredImage || DEFAULT_IMAGE })

  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  // Hash routes are not independently crawlable URLs. Keep the root canonical until clean routes are introduced.
  canonical.setAttribute('href', SITE_URL)
}
