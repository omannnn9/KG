import { useEffect, useState, type RefObject } from 'react';
import { whatsapp } from '../config/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

/**
 * A compact WhatsApp shortcut that appears once both full-size WhatsApp buttons
 * (hero and contact) are off screen, so the main action is always one tap away.
 */
export function FloatingWhatsApp({ watch }: { watch: RefObject<HTMLElement | null>[] }) {
  const [visible, setVisible] = useState(false);

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
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <WhatsAppIcon size={22} />
      <span>WhatsApp</span>
      <span className="visually-hidden"> Ketan (opens WhatsApp)</span>
    </a>
  );
}
