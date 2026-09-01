import { aboutContent } from '../data/aboutContent.js'

export default function About() {
  const {
    portrait,
    biography,
    questions,
    journey,
    fundedResearch,
    memberships,
    leadership,
    professionalEngagement,
    recognition,
    familyLine,
  } = aboutContent

  return (
    <>
      <section className="about-hero">
        <div className="about-hero-copy">
          <h1>Temitope F. Egbedeyi</h1>
          <p className="about-role">Early Childhood Mathematics Education Researcher</p>
          <p className="about-hero-summary">
            I study how children develop mathematical reasoning and how classroom interaction,
            culture, place, and technology shape opportunities to learn mathematics.
          </p>
          <div className="about-hero-actions">
            <a className="btn primary" href="#research">Explore research</a>
            <a className="text-link" href="#cv">View academic CV →</a>
          </div>
        </div>

        <figure className="about-portrait-stage">
          <img src={portrait} alt="Temitope F. Egbedeyi" decoding="async" />
          <figcaption>
            <span>Doctoral Candidate</span>
            Curriculum &amp; Instruction · Kent State University
          </figcaption>
        </figure>
      </section>

      <section className="section-pad about-biography-section">
        <div className="about-section-intro">
          <p className="eyebrow">BIOGRAPHY</p>
          <h2>Research grounded in children’s mathematical thinking</h2>
        </div>
        <div className="about-biography-copy">
          {biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="section-pad about-question-section">
        <div className="about-section-intro">
          <p className="eyebrow">THE QUESTIONS BEHIND MY WORK</p>
          <h2>What keeps the research moving</h2>
          <p>
            These questions connect my work across children’s reasoning, classroom interaction,
            culture, place, and technology.
          </p>
        </div>
        <div className="about-question-grid">
          {questions.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-journey-section">
        <div className="section-pad about-journey-inner">
          <div className="about-section-intro">
            <p className="eyebrow">ACADEMIC JOURNEY</p>
            <h2>From early childhood education to mathematics education research</h2>
          </div>
          <div className="about-timeline">
            {journey.map((item) => (
              <article key={`${item.marker}-${item.institution}`}>
                <div className="timeline-year">{item.marker}</div>
                <div>
                  <h3>{item.institution}</h3>
                  <p>{item.credential}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-philosophy-section">
        <div className="about-philosophy-quote">
          <p className="eyebrow">RESEARCH PHILOSOPHY</p>
          <blockquote>“All children are mathematical.”</blockquote>
        </div>
        <div className="about-philosophy-copy">
          <p>
            Children do not arrive at school without mathematical ideas. They notice patterns,
            compare quantities, reason about relationships, develop informal strategies, and
            make sense of the world mathematically.
          </p>
          <p>
            My work begins by taking children’s thinking seriously and by creating opportunities
            for explanation, multiple strategies, mathematical conversation, and connections
            between formal mathematics and everyday experience.
          </p>
        </div>
      </section>

      <section className="section-pad about-context-section">
        <div className="about-context-mark" aria-hidden="true">
          <span>Nigeria</span><b>↔</b><span>United States</span>
        </div>
        <div>
          <p className="eyebrow">RESEARCH ACROSS CONTEXTS</p>
          <h2>Culture, place, and educational experience matter</h2>
          <p>
            My educational and research experiences across Nigeria and the United States shape
            the questions I ask about mathematics learning. They have strengthened my interest
            in culturally grounded instruction, place-based mathematics, community knowledge,
            equity, and research that remains attentive to local realities.
          </p>
        </div>
      </section>

      <section className="about-funded-section">
        <div className="section-pad about-funded-inner">
          <div className="about-section-intro">
            <p className="eyebrow">RESEARCH GRANTS &amp; FUNDED PROJECTS</p>
            <h2>Contributing to externally funded research</h2>
            <p>
              My research experience includes contributing to externally funded projects as a
              research assistant and collaborative research team member.
            </p>
          </div>
          <div className="about-funded-grid">
            {fundedResearch.map((item) => (
              <article key={item.title}>
                <p className="about-funded-funder">{item.funder}</p>
                <h3>{item.title}</h3>
                <p className="about-funded-role">{item.role}</p>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad about-engagement-section">
        <div className="about-section-intro">
          <p className="eyebrow">SCHOLARSHIP BEYOND RESEARCH</p>
          <h2>Teaching, service, mentorship, and public engagement</h2>
        </div>
        <div className="about-engagement-grid">
          {professionalEngagement.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-membership-leadership">
        <div className="about-membership-column">
          <p className="eyebrow">PROFESSIONAL MEMBERSHIPS</p>
          <h2>Scholarly communities</h2>
          <ul>
            {memberships.map((membership) => <li key={membership}>{membership}</li>)}
          </ul>
        </div>
        <div className="about-leadership-column">
          <p className="eyebrow">LEADERSHIP &amp; SERVICE</p>
          <h2>Contributing beyond my own research</h2>
          <div className="about-leadership-list">
            {leadership.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad about-recognition-section">
        <div className="about-section-intro">
          <p className="eyebrow">AWARDS, FELLOWSHIPS &amp; HONORS</p>
          <h2>Selected recognition</h2>
        </div>
        <div className="about-recognition-grid">
          {recognition.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad about-human-section">
        <div>
          <p className="eyebrow">BEYOND THE RESEARCH</p>
          <h2>Scholarship is also about people and community</h2>
        </div>
        <p>{familyLine}</p>
      </section>

      <section className="about-closing-pathways">
        <div>
          <p className="eyebrow">CONTINUE EXPLORING</p>
          <h2>Follow the scholarship</h2>
        </div>
        <div className="about-pathway-links">
          <a href="#research">Research <span>→</span></a>
          <a href="#publications">Publications <span>→</span></a>
          <a href="#impact">Research impact <span>→</span></a>
          <a href="#cv">Academic CV <span>→</span></a>
        </div>
      </section>
    </>
  )
}
