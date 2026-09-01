export const editorialSubjects = [
  'Education & Learning',
  'Research & Scholarship',
  'Politics & Governance',
  'Society & Culture',
  'Economy & Development',
  'World Affairs',
  'Career & Mentorship',
  'Life & Reflections',
]

export const writingFormats = [
  'Essay',
  'Commentary',
  'Analysis',
  'Reflection',
  'Explainer',
]

export const editorialStatuses = [
  'idea',
  'planned',
  'drafting',
  'review',
  'scheduled',
  'published',
  'archived',
]

const legacySubjectMap = {
  'Mathematics Education': 'Education & Learning',
  'Teacher Education': 'Education & Learning',
  'Early Childhood Education': 'Education & Learning',
  Research: 'Research & Scholarship',
  Scholarship: 'Research & Scholarship',
}

export function normalizeSubject(post) {
  if (post?.subject && editorialSubjects.includes(post.subject)) return post.subject
  if (post?.category && legacySubjectMap[post.category]) return legacySubjectMap[post.category]
  if (post?.category && editorialSubjects.includes(post.category)) return post.category
  return 'Ideas & Public Life'
}

export function normalizeFormat(post) {
  return writingFormats.includes(post?.format) ? post.format : 'Essay'
}
