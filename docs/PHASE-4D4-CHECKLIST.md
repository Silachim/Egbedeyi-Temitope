# Phase 4D.4 — End-to-End Publishing Test & Production Readiness

## 1. Automated test

Run:

```powershell
npm run build
node scripts/verify-production-readiness.mjs
```

Target result:

```text
PHASE 4D.4 RESULT: AUTOMATED CHECKS PASSED
```

## 2. Blog index test

Run:

```powershell
npm run dev
```

Verify `/blog/`:
- all published posts appear
- drafts do not appear
- subject filters work
- format filters work
- title, excerpt, date, and reading time are correct

## 3. Article test

Open each published article and verify:
- title and excerpt
- date and reading time
- article body
- Author's Note formatting where used
- References heading
- separate reference entries
- selected reference style
- related/older/newer article navigation

## 4. Share controls

Test:
- LinkedIn
- X
- Facebook
- WhatsApp
- Email
- Copy link

Before deployment, a social platform may show a 404 preview for a brand-new article because the production article is not live yet. The shared URL itself must be:

`https://egbedeyitemitope.com/blog/<slug>/`

After deployment, repeat the social preview test.

## 5. Draft preview

Keep one test article as:

```yaml
status: "draft"
```

Confirm it does not appear in `/blog/`.

Then open:

`http://localhost:5173/blog-preview/<slug>/`

Confirm local draft preview works.

Return the article to its intended final status before the final build.

## 6. Production preview

Run:

```powershell
npm run build
node scripts/verify-production-readiness.mjs
npm run preview
```

Check:
- `/blog/`
- every clean article URL
- `/sitemap.xml`
- `/rss.xml`
- `/robots.txt`

## 7. Repository check

Run:

```powershell
git status
```

Remove accidental:
- screenshots
- backups
- test files
- secrets
- abandoned `dist/dissemination/` output

## 8. Consolidated deployment

Only after all checks pass:

```powershell
git add .
git commit -m "Complete sustainable blog publishing system"
git push origin main
npm run deploy
```

## 9. Live-site verification

Check:
- homepage
- Blog & Media
- each published article
- share buttons
- mobile layout
- sitemap
- RSS
- robots.txt

Then re-test Facebook/LinkedIn sharing. The article page should now exist on the production domain.
