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
        'https://raw.githubusercontent.com/Silachim/Egbedeyi-Temitope/main/Home%20page%20picture.jpg',
      bannerAlt:
        'Early childhood mathematics learning and research in an educational setting',
      headshotUrl:
        'https://raw.githubusercontent.com/Silachim/Egbedeyi-Temitope/main/Homepage%202.jpg',
      headshotAlt: 'Professional headshot of Temitope F. Egbedeyi',
    },
  },
}
