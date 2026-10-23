
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
  const key = String(style ?? 'Standard').trim().toLowerCase()
  return STYLE_ALIASES[key] || 'standard'
}

function clean(value) {
  return String(value ?? '').trim()
}

function authorList(reference) {
  if (Array.isArray(reference?.authors) && reference.authors.length) {
    return reference.authors.map(clean).filter(Boolean)
  }

  return reference?.author ? [clean(reference.author)] : []
}

function joinAuthors(authors, finalJoiner = ' & ') {
  if (!authors.length) return ''
  if (authors.length === 1) return authors[0]
  if (authors.length === 2) return authors.join(finalJoiner)

  return `${authors.slice(0, -1).join(', ')},${finalJoiner}${authors.at(-1)}`
}

function titleCaseSentence(title = '') {
  return clean(title)
}

function endWithPeriod(value) {
  const text = clean(value)
  if (!text) return ''

  return /[.!?]$/.test(text) ? text : `${text}.`
}

function issueText(reference) {
  const volume = clean(reference.volume)
  const issue = clean(reference.issue)

  if (!volume) return ''

  return issue ? `${volume}(${issue})` : volume
}

function pagesText(reference) {
  return clean(reference.pages).replace(/(\d)-(\d)/g, '$1–$2')
}

function normalizeDoi(value) {
  return clean(value)
    .replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '')
    .replace(/^doi:\s*/i, '')
}

function doiOrUrl(reference) {
  if (reference.doi) {
    const doi = normalizeDoi(reference.doi)
    const url = `https://doi.org/${doi}`
    return `[${url}](${url})`
  }

  return clean(reference.url)
}

function italicize(value) {
  const text = clean(value)
  return text ? `*${text}*` : ''
}

function journalTail(reference, punctuation = '.') {
  const journal = clean(reference.journal || reference.containerTitle)
  const volumeIssue = issueText(reference)
  const pages = pagesText(reference)
  const parts = []

  if (journal) parts.push(italicize(journal))
  if (volumeIssue) parts.push(italicize(volumeIssue))
  if (pages) parts.push(pages)

  return parts.length ? `${parts.join(', ')}${punctuation}` : ''
}

function editorList(reference) {
  const value = reference.editors || reference.editor

  if (Array.isArray(value)) {
    return value.map(clean).filter(Boolean)
  }

  return value ? [clean(value)] : []
}

function formatApaEditors(reference) {
  const editors = editorList(reference)
  if (!editors.length) return ''

  const names = joinAuthors(editors)
  const label = editors.length === 1 ? 'Ed.' : 'Eds.'

  return `${names} (${label})`
}

function formatApaJournal(reference) {
  const journal = clean(reference.journal)
  const volume = clean(reference.volume)
  const issue = clean(reference.issue)
  const pages = pagesText(reference)

  if (!journal) return ''

  let text = italicize(journal)

  if (volume) {
    text += `, ${italicize(volume)}`
    if (issue) text += `(${issue})`
  } else if (issue) {
    text += `, (${issue})`
  }

  if (pages) text += `, ${pages}`

  return endWithPeriod(text)
}

function formatApaProceedings(reference) {
  const container = clean(reference.containerTitle)
  const editors = formatApaEditors(reference)
  const pages = pagesText(reference)
  const publisher = clean(reference.publisher)

  if (!container) {
    return publisher ? endWithPeriod(publisher) : ''
  }

  let text = 'In '

  if (editors) {
    text += `${editors}, `
  }

  text += italicize(container)

  if (pages) {
    text += ` (pp. ${pages})`
  }

  text += '.'

  if (publisher) {
    text += ` ${endWithPeriod(publisher)}`
  }

  return text
}

function formatApa(reference) {
  const authors = joinAuthors(authorList(reference))
  const year = clean(reference.year) || 'n.d.'
  const title = endWithPeriod(titleCaseSentence(reference.title))
  const locator = doiOrUrl(reference)

  let publication = ''

  if (reference.journal) {
    publication = formatApaJournal(reference)
  } else if (reference.containerTitle) {
    publication = formatApaProceedings(reference)
  } else if (reference.publisher) {
    publication = endWithPeriod(reference.publisher)
  }

  return [
    authors,
    `(${year}).`,
    title,
    publication,
    locator,
  ]
    .filter(Boolean)
    .join(' ')
    .replace(/[ \t]+/g, ' ')
    .trim()
}

