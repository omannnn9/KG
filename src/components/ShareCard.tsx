import { Check, Share2 } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';
import { useConfirmation } from './useConfirmation';

/**
 * Opens the phone's native share sheet with this page (WhatsApp, Messages, Mail…).
 * Where there is no share sheet (most desktop browsers) it copies the link and says so.
 */
export function ShareCard() {
  const { t } = useLanguage();
  const [copied, confirmCopied] = useConfirmation(2600);

  const share = async () => {
    const url = `${window.location.origin}${import.meta.env.BASE_URL}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, text: t.contact.shareText, url });
      } catch {
        // Closing the share sheet rejects; nothing to do.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      confirmCopied();
    } catch {
      window.prompt(t.contact.share, url);
    }
  };

  return (
    <button type="button" className="contact__share" onClick={share} data-done={copied || undefined}>
      {copied ? <Check size={18} aria-hidden="true" /> : <Share2 size={18} aria-hidden="true" />}
      <span aria-live="polite">{copied ? t.contact.shareCopied : t.contact.share}</span>
    </button>
  );
}
