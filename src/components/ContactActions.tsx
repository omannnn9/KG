import { ArrowUpRight, Check, Phone, UserRoundPlus } from 'lucide-react';
import { phone, vcard, whatsappLink } from '../config/contact';
import { useLanguage } from '../i18n/useLanguage';
import ClickSpark from './reactbits/ClickSpark';
import { useConfirmation } from './useConfirmation';
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
  const [opening, confirm] = useConfirmation();
  const { t } = useLanguage();
  const onClick = () => {
    confirm();
    // A single short tick where supported (Android); no permission involved, ignored elsewhere.
    navigator.vibrate?.(8);
  };

  return (
    <a
      ref={primaryRef}
      className={`btn btn--whatsapp btn--${tone}`}
      href={whatsappLink(t.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      data-opening={opening || undefined}
      onClick={onClick}
    >
      <span className="btn__badge">
        <WhatsAppIcon size={20} />
      </span>
      <span className="btn__label">{opening ? t.actions.whatsappOpening : t.actions.whatsapp}</span>
      <ArrowUpRight className="btn__trail" size={18} aria-hidden="true" />
      <span className="visually-hidden">{t.actions.whatsappSr}</span>
    </a>
  );
}

export function ContactActions({ tone, primaryRef }: Props) {
  const [saved, confirmSaved] = useConfirmation(3000);
  const { t } = useLanguage();
  return (
    // React Bits ClickSpark: a small burst of gold sparks where a contact action is tapped.
    // Purely visual, drawn under pointer-events: none, so the links fire exactly as before.
    <ClickSpark
      className={`actions actions--${tone}`}
      style={{ height: 'auto' }}
      sparkColor={['#e1c47e', '#f3dfae']}
      sparkSize={7}
      sparkRadius={22}
      sparkCount={8}
      duration={450}
    >
      <WhatsAppButton tone={tone} primaryRef={primaryRef} />
      <div className="actions__secondary">
        <a className="btn btn--quiet" href={phone.href}>
          <Phone size={18} aria-hidden="true" />
          <span>
            {t.actions.call} {phone.display}
          </span>
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
          <span aria-live="polite">{saved ? t.actions.saved : t.actions.save}</span>
        </a>
      </div>
    </ClickSpark>
  );
}
