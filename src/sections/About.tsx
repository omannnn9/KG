import { Reveal } from '../components/Reveal';
import { SectionTitle } from '../components/SectionTitle';
import { business, owner } from '../config/contact';
import { useLanguage } from '../i18n/useLanguage';

// Every principle restates a point made in the brochure's "Why choose us" and "About us" pages
// (copy lives in src/i18n/content.ts).
export function About() {
  const { t } = useLanguage();
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__intro" stagger={0.07}>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <SectionTitle id="about-title">{t.about.title}</SectionTitle>
          <p>{t.about.p1(business.name, owner.displayName)}</p>
          <p>{t.about.p2}</p>
        </Reveal>

        <Reveal className="principles" stagger={0.08}>
          {t.about.principles.map(item => (
            <div className="principles__item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
