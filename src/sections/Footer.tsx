import { InstagramIcon } from '../components/InstagramIcon';
import { business, email, instagram, owner, phone } from '../config/contact';

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__brand">{business.name}</p>
        <p className="footer__meta">
          {owner.displayName}, {owner.title} · <a href={phone.href}>{phone.display}</a> ·{' '}
          <a href={email.href}>{email.address}</a>
        </p>
        <a className="footer__social" href={instagram.href} target="_blank" rel="noopener noreferrer">
          <InstagramIcon size={16} />
          <span>Instagram</span>
          <span className="visually-hidden"> {instagram.handle} (opens in a new tab)</span>
        </a>
        <p className="footer__copy">
          © {year} {business.shortName}
        </p>
      </div>
    </footer>
  );
}
