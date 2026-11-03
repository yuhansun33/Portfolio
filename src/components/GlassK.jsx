import { useEffect, useRef, useState } from 'react';
import { K_SVG_PATH, K_WIDTH } from '../lib/kGlyph.js';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Flat K, shown before three.js has loaded and wherever WebGL is unavailable.
export function FlatK({ className }) {
  return (
    <svg className={className} viewBox={`-1 -1 ${K_WIDTH + 2} 12`} aria-hidden="true">
      <defs>
        <linearGradient id="kgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fb0ff" />
          <stop offset=".5" stopColor="#b9a6ff" />
          <stop offset="1" stopColor="#5fd3c0" />
        </linearGradient>
      </defs>
      <path d={K_SVG_PATH} fill="url(#kgrad)" />
    </svg>
  );
}

/**
 * The iridescent glass K. three.js is loaded lazily so it never blocks first paint;
 * the render loop pauses whenever the canvas is off screen.
 */
export default function GlassK({ theme, className, rot, dist, maxDpr, follow = false }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let io;
    import('../lib/glassK.js')
      .then(({ mountGlassK, supportsWebGL }) => {
        if (cancelled) return;
        if (!supportsWebGL()) { setFailed(true); return; }
        const canvas = canvasRef.current;
        const scene = mountGlassK(canvas, {
          dark: document.documentElement.dataset.theme !== 'light',
          rot, dist, maxDpr, follow, animate: !reducedMotion(),
        });
        sceneRef.current = scene;
        io = new IntersectionObserver(([e]) => scene.setActive(e.isIntersecting));
        io.observe(canvas);
        canvas.classList.add('is-ready');
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
      io?.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
    // mount once; rot/dist are fixed per placement
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sceneRef.current?.setDark(theme === 'dark');
  }, [theme]);

  if (failed) return <FlatK className={className} />;
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
