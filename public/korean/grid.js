import { CURRENT_LESSON, GROUPS } from './data.js';
import { compose, speak } from './korean.js';

const CONS = [
  ['ㄱ', 'g'], ['ㄴ', 'n'], ['ㄷ', 'd'], ['ㄹ', 'r'], ['ㅁ', 'm'], ['ㅂ', 'b'], ['ㅅ', 's'], ['ㅇ', ''], ['ㅈ', 'j'],
  ['ㅊ', 'ch'], ['ㅋ', 'k'], ['ㅌ', 't'], ['ㅍ', 'p'], ['ㅎ', 'h'],
  ['ㄲ', 'kk'], ['ㄸ', 'tt'], ['ㅃ', 'pp'], ['ㅆ', 'ss'], ['ㅉ', 'jj'],
];
const VOWS = [
  ['ㅏ', 'a'], ['ㅑ', 'ya'], ['ㅓ', 'eo'], ['ㅕ', 'yeo'], ['ㅗ', 'o'], ['ㅛ', 'yo'], ['ㅜ', 'u'], ['ㅠ', 'yu'], ['ㅡ', 'eu'], ['ㅣ', 'i'],
  ['ㅐ', 'ae'], ['ㅒ', 'yae'], ['ㅔ', 'e'], ['ㅖ', 'ye'], ['ㅘ', 'wa'], ['ㅙ', 'wae'], ['ㅚ', 'oe'], ['ㅝ', 'wo'], ['ㅞ', 'we'], ['ㅟ', 'wi'], ['ㅢ', 'ui'],
];
// vowels from lessons already taught get the green edge
const LEARNED = new Set(
  GROUPS.filter((g) => g.lesson <= CURRENT_LESSON && g.id.startsWith('v')).flatMap((g) => g.items.map((i) => i[0])),
);

let all = false;
let hide = false;
let pick = null; // [row, col] of the last tapped block
const shown = new Set(); // blocks revealed while romanization is hidden

const table = document.getElementById('grid');

function render() {
  const cs = all ? CONS : CONS.slice(0, 14);
  const vs = all ? VOWS : VOWS.slice(0, 10);
  const [pr, pc] = pick || [-1, -1];
  // one hue per consonant column, as in the original chart; cards stay light in both themes
  const hue = (i) => `hsl(${Math.round((i * 330) / cs.length)} 68% 38%)`;
  let h = '<thead><tr><td aria-hidden="true"></td>';
  cs.forEach((c, i) => {
    h += `<th scope="col" class="${i === pc ? 'cur' : ''}"><span class="hj" style="color:${hue(i)}">${c[0]}</span><span class="hr">${c[1] || 'silent'}</span></th>`;
  });
  h += '</tr></thead><tbody>';
  vs.forEach((v, r) => {
    const cls = [LEARNED.has(v[0]) ? 'learned' : '', r === pr ? 'cur' : ''].join(' ').trim();
    h += `<tr class="${cls}"><th scope="row"><span class="hj">${v[0]}</span><span class="hr">${v[1]}</span></th>`;
    cs.forEach((c, i) => {
      const s = compose(c[0], v[0]);
      const cell = r === pr && i === pc ? 'pick' : r === pr || i === pc ? 'cross' : '';
      const rom = c[1] + v[1];
      h += `<td class="${cell}"><button type="button" class="${shown.has(s) ? 'shown' : ''}" data-r="${r}" data-c="${i}" data-s="${s}" aria-label="${s}, ${rom}"><span class="syl" lang="ko" style="color:${hue(i)}">${s}</span><span class="rom">${rom}</span></button></td>`;
    });
    h += '</tr>';
  });
  table.innerHTML = h + '</tbody>';
  document.body.classList.toggle('hide-roman', hide);
}

table.addEventListener('click', (e) => {
  const b = e.target.closest('td button');
  if (!b) return;
  const s = b.dataset.s;
  pick = [Number(b.dataset.r), Number(b.dataset.c)];
  if (hide) shown.add(s);
  speak(s);
  copy(s);
  render();
  table.querySelector(`button[data-s="${s}"]`)?.focus();
});

let toastTimer;
function toast(text) {
  const el = document.getElementById('toast');
  el.innerHTML = text;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, 1600);
}

function copy(s) {
  try {
    navigator.clipboard.writeText(s).then(
      () => toast(`Copied <b>${s}</b>`),
      () => toast(`<b>${s}</b>`),
    );
  } catch {
    toast(`<b>${s}</b>`);
  }
}

function setPair(onId, offId) {
  document.getElementById(onId).setAttribute('aria-pressed', 'true');
  document.getElementById(offId).setAttribute('aria-pressed', 'false');
}

document.getElementById('r-basic').addEventListener('click', () => {
  all = false;
  pick = null;
  setPair('r-basic', 'r-all');
  render();
});
document.getElementById('r-all').addEventListener('click', () => {
  all = true;
  pick = null;
  setPair('r-all', 'r-basic');
  render();
});
document.getElementById('p-show').addEventListener('click', () => {
  hide = false;
  setPair('p-show', 'p-hide');
  render();
});
document.getElementById('p-hide').addEventListener('click', () => {
  hide = true;
  shown.clear();
  setPair('p-hide', 'p-show');
  render();
});

render();
