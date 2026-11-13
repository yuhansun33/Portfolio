import { CURRENT_LESSON, GROUPS, READING_WORDS, WORDS } from './data.js';
import { SPEAKER, button, compose, decompose, hasKoreanVoice, html, romanOf, shuffle, speak, store } from './korean.js';

const stage = document.getElementById('stage');
const sideExtra = document.getElementById('side-extra');
const range = document.getElementById('range');
const stat = document.getElementById('stat');

const taught = GROUPS.filter((g) => g.lesson <= CURRENT_LESSON).map((g) => g.id);
let selected = store.get('groups2', taught.length ? taught : ['v1']).filter((id) => GROUPS.some((g) => g.id === id));
if (!selected.length) selected = ['v1'];
let known = store.get('known', {});
let mode = ['cards', 'quiz', 'spell', 'words'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'cards';

const wordLessons = [...new Set(WORDS.map((w) => w.l))];
let wLessons = store.get('wl', [Math.max(...wordLessons.filter((n) => n <= CURRENT_LESSON))]).filter((n) => wordLessons.includes(n));
if (!wLessons.length) wLessons = [wordLessons[wordLessons.length - 1]];
let wSub = 'cards';
let wDir = 'k2e';
let wKnown = store.get('wknown', {});

const sayBtn = (text, label = 'Listen') => {
  const b = button('', () => speak(text));
  b.innerHTML = `${SPEAKER} ${label}`;
  return b;
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// ---------- side panel ----------
function pressed(box, attr, value) {
  box.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[attr] === String(value))));
}

function renderSide() {
  pressed(document.getElementById('modes'), 'mode', mode);
  sideExtra.innerHTML = '';
  range.innerHTML = '';
  if (mode === 'words') {
    sideExtra.append(html(`<div class="seg" id="wsub" role="group" aria-label="Word practice">
        <button type="button" data-v="cards">Word cards</button><button type="button" data-v="quiz">Word quiz</button>
        <button type="button" data-v="read">Reading test</button></div>`));
    if (wSub !== 'read') {
      sideExtra.append(html(`<div class="seg" id="wdir" role="group" aria-label="Direction" style="margin-top:10px">
        <button type="button" data-v="k2e">KO → EN</button><button type="button" data-v="e2k">EN → KO</button></div>`));
    }
    sideExtra.querySelectorAll('#wsub button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.v === wSub));
      b.onclick = () => {
        wSub = b.dataset.v;
        start();
      };
    });
    sideExtra.querySelectorAll('#wdir button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.v === wDir));
      b.onclick = () => {
        wDir = b.dataset.v;
        start();
      };
    });
    wordLessons.forEach((n) => {
      const on = wLessons.includes(n);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.setAttribute('aria-pressed', String(on));
      b.innerHTML = `<span>Lesson ${n}</span><span class="when">${WORDS.filter((w) => w.l === n).length} words</span>`;
      b.onclick = () => {
        if (on) {
          if (wLessons.length > 1) wLessons = wLessons.filter((x) => x !== n);
        } else wLessons.push(n);
        store.set('wl', wLessons);
        start();
      };
      range.append(b);
    });
    const knownWords = WORDS.filter((w) => wKnown[w.ko]).length;
    stat.innerHTML = `<b>${knownWords}</b> of ${WORDS.length} words known`;
  } else {
    GROUPS.forEach((g) => {
      const on = selected.includes(g.id);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.setAttribute('aria-pressed', String(on));
      b.innerHTML = `<span class="ko">${esc(g.name)}</span><span class="when">Lesson ${g.lesson}</span>`;
      b.onclick = () => {
        if (on) {
          if (selected.length > 1) selected = selected.filter((x) => x !== g.id);
        } else selected.push(g.id);
        store.set('groups2', selected);
        start();
      };
      range.append(b);
    });
    const all = GROUPS.flatMap((g) => g.items.map((i) => i[0]));
    const best = store.get('best', null);
    stat.innerHTML = `<b>${all.filter((c) => known[c]).length}</b> of ${all.length} letters known` +
      (best !== null ? ` · best quiz <b>${best}</b> / 10` : '');
  }
}

document.querySelectorAll('#modes button').forEach((b) => {
  b.addEventListener('click', () => {
    mode = b.dataset.mode;
    history.replaceState(null, '', '#' + mode);
    start();
  });
});

