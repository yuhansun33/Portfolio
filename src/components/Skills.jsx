import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillCategory = ({ category, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
    >
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <span className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
        {category.name}
      </h3>
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-600 hover:border-blue-400 hover:bg-blue-100 transition-all cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      name: 'Languages',
      skills: ['Python', 'TypeScript/JavaScript', 'SQL', 'C/C++']
    },
    {
      name: 'AI & ML',
      skills: ['PyTorch', 'LLM Agents & Tool Calling', 'NeMo Agent Toolkit', 'RAG', 'Distillation', 'GNN', 'Reinforcement Learning']
    },
    {
      name: 'Backend & Infra',
      skills: ['FastAPI', 'React', 'REST API', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'PostgreSQL', 'MongoDB']
    },
    {
      name: 'Data & Cloud',
      skills: ['Kafka', 'Spark', 'ETL', 'BigQuery', 'Pandas', 'AWS (S3, EC2, EMR)', 'GCP']
    }
  ];

  

  return (
    <section id="skills" className="min-h-screen py-20 relative bg-white">
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Skills & Expertise</span>
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
