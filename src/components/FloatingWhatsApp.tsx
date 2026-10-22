import { useEffect, useState, type RefObject } from 'react';
import { whatsappLink } from '../config/contact';
import { useLanguage } from '../i18n/useLanguage';
import { WhatsAppIcon } from './WhatsAppIcon';

/**
 * A WhatsApp shortcut that appears once both full-size WhatsApp buttons (hero and contact)
 * are off screen, so the main action is always one tap away. Phones get a slim bar docked
 * above the safe area; wider screens get a small pill in the corner.
 */
export function FloatingWhatsApp({ watch }: { watch: RefObject<HTMLElement | null>[] }) {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const targets = watch.map(ref => ref.current).filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return undefined;
    const onScreen = new Map<Element, boolean>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => onScreen.set(entry.target, entry.isIntersecting));
      setVisible(![...onScreen.values()].some(Boolean));
    });
    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [watch]);

  return (
    <a
      className="floating-wa"
      data-visible={visible}
      href={whatsappLink(t.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <WhatsAppIcon size={22} />
      <span className="floating-wa__long">{t.floating.long}</span>
      <span className="floating-wa__short">{t.floating.short}</span>
      <span className="visually-hidden"> {t.floating.sr}</span>
    </a>
  );
}
