import { ArrowUpRight } from 'lucide-react';
import { ContactActions } from '../components/ContactActions';
import { InstagramIcon } from '../components/InstagramIcon';
import GlareHover from '../components/reactbits/GlareHover';
import { business, email, instagram, owner, phone } from '../config/contact';

const img = (path: string) => `${import.meta.env.BASE_URL}images/${path}`;

export function Contact({ ctaRef }: { ctaRef: React.Ref<HTMLAnchorElement> }) {
  return (
    <section className="contact frame" id="contact" aria-labelledby="contact-title">
      <div className="contact__panel panel">
        <div className="contact__grid">
          <div className="contact__copy">
            <p className="eyebrow eyebrow--on-dark">Contact</p>
            <h2 id="contact-title" className="section__title">
              Speak with Ketan directly.
            </h2>
            <p className="contact__lede">
              Whether you own a property that needs managing or have a question about a rental, a short WhatsApp message
              is the quickest way to start.
            </p>
            <ContactActions tone="dark" primaryRef={ctaRef} />
            <a className="contact__social" href={instagram.href} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={18} />
              <span>
                Follow on Instagram <span className="contact__handle">{instagram.handle}</span>
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>

          {/* The physical business card, re-set for the screen. A single glint passes over it, like light on laminate. */}
          <GlareHover
            className="card-glare"
            borderRadius="0"
            glareColor="#f3dfae"
            glareOpacity={0.28}
            glareAngle={-35}
            glareSize={38}
            variant="sheen"
            transitionDuration={1100}
            rimGlint={false}
            intro
            playOnce
          >
            <figure className="card" aria-label="Business card">
              <div className="card__text">
                <p className="card__name">
                  {owner.fullName.split(' ')[0]} <span>({owner.knownAs})</span>
                  <strong>{owner.fullName.split(' ').slice(1).join(' ')}</strong>
                </p>
                <p className="card__title">{owner.title}</p>
                <dl className="card__details">
                  <div>
                    <dt>Phone &amp; WhatsApp</dt>
                    <dd>
                      <a href={phone.href}>{phone.display}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={email.href}>{email.address}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Instagram</dt>
                    <dd>
                      <a href={instagram.href} target="_blank" rel="noopener noreferrer">
                        {instagram.handle}
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <img className="card__logo" src={img('kg-logo-256.webp')} width="96" height="99" alt="" loading="lazy" />
              <figcaption className="card__strap">{business.name}</figcaption>
            </figure>
          </GlareHover>
        </div>
      </div>
    </section>
  );
}
