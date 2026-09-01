import { useId, useRef } from 'react'

const VALID_LAYOUTS = new Set([
  'compact',
  'standard',
  'wide',
  'full',
])

function normalizeLayout(layout) {
  const value = String(
    layout || 'standard'
  ).toLowerCase()

  return VALID_LAYOUTS.has(value)
    ? value
    : 'standard'
}

export default function ArticleFigure({
  src,
  alt,
  caption = '',
  credit = '',
  layout = 'standard',
  link = '',
  number,
}) {
  const dialogRef = useRef(null)
  const captionId = useId()
  const normalizedLayout =
    normalizeLayout(layout)

  if (!src) return null

  const openImage = () => {
    if (link) {
      window.open(
        link,
        '_blank',
        'noopener,noreferrer'
      )
      return
    }

    dialogRef.current?.showModal()
  }

  const closeImage = () => {
    dialogRef.current?.close()
  }

  const captionParts = []

  if (caption) {
    captionParts.push(
      number
        ? `Figure ${number}. ${caption}`
        : caption
    )
  } else if (number) {
    captionParts.push(`Figure ${number}.`)
  }

  return (
    <>
      <figure
        className={`article-figure article-figure--${normalizedLayout}`}
        aria-describedby={
          captionParts.length || credit
            ? captionId
            : undefined
        }
      >
        <button
          className="article-figure__image-button"
          type="button"
          onClick={openImage}
          aria-label={
            link
              ? `Open figure ${number || ''} source`
              : `Enlarge figure ${number || ''}`
          }
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
          />
        </button>

        {(captionParts.length > 0 ||
          credit) && (
          <figcaption id={captionId}>
            {captionParts.length > 0 && (
              <span className="article-figure__caption">
                {captionParts.join(' ')}
              </span>
            )}

            {credit && (
              <span className="article-figure__credit">
                {credit}
              </span>
            )}
          </figcaption>
        )}
      </figure>

      {!link && (
        <dialog
          ref={dialogRef}
          className="article-figure-dialog"
          onClick={(event) => {
            if (
              event.target ===
              dialogRef.current
            ) {
              closeImage()
            }
          }}
        >
          <button
            className="article-figure-dialog__close"
            type="button"
            onClick={closeImage}
            aria-label="Close enlarged figure"
          >
            ×
          </button>

          <img src={src} alt={alt} />

          {(caption || credit) && (
            <div className="article-figure-dialog__caption">
              {caption && (
                <p>
                  {number
                    ? `Figure ${number}. ${caption}`
                    : caption}
                </p>
              )}

              {credit && <small>{credit}</small>}
            </div>
          )}
        </dialog>
      )}
    </>
  )
}
