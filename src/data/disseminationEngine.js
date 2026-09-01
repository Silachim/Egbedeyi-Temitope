const SITE_URL = 'https://egbedeyitemitope.com'

function clean(value = '') {
  return String(value).replace(/\s+/g, ' ').trim()
}

function truncate(value, max) {
  const text = clean(value)
  if (text.length <= max) return text
  return `${text.slice(0, Math.max(0, max - 1)).trimEnd()}…`
}

export function getCanonicalArticleUrl(post) {
  return `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`
}

export function getShareKeywords(post) {
  return Array.from(
    new Set([
      post.subject,
      post.format,
      ...(post.tags || []),
    ].filter(Boolean))
  )
}

export function getHashtags(post, limit = 5) {
  return getShareKeywords(post)
    .slice(0, limit)
    .map((tag) =>
      `#${String(tag)
        .replace(/&/g, 'And')
        .replace(/[^A-Za-z0-9]+/g, '')
        .trim()}`
    )
    .filter((tag) => tag.length > 1)
}

export function createLinkedInCopy(post) {
  const url = getCanonicalArticleUrl(post)
  const hashtags = getHashtags(post, 4).join(' ')

  return clean(`
${post.title}

${post.excerpt}

I explore this question in a new ${String(post.format || 'article').toLowerCase()} on my website.

Read: ${url}

${hashtags}
  `)
}

export function createXCopy(post) {
  const url = getCanonicalArticleUrl(post)
  const hashtags = getHashtags(post, 2).join(' ')
  const reserved = url.length + hashtags.length + 8
  const available = Math.max(70, 280 - reserved)

  return clean(
    `${truncate(`${post.title}: ${post.excerpt}`, available)} ${url} ${hashtags}`
  )
}

export function createFacebookCopy(post) {
  const url = getCanonicalArticleUrl(post)

  return clean(`
${post.title}

${post.excerpt}

Read the full article here:
${url}
  `)
}

export function createWhatsAppCopy(post) {
  const url = getCanonicalArticleUrl(post)

  return clean(`
I recently published: "${post.title}"

${post.excerpt}

Read it here: ${url}
  `)
}

export function createEmailShare(post) {
  const url = getCanonicalArticleUrl(post)

  return {
    subject: `New article: ${post.title}`,
    body: clean(`
Hello,

I wanted to share a recent article from my website:

${post.title}

${post.excerpt}

Read the full article:
${url}

Best,
Temitope F. Egbedeyi
    `),
  }
}

export function createMediaPitch(post) {
  const url = getCanonicalArticleUrl(post)
  const topics = getShareKeywords(post).slice(0, 8).join(', ')

  return {
    subject: `Commentary/Expert perspective: ${post.title}`,
    body: clean(`
Hello,

I am sharing a recent ${String(post.format || 'article').toLowerCase()} that may be relevant to your coverage:

"${post.title}"

${post.excerpt}

The article addresses: ${topics}.

Read it here:
${url}

For media inquiries, interviews, or related commentary, I can be reached through:
${SITE_URL}/#contact

Best,
Temitope F. Egbedeyi
    `),
  }
}

export function createSecondShare(post) {
  const url = getCanonicalArticleUrl(post)

  return clean(`
A question I keep returning to from this article:

${post.title}

${truncate(post.excerpt, 220)}

If this question interests you, the full piece is here:
${url}
  `)
}

export function createDisseminationPack(post) {
  const canonicalUrl = getCanonicalArticleUrl(post)
  const email = createEmailShare(post)
  const mediaPitch = createMediaPitch(post)

  return {
    slug: post.slug,
    title: post.title,
    subject: post.subject,
    format: post.format,
    publishedDate: post.isoDate || post.date,
    canonicalUrl,
    excerpt: post.excerpt,
    keywords: getShareKeywords(post),
    hashtags: getHashtags(post),
    channels: {
      linkedin: createLinkedInCopy(post),
      x: createXCopy(post),
      facebook: createFacebookCopy(post),
      whatsapp: createWhatsAppCopy(post),
      email,
      mediaPitch,
      secondShare: createSecondShare(post),
    },
  }
}
