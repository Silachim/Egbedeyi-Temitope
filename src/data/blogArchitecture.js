import { blogPosts } from './blogContent.js'
import { normalizeFormat, normalizeSubject } from './editorialTaxonomy.js'

export const blogConfig = {
  title: 'Ideas, Scholarship & Public Engagement',
  author: 'Temitope F. Egbedeyi',
  authorRole: 'Researcher, Educator & Public Scholar',
  authorBio:
    'I write about education, research, public life, society, politics, ideas, and the questions that connect scholarship with the wider world.',
  siteUrl: 'https://egbedeyitemitope.com',
}

export function getBlogHref(postOrSlug) {
  const slug = typeof postOrSlug === 'string' ? postOrSlug : postOrSlug?.slug
  return slug ? `/blog/${slug}/` : '/blog/'
}

export function enrichPost(post) {
  return {
    ...post,
    subject: normalizeSubject(post),
    format: normalizeFormat(post),
  }
}

export function getPublishedPostsSorted() {
  return blogPosts
    .filter((post) => post.status === 'published')
    .map(enrichPost)
    .sort((a, b) => (b.isoDate || '').localeCompare(a.isoDate || ''))
}

export function getBlogSubjects() {
  return Array.from(
    new Set(getPublishedPostsSorted().map((post) => post.subject))
  ).sort()
}

export function getBlogFormats() {
  return Array.from(
    new Set(getPublishedPostsSorted().map((post) => post.format))
  ).sort()
}

export function getBlogTags() {
  return Array.from(
    new Set(getPublishedPostsSorted().flatMap((post) => post.tags || []))
  ).sort()
}

export function getFeaturedBlogPost() {
  const posts = getPublishedPostsSorted()
  return posts.find((post) => post.featured === true) || posts[0] || null
}

export function getRelatedBlogPosts(post, limit = 3) {
  if (!post) return []

  const enriched = enrichPost(post)
  const tags = new Set(enriched.tags || [])

  return getPublishedPostsSorted()
    .filter((candidate) => candidate.slug !== enriched.slug)
    .map((candidate) => ({
      post: candidate,
      score:
        (candidate.subject === enriched.subject ? 3 : 0) +
        (candidate.format === enriched.format ? 1 : 0) +
        (candidate.tags || []).filter((tag) => tags.has(tag)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        (b.post.isoDate || '').localeCompare(a.post.isoDate || '')
    )
    .slice(0, limit)
    .map(({ post }) => post)
}

export function getAdjacentBlogPosts(post) {
  const posts = getPublishedPostsSorted()
  const index = posts.findIndex((candidate) => candidate.slug === post?.slug)

  if (index === -1) return { newer: null, older: null }

  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  }
}

export function getBlogPostWordCount(post) {
  if (post?.rawBody) {
    return post.rawBody.trim().split(/\s+/).filter(Boolean).length
  }

  return 0
}