const pool = () =>
  GROUPS.filter((g) => selected.includes(g.id)).flatMap((g) => g.items.map(([ch, ro, ex, tip]) => ({ ch, ro, ex, tip })));

// ---------- flashcards ----------
let deck = [];
let idx = 0;
let flipped = false;

function startCards() {
  const p = pool();
  deck = shuffle(p.filter((x) => !known[x.ch])).concat(shuffle(p.filter((x) => known[x.ch])));
  idx = 0;
  flipped = false;
  drawCard();
}

function drawCard() {
  const c = deck[idx];
  const left = deck.filter((x) => !known[x.ch]).length;
  stage.innerHTML = '';
  stage.append(html(`<div class="stage-meta"><span>${idx + 1} / ${deck.length}</span><span>${left} still to learn</span></div>
    <div class="bar" aria-hidden="true"><i style="width:${Math.round(((idx + 1) / deck.length) * 100)}%"></i></div>
    <div class="big" lang="ko">${c.ch}</div>
    <div class="answer" ${flipped ? '' : 'hidden'}><div class="roman">${esc(c.ro)}</div>
      <div class="example">Example <span lang="ko">${c.ex}</span></div><div class="tip">${esc(c.tip)}</div></div>
    <div class="row"></div>`));
  const r = stage.querySelector('.row');
  r.append(sayBtn(c.ex));
  if (!flipped) {
    r.append(button('Show answer', () => {
      flipped = true;
      drawCard();
    }, 'primary'));
  } else {
    r.append(button('Again', () => mark(false), 'again'), button('Got it', () => mark(true), 'primary'));
  }
}

function mark(isKnown) {
  known[deck[idx].ch] = isKnown;
  store.set('known', known);
  renderSide();
  flipped = false;
  idx = (idx + 1) % deck.length;
  if (idx === 0) startCards();
  else drawCard();
}

// ---------- letter quiz ----------
let qs = [];
let qi = 0;
let score = 0;
let misses = [];

function fill10(p) {
  const items = shuffle(p).slice(0, 10);
  while (items.length < 10) items.push(p[Math.floor(Math.random() * p.length)]);
  return items;
}

function startQuiz() {
  const p = pool();
  qs = fill10(p).map((it, n) => {
    const type = n % 3 === 2 && hasKoreanVoice() ? 'listen' : n % 2 ? 'toLetter' : 'toRoman';
    const others = shuffle(p.filter((x) => x.ch !== it.ch)).slice(0, 3);
    return { it, type, opts: shuffle([it, ...others]) };
  });
  qi = 0;
  score = 0;
  misses = [];
  drawQ();
}

function quizFrame(n, total, ok, prompt) {
  stage.innerHTML = '';
  stage.append(html(`<div class="stage-meta"><span>Question ${n} of ${total}</span><span>${ok} right</span></div>
    <div class="bar" aria-hidden="true"><i style="width:${((n - 1) / total) * 100}%"></i></div>${prompt}
    <div class="choices"></div><div class="feedback"></div>`));
  return [stage.querySelector('.choices'), stage.querySelector('.feedback')];
}

function result(points, msg, missList, again, review) {
  stage.innerHTML = '';
  stage.append(html(`<div class="q">Your score</div><div class="score">${points} / 10</div>
    <div class="tip">${msg} Pass mark: 8.</div>
    ${missList.length ? `<div class="label">To review</div><div class="misses">${missList.map((m) => `<span>${esc(m)}</span>`).join('')}</div>` : ''}
    <div class="row"></div>`));
  const r = stage.querySelector('.row');
  r.append(button('Try again', again, 'primary'));
  if (review) r.append(button(review[0], review[1]));
}

