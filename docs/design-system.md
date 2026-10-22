# KG Rentals — design system

Starting point: UI/UX Pro Max (`--design-system`, query "luxury property management rental real estate personal brand", dials variance 4 / motion 2 / density 3). It proposed a hero-centric pattern, a real-estate teal palette, Cinzel/Josefin Sans and glassmorphism. The pattern and the teal direction were kept; glassmorphism and Cinzel were rejected (see below). Everything was then adjusted to the physical card and brochure.

## Visual direction

The printed card is a coastline photograph used as a border, with a dark inset panel carrying a gold ring logo. The page uses that idea as its structure. The hero and contact sections are dark panels set inside a thin coastline frame, and the content sections between them sit on light sand. The gold appears only in the logo, in hairline rules and in a single thin ring behind the portrait. It is never used for backgrounds or glows. This keeps the brand's identity while avoiding a generic black-and-gold theme.

Rejected from the generated system: glassmorphism (the brief says no, and it adds nothing here), Cinzel (an all-caps Roman display face that would turn every heading into uppercase), and the generated blue accent (it isn't in the brand).

## Colour (tokens in `src/styles.css`)

| Token | Hex | Use |
|---|---|---|
| `--ink-900` | #0f2928 | Dark panels (taken from the card's inset) |
| `--ink-950` | #0b1f1e | Footer, printed-card inset |
| `--lagoon-700` | #1a5753 | Primary button on light, floating WhatsApp |
| `--seaglass` | #a7c8c1 | Secondary text on dark (8.5:1 on ink-900) |
| `--paper` | #f7f2e9 | Text on dark, primary button on dark |
| `--sand-50 / -100` | #faf7f1 / #f5f0e7 | Light section backgrounds |
| `--text` | #17211f | Body text (14.5:1 on sand) |
| `--text-muted` | #4f5b58 | Secondary text (6.2:1 on sand) |
| `--gold-400` | #d2b062 | Rules, ring, eyebrows on dark (7.4:1 on ink) |
| `--gold-700` | #7d5e1c | Eyebrows and indices on sand and mist (≥4.9:1) |
| `--mist` | #e4eae9 | Sea-mist taken from the brochure beach photo's sky; services fade into it |
| `--whatsapp` | #25d366 | The WhatsApp badge only, so the action is recognisable |

## Typography

- Display: **Newsreader** (variable, self-hosted, weight axis only, 58 kB latin). An editorial serif that is close to the brochure's heading serif without falling back on Playfair or Cormorant.
- Body/UI: **Figtree** (variable, self-hosted). A clear humanist sans, similar to the brochure's body face.
- Scale: display `clamp(34px → 64px)`, section title `clamp(30px → 46px)`, lg 21px, base 17px, sm 15px, xs 13px. Body line-height 1.6, headings 1.05–1.25 with `text-wrap: balance`.
- Uppercase with letter-spacing is used only for the short eyebrow labels and the card's strapline, as on the printed card.

## Space, layout, shape

- 4px base: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Gutters: 20px (mobile), 32px (≥640px), 48px (≥1024px). Container max-width 1200px.
- Breakpoints: 640 / 820 / 1024. Mobile is the default.
- Radius: 6px on buttons and tags, 0 on panels and frames (the card is square-cornered). Pill shape only on the floating WhatsApp button.
- Separation comes from hairline rules (`--line`) rather than cards and shadows. The one shadow sits on the re-set business card.

## Buttons

- Primary: WhatsApp. At least 60px tall, with a green WhatsApp badge, a visible "WhatsApp" label and an outbound arrow. It is paper-coloured on dark panels and lagoon on light ones.
- Secondary: "Call" and "Save contact". At least 48px tall, outlined, with a gold border on hover.
- All buttons use `touch-action: manipulation`, press to scale 0.985, and show a 2px focus ring (gold on dark, lagoon on light).

## Imagery

- Portrait: cut out locally with rembg (BiRefNet portrait model), then edge-decontaminated so no grey wall shows at the edges. On mobile it is cropped head-to-waist with a gradient mask that dissolves into the panel. The original file is untouched in `source-assets/`.
- Terrace: the brochure's "Our services" photograph, cropped clear of its printed logo and slightly desaturated. It sets the scene beside the services and is never presented as a listing.
- Coastline texture: the brochure cover photograph, with the baked-in logo and strapline removed. It only ever shows as the frame.
- Logo: keyed out of the brochure cover (no vector was supplied). It is only placed on dark surfaces, because the pale "KG" letterforms lose contrast on sand.

## Coastal atmosphere

Taken from the brochure, not added as decoration. The brochure moves from the dark aerial coastline on its cover to the sunlit beach on its "About us" page, and the page follows the same arc. It opens on the dark coastline panel and, after the services, crosses a sea-mist gradient into the brochure's beach photograph, which fades in from the mist with no hard edge. The brochure line "Our hands-on approach…" sits above it as a quote. The contact panel then closes the page in the same frame as the hero. The palette gains one colour, `--mist`. Turquoise appears only inside the photograph.

## Motion

One language: deceleration easing (`cubic-bezier(0.22, 1, 0.36, 1)`), 160–240ms for feedback and 0.6–1.1s for reveals. Every effect plays once.

- **Hero entrance (about 1.4s, usable from the first frame).** The warm colour field settles while the sunlight opens. The portrait unveils top-down as the gold ring draws around it. The name follows, then the headline rises line by line (GSAP SplitText, reverted afterwards), then the lede and contact actions. A single sheen crosses the WhatsApp button, and an Explore link nudges twice.
- **React Bits `LightRays`.** Warm sunlight in the hero. It is lazy-loaded, renders at 1× pixel ratio, pauses off screen and is absent under reduced motion.
- **React Bits `GlareHover`.** One glint over the re-set business card.
- **Scroll reveals (`Reveal.tsx`).** IntersectionObserver with CSS transitions, using rise, stagger or an upward wipe. Content is visible by default and only armed when it starts below the fold. The wipe clips children, never the observed element.
- **Scroll-linked (native CSS scroll timelines, no listeners).**
  - The hero introduction recedes and the portrait drifts as the hero leaves; the contact actions never dim.
  - The services terrace image unveils from the top and drifts.
  - The beach opens from a framed inset to full width.

  Browsers without support show the static composition.
- **Desktop only.** Pointer depth moves the light, ring and portrait by different amounts. There are no device-motion permissions and nothing happens on touch.
- **Tactile.** Pressed states on every control. WhatsApp shows "Opening WhatsApp…" with a short vibration where supported. Save contact shows "Contact card ready". Service stages open and close in a timeline accordion.

## Accessibility

Contrast pairs are listed above. External links (WhatsApp, Instagram) open in a new tab with `rel="noopener noreferrer"` and announce it. The Instagram icon always sits beside visible text ("Instagram" or the handle). The page has a skip link, visible focus states, and 44px+ targets (the WhatsApp CTA is 60px). Decorative icons are `aria-hidden`, and the external WhatsApp links announce "opens WhatsApp". When it is hidden, the floating button is removed from the tab order. Headings run in order h1 → h2 → h3.
