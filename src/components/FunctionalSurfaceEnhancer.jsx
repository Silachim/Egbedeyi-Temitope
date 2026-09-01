import { useEffect } from 'react'

const STATIC_TARGETS = new Map([
  ['.question-card', '/#research'],
  ['.about-question-grid article', '/#research'],
  ['.about-funded-grid article', '/#research'],
  ['.about-engagement-grid article', '/#cv'],
  ['.about-leadership-list article', '/#cv'],
  ['.about-recognition-grid article', '/#cv'],
  ['.impact-contribution-grid article', '/#research'],
  ['.impact-supported__list article', '/#research'],
])

const LINK_DRIVEN_SELECTORS = [
  '.visual-project-card',
  '.visual-practice-grid article',
  '.home-publication-list article',
  '.media-card-grid article',
  '.audience-card',
  '.pub-featured__card',
  '.bm-blog-card',
  '.bm-featured-post',
  '.bm-media-card',
  '.impact-pathway-list article',
  '.impact-media-grid article',
  '.blog-related-card',
]

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, [role="button"], [role="link"]'

function closestConfiguredSurface(target) {
  if (!(target instanceof Element)) return null

  for (const selector of STATIC_TARGETS.keys()) {
    const match = target.closest(selector)
    if (match) {
      return {
        element: match,
        href: STATIC_TARGETS.get(selector),
      }
    }
  }

  for (const selector of LINK_DRIVEN_SELECTORS) {
    const match = target.closest(selector)

    if (match) {
      const link = match.querySelector('a[href]')

      if (link) {
        return {
          element: match,
          href: link.getAttribute('href'),
          target: link.getAttribute('target'),
          rel: link.getAttribute('rel'),
        }
      }
    }
  }

  const gallery = target.closest('.bm-gallery-item')

  if (gallery) {
    const image = gallery.querySelector('img[src]')

    if (image) {
      return {
        element: gallery,
        href: image.currentSrc || image.src,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    }
  }

  return null
}

function isNestedInteractiveClick(eventTarget, surface) {
  if (!(eventTarget instanceof Element)) return false

  const interactive = eventTarget.closest(INTERACTIVE_SELECTOR)

  return Boolean(
    interactive &&
      interactive !== surface &&
      surface.contains(interactive)
  )
}

function openSurface({ href, target }) {
  if (!href) return

  if (target === '_blank') {
    window.open(href, '_blank', 'noopener,noreferrer')
    return
  }

  window.location.href = href
}

function markSurface(element, href) {
  if (!element || element.dataset.functionalSurface === 'true') {
    return
  }

  element.dataset.functionalSurface = 'true'
  element.dataset.functionalHref = href || ''

  if (!element.hasAttribute('tabindex')) {
    element.tabIndex = 0
  }

  if (!element.hasAttribute('role')) {
    element.setAttribute('role', 'link')
  }

  if (!element.hasAttribute('aria-label')) {
    const heading = element.querySelector('h2, h3, h4')
    const label =
      heading?.textContent?.trim() ||
      element.textContent?.trim()?.slice(0, 100)

    if (label) {
      element.setAttribute('aria-label', label)
    }
  }
}

function auditSurfaces() {
  for (const [selector, href] of STATIC_TARGETS.entries()) {
    document.querySelectorAll(selector).forEach((element) => {
      markSurface(element, href)
    })
  }

  for (const selector of LINK_DRIVEN_SELECTORS) {
    document.querySelectorAll(selector).forEach((element) => {
      const link = element.querySelector('a[href]')
      if (link) markSurface(element, link.getAttribute('href'))
    })
  }

  document
    .querySelectorAll('.bm-gallery-item')
    .forEach((element) => {
      const image = element.querySelector('img[src]')
      if (image) markSurface(element, image.currentSrc || image.src)
    })
}

export default function FunctionalSurfaceEnhancer() {
  useEffect(() => {
    auditSurfaces()

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(auditSurfaces)
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    const onClick = (event) => {
      const config = closestConfiguredSurface(event.target)
      if (!config) return

      if (
        isNestedInteractiveClick(
          event.target,
          config.element
        )
      ) {
        return
      }

      openSurface(config)
    }

    const onKeyDown = (event) => {
      if (
        event.key !== 'Enter' &&
        event.key !== ' '
      ) {
        return
      }

      if (!(event.target instanceof Element)) return

      const surface = event.target.closest(
        '[data-functional-surface="true"]'
      )

      if (!surface || surface !== event.target) return

      const config = closestConfiguredSurface(surface)
      if (!config) return

      event.preventDefault()
      openSurface(config)
    }

    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      observer.disconnect()
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return null
}
