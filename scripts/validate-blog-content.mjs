import { readdir, readFile, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseMarkdownPost } from '../src/data/markdownBlog.js'
import {
  supportedReferenceStyles,
  validateStructuredReference,
} from '../src/data/referenceEngine.js'
import { editorialSubjects, writingFormats } from '../src/data/editorialTaxonomy.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')
const BLOG_DIR = join(ROOT, 'content', 'blog')
const REFERENCE_DIR = join(ROOT, 'content', 'references')
const PUBLIC_DIR = join(ROOT, 'public')

const files = (await readdir(BLOG_DIR))
  .filter((name) => name.endsWith('.md'))
  .filter((name) => name !== '_POST_TEMPLATE.md')

const slugs = new Map()
let failed = false

function fail(message) {
  console.error(`✗ ${message}`)
  failed = true
}

async function readStructuredReferences(filename) {
  if (!filename) return null

  try {
    const raw = await readFile(join(REFERENCE_DIR, filename), 'utf8')
    const data = JSON.parse(raw)
    return data
  } catch (error) {
    fail(`Could not read referenceSource "${filename}": ${error.message}`)
    return null
  }
}

for (const name of files) {
  try {
    const raw = await readFile(join(BLOG_DIR, name), 'utf8')
    const post = parseMarkdownPost(raw, name)

    if (slugs.has(post.slug)) {
      fail(`Duplicate slug "${post.slug}" in ${slugs.get(post.slug)} and ${name}`)
    } else {
      slugs.set(post.slug, name)
    }

    if (!editorialSubjects.includes(post.subject)) {
      fail(`${name}: unsupported subject "${post.subject}"`)
    }

    if (!writingFormats.includes(post.format)) {
      fail(`${name}: unsupported format "${post.format}"`)
    }

    if (
      post.referenceStyle &&
      !supportedReferenceStyles
        .map((style) => style.toLowerCase())
        .includes(String(post.referenceStyle).toLowerCase())
    ) {
      fail(`${name}: unsupported referenceStyle "${post.referenceStyle}"`)
    }

    if (post.status === 'published') {
      if (!post.rawBody || post.rawBody.length < 80) {
        fail(`${name}: published post body is unexpectedly short`)
      }

      if (!post.excerpt || post.excerpt.length < 40) {
        fail(`${name}: published post excerpt is too short`)
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(post.isoDate || '')) {
        fail(`${name}: publication date must use YYYY-MM-DD`)
      }
    }

    if (post.featuredImage) {
      const localPath = String(post.featuredImage).replace(/^\//, '')

      if (!/^https?:\/\//i.test(post.featuredImage)) {
        try {
          await access(join(PUBLIC_DIR, localPath), constants.F_OK)
        } catch {
          fail(`${name}: featuredImage does not exist: ${post.featuredImage}`)
        }
      }
    }

    if (post.referenceSource) {
      const references = await readStructuredReferences(post.referenceSource)

      if (!Array.isArray(references)) {
        fail(`${name}: structured reference file must contain a JSON array`)
      } else {
        references.forEach((reference, index) => {
          for (const error of validateStructuredReference(reference, index)) {
            fail(`${name}: ${error}`)
          }
        })
      }
    }
  } catch (error) {
    fail(error.message)
  }
}

if (failed) {
  process.exitCode = 1
} else {
  console.log(`✓ Blog validation passed for ${files.length} Markdown post(s).`)
}
