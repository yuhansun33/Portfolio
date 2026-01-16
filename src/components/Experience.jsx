import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ExperienceCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 md:p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">{item.title}</h3>
          <p className="text-lg font-semibold text-blue-600">{item.company}</p>
        </div>
        <div className="text-left md:text-right">
          <span className="text-sm text-slate-500 block">{item.period}</span>
          {item.location && (
            <span className="text-sm text-slate-500 block mt-1">{item.location}</span>
          )}
        </div>
      </div>

      {/* Highlights */}
      {item.highlights && (
        <ul className="space-y-3 mb-4">
          {item.highlights.map((highlight, i) => {
            // Split by colon to make the label blue
            const parts = highlight.split(':');
            const label = parts[0];
            const content = parts.slice(1).join(':');
            
            return (
              <li key={i} className="flex items-start gap-2">
                <svg className="w-3 h-3 text-blue-500 flex-shrink-0 mt-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700 text-sm md:text-base leading-relaxed">
                  <span className="font-semibold text-blue-600">{label}</span>
                  {content && <span>:{content}</span>}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* Skills/Technologies */}
      {item.technologies && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
          {item.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-600"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const EducationCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 md:p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">{item.degree}</h3>
          <p className="text-lg font-semibold text-blue-600">{item.school}</p>
        </div>
        <div className="text-left md:text-right">
          <span className="text-sm text-slate-500 block">{item.period}</span>
          {item.location && (
            <span className="text-sm text-slate-500 block mt-1">{item.location}</span>
          )}
        </div>
      </div>

      {/* GPA and Related Courses */}
      <div className="mb-4 space-y-2">
        {item.gpa && (
          <div className="flex items-start gap-2">
            <svg className="w-3 h-3 text-blue-500 flex-shrink-0 mt-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-slate-700 text-sm md:text-base">
              <span className="font-semibold text-blue-600">GPA</span>: {item.gpa}
            </span>
          </div>
        )}
        
        {item.courses && (
          <div className="flex items-start gap-2">
            <svg className="w-3 h-3 text-blue-500 flex-shrink-0 mt-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-slate-700 text-sm md:text-base">
              <span className="font-semibold text-blue-600">Related Courses</span>: {item.courses}
            </span>
          </div>
        )}
      </div>

      {/* Courses/Focus Areas */}
      {item.technologies && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
          {item.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-600"
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
      highlights: [
        'ML Efficiency: Accelerated new seller onboarding by 60% using K-Means clustering segmentation model.',
        'ETL Automation: Architected automated data pipelines with Python and SQLite, slashing manual reporting time by 40%.',
        'Data-Driven Strategy: Led 5 teams to launch a GTM strategy, driving 3,000+ unique clicks for 100+ sellers during Prime Day.',
        'Marketing Analytics: Optimized ad spend by 13% through 30+ data-driven consultations and performance frameworks.'
      ],
      technologies: ['Python', 'SQL', 'Machine Learning', 'K-Means Clustering', 'ETL', 'SQLite', 'Data Analysis', 'Leadership']
    },
    {
      title: 'Data Engineer Intern',
      company: 'Syntec Technology',
      location: 'Hsinchu, Taiwan',
      period: 'Jun 2023 - Nov 2023',
      highlights: [
        'Enterprise Data Integration: Integrated SAP system data into dashboards, enhancing visibility for 50+ stakeholders.',
        'Intelligent Automation: Developed Robotic Process Automation (RPA) solutions that reduced routine workloads by 7%.',
        'Production Optimization: Scripted VBA automation tools for packaging analysis, increasing production efficiency by 10%.'
      ],
      technologies: ['Python', 'SQL', 'SAP', 'RPA', 'VBA', 'Data Pipeline', 'Automation', 'Dashboard Development']
    }
  ];

  const education = [
    {
      degree: 'MS of Computer Science',
      school: 'Rice University',
      location: 'Houston, Texas, USA',
      period: 'Aug 2025 - Dec 2026',
      gpa: '4.0/4.0',
      courses: 'Big Data Modeling, Machine Learning, Deep Learning, Web Development',
      technologies: ['Distributed Systems', 'Spark', 'Hadoop', 'PyTorch', 'TensorFlow', 'React', 'MongoDB', 'AWS', 'GCP']
    },
    {
      degree: 'BSc in Industrial Engineering',
      school: 'National Chiao Tung University',
      location: 'Hsinchu, Taiwan',
      period: 'Sep 2020 - Jun 2024',
      gpa: '3.97/4.0',
      courses: 'Artificial Intelligence, Machine Learning, Operating Systems, Networks, Data Structures & Algorithms',
      technologies: ['Computer Vision', 'PyTorch', 'TensorFlow', 'OpenCV', 'Statistical Modeling', 'NumPy', 'Pandas', 'Scikit-learn']
    }
  ];

  return (
    <section id="experience" className="min-h-screen pt-24 pb-20 relative bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Work Experience Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Work Experience</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6 mb-20">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} item={exp} index={index} />
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <EducationCard key={index} item={edu} index={index + experiences.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