function drawQ() {
  if (qi >= qs.length) {
    const best = store.get('best', 0);
    if (score > best) store.set('best', score);
    renderSide();
    const msg = score >= 8 ? 'Passed. You can move on to the next range.' : 'Nearly. Review the missed letters with flashcards, then try again.';
    result(score, msg, [...new Set(misses.map((m) => `${m.ch} ${m.ro}`))], startQuiz, ['Review with flashcards', () => setMode('cards')]);
    return;
  }
  const { it, type, opts } = qs[qi];
  const prompt =
    type === 'toRoman' ? `<div class="q">How do you say this letter?</div><div class="big" lang="ko">${it.ch}</div>`
      : type === 'toLetter' ? `<div class="q">Which letter sounds like <b>${esc(it.ro)}</b>?</div><div class="big en-size">${esc(it.ro)}</div>`
        : '<div class="q">Listen. Which letter is in this syllable?</div><div class="big en-size">Listen</div>';
  const [ch, fb] = quizFrame(qi + 1, 10, score, prompt);
  if (type === 'listen') {
    fb.append(sayBtn(it.ex, 'Play again'));
    setTimeout(() => speak(it.ex), 150);
  }
  opts.forEach((o) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'choice' + (type === 'toRoman' ? ' latin' : '');
    b.textContent = type === 'toRoman' ? o.ro : o.ch;
    b.onclick = () => {
      ch.querySelectorAll('button').forEach((x) => (x.disabled = true));
      if (o.ch === it.ch) {
        b.classList.add('right');
        score++;
      } else {
        b.classList.add('wrong');
        ch.children[opts.indexOf(it)].classList.add('right');
        misses.push(it);
        known[it.ch] = false;
        store.set('known', known);
      }
      fb.innerHTML = '';
      fb.append(html(`<div class="tip">${it.ch} = ${esc(it.ro)}, as in <span lang="ko" class="example">${it.ex}</span></div>`));
      const r = document.createElement('div');
      r.className = 'row';
      r.append(sayBtn(it.ex), button(qi === 9 ? 'See score' : 'Next', () => {
        qi++;
        drawQ();
      }, 'primary'));
      fb.append(r);
      r.lastChild.focus();
    };
    ch.append(b);
  });
}

// ---------- spelling ----------
let pickL = 'ㄴ';
let pickV = 'ㅏ';
let spellQ = null;
let spellN = 0;
let spellOK = 0;

const lettersOf = (prefix, fallback) => {
  const ids = selected.filter((x) => x.startsWith(prefix));
  const use = ids.length ? ids : [fallback];
  return GROUPS.filter((g) => use.includes(g.id)).flatMap((g) => g.items.map((i) => i[0]));
};

function startSpell() {
  spellN = 0;
  spellOK = 0;
  newSpellQ();
}

function newSpellQ() {
  const cs = lettersOf('c', 'c1');
  const vs = lettersOf('v', 'v1');
  const any = (a) => a[Math.floor(Math.random() * a.length)];
  const l = any(cs);
  const v = any(vs);
  const ans = compose(l, v);
  const set = new Set([ans]);
  for (let g = 0; set.size < 4 && g < 50; g++) set.add(Math.random() < 0.5 ? compose(any(cs), v) : compose(l, any(vs)));
  spellQ = { l, v, ans, ro: romanOf(l, v), opts: shuffle([...set]) };
  drawSpell();
}

function drawSpell() {
  const q = spellQ;
  stage.innerHTML = '';
  stage.append(html(`<div class="stage-meta"><span>Spelling</span><span>${spellOK} of ${spellN} right</span></div>
    <div class="q">Which block says <b>${esc(q.ro || '(silent)')}</b>?</div>
    <div class="choices"></div><div class="feedback" style="margin-top:0"></div>
    <hr class="divider" />
    <div class="label">Build your own: pick a consonant and a vowel</div>
    <div class="keys" id="kl"></div><div class="keys" id="kv"></div>
    <div class="big word-size" id="built" lang="ko"></div><div class="roman" id="built-ro"></div><div class="row" id="built-say"></div>`));
  const ch = stage.querySelector('.choices');
  const fb = stage.querySelector('.feedback');
  q.opts.forEach((o) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'choice';
    b.textContent = o;
    b.onclick = () => {
      ch.querySelectorAll('button').forEach((x) => (x.disabled = true));
      spellN++;
      if (o === q.ans) {
        b.classList.add('right');
        spellOK++;
      } else {
        b.classList.add('wrong');
        ch.children[q.opts.indexOf(q.ans)].classList.add('right');
      }
      stage.querySelector('.stage-meta span:last-child').textContent = `${spellOK} of ${spellN} right`;
      fb.innerHTML = '';
      fb.append(html(`<div class="tip">${q.l} + ${q.v} = <span lang="ko" class="example">${q.ans}</span></div>`));
      const r = document.createElement('div');
      r.className = 'row';
      r.append(sayBtn(q.ans), button('Next', newSpellQ, 'primary'));
      fb.append(r);
    };
    ch.append(b);
  });
  const cs = lettersOf('c', 'c1');
  const vs = lettersOf('v', 'v1');
  if (!cs.includes(pickL)) pickL = cs[0];
  if (!vs.includes(pickV)) pickV = vs[0];
  const keys = (box, list, cur, set) => {
    box.innerHTML = '';
    list.forEach((c) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'key';
      b.textContent = c;
      b.setAttribute('aria-pressed', String(c === cur));
      b.onclick = () => {
        set(c);
        drawBuilt();
      };
      box.append(b);
    });
  };
  function drawBuilt() {
    keys(stage.querySelector('#kl'), cs, pickL, (c) => (pickL = c));
    keys(stage.querySelector('#kv'), vs, pickV, (c) => (pickV = c));
    const s = compose(pickL, pickV);
    stage.querySelector('#built').textContent = s;
    stage.querySelector('#built-ro').textContent = romanOf(pickL, pickV) || '(silent)';
    const r = stage.querySelector('#built-say');
    r.innerHTML = '';
    r.append(sayBtn(s));
  }
  drawBuilt();
}

