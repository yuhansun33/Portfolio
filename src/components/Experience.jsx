import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ExperienceCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-xl p-5 border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
    >
      {/* Title and Period */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-2">
        <h3 className="text-lg md:text-xl font-bold text-slate-800">{item.title}</h3>
        <span className="text-xs md:text-sm text-slate-500 whitespace-nowrap">{item.period}</span>
      </div>
      
      {/* Company and Location */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-3">
        <p className="text-base md:text-lg font-semibold text-blue-600">{item.company}</p>
        {item.location && (
          <span className="text-xs md:text-sm text-slate-500 whitespace-nowrap">{item.location}</span>
        )}
      </div>

      {/* Skills */}
      {item.technologies && (
        <div className="flex flex-wrap gap-2">
          {item.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-600"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: 'Data Analyst',
      company: 'Amazon',
      location: 'Taipei, Taiwan',
      period: 'Jul 2024 - Jul 2025',
      technologies: ['Data Science', 'Python', 'SQL', 'Machine Learning', 'Data Analysis', 'ETL', 'Leadership']
    },
    {
      title: 'Data Engineer Intern',
      company: 'Syntec Technology',
      location: 'Hsinchu, Taiwan',
      period: 'Jun 2023 - Nov 2023',
      technologies: ['Data Engineering', 'Python', 'SQL', 'Data Pipeline', 'Automation']
    }
  ];

  const education = [
    {
      title: 'MS of Computer Science',
      company: 'Rice University',
      location: 'Houston, Texas, USA',
      period: 'Aug 2025 - Dec 2026',
      technologies: ['Distributed Systems', 'Machine Learning', 'Web Development', 'Cloud Computing']
    },
    {
      title: 'BSc in Industrial Engineering',
      company: 'National Chiao Tung University',
      location: 'Hsinchu, Taiwan',
      period: 'Sep 2020 - Jun 2024',
      technologies: ['Artificial Intelligence', 'Machine Learning', 'Operating Systems', 'Networks']
    }
  ];

  return (
    <section id="experience" className="min-h-screen pt-24 pb-20 relative bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Work Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-20">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} item={exp} index={index} />
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <ExperienceCard key={index} item={edu} index={index + experiences.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
