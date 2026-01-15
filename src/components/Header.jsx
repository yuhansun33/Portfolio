import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { smoothScrollTo } from '../utils/smoothScroll';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      smoothScrollTo(element);
    }
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path, sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== path) {
      navigate(path);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          smoothScrollTo(element);
        }
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handlePreview = (fileName) => {
    // Use relative path for GitHub Pages compatibility
    const basePath = import.meta.env.BASE_URL || '/';
    window.open(`${basePath}docs/${fileName}`, '_blank');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl sm:text-2xl font-bold text-gradient cursor-pointer"
              >
                Kerstin Sun
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => handleNavigation('/', 'hero')}
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium text-sm"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation('/', 'experience')}
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium text-sm"
              >
                Experience
              </button>
              <Link
                to="/projects-skills"
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium text-sm"
              >
                Projects & Skills
              </Link>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePreview('Resume_Kerstin(YuHan)Sun.pdf')}
                className="px-4 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md font-medium text-white hover:from-blue-600 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all"
              >
                Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePreview('Unofficial Academic Transcript.pdf')}
                className="px-4 py-1.5 text-sm border-2 border-slate-200 rounded-md font-medium text-slate-600 hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                Transcript
              </motion.button>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[57px] left-0 right-0 z-40 bg-white/98 backdrop-blur-lg border-b border-slate-200 shadow-lg md:hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <button
                onClick={() => handleNavigation('/', 'hero')}
                className="text-left px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation('/', 'experience')}
                className="text-left px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                Experience
              </button>
              <Link
                to="/projects-skills"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                Projects & Skills
              </Link>
              
              <div className="pt-2 border-t border-slate-200 flex flex-col space-y-2">
                <button
                  onClick={() => handlePreview('Resume_Kerstin(YuHan)Sun.pdf')}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-medium text-white shadow-md"
                >
                  Resume
                </button>
                <button
                  onClick={() => handlePreview('Unofficial Academic Transcript.pdf')}
                  className="px-4 py-2 border-2 border-slate-200 rounded-lg font-medium text-slate-600 hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  Transcript
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
