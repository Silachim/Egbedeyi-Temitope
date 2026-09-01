import { researchThemes, currentProjects } from '../data/research.js'
import { publications } from '../data/publications.js'
import { mediaCoverage } from '../data/blogMediaData.js'
import { cvPdfUrl } from '../data/profileLinks.js'
import { siteContent } from '../data/siteContent.js'

const studyQuestions = [
  {
    icon: '×',
    title: 'How do children reason multiplicatively?',
    text: 'I investigate how children develop multiplicative thinking across strategies, tasks, representations, and explanations.',
  },
  {
    icon: '◌',
    title: 'How do classroom norms shape mathematical thinking?',
    text: 'I study how expectations, participation, discourse, and what counts as a convincing explanation influence reasoning and confidence.',
  },
  {
    icon: '⌖',
    title: 'How can culture and place strengthen mathematics learning?',
    text: 'I examine how children’s funds of knowledge, community practices, and lived experiences can inform meaningful mathematics instruction.',
  },
  {
    icon: '◎',
    title: 'What can eye-tracking reveal about problem solving?',
    text: 'I use eye-tracking to explore visual attention, noticing, and their connections to children’s mathematical reasoning.',
  },
  {
    icon: '↗',
    title: 'How can research improve teaching and learning?',
    text: 'I translate research insights into instruction, teacher learning, curriculum, and more responsive mathematics experiences.',
  },
]

const practicePathways = [
  ['Research', 'Understanding children’s mathematical thinking through rigorous and ethical inquiry.'],
  ['Teaching', 'Supporting instruction that values reasoning, explanation, and multiple strategies.'],
  ['Community', 'Connecting mathematics learning with culture, place, and everyday experience.'],
  ['Technology', 'Using tools such as eye-tracking to study learning in new and powerful ways.'],
]

