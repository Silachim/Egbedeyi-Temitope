import React from 'react'
import '../styles/footer.css'
import { profileLinks } from '../data/profileLinks.js'

const exploreLinks = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Publications', href: '#publications' },
  { label: 'Impact', href: '#impact' },
  { label: 'CV & Service', href: '#cv' },
  { label: 'Blog & Media', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

const academicLinks = [
  { label: 'Google Scholar', href: profileLinks.googleScholar },
  { label: 'ORCID', href: profileLinks.orcid },
  { label: 'ResearchGate', href: profileLinks.researchGate },
  { label: 'LinkedIn', href: profileLinks.linkedin },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__main">
          <div className="site-footer__identity">
            <a className="site-footer__name" href="#home">
              Temitope F. Egbedeyi
            </a>
            <p className="site-footer__role">
              Early Childhood Mathematics Education Researcher
            </p>
            <p className="site-footer__descriptor">
              Research <span aria-hidden="true">·</span> Teaching{' '}
              <span aria-hidden="true">·</span> Public Scholarship
            </p>
          </div>

          <nav className="site-footer__group" aria-label="Footer explore navigation">
            <p className="site-footer__heading">Explore</p>
            <ul>
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__group" aria-label="Academic profiles">
            <p className="site-footer__heading">Academic Profiles</p>
            <ul>
              {academicLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <span className="site-footer__external" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>© {year} Temitope F. Egbedeyi</p>
        </div>
      </div>
    </footer>
  )
}
