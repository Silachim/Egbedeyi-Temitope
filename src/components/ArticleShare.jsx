// src/components/ArticleShare.jsx

import { useState } from 'react'

function buildShareLinks({ title, url, excerpt = '' }) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(
    `${title}\n\n${excerpt}\n\n${url}`
  )

  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}`,
  }
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'

  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export default function ArticleShare({
  title,
  url,
  excerpt = '',
}) {
  const [copied, setCopied] = useState(false)

  const links = buildShareLinks({
    title,
    url,
    excerpt,
  })

  const handleCopy = async () => {
    try {
      await copyText(url)

      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section
      className="article-share"
      aria-labelledby="article-share-heading"
    >
      <div className="article-share__intro">
        <p className="blog-post-kicker">
          SHARE THIS ARTICLE
        </p>

        <h2 id="article-share-heading">
          Continue the conversation
        </h2>

        <p>
          Share this article with your network or copy
          the permanent link.
        </p>
      </div>

      <div
        className="article-share__actions"
        aria-label="Article sharing options"
      >
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>

        <a
          href={links.x}
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>

        <a
          href={links.facebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>

        <a
          href={links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>

        <a href={links.email}>
          Email
        </a>

        <button
          type="button"
          onClick={handleCopy}
        >
          {copied ? 'Link copied ✓' : 'Copy link'}
        </button>
      </div>
    </section>
  )
}