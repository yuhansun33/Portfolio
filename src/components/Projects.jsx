import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl overflow-hidden border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all group"
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div className="flex space-x-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-600 transition-colors"
                aria-label="Live Demo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">
          {project.title}
        </h3>
        
        {project.period && (
          <p className="text-sm text-slate-500 mb-3">
            {project.period}
          </p>
        )}
        
        <p className="text-slate-600 mb-4 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'Comparative Machine Unlearning Analysis on CNNs',
      period: 'Sep 2025 - Dec 2025',
      description: 'Evaluated machine unlearning efficacy across VGG-16 and ResNet-18 by implementing Gradient Ascent and SalUn on CIFAR-10, establishing empirical benchmarks for model selection in GDPR and privacy-sensitive applications.',
      technologies: ['Machine Unlearning', 'PyTorch', 'VGG-16', 'ResNet-18', 'SalUn'],
      github: 'https://github.com/ryusudol/Model-Structure-Impact-on-Unlearning'
    },
    {
      title: 'Intelligent Tutoring System with Multi-Agent LLM',
      period: 'Feb 2024 - Jun 2024',
      description: 'Developed a multi-agent tutoring system with CrewAI, integrating RAG and Chroma DB for evidence-based answers. Benchmarked LLaMA-3 and GPT-4o, and optimized the retrieval system with GPT-4o and OpenAI embeddings to improve semantic stability and cut redundant API calls by 20%.',
      technologies: ['Multi-Agent LLM', 'RAG', 'CrewAI', 'LangChain', 'Chroma DB'],
      github: 'https://github.com/yuhansun33/capstone_final_project_crewai'
    },
    {
      title: 'Full-Stack Blockchain Supply Chain Application',
      period: 'Feb 2023 - Mar 2024',
      description: 'Engineered a full-stack supply chain tracking platform, developing a React frontend for real-time interaction with smart contracts via Web3.js, and an Express.js backend with MySQL for secure user authentication. Deployed smart contracts on a simulated blockchain network using Truffle and Ganache.',
      technologies: ['React', 'Web3.js', 'Express.js', 'MySQL', 'Truffle', 'Ganache'],
      github: 'https://github.com/yuhansun33/Blockchain_Application_in_Supply_Chain'
    },
    {
      title: 'Stock Price Prediction using Sentiment Analysis',
      period: 'Feb 2024 - Jun 2024',
      description: 'Improved stock price prediction accuracy, reducing RMSE by 9% and MAE by 13%, by developing a hybrid LSTM model that incorporated NLP features from BERT sentiment and LDA topic modeling.',
      technologies: ['PyTorch', 'BERT', 'LSTM', 'NLP', 'LDA', 'Sentiment Analysis'],
      github: 'https://github.com/77ivy/Final_IntroAI'
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 relative bg-gradient-to-b from-white to-blue-50">
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
