import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseMarkdownPost } from '../src/data/markdownBlog.js'

const SITE_URL = 'https://egbedeyitemitope.com'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const BLOG_DIR = join(ROOT, 'content', 'blog')
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/home-banner.jpg`

const markdownNames = (await readdir(BLOG_DIR))
  .filter((name) => name.endsWith('.md'))
  .filter((name) => name !== '_POST_TEMPLATE.md')

const allPosts = []

for (const name of markdownNames) {
  const raw = await readFile(join(BLOG_DIR, name), 'utf8')
  allPosts.push(parseMarkdownPost(raw, name))
}

const published = allPosts
  .filter((post) => post.status === 'published')
  .sort((a, b) => (b.isoDate || '').localeCompare(a.isoDate || ''))

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const escapeXml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const absoluteImage = (value) => {
  if (!value) return DEFAULT_IMAGE
  if (/^https?:\/\//i.test(value)) return value
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`
}

function replaceMeta(html, selectorPattern, replacement) {
  if (selectorPattern.test(html)) {
    return html.replace(selectorPattern, replacement)
  }

  return html.replace('</head>', `  ${replacement}\n  </head>`)
}

function prepareHtml(template, meta) {
  let html = template

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(meta.title)}</title>`
  )
  html = replaceMeta(
    html,
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`
  )
  html = replaceMeta(
    html,
    /<meta\s+name="robots"[^>]*>/i,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`
  )
  html = html.replace(
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${meta.canonical}" />`
  )
  html = replaceMeta(
    html,
    /<meta\s+property="og:title"[^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`
  )
  html = replaceMeta(
    html,
    /<meta\s+property="og:description"[^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`
  )
  html = replaceMeta(
    html,
    /<meta\s+property="og:url"[^>]*>/i,
    `<meta property="og:url" content="${meta.canonical}" />`
  )
  html = replaceMeta(
    html,
    /<meta\s+property="og:type"[^>]*>/i,
    `<meta property="og:type" content="${meta.type}" />`
  )
  html = replaceMeta(
    html,
    /<meta\s+property="og:image"[^>]*>/i,
    `<meta property="og:image" content="${meta.image}" />`
  )
  html = replaceMeta(
    html,
    /<meta\s+property="og:image:alt"[^>]*>/i,
    `<meta property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" />`
  )
  html = replaceMeta(
    html,
    /<meta\s+name="twitter:title"[^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`
  )
  html = replaceMeta(
    html,
    /<meta\s+name="twitter:description"[^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`
  )
  html = replaceMeta(
    html,
    /<meta\s+name="twitter:image"[^>]*>/i,
    `<meta name="twitter:image" content="${meta.image}" />`
  )

  if (meta.articleJsonLd) {
    html = html.replace(
      '</head>',
      `  <script id="seo-article-jsonld" type="application/ld+json">${JSON.stringify(
        meta.articleJsonLd
      ).replaceAll('<', '\\u003c')}</script>\n  </head>`
    )
  }

  return html
}

const template = await readFile(join(DIST, 'index.html'), 'utf8')

const blogDir = join(DIST, 'blog')
await mkdir(blogDir, { recursive: true })

const blogIndexHtml = prepareHtml(template, {
  title:
    'Blog | Education, Research, Public Life & Ideas | Temitope F. Egbedeyi',
  description:
    'Essays, commentary, analysis, reflections, and explainers on education, research, politics, society, world affairs, professional life, and public scholarship.',
  canonical: `${SITE_URL}/blog/`,
  type: 'website',
  image: DEFAULT_IMAGE,
  imageAlt: 'Temitope F. Egbedeyi blog and public scholarship',
})

await writeFile(join(blogDir, 'index.html'), blogIndexHtml)

for (const post of published) {
  const canonical = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`
  const image = absoluteImage(post.featuredImage)
  const postDir = join(blogDir, post.slug)

  await mkdir(postDir, { recursive: true })

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [image],
    datePublished: post.isoDate,
    dateModified: post.updatedDate || post.isoDate,
    mainEntityOfPage: canonical,
    articleSection: post.subject,
    keywords: (post.tags || []).join(', '),
    author: {
      '@type': 'Person',
      name: 'Temitope F. Egbedeyi',
      url: `${SITE_URL}/`,
    },
    publisher: {
      '@type': 'Person',
      name: 'Temitope F. Egbedeyi',
      url: `${SITE_URL}/`,
    },
  }

  const html = prepareHtml(template, {
    title: `${post.title} | Temitope F. Egbedeyi`,
    description: post.excerpt,
    canonical,
    type: 'article',
    image,
    imageAlt: post.featuredImageAlt || post.title,
    articleJsonLd,
  })

  await writeFile(join(postDir, 'index.html'), html)
}

const today = new Date().toISOString().slice(0, 10)

const sitemapUrls = [
  { loc: `${SITE_URL}/`, lastmod: today },
  {
    loc: `${SITE_URL}/blog/`,
    lastmod: published[0]?.isoDate || today,
  },
  ...published.map((post) => ({
    loc: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`,
    lastmod: post.updatedDate || post.isoDate,
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    ({ loc, lastmod }) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`

await writeFile(join(DIST, 'sitemap.xml'), sitemap)

const rssItems = published
  .map((post) => {
    const link = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <pubDate>${new Date(
        `${post.isoDate}T12:00:00Z`
      ).toUTCString()}</pubDate>
      <category>${escapeXml(post.subject)}</category>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`
  })
  .join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Temitope F. Egbedeyi — Ideas, Scholarship &amp; Public Engagement</title>
    <link>${SITE_URL}/blog/</link>
    <description>Writing on education, research, politics, society, world affairs, professional life, and public scholarship.</description>
    <language>en-us</language>
${rssItems}
  </channel>
</rss>
`

await writeFile(join(DIST, 'rss.xml'), rss)

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

await writeFile(join(DIST, 'robots.txt'), robots)

console.log(
  `Generated ${published.length} clean blog page(s), sitemap.xml, rss.xml, and robots.txt from Markdown.`
)
