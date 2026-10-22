import { useMemo, useRef } from 'react';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Interlude } from './sections/Interlude';
import { Services } from './sections/Services';
import { useLanguage } from './i18n/useLanguage';

export default function App() {
  const heroCta = useRef<HTMLAnchorElement>(null);
  const contactCta = useRef<HTMLAnchorElement>(null);
  const watched = useMemo(() => [heroCta, contactCta], []);
  const { t } = useLanguage();

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <Hero primaryCtaRef={heroCta} />
      <main id="main">
        <About />
        <Services />
        <Interlude />
        <Contact ctaRef={contactCta} />
      </main>
      <Footer />
      <FloatingWhatsApp watch={watched} />
    </>
  );
}
