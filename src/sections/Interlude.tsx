import { Reveal } from '../components/Reveal';
import { useLanguage } from '../i18n/useLanguage';

const img = (path: string) => `${import.meta.env.BASE_URL}images/${path}`;

// A quiet pause between the services and the contact panel. The photograph is the beach scene from
// the brochure's "About us" page, cropped to leave out the logo that is printed on it. The line is
// quoted from the brochure's "Why choose us" page.
export function Interlude() {
  const { t } = useLanguage();
  return (
    <section className="interlude" aria-label={t.interlude.label}>
      <div className="container">
        {/* The one wipe on the page: the brochure's own words, drawn up like a tide line. */}
        <Reveal wipe="up" distance={12} duration={1.1} threshold={0.2}>
          <blockquote className="interlude__quote">
            <p>{t.interlude.quote}</p>
            <footer>KG Rentals &amp; Property Management</footer>
          </blockquote>
        </Reveal>
      </div>
      {/* On scroll the frame opens to full width while the photograph drifts slowly (CSS scroll timeline). */}
      <picture className="interlude__photo">
        <source media="(max-width: 639px)" srcSet={img('coast-beach-900sq.webp')} />
        <source srcSet={`${img('coast-beach-1280.webp')} 1280w, ${img('coast-beach-1920.webp')} 1920w`} sizes="100vw" />
        <img
          src={img('coast-beach-1280.webp')}
          width="1280"
          height="692"
          alt={t.interlude.alt}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </section>
  );
}
