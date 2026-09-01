# Phase 4D — Sustainable Blog Publishing System

This phase removes full article content from `src/data/blogPosts.js`.

From now on, **one article = one Markdown file** in:

`content/blog/`

No database, storage account, CMS subscription, or admin login is required.

## Replace

- `src/App.jsx`
- `src/data/blogArchitecture.js`
- `src/pages/BlogPost.jsx`
- `scripts/generate-discovery-pages.mjs`
- `package.json`

## Add

- `src/data/markdownBlog.js`
- `src/data/blogContent.js`
- `scripts/create-blog-post.mjs`
- `scripts/validate-blog-content.mjs`
- `content/blog/_POST_TEMPLATE.md`
- `content/blog/why-the-way-children-think-about-mathematics-matters.md`
- `content/blog/how-ai-can-write-an-almost-meaningful-research-article.md`

## Retire

After Phase 4D is working, `src/data/blogPosts.js` is no longer the source of blog content.

Do not delete it until you have confirmed the Markdown system builds and previews correctly. Then it can be archived or removed later.

## Your new normal workflow

### Option 1: Create a post automatically

Run:

`npm run blog:new`

The terminal asks for:
- article title
- slug
- subject
- writing format
- excerpt
- tags
- date
- draft/published status
- optional authorship/disclosure note

It then creates a ready-to-write Markdown file.

### Option 2: Copy the template

Copy:

`content/blog/_POST_TEMPLATE.md`

Rename it to your article slug, then fill in the metadata and write normally.

## Writing an article

Markdown now supports:

- ordinary paragraphs
- `##` section headings
- `###` subheadings
- blockquotes using `>`
- unordered lists using `-`
- numbered lists
- **bold**
- *italics*
- inline `code`
- links using `[text](https://example.com)`

Reading time is calculated automatically. You no longer type it.

## Publishing

A draft begins with:

`status: "draft"`

When ready:

`status: "published"`

Then run:

`npm run build`

The build automatically validates every post before Vite builds.

Phase 4B discovery generation then reads the same Markdown files and creates:
- clean `/blog/<slug>/` pages
- sitemap.xml
- rss.xml
- robots.txt
- article-specific SEO and structured data

## Test before the consolidated deployment

Run:

`npm run build`

Then:

`npm run preview`

Verify:

- `/blog/`
- `/blog/why-the-way-children-think-about-mathematics-matters/`
- `/blog/how-ai-can-write-an-almost-meaningful-research-article/`
- `/sitemap.xml`
- `/rss.xml`
- `/robots.txt`

Do not deploy until you are ready for the consolidated deployment.

## Important

Phase 4D is designed so that you should not need ChatGPT simply to format future articles.

You can still use ChatGPT when you want editing, critique, research, headlines, SEO review, fact-checking, or dissemination material, but the website publishing format itself is now self-service.
