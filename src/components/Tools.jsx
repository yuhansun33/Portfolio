import { TOOLS } from '../data/content.js';
import './Tools.css';

export default function Tools() {
  return (
    <section className="tools wrap" id="tools" aria-labelledby="tools-title">
      <header className="section-head">
        <h2 id="tools-title">{TOOLS.title}</h2>
      </header>
      <dl className="tool-groups">
        {TOOLS.groups.map((g) => (
          <div key={g.name}>
            <dt>{g.name}</dt>
            <dd>{g.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
