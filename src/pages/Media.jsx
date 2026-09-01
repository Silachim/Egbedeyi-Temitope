import React, { useMemo, useState } from 'react'
import { mediaCoverage, publicEngagement, mediaGallery } from '../data/blogMediaData.js'
import {
  getBlogFormats,
  getBlogHref,
  getBlogSubjects,
  getFeaturedBlogPost,
  getPublishedPostsSorted,
} from '../data/blogArchitecture.js'
import '../styles/blog-media-page.css'
import '../styles/blog-media-navigation-fix.css'
import '../styles/blog-media-polish.css'
import '../styles/blog-publishing-architecture.css'
import '../styles/blog-editorial-system.css'

function BlogCard({ post }) {
  return (
    <article className="bm-blog-card bm-blog-card--archive">
      <div className="bm-blog-card__meta">
        <span>{post.subject}</span>
        <span>{post.format}</span>
        <time dateTime={post.isoDate || undefined}>{post.date}</time>
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="bm-blog-card__footer">
        <span>{post.readingTime}</span>
        <a href={getBlogHref(post)}>Read article →</a>
      </div>
    </article>
  )
}

function FeaturedBlogPost({ post }) {
  if (!post) return null

  return (
    <article className="bm-featured-post">
      <div className="bm-featured-post__copy">
        <div className="bm-blog-card__meta">
          <span>{post.subject}</span>
          <span>{post.format}</span>
          <time dateTime={post.isoDate || undefined}>{post.date}</time>
          <span>{post.readingTime}</span>
        </div>
        <p className="bm-kicker">FEATURED ARTICLE</p>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <a className="bm-featured-post__link" href={getBlogHref(post)}>
          Read the full article →
        </a>
      </div>

      <div className="bm-featured-post__topics" aria-label="Article topics">
        {(post.tags || []).slice(0, 6).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  )
}

function MediaCard({ item }) {
  return (
    <article className="bm-media-card">
      <div className="bm-media-card__meta">
        <span>{item.outlet}</span>
        <time dateTime={item.isoDate}>{item.date}</time>
      </div>
      <p className="bm-media-card__theme">{item.theme}</p>
      <h3>{item.title}</h3>
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        Read article ↗
      </a>
    </article>
  )
}

function getGalleryGroup(image) {
  return image.group || image.category || image.context || 'Academic & Professional Engagement'
}

export default function Media() {
  const [activeYear, setActiveYear] = useState('All')
  const [activeSubject, setActiveSubject] = useState('All')
  const [activeFormat, setActiveFormat] = useState('All')

  const publishedPosts = getPublishedPostsSorted()
  const featuredPost = getFeaturedBlogPost()
  const subjects = getBlogSubjects()
  const formats = getBlogFormats()

  const archivePosts = useMemo(() => {
    return publishedPosts
      .filter((post) => post.slug !== featuredPost?.slug)
      .filter((post) => activeSubject === 'All' || post.subject === activeSubject)
      .filter((post) => activeFormat === 'All' || post.format === activeFormat)
  }, [publishedPosts, featuredPost, activeSubject, activeFormat])

  const years = useMemo(
    () => [
      'All',
      ...Array.from(new Set(mediaCoverage.map((item) => item.year))).sort((a, b) => b - a),
    ],
    []
  )

  const visibleMedia = useMemo(
    () =>
      activeYear === 'All'
        ? [...mediaCoverage].sort((a, b) => b.year - a.year)
        : mediaCoverage.filter((item) => item.year === activeYear),
    [activeYear]
  )

  const galleryGroups = useMemo(
    () =>
      mediaGallery.reduce((groups, image) => {
        const group = getGalleryGroup(image)
        if (!groups[group]) groups[group] = []
        groups[group].push(image)
        return groups
      }, {}),
    []
  )

  return (
    <div className="bm-page">
      <section className="bm-hero bm-hero--refined">
        <div className="bm-shell bm-hero__grid">
          <div className="bm-hero__title-wrap">
            <p className="bm-kicker">IDEAS · SCHOLARSHIP · PUBLIC LIFE</p>
            <h1>Ideas, scholarship & public engagement</h1>
          </div>
          <div className="bm-hero__copy">
            <p>
              Writing on education, research, politics, society, world affairs,
              professional life, and the questions shaping our shared world.
            </p>
          </div>
        </div>
      </section>

      <section className="bm-blog bm-blog--publishing" id="blog-posts">
        <div className="bm-shell">
          <div className="bm-section-heading">
            <div>
              <p className="bm-kicker">FROM THE BLOG</p>
              <h2>Writing that begins with a question worth exploring</h2>
            </div>
            <p>
              Subject, format, and topic tags work independently so the archive can
              grow globally without being limited by geography or a single professional field.
            </p>
          </div>

          {publishedPosts.length > 0 ? (
            <>
              <FeaturedBlogPost post={featuredPost} />

              {publishedPosts.length > 1 && (
                <div className="bm-blog-archive">
                  <div className="bm-blog-archive__heading bm-blog-archive__heading--stacked">
                    <div>
                      <p className="bm-kicker">ARTICLE ARCHIVE</p>
                      <h3>Browse recent writing</h3>
                    </div>

                    <div className="bm-editorial-filters">
                      <div>
                        <span>Subject</span>
                        <div className="bm-blog-category-filter">
                          {['All', ...subjects].map((subject) => (
                            <button
                              key={subject}
                              type="button"
                              className={activeSubject === subject ? 'is-active' : ''}
                              aria-pressed={activeSubject === subject}
                              onClick={() => setActiveSubject(subject)}
                            >
                              {subject}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span>Format</span>
                        <div className="bm-blog-category-filter">
                          {['All', ...formats].map((format) => (
                            <button
                              key={format}
                              type="button"
                              className={activeFormat === format ? 'is-active' : ''}
                              aria-pressed={activeFormat === format}
                              onClick={() => setActiveFormat(format)}
                            >
                              {format}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {archivePosts.length > 0 ? (
                    <div className="bm-blog-grid">
                      {archivePosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                      ))}
                    </div>
                  ) : (
                    <p className="bm-blog-filter-empty">
                      No published articles match this subject and format combination yet.
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="bm-blog-empty">
              <p className="bm-kicker">COMING SOON</p>
              <h3>New writing will begin here</h3>
            </div>
          )}
        </div>
      </section>

      <section className="bm-media">
        <div className="bm-shell">
          <div className="bm-section-heading">
            <div>
              <p className="bm-kicker">IN THE MEDIA</p>
              <h2>Research and ideas in the public conversation</h2>
            </div>
            <p>
              External coverage of research, educational initiatives, scholarly work,
              and public-facing professional engagement.
            </p>
          </div>

          <div className="bm-year-filter" aria-label="Filter media coverage by year">
            {years.map((year) => (
              <button
                key={year}
                type="button"
                className={activeYear === year ? 'is-active' : ''}
                aria-pressed={activeYear === year}
                onClick={() => setActiveYear(year)}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="bm-media-grid">
            {visibleMedia.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bm-engagement">
        <div className="bm-shell">
          <div className="bm-section-heading">
            <div>
              <p className="bm-kicker">PUBLIC SCHOLARSHIP & ENGAGEMENT</p>
              <h2>Taking scholarship into wider spaces</h2>
            </div>
            <p>
              Ideas also travel through professional conversation, public commentary,
              research capacity building, conference engagement, and collaboration.
            </p>
          </div>

          <div className="bm-engagement-grid">
            {publicEngagement.map((item) => (
              <article key={item.number}>
                <span className="bm-number">{item.number}</span>
                <p className="bm-kicker">{item.tag}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bm-gallery">
        <div className="bm-shell">
          <div className="bm-section-heading">
            <div>
              <p className="bm-kicker">FIELD NOTES & MOMENTS</p>
              <h2>Scholarship in practice</h2>
            </div>
            <p>
              Selected photographs from academic, professional, research, and community-facing activities.
            </p>
          </div>

          <div className="bm-gallery-groups">
            {Object.entries(galleryGroups).map(([group, images]) => (
              <section className="bm-gallery-group" key={group}>
                <div className="bm-gallery-group__heading">
                  <p className="bm-kicker">GALLERY</p>
                  <h3>{group}</h3>
                  <span>{images.length} {images.length === 1 ? 'image' : 'images'}</span>
                </div>

                <div className="bm-gallery-grid">
                  {images.map((image, index) => (
                    <figure
                      key={image.id || `${group}-${index}`}
                      className={`bm-gallery-item bm-gallery-item--${(index % 4) + 1}`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt || image.caption || 'Academic and professional activity'}
                        loading="lazy"
                        decoding="async"
                      />
                      {image.caption && <figcaption>{image.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bm-closing">
        <div className="bm-shell bm-closing__grid">
          <div>
            <p className="bm-kicker">STAY IN THE CONVERSATION</p>
            <h2>Follow the ideas behind the work</h2>
            <p>
              Read new writing, explore the scholarship, or connect around research,
              commentary, speaking, educational engagement, and collaboration.
            </p>
          </div>

          <nav className="bm-closing__links" aria-label="Blog and media related pages">
            <a href="/#research">Research <span>→</span></a>
            <a href="/#publications">Publications <span>→</span></a>
            <a href="/#impact">Research impact <span>→</span></a>
            <a href="/#contact">Contact <span>→</span></a>
          </nav>
        </div>
      </section>
    </div>
  )
}
