import { business, email, owner, phone } from '../config/contact';

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
        <p className="footer__copy">© {year} {business.shortName}</p>
      </div>
    </footer>
  );
}
