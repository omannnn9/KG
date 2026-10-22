import { lazy, Suspense } from 'react';
import { Phone } from 'lucide-react';
import { ContactActions } from '../components/ContactActions';
import { HeadlineReveal } from '../components/HeadlineReveal';
import { InstagramIcon } from '../components/InstagramIcon';
import { useReducedMotion } from '../components/useReducedMotion';
import { business, instagram, owner, phone } from '../config/contact';

// WebGL sunlight is decorative, so it loads after the page and never under reduced motion.
const LightRays = lazy(() => import('../components/reactbits/LightRays'));

const img = (path: string) => `${import.meta.env.BASE_URL}images/${path}`;

/*
 * Opening sequence (≈1.3s, everything is tappable from the first frame):
 *   0.0s  warm colour field settles into the deep lagoon tone; sunlight opens
 *   0.1s  portrait is unveiled from the top down
 *   0.35s headline rises line by line
 *   0.6s  name, Instagram and lede follow
 *   0.8s  contact actions finish
 * The CSS steps live under "Hero entrance" in styles.css; the headline uses HeadlineReveal.
 */
export function Hero({ primaryCtaRef }: { primaryCtaRef: React.Ref<HTMLAnchorElement> }) {
  const reducedMotion = useReducedMotion();

  return (
    // The outer frame of coastline photography with an inset dark panel mirrors the physical card.
    <header className="hero frame" id="top">
      <div className="hero__panel panel">
        <div className="hero__dawn" aria-hidden="true" />
        <div className="hero__light" aria-hidden="true">
          {!reducedMotion && (
            <Suspense fallback={null}>
              <LightRays
                raysOrigin="top-right"
                raysColor="#f3dfae"
                raysSpeed={0.25}
                lightSpread={0.7}
                rayLength={1.9}
                fadeDistance={0.85}
                raySharpness={0.45}
                glow={0.5}
                haze={0.2}
                saturation={0.85}
                intensity={1.1}
                opacity={0.8}
                followMouse={false}
                cursorShadow={false}
                clickPulse={false}
                maxDevicePixelRatio={1}
              />
            </Suspense>
          )}
        </div>

        <nav className="topbar" aria-label="Primary">
          <a className="topbar__brand" href="#top">
            <img
              src={img('kg-logo-128.webp')}
              srcSet={`${img('kg-logo-128.webp')} 128w, ${img('kg-logo-256.webp')} 256w`}
              sizes="56px"
              width="56"
              height="58"
              alt={business.name}
            />
            <span className="topbar__name" aria-hidden="true">
              Rentals &amp; Property Management
            </span>
          </a>
          <ul className="topbar__links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <a className="topbar__call" href={phone.href} aria-label={`Call ${owner.displayName} on ${phone.display}`}>
            <Phone size={18} aria-hidden="true" />
          </a>
        </nav>

        <div className="hero__grid">
          <div className="hero__portrait">
            <svg className="hero__ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
              <circle cx="50" cy="50" r="49.5" pathLength={1} />
            </svg>
            <div className="hero__portrait-reveal">
              <img
                src={img('ketan-gungah.webp')}
                srcSet={`${img('ketan-gungah-400.webp')} 400w, ${img('ketan-gungah.webp')} 591w`}
                sizes="(min-width: 1024px) 420px, 300px"
                width="591"
                height="1179"
                alt={`${owner.displayName}, ${owner.title} of ${business.name}, in a dark three-piece suit and red tie`}
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="hero__copy">
            <div className="hero__person enter enter--3">
              <p>
                <span className="hero__name">{owner.displayName}</span>
                <span className="hero__title">
                  {owner.title}, {business.shortName}
                </span>
              </p>
              <a className="hero__social" href={instagram.href} target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={16} />
                <span>Instagram</span>
                <span className="visually-hidden"> {instagram.handle} (opens in a new tab)</span>
              </a>
            </div>
            <HeadlineReveal className="hero__headline">
              Refined property management, delivered with <em>precision.</em>
            </HeadlineReveal>
            <p className="hero__lede enter enter--3">
              A tailored, hands-on service for property owners who value discretion — from finding the right tenant to
              rent, maintenance and reporting.
            </p>
            <div className="enter enter--4">
              <ContactActions tone="dark" primaryRef={primaryCtaRef} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