export default function Home() {
  const featuredProjects = currentProjects.slice(0, 3)
  const featuredPublications = publications.slice(0, 3)
  const featuredMedia = [...mediaCoverage]
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
    .slice(0, 3)
  const { bannerUrl, bannerAlt, headshotUrl, headshotAlt } = siteContent.home.hero

  return (
    <>
      <section className="visual-home-hero" aria-labelledby="home-title">
        <div className="hero-banner-stage">
          <img
            className="hero-banner-image"
            src={bannerUrl}
            alt={bannerAlt}
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-banner-shade" aria-hidden="true" />

          <div className="hero-banner-copy">
            <p className="eyebrow hero-eyebrow">DOCTORAL CANDIDATE · KENT STATE UNIVERSITY</p>
            <h1 id="home-title">
              Early Childhood<br />
              Mathematics<br />
              Education<br />
              <em>Researcher</em>
            </h1>
            <p className="hero-summary">
              I study how young children develop mathematical reasoning and how classroom
              interaction, culture, place, and technology shape mathematics learning in early
              childhood and elementary settings.
            </p>
            <div className="button-row hero-buttons">
              <a className="btn primary" href="#research">Explore Research →</a>
              <a className="btn hero-outline" href="#publications">View Publications</a>
              <a className="btn hero-outline" href={cvPdfUrl} target="_blank" rel="noopener noreferrer">Download CV ↓</a>
            </div>
          </div>
        </div>

        <aside className="hero-profile-panel" aria-label="Researcher profile and research focus">
          <figure className="hero-headshot-wrap">
            <img className="hero-headshot" src={headshotUrl} alt={headshotAlt} loading="eager" decoding="async" />
          </figure>
          <div className="hero-focus-content">
            <p className="eyebrow">RESEARCH FOCUS</p>
            <h2>Questions about how children learn mathematics</h2>
            <nav className="hero-focus-list" aria-label="Research focus areas">
              {researchThemes.map((theme) => (
                <a key={theme.title} href="#research">{theme.title}</a>
              ))}
            </nav>
          </div>
        </aside>
      </section>

      <section className="section-pad question-section">
        <div className="question-intro">
          <p className="eyebrow">WHAT I STUDY</p>
          <h2>Key questions that drive my work</h2>
          <p>
            My research explores the cognitive, social, cultural, and contextual factors that
            shape how young children learn and make sense of mathematics.
          </p>
          <a className="text-link" href="#research">Learn more about my research →</a>
        </div>
        <div className="question-card-grid">
          {studyQuestions.map((item, index) => (
            <article className="question-card" key={item.title}>
              <div className="question-card-top"><span className="question-symbol" aria-hidden="true">{item.icon}</span><span className="question-number">0{index + 1}</span></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad visual-featured-research">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">FEATURED RESEARCH</p>
            <h2>Current research projects</h2>
          </div>
          <a className="text-link light-link" href="#research">View all research →</a>
        </div>
        <div className="visual-project-grid">
          {featuredProjects.map((project, index) => (
            <article className="visual-project-card" key={project.title}>
              <div className="visual-project-number">0{index + 1}</div>
              <div className="visual-project-copy">
                <p className="project-theme">{project.theme}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a className="text-link light-link" href="#research">Explore project →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="insight-numbers-band">
        <div className="research-insight compact-insight" aria-labelledby="research-insight-title">
          <div className="research-insight-inner">
            <p className="eyebrow">RESEARCH INSIGHT</p>
            <blockquote id="research-insight-title">
              “Children’s strategies can reveal mathematical understanding that is not visible
              from correct answers alone.”
            </blockquote>
            <p>
              Understanding how children think, not just what they answer, is essential for
              meaningful mathematics instruction.
            </p>
          </div>
        </div>

        <div className="research-number-panel">
          <p className="eyebrow">RESEARCH BY THE NUMBERS</p>
          <div className="number-grid compact-number-grid">
            <article><strong>20+</strong><span>Scholarly publications</span></article>
            <article><strong>Multiple</strong><span>Research projects in early childhood mathematics</span></article>
            <article><strong>Nigeria + U.S.</strong><span>Research and educational contexts</span></article>
            <article><strong>Peer Review</strong><span>Journals, conferences, and professional bodies</span></article>
          </div>
        </div>
      </section>

      <section className="section-pad visual-practice-section">
        <div className="practice-heading">
          <p className="eyebrow">FROM RESEARCH TO PRACTICE</p>
          <h2>Connecting research, teaching & community</h2>
          <p>
            I approach early childhood mathematics as a space where scholarly inquiry,
            classroom practice, community knowledge, and emerging tools inform one another.
          </p>
        </div>
        <div className="visual-practice-grid">
          {practicePathways.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <a className="text-link" href={title === 'Research' ? '#research' : title === 'Teaching' ? '#about' : '#impact'}>Learn more →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad featured-publications">
        <div className="section-heading-row">
          <div><p className="eyebrow">SELECTED SCHOLARSHIP</p><h2>Featured publications</h2></div>
          <a className="text-link" href="#publications">View all publications →</a>
        </div>
        <div className="home-publication-list">
          {featuredPublications.map((publication, index) => (
            <article key={publication.title}>
              <span>0{index + 1}</span>
              <div>
                <p className="publication-meta">{publication.venue && `${publication.venue} · `}{publication.year || ''}</p>
                <div className="publication-topics">
                  {publication.topics.slice(0, 2).map((topic) => <span key={topic}>{topic}</span>)}
                </div>
                <h3>{publication.title}</h3>
                <p>{publication.highlight}</p>
                <a href={publication.url} target="_blank" rel="noopener noreferrer">View publication ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad visual-media-section">
        <div className="section-heading-row">
          <div><p className="eyebrow">RESEARCH IN THE NEWS</p><h2>Public scholarship & media</h2></div>
          <a className="text-link" href="#blog">View Blog & Media →</a>
        </div>
        <div className="media-card-grid visual-media-grid">
          {featuredMedia.map((item, index) => (
            <article key={item.title}>
              <span className="media-index">0{index + 1}</span>
              <p className="media-brand">{item.outlet}</p>
              <p className="media-source">PRESS COVERAGE · {item.year}</p>
              <h3>{item.title}</h3>
              <a href={item.url} target="_blank" rel="noopener noreferrer">Read coverage ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad audience-section">
        <div className="audience-card">
          <p className="eyebrow">FOR TEACHERS</p>
          <h2>Ideas for understanding children’s mathematics</h2>
          <p>Explore research on children’s strategies, classroom discourse, multiplicative reasoning, and culturally grounded mathematics learning.</p>
          <a className="text-link" href="#research">Explore research →</a>
        </div>
        <div className="audience-card">
          <p className="eyebrow">FOR RESEARCHERS</p>
          <h2>Scholarship, methods & collaboration</h2>
          <p>Explore publications, projects, research methods, professional engagement, and opportunities for scholarly collaboration.</p>
          <a className="text-link" href="#publications">Explore scholarship →</a>
        </div>
      </section>

      <section className="section-pad closing-cta visual-home-closing">
        <p className="eyebrow">LET’S CONNECT</p>
        <h2>Interested in early childhood mathematics education, children’s mathematical reasoning, or culturally grounded learning?</h2>
        <p>I welcome research collaborations, conference invitations, professional conversations, and opportunities to connect research with practice.</p>
        <div className="button-row">
          <a className="btn primary" href="#contact">Get in Touch</a>
          <a className="btn text" href="#impact">Explore Research Impact →</a>
        </div>
      </section>
    </>
  )
}
