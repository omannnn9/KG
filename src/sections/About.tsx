import FadeContent from '../components/reactbits/FadeContent';
import { business, owner } from '../config/contact';

// Every principle restates a point made in the brochure's "Why choose us" and "About us" pages.
const principles = [
  {
    title: 'Meticulous tenant selection',
    text: 'Tenants are sourced and screened with care, because the right tenant protects the value of the property.',
  },
  {
    title: 'Proactive maintenance',
    text: 'Upkeep is coordinated before small issues grow, keeping the property well-maintained, compliant and attractive in the market.',
  },
  {
    title: 'Clear communication',
    text: 'Owners stay informed through direct contact and owner reporting, with every operational detail handled with precision.',
  },
  {
    title: 'A trusted network',
    text: 'Established collaborations with partners across the real estate and property services sector mean seamless coordination.',
  },
];

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__intro">
          <p className="eyebrow">About {business.shortName}</p>
          <h2 id="about-title" className="section__title">
            Your property is a valuable asset — and it is treated accordingly.
          </h2>
          <p>
            {business.name} is led by its director, {owner.displayName}. The firm offers a discreet, professional and
            high-standard management service, designed to protect long-term value and optimise returns.
          </p>
          <p>
            Its hands-on approach means attentive oversight, timely execution and consistently high standards across
            every property it manages.
          </p>
        </div>

        <FadeContent className="principles" stagger={0.08} duration={0.7} threshold={0.15}>
          {principles.map(item => (
            <div className="principles__item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </FadeContent>
      </div>
    </section>
  );
}
