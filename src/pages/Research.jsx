import React, { useMemo, useState } from 'react'
import { researchContent } from '../data/researchContent.js'
import {
  researchItemMatchesTopic,
  researchTopicIsActive,
} from '../data/taxonomyRouting.js'
import '../styles/research-page.css'
import '../styles/taxonomy-interactions.css'

const Arrow = () => <span aria-hidden="true">→</span>

export default function Research() {
  const c = researchContent
  const [activeTopic, setActiveTopic] = useState('All')

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    })
  }

  const activateTopic = (topic) => {
    setActiveTopic(topic)

    window.requestAnimationFrame(() => {
      scrollToSection('research-program')
    })
  }

  const visibleStrands = useMemo(
    () =>
      c.strands.filter((item) =>
        researchItemMatchesTopic(item, activeTopic)
      ),
    [c.strands, activeTopic]
  )

  const visibleProjects = useMemo(
    () =>
      c.projects.filter((item) =>
        researchItemMatchesTopic(item, activeTopic)
      ),
    [c.projects, activeTopic]
  )

  const visibleMethods = useMemo(
    () =>
      c.methods.filter((item) =>
        researchItemMatchesTopic(item, activeTopic)
      ),
    [c.methods, activeTopic]
  )

  const visibleApplications = useMemo(
    () =>
      c.applications.filter((item) =>
        researchItemMatchesTopic(item, activeTopic)
      ),
    [c.applications, activeTopic]
  )

  const visibleOutputs = useMemo(
    () =>
      c.outputs.filter((item) =>
        researchItemMatchesTopic(item, activeTopic)
      ),
    [c.outputs, activeTopic]
  )

  const TopicButton = ({
    topic,
    className = '',
    children,
  }) => (
    <button
      type="button"
      className={`taxonomy-button ${className}`.trim()}
      aria-pressed={researchTopicIsActive(
        activeTopic,
        topic
      )}
      onClick={() => activateTopic(topic)}
    >
      {children || topic}
    </button>
  )

  return (
    <div className="research-page">
      <section className="research-hero">
        <div className="research-shell research-hero-grid">
          <div className="research-hero-copy">
            <p className="research-kicker">
              {c.hero.eyebrow}
            </p>
            <h1>{c.hero.title}</h1>
            <p className="research-hero-intro">
              {c.hero.intro}
            </p>

            <div className="research-hero-actions">
              <button
                className="research-btn research-btn-dark research-scroll-button"
                type="button"
                onClick={() =>
                  scrollToSection('projects')
                }
              >
                Explore projects <Arrow />
              </button>

              <button
                className="research-text-link research-scroll-button research-scroll-button--text"
                type="button"
                onClick={() =>
                  scrollToSection('methods')
                }
              >
                Research methods <Arrow />
              </button>
            </div>
          </div>

          <aside
            className="research-focus-panel"
            aria-label="Research focus"
          >
            <p className="research-kicker">
              RESEARCH FOCUS
            </p>

            <div className="research-focus-list">
              {c.hero.tags.map((tag, index) => (
                <div
                  className="research-focus-row"
                  key={tag}
                >
                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <TopicButton
                    topic={tag}
                    className="research-focus-topic-button"
                  >
                    {tag}
                  </TopicButton>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section
        className="research-strands-section"
        id="research-program"
      >
        <div className="research-shell">
          {activeTopic !== 'All' && (
            <div
              className="research-filter-summary"
              role="status"
            >
              <span>
                Filtering research by:
                <strong>{activeTopic}</strong>
              </span>

              <button
                type="button"
                onClick={() => setActiveTopic('All')}
              >
                Clear filter
              </button>
            </div>
          )}

          <div className="research-section-heading split">
            <div>
              <p className="research-kicker">
                RESEARCH PROGRAM
              </p>
              <h2>
                Four strands that connect the work
              </h2>
            </div>

            <p>
              My research program brings together children's
              reasoning, classroom culture, technology, and
              context rather than treating them as separate
              concerns.
            </p>
          </div>

          {visibleStrands.length > 0 ? (
            <div className="research-strands-grid">
              {visibleStrands.map((strand) => (
                <article
                  className="research-strand-card"
                  key={strand.number}
                >
                  <div className="strand-topline">
                    <span>{strand.number}</span>
                    <small>{strand.title}</small>
                  </div>

                  <h3>{strand.question}</h3>
                  <p>{strand.description}</p>

                  <div className="research-tags">
                    {strand.topics.map((topic) => (
                      <TopicButton
                        key={topic}
                        topic={topic}
                        className="research-tag-button"
                      >
                        {topic}
                      </TopicButton>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="taxonomy-empty-state">
              No research strand matches this topic yet.
            </p>
          )}
        </div>
      </section>

      <section
        className="research-projects-section"
        id="projects"
      >
        <div className="research-shell">
          <div className="research-section-heading split light">
            <div>
              <p className="research-kicker">
                CURRENT & SELECTED WORK
              </p>
              <h2>Research projects</h2>
            </div>

            <a
              className="research-text-link light-link"
              href="/#publications"
            >
              Selected outputs <Arrow />
            </a>
          </div>

          {visibleProjects.length > 0 ? (
            <div className="research-projects-grid">
              {visibleProjects.map(
                (project, index) => (
                  <article
                    className="research-project-card"
                    key={project.title}
                  >
                    <div className="project-number">
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </div>
                    <p className="project-status">
                      {project.status}
                    </p>
                    <p className="project-focus">
                      {project.focus}
                    </p>
                    <h3>{project.title}</h3>
                    <p className="project-description">
                      {project.description}
                    </p>

                    <div className="research-tags dark-tags">
                      {project.meta.map((item) => (
                        <TopicButton
                          key={item}
                          topic={item}
                          className="research-tag-button"
                        >
                          {item}
                        </TopicButton>
                      ))}
                    </div>
                  </article>
                )
              )}
            </div>
          ) : (
            <p className="taxonomy-empty-state taxonomy-empty-state--light">
              No research project matches this topic yet.
            </p>
          )}
        </div>
      </section>

      <section
        className="research-methods-section"
        id="methods"
      >
        <div className="research-shell">
          <div className="research-section-heading split">
            <div>
              <p className="research-kicker">
                METHODS & APPROACHES
              </p>
              <h2>
                Studying mathematical thinking from
                multiple angles
              </h2>
            </div>

            <p>
              Methodological choices are driven by the
              research question. I combine tools and
              evidence sources when doing so produces a
              fuller account of children's and teachers'
              mathematical activity.
            </p>
          </div>

          {visibleMethods.length > 0 ? (
            <div className="research-methods-grid">
              {visibleMethods.map(
                (method, index) => (
                  <article
                    className="research-method-card"
                    key={method.title}
                  >
                    <span>
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </span>
                    <h3>{method.title}</h3>
                    <p>{method.description}</p>
                  </article>
                )
              )}
            </div>
          ) : (
            <p className="taxonomy-empty-state">
              No research method matches this topic yet.
            </p>
          )}
        </div>
      </section>

      <section className="research-funded-section">
        <div className="research-shell research-funded-grid">
          <div className="research-funded-intro">
            <p className="research-kicker">
              EXTERNALLY FUNDED RESEARCH
            </p>
            <h2>
              Collaborative research supported by external
              funding
            </h2>
            <p>
              My funded research experience includes
              contributing as a research assistant and
              collaborative research team member.
            </p>
          </div>

          <div className="research-funded-cards">
            {c.fundedResearch.map((item) => (
              <article key={item.title}>
                <small>{item.funder}</small>
                <h3>{item.title}</h3>
                <strong>{item.role}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="research-collaborators-section">
        <div className="research-shell">
          <div className="research-section-heading split light">
            <div>
              <p className="research-kicker">
                RESEARCH COLLABORATION
              </p>
              <h2>
                Research collaborators & scholarly network
              </h2>
            </div>

            <p>
              Scholarship is strengthened through
              collaboration across institutions, disciplines,
              and educational contexts.
            </p>
          </div>

          <div className="research-collaborators-grid">
            {c.collaborators.map((person) => (
              <article
                className="research-collaborator"
                key={`${person.name}-${person.institution}`}
              >
                <h3>{person.name}</h3>
                <p>{person.institution}</p>
                <small>{person.area}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="research-applications-section">
        <div className="research-shell">
          <div className="research-section-heading split">
            <div>
              <p className="research-kicker">
                RESEARCH TRANSLATION
              </p>
              <h2>Research-informed applications</h2>
            </div>

            <p>
              Selected digital tools extend ideas from
              research into accessible experiences for
              learners, educators, and wider communities.
            </p>
          </div>

          {visibleApplications.length > 0 ? (
            <div className="research-applications-grid">
              {visibleApplications.map((app) => (
                <article
                  className="research-app-card"
                  key={app.title}
                >
                  <div className="research-app-image">
                    <img
                      src={app.image}
                      alt={`${app.title} interface`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="research-app-copy">
                    <small>{app.category}</small>
                    <h3>{app.title}</h3>
                    <p>{app.description}</p>

                    <div className="research-tags">
                      {app.tags.map((tag) => (
                        <TopicButton
                          key={tag}
                          topic={tag}
                          className="research-tag-button"
                        >
                          {tag}
                        </TopicButton>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="taxonomy-empty-state">
              No research application matches this topic yet.
            </p>
          )}
        </div>
      </section>

      <section className="research-insights-section">
        <div className="research-shell research-insights-grid">
          <div>
            <p className="research-kicker">
              RESEARCH INSIGHTS
            </p>
            <h2>
              Ideas that continue to shape the work
            </h2>
          </div>

          <div className="research-insights-list">
            {c.insights.map((insight, index) => (
              <blockquote key={insight}>
                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p>“{insight}”</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section
        className="research-outputs-section"
        id="research-outputs"
      >
        <div className="research-shell">
          <div className="research-section-heading split">
            <div>
              <p className="research-kicker">
                SELECTED SCHOLARSHIP
              </p>
              <h2>
                Research outputs connected to the program
              </h2>
            </div>

            <a
              className="research-text-link"
              href="/#publications"
            >
              View publications page <Arrow />
            </a>
          </div>

          {visibleOutputs.length > 0 ? (
            <div className="research-output-list">
              {visibleOutputs.map(
                (output, index) => (
                  <article key={output.title}>
                    <span>
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </span>

                    <div>
                      <h3>{output.title}</h3>

                      <div className="research-tags">
                        {output.tags.map((tag) => (
                          <TopicButton
                            key={tag}
                            topic={tag}
                            className="research-tag-button"
                          >
                            {tag}
                          </TopicButton>
                        ))}
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          ) : (
            <p className="taxonomy-empty-state">
              No selected output matches this topic yet.
            </p>
          )}
        </div>
      </section>

      <section className="research-closing-section">
        <div className="research-shell research-closing-grid">
          <div>
            <p className="research-kicker">
              CONTINUE EXPLORING
            </p>
            <h2>Follow the scholarship</h2>
          </div>

          <div className="research-closing-links">
            <a href="/#publications">
              Publications <Arrow />
            </a>
            <a href="/#impact">
              Research impact <Arrow />
            </a>
            <a href="/#cv">
              CV & service <Arrow />
            </a>
            <a href="/#contact">
              Contact <Arrow />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