function formatHarvard(reference) {
  const authors = joinAuthors(authorList(reference), ' and ')
  const year = clean(reference.year) || 'n.d.'
  const title = `'${titleCaseSentence(reference.title)}'`
  const journal = clean(reference.journal || reference.containerTitle)
  const volumeIssue = issueText(reference)
  const pages = pagesText(reference)
  const locator = doiOrUrl(reference)

  let text = `${authors} (${year}) ${title}`

  if (journal) text += `, ${italicize(journal)}`
  if (volumeIssue) text += `, ${volumeIssue}`
  if (pages) text += `, pp. ${pages}`

  text += '.'
  if (locator) text += ` ${locator}`

  return text.replace(/[ \t]+/g, ' ').trim()
}

function formatChicagoAuthorDate(reference) {
  const authors = joinAuthors(authorList(reference), ' and ')
  const year = clean(reference.year) || 'n.d.'
  const title = `"${endWithPeriod(titleCaseSentence(reference.title))}"`
  const journal = clean(reference.journal || reference.containerTitle)
  const volumeIssue = issueText(reference)
  const pages = pagesText(reference)
  const locator = doiOrUrl(reference)

  let text = `${authors}. ${year}. ${title}`

  if (journal) text += ` ${italicize(journal)}`
  if (volumeIssue) text += ` ${volumeIssue}`
  if (pages) text += `: ${pages}`

  text += '.'
  if (locator) text += ` ${locator}`

  return text.replace(/[ \t]+/g, ' ').trim()
}

function formatMla(reference) {
  const authors = joinAuthors(authorList(reference), ', and ')
  const title = `"${endWithPeriod(titleCaseSentence(reference.title))}"`
  const journal = clean(reference.journal || reference.containerTitle)
  const volume = reference.volume ? `vol. ${reference.volume}` : ''
  const issue = reference.issue ? `no. ${reference.issue}` : ''
  const year = clean(reference.year)
  const pages = pagesText(reference)
  const locator = doiOrUrl(reference)

  let text = `${authors}. ${title}`

  if (journal) text += ` ${italicize(journal)}`
  if (volume) text += `, ${volume}`
  if (issue) text += `, ${issue}`
  if (year) text += `, ${year}`
  if (pages) text += `, pp. ${pages}`

  text += '.'
  if (locator) text += ` ${locator}`

  return text.replace(/[ \t]+/g, ' ').trim()
}

function formatVancouver(reference, index) {
  const authors = joinAuthors(authorList(reference), ', ')
  const title = endWithPeriod(titleCaseSentence(reference.title))
  const journal = clean(reference.journal || reference.containerTitle)
  const year = clean(reference.year)
  const volumeIssue = issueText(reference)
  const pages = pagesText(reference)
  const locator = doiOrUrl(reference)

  let text = `${index + 1}. ${authors}. ${title}`

  if (journal) text += ` ${endWithPeriod(journal)}`
  if (year) text += ` ${year}`
  if (volumeIssue) text += `;${volumeIssue}`
  if (pages) text += `:${pages}`

  text += '.'
  if (locator) text += ` ${locator}`

  return text.replace(/[ \t]+/g, ' ').trim()
}

export function formatReference(
  reference,
  style = 'Standard',
  index = 0
) {
  const normalized = normalizeReferenceStyle(style)

  // Preserve manually prepared citations for Standard and Custom.
  if (
    reference.formatted &&
    (normalized === 'standard' || normalized === 'custom')
  ) {
    return reference.formatted
  }

  if (normalized === 'apa') {
    return formatApa(reference)
  }

  if (normalized === 'harvard') {
    return formatHarvard(reference)
  }

  if (normalized === 'chicago-author-date') {
    return formatChicagoAuthorDate(reference)
  }

  if (normalized === 'mla') {
    return formatMla(reference)
  }

  if (normalized === 'vancouver') {
    return formatVancouver(reference, index)
  }

  return formatApa(reference)
}

export function formatReferenceList(
  references = [],
  style = 'Standard'
) {
  return references.map((reference, index) => ({
    ...reference,
    formattedText: formatReference(reference, style, index),
  }))
}

export function validateStructuredReference(
  reference,
  index = 0
) {
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

  if (
    !reference.journal &&
    !reference.containerTitle &&
    !reference.publisher
  ) {
    errors.push(
      `${label}: journal, containerTitle, or publisher is required`
    )
  }

  return errors
}
