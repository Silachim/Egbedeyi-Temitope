import { mkdir, access, writeFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')
const BLOG_DIR = join(ROOT, 'content', 'blog')
const REFERENCE_DIR = join(ROOT, 'content', 'references')

const subjects = [
  'Education & Learning',
  'Research & Scholarship',
  'Politics & Governance',
  'Society & Culture',
  'Economy & Development',
  'World Affairs',
  'Career & Mentorship',
  'Life & Reflections',
]

const formats = ['Essay', 'Commentary', 'Analysis', 'Reflection', 'Explainer']

const referenceStyles = [
  'Standard',
  'APA',
  'Harvard',
  'Chicago Author-Date',
  'MLA',
  'Vancouver',
  'Custom',
]

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
}

function yamlQuote(value) {
  return JSON.stringify(String(value || ''))
}

async function choose(rl, label, options, defaultIndex = 0) {
  output.write(`\n${label}\n`)
  options.forEach((option, index) => output.write(`  ${index + 1}. ${option}\n`))

  const answer = await rl.question(
    `Choose 1-${options.length} [${defaultIndex + 1}]: `
  )

  const parsed = Number.parseInt(answer, 10)
  const index =
    Number.isFinite(parsed) && parsed >= 1 && parsed <= options.length
      ? parsed - 1
      : defaultIndex

  return options[index]
}

const rl = createInterface({ input, output })

try {
  await mkdir(BLOG_DIR, { recursive: true })
  await mkdir(REFERENCE_DIR, { recursive: true })

  const title = (await rl.question('Article title: ')).trim()
  if (!title) throw new Error('A title is required.')

  const suggestedSlug = slugify(title)
  const slugAnswer = (await rl.question(`Slug [${suggestedSlug}]: `)).trim()
  const slug = slugAnswer ? slugify(slugAnswer) : suggestedSlug

  const subject = await choose(rl, 'Subject', subjects, 0)
  const format = await choose(rl, 'Writing format', formats, 0)
  const referenceStyle = await choose(rl, 'Reference style', referenceStyles, 0)

  const useStructuredReferences =
    (await rl.question('Create structured reference file? yes/no [no]: '))
      .trim()
      .toLowerCase() === 'yes'

  const excerpt = (await rl.question('Short excerpt/description: ')).trim()
  const tagAnswer = (await rl.question('Tags, separated by commas: ')).trim()
  const tags = tagAnswer.split(',').map((tag) => tag.trim()).filter(Boolean)

  const today = new Date().toISOString().slice(0, 10)
  const date = (await rl.question(`Publication date [${today}]: `)).trim() || today

  const statusAnswer = (
    await rl.question('Status: draft or published [draft]: ')
  ).trim().toLowerCase()

  const status = statusAnswer === 'published' ? 'published' : 'draft'
  const authorshipNote = (
    await rl.question('Optional authorship/disclosure note: ')
  ).trim()

  const markdownPath = join(BLOG_DIR, `${slug}.md`)

  try {
    await access(markdownPath, constants.F_OK)
    throw new Error(`A post already exists at content/blog/${slug}.md`)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }

  const referenceFilename = `${slug}.json`
  const tagLines = tags.length
    ? tags.map((tag) => `  - ${tag}`).join('\n')
    : '  - '

  const markdown = `---
title: ${yamlQuote(title)}
slug: ${yamlQuote(slug)}
status: ${yamlQuote(status)}
subject: ${yamlQuote(subject)}
format: ${yamlQuote(format)}
referenceStyle: ${yamlQuote(referenceStyle)}
referenceSource: ${yamlQuote(useStructuredReferences ? referenceFilename : '')}
date: ${yamlQuote(date)}
excerpt: ${yamlQuote(excerpt)}
featured: false
featuredImage: ""
featuredImageAlt: ""
tags:
${tagLines}
authorshipNote: ${yamlQuote(authorshipNote)}
relatedResearchHref: "/#research"
relatedPublicationHref: "/#publications"
---

Write your article here.

## References

${useStructuredReferences
  ? 'References will be generated automatically from the structured reference file.'
  : 'Add references here manually if the article uses sources.'}
`

  await writeFile(markdownPath, markdown, 'utf8')

  if (useStructuredReferences) {
    const referencePath = join(REFERENCE_DIR, referenceFilename)

    const starter = [
      {
        id: 'source-1',
        authors: ['Surname, A. A.'],
        year: '2026',
        title: 'Article or book title',
        journal: 'Journal or container title',
        volume: '',
        issue: '',
        pages: '',
        doi: '',
        url: '',
      },
    ]

    await writeFile(referencePath, JSON.stringify(starter, null, 2), 'utf8')
    output.write(`Structured references:\n${referencePath}\n`)
  }

  output.write(`\nCreated:\n${markdownPath}\n`)
  output.write(
    `\nDraft preview URL:\nhttp://localhost:5173/blog-preview/${slug}/\n`
  )
} finally {
  rl.close()
}
