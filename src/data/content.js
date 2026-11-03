// Every piece of copy on the site lives here, so edits never touch layout code.

const doc = (name) => `${import.meta.env.BASE_URL}docs/${encodeURIComponent(name)}`;
const logo = (file) => `${import.meta.env.BASE_URL}logos/${file}`;

export const LINKS = {
  github: 'https://github.com/yuhansun33',
  linkedin: 'https://www.linkedin.com/in/yuhanssun/',
  email: 'mailto:kerstinsun2000@gmail.com',
  resume: doc('Resume_Kerstin(YuHan)Sun.pdf'),
};

export const NAV = [
  { id: 'top', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'tools', label: 'Tools' },
];

export const HERO = {
  name: 'Kerstin Sun',
  tagline: 'Software engineer building AI systems and the data they run on.',
  // [text, emphasised?] pairs, rendered inside the glass card
  detail: [
    ['Agents and LLM tooling', true], [' at NVIDIA, ', false],
    ['data pipelines and models', true], [' at Amazon, and research on ', false],
    ['efficient inference', true], [' at Rice.', false],
  ],
};

export const PROJECTS = {
  title: 'Selected projects',
  intro: 'Research, data platforms and full-stack work.',
  items: [
    {
      id: 'papit', cover: 'papit', tag: 'Research', title: 'PAPIT',
      text: 'Prompt-aware pruning of image tokens for multimodal LLMs. A 1.3M-parameter scorer keeps the tokens the model would attend to.',
      stack: 'PyTorch · LLaVA · CLIP', meta: 'Team of 3 · 2026', href: 'https://github.com/yarikama/PAPIT',
    },
    {
      id: 'gnn', cover: 'gnn', tag: 'Research', title: 'Degree-normalized GNNs',
      text: 'Why job-shop schedulers break when the problem grows, and how mean aggregation keeps them stable across sizes.',
      stack: 'PyTorch · GNN · RL', meta: 'Team of 3 · 2026',
    },
    {
      id: 'trend', cover: 'trend', tag: 'Data', title: 'Content trending platform',
      text: 'Streaming pipeline over Kafka and PySpark with watermarked aggregations, landing in partitioned BigQuery tables.',
      stack: 'Kafka · Spark · BigQuery', meta: '2025–26',
    },
    {
      id: 'ricebook', cover: 'ricebook', tag: 'Full-stack', title: 'RiceBook',
      text: 'Social platform with Google OAuth, a denormalized MongoDB schema and server-side pagination.',
      stack: 'React · Express · MongoDB', meta: '2025',
    },
    {
      id: 'tutor', cover: 'tutor', tag: 'AI agents', title: 'Multi-agent tutor',
      text: 'CrewAI agents answering from course material through a RAG pipeline over Chroma DB.',
      stack: 'CrewAI · LangChain · RAG', meta: '2024', href: 'https://github.com/yuhansun33/capstone_final_project_crewai',
    },
  ],
};

// start/end are fractional years, used to place bars on the timeline
export const EXPERIENCE = {
  title: 'Experience',
  intro: 'Turning data and models into work that matters.',
  now: 2026.84,
  items: [
    {
      id: 'nvidia', kind: 'work', org: 'NVIDIA', short: 'NVIDIA', logo: logo('nvidia.svg'),
      role: 'AI Engineer Intern', where: 'Santa Clara, CA', dates: 'May – Jul 2026', start: 2026.33, end: 2026.58,
      text: 'Built the agent, rule engine and app that create chip-assembly BOMs. Live in production; about 16 hours of work now takes 15 minutes.',
    },
    {
      id: 'rice', kind: 'edu', org: 'Rice University', short: 'Rice', logo: logo('rice.svg'),
      role: 'M.C.S., Data Science & ML', where: 'Houston, TX · GPA 4.00', dates: '2025 – 2026', start: 2025.6, end: 2026.95,
      text: 'Research on efficient multimodal inference (PAPIT) and GNNs for scheduling.',
    },
    {
      id: 'amazon', kind: 'work', org: 'Amazon', short: 'Amazon', logo: logo('amazon.svg'),
      role: 'Data Analyst', where: 'Taipei, Taiwan', dates: 'Jul 2024 – Jul 2025', start: 2024.5, end: 2025.55,
      text: 'Seller segmentation and ETL pipelines for the Taiwan seller business. New-seller launch time went from 142 to 60 days.',
    },
    {
      id: 'nycu', kind: 'edu', org: 'NYCU', short: 'NYCU', logo: logo('nycu.svg'),
      role: 'B.S.', where: 'Hsinchu, Taiwan · GPA 3.97', dates: '2020 – 2024', start: 2020.67, end: 2024.45,
      text: 'National Yang Ming Chiao Tung University.',
    },
    {
      id: 'syntec', kind: 'work', org: 'Syntec Technology', short: 'Syntec', logo: logo('syntec.png'),
      role: 'Data Engineer Intern', where: 'Hsinchu, Taiwan', dates: 'Jun – Nov 2023', start: 2023.42, end: 2023.88,
      text: 'Data ingestion from the ERP with automated validation, feeding a production dashboard used across departments.',
    },
  ],
};

export const TOOLS = {
  title: 'Tools',
  groups: [
    { name: 'Languages', items: ['Python', 'TypeScript', 'SQL', 'C/C++'] },
    { name: 'AI & ML', items: ['PyTorch', 'LLM agents', 'RAG', 'LangChain', 'GNNs', 'RL'] },
    { name: 'Data', items: ['Kafka', 'Spark', 'ETL', 'BigQuery', 'Pandas'] },
    { name: 'Backend & infra', items: ['FastAPI', 'React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'AWS', 'GCP'] },
  ],
};
