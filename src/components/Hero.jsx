import GlassK from './GlassK.jsx';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons.jsx';
import { HERO, LINKS } from '../data/content.js';
import './Hero.css';

const SOCIAL = [
  { href: LINKS.github, label: 'GitHub', Icon: GitHubIcon, external: true },
  { href: LINKS.linkedin, label: 'LinkedIn', Icon: LinkedInIcon, external: true },
  { href: LINKS.email, label: 'Email', Icon: MailIcon },
];

export default function Hero({ theme }) {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero-glow" aria-hidden="true" />
      {/* blurred and dimmed so it stays behind the words */}
      <GlassK className="hero-k" theme={theme} rot={[-0.08, -0.38, 0.02]} dist={30} maxDpr={1} follow />

      <div className="hero-words">
        <h1>{HERO.name}</h1>
        <p className="hero-tagline">{HERO.tagline}</p>
      </div>

      <div className="hero-card glass">
        <p>
          {HERO.detail.map(([text, strong]) => (strong ? <b key={text}>{text}</b> : text))}
        </p>
        <ul className="social">
          {SOCIAL.map(({ href, label, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
