# Phase 4G — Article Media & Visual Publishing System

## Add

- `src/components/ArticleFigure.jsx`
- `src/styles/article-media.css`
- `ARTICLE-MEDIA-GUIDE.md`
- `public/assets/images/blog/README.txt`

## Replace

- `src/data/markdownBlog.js`
- `src/pages/BlogPost.jsx`
- `scripts/validate-blog-content.mjs`

## Capabilities

Phase 4G adds:

- featured images rendered inside article pages
- standard Markdown inline images
- structured scholarly figure blocks
- automatic figure numbering
- captions
- image credits
- compact / standard / wide / full layouts
- built-in click-to-enlarge figure viewer
- optional source-link behavior
- responsive mobile figures
- build-time validation for missing image files and alt text

## Important

This BlogPost.jsx includes the Phase 4F.1 taxonomy links and the existing share controls.

No App.jsx change is required for Phase 4G.

After copying the files, read `ARTICLE-MEDIA-GUIDE.md`.

Then run:

```powershell
npm run build
npm run dev -- --host
```

Test a draft article with one simple Markdown image and one structured figure before publishing.
