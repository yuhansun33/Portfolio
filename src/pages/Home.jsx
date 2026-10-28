import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import { smoothScrollToId } from '../utils/smoothScroll';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTo = location.state?.scrollTo;

  // Header navigates here with { scrollTo: sectionId } when coming from another page
  useEffect(() => {
    if (!scrollTo) return;
    smoothScrollToId(scrollTo);
    // Clear the state so a refresh or back/forward doesn't scroll again
    navigate(location.pathname, { replace: true, state: null });
  }, [scrollTo, navigate, location.pathname]);

  return (
    <div>
      <Hero />
      <Experience />
    </div>
  );
};

export default Home;
