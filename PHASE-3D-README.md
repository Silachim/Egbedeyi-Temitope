# Phase 3D — Cross-Device Mobile Correction

This batch does not require any storage account or backend.

## Replace / add

Replace:
- `src/main.jsx`

Add:
- `src/styles/mobile-cross-device-fixes.css`

## What this corrects

The screenshot showed a narrow Android viewport where the homepage hero banner remained visible as a vertical strip at the left while the profile panel occupied most of the screen. The existing homepage CSS changes the hero to one column at 900px, but the Phase 3D file adds a definitive flex/block stacking rule for narrow devices and removes width/position drift.

It also hardens:
- 320px, 360px, 375px, 390px, 412px and 430px layouts
- mobile header/menu width
- large headings
- homepage grids
- About hero and portrait
- Research/Publications/Impact/CV/Blog/Contact container widths
- long publication titles
- filters and buttons
- forms
- images and galleries
- very narrow Android browsers

## Test locally

Run:

`npm run dev -- --host`

Then test from the phone using the Network address shown by Vite.

Recommended widths / devices:
- 320px
- 360px
- 375px
- 390px
- 412px
- 430px
- 768px
- 1024px

Check every primary page.

## Deploy

After local mobile testing:

`npm run build`

Then:

`npm run deploy`

Hard refresh the live website on the phone or open it in a private/incognito tab to avoid a cached CSS bundle.

## Important

This is an additive production-hardening stylesheet. It does not redesign the desktop site and does not require changing the content architecture.
