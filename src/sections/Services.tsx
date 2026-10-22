import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../i18n/useLanguage';

// The eleven services from the brochure's "Our services" page, grouped by when an owner needs them,
// and its "Additional services" page. Copy (EN/FR) lives in src/i18n/content.ts; the brochure marks
// Expatriation with an asterisk but prints no footnote, so the page asks visitors to enquire.

export function Services() {
  // The stages read as a timeline of a tenancy. One is open at a time; the first starts open
  // so the section never looks empty, and every stage is one tap (or Enter/Space) away.
  const [open, setOpen] = useState(0);
  const { t } = useLanguage();
  const baseId = useId();

  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container services__layout">
        <Reveal className="services__head" stagger={0.07}>
          <p className="eyebrow">{t.services.eyebrow}</p>
          <SectionTitle id="services-title">{t.services.title}</SectionTitle>
          <p className="services__intro">{t.services.intro}</p>
        </Reveal>

        <Reveal className="timeline" stagger={0.08} distance={20}>
          {t.services.stages.map((stage, index) => {
            const isOpen = open === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <div className="stage" data-open={isOpen || undefined} key={stage.title}>
                <h3 className="stage__heading">
                  <button
                    type="button"
                    id={buttonId}
                    className="stage__toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span className="stage__index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="stage__title">{stage.title}</span>
                    <span className="stage__count">{t.services.count(stage.items.length)}</span>
                    <ChevronDown className="stage__chevron" size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div className="stage__panel" id={panelId} role="region" aria-labelledby={buttonId} inert={!isOpen}>
                  <div className="stage__panel-inner">
                    <p className="stage__summary">{stage.summary}</p>
                    <ul className="stage__items">
                      {stage.items.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>

        <div className="additional">
          <h3 className="additional__title">{t.services.additionalTitle}</h3>
          <Reveal className="additional__list" role="list" stagger={0.05} distance={12} duration={0.6}>
            {t.services.additional.map(item => (
              <span className="additional__item" role="listitem" key={item}>
                {item}
              </span>
            ))}
          </Reveal>
          <p className="additional__note">{t.services.note}</p>
        </div>
      </div>
    </section>
  );
}
