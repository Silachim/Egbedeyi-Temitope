const REQUIRED_FIELDS = [
  'title',
  'slug',
  'status',
  'subject',
  'format',
  'date',
  'excerpt',
]

function stripQuotes(value) {
  const text = String(value || '').trim()

  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    return text.slice(1, -1)
  }

  return text
}

function parseScalar(value) {
  const text = stripQuotes(value)

  if (text === 'true') return true
  if (text === 'false') return false
  if (text === 'null') return null

  return text
}

export function parseFrontMatter(raw) {
  const normalized = String(raw || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')

  if (!normalized.startsWith('---\n')) {
    return { data: {}, body: normalized }
  }

  const closing = normalized.indexOf('\n---\n', 4)

  if (closing === -1) {
    throw new Error('Front matter opens with --- but has no closing --- line.')
  }

  const frontMatter = normalized.slice(4, closing)
  const body = normalized.slice(closing + 5)
  const lines = frontMatter.split('\n')
  const data = {}
  let currentArrayKey = null

  for (const line of lines) {
    if (!line.trim()) continue

    const listMatch = line.match(/^\s*-\s*(.*)$/)

    if (listMatch && currentArrayKey) {
      const item = parseScalar(listMatch[1])
      if (item) data[currentArrayKey].push(item)
      continue
    }

    const keyMatch = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/)

    if (!keyMatch) continue

    const [, key, rawValue] = keyMatch

    if (rawValue.trim() === '') {
      data[key] = []
      currentArrayKey = key
    } else {
      data[key] = parseScalar(rawValue)
      currentArrayKey = null
    }
  }

  return { data, body }
}

