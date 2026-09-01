import React from 'react'
import { getBlogPostBySlug } from '../data/blogPosts.js'
import '../styles/blog-post-page.css'

function ArticleBlock({ block }) {
  if (block.type === 'heading') {
    return <h2>{block.text}</h2>
  }

  if (block.type === 'quote') {
    return <blockquote>{block.text}</blockquote>
  }

  if (block.type === 'list') {
    return (
      <ul>
        {(block.items || []).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  return <p>{block.text}</p>
}

export default function BlogPost({ slug }) {
  const post = getBlogPostBySlug(slug)

  if (!post || post.status !== 'published') {
    return (
      <div className="blog-post-page">
        <section className="blog-post-missing">
          <div className="blog-post-shell">
            <p className="blog-post-kicker">BLOG</p>
            <h1>This post is not published yet.</h1>
            <p>
              The article may still be in draft or the address may have changed.
            </p>
            <a href="#blog">← Back to Blog & Media</a>
          </div>
        </section>
      </div>
    )
  }

  return (
    <article className="blog-post-page">
      <header className="blog-post-hero">
        <div className="blog-post-shell">
          <div className="blog-post-meta">
            <span>{post.category}</span>
            <time dateTime={post.isoDate || undefined}>{post.date}</time>
            <span>{post.readingTime}</span>
          </div>

          <h1>{post.title}</h1>
          <p className="blog-post-deck">{post.excerpt}</p>

          {post.featuredImage && (
            <figure className="blog-post-featured">
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                decoding="async"
              />
            </figure>
          )}
        </div>
      </header>

      <section className="blog-post-content">
        <div className="blog-post-shell blog-post-content__grid">
          <aside className="blog-post-aside">
            <p className="blog-post-kicker">ARTICLE</p>
            <div className="blog-post-tags">
              {(post.tags || []).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </aside>

          <div className="blog-post-body">
            {post.content.map((block, index) => (
              <ArticleBlock
                key={`${block.type}-${index}`}
                block={block}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="blog-post-related">
        <div className="blog-post-shell blog-post-related__grid">
          <div>
            <p className="blog-post-kicker">CONTINUE EXPLORING</p>
            <h2>Follow the scholarship behind the reflection</h2>
          </div>

          <nav aria-label="Related blog resources">
            <a href={post.relatedResearchHref || '#research'}>
              Research <span>→</span>
            </a>
            <a href={post.relatedPublicationHref || '#publications'}>
              Publications <span>→</span>
            </a>
            <a href="#blog">
              Back to Blog & Media <span>→</span>
            </a>
          </nav>
        </div>
      </section>
    </article>
  )
}
