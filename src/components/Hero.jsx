import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToNext = () => {
    const element = document.getElementById('experience');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
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
                className="absolute top-12 left-12 bg-white p-4 rounded-lg shadow-lg border border-blue-200 w-36"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="text-xs font-semibold text-slate-700">Full-Stack</div>
                </div>
                <div className="text-sm text-slate-500">Building scalable solutions</div>
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
                className="absolute top-32 right-16 bg-gradient-to-br from-orange-50 to-white p-4 rounded-lg shadow-lg border-2 border-orange-300 w-36"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-slate-700">Ex-Amazon</div>
                  {/* Amazon smile arrow */}
                  <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.5 17.5c-1.5 1.5-4 1.5-5.5 0m12 0c-2-2-5-3-9-3s-7 1-9 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M20 16l2 2-2 1" fill="currentColor"/>
                  </svg>
                </div>
                <div className="text-lg font-bold text-orange-600">Data Analyst</div>
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
                className="absolute bottom-24 left-16 bg-white p-4 rounded-lg shadow-lg border border-purple-200 w-32"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-7 h-7 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M9 2h6l-1.5 5h-3L9 2z"/>
                  </svg>
                  <div className="text-xs font-bold text-slate-700">Innovation</div>
                </div>
                <div className="text-xs text-slate-500">ML & AI Solutions</div>
              </motion.div>

              {/* Leadership Card */}
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ 
                  duration: 6.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-32 right-20 bg-white p-4 rounded-lg shadow-lg border border-cyan-200 w-32"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div className="text-xs font-bold text-slate-700">Leadership</div>
                </div>
                <div className="text-xs text-slate-500">Team & Impact</div>
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
