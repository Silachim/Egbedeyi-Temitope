import React, { useState } from 'react'
import '../styles/contact-page-improved.css'

const PRIMARY_EMAIL = 'tegbedey@kent.edu'
const SECONDARY_EMAIL = 'egbedeyitemitope@gmail.com'

const inquiryOptions = [
  'Research collaboration',
  'Speaking or conference invitation',
  'Teaching or professional learning',
  'Media inquiry',
  'Student or research mentorship',
  'Other professional inquiry',
]

const contactAreas = [
  {
    number: '01',
    title: 'Research collaboration',
    text:
      'Collaborative work in mathematics education, children’s mathematical thinking, teacher education, culture and place, and related areas.',
  },
  {
    number: '02',
    title: 'Speaking & professional engagement',
    text:
      'Conference participation, invited talks, workshops, panels, and educational conversations.',
  },
  {
    number: '03',
    title: 'Research mentoring & capacity building',
    text:
      'Conversations around research development, scholarly writing, methods, and the growth of emerging researchers.',
  },
  {
    number: '04',
    title: 'Media & public scholarship',
    text:
      'Requests related to research communication, interviews, educational initiatives, and public-facing scholarship.',
  },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    affiliation: '',
    inquiryType: inquiryOptions[0],
    message: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const subject = `${form.inquiryType}: Website inquiry from ${
      form.name || 'visitor'
    }`

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Affiliation / Organization: ${form.affiliation || 'Not provided'}`,
      `Inquiry type: ${form.inquiryType}`,
      '',
      'Message:',
      form.message,
    ].join('\n')

    const mailto = `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
  }

  return (
    <div className="contact-page contact-page--refined">
      <section className="contact-hero">
        <div className="contact-shell contact-hero__grid">
          <div>
            <p className="contact-kicker">CONNECT</p>
            <h1>Let’s connect around research, education, and collaboration</h1>
          </div>

          <div className="contact-hero__copy">
            <p>
              I welcome thoughtful conversations about research collaboration,
              speaking, educational engagement, scholarly development, and public
              scholarship.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="contact-shell contact-main__grid">
          <div className="contact-form-wrap">
            <div className="contact-section-heading">
              <p className="contact-kicker">SEND A MESSAGE</p>
              <h2>Start a conversation</h2>
              <p>
                Share a little about your inquiry and the best way to reach you.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field-grid">
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </label>

                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </label>
              </div>

              <label>
                <span>
                  Affiliation or organization
                  <small>Optional</small>
                </span>
                <input
                  type="text"
                  name="affiliation"
                  value={form.affiliation}
                  onChange={handleChange}
                  autoComplete="organization"
                />
              </label>

              <label>
                <span>Inquiry type</span>
                <select
                  name="inquiryType"
                  value={form.inquiryType}
                  onChange={handleChange}
                >
                  {inquiryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="8"
                  required
                />
              </label>

              <div className="contact-form__footer">
                <p>
                  Sending opens your email application with the message already prepared.
                  You can review it before sending.
                </p>

                <button type="submit">
                  Send message →
                </button>
              </div>
            </form>
          </div>

          <aside className="contact-sidebar">
            <section>
              <p className="contact-kicker">DIRECT CONTACT</p>
              <h3>Email</h3>

              <a
                className="contact-email contact-email--primary"
                href={`mailto:${PRIMARY_EMAIL}`}
              >
                {PRIMARY_EMAIL}
              </a>

              <a
                className="contact-email"
                href={`mailto:${SECONDARY_EMAIL}`}
              >
                {SECONDARY_EMAIL}
              </a>
            </section>

            <section className="contact-sidebar-note">
              <p className="contact-kicker">WHEN WRITING</p>
              <h3>A little context helps</h3>
              <p>
                For invitations or collaborative inquiries, please include the
                purpose, intended audience, timeline, and any relevant background.
              </p>
            </section>
          </aside>
        </div>
      </section>

      <section className="contact-areas">
        <div className="contact-shell">
          <div className="contact-section-heading contact-section-heading--wide">
            <div>
              <p className="contact-kicker">WHAT YOU CAN CONTACT ME ABOUT</p>
              <h2>Areas for conversation and collaboration</h2>
            </div>

            <p>
              I welcome conversations connecting research, educational practice,
              scholarly development, and public engagement.
            </p>
          </div>

          <div className="contact-areas__grid">
            {contactAreas.map((item) => (
              <article key={item.number}>
                <span className="contact-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-closing">
        <div className="contact-shell contact-closing__grid">
          <div>
            <p className="contact-kicker">CONTINUE EXPLORING</p>
            <h2>Good scholarship grows through conversation</h2>
          </div>

          <nav aria-label="Related scholarship">
            <a href="#research">
              Research <span>→</span>
            </a>
            <a href="#publications">
              Publications <span>→</span>
            </a>
            <a href="#blog">
              Blog & Media <span>→</span>
            </a>
          </nav>
        </div>
      </section>
    </div>
  )
}