// ---------- words ----------
let wDeck = [];
let wIdx = 0;
let wFlip = false;
let wQs = [];
let wQi = 0;
let wScore = 0;
let wMiss = [];
const wPool = () => WORDS.filter((w) => wLessons.includes(w.l));

function startWords() {
  if (wSub === 'cards') startWCards();
  else if (wSub === 'read') startRead();
  else startWQuiz();
}

function startWCards() {
  const p = wPool();
  wDeck = shuffle(p.filter((w) => !wKnown[w.ko])).concat(shuffle(p.filter((w) => wKnown[w.ko])));
  wIdx = 0;
  wFlip = false;
  drawWCard();
}

function drawWCard() {
  const w = wDeck[wIdx];
  const left = wDeck.filter((x) => !wKnown[x.ko]).length;
  const front = wDir === 'k2e' ? `<div class="big word-size" lang="ko">${w.ko}</div>` : `<div class="big en-size">${esc(w.en)}</div>`;
  const back = wDir === 'k2e' ? `<div class="roman">${esc(w.en)}</div>` : `<div class="big word-size" lang="ko">${w.ko}</div>`;
  stage.innerHTML = '';
  stage.append(html(`<div class="stage-meta"><span>${wIdx + 1} / ${wDeck.length}</span><span>${left} still to learn</span></div>
    <div class="bar" aria-hidden="true"><i style="width:${Math.round(((wIdx + 1) / wDeck.length) * 100)}%"></i></div>${front}
    <div class="answer" ${wFlip ? '' : 'hidden'}>${back}</div>
    <div class="row"></div>`));
  const r = stage.querySelector('.row');
  if (wDir === 'k2e' || wFlip) r.append(sayBtn(w.ko));
  if (!wFlip) {
    r.append(button('Show answer', () => {
      wFlip = true;
      drawWCard();
      if (wDir === 'e2k') speak(w.ko);
    }, 'primary'));
  } else {
    r.append(button('Again', () => wMark(false), 'again'), button('Got it', () => wMark(true), 'primary'));
  }
}

function wMark(isKnown) {
  wKnown[wDeck[wIdx].ko] = isKnown;
  store.set('wknown', wKnown);
  renderSide();
  wFlip = false;
  wIdx = (wIdx + 1) % wDeck.length;
  if (wIdx === 0) startWCards();
  else drawWCard();
}

function startWQuiz() {
  const p = wPool();
  wQs = fill10(p).map((it) => ({
    it,
    opts: shuffle([it, ...shuffle(WORDS.filter((x) => x.ko !== it.ko && x.en !== it.en)).slice(0, 3)]),
  }));
  wQi = 0;
  wScore = 0;
  wMiss = [];
  drawWQ();
}

