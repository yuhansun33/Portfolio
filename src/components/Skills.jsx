import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillCategory = ({ category, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
    >
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <span className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
        {category.name}
      </h3>
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
            className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-600 hover:border-blue-400 hover:bg-blue-100 transition-all cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const EducationCard = ({ education, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl p-6 border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">{education.degree}</h3>
          <p className="text-lg text-blue-600 font-semibold mb-1">{education.school}</p>
          <p className="text-slate-500 text-sm">{education.location}</p>
        </div>
        <span className="text-slate-500 text-sm whitespace-nowrap ml-4">{education.period}</span>
      </div>
      
      {education.details && (
        <ul className="space-y-2 mb-4">
          {education.details.map((detail, i) => (
            <li key={i} className="flex items-start text-slate-600 text-sm">
              <span className="text-blue-400 mr-2 mt-1">▹</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}

      {education.courses && (
        <div>
          <p className="text-sm font-semibold text-slate-600 mb-2">Relevant Coursework:</p>
          <div className="flex flex-wrap gap-2">
            {education.courses.map((course, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs text-blue-600"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      name: 'Programming Languages',
      skills: ['Python', 'SQL', 'C/C++', 'JavaScript', 'TypeScript', 'HTML', 'CSS']
    },
    {
      name: 'Frameworks & Libraries',
      skills: ['React', 'Node.js', 'TensorFlow', 'PyTorch', 'Pandas', 'seaborn']
    },
    {
      name: 'Data Analytics & Machine Learning',
      skills: ['Apache Spark', 'Hadoop', 'ETL', 'NLP', 'statistical Modeling']
    },
    {
      name: 'Cloud & DevOps',
      skills: ['AWS', 'GCP', 'Docker', 'CI/CD', 'Git']
    },
    {
      name: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'SQLite', 'MySQL']
    }
  ];

  const education = [
    {
      degree: 'Master of Computer Science (MCS)',
      school: 'Rice University',
      location: 'Houston, Texas, USA',
      period: '2023 - 2025',
      details: [
        'GPA: 3.9/4.0',
        'Focus on Distributed Systems and Machine Learning',
        'Graduate Research Assistant in Database Systems Lab',
        'Teaching Assistant for Data Structures and Algorithms'
      ],
      courses: ['Distributed Systems', 'Machine Learning', 'Advanced Algorithms', 'Cloud Computing', 'Database Systems']
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University Name',
      location: 'City, Country',
      period: '2017 - 2021',
      details: [
        'GPA: 3.8/4.0',
        'Graduated with Honors',
        'Dean\'s List all semesters'
      ],
      courses: ['Data Structures', 'Algorithms', 'Operating Systems', 'Computer Networks', 'Software Engineering']
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-20 relative bg-white">
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillCategory key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
