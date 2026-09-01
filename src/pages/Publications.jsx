import React, { useMemo, useState } from 'react'
import {
  publications,
  publicationThemes,
  publicationTypes,
  scholarSearchUrl,
  getFeaturedByType,
} from '../data/publicationsData.js'
import '../styles/publications-page.css'
import '../styles/publications-outlet-groups.css'
import { profileLinks } from '../data/profileLinks.js'

const ExternalArrow = () => <span aria-hidden="true">↗</span>

function AuthorLine({ authors }) {
  return (
    <p className="pub-record__authors">
      {authors.map((author, index) => (
        <React.Fragment key={`${author.name}-${index}`}>
          {index > 0 && <span aria-hidden="true">, </span>}
          {author.self ? <strong>{author.name}</strong> : <span>{author.name}</span>}
        </React.Fragment>
      ))}
    </p>
  )
}

function PublicationMeta({ publication }) {
  return (
    <div className="pub-citation-meta">
      <em>{publication.venue}</em>
      {publication.volumeIssuePages && <span>{publication.volumeIssuePages}</span>}
      {publication.publisher && <span>{publication.publisher}</span>}
      {publication.doi && <span>DOI: {publication.doi}</span>}
    </div>
  )
}

function FeaturedCard({ publication, index }) {
  return (
    <article className="pub-featured__card">
      <div className="pub-featured__top">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{publication.year}</span>
      </div>

      <div>
        <h4>{publication.title}</h4>
        <AuthorLine authors={publication.authors} />
        <PublicationMeta publication={publication} />
      </div>

      <a
        href={publication.articleUrl || scholarSearchUrl(publication.title)}
        target="_blank"
        rel="noopener noreferrer"
        className="pub-text-link"
      >
        {publication.articleUrl ? 'View publication' : 'Find on Scholar'} <ExternalArrow />
      </a>
    </article>
  )
}

