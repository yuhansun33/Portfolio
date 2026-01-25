import { motion } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';

const Hero = () => {
  const scrollToNext = () => {
    const element = document.getElementById('experience');
    if (element) {
      smoothScrollTo(element);
    }
  };

  return (
    <section id="hero" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20 pb-12">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800">
              Hi, I'm <span className="text-gradient">Kerstin Sun</span>
            </h1>

            <div className="text-xl md:text-2xl text-slate-600 font-medium">
              Ex-Amazon Data Analyst | MCS Student at Rice University
            </div>

            <p className="text-base text-slate-500 leading-relaxed max-w-2xl">
              Passionate about leveraging data analytics and software engineering to solve complex problems. 
              With hands-on experience at Amazon and a strong academic foundation, I specialize in building 
              scalable solutions and deriving actionable insights from data.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://github.com/yuhansun33"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 rounded-lg transition-all shadow-sm hover:shadow-md group"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/yuhanssun/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 rounded-lg transition-all shadow-sm hover:shadow-md group"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:kerstinsun2000@gmail.com"
                className="p-3 bg-white border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 rounded-lg transition-all shadow-sm hover:shadow-md group"
                aria-label="Contact Me"
              >
                <svg className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right side - Animated Data Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-2xl">
              
              {/* Computer Card */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-12 left-12 bg-white p-4 rounded-lg shadow-lg border-2 border-blue-300 w-40"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div className="text-xs font-bold text-slate-700">Data Science</div>
                </div>
                <div className="text-sm text-slate-500">Building large-scale solutions</div>
              </motion.div>

              {/* Amazon Card */}
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 7, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-32 right-12 bg-gradient-to-br from-orange-100 to-white p-4 rounded-lg shadow-xl border-2 border-orange-400 w-40"
              >
                <div className="flex items-center gap-2 mb-2">
                  {/* Package/Box Icon for Amazon */}
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <div className="text-sm font-bold text-slate-800">Ex-Amazon</div>
                </div>
                <div className="text-sm font-semibold text-orange-700">Data Analyst</div>
              </motion.div>

              {/* Innovation Card */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 10, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute bottom-28 left-16 bg-gradient-to-br from-orange-50 to-white p-4 rounded-lg shadow-lg border-2 border-orange-300 w-36"
              >
                <div className="flex items-center gap-2 mb-2">
                  {/* Brain/AI Icon */}
                  <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div className="text-xs font-bold text-slate-700">Innovation</div>
                </div>
                <div className="text-xs text-slate-500">AI & ML</div>
              </motion.div>


              {/* Cloud/AWS Card */}
              <motion.div
                animate={{ 
                  y: [0, 12, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ 
                  duration: 6.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1.5
                }}
                className="absolute bottom-32 right-16 bg-gradient-to-br from-cyan-50 to-white p-4 rounded-lg shadow-lg border-2 border-cyan-300 w-36"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <div className="text-xs font-bold text-slate-700">Cloud</div>
                </div>
                <div className="text-xs text-slate-500">AWS & GCP</div>
              </motion.div>

              {/* ETL/Pipeline Card */}
              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  x: [0, -8, 0]
                }}
                transition={{ 
                  duration: 5.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 3
                }}
                className="absolute top-8 right-8 bg-white p-3 rounded-lg shadow-lg border-2 border-orange-200 w-32"
              >
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                  <div className="text-xs font-bold text-slate-700">ETL</div>
                </div>
                <div className="text-xs text-slate-500">Data Pipeline</div>
              </motion.div>

              {/* Central geometric design */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative w-48 h-48"
                >
                  {/* Outer ring */}
                  <div className="absolute inset-0 border-4 border-blue-300 rounded-full opacity-30" />
                  
                  {/* Middle ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-6 border-4 border-cyan-300 rounded-full opacity-40"
                  />
                  
                  {/* Inner circle with data chart icon */}
                  <div className="absolute inset-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -30, 0],
                    opacity: [0.2, 0.8, 0.2]
                  }}
                  transition={{ 
                    duration: 3 + i * 0.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full"
                  style={{ 
                    left: `${15 + i * 10}%`, 
                    top: `${20 + (i % 3) * 20}%` 
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
