import { Mail } from 'lucide-react';
import { ContactActions } from '../components/ContactActions';
import { business, email, owner, phone } from '../config/contact';

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
          </div>

          {/* The physical business card, re-set for the screen. */}
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
                    <a href={email.href}>
                      <Mail size={15} aria-hidden="true" />
                      {email.address}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <img className="card__logo" src={img('kg-logo-256.webp')} width="96" height="99" alt="" loading="lazy" />
            <figcaption className="card__strap">{business.name}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
