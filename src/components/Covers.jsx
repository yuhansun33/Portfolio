import { useId } from 'react';

// Drawn covers for the project cards. Cards are light in both themes, so the
// palette here is fixed rather than themed.
const S = '#56606b'; // strokes, secondary marks
const A = '#46698c'; // accent
const L = '#c9d1da'; // light fills
const MACHINE = [A, '#8aa3bd', '#c3cfdb'];

// PAPIT: a grid of image tokens; only the ones the model would attend to stay filled
function Papit() {
  const cells = [];
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 14; i++) {
      const v = Math.sin(i * 0.7 + j * 0.9) + Math.cos(i * 0.33 - j * 0.5);
      const kept = v > 0.55;
      cells.push(
        <rect
          key={`${i}-${j}`} x={22 + i * 23} y={28 + j * 23} width="19" height="19" rx="3"
          fill={kept ? A : 'none'} fillOpacity={kept ? 0.35 + 0.4 * (v - 0.55) : 0} stroke={kept ? 'none' : L}
        />,
      );
    }
  }
  return cells;
}

// GNN: the job-shop problem as a disjunctive graph (rows = jobs, colours = machines,
// dashed = operations competing for one machine) above the schedule it produces
function Gnn() {
  const jobs = [[0, 1, 2], [1, 2, 0], [2, 0, 1]];
  const X = [100, 180, 260], Y = [34, 76, 118];
  const nodes = jobs.flatMap((ms, j) => ms.map((m, k) => ({ x: X[k], y: Y[j], m, key: `${j}${k}` })));
  const dashed = [];
  for (let m = 0; m < 3; m++) {
    const ns = nodes.filter((n) => n.m === m);
    for (let a = 0; a < ns.length; a++) {
      for (let b = a + 1; b < ns.length; b++) {
        const p = ns[a], q = ns[b], cx = (p.x + q.x) / 2 + (p.y === q.y ? 0 : 26), cy = (p.y + q.y) / 2;
        dashed.push(<path key={`d${m}${a}${b}`} d={`M${p.x} ${p.y}Q${cx} ${cy} ${q.x} ${q.y}`} fill="none" stroke={MACHINE[m]} strokeWidth="1.3" strokeDasharray="3 3" opacity=".9" />);
      }
    }
  }
  const gantt = [[[0, 50], [62, 110], [150, 205]], [[52, 118], [120, 168], [212, 262]], [[0, 44], [112, 150], [170, 236]]];
  return (
    <>
      {dashed}
      {Y.map((y) => (
        <g key={y} stroke={S} fill="none">
          <path d={`M38 76L${X[0] - 11} ${y}`} strokeOpacity=".45" />
          <path d={`M${X[2] + 11} ${y}L322 76`} strokeOpacity=".45" />
          {[0, 1].map((k) => (
            <g key={k} strokeOpacity=".6">
              <path d={`M${X[k] + 11} ${y}H${X[k + 1] - 13}`} />
              <path d={`M${X[k + 1] - 17} ${y - 3}l4 3-4 3`} />
            </g>
          ))}
        </g>
      ))}
      {nodes.map((n) => <circle key={n.key} cx={n.x} cy={n.y} r="10" fill={MACHINE[n.m]} stroke="#e3e7ec" strokeWidth="2.5" />)}
      <circle cx="32" cy="76" r="6" fill="#e3e7ec" stroke={S} strokeOpacity=".6" />
      <circle cx="328" cy="76" r="6" fill="#e3e7ec" stroke={S} strokeOpacity=".6" />
      <path d="M30 150H330" stroke={S} strokeOpacity=".25" />
      {gantt.map((row, m) => row.map(([a, b]) => (
        <rect key={`${m}-${a}`} x={32 + a * 1.1} y={160 + m * 17} width={(b - a) * 1.1 - 3} height="12" rx="3" fill={MACHINE[m]} />
      )))}
    </>
  );
}

// Trending platform: a live event stream (bars) and the trend line computed over it
function Trend() {
  let line = 'M24 170';
  for (let i = 0; i <= 30; i++) {
    const y = 150 - 70 * Math.abs(Math.sin(i * 0.25)) * (i / 30) - 10 * Math.sin(i * 0.9);
    line += ` L${24 + i * 10.4} ${y.toFixed(1)}`;
  }
  return (
    <>
      {Array.from({ length: 24 }, (_, i) => {
        const h = 6 + 14 * Math.abs(Math.sin(i * 1.7));
        return <rect key={i} x={26 + i * 13} y={190 - h} width="8" height={h} fill={L} />;
      })}
      <path d={line} fill="none" stroke={A} strokeWidth="2.2" />
    </>
  );
}

