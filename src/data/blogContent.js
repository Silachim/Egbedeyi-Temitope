import { parseMarkdownPost } from './markdownBlog.js'

const markdownFiles = import.meta.glob('../../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const referenceFiles = import.meta.glob('../../content/references/*.json', {
  import: 'default',
  eager: true,
})

function filenameFromPath(path) {
  return path.split('/').pop()
}

const referencesByFilename = Object.fromEntries(
  Object.entries(referenceFiles).map(([path, value]) => [
    filenameFromPath(path),
    value,
  ])
)

function loadPosts() {
  return Object.entries(markdownFiles)
    .filter(([path]) => !path.endsWith('/_POST_TEMPLATE.md'))
    .map(([path, raw]) => {
      const post = parseMarkdownPost(raw, path)
      const referenceSource = post.referenceSource
      const structuredReferences = referenceSource
        ? referencesByFilename[referenceSource] || []
        : []

      return {
        ...post,
        structuredReferences,
      }
    })
}

export const blogPosts = loadPosts()

export function getPublishedBlogPosts() {
  return blogPosts
    .filter((post) => post.status === 'published')
    .sort((a, b) => (b.isoDate || '').localeCompare(a.isoDate || ''))
}

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug)
}
