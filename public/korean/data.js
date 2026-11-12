// Lesson content for the Korean practice pages.
// This is the only file a lesson sync needs to touch: add the new lesson to LESSONS,
// its letters to GROUPS, its words to WORDS, and bump CURRENT_LESSON.

// The latest lesson Kerstin has finished. The home page shows this lesson.
export const CURRENT_LESSON = 7;

export const LESSONS = [
  { n: 1, week: 1, title: 'Basic vowels' },
  { n: 2, week: 1, title: 'Y-vowels' },
  { n: 3, week: 1, title: 'Consonants ㄱ ㄴ ㄷ ㄹ ㅁ' },
  { n: 4, week: 1, title: 'Consonants ㅂ ㅅ ㅇ ㅈ' },
  { n: 5, week: 1, title: 'Aspirated consonants ㅊ ㅋ ㅌ ㅍ ㅎ' },
  { n: 6, week: 1, title: 'Putting letters together' },
  { n: 7, week: 2, title: 'Compound vowels ㅐ ㅒ ㅔ ㅖ' },
];

// Letter groups. Each item: [letter, romanization, example syllable, pronunciation tip].
export const GROUPS = [
  { id: 'v1', lesson: 1, name: 'Basic vowels', items: [
    ['ㅏ', 'a', '아', 'Stroke points right. An open "ah", as in father.'],
    ['ㅓ', 'eo', '어', 'Stroke points left. An open "uh" with unrounded lips.'],
    ['ㅗ', 'o', '오', 'Stroke points up. A rounded "oh".'],
    ['ㅜ', 'u', '우', 'Stroke points down. "oo", as in moon.'],
    ['ㅡ', 'eu', '으', 'A flat line. Spread your lips and say "uh" from the back.'],
    ['ㅣ', 'i', '이', 'A standing line. "ee", as in see.'],
  ] },
  { id: 'v1y', lesson: 2, name: 'Y-vowels', items: [
    ['ㅑ', 'ya', '야', 'ㅏ with one more stroke: "yah".'],
    ['ㅕ', 'yeo', '여', 'ㅓ with one more stroke: "yuh", lips unrounded.'],
    ['ㅛ', 'yo', '요', 'ㅗ with one more stroke: "yoh".'],
    ['ㅠ', 'yu', '유', 'ㅜ with one more stroke: "you".'],
  ] },
  { id: 'c1', lesson: 3, name: 'ㄱ ㄴ ㄷ ㄹ ㅁ', items: [
    ['ㄱ', 'g/k', '가', 'Name 기역. Between g and k; sounds like g between vowels.'],
    ['ㄴ', 'n', '나', 'Name 니은. A plain n.'],
    ['ㄷ', 'd/t', '다', 'Name 디귿. Between d and t; sounds like d between vowels.'],
    ['ㄹ', 'r/l', '라', 'Name 리을. A light flap of the tongue; l at the end of a syllable.'],
    ['ㅁ', 'm', '마', 'Name 미음. A plain m.'],
  ] },
  { id: 'c1b', lesson: 4, name: 'ㅂ ㅅ ㅇ ㅈ', items: [
    ['ㅂ', 'b/p', '바', 'Name 비읍. Between b and p; sounds like b between vowels.'],
    ['ㅅ', 's', '사', 'Name 시옷. s, but "sh" before ㅣ.'],
    ['ㅇ', 'silent / ng', '아', 'Name 이응. Silent at the start of a syllable, "ng" at the end.'],
    ['ㅈ', 'j', '자', 'Name 지읒. A soft j.'],
  ] },
  { id: 'c1c', lesson: 5, name: 'ㅊ ㅋ ㅌ ㅍ ㅎ', items: [
    ['ㅊ', 'ch', '차', 'Name 치읓. ch with a puff of air.'],
    ['ㅋ', 'k', '카', 'Name 키읔. k with a puff of air.'],
    ['ㅌ', 't', '타', 'Name 티읕. t with a puff of air.'],
    ['ㅍ', 'p', '파', 'Name 피읖. p with a puff of air.'],
    ['ㅎ', 'h', '하', 'Name 히읗. A plain h.'],
  ] },
  { id: 'v2', lesson: 7, name: 'ㅐ ㅒ ㅔ ㅖ', items: [
    ['ㅐ', 'ae', '애', 'Sounds almost the same as ㅔ today: "e", as in bed.'],
    ['ㅒ', 'yae', '얘', '"ye", as in yes.'],
    ['ㅔ', 'e', '에', '"e", as in bed.'],
    ['ㅖ', 'ye', '예', '"ye", as in yes.'],
  ] },
  { id: 'v2b', lesson: 8, name: 'ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ', items: [
    ['ㅘ', 'wa', '와', 'ㅗ + ㅏ: "wa".'],
    ['ㅙ', 'wae', '왜', 'ㅗ + ㅐ: "we", as in wet.'],
    ['ㅚ', 'oe', '외', 'Said "we", as in wet, today.'],
    ['ㅝ', 'wo', '워', 'ㅜ + ㅓ: "wuh".'],
    ['ㅞ', 'we', '웨', 'ㅜ + ㅔ: "we", as in wet.'],
    ['ㅟ', 'wi', '위', 'ㅜ + ㅣ: "wee".'],
    ['ㅢ', 'ui', '의', 'ㅡ + ㅣ: a flat "eu" gliding into "ee".'],
  ] },
  { id: 'c2', lesson: 9, name: 'Tense ㄲ ㄸ ㅃ ㅆ ㅉ', items: [
    ['ㄲ', 'kk', '까', 'A tight k: tense throat, no puff of air.'],
    ['ㄸ', 'tt', '따', 'A tight t: tense throat, no puff of air.'],
    ['ㅃ', 'pp', '빠', 'A tight p: tense throat, no puff of air.'],
    ['ㅆ', 'ss', '싸', 'A tight, hissing s.'],
    ['ㅉ', 'jj', '짜', 'A tight j: tense throat, no puff of air.'],
  ] },
];

