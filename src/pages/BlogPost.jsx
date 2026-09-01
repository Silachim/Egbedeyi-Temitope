import React from 'react'
import { getBlogPostBySlug } from '../data/blogContent.js'
import {
  blogConfig,
  enrichPost,
  getAdjacentBlogPosts,
  getBlogHref,
  getBlogPostWordCount,
  getRelatedBlogPosts,
} from '../data/blogArchitecture.js'
import {
  formatReferenceList,
  normalizeReferenceStyle,
} from '../data/referenceEngine.js'
import '../styles/blog-post-page.css'
import '../styles/blog-publishing-architecture.css'
import '../styles/blog-editorial-system.css'
import '../styles/blog-reference-styles.css'
import '../styles/blog-draft-preview.css'
import ArticleShare from '../components/ArticleShare.jsx'
import '../styles/article-share.css'
function tokenizeInlineMarkdown(text) {
  const source = String(text || '')
  const tokens = []
  let buffer = ''

  const pushText = () => {
    if (buffer) {
      tokens.push({ type: 'text', value: buffer })
      buffer = ''
    }
  }

  let i = 0

  while (i < source.length) {
    if (source.startsWith('***', i)) {
      const end = source.indexOf('***', i + 3)
      if (end !== -1) {
        pushText()
        tokens.push({ type: 'bold-italic', value: source.slice(i + 3, end) })
        i = end + 3
        continue
      }
    }

    if (source.startsWith('**', i)) {
      const end = source.indexOf('**', i + 2)
      if (end !== -1) {
        pushText()
        tokens.push({ type: 'bold', value: source.slice(i + 2, end) })
        i = end + 2
        continue
      }
    }

    if (source[i] === '*') {
      const end = source.indexOf('*', i + 1)
      if (end !== -1) {
        pushText()
        tokens.push({ type: 'italic', value: source.slice(i + 1, end) })
        i = end + 1
        continue
      }
    }

    if (source[i] === '`') {
      const end = source.indexOf('`', i + 1)
      if (end !== -1) {
        pushText()
        tokens.push({ type: 'code', value: source.slice(i + 1, end) })
        i = end + 1
        continue
      }
    }

    if (source[i] === '[') {
      const labelEnd = source.indexOf(']', i + 1)
      const openParen =
        labelEnd !== -1 ? source.indexOf('(', labelEnd + 1) : -1
      const closeParen =
        openParen !== -1 ? source.indexOf(')', openParen + 1) : -1

      if (
        labelEnd !== -1 &&
        openParen === labelEnd + 1 &&
        closeParen !== -1
      ) {
        pushText()
        tokens.push({
          type: 'link',
          label: source.slice(i + 1, labelEnd),
          href: source.slice(openParen + 1, closeParen),
        })
        i = closeParen + 1
        continue
      }
    }

    buffer += source[i]
    i += 1
  }

  pushText()
  return tokens
}

function InlineMarkdown({ text }) {
  return tokenizeInlineMarkdown(text).map((token, index) => {
    const key = `${token.type}-${index}`

    if (token.type === 'bold-italic') {
      return <strong key={key}><em>{token.value}</em></strong>
    }
    if (token.type === 'bold') return <strong key={key}>{token.value}</strong>
    if (token.type === 'italic') return <em key={key}>{token.value}</em>
    if (token.type === 'code') return <code key={key}>{token.value}</code>

    if (token.type === 'link') {
      const external = /^https?:\/\//i.test(token.href)
      return (
        <a
          key={key}
          href={token.href}
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {token.label}
        </a>
      )
    }

    return <React.Fragment key={key}>{token.value}</React.Fragment>
  })
}

function ArticleBlock({ block, referenceStyle }) {
  if (block.type === 'heading') {
    if (block.level === 3) return <h3><InlineMarkdown text={block.text} /></h3>
    if (block.level === 4) return <h4><InlineMarkdown text={block.text} /></h4>
    return <h2><InlineMarkdown text={block.text} /></h2>
  }

  if (block.type === 'quote') {
    return <blockquote><InlineMarkdown text={block.text} /></blockquote>
  }

  if (block.type === 'reference') {
    return (
      <p
        className={`blog-reference-entry blog-reference-entry--${referenceStyle}`}
      >
        <InlineMarkdown text={block.text} />
      </p>
    )
  }

  if (block.type === 'list') {
    return (
      <ul>
        {(block.items || []).map((item, index) => (
          <li key={`${item}-${index}`}><InlineMarkdown text={item} /></li>
        ))}
      </ul>
    )
  }

  if (block.type === 'ordered-list') {
    return (
      <ol>
        {(block.items || []).map((item, index) => (
          <li key={`${item}-${index}`}><InlineMarkdown text={item} /></li>
        ))}
      </ol>
    )
  }

  return <p><InlineMarkdown text={block.text} /></p>
}

function RelatedPostCard({ post }) {
  return (
    <article className="blog-related-card">
      <p className="blog-post-kicker">{post.subject} · {post.format}</p>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <a href={getBlogHref(post)}>Read article →</a>
    </article>
  )
}

