import { useEffect, useRef, useState } from 'react';
import Cover from './Covers.jsx';
import { ArrowIcon } from './Icons.jsx';
import { PROJECTS } from '../data/content.js';
import './Projects.css';

const QUERY = '(min-width: 761px) and (prefers-reduced-motion: no-preference)';
const GAP = 390; // horizontal distance between card centres (px)

// The scroll-driven arc only runs on wide screens with motion allowed;
// everywhere else the cards are a plain swipeable row.
function useArcMode() {
  const [on, setOn] = useState(() => window.matchMedia(QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setOn(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return on;
}

function Card({ p, i, n }) {
  const Tag = p.href ? 'a' : 'article';
  const linkProps = p.href ? { href: p.href, target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Tag className={`card${p.href ? ' is-link' : ''}`} {...linkProps}>
      <div className="card-cover">
        <Cover name={p.cover} />
        <span className="card-num">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        <span className="card-tag">{p.tag}</span>
      </div>
      <div className="card-body">
        <h3>{p.title}{p.href && <span className="card-arrow" aria-label="(opens on GitHub)"><ArrowIcon /></span>}</h3>
        <hr />
        <p>{p.text}</p>
        <div className="card-meta"><span>{p.stack}</span><span>{p.meta}</span></div>
      </div>
    </Tag>
  );
}

export default function Projects() {
  const { items } = PROJECTS;
  const arc = useArcMode();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const countRef = useRef(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!arc) {
      cards.forEach((c) => c && (c.style.transform = ''));
      return undefined;
    }
    const sec = sectionRef.current;
    let frame = 0;
    const layout = () => {
      frame = 0;
      const r = sec.getBoundingClientRect();
      const span = sec.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / span));
      const W = window.innerWidth, N = cards.length;
      // the whole row travels from off-screen right to off-screen left along an arc
      const start = W / 2 + GAP * 0.6, end = -(GAP * (N - 1) + W / 2 + GAP * 0.6);
      const head = start + (end - start) * p;
      let best = 0, bestD = Infinity;
      cards.forEach((c, i) => {
        const x = head + i * GAP, u = x / (W * 0.62);
        c.style.transform = `translate3d(${x.toFixed(1)}px, ${(150 * u * u).toFixed(1)}px, 0) rotate(${(u * 7).toFixed(2)}deg)`;
        c.style.zIndex = String(10 - Math.round(Math.abs(u) * 5));
        if (Math.abs(x) < bestD) { bestD = Math.abs(x); best = i; }
      });
      if (countRef.current) countRef.current.textContent = `${String(best + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(layout); };
    layout();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [arc]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`projects${arc ? ' is-arc' : ''}`}
      style={arc ? { height: `${100 + items.length * 80}vh` } : undefined}
      aria-labelledby="projects-title"
    >
      <div className="projects-stage">
        <header className="section-head projects-head">
          <h2 id="projects-title">{PROJECTS.title}</h2>
          <p>{PROJECTS.intro}</p>
          {arc && <span className="projects-count" ref={countRef} aria-hidden="true">01 / {String(items.length).padStart(2, '0')}</span>}
        </header>
        <div className="cards">
          {items.map((p, i) => (
            <div key={p.id} className="card-slot" ref={(el) => (cardsRef.current[i] = el)}>
              <Card p={p} i={i} n={items.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
