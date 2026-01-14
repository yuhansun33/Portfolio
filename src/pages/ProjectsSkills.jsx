import { useEffect } from 'react';
import Projects from '../components/Projects';
import Skills from '../components/Skills';

const ProjectsSkills = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <Projects />
      <Skills />
    </div>
  );
};

export default ProjectsSkills;