export default function BlogPost({ slug, previewDraft = false }) {
  const rawPost = getBlogPostBySlug(slug)
  const draftPreviewAllowed = import.meta.env.DEV && previewDraft

  if (
    !rawPost ||
    (rawPost.status !== 'published' &&
      !(draftPreviewAllowed && rawPost.status === 'draft'))
  ) {
    return (
      <div className="blog-post-page">
        <section className="blog-post-missing">
          <div className="blog-post-shell">
            <p className="blog-post-kicker">BLOG</p>
            <h1>This post is not published yet.</h1>
            <p>
              The article may still be in draft or the address may have changed.
            </p>
            <a href="/blog/">← Back to Blog & Media</a>
          </div>
        </section>
      </div>
    )
  }

  const post = enrichPost(rawPost)
  const relatedPosts = getRelatedBlogPosts(post, 3)
  const { newer, older } = getAdjacentBlogPosts(post)
  const wordCount = getBlogPostWordCount(post)
  const referenceStyle = normalizeReferenceStyle(post.referenceStyle)
const canonicalArticleUrl =
  `${blogConfig.siteUrl}/blog/${encodeURIComponent(post.slug)}/`	
  const structuredReferences = Array.isArray(post.structuredReferences)
    ? post.structuredReferences
    : []

  const formattedReferences = formatReferenceList(
    structuredReferences,
    post.referenceStyle || 'Standard'
  )

  const bodyBlocks =
    formattedReferences.length > 0
      ? post.content.filter(
          (block) =>
            block.type !== 'reference' &&
            !(
              block.type === 'heading' &&
              /^references?$/i.test(block.text)
            )
        )
      : post.content

  return (
    <article className="blog-post-page">
      {draftPreviewAllowed && rawPost.status === 'draft' && (
        <div className="blog-draft-preview-banner" role="status">
          Local draft preview · This article will not appear in production while
          its status is draft.
        </div>
      )}

      <header className="blog-post-hero">
        <div className="blog-post-shell">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <a href="/blog/">Blog</a>
            <span aria-hidden="true">/</span>
            <span>{post.subject}</span>
          </nav>

          <div className="blog-post-meta">
            <span>{post.subject}</span>
            <span>{post.format}</span>
            <time dateTime={post.isoDate || undefined}>{post.date}</time>
            <span>{post.readingTime}</span>
          </div>

          <h1>{post.title}</h1>
          <p className="blog-post-deck">{post.excerpt}</p>

          <div className="blog-post-byline">
            <div>
              <span>Published by</span>
              <strong>{post.author || blogConfig.author}</strong>
            </div>

            {wordCount > 0 && (
              <div>
                <span>Article length</span>
                <strong>{wordCount.toLocaleString()} words</strong>
              </div>
            )}
          </div>

          {post.authorshipNote && (
            <p className="blog-post-authorship-note">{post.authorshipNote}</p>
          )}
        </div>
      </header>

      <section className="blog-post-content">
        <div className="blog-post-shell blog-post-content__grid">
          <aside className="blog-post-aside">
            <p className="blog-post-kicker">ARTICLE TOPICS</p>
            <div className="blog-post-tags">
              {(post.tags || []).map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </aside>

          <div className="blog-post-body">
            {bodyBlocks.map((block, index) => (
              <ArticleBlock
                key={`${block.type}-${index}`}
                block={block}
                referenceStyle={referenceStyle}
              />
            ))}

                        {formattedReferences.length > 0 && (
              <section className="blog-generated-references">
                <h2>References</h2>
                <p className="blog-reference-style-note">
                  Reference style: {post.referenceStyle || 'Standard'}
                </p>

                {formattedReferences.map((reference, index) => (
                  <p
                    key={reference.id || `${reference.title}-${index}`}
                    className={`blog-reference-entry blog-reference-entry--${referenceStyle}`}
                  >
                    <InlineMarkdown text={reference.formattedText} />
                  </p>
                ))}
              </section>
            )}

                        <ArticleShare
              title={post.title}
              excerpt={post.excerpt}
              url={canonicalArticleUrl}
            />
          </div>
        </div>
      </section>

      {(newer || older) && rawPost.status === 'published' && (
        <nav className="blog-post-pagination" aria-label="Article navigation">
          <div className="blog-post-shell blog-post-pagination__grid">
            <div>
              {older && (
                <>
                  <span>OLDER ARTICLE</span>
                  <a href={getBlogHref(older)}>{older.title}</a>
                </>
              )}
            </div>
            <div>
              {newer && (
                <>
                  <span>NEWER ARTICLE</span>
                  <a href={getBlogHref(newer)}>{newer.title}</a>
                </>
              )}
            </div>
          </div>
        </nav>
      )}

      {relatedPosts.length > 0 && rawPost.status === 'published' && (
        <section className="blog-related-posts">
          <div className="blog-post-shell">
            <div className="blog-related-posts__heading">
              <p className="blog-post-kicker">KEEP READING</p>
              <h2>Related writing</h2>
            </div>
            <div className="blog-related-posts__grid">
              {relatedPosts.map((relatedPost) => (
                <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
