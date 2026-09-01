# Phase 4D.3 — Publication & Dissemination Automation

This phase completes the dissemination side of the sustainable publishing workflow.

## Add

- `src/data/disseminationEngine.js`
- `scripts/generate-dissemination.mjs`

## Replace

- `package.json`

## What happens after `npm run build`

The build now performs:

1. blog validation
2. Vite production build
3. discovery generation
4. dissemination generation

Every published Markdown article receives:

- canonical article URL
- LinkedIn copy
- X copy
- Facebook copy
- WhatsApp copy
- email-share subject/body
- media-pitch subject/body
- second-share copy
- hashtags
- keywords

The output is written to:

`dist/dissemination/`

For each published article:

- `<slug>.json`
- `<slug>.md`

There is also:

- `dist/dissemination/index.json`

## Example

After publishing:

`how-ai-can-write-an-almost-meaningful-research-article.md`

the build creates:

`dist/dissemination/how-ai-can-write-an-almost-meaningful-research-article.md`

Open that file and you have channel-specific material ready to copy and adapt.

## Generate dissemination without rebuilding the website

All published articles:

`npm run blog:disseminate`

One published article:

`npm run blog:disseminate -- social-class-childhood-and-educational-opportunity-reflecting-on-annette-lareau`

## Design principle

The dissemination engine does not rewrite the intellectual substance of an article.

It derives promotional material from:
- title
- excerpt
- subject
- format
- tags
- canonical URL

This preserves the distinction between the author's article and the mechanics of distributing it.

## Test

Run:

`npm run build`

Confirm:

`dist/dissemination/index.json`

and article-specific `.json` + `.md` dissemination packs exist.

Then open a generated `.md` pack and review LinkedIn, X, Facebook, WhatsApp,
email, media pitch, and second-share sections.

Do not deploy yet if you are still holding everything for the consolidated release.
