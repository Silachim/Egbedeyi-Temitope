export const editorialRegistry = [
  {
    id: 'blog-001',
    slug: 'why-the-way-children-think-about-mathematics-matters',
    workingTitle: 'Why the Way Children Think About Mathematics Matters',
    subject: 'Education & Learning',
    format: 'Essay',
    audience: ['Teachers', 'Parents', 'Researchers', 'General readers'],
    status: 'published',
    targetDate: '2026-08-31',
    searchQuestion: 'Why does children’s mathematical thinking matter?',
    primaryGoal: 'Establish the blog’s public-facing education voice.',
    tags: ['Mathematics Education', 'Children', 'Mathematical Thinking', 'Multiplicative Reasoning'],
  },
  {
    id: 'blog-002',
    workingTitle: 'A Wrong Answer Can Tell Us More Than We Think',
    subject: 'Education & Learning',
    format: 'Essay',
    audience: ['Teachers', 'Parents', 'General readers'],
    status: 'planned',
    targetDate: '',
    searchQuestion: 'What can children’s mathematics mistakes tell us?',
    primaryGoal: 'Translate research on errors and reasoning into accessible public scholarship.',
    tags: ['Children', 'Mathematics Education', 'Teaching', 'Learning'],
  },
  {
    id: 'blog-003',
    workingTitle: 'What Children Look at When They Are Solving Mathematics Problems',
    subject: 'Research & Scholarship',
    format: 'Explainer',
    audience: ['Educators', 'Researchers', 'General readers'],
    status: 'planned',
    targetDate: '',
    searchQuestion: 'What is eye-tracking in mathematics education?',
    primaryGoal: 'Explain an advanced research method in plain language.',
    tags: ['Eye-Tracking', 'Mathematics Education', 'Research Methods', 'Children'],
  },
  {
    id: 'blog-004',
    workingTitle: 'Why Strong Institutions Matter More Than Political Personalities',
    subject: 'Politics & Governance',
    format: 'Commentary',
    audience: ['General readers', 'Policy audiences', 'Students'],
    status: 'idea',
    targetDate: '',
    searchQuestion: 'Why do democratic institutions matter?',
    primaryGoal: 'Develop an evidence-aware public affairs voice without partisan branding.',
    tags: ['Democracy', 'Institutions', 'Governance', 'Global'],
  },
  {
    id: 'blog-005',
    workingTitle: 'What Should Education Prepare Young People for in a Changing World?',
    subject: 'Society & Culture',
    format: 'Analysis',
    audience: ['Educators', 'Parents', 'Policy audiences', 'General readers'],
    status: 'idea',
    targetDate: '',
    searchQuestion: 'What should education prepare students for today?',
    primaryGoal: 'Connect education, technology, citizenship, and social change.',
    tags: ['Education', 'Technology', 'Young People', 'Society', 'Global'],
  },
  {
    id: 'blog-006',
    workingTitle: 'What Moving Between Countries Can Teach Us About Education',
    subject: 'Life & Reflections',
    format: 'Reflection',
    audience: ['International students', 'Educators', 'General readers'],
    status: 'idea',
    targetDate: '',
    searchQuestion: 'How does living across countries change how we see education?',
    primaryGoal: 'Connect personal experience with broader educational questions.',
    tags: ['United States', 'Nigeria', 'Education', 'Migration', 'Reflection'],
  },
]

export function getEditorialItemsByStatus(status) {
  return editorialRegistry.filter((item) => item.status === status)
}

export function getEditorialItemsBySubject(subject) {
  return editorialRegistry.filter((item) => item.subject === subject)
}
