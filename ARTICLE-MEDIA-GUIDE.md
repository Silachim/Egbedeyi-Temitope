# Phase 4G Article Media Syntax

## Recommended image directory

Store article images under:

```text
public/assets/images/blog/<article-slug>/
```

Example:

```text
public/assets/images/blog/multiplicative-reasoning/student-strategy.jpg
```

The Markdown path becomes:

```text
/assets/images/blog/multiplicative-reasoning/student-strategy.jpg
```

## Featured image

Your existing front matter supports:

```yaml
featuredImage: "/assets/images/blog/my-article/cover.jpg"
featuredImageAlt: "Descriptive alternative text"
featuredImageCaption: "Optional caption for the featured image."
```

If `featuredImage` is used, `featuredImageAlt` is required.

## Simple inline image

Standard Markdown now works:

```markdown
![A child arranging counters into equal groups](/assets/images/blog/my-article/counters.jpg "A child representing multiplication with equal groups.")
```

The text inside `[]` is the required alt text.

The quoted text is used as the figure caption.

## Scholarly figure block

For full control, use:

```markdown
[[figure]]
src: /assets/images/blog/my-article/student-strategy.jpg
alt: Student written strategy for solving a multidigit multiplication problem
caption: Example of a student's multiplicative reasoning strategy.
credit: Source: Author's research.
layout: standard
[[/figure]]
```

Figures are automatically numbered in article order.

Available layouts:

```text
compact
standard
wide
full
```

## Optional external figure source

You may add:

```markdown
link: https://example.com/source
```

If `link` is present, clicking the figure opens that source.

If `link` is absent, clicking the image opens the built-in enlargement viewer.

## Accessibility rule

Every featured image and every inline figure must have meaningful alt text.

The build validator will fail if alt text is missing.

## Validation

Run:

```powershell
npm run build
```

The existing blog validator now checks:

- featured image exists
- featured image has alt text
- local inline image exists
- inline figure has alt text
- figure layout is supported
- published figures without captions produce a warning