// RiceBook: a feed of posts, each with a profile picture
function RiceBook() {
  const id = useId();
  const tints = ['#9fb4ca', '#c8b7a6', '#a9c2b8'];
  return (
    <>
      <rect x="66" y="16" width="228" height="196" rx="12" fill="#fff" />
      <defs>
        {tints.map((_, i) => <clipPath key={i} id={`${id}av${i}`}><circle cx="92" cy={44 + i * 60} r="13" /></clipPath>)}
      </defs>
      {tints.map((tint, i) => {
        const y = 44 + i * 60;
        return (
          <g key={tint}>
            <g clipPath={`url(#${id}av${i})`}>
              <rect x="76" y={y - 16} width="32" height="32" fill={tint} />
              <circle cx="92" cy={y - 3} r="5" fill="#fff" />
              <ellipse cx="92" cy={y + 12} rx="9" ry="7" fill="#fff" />
            </g>
            <rect x="114" y={y - 9} width="70" height="7" rx="3.5" fill={S} fillOpacity=".6" />
            <rect x="190" y={y - 9} width="30" height="7" rx="3.5" fill={L} />
            <rect x="114" y={y + 3} width="156" height="6" rx="3" fill={L} />
            <rect x="114" y={y + 14} width="118" height="6" rx="3" fill={L} />
            <path d={`M258 ${y + 23}c-2-2.6-6 0-3.2 3l3.2 3 3.2-3c2.8-3-1.2-5.6-3.2-3z`} fill="none" stroke={S} strokeOpacity=".5" />
            <rect x="236" y={y + 21} width="11" height="8" rx="2.5" fill="none" stroke={S} strokeOpacity=".5" />
            {i < 2 && <path d={`M78 ${y + 34}H282`} stroke={L} strokeOpacity=".6" />}
          </g>
        );
      })}
    </>
  );
}

// Multi-agent tutor: an orchestrator fans out to agents whose answers are synthesised
function Tutor() {
  const AX = [62, 180, 298];
  const label = { fontSize: 11.5, fontWeight: 500, fontFamily: 'Rubik, sans-serif', textAnchor: 'middle' };
  const icons = [
    (x) => <g stroke={A} strokeWidth="1.6" fill="none" strokeLinecap="round"><circle cx={x - 22} cy="101" r="4.5" /><path d={`M${x - 18.5} 104.5l3 3`} /></g>,
    (x) => <path d={`M${x - 28} 96h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-7l-4 3v-3h-1a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z`} fill="none" stroke={A} strokeWidth="1.5" />,
    (x) => <path d={`M${x - 27} 101.5l3.5 3.5 6.5-7`} fill="none" stroke={A} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  ];
  return (
    <>
      {AX.map((x) => (
        <g key={x} fill="none" stroke={S} strokeOpacity=".45" strokeWidth="1.3">
          <path d={`M180 50C180 68 ${x} 64 ${x} 84`} />
          <path d={`M${x} 118C${x} 140 180 134 180 156`} />
        </g>
      ))}
      <rect x="118" y="18" width="124" height="32" rx="10" fill={A} />
      <text x="180" y="38" fill="#fff" {...label}>Orchestrator</text>
      {AX.map((x, i) => (
        <g key={x}>
          <rect x={x - 42} y="84" width="84" height="34" rx="10" fill="#fff" stroke={L} />
          {icons[i](x)}
          <text x={x + 6} y="105" fill="#2b323a" {...label}>Agent</text>
        </g>
      ))}
      <rect x="118" y="156" width="124" height="32" rx="10" fill="#fff" stroke={L} />
      <text x="180" y="176" fill="#2b323a" {...label}>Synthesizer</text>
      {[[121, 64], [239, 64], [180, 70], [121, 138], [239, 138]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill={A} />)}
      <path d="M180 188V204" stroke={S} strokeOpacity=".45" strokeWidth="1.3" />
      <rect x="150" y="202" width="60" height="12" rx="6" fill={A} fillOpacity=".25" />
    </>
  );
}

const COVERS = { papit: Papit, gnn: Gnn, trend: Trend, ricebook: RiceBook, tutor: Tutor };

export default function Cover({ name }) {
  const Art = COVERS[name];
  return (
    <svg viewBox="0 0 360 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Art />
    </svg>
  );
}
