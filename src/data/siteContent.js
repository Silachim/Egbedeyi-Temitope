/**
 * Central site content configuration.
 *
 * Phase 2 Batch 2 intentionally keeps homepage image URLs/content in one place.
 * This makes the later admin dashboard migration easier because these values can
 * be replaced by API/CMS-managed content without rewriting Home.jsx.
 */
export const siteContent = {
  home: {
    hero: {
      bannerUrl:
        '/assets/images/home-banner.jpg',
      bannerAlt:
        'Early childhood mathematics learning and research in an educational setting',
      headshotUrl:
        '/assets/images/professional-headshot.jpg',
      headshotAlt: 'Professional headshot of Temitope F. Egbedeyi',
    },
  },
}
