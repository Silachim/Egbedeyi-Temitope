# Blog Navigation Route Fix

Replace:

- `src/components/Header.jsx`
- `src/App.jsx`

## What was wrong

The header used links such as:

`href="#cv"`

When clicked from a clean article URL such as:

`/blog/article-slug/`

the browser produced:

`/blog/article-slug/#cv`

Your router checked the pathname first, saw `/blog/...`, and kept rendering the
blog article instead of the CV page.

## What this fix does

1. Header links now point back to the site root:

`/#cv`, `/#research`, `/#about`, etc.

2. App routing also gives a valid navigation hash priority over a nested blog path.

This makes navigation robust even if an old relative hash link remains somewhere.

## Test locally

Run:

`npm run build`
`npm run dev`

Open a clean blog article and click:
- About
- Research
- Publications
- Impact
- CV & Service
- Blog & Media
- Contact

Each should leave the article and load the selected page.

## About the 404

The article files are present on `gh-pages`. A previously-opened GitHub Pages 404
tab can remain stale. After redeploying this fix, open a fresh tab or hard refresh.

