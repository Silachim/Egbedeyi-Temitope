# Phase 3B — Responsive, Accessibility & Performance QA

## Scope

This pass audited the Phase 3A project for responsive behavior, keyboard/accessibility issues, hash-router conflicts, small-text color contrast, image loading behavior, and front-end loading cost.

## Corrections implemented

### Routing + in-page navigation
- Fixed the global **Skip to main content** link so it focuses `main` without changing the hash route to `#main-content`.
- Fixed the Research hero's **Explore projects** and **Research methods** controls. They now use programmatic scrolling instead of hashes such as `#projects` and `#methods`, which previously conflicted with the site's hash router and could send visitors to the Home fallback.
- Programmatic scrolling on Research, Publications, and Blog & Media now respects `prefers-reduced-motion`.
- Added `scroll-margin-top` for section targets so the sticky header does not obscure in-page destinations.

### Keyboard + screen-reader behavior
- Mobile navigation now moves keyboard focus into the menu when it opens.
- Escape closes the mobile menu and returns focus to the menu button.
- SPA route changes move focus to the main content container after the initial page load.
- Publication type/theme filters and Media year filters now expose their selected state with `aria-pressed`.
- Existing external links were verified to use `rel="noopener noreferrer"` when opening new tabs.
- Static audit found no `<img>` elements without `alt` text.

### Responsive usability
- Navigation links have a minimum 44px interaction height on compact layouts.
- Filter controls and publication browse controls receive a minimum 44px target height.
- Long email addresses, metadata, and citation strings can wrap safely rather than forcing horizontal overflow.
- Added a narrow-screen button-row fallback to prevent CTA overflow.
- Added global image max-width protection and horizontal-overflow protection.

### Color contrast
- The recurring copper accent was darkened from `#a85f2c` to `#985326` for stronger contrast when used in small uppercase labels.
- The low-contrast muted numbering color `#9b7e6e` was replaced by `#7b6255`.
- The revised small-text colors clear the WCAG AA 4.5:1 target against the primary cream background in the tested palette.

### Performance
- Non-home route components are now loaded with `React.lazy()` and `Suspense`, reducing initial JavaScript/CSS work for the homepage.
- The Home page remains eagerly loaded to avoid delaying the primary landing route.
- Removed the CSS `@import` for Google Fonts; fonts now load via the existing/preconnected document `<link>` path.
- Added an explicit stylesheet link for DM Sans and Playfair Display.
- Converted repository image references from GitHub `blob?...raw=true` URLs to direct `raw.githubusercontent.com` URLs to remove redirect overhead.
- Added DNS prefetch for `raw.githubusercontent.com` and a high-priority preload for the homepage banner.
- Added `decoding="async"` to applicable content images and retained lazy loading for below-the-fold gallery/application imagery.

## Static QA results

- Unregistered literal hash links: **none** after corrections.
- Images missing `alt`: **none** in JSX static scan.
- `_blank` anchors missing `rel="noopener noreferrer"`: **none** in JSX static scan.
- Missing referenced local `/assets/...` files: **none**.
- CSS brace-balance scan: **clean**.

## Production build note

A definitive Vite build could not be completed inside the audit container. The Phase 3A archive carried Windows-installed native Vite/Rolldown dependencies. A clean `npm ci` attempt in this environment timed out before the Vite executable was fully installed.

Run the final validation on the development machine from a clean dependency state:

```bash
rm -rf node_modules
npm ci
npm run build
npm run preview
```

On Windows PowerShell, use the appropriate Windows command to remove `node_modules`, or simply delete that folder before running `npm ci`.

## Manual viewport checks for local preview

Please inspect at approximately:
- 1440px desktop
- 1024px tablet / small laptop
- 768px tablet
- 390px mobile
- 320px narrow mobile

Check every route:
- `#home`
- `#about`
- `#research`
- `#publications`
- `#impact`
- `#cv`
- `#blog`
- the published `#blog/<slug>` article
- `#contact`

## Remaining performance opportunity

Several public-facing photographs are still served from `raw.githubusercontent.com`. The next optimization opportunity would be to place approved site images inside `public/assets`, resize them to their actual rendered dimensions, and generate WebP/AVIF derivatives. This was not done in Phase 3B because the gallery includes personal event photographs and only the user should decide which approved originals are permanently bundled with the site.
