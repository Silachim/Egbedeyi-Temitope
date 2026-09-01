const SITE_URL = 'https://egbedeyitemitope.com'
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/home-banner.jpg`

export const routeMeta = {
  home: {
    title: 'Temitope F. Egbedeyi | Early Childhood Mathematics Education Researcher',
    description:
      'Academic website of Temitope F. Egbedeyi, an Early Childhood Mathematics Education Researcher studying children’s mathematical reasoning, classroom interaction, culture, place, and technology.',
  },
  about: {
    title: 'About Temitope F. Egbedeyi | Early Childhood Mathematics Education Researcher',
    description:
      'Learn about Temitope F. Egbedeyi, his academic journey, research interests, leadership, awards, and work in early childhood and elementary mathematics education.',
  },
  research: {
    title: 'Mathematics Education Research | Temitope F. Egbedeyi',
    description:
      'Explore Temitope F. Egbedeyi’s research on multiplicative reasoning, sociomathematical norms, eye-tracking, fraction reasoning, multi-digit operations, and place-based mathematics education.',
  },
  publications: {
    title: 'Mathematics Education Publications | Temitope F. Egbedeyi',
    description:
      'Explore peer-reviewed journal articles and conference proceedings by Temitope F. Egbedeyi across mathematics education, teacher education, early childhood education, and culturally grounded learning.',
  },
  impact: {
    title: 'Research Impact & Engagement | Temitope F. Egbedeyi',
    description:
      'Explore Temitope F. Egbedeyi’s research impact through scholarly reach, collaborative research, mentoring, public scholarship, and research-to-practice engagement.',
  },
  cv: {
    title: 'Academic CV & Professional Service | Temitope F. Egbedeyi',
    description:
      'Academic experience, awards, peer review, leadership, mentoring, professional memberships, and service of Temitope F. Egbedeyi.',
  },
  blog: {
    title: 'Blog | Mathematics Education, Childhood & Research | Temitope F. Egbedeyi',
    description:
      'Accessible essays on children’s mathematical thinking, mathematics education, teaching and learning, research practice, culture, and public scholarship.',
  },
  contact: {
    title: 'Contact Temitope F. Egbedeyi | Research Collaboration',
    description:
      'Contact Temitope F. Egbedeyi about research collaboration, speaking, educational engagement, research mentoring, media inquiries, and other professional opportunities.',
  },
}

function absoluteUrl(value) {
  if (!value) return DEFAULT_IMAGE
  if (/^https?:\/\//i.test(value)) return value
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([name, value]) =>
    element.setAttribute(name, value)
  )
  return element
}

function upsertCanonical(href) {
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', href)
}

function upsertArticleJsonLd(post, canonicalUrl, image) {
  let script = document.getElementById('seo-article-jsonld')

  if (!post) {
    script?.remove()
    return
  }

  if (!script) {
    script = document.createElement('script')
    script.id = 'seo-article-jsonld'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [image],
    datePublished: post.isoDate,
    dateModified: post.updatedIsoDate || post.isoDate,
    mainEntityOfPage: canonicalUrl,
    articleSection: post.category,
    keywords: (post.tags || []).join(', '),
    author: {
      '@type': 'Person',
      name: post.author || 'Temitope F. Egbedeyi',
      url: `${SITE_URL}/`,
    },
    publisher: {
      '@type': 'Person',
      name: 'Temitope F. Egbedeyi',
      url: `${SITE_URL}/`,
    },
  })
}

export function applyRouteMeta(
  route,
  { post = null, isBlogPost = false } = {}
) {
  const base = routeMeta[route] || routeMeta.home
  const isPublishedPost =
    route === 'blog' && isBlogPost && post?.status === 'published'
  const shouldNoIndex = route === 'blog' && isBlogPost && !isPublishedPost

  const canonicalUrl = isPublishedPost
    ? `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`
    : route === 'blog'
      ? `${SITE_URL}/blog/`
      : `${SITE_URL}/`

  const meta = isPublishedPost
    ? {
        title: `${post.title} | Temitope F. Egbedeyi`,
        description: post.excerpt,
        type: 'article',
      }
    : { ...base, type: 'website' }

  const image = absoluteUrl(post?.featuredImage)

  document.title = meta.title

  upsertMeta('meta[name="description"]', {
    name: 'description',
    content: meta.description,
  })
  upsertMeta('meta[name="robots"]', {
    name: 'robots',
    content: shouldNoIndex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large',
  })

  upsertMeta('meta[property="og:title"]', {
    property: 'og:title',
    content: meta.title,
  })
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: meta.description,
  })
  upsertMeta('meta[property="og:type"]', {
    property: 'og:type',
    content: meta.type,
  })
  upsertMeta('meta[property="og:url"]', {
    property: 'og:url',
    content: canonicalUrl,
  })
  upsertMeta('meta[property="og:image"]', {
    property: 'og:image',
    content: image,
  })
  upsertMeta('meta[property="og:image:alt"]', {
    property: 'og:image:alt',
    content: post?.featuredImageAlt || 'Temitope F. Egbedeyi academic website',
  })

  if (isPublishedPost && post.isoDate) {
    upsertMeta('meta[property="article:published_time"]', {
      property: 'article:published_time',
      content: post.isoDate,
    })
    upsertMeta('meta[property="article:author"]', {
      property: 'article:author',
      content: 'Temitope F. Egbedeyi',
    })
    upsertMeta('meta[property="article:section"]', {
      property: 'article:section',
      content: post.category || 'Education',
    })
  }

  upsertMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: 'summary_large_image',
  })
  upsertMeta('meta[name="twitter:title"]', {
    name: 'twitter:title',
    content: meta.title,
  })
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: meta.description,
  })
  upsertMeta('meta[name="twitter:image"]', {
    name: 'twitter:image',
    content: image,
  })

  upsertCanonical(canonicalUrl)
  upsertArticleJsonLd(isPublishedPost ? post : null, canonicalUrl, image)
}
