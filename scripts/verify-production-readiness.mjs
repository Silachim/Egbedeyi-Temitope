import { readFile, readdir, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseMarkdownPost } from '../src/data/markdownBlog.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')
const BLOG_DIR = join(ROOT, 'content', 'blog')
const DIST = join(ROOT, 'dist')
const SITE_URL = 'https://egbedeyitemitope.com'

const ABSOLUTE_OG_IMAGE_PATTERN = new RegExp(
  '<meta\\s+property="og:image"\\s+content="https?://[^"]+"',
  'i'
)

let failed = false
let warnings = 0

const pass = (message) => console.log(`✓ ${message}`)
const warn = (message) => {
  console.warn(`! ${message}`)
  warnings += 1
}
const fail = (message) => {
  console.error(`✗ ${message}`)
  failed = true
}

async function exists(path) {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

async function loadPosts() {
  const names = (await readdir(BLOG_DIR))
    .filter((name) => name.endsWith('.md'))
    .filter((name) => name !== '_POST_TEMPLATE.md')

  const posts = []

  for (const name of names) {
    const raw = await readFile(join(BLOG_DIR, name), 'utf8')
    posts.push(parseMarkdownPost(raw, name))
  }

  return posts
}

async function verifyBaseFiles() {
  for (const name of ['index.html', 'sitemap.xml', 'rss.xml', 'robots.txt']) {
    if (await exists(join(DIST, name))) {
      pass(`dist/${name} exists`)
    } else {
      fail(`dist/${name} missing`)
    }
  }

  if (await exists(join(DIST, 'blog', 'index.html'))) {
    pass('dist/blog/index.html exists')
  } else {
    fail('dist/blog/index.html missing')
  }
}

async function verifyPublished(post) {
  const path = join(DIST, 'blog', post.slug, 'index.html')
  const canonical = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`

  if (!(await exists(path))) {
    fail(`${post.slug}: clean page missing`)
    return
  }

  pass(`${post.slug}: clean page exists`)

  const html = await readFile(path, 'utf8')

  if (
    html.includes(
      `<title>${escapeHtml(post.title)} | Temitope F. Egbedeyi</title>`
    )
  ) {
    pass(`${post.slug}: title metadata`)
  } else {
    warn(`${post.slug}: title metadata differs`)
  }

  if (html.includes(`<link rel="canonical" href="${canonical}"`)) {
    pass(`${post.slug}: canonical URL`)
  } else {
    fail(`${post.slug}: canonical URL incorrect`)
  }

  if (html.includes('<meta property="og:type" content="article"')) {
    pass(`${post.slug}: og:type article`)
  } else {
    fail(`${post.slug}: og:type missing`)
  }

  if (html.includes(`<meta property="og:url" content="${canonical}"`)) {
    pass(`${post.slug}: og:url`)
  } else {
    fail(`${post.slug}: og:url incorrect`)
  }

  if (ABSOLUTE_OG_IMAGE_PATTERN.test(html)) {
    pass(`${post.slug}: absolute og:image`)
  } else {
    warn(`${post.slug}: og:image missing or non-absolute`)
  }

  if (
    html.includes('"@type":"BlogPosting"') ||
    html.includes('"@type": "BlogPosting"')
  ) {
    pass(`${post.slug}: BlogPosting JSON-LD`)
  } else {
    fail(`${post.slug}: BlogPosting JSON-LD missing`)
  }
}

async function verifyDraft(post) {
  const path = join(DIST, 'blog', post.slug, 'index.html')

  if (await exists(path)) {
    fail(`${post.slug}: draft emitted into production`)
  } else {
    pass(`${post.slug}: draft excluded from production`)
  }
}

async function verifyDiscovery(published, drafts) {
  const sitemapPath = join(DIST, 'sitemap.xml')
  const rssPath = join(DIST, 'rss.xml')
  const robotsPath = join(DIST, 'robots.txt')

  if (
    !(await exists(sitemapPath)) ||
    !(await exists(rssPath)) ||
    !(await exists(robotsPath))
  ) {
    return
  }

  const sitemap = await readFile(sitemapPath, 'utf8')
  const rss = await readFile(rssPath, 'utf8')

  for (const post of published) {
    const url = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`

    if (sitemap.includes(url)) {
      pass(`${post.slug}: sitemap`)
    } else {
      fail(`${post.slug}: missing sitemap`)
    }

    if (rss.includes(url)) {
      pass(`${post.slug}: RSS`)
    } else {
      fail(`${post.slug}: missing RSS`)
    }
  }

  for (const post of drafts) {
    const url = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`

    if (sitemap.includes(url)) {
      fail(`${post.slug}: draft in sitemap`)
    } else {
      pass(`${post.slug}: draft excluded sitemap`)
    }

    if (rss.includes(url)) {
      fail(`${post.slug}: draft in RSS`)
    } else {
      pass(`${post.slug}: draft excluded RSS`)
    }
  }

  const robots = await readFile(robotsPath, 'utf8')

  if (robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
    pass('robots.txt sitemap URL')
  } else {
    fail('robots.txt sitemap URL incorrect')
  }
}

async function verifySharing() {
  const componentPath = join(
    ROOT,
    'src',
    'components',
    'ArticleShare.jsx'
  )
  const pagePath = join(ROOT, 'src', 'pages', 'BlogPost.jsx')

  if (!(await exists(componentPath))) {
    fail('ArticleShare.jsx missing')
    return
  }

  if (!(await exists(pagePath))) {
    fail('BlogPost.jsx missing')
    return
  }

  const component = await readFile(componentPath, 'utf8')
  const page = await readFile(pagePath, 'utf8')

  for (const label of [
    'LinkedIn',
    'X',
    'Facebook',
    'WhatsApp',
    'Email',
    'Copy link',
  ]) {
    if (component.includes(label)) {
      pass(`share control: ${label}`)
    } else {
      fail(`share control missing: ${label}`)
    }
  }

  if (page.includes('<ArticleShare')) {
    pass('ArticleShare rendered in BlogPost.jsx')
  } else {
    fail('ArticleShare not rendered in BlogPost.jsx')
  }

  if (page.includes('blogConfig.siteUrl')) {
    pass('share URL uses production site URL')
  } else {
    warn('review canonical share URL construction')
  }
}

async function main() {
  console.log('\nPHASE 4D.4 — PRODUCTION READINESS\n')

  if (!(await exists(DIST))) {
    fail('dist/ missing. Run npm run build first.')
    process.exitCode = 1
    return
  }

  const posts = await loadPosts()
  const published = posts.filter((post) => post.status === 'published')
  const drafts = posts.filter((post) => post.status === 'draft')

  console.log(`Published posts: ${published.length}`)
  console.log(`Draft posts: ${drafts.length}\n`)

  await verifyBaseFiles()

  for (const post of published) {
    await verifyPublished(post)
  }

  for (const post of drafts) {
    await verifyDraft(post)
  }

  await verifyDiscovery(published, drafts)
  await verifySharing()

  if (await exists(join(DIST, 'dissemination'))) {
    warn(
      'dist/dissemination exists from discontinued Phase 4D.3; remove before deploy.'
    )
  } else {
    pass('no discontinued dissemination output in dist')
  }

  console.log('\n----------------------------------------')

  if (failed) {
    console.error('PHASE 4D.4 RESULT: NOT READY')
    process.exitCode = 1
    return
  }

  console.log('PHASE 4D.4 RESULT: AUTOMATED CHECKS PASSED')

  if (warnings) {
    console.log(`${warnings} warning(s) remain for manual review.`)
  }

  console.log('Proceed to the browser checklist.')
}

await main()
