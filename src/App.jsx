import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Tools from './components/Tools.jsx';
import Footer from './components/Footer.jsx';
import { useTheme } from './lib/useTheme.js';

// True once the hero (id="top") has mostly scrolled away.
function usePastHero() {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return undefined;
    const io = new IntersectionObserver(([e]) => setPast(e.intersectionRatio < 0.35), { threshold: [0, 0.35, 1] });
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return past;
}

function App() {
  const [theme, toggleTheme] = useTheme();
  const pastHero = usePastHero();

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header theme={theme} onToggleTheme={toggleTheme} pastHero={pastHero} />
      <main id="main">
        <Hero theme={theme} />
        <Projects />
        <Experience />
        <Tools />
      </main>
      <Footer />
    </>
  );
}

export default App;
