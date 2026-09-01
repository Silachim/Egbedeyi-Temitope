Phase 4G test-run package

Copy these two files into the project:

1. Image:
public/assets/images/blog/how-ai-can-write-an-almost-meaningful-research-article/ai-research-writing-illustration.png

2. Updated article:
content/blog/how-ai-can-write-an-almost-meaningful-research-article.md

Then run:

npm run build
npm run dev -- --host

The figure is inserted after:
"AI can be extraordinarily useful without becoming a competitor of knowledge."

It uses the Phase 4G structured figure syntax with:
- alt text
- caption
- AI-image disclosure/credit
- wide layout
- automatic figure numbering
- click-to-enlarge behavior
