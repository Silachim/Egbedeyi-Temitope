# Phase 4C — Content & Dissemination System

This batch implements the approved model:

**global subjects + writing formats + flexible geographic/topic tags**

No database, CMS, login, or storage account is required.

## Add

- `src/data/editorialTaxonomy.js`
- `src/data/editorialRegistry.js`
- `src/data/disseminationRegistry.js`
- `src/styles/blog-editorial-system.css`

## Replace

- `src/data/blogArchitecture.js`
- `src/pages/Media.jsx`
- `src/pages/BlogPost.jsx`

## Global subject taxonomy

- Education & Learning
- Research & Scholarship
- Politics & Governance
- Society & Culture
- Economy & Development
- World Affairs
- Career & Mentorship
- Life & Reflections

## Writing formats

- Essay
- Commentary
- Analysis
- Reflection
- Explainer

Geography is not a category. Use locations as flexible tags such as:
`United States`, `Nigeria`, `Global`, and others.

## New-post model

For future posts in `src/data/blogPosts.js`:

```js
{
  slug: 'your-clean-search-friendly-slug',
  status: 'draft',
  subject: 'Politics & Governance',
  format: 'Analysis',
  date: '...',
  isoDate: 'YYYY-MM-DD',
  readingTime: '7 min read',
  title: '...',
  excerpt: '...',
  featured: false,
  featuredImage: '',
  featuredImageAlt: '',
  tags: ['United States', 'Democracy', 'Public Policy'],
  relatedResearchHref: '/#research',
  relatedPublicationHref: '/#publications',
  content: [],
}
```

The existing first article can remain unchanged. Its legacy `Mathematics Education`
category is automatically mapped to `Education & Learning`, and its format defaults
to `Essay`.

## Editorial registry

`editorialRegistry.js` is the planning/control file. It tracks the working title,
subject, format, audience, workflow status, target date, search question, goal,
and tags. It does not publish articles. `blogPosts.js` remains the publication source.

## Dissemination registry

`disseminationRegistry.js` tracks post-publication work:
- sitemap/indexing
- LinkedIn
- X
- WhatsApp
- ResearchGate
- Email
- second share

## Workflow

1. Add an idea to `editorialRegistry.js`
2. Move it through idea → planned → drafting → review → scheduled
3. Create the full article in `blogPosts.js`
4. Change status to `published`
5. Run `npm run build`
6. Run `npm run deploy`
7. Update `disseminationRegistry.js`
8. Distribute with channel-specific hooks
9. Re-share later with a different angle

## Test

`npm run build`
`npm run preview`

Verify `/blog/`, the clean first-article URL, subject/format labels, and that the
Phase 4B sitemap/RSS files still load.

When approved:

`npm run deploy`
