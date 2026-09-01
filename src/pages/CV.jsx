import React from 'react'
import '../styles/cv-service-page.css'
import { cvPdfUrl } from '../data/profileLinks.js'

const CV_PDF_URL = cvPdfUrl

const education = [
  {
    degree: 'Ph.D.',
    institution: 'Kent State University',
    location: 'United States',
    detail:
      'Curriculum & Instruction, in progress · Specialization in Early Childhood and Elementary Mathematics Education',
  },
  {
    degree: 'M.Ed.',
    institution: 'University of Ibadan',
    location: 'Nigeria',
    detail: 'Master’s Degree in Early Childhood Education',
  },
  {
    degree: 'B.Ed.',
    institution: 'University of Ibadan',
    location: 'Nigeria',
    detail: 'Bachelor’s Degree in Early Childhood Education / Economics Education',
  },
]

const appointments = [
  {
    role: 'Research Assistant',
    institution: 'Kent State University',
    detail:
      'Collaborative mathematics education research involving children’s reasoning, teacher noticing, eye-tracking, and externally supported projects.',
  },
  {
    role: 'Doctoral Candidate',
    institution: 'Kent State University',
    detail:
      'Curriculum & Instruction with specialization in early childhood and elementary mathematics education.',
  },
]

const awards = [
  {
    title: 'Co-winner, College of EHHS Outstanding Graduate Student Award',
    date: '2025–2026',
  },
  {
    title: 'Jeanette and Louis Reuter Graduate Fellowship in Developmental Science',
    date: 'May 2026',
  },
  {
    title: 'James W. Heddens Scholarship in Mathematics Education',
    date: 'March 2026',
  },
  {
    title: 'AERA Annual Meeting Graduate Student Assistance Fund',
    date: '2025',
  },
]

const journalReview = [
  'Journal of Educational Research in Developing Areas (JEREDA)',
  'International Journal of Emerging Issues in Early Childhood Education (IJEIECE)',
  'Journal of Early Childhood Association of Nigeria (JECAN)',
  'International Journal of Inclusive Education',
  'Ibadan Journal of Child Development and Educational Foundations',
  'International Journal of Educational Policy Research and Review',
]

const conferenceReview = [
  'American Educational Research Association (AERA)',
  'American Association of Colleges for Teacher Education (AACTE)',
  'Psychology of Mathematics Education – North America (PME-NA)',
  'Reconceptualizing Early Childhood Education (RECE)',
  'National Association of Early Childhood Teacher Educators',
  'Council for Exceptional Children',
]

const leadership = [
  {
    title: 'Graduate Student Senate',
    detail: 'Senator · Kent State University',
  },
  {
    title: 'Foundation for Rural Education and Empowerment',
    detail: 'Research leadership and educational engagement',
  },
  {
    title: 'The Sanguine Academy',
    detail: 'Research leadership and mentorship',
  },
  {
    title: 'Dreams to Legacy Initiative',
    detail: 'Research Director · Oyo State Chapter',
  },
  {
    title: 'EHHS Vision and Mission Committee',
    detail: 'Committee service · Kent State University',
  },
  {
    title: 'GSS Research Award Review Committee',
    detail: 'Graduate student research service',
  },
]

const memberships = [
  'American Educational Research Association (AERA)',
  'Psychology of Mathematics Education – North America (PME-NA)',
  'Research Council on Mathematics Learning (RCML)',
  'Early Childhood Association of Nigeria (ECAN)',
]

const professionalService = [
  {
    title: 'Ohio Academy of Science',
    detail: 'Scientific judging and educational service',
  },
  {
    title: 'PDK International',
    detail: 'Reviewer service',
  },
  {
    title: 'United People Global',
    detail: 'Reviewer service',
  },
]

