const STYLE_ALIASES = {
  standard: 'standard',
  apa: 'apa',
  harvard: 'harvard',
  'chicago author-date': 'chicago-author-date',
  'chicago-author-date': 'chicago-author-date',
  mla: 'mla',
  vancouver: 'vancouver',
  custom: 'custom',
}

export const supportedReferenceStyles = [
  'Standard',
  'APA',
  'Harvard',
  'Chicago Author-Date',
  'MLA',
  'Vancouver',
  'Custom',
]

export function normalizeReferenceStyle(style = 'Standard') {
  const key = String(style).trim().toLowerCase()
  return STYLE_ALIASES[key] || 'standard'
}

function authorList(reference) {
  if (Array.isArray(reference.authors) && reference.authors.length) {
    return reference.authors.filter(Boolean)
  }

  if (reference.author) {
    return [reference.author]
  }

  return []
}

function joinAuthors(authors, finalJoiner = ' & ') {
  if (!authors.length) return ''
  if (authors.length === 1) return authors[0]
  if (authors.length === 2) return authors.join(finalJoiner)
  return `${authors.slice(0, -1).join(', ')},${finalJoiner}${authors.at(-1)}`
}

function titleCaseSentence(title = '') {
  return String(title).trim()
}

function issueText(reference) {
  if (!reference.volume) return ''
  return reference.issue
    ? `${reference.volume}(${reference.issue})`
    : String(reference.volume)
}

function pagesText(reference) {
  return reference.pages ? String(reference.pages).replace(/-/g, '–') : ''
}

function doiOrUrl(reference) {
  if (reference.doi) {
    const doi = String(reference.doi)
      .replace(/^https?:\/\/doi\.org\//i, '')
      .replace(/^doi:\s*/i, '')
    return `https://doi.org/${doi}`
  }

  return reference.url || ''
}

function journalTail(reference, punctuation = '.') {
  const journal = reference.journal || reference.containerTitle || ''
  const volumeIssue = issueText(reference)
  const pages = pagesText(reference)
  const parts = []

  if (journal) parts.push(`*${journal}*`)
  if (volumeIssue) parts.push(`*${volumeIssue}*`)
  if (pages) parts.push(pages)

  return parts.length ? `${parts.join(', ')}${punctuation}` : ''
}

function formatApa(reference) {
  const authors = joinAuthors(authorList(reference))
  const year = reference.year ? `(${reference.year}).` : '(n.d.).'
  const title = `${titleCaseSentence(reference.title)}.`
  const journal = journalTail(reference)
  const locator = doiOrUrl(reference)

  return [authors, year, title, journal, locator]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatHarvard(reference) {
  const authors = joinAuthors(authorList(reference), ' and ')
  const year = reference.year || 'n.d.'
  const title = `'${titleCaseSentence(reference.title)}'`
  const journal = reference.journal || reference.containerTitle || ''
  const volumeIssue = issueText(reference)
  const pages = pagesText(reference)
  const locator = doiOrUrl(reference)

  let text = `${authors} (${year}) ${title}`

  if (journal) text += `, *${journal}*`
  if (volumeIssue) text += `, ${volumeIssue}`
  if (pages) text += `, pp. ${pages}`
  text += '.'
  if (locator) text += ` ${locator}`

  return text.replace(/\s+/g, ' ').trim()
}

function formatChicagoAuthorDate(reference) {
  const authors = joinAuthors(authorList(reference), ' and ')
  const year = reference.year || 'n.d.'
  const title = `"${titleCaseSentence(reference.title)}."`
  const journal = reference.journal || reference.containerTitle || ''
  const volumeIssue = issueText(reference)
  const pages = pagesText(reference)
  const locator = doiOrUrl(reference)

  let text = `${authors}. ${year}. ${title}`

  if (journal) text += ` *${journal}*`
  if (volumeIssue) text += ` ${volumeIssue}`
  if (pages) text += `: ${pages}`
  text += '.'
  if (locator) text += ` ${locator}.`

  return text.replace(/\s+/g, ' ').trim()
}

function formatMla(reference) {
  const authors = joinAuthors(authorList(reference), ', and ')
  const title = `"${titleCaseSentence(reference.title)}."`
  const journal = reference.journal || reference.containerTitle || ''
  const volume = reference.volume ? `vol. ${reference.volume}` : ''
  const issue = reference.issue ? `no. ${reference.issue}` : ''
  const year = reference.year || ''
  const pages = pagesText(reference)
  const locator = doiOrUrl(reference)

  let text = `${authors}. ${title}`

  if (journal) text += ` *${journal}*`
  if (volume) text += `, ${volume}`
  if (issue) text += `, ${issue}`
  if (year) text += `, ${year}`
  if (pages) text += `, pp. ${pages}`
  text += '.'
  if (locator) text += ` ${locator}.`

  return text.replace(/\s+/g, ' ').trim()
}

function formatVancouver(reference, index) {
  const authors = joinAuthors(authorList(reference), ', ')
  const title = `${titleCaseSentence(reference.title)}.`
  const journal = reference.journal || reference.containerTitle || ''
  const year = reference.year || ''
  const volumeIssue = issueText(reference)
  const pages = pagesText(reference)
  const locator = doiOrUrl(reference)

  let text = `${index + 1}. ${authors}. ${title}`

  if (journal) text += ` ${journal}.`
  if (year) text += ` ${year}`
  if (volumeIssue) text += `;${volumeIssue}`
  if (pages) text += `:${pages}`
  text += '.'
  if (locator) text += ` ${locator}.`

  return text.replace(/\s+/g, ' ').trim()
}

export function formatReference(reference, style = 'Standard', index = 0) {
  const normalized = normalizeReferenceStyle(style)

  if (reference.formatted && (normalized === 'standard' || normalized === 'custom')) {
    return reference.formatted
  }

  if (normalized === 'apa') return formatApa(reference)
  if (normalized === 'harvard') return formatHarvard(reference)
  if (normalized === 'chicago-author-date') {
    return formatChicagoAuthorDate(reference)
  }
  if (normalized === 'mla') return formatMla(reference)
  if (normalized === 'vancouver') return formatVancouver(reference, index)

  return formatApa(reference)
}

export function formatReferenceList(references = [], style = 'Standard') {
  return references.map((reference, index) => ({
    ...reference,
    formattedText: formatReference(reference, style, index),
  }))
}

export function validateStructuredReference(reference, index = 0) {
  const errors = []
  const label = `Reference ${index + 1}`

  if (!authorList(reference).length) {
    errors.push(`${label}: author or authors is required`)
  }

  if (!reference.year) {
    errors.push(`${label}: year is required`)
  }

  if (!reference.title) {
    errors.push(`${label}: title is required`)
  }

  if (!reference.journal && !reference.containerTitle && !reference.publisher) {
    errors.push(
      `${label}: journal, containerTitle, or publisher is required`
    )
  }

  return errors
}