export function countWords(text) {
  return String(text || '')
    .replace(/[#>*_`[\]()!-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

export function calculateReadingTime(text, wordsPerMinute = 220) {
  const words = countWords(text)
  return `${Math.max(1, Math.ceil(words / wordsPerMinute))} min read`
}

export function formatDisplayDate(isoDate) {
  if (!isoDate) return ''

  const date = new Date(`${isoDate}T12:00:00Z`)

  if (Number.isNaN(date.getTime())) return isoDate

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function normalizeLine(value = '') {
  return String(value)
    .replace(/\u00A0/g, ' ')
    .replace(/\u2007/g, ' ')
    .replace(/\u202F/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim()
}

function plainMarkdownLabel(value = '') {
  return normalizeLine(value)
    .replace(/^#{1,6}\s*/, '')
    .replace(/^\*{1,3}/, '')
    .replace(/\*{1,3}$/, '')
    .replace(/^_{1,3}/, '')
    .replace(/_{1,3}$/, '')
    .trim()
}

function isReferenceHeading(value = '') {
  return /^(references?|bibliography)$/i.test(plainMarkdownLabel(value))
}

function splitReferenceSection(markdown) {
  const normalized = String(markdown || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')

  const lines = normalized.split('\n')
  let referenceIndex = -1

  for (let i = 0; i < lines.length; i += 1) {
    if (isReferenceHeading(lines[i])) {
      referenceIndex = i
      break
    }
  }

  if (referenceIndex === -1) {
    return {
      mainMarkdown: normalized,
      referenceText: '',
    }
  }

  return {
    mainMarkdown: lines.slice(0, referenceIndex).join('\n'),
    referenceText: lines.slice(referenceIndex + 1).join('\n'),
  }
}

function splitReferenceEntries(referenceText) {
  const text = String(referenceText || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!text) return []

  // Detect the start of a new scholarly reference anywhere in the text.
  // Examples:
  // Darling-Hammond, L. (2007).
  // Lareau, A. (2002).
  // Morgan, H. (2020).
  const authorYearPattern =
    /(?=(?:^|\s)([A-ZÀ-ÖØ-Þ][A-Za-zÀ-ÖØ-öø-ÿ'’.\-‐–—]+(?:\s+[A-ZÀ-ÖØ-Þ][A-Za-zÀ-ÖØ-öø-ÿ'’.\-‐–—]+)*,\s*(?:[A-Z]\.)+(?:\s*[A-Z]\.)?\s*\((?:(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+)?\d{4}[a-z]?\)\.))/gi

  const starts = []
  let match

  while ((match = authorYearPattern.exec(text)) !== null) {
    const rawIndex = match.index
    const index = rawIndex > 0 && /\s/.test(text[rawIndex]) ? rawIndex + 1 : rawIndex
    starts.push(index)

    // Protect against zero-width lookahead looping forever.
    authorYearPattern.lastIndex = Math.max(authorYearPattern.lastIndex, match.index + 1)
  }

  if (starts.length <= 1) {
    return [text]
  }

  const entries = []

  for (let i = 0; i < starts.length; i += 1) {
    const start = starts[i]
    const end = i + 1 < starts.length ? starts[i + 1] : text.length
    const entry = text.slice(start, end).trim()

    if (entry) entries.push(entry)
  }

  return entries
}

function parseMainMarkdown(markdown) {
  const lines = String(markdown || '').split('\n')
  const blocks = []

  let paragraph = []
  let listItems = []
  let orderedItems = []
  let quoteLines = []

  const flushParagraph = () => {
    if (!paragraph.length) return

    blocks.push({
      type: 'paragraph',
      text: paragraph.join(' ').trim(),
    })

    paragraph = []
  }

  const flushList = () => {
    if (!listItems.length) return
    blocks.push({ type: 'list', items: listItems })
    listItems = []
  }

  const flushOrderedList = () => {
    if (!orderedItems.length) return
    blocks.push({ type: 'ordered-list', items: orderedItems })
    orderedItems = []
  }

  const flushQuote = () => {
    if (!quoteLines.length) return

    blocks.push({
      type: 'quote',
      text: quoteLines.join(' ').trim(),
    })

    quoteLines = []
  }

  const flushAll = () => {
    flushParagraph()
    flushList()
    flushOrderedList()
    flushQuote()
  }

  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = normalizeLine(lines[index])

    if (!trimmed) {
      flushAll()
      continue
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/)

    if (heading) {
      flushAll()
      blocks.push({
        type: 'heading',
        level: Math.max(2, heading[1].length),
        text: heading[2].trim(),
      })
      continue
    }

    const quote = trimmed.match(/^>\s?(.*)$/)

    if (quote) {
      flushParagraph()
      flushList()
      flushOrderedList()
      quoteLines.push(quote[1])
      continue
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/)

    if (unordered) {
      flushParagraph()
      flushQuote()
      flushOrderedList()
      listItems.push(unordered[1].trim())
      continue
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/)

    if (ordered) {
      flushParagraph()
      flushQuote()
      flushList()
      orderedItems.push(ordered[1].trim())
      continue
    }

    flushList()
    flushOrderedList()
    flushQuote()
    paragraph.push(trimmed)
  }

  flushAll()
  return blocks
}

export function markdownToBlocks(markdown) {
  const { mainMarkdown, referenceText } = splitReferenceSection(markdown)
  const blocks = parseMainMarkdown(mainMarkdown)

  if (referenceText.trim()) {
    blocks.push({
      type: 'heading',
      level: 2,
      text: 'References',
    })

    for (const entry of splitReferenceEntries(referenceText)) {
      blocks.push({
        type: 'reference',
        text: entry,
      })
    }
  }

  return blocks
}

export function validatePostMetadata(data, sourceName = 'post') {
  const errors = []

  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) {
      errors.push(`${sourceName}: missing required field "${field}"`)
    }
  }

  if (
    data.status &&
    !['draft', 'published', 'archived'].includes(data.status)
  ) {
    errors.push(`${sourceName}: status must be draft, published, or archived`)
  }

  if (
    data.slug &&
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)
  ) {
    errors.push(
      `${sourceName}: slug must contain lowercase letters, numbers, and hyphens only`
    )
  }

  return errors
}

export function parseMarkdownPost(raw, sourceName = 'post.md') {
  const { data, body } = parseFrontMatter(raw)
  const errors = validatePostMetadata(data, sourceName)

  if (errors.length) {
    throw new Error(errors.join('\n'))
  }

  return {
    ...data,
    isoDate: data.date,
    date: formatDisplayDate(data.date),
    readingTime: calculateReadingTime(body),
    tags: Array.isArray(data.tags) ? data.tags.filter(Boolean) : [],
    featured: data.featured === true,
    content: markdownToBlocks(body),
    rawBody: body.trim(),
    sourceName,
  }
}