function PublicationRecord({ publication, index }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="pub-record">
      <div className="pub-record__index">{String(index + 1).padStart(2, '0')}</div>

      <div className="pub-record__body">
        <div className="pub-record__meta">
          <span>{publication.year}</span>
        </div>

        <h3>{publication.title}</h3>
        <AuthorLine authors={publication.authors} />
        <PublicationMeta publication={publication} />

        <div className="pub-record__themes">
          {publication.themes.map((theme) => (
            <span key={theme}>{theme}</span>
          ))}
        </div>

        {open && (
          <div className="pub-record__abstract" id={`${publication.id}-abstract`}>
            <p className="pub-label">Abstract / Summary</p>
            <p>{publication.abstract}</p>
          </div>
        )}

        <div className="pub-record__actions">
          <button
            type="button"
            className="pub-link-button"
            aria-expanded={open}
            aria-controls={`${publication.id}-abstract`}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Hide abstract' : 'Read abstract'}
          </button>

          <a
            href={publication.articleUrl || scholarSearchUrl(publication.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="pub-text-link"
          >
            {publication.articleUrl ? 'View publication' : 'Find on Scholar'} <ExternalArrow />
          </a>
        </div>
      </div>
    </article>
  )
}

function PublicationGroup({ title, items }) {
  if (!items.length) return null

  return (
    <section className="pub-outlet-group">
      <header className="pub-outlet-group__header">
        <h3>{title}</h3>
        <p>{items.length} {items.length === 1 ? 'publication' : 'publications'}</p>
      </header>

      <div className="pub-record-list">
        {items.map((publication, index) => (
          <PublicationRecord
            key={publication.id}
            publication={publication}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

export default function Publications() {
  const [type, setType] = useState('All')
  const [theme, setTheme] = useState('All themes')
  const [query, setQuery] = useState('')

  const featuredJournals = getFeaturedByType('Journal Articles', 3)
  const featuredProceedings = getFeaturedByType('Conference Proceedings', 3)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return publications
      .filter((item) => type === 'All' || item.type === type)
      .filter((item) => theme === 'All themes' || item.themes.includes(theme))
      .filter((item) => {
        if (!q) return true
        return [
          item.title,
          item.venue,
          item.volumeIssuePages,
          item.publisher,
          ...(item.themes || []),
          ...item.authors.map((author) => author.name),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(q)
      })
      .sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year
        return a.title.localeCompare(b.title)
      })
  }, [type, theme, query])

  const journalArticles = filtered.filter((item) => item.type === 'Journal Articles')
  const conferenceProceedings = filtered.filter((item) => item.type === 'Conference Proceedings')

  const browsePublications = () => {
    document.getElementById('publication-index')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="publications-page">
      <section className="pub-hero">
        <div className="pub-shell pub-hero__grid">
          <div>
            <p className="pub-kicker">SELECTED SCHOLARSHIP</p>
            <h1>Scholarship in early childhood and elementary mathematics education</h1>
          </div>

          <div className="pub-hero__copy">
            <p>
              Research on children&apos;s mathematical reasoning, teacher learning,
              culturally grounded education, and technology-supported inquiry.
            </p>
            <button type="button" className="pub-browse-button" onClick={browsePublications}>
              Browse publications <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
      </section>

      <section className="pub-featured">
        <div className="pub-shell">
          <div className="pub-section-heading">
            <div>
              <p className="pub-kicker">FEATURED WORK</p>
              <h2>Recent and representative scholarship</h2>
            </div>
            <p>
              Featured scholarship is separated by outlet so journal articles and
              peer-reviewed conference proceedings can be read as distinct forms of scholarly output.
            </p>
          </div>

          <section className="pub-featured-group" aria-labelledby="featured-journals">
            <div className="pub-featured-group__heading">
              <h3 id="featured-journals">Journal Articles</h3>
            </div>
            <div className="pub-featured__grid">
              {featuredJournals.map((publication, index) => (
                <FeaturedCard key={publication.id} publication={publication} index={index} />
              ))}
            </div>
          </section>

          <section className="pub-featured-group" aria-labelledby="featured-proceedings">
            <div className="pub-featured-group__heading">
              <h3 id="featured-proceedings">Conference Proceedings</h3>
            </div>
            <div className="pub-featured__grid">
              {featuredProceedings.map((publication, index) => (
                <FeaturedCard key={publication.id} publication={publication} index={index} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="pub-index" id="publication-index">
        <div className="pub-shell">
          <div className="pub-section-heading">
            <div>
              <p className="pub-kicker">PUBLICATION INDEX</p>
              <h2>Browse the scholarship</h2>
            </div>
            <p>
              The full record is grouped by outlet and arranged in reverse chronological
              order within each category. Filters and search can narrow the record further.
            </p>
          </div>

          <div className="pub-filter-panel">
            <div className="pub-filter-block">
              <p className="pub-filter-title">Publication type</p>
              <div className="pub-filter-buttons">
                {publicationTypes.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={type === item ? 'is-active' : ''}
                    aria-pressed={type === item}
                    onClick={() => setType(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="pub-filter-block">
              <p className="pub-filter-title">Research theme</p>
              <div className="pub-filter-buttons">
                {publicationThemes.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={theme === item ? 'is-active' : ''}
                    aria-pressed={theme === item}
                    onClick={() => setTheme(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <label className="pub-search">
              <span>Search publications</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search title, author, topic, venue..."
              />
            </label>
          </div>

          <div className="pub-index__summary">
            <p>
              Showing <strong>{filtered.length}</strong> of <strong>{publications.length}</strong> records
            </p>
          </div>

          {filtered.length ? (
            <div className="pub-grouped-index">
              <PublicationGroup
                title="Journal Articles"
                items={journalArticles}
              />
              <PublicationGroup
                title="Conference Proceedings"
                items={conferenceProceedings}
              />
            </div>
          ) : (
            <div className="pub-empty">
              <h3>No publications match these filters.</h3>
              <p>Try another publication type, theme, or search term.</p>
            </div>
          )}
        </div>
      </section>

      <section className="pub-profiles">
        <div className="pub-shell pub-profiles__grid">
          <div>
            <p className="pub-kicker">SCHOLARLY PROFILES</p>
            <h2>Explore the full record</h2>
            <p>
              For citation counts, additional scholarly activity, and profile-level metrics,
              visit my external academic profiles.
            </p>
          </div>

          <div className="pub-profile-links">
            <a
              href={profileLinks.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Scholar <ExternalArrow />
            </a>
            <a
              href={profileLinks.orcid}
              target="_blank"
              rel="noopener noreferrer"
            >
              ORCID <ExternalArrow />
            </a>
            <a
              href={profileLinks.researchGate}
              target="_blank"
              rel="noopener noreferrer"
            >
              ResearchGate <ExternalArrow />
            </a>
          </div>
        </div>
      </section>

      <section className="pub-closing">
        <div className="pub-shell pub-closing__grid">
          <div>
            <p className="pub-kicker">CONTINUE EXPLORING</p>
            <h2>Follow the research behind the publications</h2>
          </div>

          <div className="pub-closing__links">
            <a href="#research">Research <span>→</span></a>
            <a href="#impact">Research impact <span>→</span></a>
            <a href="#cv">CV & service <span>→</span></a>
          </div>
        </div>
      </section>
    </div>
  )
}
