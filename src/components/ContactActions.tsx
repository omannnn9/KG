import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Phone, UserRoundPlus } from 'lucide-react';
import { phone, vcard, whatsapp } from '../config/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

const vcardHref = `${import.meta.env.BASE_URL}${vcard.fileName}`;

type Props = {
  /** "dark" for the lagoon panels, "light" for sand sections. */
  tone: 'dark' | 'light';
  /** Lets the floating WhatsApp button know when this primary CTA is on screen. */
  primaryRef?: React.Ref<HTMLAnchorElement>;
};

/** A flag that switches on when an action fires and quietly resets, for tap confirmations. */
function useConfirmation(ms = 2400) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!active) return undefined;
    const timer = window.setTimeout(() => setActive(false), ms);
    return () => window.clearTimeout(timer);
  }, [active, ms]);
  return [active, () => setActive(true)] as const;
}

export function WhatsAppButton({ tone, primaryRef }: Props) {
  // Immediate confirmation on tap. It never prevents or delays the link itself.
  const [opening, confirm] = useConfirmation();
  const onClick = () => {
    confirm();
    // A single short tick where supported (Android); no permission involved, ignored elsewhere.
    navigator.vibrate?.(8);
  };

  return (
    <a
      ref={primaryRef}
      className={`btn btn--whatsapp btn--${tone}`}
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      data-opening={opening || undefined}
      onClick={onClick}
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
  const [saved, confirmSaved] = useConfirmation(3000);
  return (
    <div className={`actions actions--${tone}`}>
      <WhatsAppButton tone={tone} primaryRef={primaryRef} />
      <div className="actions__secondary">
        <a className="btn btn--quiet" href={phone.href}>
          <Phone size={18} aria-hidden="true" />
          <span>Call {phone.display}</span>
        </a>
        <a
          className="btn btn--quiet"
          href={vcardHref}
          download={vcard.fileName}
          type="text/vcard"
          data-done={saved || undefined}
          onClick={confirmSaved}
        >
          {saved ? <Check size={18} aria-hidden="true" /> : <UserRoundPlus size={18} aria-hidden="true" />}
          <span aria-live="polite">{saved ? 'Contact card ready' : 'Save contact'}</span>
        </a>
      </div>
    </div>
  );
}
