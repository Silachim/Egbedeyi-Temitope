# Phase 4A — Blog Publishing Architecture

Replace:
- src/pages/Media.jsx
- src/pages/BlogPost.jsx

Add:
- src/data/blogArchitecture.js
- src/styles/blog-publishing-architecture.css

This phase adds:
- featured article treatment
- chronological archive
- category filtering
- stable internal post links
- author/byline information
- computed word count
- related posts based on shared tags/category
- older/newer article navigation
- stronger research/publication pathways
- responsive publishing layout

Publishing remains file-based in `src/data/blogPosts.js`.

Recommended fields for every new post:
- slug
- status
- category
- date
- isoDate
- readingTime
- title
- excerpt
- featured (optional)
- featuredImage
- featuredImageAlt
- tags
- relatedResearchHref
- relatedPublicationHref
- content

Phase 4B will address indexable article URLs, article metadata, structured data, sitemap, social previews, canonical handling, and RSS.

Test:
npm run dev -- --host
npm run build
npm run deploy
