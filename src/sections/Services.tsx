import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from '../components/Reveal';

// The eleven services from the brochure's "Our services" page, grouped by when an owner needs them.
// Item names are kept as printed; the group summaries only describe what the items already say.
const stages = [
  {
    title: 'Before the tenancy',
    summary: 'Getting the property ready to let and finding the right people to live in it.',
    items: ['Property set-up', 'Tenant sourcing & screening'],
  },
  {
    title: 'During the tenancy',
    summary: 'The lease and the tenant relationship, handled from the first day to the last.',
    items: ['Lease management', 'Check-in and check-out handling', 'Tenant support'],
  },
  {
    title: 'Day-to-day care',
    summary: 'The running of the property, including the periods when it stands empty.',
    items: [
      'Rent collection',
      'Utilities & charges management',
      'Maintenance coordination',
      'Property inspections',
      'Vacant property supervision',
    ],
  },
  {
    title: 'Keeping owners informed',
    summary: 'A clear picture of how the property is being looked after.',
    items: ['Owner reporting'],
  },
];

// From the brochure's "Additional services" page. The brochure marks Expatriation with an
// asterisk but does not print the footnote, so the page asks visitors to enquire.
const additional = [
  'Licensing and permits',
  'Property photo shoot',
  'Company set-up',
  'Accounting services',
  'Expatriation*',
];

export function Services() {
  // The stages read as a timeline of a tenancy. One is open at a time; the first starts open
  // so the section never looks empty, and every stage is one tap (or Enter/Space) away.
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container services__layout">
        <Reveal className="services__head" stagger={0.07}>
          <p className="eyebrow">Services</p>
          <h2 id="services-title" className="section__title">
            What KG takes care of
          </h2>
          <p className="services__intro">
            One point of contact for the full life of a rental — so the owner never has to manage the details alone.
          </p>
        </Reveal>

        {/* Brochure photograph ("Our services" page), cropped clear of its printed logo. It sets the scene
            and is not presented as a KG listing. It unveils and drifts with the scroll (CSS view timeline). */}
        <figure className="services__figure">
          <img
            src={`${import.meta.env.BASE_URL}images/terrace-640.webp`}
            srcSet={`${import.meta.env.BASE_URL}images/terrace-640.webp 640w, ${import.meta.env.BASE_URL}images/terrace-1000.webp 1000w`}
            sizes="(min-width: 820px) 40vw, 100vw"
            width="1000"
            height="1000"
            alt="A shaded terrace beside an infinity pool, looking out to sea."
            loading="lazy"
            decoding="async"
          />
        </figure>

        <Reveal className="timeline" stagger={0.08} distance={20}>
          {stages.map((stage, index) => {
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
                    <span className="stage__count">
                      {stage.items.length} {stage.items.length === 1 ? 'service' : 'services'}
                    </span>
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
          <h3 className="additional__title">Additional services</h3>
          <Reveal className="additional__list" role="list" stagger={0.05} distance={12} duration={0.6}>
            {additional.map(item => (
              <span className="additional__item" role="listitem" key={item}>
                {item}
              </span>
            ))}
          </Reveal>
          <p className="additional__note">*Ask Ketan for details on expatriation services.</p>
        </div>
      </div>
    </section>
  );
}