// Words by lesson: [lesson, Korean, English, mnemonic].
// Mnemonics are Chinese sound-alikes from the lessons; they only work in Chinese, so they stay in Chinese.
export const WORDS = [
  [1, '아이', 'child', '開頭「阿」，像「阿弟仔」就是小孩'],
  [1, '오이', 'cucumber', '開頭嘟嘴的「喔」：「喔，一根小黃瓜」'],
  [1, '이', 'two; tooth', '念起來像「衣」，數字二也是牙齒'],
  [1, '오', 'five', '漢字「五」的韓文念法'],
  [2, '우유', 'milk', '漢字詞「牛乳」'],
  [2, '여우', 'fox', '「唷烏」，狐狸半夜唷唷叫'],
  [2, '이유', 'reason', '漢字詞「理由」，念起來很像中文'],
  [2, '여유', 'spare time', '漢字詞「餘裕」'],
  [2, '아야', 'ouch', '痛的時候喊「阿呀」'],
  [3, '나무', 'tree', '「那木」：那個木頭就是樹'],
  [3, '다리', 'leg; bridge', '「搭裡」：搭一座橋，用腿走過去'],
  [3, '머리', 'head; hair', '「摸哩」：摸摸你的頭'],
  [3, '고기', 'meat', '「烤雞」：烤雞就是肉'],
  [3, '우리', 'we, us', '「屋裡」的人都是我們'],
  [3, '어머니', 'mother', '「喔，媽你」：叫媽媽'],
  [3, '라디오', 'radio', '英文 radio 的外來語'],
  [4, '아버지', 'father', '「阿爸季」：阿爸就是父親'],
  [4, '바다', 'sea', '「八大」：七洲八大洋，就是大海'],
  [4, '비', 'rain', '「逼」：下雨逼你躲起來'],
  [4, '사자', 'lion', '漢字詞「獅子」'],
  [4, '모자', 'hat', '漢字詞「帽子」'],
  [4, '가수', 'singer', '漢字詞「歌手」'],
  [4, '지도', 'map', '漢字詞「地圖」'],
  [5, '차', 'tea; car', '漢字「茶」「車」都念 차'],
  [5, '커피', 'coffee', '英文 coffee'],
  [5, '코', 'nose', '「摳」：摳鼻子'],
  [5, '포도', 'grapes', '漢字詞「葡萄」'],
  [5, '하나', 'one', '「哈那」：哈，那一個'],
  [5, '치마', 'skirt', '「起碼」：起碼要穿件裙子'],
  [5, '기차', 'train', '漢字詞「汽車」，在韓文是火車'],
  [5, '허리', 'waist', '「呵哩」：扶著腰呵呵喘；跟 머리 一樣是 ㅓ'],
  [7, '네', 'yes', '「內」：韓國人說「對」就是 네'],
  [7, '개', 'dog', '「蓋」：狗狗把骨頭蓋起來'],
  [7, '게', 'crab', '跟 개 同音，靠上下文分；ㅔ 的短橫在左邊，像蟹鉗'],
  [7, '배', 'pear; belly; boat', '一個字三個意思：吃梨吃到肚子飽，躺在船上'],
  [7, '노래', 'song', '「不累」：唱歌不累'],
  [7, '해', 'sun', '「嗨」：太陽出來跟你說嗨'],
  [7, '세계', 'world', '漢字詞「世界」'],
  [7, '카메라', 'camera', '英文 camera'],
].map(([l, ko, en, hint]) => ({ l, ko, en, hint }));

// Extra real words for the reading test. Only words spelled with letters already learned are asked.
export const READING_WORDS = {
  나라: 'country', 오리: 'duck', 나이: 'age', 아기: 'baby', 고구마: 'sweet potato',
  누나: 'older sister (said by a man)', 어디: 'where', 요리: 'cooking', 도로: 'road', 도마: 'cutting board',
  그리고: 'and, also', 다리미: 'clothes iron', 이마: 'forehead', 모기: 'mosquito', 거기: 'there',
  여기: 'here', 아니요: 'no', 거미: 'spider', 구두: 'dress shoes', 누구: 'who', 무: 'radish',
  마루: 'wooden floor', 기러기: 'wild goose', 바지: 'pants', 소: 'cow', 버스: 'bus', 주스: 'juice',
  여자: 'woman', 도시: 'city', 가구: 'furniture', 바보: 'fool', 소리: 'sound', 사이: 'between',
  거리: 'street; distance', 자리: 'seat', 부모: 'parents', 주소: 'address', 토마토: 'tomato',
  피자: 'pizza', 휴지: 'tissue', 오후: 'afternoon', 키: 'height', 파: 'green onion', 우표: 'stamp',
  치즈: 'cheese', 카드: 'card', 투표: 'vote', 예: 'yes (formal)', 새: 'bird; new', 매미: 'cicada',
  얘기: 'talk, story', 베개: 'pillow', 메뉴: 'menu', 모래: 'sand', 어제: 'yesterday', 가게: 'shop',
};
