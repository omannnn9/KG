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

const WHATSAPP_MESSAGE =
  'Hello Ketan, I found the KG Rentals page and would like to enquire about your property management services.';

export const phone = {
  e164: `+${COUNTRY_CODE}${LOCAL_NUMBER}`,
  display: `+${COUNTRY_CODE} ${LOCAL_NUMBER.slice(0, 4)} ${LOCAL_NUMBER.slice(4)}`,
  href: `tel:+${COUNTRY_CODE}${LOCAL_NUMBER}`,
} as const;

export const whatsapp = {
  href: `https://wa.me/${COUNTRY_CODE}${LOCAL_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  message: WHATSAPP_MESSAGE,
} as const;

export const email = {
  address: 'kgrentals.mu@gmail.com',
  href: `mailto:kgrentals.mu@gmail.com?subject=${encodeURIComponent('Property management enquiry')}`,
} as const;

export const vcard = {
  fileName: 'ketan-gungah-kg-rentals.vcf',
} as const;
