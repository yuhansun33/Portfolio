import { useCallback, useSyncExternalStore } from 'react';

// The initial theme is set by an inline script in index.html (before first paint);
// this hook just reads and flips the data-theme attribute on <html>.
const root = document.documentElement;
const listeners = new Set();

const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const read = () => (root.dataset.theme === 'light' ? 'light' : 'dark');

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, read);
  const toggle = useCallback(() => {
    const next = read() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage can be unavailable (private mode); the toggle still works */
    }
    listeners.forEach((fn) => fn());
  }, []);
  return [theme, toggle];
}
