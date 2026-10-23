
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
  const text = String(value ?? '').trim()

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
  const normalized = String(raw ?? '')
    .replace(/\r\n?/g, '\n')

  if (!normalized.startsWith('---\n')) {
    return { data: {}, body: normalized }
  }

  const closing = normalized.indexOf('\n---\n', 4)

  if (closing === -1) {
    throw new Error(
      'Front matter opens with --- but has no closing --- line.'
    )
  }

  const frontMatter = normalized.slice(4, closing)
  const body = normalized.slice(closing + 5)
  const data = {}
  let currentArrayKey = null

  for (const line of frontMatter.split('\n')) {
    if (!line.trim()) continue

    const listMatch = line.match(/^\s*-\s*(.*)$/)

    if (listMatch && currentArrayKey) {
      const item = parseScalar(listMatch[1])

      if (item) {
        data[currentArrayKey].push(item)
      }

      continue
    }

    const keyMatch = line.match(
      /^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/
    )

    if (!keyMatch) continue

    const [, key, rawValue] = keyMatch

    if (rawValue.trim() === '') {
      data[key] = []
      currentArrayKey = null
      currentArrayKey = key
    } else {
      data[key] = parseScalar(rawValue)
      currentArrayKey = null
    }
  }

  return { data, body }
}

