import { useEffect, useState } from 'react';
import { ArrowUpRight, Phone, UserRoundPlus } from 'lucide-react';
import { phone, vcard, whatsapp } from '../config/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

const vcardHref = `${import.meta.env.BASE_URL}${vcard.fileName}`;

type Props = {
  /** "dark" for the lagoon panels, "light" for sand sections. */
  tone: 'dark' | 'light';
  /** Lets the floating WhatsApp button know when this primary CTA is on screen. */
  primaryRef?: React.Ref<HTMLAnchorElement>;
};

export function WhatsAppButton({ tone, primaryRef }: Props) {
  // Immediate confirmation on tap. It never prevents or delays the link itself.
  const [opening, setOpening] = useState(false);
  useEffect(() => {
    if (!opening) return undefined;
    const timer = window.setTimeout(() => setOpening(false), 2400);
    return () => window.clearTimeout(timer);
  }, [opening]);

  return (
    <a
      ref={primaryRef}
      className={`btn btn--whatsapp btn--${tone}`}
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      data-opening={opening || undefined}
      onClick={() => setOpening(true)}
    >
      <span className="btn__badge">
        <WhatsAppIcon size={20} />
      </span>
      <span className="btn__label">{opening ? 'Opening WhatsApp…' : 'Message on WhatsApp'}</span>
      <ArrowUpRight className="btn__trail" size={18} aria-hidden="true" />
      <span className="visually-hidden"> to Ketan Gungah (opens WhatsApp)</span>
    </a>
  );
}

export function ContactActions({ tone, primaryRef }: Props) {
  return (
    <div className={`actions actions--${tone}`}>
      <WhatsAppButton tone={tone} primaryRef={primaryRef} />
      <div className="actions__secondary">
        <a className="btn btn--quiet" href={phone.href}>
          <Phone size={18} aria-hidden="true" />
          <span>Call {phone.display}</span>
        </a>
        <a className="btn btn--quiet" href={vcardHref} download={vcard.fileName} type="text/vcard">
          <UserRoundPlus size={18} aria-hidden="true" />
          <span>Save contact</span>
        </a>
      </div>
    </div>
  );
}
