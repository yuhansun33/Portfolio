import { CURRENT_LESSON, GROUPS, LESSONS, WORDS } from './data.js';
import { SPEAKER as speakerIcon, speak, store } from './korean.js';

const lesson = LESSONS.find((l) => l.n === CURRENT_LESSON) || LESSONS[LESSONS.length - 1];
const known = store.get('known', {});
const best = store.get('best', null);
const allLetters = GROUPS.flatMap((g) => g.items.map((i) => i[0]));
const knownCount = allLetters.filter((c) => known[c]).length;

document.getElementById('lesson-meta').textContent = `Week ${lesson.week} · Lesson ${lesson.n} · latest lesson`;
document.getElementById('lesson-title').textContent = lesson.title;

// The lesson's own letters; a lesson without new letters (reading practice) shows its words instead.
const letterBox = document.getElementById('lesson-letters');
const lessonLetters = GROUPS.filter((g) => g.lesson === lesson.n).flatMap((g) => g.items.map((i) => i[0]));
if (lessonLetters.length) {
  lessonLetters.forEach((c) => {
    const s = document.createElement('span');
    s.textContent = c;
    if (known[c]) {
      s.className = 'known';
      s.title = 'You marked this letter as known';
    }
    letterBox.append(s);
  });
} else {
  letterBox.hidden = true;
}

document.getElementById('known-bar').style.width = `${Math.round((knownCount / allLetters.length) * 100)}%`;
document.getElementById('known-text').textContent =
  `${knownCount} of ${allLetters.length} letters known` + (best !== null ? ` · best quiz ${best} / 10` : '');

// Latest lesson's words: English meaning only.
let words = WORDS.filter((w) => w.l === lesson.n);
let wordsLesson = lesson.n;
if (!words.length) {
  wordsLesson = Math.max(...WORDS.map((w) => w.l).filter((n) => n <= lesson.n));
  words = WORDS.filter((w) => w.l === wordsLesson);
}
document.getElementById('words-title').textContent = `Words from lesson ${wordsLesson}`;
const list = document.getElementById('word-list');
words.forEach((w) => {
  const row = document.createElement('div');
  row.className = 'word';
  row.innerHTML = `<b lang="ko"></b><span></span><button type="button" class="say" aria-label="Listen to ${w.en}">${speakerIcon}</button>`;
  row.querySelector('b').textContent = w.ko;
  row.querySelector('span').textContent = w.en;
  row.querySelector('button').addEventListener('click', () => speak(w.ko));
  list.append(row);
});

document.getElementById('practice-meta').textContent =
  `${allLetters.length} letters · ${WORDS.length} words · with sound`;

