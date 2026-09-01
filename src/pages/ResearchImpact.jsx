import React from 'react'
import '../styles/research-impact-page.css'
import '../styles/research-impact-metrics.css'
import { profileLinks } from '../data/profileLinks.js'

const AD_PROFILE_URL = 'https://adscientificindex.com/scientist/temitope-funminiyi-egbedeyi/5520673/'

const googleScholarMetrics = [
  { value: '42', label: 'Citations' },
  { value: '4', label: 'h-index' },
  { value: '1', label: 'i10-index' },
]

const researchGateMetrics = [
  { value: '3,500', label: 'Research item reads' },
  { value: '65.0', label: 'Research Interest Score' },
  { value: '25', label: 'Citations' },
  { value: '2', label: 'h-index' },
]

const contributionAreas = [
  {
    number: '01',
    title: "Children's mathematical reasoning",
    text: 'Research on multiplicative reasoning, multi-digit multiplication and division, partial products, spatial structuring, and students’ strategies examines how children organize and communicate mathematical ideas.',
  },
  {
    number: '02',
    title: 'Teacher noticing & educational technology',
    text: 'Work with preservice teachers brings together fraction division, embodied noticing, traditional video, holographic video, and educational technology to examine what teachers attend to in students’ reasoning.',
  },
  {
    number: '03',
    title: 'Culture, place & early learning',
    text: 'Scholarship on indigenous games, African pedagogies, community participation, inclusive education, and early childhood learning keeps culture and local knowledge visible in educational research.',
  },
]

const supportedResearch = [
  {
    number: '01',
    eyebrow: 'NATIONAL SCIENCE FOUNDATION',
    title: 'Collaborative mathematics education research',
    text: 'Research-assistant contribution to externally supported mathematics education research, including work connected with children’s reasoning and multi-digit operations.',
  },
  {
    number: '02',
    eyebrow: 'JAFFE FOUNDATION',
    title: 'Foundation-supported research',
    text: 'Research-assistant experience within a collaborative research environment supported by the Jaffe Foundation.',
  },
  {
    number: '03',
    eyebrow: 'TETFUND',
    title: 'Project development before implementation',
    text: 'Before relocating to the United States, I was one of the originators of a TETFund-supported research project in Nigeria, contributing to the proposal, questionnaire, and project budget. The project later generated multiple publications and teacher-training activities.',
  },
]

const impactPathways = [
  {
    number: '01',
    eyebrow: 'EYE-TRACKING & MATHEMATICAL REASONING',
    title: 'From visual attention research to peer-reviewed journal scholarship',
    flow: ['Research question', 'Eye-tracking study', 'Analysis of spatial structuring', 'Journal publication'],
    text: 'Research examining third-grade students’ spatial structuring of arrays connected visual attention with mathematical reasoning and culminated in a peer-reviewed article in the Journal of Mathematical Behavior.',
    href: 'https://doi.org/10.1016/j.jmathb.2026.101352',
    link: 'View publication',
  },
  {
    number: '02',
    eyebrow: 'EMBODIED NOTICING',
    title: 'From conference dissemination to journal publication',
    flow: ['Research project', 'Conference proceedings', 'Further analysis', 'Journal publication'],
    text: 'Research on preservice teachers’ embodied noticing of students’ fraction-division reasoning developed across conference dissemination and peer-reviewed journal publication, including work with traditional and holographic video.',
    href: 'https://www.learntechlib.org/j/JTATE/v/32/n/1/',
    link: 'View journal record',
  },
]

const mediaItems = [
  {
    outlet: 'VANGUARD',
    title: 'Nigerian scholar redefines teacher training with global math research',
    href: 'https://www.vanguardngr.com/2024/11/nigerian-scholar-redefines-teacher-training-with-global-math-research/',
  },
  {
    outlet: 'THE GUARDIAN',
    title: 'Egbedeyi breaks new ground in childhood math learning with eye-tracking tech',
    href: 'https://guardian.ng/news/nigerian-researcher-egbedeyi-breaks-new-ground-in-childhood-math-learning-with-eye-tracking-tech/',
  },
  {
    outlet: 'THE GUARDIAN',
    title: 'Academy trains students, champions digital research skills at UI masterclass',
    href: 'https://guardian.ng/news/nigeria/metro/academy-trains-students-champions-digital-research-skills-at-ui-masterclass/',
  },
]

