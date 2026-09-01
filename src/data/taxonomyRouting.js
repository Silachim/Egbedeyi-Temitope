const clean = (value = '') =>
  String(value).trim().replace(/\s+/g, ' ')

export function normalizeTaxonomyTerm(value = '') {
  return clean(value).toLowerCase()
}

export function buildBlogTaxonomyHref({
  subject = '',
  format = '',
  tag = '',
} = {}) {
  const params = new URLSearchParams()

  if (subject && subject !== 'All') params.set('subject', subject)
  if (format && format !== 'All') params.set('format', format)
  if (tag && tag !== 'All') params.set('tag', tag)

  const query = params.toString()
  return `/${query ? `?${query}` : ''}#blog`
}

export function readBlogTaxonomyState(
  search = window.location.search
) {
  const params = new URLSearchParams(search)

  return {
    subject: params.get('subject') || 'All',
    format: params.get('format') || 'All',
    tag: params.get('tag') || 'All',
  }
}

export function replaceBlogTaxonomyUrl(filters = {}) {
  const href = buildBlogTaxonomyHref(filters)

  if (typeof window !== 'undefined') {
    window.history.replaceState({}, '', href)
  }

  return href
}

export function postMatchesTaxonomy(
  post,
  {
    subject = 'All',
    format = 'All',
    tag = 'All',
  } = {}
) {
  const subjectMatch =
    subject === 'All' || post.subject === subject

  const formatMatch =
    format === 'All' || post.format === format

  const tagMatch =
    tag === 'All' ||
    (post.tags || []).some(
      (item) =>
        normalizeTaxonomyTerm(item) ===
        normalizeTaxonomyTerm(tag)
    )

  return subjectMatch && formatMatch && tagMatch
}

const researchTopicAliases = {
  "Children's Mathematical Thinking": [
    "children's mathematical thinking",
    "children's mathematical reasoning",
    'mathematical reasoning',
    'strategies',
    'errors',
    'multiplication',
    'division',
    'decimals',
    'fractions',
  ],
  'Multiplicative Reasoning': [
    'multiplicative reasoning',
    'multiplication',
    'division',
    'multi-digit multiplication',
  ],
  'Sociomathematical Norms': [
    'sociomathematical norms',
    'classroom discourse',
    'justification',
    'participation',
    'classroom mathematical culture',
  ],
  'Fraction Reasoning': [
    'fraction reasoning',
    'fraction',
    'fractions',
  ],
  'Place-Based Mathematics': [
    'place-based mathematics',
    'place-based',
    'community knowledge',
    'nigeria',
    'culturally grounded',
    'culture',
  ],
  'Eye-Tracking & Embodied Noticing': [
    'eye-tracking',
    'embodied noticing',
    'teacher noticing',
    'video analysis',
    'visual attention',
  ],
}

function searchableResearchText(item) {
  return normalizeTaxonomyTerm(
    JSON.stringify(item || {}).replace(/[{}[\]",:]/g, ' ')
  )
}

export function researchItemMatchesTopic(
  item,
  topic = 'All'
) {
  if (!topic || topic === 'All') return true

  const text = searchableResearchText(item)
  const aliases = researchTopicAliases[topic] || [topic]

  return aliases.some((alias) =>
    text.includes(normalizeTaxonomyTerm(alias))
  )
}

export function researchTopicIsActive(activeTopic, topic) {
  return (
    normalizeTaxonomyTerm(activeTopic) ===
    normalizeTaxonomyTerm(topic)
  )
}
