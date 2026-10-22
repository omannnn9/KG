# KG Rentals & Property Management — digital business card

A single, mobile-first page for Ketan Gungah, Director of KG Rentals & Property Management. It covers who he is, what the firm does, and a one-tap WhatsApp contact.

## Run

```bash
npm install
npm run dev        # also regenerates the .vcf
npm run build      # typecheck + production build into dist/
npm run lint
npm run preview    # serve dist/ locally
```

Needs Node 22.18+ (the vCard script is TypeScript run directly by Node).

## Editing contact details

Every phone, WhatsApp, email and name value comes from `src/config/contact.ts`. The downloadable contact card (`public/ketan-gungah-kg-rentals.vcf`) is generated from that same file before each `dev` and `build`, so the two stay in sync.

## Structure

- `src/sections/`: Hero, About, Services, Contact, Footer
- `src/components/`: shared contact buttons, the floating WhatsApp shortcut, and `FadeContent` (from React Bits)
- `public/images/`: optimised WebP assets (cut-out portrait, logo, coastline texture)
- `source-assets/`: the original card photos, portrait and brochure. They are git-ignored and never served.
- `docs/design-system.md`: the design decisions and tokens

## Deploying

The output is a static site, so any static host works. Two things to check after deploying:

1. The host should serve `.vcf` files as `text/vcard`. Most do by default, and the link also carries a `download` attribute.
2. Add `og:url` in `index.html` once the final address is known, so WhatsApp link previews show the cover image.

## Languages

All visible copy lives in `src/i18n/content.ts` (English source, French translation). The EN/FR switch sits in the top bar. The choice is remembered on the device, and a French browser starts in French. The WhatsApp introduction and email subject follow the active language. Ketan should review the French before relying on it.

## Print: QR code for the back of the card

`print/` holds the back of the business card with a QR code that opens the site (`siteUrl` in `src/config/contact.ts`):

- `kg-card-back-qr-print.pdf` / `.png`: 85 × 55 mm card plus 3 mm bleed (91 × 61 mm) at 300 dpi. Send this file to the printer.
- `kg-card-back-qr-trimmed.png`: the card as it looks once cut.
- `kg-card-back-qr-preview.png`: an on-screen mockup.

The QR uses error correction H, dark modules on an ivory tile and a 4-module quiet zone. It has been decoded by machine to `https://kg-liart.vercel.app/`. If the site moves to its own domain, regenerate the code so printed cards keep working, and test-scan a printed proof before ordering a full run.
