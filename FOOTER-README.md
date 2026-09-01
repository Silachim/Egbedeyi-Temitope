# Global Footer Implementation

This is a targeted global footer update.

## Replace/add

- Replace: `src/components/Footer.jsx`
- Add: `src/styles/footer.css`

`Footer.jsx` imports `footer.css` directly, so there is no need to replace `global.css`.

## Design

The footer now includes:
- Temitope F. Egbedeyi
- Early Childhood Mathematics Education Researcher
- Research · Teaching · Public Scholarship
- Explore navigation
- Academic Profiles: Google Scholar, ORCID, ResearchGate, LinkedIn
- Compact copyright row
- Responsive tablet/mobile layouts

No geographic reference is included.

## Important

The Google Scholar link is configured as an author-profile search because the exact public Scholar profile ID was not available in the current project files. If you have the direct Google Scholar profile URL, replace that one URL in `Footer.jsx` before production deployment.

The other profile links are configured directly.

## Test

Run:
`npm run dev`

Then test the footer on Home, About, Research, and mobile widths. After approval:
`npm run build`
`npm run preview`
