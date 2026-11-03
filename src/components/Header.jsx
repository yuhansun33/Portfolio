import { useEffect, useState } from 'react';
import GlassK from './GlassK.jsx';
import { ArrowIcon, MenuIcon, MoonIcon, SunIcon } from './Icons.jsx';
import { LINKS, NAV } from '../data/content.js';
import './Header.css';

// Highlights the nav item of the section currently in the middle of the viewport.
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const IDS = NAV.map((n) => n.id);

export default function Header({ theme, onToggleTheme, pastHero }) {
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`top${pastHero ? ' is-past-hero' : ''}`}>
      <a className="brand" href="#top" aria-label="Kerstin Sun, back to top">
        <GlassK className="brand-k" theme={theme} rot={[-0.12, -0.5, 0.02]} dist={31} />
        <span className="brand-name">Kerstin Sun</span>
      </a>

      <nav className={`pill glass${open ? ' is-open' : ''}`} id="site-nav" aria-label="Sections">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={active === n.id ? 'is-active' : undefined}
            aria-current={active === n.id ? 'location' : undefined}
            onClick={() => setOpen(false)}
          >
            {n.label}
          </a>
        ))}
      </nav>

      <div className="top-right">
        <button
          type="button"
          className="round glass"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <a className="cta glass" href={LINKS.resume} target="_blank" rel="noopener noreferrer">
          Résumé <i><ArrowIcon /></i>
        </a>
        <button
          type="button"
          className="round glass menu-btn"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <MenuIcon open={open} />
        </button>
      </div>
    </header>
  );
}
