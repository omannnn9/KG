// Single source of truth for every contact detail on the page and in the .vcf.
// Sources: physical business card (name, title, phone) and the KG Rentals brochure
// (email, "Ketan Gungah | 57262266 | kgrentals.mu@gmail.com").

export const business = {
  name: 'KG Rentals & Property Management',
  shortName: 'KG Rentals',
} as const;

export const owner = {
  fullName: 'Tejasprakashsing Gungah',
  knownAs: 'Ketan',
  displayName: 'Ketan Gungah',
  title: 'Director',
} as const;

// The card prints the local number only (57262266). +230 is Mauritius: eight-digit
// mobile numbers beginning with 5 belong to its numbering plan, and the brochure's
// email uses the .mu domain. Change it here if that ever turns out to be wrong.
const COUNTRY_CODE = '230';
const LOCAL_NUMBER = '57262266';

export const phone = {
  e164: `+${COUNTRY_CODE}${LOCAL_NUMBER}`,
  display: `+${COUNTRY_CODE} ${LOCAL_NUMBER.slice(0, 4)} ${LOCAL_NUMBER.slice(4)}`,
  href: `tel:+${COUNTRY_CODE}${LOCAL_NUMBER}`,
} as const;

/** Click-to-chat link with an URL-encoded introduction; the message text comes from the active language. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${COUNTRY_CODE}${LOCAL_NUMBER}?text=${encodeURIComponent(message)}`;

export const email = {
  address: 'kgrentals.mu@gmail.com',
} as const;

/** mailto link with a subject line in the active language. */
export const emailLink = (subject: string) => `mailto:${email.address}?subject=${encodeURIComponent(subject)}`;

/** Public address of the site (used by the printed QR code and as the share fallback). */
export const siteUrl = 'https://kg-liart.vercel.app/';

export const vcard = {
  fileName: 'ketan-gungah-kg-rentals.vcf',
} as const;

// Supplied by the owner; used exactly as given.
export const instagram = {
  href: 'https://www.instagram.com/official_ketan_gungah/',
  handle: '@official_ketan_gungah',
} as const;