export function countWords(text) {
  return String(text ?? '')
    .replace(/[#>*_`\[\]()!-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length
}

export function calculateReadingTime(
  text,
  wordsPerMinute = 220
) {
  const words = countWords(text)

  return `${
    Math.max(1, Math.ceil(words / wordsPerMinute))
  } min read`
}

export function formatDisplayDate(isoDate) {
  if (!isoDate) return ''

  const date = new Date(`${isoDate}T12:00:00Z`)

  if (Number.isNaN(date.getTime())) {
    return isoDate
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function normalizeLine(value = '') {
  return String(value)
    .replace(/[\u00A0\u2007\u202F]/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim()
}

function plainMarkdownLabel(value = '') {
  return normalizeLine(value)
    .replace(/^#{1,6}\s*/, '')
    .replace(/^\*{1,3}|\*{1,3}$/g, '')
    .replace(/^_{1,3}|_{1,3}$/g, '')
    .trim()
}

function isReferenceHeading(value = '') {
  return /^(references?|bibliography)$/i.test(
    plainMarkdownLabel(value)
  )
}

function splitReferenceSection(markdown) {
  const normalized = String(markdown ?? '')
    .replace(/\r\n?/g, '\n')

  const lines = normalized.split('\n')
  const referenceIndex = lines.findIndex(
    isReferenceHeading
  )

  if (referenceIndex === -1) {
    return {
      mainMarkdown: normalized,
      referenceText: '',
    }
  }

  return {
    mainMarkdown: lines
      .slice(0, referenceIndex)
      .join('\n'),

    referenceText: lines
      .slice(referenceIndex + 1)
      .join('\n'),
  }
}

/**
 * Splits manually written references into separate entries.
 *
 * Each reference must be separated by a blank line.
 * Wrapped lines within one reference are combined.
 *
 * This avoids unreliable author/year detection,
 * including problems with institutional authors
 * and publications listed as "in press".
 */
function splitReferenceEntries(referenceText) {
  const normalized = String(referenceText ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/\u00A0/g, ' ')
    .trim()

  if (!normalized) return []

  return normalized
    .split(/\n[ \t]*\n+/)
    .map((entry) =>
      entry
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .join(' ')
        .replace(/[ \t]+/g, ' ')
        .trim()
    )
    .filter(Boolean)
}

function parseFigureDirective(lines, startIndex) {
  const data = {
    src: '',
    alt: '',
    caption: '',
    credit: '',
    layout: 'standard',
    link: '',
  }

  let index = startIndex + 1

  while (index < lines.length) {
    const raw = lines[index]
    const trimmed = normalizeLine(raw)

    if (/^\[\[\/figure\]\]$/i.test(trimmed)) {
      return {
        block: {
          type: 'figure',
          ...data,
        },
        endIndex: index,
      }
    }

    const match = raw.match(
      /^\s*(src|alt|caption|credit|layout|link)\s*:\s*(.*)$/i
    )

    if (match) {
      const key = match[1].toLowerCase()
      data[key] = stripQuotes(match[2])
    }

    index += 1
  }

  throw new Error(
    'Figure block opens with [[figure]] but has no closing [[/figure]].'
  )
}

function parseMarkdownImage(line) {
  const match = normalizeLine(line).match(
    /^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)$/
  )

  if (!match) return null

  return {
    type: 'figure',
    alt: match[1].trim(),
    src: match[2].trim(),
    caption: (match[3] || '').trim(),
    credit: '',
    layout: 'standard',
    link: '',
  }
}

function parseMainMarkdown(markdown) {
  const lines = String(markdown ?? '').split('\n')
  const blocks = []

  let paragraph = []
  let listItems = []
  let orderedItems = []
  let quoteLines = []

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({
        type: 'paragraph',
        text: paragraph.join(' ').trim(),
      })
    }

    paragraph = []
  }

  const flushList = () => {
    if (listItems.length) {
      blocks.push({
        type: 'list',
        items: listItems,
      })
    }

    listItems = []
  }

  const flushOrderedList = () => {
    if (orderedItems.length) {
      blocks.push({
        type: 'ordered-list',
        items: orderedItems,
      })
    }

    orderedItems = []
  }

  const flushQuote = () => {
    if (quoteLines.length) {
      blocks.push({
        type: 'quote',
        text: quoteLines.join(' ').trim(),
      })
    }

    quoteLines = []
  }

  const flushAll = () => {
    flushParagraph()
    flushList()
    flushOrderedList()
    flushQuote()
  }

  for (
    let index = 0;
    index < lines.length;
    index += 1
  ) {
    const trimmed = normalizeLine(lines[index])

    if (!trimmed) {
      flushAll()
      continue
    }

    if (/^\[\[figure\]\]$/i.test(trimmed)) {
      flushAll()

      const figure = parseFigureDirective(
        lines,
        index
      )

      blocks.push(figure.block)
      index = figure.endIndex

      continue
    }

    const markdownImage = parseMarkdownImage(
      lines[index]
    )

    if (markdownImage) {
      flushAll()
      blocks.push(markdownImage)
      continue
    }

    const heading = trimmed.match(
      /^(#{1,4})\s+(.+)$/
    )

    if (heading) {
      flushAll()

      blocks.push({
        type: 'heading',
        level: Math.max(
          2,
          heading[1].length
        ),
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

    const unordered = trimmed.match(
      /^[-*]\s+(.+)$/
    )

    if (unordered) {
      flushParagraph()
      flushQuote()
      flushOrderedList()
      listItems.push(unordered[1].trim())
      continue
    }

    const ordered = trimmed.match(
      /^\d+\.\s+(.+)$/
    )

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
  const {
    mainMarkdown,
    referenceText,
  } = splitReferenceSection(markdown)

  const blocks = parseMainMarkdown(
    mainMarkdown
  )

  if (referenceText.trim()) {
    blocks.push({
      type: 'heading',
      level: 2,
      text: 'References',
    })

    for (
      const entry of splitReferenceEntries(
        referenceText
      )
    ) {
      blocks.push({
        type: 'reference',
        text: entry,
      })
    }
  }

  return blocks
}

export function getPostFigures(post) {
  return Array.isArray(post?.content)
    ? post.content.filter(
        (block) => block.type === 'figure'
      )
    : []
}

export function validatePostMetadata(
  data,
  sourceName = 'post'
) {
  const errors = []

  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) {
      errors.push(
        `${sourceName}: missing required field "${field}"`
      )
    }
  }

  if (
    data.status &&
    ![
      'draft',
      'published',
      'archived',
    ].includes(data.status)
  ) {
    errors.push(
      `${sourceName}: status must be draft, published, or archived`
    )
  }

  if (
    data.slug &&
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
      data.slug
    )
  ) {
    errors.push(
      `${sourceName}: slug must contain lowercase letters, numbers, and hyphens only`
    )
  }

  return errors
}

export function parseMarkdownPost(
  raw,
  sourceName = 'post.md'
) {
  const { data, body } = parseFrontMatter(raw)

  const errors = validatePostMetadata(
    data,
    sourceName
  )

  if (errors.length) {
    throw new Error(
      errors.join('\n')
    )
  }

  const content = markdownToBlocks(body)

  return {
    ...data,

    isoDate: data.date,

    date: formatDisplayDate(
      data.date
    ),

    readingTime: calculateReadingTime(
      body
    ),

    tags: Array.isArray(data.tags)
      ? data.tags.filter(Boolean)
      : [],

    featured: data.featured === true,

    content,

    figures: content.filter(
      (block) => block.type === 'figure'
    ),

    rawBody: body.trim(),

    sourceName,
  }
}
