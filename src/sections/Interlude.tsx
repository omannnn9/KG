import FadeContent from '../components/reactbits/FadeContent';

const img = (path: string) => `${import.meta.env.BASE_URL}images/${path}`;

// A quiet pause between the services and the contact panel. The photograph is the beach scene from
// the brochure's "About us" page, cropped to leave out the logo that is printed on it. The line is
// quoted from the brochure's "Why choose us" page.
export function Interlude() {
  return (
    <section className="interlude" aria-label="KG Rentals approach">
      <div className="container">
        <FadeContent duration={0.9} threshold={0.2}>
          <blockquote className="interlude__quote">
            <p>
              “Our hands-on approach allows owners to enjoy peace of mind while we handle every operational detail with
              precision and care.”
            </p>
            <footer>KG Rentals &amp; Property Management</footer>
          </blockquote>
        </FadeContent>
      </div>
      <picture className="interlude__photo">
        <source media="(max-width: 639px)" srcSet={img('coast-beach-800.webp')} />
        <source srcSet={`${img('coast-beach-1280.webp')} 1280w, ${img('coast-beach-1920.webp')} 1920w`} sizes="100vw" />
        <img
          src={img('coast-beach-1280.webp')}
          width="1280"
          height="692"
          alt="A quiet beach with palm trees leaning over clear, shallow water."
          loading="lazy"
          decoding="async"
        />
      </picture>
    </section>
  );
}
