import React, { useMemo, useState } from 'react'
import {
  blogCategories,
  mediaCoverage,
  publicEngagement,
  mediaGallery,
} from '../data/blogMediaData.js'
import { getPublishedBlogPosts } from '../data/blogPosts.js'
import '../styles/blog-media-page.css'
import '../styles/blog-media-navigation-fix.css'
import '../styles/blog-media-polish.css'

function BlogCard({ post }) {
  return (
    <article className="bm-blog-card">
      <div className="bm-blog-card__meta">
        <span>{post.category}</span>
        <span>{post.date}</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <a href={`#blog/${post.slug}`}>Read essay →</a>
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
  return (
    image.group ||
    image.category ||
    image.context ||
    'Academic & Professional Engagement'
  )
}

export default function Media() {
  const [activeYear, setActiveYear] = useState('All')
  const publishedPosts = getPublishedBlogPosts()

  const years = useMemo(
    () => [
      'All',
      ...Array.from(new Set(mediaCoverage.map((item) => item.year))).sort(
        (a, b) => b - a
      ),
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

  const galleryGroups = useMemo(() => {
    return mediaGallery.reduce((groups, image) => {
      const group = getGalleryGroup(image)

      if (!groups[group]) {
        groups[group] = []
      }

      groups[group].push(image)
      return groups
    }, {})
  }, [])

  const scrollToBlog = () => {
    document.getElementById('blog-posts')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="bm-page">
      <section className="bm-hero bm-hero--refined">
        <div className="bm-shell bm-hero__grid">
          <div className="bm-hero__title-wrap">
            <p className="bm-kicker">IDEAS · SCHOLARSHIP · PUBLIC ENGAGEMENT</p>
            <h1>Ideas, scholarship & public engagement</h1>
          </div>

          <div className="bm-hero__copy">
            <p>
              A space for reflections on mathematics education, childhood, teaching and
              learning, research practice, and the public conversations surrounding my work.
            </p>

            <button
              type="button"
              className="bm-inline-nav"
              onClick={scrollToBlog}
            >
              Explore the blog ↓
            </button>
          </div>
        </div>
      </section>

      <section className="bm-blog" id="blog-posts">
        <div className="bm-shell">
          <div className="bm-section-heading">
            <div>
              <p className="bm-kicker">FROM THE BLOG</p>
              <h2>Writing from the research journey</h2>
            </div>
            <p>
              Essays and reflections bring together research, classroom questions,
              educational ideas, methods, and perspectives across African and international contexts.
            </p>
          </div>

          {publishedPosts.length > 0 ? (
            <div className="bm-blog-grid">
              {publishedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="bm-blog-empty">
              <div>
                <p className="bm-kicker">COMING SOON</p>
                <h3>New writing will begin here</h3>
                <p>
                  The blog engine is ready. Posts marked as published in the blog data file
                  will appear here automatically.
                </p>
              </div>

              <div className="bm-topic-list">
                {blogCategories.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bm-media">
        <div className="bm-shell">
          <div className="bm-section-heading">
            <div>
              <p className="bm-kicker">IN THE MEDIA</p>
              <h2>Research in the public conversation</h2>
            </div>
            <p>
              External news coverage and reporting on research, educational initiatives,
              scholarly activity, and public engagement.
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
              <h2>Taking scholarship into wider educational spaces</h2>
            </div>
            <p>
              Academic work also travels through professional conversation, research
              capacity building, conference engagement, and educational collaboration.
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
              Selected photographs from academic, professional, research, and community-facing
              activities, presented as visual documentation of the scholarly journey.
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
            <h2>Follow the ideas behind the research</h2>
            <p>
              Read new reflections, explore the scholarship, or connect around research,
              speaking, educational engagement, and collaboration.
            </p>
          </div>

          <nav className="bm-closing__links" aria-label="Blog and media related pages">
            <a href="#research">Research <span>→</span></a>
            <a href="#publications">Publications <span>→</span></a>
            <a href="#impact">Research impact <span>→</span></a>
            <a href="#contact">Contact <span>→</span></a>
          </nav>
        </div>
      </section>
    </div>
  )
}
