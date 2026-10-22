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
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <Reveal className="services__head" stagger={0.07}>
          <p className="eyebrow">Services</p>
          <h2 id="services-title" className="section__title">
            What KG takes care of
          </h2>
          <p className="services__intro">
            One point of contact for the full life of a rental — so the owner never has to manage the details alone.
          </p>
        </Reveal>

        {/* Each stage rises as it reaches the reader, so the list unfolds with the scroll. */}
        <div className="stages">
          {stages.map((stage, index) => (
            <Reveal className="stage" key={stage.title} distance={24} threshold={0.08}>
              <span className="stage__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="stage__body">
                <h3 className="stage__title">{stage.title}</h3>
                <p className="stage__summary">{stage.summary}</p>
              </div>
              <ul className="stage__items">
                {stage.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="additional">
          <h3 className="additional__title">Additional services</h3>
          <Reveal className="additional__list" role="list" stagger={0.04} distance={14} duration={0.6}>
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