function drawWQ() {
  if (wQi >= wQs.length) {
    const msg = wScore >= 8 ? 'Passed.' : 'Review the missed words with word cards, then try again.';
    result(wScore, msg, [...new Set(wMiss.map((m) => `${m.ko} ${m.en}`))], startWQuiz, ['Review with word cards', () => {
      wSub = 'cards';
      start();
    }]);
    return;
  }
  const { it, opts } = wQs[wQi];
  const prompt = wDir === 'k2e'
    ? `<div class="q">What does this word mean?</div><div class="big word-size" lang="ko">${it.ko}</div>`
    : `<div class="q">How do you say this in Korean?</div><div class="big en-size">${esc(it.en)}</div>`;
  const [ch, fb] = quizFrame(wQi + 1, 10, wScore, prompt);
  opts.forEach((o) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'choice' + (wDir === 'k2e' ? ' latin' : '');
    b.textContent = wDir === 'k2e' ? o.en : o.ko;
    b.onclick = () => {
      ch.querySelectorAll('button').forEach((x) => (x.disabled = true));
      if (o.ko === it.ko) {
        b.classList.add('right');
        wScore++;
      } else {
        b.classList.add('wrong');
        ch.children[opts.indexOf(it)].classList.add('right');
        wMiss.push(it);
        wKnown[it.ko] = false;
        store.set('wknown', wKnown);
      }
      speak(it.ko);
      fb.innerHTML = '';
      fb.append(html(`<div class="tip"><span lang="ko" class="example">${it.ko}</span> = ${esc(it.en)}.</div>`));
      const r = document.createElement('div');
      r.className = 'row';
      r.append(sayBtn(it.ko), button(wQi === 9 ? 'See score' : 'Next', () => {
        wQi++;
        drawWQ();
      }, 'primary'));
      fb.append(r);
      r.lastChild.focus();
    };
    ch.append(b);
  });
}

// ---------- reading test: real and made-up words from letters already learned ----------
const REAL = { ...READING_WORDS };
WORDS.forEach((w) => {
  if (!REAL[w.ko]) REAL[w.ko] = w.en;
});
const CONF_V = { ㅓ: 'ㅗㅕㅏ', ㅗ: 'ㅓㅜㅛ', ㅜ: 'ㅗㅡㅠ', ㅡ: 'ㅜㅓㅣ', ㅏ: 'ㅓㅑ', ㅣ: 'ㅡㅏ', ㅑ: 'ㅏㅕ', ㅕ: 'ㅓㅑㅛ', ㅛ: 'ㅗㅠㅕ', ㅠ: 'ㅜㅛ', ㅐ: 'ㅔㅏ', ㅔ: 'ㅐㅓ', ㅒ: 'ㅖㅑ', ㅖ: 'ㅒㅕ', ㅘ: 'ㅝㅙ', ㅝ: 'ㅘㅞ', ㅙ: 'ㅞㅚ', ㅞ: 'ㅙㅚ', ㅚ: 'ㅙㅞ', ㅟ: 'ㅢㅚ', ㅢ: 'ㅟㅡ' };
const CONF_C = { ㄱ: 'ㅋㄴㄷ', ㄴ: 'ㄷㄱㄹ', ㄷ: 'ㅌㄴㄹ', ㅋ: 'ㄱ', ㅌ: 'ㄷ', ㅍ: 'ㅂ', ㅊ: 'ㅈㅅ', ㅎ: 'ㅇ', ㅂ: 'ㅍㅁㄷ', ㅈ: 'ㅊㅅ', ㄹ: 'ㄷㄴ', ㅁ: 'ㅇㄴㅂ', ㅇ: 'ㅁㅎ', ㅅ: 'ㅈㅊ' };

