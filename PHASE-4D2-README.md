# Phase 4D.2 — Publishing Intelligence & Reference Engine

This batch adds the intelligence layer requested for the Markdown publishing system.

## Replace

- `src/App.jsx`
- `src/data/blogContent.js`
- `src/pages/BlogPost.jsx`
- `scripts/create-blog-post.mjs`
- `scripts/validate-blog-content.mjs`
- `content/blog/_POST_TEMPLATE.md`

## Add

- `src/data/referenceEngine.js`
- `src/styles/blog-draft-preview.css`
- `content/references/lareau-reflection.example.json`

## 1. Structured Reference Engine

A post can now use:

```yaml
referenceStyle: "Harvard"
referenceSource: "my-article.json"
```

and store source metadata in:

`content/references/my-article.json`

The website generates the bibliography automatically.

Supported output styles:
- APA
- Harvard (generic author-date)
- Chicago Author-Date
- MLA
- Vancouver
- Standard
- Custom

Important: Harvard has institutional variants. This engine uses a generic
author-date Harvard presentation. For a university-specific Harvard guide, either
adjust the formatter or use Custom.

## 2. Pre-publication validation

`npm run build` already runs `blog:validate`.

The validator now checks:
- duplicate slugs
- allowed subjects
- allowed writing formats
- allowed reference styles
- publication date format
- excerpt length
- article body length
- local featured-image existence
- structured reference file existence
- structured reference completeness

A failed validation stops the build.

## 3. Local-only draft preview

A draft remains hidden from the public blog archive.

While `npm run dev` is running, preview it at:

`http://localhost:5173/blog-preview/<slug>/`

The draft preview route only reveals drafts when `import.meta.env.DEV` is true.
It is not a production publishing route.

## 4. Smarter article creator

`npm run blog:new` now asks whether you want a structured reference file.

If yes, it creates both:
- `content/blog/<slug>.md`
- `content/references/<slug>.json`

and prints the local draft-preview URL.

## Migrating the Lareau article to structured references

1. Copy:
   `content/references/lareau-reflection.example.json`

2. Rename it:
   `social-class-childhood-and-educational-opportunity-reflecting-on-annette-lareau.json`

3. In the Lareau Markdown front matter add:

```yaml
referenceStyle: "Harvard"
referenceSource: "social-class-childhood-and-educational-opportunity-reflecting-on-annette-lareau.json"
```

4. You may leave the manual `## References` text in the Markdown temporarily.
   When structured references are present, the article renderer removes the manual
   reference blocks and displays the generated bibliography instead.

## Test

Run:

`npm run build`

Then:

`npm run dev`

Test:
- published blog archive
- Lareau article
- AI article
- a draft using `/blog-preview/<slug>/`
- invalid metadata by temporarily misspelling a style and confirming validation fails

Do not deploy until you are ready for the consolidated deployment.
