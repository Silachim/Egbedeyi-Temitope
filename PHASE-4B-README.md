# Phase 4B — Search & Discovery Infrastructure

This batch works on top of Phase 4A and does not require a database, CMS, or storage account.

## Replace
- `src/data/blogArchitecture.js`
- `src/App.jsx`
- `src/seo/routeMeta.js`
- `package.json`
- `index.html`

## Add
- `scripts/generate-discovery-pages.mjs`

## What changes

### 1. Clean article URLs

The public URL for each post becomes:

`https://egbedeyitemitope.com/blog/<slug>/`

instead of relying on a hash URL such as:

`https://egbedeyitemitope.com/#blog/<slug>`

The React application can now read blog routes from the pathname.

### 2. Build-time discoverability

Every `npm run build` now:
1. builds the Vite app
2. creates `dist/blog/index.html`
3. creates one static HTML entry point for every published blog post
4. injects unique title, description, canonical URL, Open Graph tags, Twitter tags, and BlogPosting JSON-LD
5. generates `dist/sitemap.xml`
6. generates `dist/rss.xml`
7. generates `dist/robots.txt`

### 3. Article structured data

Published posts receive Schema.org `BlogPosting` structured data including:
- headline
- description
- image
- publication date
- modification date when supplied
- article section
- keywords
- author
- canonical page URL

### 4. Social sharing

Each clean article page has its own:
- `og:title`
- `og:description`
- `og:url`
- `og:type=article`
- `og:image`
- Twitter title/description/image

For the strongest social previews, future posts should include a local `featuredImage`.

### 5. RSS

The feed will be available at:

`https://egbedeyitemitope.com/rss.xml`

### 6. Sitemap

The sitemap will be available at:

`https://egbedeyitemitope.com/sitemap.xml`

It includes the homepage, blog index, and every published clean blog URL.

## Post image recommendation

For future posts, place a share image in:

`public/assets/blog/`

Example:

`public/assets/blog/why-children-think-about-mathematics.jpg`

Then set:

```js
featuredImage: '/assets/blog/why-children-think-about-mathematics.jpg',
featuredImageAlt: 'Descriptive accessible alternative text',
```

A 1200 x 630 image is a useful target for broad social preview compatibility.

## Important note about the rest of the site

The existing main sections still use hash navigation. Phase 4B intentionally gives clean URLs specifically to the blog because the articles are the content intended to attract search and social traffic.

## Test

Run:

`npm run build`

Then confirm these exist inside `dist`:
- `blog/index.html`
- `blog/<your-post-slug>/index.html`
- `sitemap.xml`
- `rss.xml`
- `robots.txt`

Preview:

`npm run preview`

Then test:
- `/blog/`
- `/blog/why-the-way-children-think-about-mathematics-matters/`
- `/sitemap.xml`
- `/rss.xml`
- `/robots.txt`

Deploy:

`npm run deploy`

After deployment, submit the sitemap URL in Google Search Console:

`https://egbedeyitemitope.com/sitemap.xml`
