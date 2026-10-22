import { Phone } from 'lucide-react';
import FadeContent from '../components/FadeContent';
import { ContactActions } from '../components/ContactActions';
import { business, owner, phone } from '../config/contact';

const img = (path: string) => `${import.meta.env.BASE_URL}images/${path}`;

export function Hero({ primaryCtaRef }: { primaryCtaRef: React.Ref<HTMLAnchorElement> }) {
  return (
    // The outer frame of coastline photography with an inset dark panel mirrors the physical card.
    <header className="hero frame" id="top">
      <div className="hero__panel panel">
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
              <circle cx="50" cy="50" r="49.5" />
            </svg>
            <FadeContent trigger="mount" effect="develop" duration={1.4} delay={0.1} className="hero__portrait-reveal">
              <img
                src={img('ketan-gungah.webp')}
                srcSet={`${img('ketan-gungah-400.webp')} 400w, ${img('ketan-gungah.webp')} 591w`}
                sizes="(min-width: 1024px) 420px, 300px"
                width="591"
                height="1179"
                alt={`${owner.displayName}, ${owner.title} of ${business.name}, in a dark three-piece suit and red tie`}
                fetchPriority="high"
              />
            </FadeContent>
          </div>

          <div className="hero__copy">
            <p className="hero__person">
              <span className="hero__name">{owner.displayName}</span>
              <span className="hero__title">
                {owner.title}, {business.shortName}
              </span>
            </p>
            <h1 className="hero__headline">Refined property management, delivered with precision.</h1>
            <p className="hero__lede">
              A tailored, hands-on service for property owners who value discretion — from finding the right tenant to
              rent, maintenance and reporting.
            </p>
            <ContactActions tone="dark" primaryRef={primaryCtaRef} />
          </div>
        </div>
      </div>
    </header>
  );
}
