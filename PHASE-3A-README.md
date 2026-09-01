# Phase 3A — Global Consistency & Production Cleanup

This batch is based on the current uploaded React project, not on an older reconstruction.

## Global corrections applied

- Primary navigation now uses `Blog & Media` and routes to `#blog`.
- Legacy `#media` URLs are normalized internally to the Blog & Media route so old links remain usable.
- Home and Research Impact links now point to `#blog` rather than the obsolete `#media` route.
- The homepage CV button and the CV page now use the same local PDF: `/assets/Egbedeyi_Vita.pdf`.
- Academic profile URLs are centralized in `src/data/profileLinks.js`.
- Footer and Publications now consume the same Google Scholar, ORCID, ResearchGate, and LinkedIn profile source.
- Blog & Media metadata has been updated from the old `Media & News` wording.
- Published blog articles receive their own document title, description, Open Graph article type, and social metadata.
- Draft or invalid individual blog article routes are marked `noindex`.
- Favicon and Open Graph/Twitter image metadata were added to `index.html`.
- JSON-LD profile links were made consistent with the centralized profile URLs.
- Media dates now include ISO values for deterministic sorting on the homepage.
- Dependency versions are pinned instead of using `latest`.
- `package.json` and the root package-lock metadata are aligned at version `0.2.0`.

## Removed obsolete/stale files

- `.env.example` — leftover from the abandoned Formspree approach
- `src/data/media.js` — media data is now sourced from `blogMediaData.js`
- `src/pages/Impact.jsx` — superseded by `ResearchImpact.jsx`
- `src/pages/publicationsData.js` — duplicate of the canonical data module
- `src/styles/contact-page.css` — superseded by `contact-page-improved.css`
- `public/assets/index-ED4MVXiz.js` — stale compiled bundle incorrectly stored in `public`
- `public/assets/newlogo-UmGItTq2.jpg` — stale generated build asset; favicon remains in `public/assets/favicon.jpg`

## Verification completed here

- All relative JavaScript/JSX imports resolve to existing files.
- No active source links remain to `#media`.
- No source imports remain for the deleted `src/data/media.js`.
- Non-JSX modules changed in Phase 3A passed Node syntax checks.
- Vanguard, Guardian, and BusinessDay media URLs were checked and remain reachable.

## Build note

A production Vite build could not be completed inside the audit container because the uploaded `node_modules` directory was installed on Windows and does not contain the Linux Rolldown native binding required by Vite 8. This is an environment portability issue, not a source-code build error.

On your Windows project, use the cleaned source and run:

```bash
npm install
npm run build
npm run preview
```

If dependencies behave unexpectedly, delete `node_modules` first and then run `npm install` again.

## Phase 3A acceptance checks

After installation, verify:

- Header reads `BLOG & MEDIA` on desktop and mobile.
- `#blog` works and the first published article opens correctly.
- An old `#media` URL still displays Blog & Media.
- Home `View Blog & Media` opens the Blog & Media page.
- Research Impact media links open Blog & Media.
- Home and CV page CV links open the PDF, not HTML.
- Footer academic profiles open the intended profiles.
- Publications scholarly-profile links match the footer links.
- Page titles change correctly when navigating.
- The published blog article gets its own browser title.
- `npm run build` completes without errors.
