import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import { applyRouteMeta } from './seo/routeMeta.js'
import { getBlogPostBySlug } from './data/blogContent.js'

const About = lazy(() => import('./pages/About.jsx'))
const Research = lazy(() => import('./pages/Research.jsx'))
const Publications = lazy(() => import('./pages/Publications.jsx'))
const CV = lazy(() => import('./pages/CV.jsx'))
const Media = lazy(() => import('./pages/Media.jsx'))
const ResearchImpact = lazy(() => import('./pages/ResearchImpact.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

const routes = {
  home: Home,
  about: About,
  research: Research,
  publications: Publications,
  cv: CV,
  blog: Media,
  impact: ResearchImpact,
  contact: Contact,
}

function getHashState() {
  const rawHash = window.location.hash.replace(/^#\/?/, '')

  if (!rawHash) return null

  const [route, ...rest] = rawHash.split('/')
  const normalizedRoute =
    route.toLowerCase() === 'media'
      ? 'blog'
      : route.toLowerCase()

  if (!routes[normalizedRoute]) return null

  return {
    route: normalizedRoute,
    slug: rest.join('/'),
    previewDraft: false,
  }
}

function getPathState() {
  const parts = window.location.pathname
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)

  if (parts[0]?.toLowerCase() === 'blog-preview') {
    return {
      route: 'blog',
      slug: decodeURIComponent(parts.slice(1).join('/')),
      previewDraft: true,
    }
  }

  if (parts[0]?.toLowerCase() === 'blog') {
    return {
      route: 'blog',
      slug: decodeURIComponent(parts.slice(1).join('/')),
      previewDraft: false,
    }
  }

  return null
}

function getRouteState() {
  // A valid navigation hash should win over an existing nested blog pathname.
  // This prevents /blog/article/#cv from remaining on the article.
  const hashState = getHashState()
  if (hashState) return hashState

  const pathState = getPathState()
  if (pathState) return pathState

  return {
    route: 'home',
    slug: '',
    previewDraft: false,
  }
}

export default function App() {
  const [routeState, setRouteState] = useState(getRouteState())
  const firstRender = useRef(true)

  useEffect(() => {
    const update = () => setRouteState(getRouteState())

    window.addEventListener('hashchange', update)
    window.addEventListener('popstate', update)

    return () => {
      window.removeEventListener('hashchange', update)
      window.removeEventListener('popstate', update)
    }
  }, [])

  const Page = useMemo(() => {
    if (routeState.route === 'blog' && routeState.slug) {
      return BlogPost
    }

    return routes[routeState.route] || Home
  }, [routeState])

  useEffect(() => {
    const post =
      routeState.route === 'blog' && routeState.slug
        ? getBlogPostBySlug(routeState.slug)
        : null

    if (!routeState.previewDraft) {
      applyRouteMeta(routeState.route, {
        post,
        isBlogPost:
          routeState.route === 'blog' &&
          Boolean(routeState.slug),
      })
    }

    window.scrollTo({ top: 0, behavior: 'auto' })

    if (firstRender.current) {
      firstRender.current = false
    } else {
      document.getElementById('main-content')?.focus()
    }
  }, [routeState])

  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
      >
        Skip to main content
      </a>

      <Header currentRoute={routeState.route} />

      <main id="main-content" tabIndex="-1">
        <Suspense
          fallback={
            <div
              className="route-loading"
              role="status"
              aria-live="polite"
            >
              Loading page…
            </div>
          }
        >
          <Page
            slug={routeState.slug}
            previewDraft={routeState.previewDraft}
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