export default function CV() {
  return (
    <div className="cv-page">
      <section className="cv-hero">
        <div className="cv-shell cv-hero__grid">
          <div>
            <p className="cv-kicker">ACADEMIC PROFILE</p>
            <h1>Academic experience, service, leadership, and scholarly contribution</h1>
          </div>

          <div className="cv-hero__copy">
            <p>
              A curated view of my academic journey, research appointments, professional
              service, leadership, mentoring, and scholarly communities.
            </p>
            <a
              className="cv-primary-action"
              href={CV_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              ↓ View / Download CV (PDF)
            </a>
          </div>
        </div>
      </section>

      <section className="cv-journey">
        <div className="cv-shell">
          <div className="cv-section-heading">
            <div>
              <p className="cv-kicker">ACADEMIC JOURNEY</p>
              <h2>Education & research appointments</h2>
            </div>
            <p>
              Academic preparation spanning early childhood education, mathematics education,
              curriculum and instruction, and collaborative research.
            </p>
          </div>

          <div className="cv-journey__grid">
            <div className="cv-education-list">
              {education.map((item) => (
                <article key={item.degree}>
                  <span>{item.degree}</span>
                  <div>
                    <h3>{item.institution}</h3>
                    <p className="cv-meta">{item.location}</p>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="cv-appointment-list">
              <p className="cv-kicker">CURRENT ACADEMIC ROLES</p>
              {appointments.map((item) => (
                <article key={item.role}>
                  <h3>{item.role}</h3>
                  <p className="cv-meta">{item.institution}</p>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cv-awards">
        <div className="cv-shell">
          <div className="cv-section-heading">
            <div>
              <p className="cv-kicker">AWARDS, FELLOWSHIPS & HONORS</p>
              <h2>Selected recognition</h2>
            </div>
            <p>
              Recent recognition for graduate scholarship, developmental science, and mathematics education.
            </p>
          </div>

          <div className="cv-awards-grid">
            {awards.map((award, index) => (
              <article key={award.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{award.title}</h3>
                <p>{award.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-review">
        <div className="cv-shell">
          <div className="cv-section-heading">
            <div>
              <p className="cv-kicker">PEER REVIEW & SCHOLARLY SERVICE</p>
              <h2>Contributing to the development of research</h2>
            </div>
            <p>
              Reviewing service across journals and professional conferences in education,
              mathematics education, teacher education, and early childhood research.
            </p>
          </div>

          <div className="cv-review-grid">
            <section>
              <p className="cv-kicker">JOURNAL REVIEWING</p>
              <h3>Journal review contributions</h3>
              <ul>
                {journalReview.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section>
              <p className="cv-kicker">CONFERENCE REVIEWING</p>
              <h3>Conference review contributions</h3>
              <ul>
                {conferenceReview.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section className="cv-leadership">
        <div className="cv-shell">
          <div className="cv-section-heading">
            <div>
              <p className="cv-kicker">LEADERSHIP & GOVERNANCE</p>
              <h2>Contributing beyond my own research</h2>
            </div>
            <p>
              Leadership roles across university governance, research organizations,
              educational initiatives, and scholarly communities.
            </p>
          </div>

          <div className="cv-leadership-list">
            {leadership.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-mentoring">
        <div className="cv-shell cv-mentoring__grid">
          <div className="cv-mentoring__metric">
            <strong>20+</strong>
            <span>Undergraduate & postgraduate researchers mentored</span>
          </div>

          <div>
            <p className="cv-kicker">TEACHING, MENTORING & CAPACITY BUILDING</p>
            <h2>Supporting emerging researchers and educators</h2>
            <p>
              I have mentored more than 20 undergraduate and postgraduate students through
              research projects and theses, supporting their development through the research
              process and the communication of scholarly work.
            </p>
            <p>
              My broader academic work also connects research with teaching, teacher learning,
              collaborative writing, and educational capacity building.
            </p>
          </div>
        </div>
      </section>

      <section className="cv-networks">
        <div className="cv-shell cv-networks__grid">
          <div>
            <p className="cv-kicker">PROFESSIONAL MEMBERSHIPS</p>
            <h2>Scholarly communities</h2>
            <ul className="cv-simple-list">
              {memberships.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div>
            <p className="cv-kicker">PROFESSIONAL & COMMUNITY SERVICE</p>
            <h2>Service beyond publication</h2>
            <div className="cv-service-list">
              {professionalService.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cv-download">
        <div className="cv-shell cv-download__grid">
          <div>
            <p className="cv-kicker">FULL CURRICULUM VITAE</p>
            <h2>View the complete academic record</h2>
            <p>
              The downloadable CV contains the fuller record of publications, presentations,
              awards, research activity, professional service, leadership, and academic experience.
            </p>
          </div>

          <div className="cv-download__action">
            <a
              href={CV_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              ↓ View / Download CV (PDF)
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
