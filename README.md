# kerstin-sun.com

Personal site of Kerstin Sun. React 19 + Vite, a single page, deployed to GitHub Pages on every push to `main`.

## Develop

```bash
npm ci
npm run dev      # http://localhost:5173
npm run lint
npm run build    # outputs dist/
```

## Where things live

| What | Where |
| --- | --- |
| All copy: hero, projects, experience, tools, links | `src/data/content.js` |
| Colours, type scale, spacing | top of `src/index.css` |
| Glass K (three.js shader) | `src/lib/glassK.js`, wrapped by `src/components/GlassK.jsx` |
| K outline (Rubik Bold) used by the 3D K, nav fallback and favicon | `src/lib/kGlyph.js` |
| Project cover drawings | `src/components/Covers.jsx` |
| Logos, résumé, social preview image | `public/logos/`, `public/docs/`, `public/og.png` |

## Type scale

Six sizes only, defined as CSS variables in `src/index.css`:

| Token | Size | Used for |
| --- | --- | --- |
| `--t-display` | 56–104px | the name, nothing else |
| `--t-h2` | 36–52px | section titles |
| `--t-lead` | 24–34px | hero tagline, section intros |
| `--t-title` | 22px | card titles, roles, hero card text |
| `--t-body` | 16px | body copy |
| `--t-small` | 14px | nav, buttons, meta, dates, tags |

Weights: 400, 500, 600 (Rubik, self-hosted via `@fontsource/rubik`).

## Notes

- three.js is loaded lazily after first paint; the render loop pauses off screen and honours `prefers-reduced-motion`. Without WebGL the K falls back to a flat SVG.
- The theme follows the OS setting until the visitor picks one with the toggle (saved in `localStorage`).
- Logos belong to their owners and are used only to identify where Kerstin worked and studied.

## Korean practice pages

Hidden pages at `/korean/` (home), `/korean/practice.html` and `/korean/grid.html`. They are plain HTML, CSS and JS in `public/korean/`, copied into the build as they are. They are not linked from the portfolio and carry `noindex`.

- Lesson content lives only in `public/korean/data.js`: add the new lesson to `LESSONS`, its letters to `GROUPS`, its words to `WORDS`, then bump `CURRENT_LESSON`.
- Sound uses the browser's built-in Korean voice (Web Speech API), so a device needs a Korean voice installed.
- Practice progress is saved in the visitor's own browser (`localStorage`, keys starting with `hangul:`). The theme shares the portfolio's `theme` key.
