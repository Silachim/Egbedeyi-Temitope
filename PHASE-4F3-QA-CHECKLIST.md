# Phase 4F.3 — Cross-Device Interaction & Layout Regression QA

## Add

- `src/components/ResponsiveQA.jsx`
- `src/styles/cross-device-qa.css`

## App.jsx integration

Add:

```jsx
import ResponsiveQA from './components/ResponsiveQA.jsx'
import './styles/cross-device-qa.css'
```

Render once inside the app shell:

```jsx
<div className="app-shell">
  <ResponsiveQA />
  <FunctionalSurfaceEnhancer />
```

`ResponsiveQA` only performs audits in development mode. It does not add a production UI.

## What the CSS fixes

The stylesheet adds site-wide protection for:

- horizontal overflow
- long URLs and references
- oversized headings
- grid children refusing to shrink
- article sidebars on phones
- filter chips and tags
- navigation height on small screens
- touch-target sizing
- publication records
- CV columns
- Research grids
- About grids
- Research Impact grids
- footer wrapping
- landscape-phone behavior
- devices as narrow as 320–360px

## Development QA diagnostics

While running:

```powershell
npm run dev
```

open DevTools Console.

The QA component checks for:

- horizontal overflow candidates
- touch targets smaller than 44 × 44 px
- images missing alt text

Potential overflow elements receive a dashed outline in development so they can be found visually.

## Manual viewport matrix

Test these viewport widths in browser responsive mode:

| Class | Suggested viewport |
| --- | --- |
| Small phone | 320 × 568 |
| Modern phone | 390 × 844 |
| Large phone | 430 × 932 |
| Phone landscape | 844 × 390 |
| Small tablet | 768 × 1024 |
| Large tablet | 1024 × 1366 |
| Small laptop | 1280 × 800 |
| Desktop | 1440 × 900 |
| Wide desktop | 1920 × 1080 |

## Pages to test at every critical breakpoint

1. Home
2. About
3. Research
4. Publications
5. Research Impact
6. CV & Service
7. Blog & Media
8. One long blog article
9. Contact

## Interaction checks

At phone and tablet widths verify:

- hamburger menu opens/closes
- page navigation works
- taxonomy filters wrap without clipping
- Research Focus buttons remain readable
- whole-card links from 4F.2 still work
- nested links/buttons do not trigger the card incorrectly
- article share controls remain usable
- Copy Link still works
- publication filters and search remain usable
- Read Abstract works
- external links open correctly
- keyboard focus remains visible on desktop/tablet keyboard use

## Blog article checks

Use the longest current article and verify:

- no horizontal page scroll
- title stays inside viewport
- Article Topics wrap
- references do not overflow
- DOI/URL text wraps
- share buttons fit
- Older/Newer article links wrap
- Related Writing cards become one column

## Pass criteria

Phase 4F.3 passes when:

- no page has accidental horizontal scrolling
- no text is clipped by the viewport
- cards collapse cleanly at narrow widths
- interactive controls remain reachable
- navigation remains usable in portrait and landscape
- important controls have practical touch sizes
- 4F.1 taxonomy and 4F.2 card interactions still work
- no desktop layout regression is introduced
