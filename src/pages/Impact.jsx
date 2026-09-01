import { mediaItems } from '../data/media.js'

const impactAreas = [
  {
    title: 'Scholarly Dissemination',
    description: 'Peer-reviewed and conference-based research that communicates findings across mathematics education, teacher education, and childhood education communities.',
    link: '#publications',
    label: 'Explore publications',
  },
  {
    title: 'Peer Review & Professional Service',
    description: 'Service to journals, scholarly associations, conferences, committees, and research communities through reviewing, leadership, and professional participation.',
    link: '#cv',
    label: 'View CV & service',
  },
  {
    title: 'Public Scholarship & Media',
    description: 'Research and education initiatives communicated beyond academic journals through media coverage and public-facing professional engagement.',
    link: '#media',
    label: 'View media coverage',
  },
  {
    title: 'Research-to-Practice Connections',
    description: 'Work that connects evidence about children’s reasoning, teacher noticing, culture, and place with questions relevant to teaching, curriculum, and educator learning.',
    link: '#contact',
    label: 'Discuss collaboration',
  },
]

export default function Impact() {
  return (
    <>
      <section className="page-hero section-pad">
        <p className="eyebrow">RESEARCH IMPACT</p>
        <h1>Scholarship beyond a publication list</h1>
        <p className="lede">Research gains value when it is shared, discussed, reviewed, translated, and connected to the people and institutions it is intended to serve.</p>
      </section>

      <section className="section-pad impact-grid">
        {impactAreas.map((area, index) => (
          <article className="impact-card" key={area.title}>
            <span className="theme-number">{String(index + 1).padStart(2, '0')}</span>
            <h2>{area.title}</h2>
            <p>{area.description}</p>
            <a className="text-link" href={area.link}>{area.label} →</a>
          </article>
        ))}
      </section>

      <section className="section-pad soft-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">MEDIA & PUBLIC ENGAGEMENT</p>
            <h2>Selected recent coverage</h2>
          </div>
          <a className="text-link" href="#media">All media →</a>
        </div>
        <div className="impact-media-list">
          {mediaItems.slice(0, 3).map((item) => (
            <article key={item.url}>
              <p className="eyebrow">{item.source}</p>
              <h3>{item.title}</h3>
              <a href={item.url} target="_blank" rel="noopener noreferrer">Read article ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad closing-cta">
        <p className="eyebrow">CONNECT</p>
        <h2>Interested in collaboration, speaking, research translation, or educator learning?</h2>
        <a className="btn primary" href="#contact">Get in Touch</a>
      </section>
    </>
  )
}
