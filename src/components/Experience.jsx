import { useEffect, useRef, useState } from 'react';
import { EXPERIENCE } from '../data/content.js';
import './Experience.css';

const T0 = 2020.4, T1 = 2027.1;
const pct = (t) => `${(((t - T0) / (T1 - T0)) * 100).toFixed(2)}%`;
const YEARS = Array.from({ length: 7 }, (_, i) => 2021 + i);
const LANES = [['work', 'Work'], ['edu', 'Education']];

export default function Experience() {
  const { items, now } = EXPERIENCE;
  const [hot, setHot] = useState(null);
  const bind = (id) => ({ onMouseEnter: () => setHot(id), onMouseLeave: () => setHot(null) });
  const scrollRef = useRef(null);

  // on narrow screens the timeline scrolls sideways; start at the most recent end
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  return (
    <section className="experience wrap" id="experience" aria-labelledby="experience-title">
      <header className="section-head experience-head">
        <h2 id="experience-title">{EXPERIENCE.title}</h2>
        <p>{EXPERIENCE.intro}</p>
      </header>

      {/* decorative overview; the list below carries the same facts for screen readers */}
      <div className="timeline-scroll" ref={scrollRef} aria-hidden="true">
        <div className="timeline">
          {LANES.map(([kind, label]) => (
            <div className="lane" key={kind}>
              <b>{label}</b>
              <div className="lane-track">
                {items.filter((x) => x.kind === kind).map((x) => (
                  <div
                    key={x.id}
                    className={`bar is-${kind}${x.end - x.start < 0.7 ? ' is-narrow' : ''}${hot === x.id ? ' is-hot' : ''}`}
                    style={{ left: pct(x.start), width: `calc(${pct(x.end)} - ${pct(x.start)})` }}
                    {...bind(x.id)}
                  >
                    <span>{x.short}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="axis">
            {YEARS.map((y) => <span key={y} style={{ left: pct(y) }}>{y}</span>)}
            <i className="now" style={{ left: pct(now) }}><em>now</em></i>
          </div>
        </div>
      </div>

      <ol className="roles">
        {items.map((x) => (
          <li key={x.id} className={hot === x.id ? 'is-hot' : undefined} {...bind(x.id)}>
            <span className="logo"><img src={x.logo} alt={x.org} loading="lazy" /></span>
            <h3>{x.role}<small>{x.org} · {x.where}</small></h3>
            <p>{x.text}</p>
            <span className="dates">{x.dates}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
