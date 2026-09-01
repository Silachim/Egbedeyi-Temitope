import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseMarkdownPost } from '../src/data/markdownBlog.js'
import { createDisseminationPack } from '../src/data/disseminationEngine.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')
const BLOG_DIR = join(ROOT, 'content', 'blog')
const OUTPUT_DIR = join(ROOT, 'dist', 'dissemination')

const requestedSlug = process.argv[2] || ''

const files = (await readdir(BLOG_DIR))
  .filter((name) => name.endsWith('.md'))
  .filter((name) => name !== '_POST_TEMPLATE.md')

const posts = []

for (const name of files) {
  const raw = await readFile(join(BLOG_DIR, name), 'utf8')
  const post = parseMarkdownPost(raw, name)

  if (post.status === 'published') {
    posts.push(post)
  }
}

const selected = requestedSlug
  ? posts.filter((post) => post.slug === requestedSlug)
  : posts

if (requestedSlug && selected.length === 0) {
  throw new Error(
    `No published article found with slug "${requestedSlug}".`
  )
}

await mkdir(OUTPUT_DIR, { recursive: true })

const index = []

for (const post of selected) {
  const pack = createDisseminationPack(post)

  await writeFile(
    join(OUTPUT_DIR, `${post.slug}.json`),
    JSON.stringify(pack, null, 2),
    'utf8'
  )

  const markdown = `# Dissemination Pack

## Article

**Title:** ${pack.title}

**Subject:** ${pack.subject}

**Format:** ${pack.format}

**Canonical URL:** ${pack.canonicalUrl}

**Keywords:** ${pack.keywords.join(', ')}

**Hashtags:** ${pack.hashtags.join(' ')}

## LinkedIn

${pack.channels.linkedin}

## X

${pack.channels.x}

## Facebook

${pack.channels.facebook}

## WhatsApp

${pack.channels.whatsapp}

## Email

**Subject:** ${pack.channels.email.subject}

${pack.channels.email.body}

## Media Pitch

**Subject:** ${pack.channels.mediaPitch.subject}

${pack.channels.mediaPitch.body}

## Second Share

${pack.channels.secondShare}
`

  await writeFile(
    join(OUTPUT_DIR, `${post.slug}.md`),
    markdown,
    'utf8'
  )

  index.push({
    slug: pack.slug,
    title: pack.title,
    canonicalUrl: pack.canonicalUrl,
    json: `/dissemination/${post.slug}.json`,
    markdown: `/dissemination/${post.slug}.md`,
  })
}

if (!requestedSlug) {
  await writeFile(
    join(OUTPUT_DIR, 'index.json'),
    JSON.stringify(index, null, 2),
    'utf8'
  )
}

console.log(
  `Generated dissemination pack${selected.length === 1 ? '' : 's'} for ${selected.length} published article${selected.length === 1 ? '' : 's'}.`
)
