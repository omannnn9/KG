// Writes public/<vcard file> from src/config/contact.ts so the downloadable
// contact card can never drift from the details shown on the page.
// Runs automatically before `dev` and `build` (Node 22.18+ strips the types).

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { business, email, owner, phone, vcard } from '../src/config/contact.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const escape = (value: string) => value.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1');

// RFC 2425/6350 line folding: at most 75 octets per line, continuation lines start with a space.
const fold = (line: string) => {
  const parts: string[] = [];
  for (let i = 0; i < line.length; i += i === 0 ? 75 : 74) {
    parts.push(line.slice(i, i === 0 ? 75 : i + 74));
  }
  return parts.join('\r\n ');
};

const [givenName, familyName] = [owner.fullName.split(' ')[0], owner.fullName.split(' ').slice(1).join(' ')];
const photo = readFileSync(resolve(root, 'assets/vcard-photo.jpg')).toString('base64');

const lines = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  `N:${escape(familyName)};${escape(givenName)};;;`,
  `FN:${escape(owner.displayName)}`,
  `NICKNAME:${escape(owner.knownAs)}`,
  `ORG:${escape(business.name)}`,
  `TITLE:${escape(owner.title)}`,
  `TEL;TYPE=CELL,VOICE,PREF:${phone.e164}`,
  `EMAIL;TYPE=INTERNET,WORK:${email.address}`,
  `URL;TYPE=WhatsApp:https://wa.me/${phone.e164.replace('+', '')}`,
  `PHOTO;ENCODING=b;TYPE=JPEG:${photo}`,
  'END:VCARD',
];

const out = resolve(root, 'public', vcard.fileName);
writeFileSync(out, lines.map(fold).join('\r\n') + '\r\n');
console.log(`vCard written to ${out}`);
