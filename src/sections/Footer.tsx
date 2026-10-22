import { InstagramIcon } from '../components/InstagramIcon';
import { business, email, emailLink, instagram, owner, phone } from '../config/contact';
import { useLanguage } from '../i18n/useLanguage';

const year = new Date().getFullYear();

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__brand">{business.name}</p>
        <p className="footer__meta">
          {owner.displayName}, {t.role} · <a href={phone.href}>{phone.display}</a> ·{' '}
          <a href={emailLink(t.emailSubject)}>{email.address}</a>
        </p>
        <a className="footer__social" href={instagram.href} target="_blank" rel="noopener noreferrer">
          <InstagramIcon size={16} />
          <span>Instagram</span>
          <span className="visually-hidden">
            {' '}
            {instagram.handle} {t.instagram.newTab}
          </span>
        </a>
        <p className="footer__copy">
          © {year} {business.shortName}
        </p>
      </div>
    </footer>
  );
}
