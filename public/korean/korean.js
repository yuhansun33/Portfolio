// Shared helpers for the Korean practice pages: storage, speech, Hangul composition, header.

// ---------- storage (progress stays in this browser) ----------
export const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem('hangul:' + key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem('hangul:' + key, JSON.stringify(value));
    } catch {
      /* storage can be unavailable (private mode); practice still works */
    }
  },
};

// ---------- Hangul ----------
export const LEADS = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
export const VOWELS = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
const LEAD_ROMAN = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
const VOWEL_ROMAN = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];

export const compose = (l, v) => String.fromCharCode(0xac00 + (LEADS.indexOf(l) * 21 + VOWELS.indexOf(v)) * 28);
export const romanOf = (l, v) => LEAD_ROMAN[LEADS.indexOf(l)] + VOWEL_ROMAN[VOWELS.indexOf(v)];
export function decompose(ch) {
  const c = ch.charCodeAt(0) - 0xac00;
  if (c < 0 || c > 11171) return null;
  return { l: LEADS[Math.floor(c / 588)], v: VOWELS[Math.floor((c % 588) / 28)], t: c % 28 };
}

// ---------- speech (the browser's own Korean voice) ----------
let koVoice = null;
const hasSpeech = 'speechSynthesis' in window;

function pickVoice() {
  try {
    koVoice = speechSynthesis.getVoices().find((v) => /^ko/i.test(v.lang)) || null;
  } catch {
    koVoice = null;
  }
  const note = document.getElementById('voice-note');
  if (!note) return;
  if (!hasSpeech) note.textContent = 'This browser cannot read text aloud. Try Safari or Chrome.';
  else if (!koVoice) note.textContent = 'No sound? Your device has no Korean voice yet. Add one in your system’s speech settings.';
  else note.textContent = '';
}

export const hasKoreanVoice = () => Boolean(koVoice);

export function speak(text) {
  if (!hasSpeech) return;
  try {
    const ss = speechSynthesis;
    pickVoice();
    if (ss.speaking || ss.pending) ss.cancel();
    if (ss.paused) ss.resume();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = 0.8;
    if (koVoice) u.voice = koVoice;
    let started = false;
    u.onstart = () => {
      started = true;
    };
    // a short delay after cancel() avoids Safari and Chrome dropping the new utterance
    setTimeout(() => {
      ss.speak(u);
      setTimeout(() => {
        if (!started && ss.paused) ss.resume();
      }, 250);
    }, 80);
  } catch {
    /* ignore: the page still works without sound */
  }
}

export const SPEAKER =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';

// ---------- small DOM helpers ----------
export const shuffle = (a) => {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

export function html(strings) {
  const t = document.createElement('template');
  t.innerHTML = strings.trim();
  return t.content;
}

export function button(label, onClick, cls = '') {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'btn ' + cls;
  b.textContent = label;
  b.addEventListener('click', onClick);
  return b;
}

// ---------- header: theme toggle shared with the portfolio (same localStorage key) ----------
function initHeader() {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const paint = () => {
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.innerHTML = dark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>';
  };
  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* the toggle still works for this visit */
    }
    paint();
  });
  paint();
}

initHeader();
if (hasSpeech) {
  pickVoice();
  speechSynthesis.addEventListener('voiceschanged', pickVoice);
} else {
  pickVoice();
}
