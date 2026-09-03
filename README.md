# Blog Archive Taxonomy Layout Fix

Replace:

`src/styles/taxonomy-interactions.css`

No JSX changes are required.

This correction:

- protects "Browse recent writing" from collapsing into a narrow column
- removes the Topic tag internal scrollbar
- lets topic tags wrap naturally
- aligns Subject, Format, and Topic tag labels consistently
- moves the heading above filters at narrower tablet widths
- preserves all Phase 4F.1 filtering functionality
- preserves mobile wrapping and touch behavior

After replacing the file:

```powershell
npm run build
npm run dev -- --host
```

Check the Blog & Media archive at desktop, tablet, and phone widths.
