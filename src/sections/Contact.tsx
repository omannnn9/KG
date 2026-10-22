import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ContactActions } from '../components/ContactActions';
import { InstagramIcon } from '../components/InstagramIcon';
import { Reveal } from '../components/Reveal';
import { SectionTitle } from '../components/SectionTitle';
import { ShareCard } from '../components/ShareCard';
import { useTilt } from '../components/useTilt';
import GlareHover from '../components/reactbits/GlareHover';
import SplitText from '../components/reactbits/SplitText';
import { business, email, emailLink, instagram, owner, phone } from '../config/contact';
import { useLanguage } from '../i18n/useLanguage';

const img = (path: string) => `${import.meta.env.BASE_URL}images/${path}`;

const [givenName, ...familyNames] = owner.fullName.split(' ');

export function Contact({ ctaRef }: { ctaRef: React.Ref<HTMLAnchorElement> }) {
  const { t } = useLanguage();
  const tiltRef = useRef<HTMLDivElement>(null);
  useTilt(tiltRef);

  return (
    <section className="contact frame" id="contact" aria-labelledby="contact-title">
      <div className="contact__panel panel">
        <div className="contact__grid">
          <div className="contact__copy">
            <Reveal stagger={0.07}>
              <p className="eyebrow eyebrow--on-dark">{t.contact.eyebrow}</p>
              <SectionTitle id="contact-title">{t.contact.title}</SectionTitle>
              <p className="contact__lede">{t.contact.lede}</p>
            </Reveal>
            {/* Contact actions are never hidden behind a reveal. */}
            <ContactActions tone="dark" primaryRef={ctaRef} />
            <div className="contact__more">
              <a className="contact__social" href={instagram.href} target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={18} />
                <span>
                  {t.instagram.follow} <span className="contact__handle">{instagram.handle}</span>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="visually-hidden"> {t.instagram.newTab}</span>
              </a>
              <ShareCard />
            </div>
          </div>

          {/* The physical business card, re-set for the screen: it tilts towards the pointer or finger,
              a single glint passes over it, and his name is written out letter by letter. */}
          <Reveal className="contact__card" scale={0.96} distance={32} duration={1}>
            <div className="tilt" ref={tiltRef}>
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
                <figure className="card" aria-label={t.contact.cardLabel}>
                  <div className="card__text">
                    <p className="card__name">
                      <SplitText
                        text={`${givenName} (${owner.knownAs})`}
                        tag="span"
                        splitType="chars"
                        effect="blur"
                        delay={45}
                        duration={0.9}
                        threshold={0.3}
                        rootMargin="-40px"
                        textAlign="left"
                      />
                      <strong>
                        <SplitText
                          text={familyNames.join(' ')}
                          tag="span"
                          splitType="chars"
                          delay={90}
                          duration={0.8}
                          from={{ opacity: 0, y: 10 }}
                          to={{ opacity: 1, y: 0, delay: 0.9 }}
                          threshold={0.3}
                          rootMargin="-40px"
                          textAlign="left"
                        />
                      </strong>
                    </p>
                    <p className="card__title">{t.role}</p>
                    <dl className="card__details">
                      <div>
                        <dt>{t.contact.phoneLabel}</dt>
                        <dd>
                          <a href={phone.href}>{phone.display}</a>
                        </dd>
                      </div>
                      <div>
                        <dt>{t.contact.emailLabel}</dt>
                        <dd>
                          <a href={emailLink(t.emailSubject)}>{email.address}</a>
                        </dd>
                      </div>
                      <div>
                        <dt>{t.contact.instagramLabel}</dt>
                        <dd>
                          <a href={instagram.href} target="_blank" rel="noopener noreferrer">
                            {instagram.handle}
                            <span className="visually-hidden"> {t.instagram.newTab}</span>
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <img
                    className="card__logo"
                    src={img('kg-logo-256.webp')}
                    width="96"
                    height="99"
                    alt=""
                    loading="lazy"
                  />
                  <figcaption className="card__strap">{business.name}</figcaption>
                </figure>
              </GlareHover>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
