import { useEffect, useRef, useState } from 'react'

const links = [
  ['about', 'About'],
  ['research', 'Research'],
  ['publications', 'Publications'],
  ['impact', 'Impact'],
  ['cv', 'CV & Service'],
  ['blog', 'Blog & Media'],
  ['contact', 'Contact'],
]

export default function Header({ currentRoute }) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => setOpen(false), [currentRoute])

  useEffect(() => {
    if (!open) return undefined

    const firstLink = navRef.current?.querySelector('a')
    firstLink?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    const onPointerDown = (event) => {
      if (
        !navRef.current?.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <header className="site-header">
      <a
        className="brand"
        href="/#home"
        aria-label="Temitope F. Egbedeyi home"
      >
        <span className="brand-mark" aria-hidden="true">
          TFE
        </span>
      </a>

      <nav
        ref={navRef}
        id="site-nav"
        className={`site-nav ${open ? 'is-open' : ''}`}
        aria-label="Primary navigation"
      >
        {links.map(([href, label]) => (
          <a
            key={href}
            href={`/#${href}`}
            className={currentRoute === href ? 'active' : ''}
            aria-current={currentRoute === href ? 'page' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        ref={buttonRef}
        className="menu-toggle"
        type="button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </header>
  )
}
