import { LINKS } from '../data/content.js';
import './Footer.css';

const ITEMS = [
  ['GitHub', LINKS.github, true],
  ['LinkedIn', LINKS.linkedin, true],
  ['Email', LINKS.email, false],
  ['Résumé', LINKS.resume, true],
];

export default function Footer() {
  return (
    <footer className="footer wrap">
      <span>© {new Date().getFullYear()} Kerstin Sun · Houston</span>
      <ul>
        {ITEMS.map(([label, href, external]) => (
          <li key={label}>
            <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
