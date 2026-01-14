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

          {/* Right side - 3D Scene Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-200 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-2xl" />
                <p className="text-slate-600 text-sm mt-8">
                  3D Scene Placeholder<br />
                  <span className="text-xs">Add your Spline or Three.js scene here</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