function readSets() {
  const upTo = Math.max(...wLessons);
  const groups = GROUPS.filter((g) => g.lesson <= upTo);
  const cs = ['ㅇ', ...groups.filter((g) => g.id.startsWith('c')).flatMap((g) => g.items.map((i) => i[0])).filter((c) => c !== 'ㅇ')];
  const vs = groups.filter((g) => g.id.startsWith('v')).flatMap((g) => g.items.map((i) => i[0]));
  return { cs, vs: vs.length ? vs : ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ'] };
}
const sylRoman = (s) => [...s].map((ch) => {
  const d = decompose(ch);
  return romanOf(d.l, d.v);
}).join(' ');
const fits = (word, { cs, vs }) => [...word].every((ch) => {
  const d = decompose(ch);
  return d && d.t === 0 && cs.includes(d.l) && vs.includes(d.v);
});
const any = (a) => a[Math.floor(Math.random() * a.length)];
function randWord(sets) {
  const n = any([1, 2, 2, 2, 3]);
  let w = '';
  for (let i = 0; i < n; i++) w += compose(any(sets.cs), any(sets.vs));
  return w;
}
function mutate(word, sets) {
  const chars = [...word];
  const i = Math.floor(Math.random() * chars.length);
  const d = decompose(chars[i]);
  let { l, v } = d;
  if (Math.random() < 0.6) {
    const opts = [...(CONF_V[v] || '')].filter((x) => sets.vs.includes(x));
    if (opts.length) v = any(opts);
    else l = any(sets.cs);
  } else {
    const opts = [...(CONF_C[l] || '')].filter((x) => sets.cs.includes(x));
    l = opts.length ? any(opts) : any(sets.cs);
  }
  chars[i] = compose(l, v);
  return chars.join('');
}

let rQs = [];
let rQi = 0;
let rScore = 0;
let rMiss = [];

function startRead() {
  const sets = readSets();
  const real = Object.keys(REAL).filter((w) => fits(w, sets));
  const used = new Set();
  rQs = [];
  for (let guard = 0; rQs.length < 10 && guard < 500; guard++) {
    const word = real.length && Math.random() < 0.5 ? any(real) : randWord(sets);
    if (used.has(word)) continue;
    used.add(word);
    const ans = sylRoman(word);
    const opts = new Set([ans]);
    let cur = word;
    for (let g = 0; opts.size < 4 && g < 60; g++) {
      const m = mutate(g % 3 === 0 ? word : cur, sets);
      const r = sylRoman(m);
      if (r !== ans) opts.add(r);
      cur = m;
    }
    for (let g = 0; opts.size < 4 && g < 60; g++) opts.add(sylRoman(randWord(sets)));
    rQs.push({ word, ans, opts: shuffle([...opts]) });
  }
  rQi = 0;
  rScore = 0;
  rMiss = [];
  drawRead();
}

function drawRead() {
  if (rQi >= rQs.length) {
    const msg = rScore >= 8 ? 'Steady reading.' : 'Read the missed ones aloud a few times, and watch the letters that look alike.';
    result(rScore, msg, rMiss.map((m) => `${m.word} = ${m.ans}`), startRead);
    return;
  }
  const q = rQs[rQi];
  const sets = readSets();
  const prompt = `<div class="q">How do you read this? Letters: <span lang="ko">${sets.cs.join(' ')} + ${sets.vs.join(' ')}</span></div>
    <div class="big word-size" lang="ko">${q.word}</div>`;
  const [ch, fb] = quizFrame(rQi + 1, 10, rScore, prompt);
  q.opts.forEach((o) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'choice latin';
    b.textContent = o;
    b.onclick = () => {
      ch.querySelectorAll('button').forEach((x) => (x.disabled = true));
      if (o === q.ans) {
        b.classList.add('right');
        rScore++;
      } else {
        b.classList.add('wrong');
        ch.children[q.opts.indexOf(q.ans)].classList.add('right');
        rMiss.push(q);
      }
      speak(q.word);
      const info = REAL[q.word] ? `A real word: <b lang="ko">${q.word}</b> means ${esc(REAL[q.word])}.` : 'A made-up word, just for reading practice.';
      fb.innerHTML = '';
      fb.append(html(`<div class="tip"><span lang="ko">${q.word}</span> = ${q.ans}. ${info}</div>`));
      const r = document.createElement('div');
      r.className = 'row';
      r.append(sayBtn(q.word), button(rQi === 9 ? 'See score' : 'Next', () => {
        rQi++;
        drawRead();
      }, 'primary'));
      fb.append(r);
      r.lastChild.focus();
    };
    ch.append(b);
  });
}

// ---------- mode switching ----------
function setMode(m) {
  mode = m;
  history.replaceState(null, '', '#' + m);
  start();
}

function start() {
  renderSide();
  document.getElementById('range-label').textContent = mode === 'words' ? 'Lessons' : 'Range';
  ({ cards: startCards, quiz: startQuiz, spell: startSpell, words: startWords })[mode]();
}

start();