export default function ResearchImpact() {
  return (
    <div className="impact-page">
      <section className="impact-hero">
        <div className="impact-shell">
          <p className="impact-kicker">RESEARCH IMPACT</p>
          <h1>Scholarship beyond a publication list</h1>
          <p className="impact-hero__statement">
            Research gains value when it is read, cited, discussed, translated, and connected to the people and institutions it is intended to serve.
          </p>
        </div>
      </section>

      <section className="impact-reach">
        <div className="impact-shell">
          <div className="impact-section-heading impact-reach__heading">
            <div>
              <p className="impact-kicker">SCHOLARLY REACH & CITATION IMPACT</p>
              <h2>Research that is being read, referenced, and carried into other scholarly work</h2>
            </div>
            <p>
              Current platform metrics provide complementary snapshots of the visibility, citation, and engagement surrounding my published research. Counts are reported separately because scholarly platforms index and calculate research activity differently.
            </p>
          </div>

          <div className="impact-reach__primary">
            <div className="impact-reach__source">
              <div>
                <p className="impact-kicker">GOOGLE SCHOLAR</p>
                <h3>Primary citation snapshot</h3>
              </div>
              <a href={profileLinks.googleScholar} target="_blank" rel="noopener noreferrer">View profile ↗</a>
            </div>

            <div className="impact-metric-grid impact-metric-grid--primary">
              {googleScholarMetrics.map((metric) => (
                <article key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="impact-reach__secondary">
            <div className="impact-reach__source">
              <div>
                <p className="impact-kicker">RESEARCHGATE</p>
                <h3>Cross-platform scholarly engagement</h3>
              </div>
              <a href={profileLinks.researchGate} target="_blank" rel="noopener noreferrer">View profile ↗</a>
            </div>

            <div className="impact-metric-grid impact-metric-grid--secondary">
              {researchGateMetrics.map((metric) => (
                <article key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>

            <p className="impact-metric-note">
              ResearchGate recorded the 3,500-read milestone on August 31, 2026. ResearchGate citation and h-index figures are not added to Google Scholar totals because the platforms use different coverage and indexing methods.
            </p>
          </div>

          <div className="impact-bibliometric">
            <div>
              <p className="impact-kicker">EXTERNAL BIBLIOMETRIC PROFILE</p>
              <h3>AD Scientific Index Academic Performance Certificate, 2026</h3>
              <p>
                A dated external bibliometric snapshot documenting citation indicators and comparative research positioning at the time of assessment. The certificate is presented as supporting evidence of scholarly reach, not as a comprehensive measure of research quality.
              </p>
            </div>
            <a href={AD_PROFILE_URL} target="_blank" rel="noopener noreferrer">View AD Scientific Index profile ↗</a>
          </div>

          <p className="impact-reach__updated">
            Metrics last updated: August 31, 2026. Citation counts and platform scores may change as records are updated.
          </p>
        </div>
      </section>

      <section className="impact-contribution">
        <div className="impact-shell">
          <div className="impact-section-heading">
            <div>
              <p className="impact-kicker">CONTRIBUTION TO KNOWLEDGE</p>
              <h2>Connected lines of inquiry across mathematics and childhood education</h2>
            </div>
            <p>
              Rather than repeating publication counts, this section highlights the substantive areas through which the research contributes to knowledge.
            </p>
          </div>

          <div className="impact-contribution-grid">
            {contributionAreas.map((item) => (
              <article key={item.number}>
                <span className="impact-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-supported">
        <div className="impact-shell impact-supported__grid">
          <div className="impact-supported__intro">
            <p className="impact-kicker">SUPPORTED & COLLABORATIVE RESEARCH</p>
            <h2>Contributing from project development to dissemination</h2>
            <p>
              My research experience includes collaborative work in the United States and Nigeria, with roles that differ across projects and stages of the research process.
            </p>
          </div>

          <div className="impact-supported__list">
            {supportedResearch.map((item) => (
              <article key={item.number}>
                <span className="impact-number">{item.number}</span>
                <div>
                  <p className="impact-kicker">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-mentoring">
        <div className="impact-shell impact-mentoring__grid">
          <div className="impact-mentoring__metric">
            <strong>20+</strong>
            <span>Undergraduate & postgraduate researchers mentored</span>
          </div>

          <div className="impact-mentoring__copy">
            <p className="impact-kicker">MENTORING & CAPACITY BUILDING</p>
            <h2>Supporting emerging researchers alongside producing scholarship</h2>
            <p>
              I have mentored more than 20 undergraduate and postgraduate students through research projects and theses, supporting their development as they move through the process of conducting and communicating scholarly research.
            </p>
            <p>
              This commitment extends through research leadership, collaborative writing, academic guidance, and community-oriented initiatives that help others grow as researchers.
            </p>
          </div>
        </div>
      </section>

      <section className="impact-pathways">
        <div className="impact-shell">
          <div className="impact-section-heading">
            <div>
              <p className="impact-kicker">SELECTED IMPACT PATHWAYS</p>
              <h2>Following research from a question to a wider scholarly contribution</h2>
            </div>
            <p>
              These examples show documented pathways through which research develops, circulates, and contributes to scholarly communities.
            </p>
          </div>

          <div className="impact-pathway-list">
            {impactPathways.map((item) => (
              <article key={item.number}>
                <span className="impact-number">{item.number}</span>
                <div>
                  <p className="impact-kicker">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <div className="impact-flow" aria-label={`${item.title} pathway`}>
                    {item.flow.map((step, index) => (
                      <React.Fragment key={step}>
                        <span>{step}</span>
                        {index < item.flow.length - 1 && <b aria-hidden="true">→</b>}
                      </React.Fragment>
                    ))}
                  </div>
                  <p>{item.text}</p>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">{item.link} ↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-media">
        <div className="impact-shell">
          <div className="impact-media__heading">
            <div>
              <p className="impact-kicker">PUBLIC SCHOLARSHIP</p>
              <h2>Selected external coverage</h2>
            </div>
            <a href="#blog">Blog & Media →</a>
          </div>

          <div className="impact-media-grid">
            {mediaItems.map((item) => (
              <article key={item.title}>
                <p className="impact-kicker">{item.outlet}</p>
                <h3>{item.title}</h3>
                <a href={item.href} target="_blank" rel="noopener noreferrer">Read coverage ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-connect">
        <div className="impact-shell impact-connect__inner">
          <p className="impact-kicker">CONNECT</p>
          <h2>Interested in collaboration, speaking, research translation, or educator learning?</h2>
          <a className="impact-connect__button" href="#contact">GET IN TOUCH</a>
        </div>
      </section>
    </div>
  )
}
