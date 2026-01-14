import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ExperienceCard = ({ experience, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative"
    >
      {/* Timeline dot */}
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-4 border-gray-900 z-10" />
      
      <div className={`ml-8 p-6 rounded-xl border-2 transition-all hover:scale-[1.02] ${
        experience.company.includes('Amazon') 
          ? 'border-amazon-orange/50 bg-amazon-navy/20 hover:border-amazon-orange' 
          : 'border-purple-500/50 glass hover:border-purple-500'
      }`}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{experience.title}</h3>
            <p className={`text-lg font-semibold ${
              experience.company.includes('Amazon') ? 'text-amazon-orange' : 'text-purple-400'
            }`}>
              {experience.company}
            </p>
            {experience.location && (
              <p className="text-gray-400 text-sm mt-1">{experience.location}</p>
            )}
          </div>
          <span className="text-gray-400 text-sm md:text-base mt-2 md:mt-0 whitespace-nowrap">
            {experience.period}
          </span>
        </div>
        
        <ul className="space-y-3">
          {experience.achievements.map((achievement, i) => (
            <li key={i} className="flex items-start text-gray-300">
              <span className="text-blue-400 mr-2 mt-1">▹</span>
              <span>
                {typeof achievement === 'string' ? (
                  achievement
                ) : (
                  <>
                    <span className="font-semibold text-blue-300">{achievement.category}</span>{' '}
                    {achievement.description}
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>

        {experience.technologies && (
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-xs font-semibold text-purple-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
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
      achievements: [
        {
          category: 'Machine Learning:',
          description: 'Drove a 60% acceleration in new seller launch time by engineering a segmentation model using K-Means clustering and validated distinct seller profiles via ANOVA to prioritize high-potential targets'
        },
        {
          category: 'Data Pipeline Automation:',
          description: 'Designed an automated ETL pipeline using Python and SQLite to transform raw data into structured datasets, powering weekly business reviews and reducing manual reporting time for stakeholders by 40%'
        },
        {
          category: 'Data-Driven Marketing:',
          description: 'Built a solution to launch 3 Go-to-Market (GTM) strategies by analyzing customer behavior and sales data, leading a Taiwan Select campaign that drove 3,000+ unique clicks for 100+ sellers during Prime Day'
        },
        {
          category: 'Marketing Analytics Solution:',
          description: 'Increased ad spend by 13% by developing a marketing analytics framework and delivering 30+ data-driven consultations based on campaign performance and analysis'
        }
      ],
      technologies: ['Data Science', 'Data Engineering', 'Python', 'SQL', 'Machine Learning', 'Data Analysis', 'ETL']
    },
    {
      title: 'Data Engineer Intern',
      company: 'Syntec Technology',
      location: 'Hsinchu, Taiwan',
      period: 'Jun 2023 - Nov 2023',
      achievements: [
        {
          category: 'Enterprise Data Integration:',
          description: 'Built a data pipeline to integrate data from SAP system into a centralized dashboard that visualized production and material data to enhance cross-departmental operational visibility for 50+ stakeholders'
        },
        {
          category: 'Intelligent Automation:',
          description: 'Developed a Robotic Process Automation (RPA) solution to automate manufacturing workflows, which reduced routine work hours by 7% and ensured higher data integrity'
        },
        {
          category: 'Data Analytics Scripting:',
          description: 'Developed a VBA automation script to create a packaging assignment tool, which analyzed item volume and weight data to automate tasks and increase accuracy by 10%'
        }
      ],
      technologies: ['Data Engineering', 'Data Pipeline', 'Python', 'SQL', 'Data Analysis', 'Automation']
    }
  ];

  return (
    <section id="experience" className="min-h-screen py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey from industry to academia
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
