# Publications Page Final Polish

Replace these three files:

- `src/pages/Publications.jsx`
- `src/data/publicationsData.js`
- `src/styles/publications-page.css`

## Major corrections

- Featured Work is now split into:
  - Peer-Reviewed Journal Articles
  - Peer-Reviewed Conference Proceedings
- Added all journal articles and proceedings supplied by the user.
- Preserved exact author order from the supplied citations.
- Temitope Egbedeyi's name is subtly emphasized.
- Removed all public-facing "Year to confirm" placeholders.
- Browse Publications no longer changes the React hash route. It now uses `scrollIntoView()` to reach the Publication Index.
- Added real journal/proceedings metadata, DOI and direct links where supplied.
- The 2026 Journal of Mathematical Behavior article is the first featured journal article.
- Long featured titles have improved responsive typography.
- Empty Book Chapters and Reports filters are not shown.
- Inactive filters are visually quieter.
- Google Scholar fallback is used only when a direct publication link was not supplied.

## Important data note

For some older publications, no DOI/direct URL was supplied. Those entries use Google Scholar title search as the secondary action. This avoids inventing URLs.

## Test

Run:
npm run dev

Verify:
- Browse Publications scrolls to the publication index and does not return to Home.
- Journal Articles and Conference Proceedings filters work.
- Research-theme filters work.
- Search finds author names as well as titles/topics.
- Abstract toggles work.
- Direct DOI/article links open in a new tab.
- Responsive layouts are clean.

Then run:
npm run build
npm run preview
