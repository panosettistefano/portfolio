import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Moon, Sun, Languages, LogOut, User as UserIcon, Zap, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.pricing'), path: '/pricing' },
    { name: t('nav.about'), path: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col mesh-gradient selection:bg-apple-blue selection:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center justify-between apple-glass px-8 py-4 rounded-[2.5rem] transition-all duration-500 ${isScrolled ? 'scale-95 shadow-2xl shadow-black/10' : 'scale-100'}`}>
            <div className="flex items-center gap-12">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-apple-blue flex items-center justify-center rounded-xl shadow-lg shadow-apple-blue/20 group-hover:scale-110 transition-transform">
                  <Zap size={22} className="text-white" fill="currentColor" />
                </div>
                <span className="text-2xl font-display font-bold tracking-tight text-apple-ink">StudyFlow</span>
              </Link>

              <div className="hidden md:flex gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-semibold transition-all hover:text-apple-blue ${
                      location.pathname === link.path ? 'text-apple-blue' : 'text-apple-ink/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-apple-soft hover:brightness-110 transition-all text-apple-ink"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <div className="hidden sm:flex items-center gap-2 bg-apple-soft p-1 rounded-full">
                <button 
                  onClick={() => setLanguage('it')}
                  className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${language === 'it' ? 'bg-apple-ink text-apple-bg shadow-sm' : 'text-apple-ink/40'}`}
                >
                  IT
                </button>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${language === 'en' ? 'bg-apple-ink text-apple-bg shadow-sm' : 'text-apple-ink/40'}`}
                >
                  EN
                </button>
              </div>

              <div className="h-6 w-[1px] bg-apple-ink/10 mx-2 hidden sm:block" />

              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden lg:flex items-center gap-3">
                    <div className="w-8 h-8 bg-apple-blue/10 rounded-full flex items-center justify-center text-apple-blue font-bold text-xs">
                      {user.displayName?.[0] || user.email?.[0].toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold text-apple-ink/60 max-w-[100px] truncate">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <button 
                    onClick={() => signOut()} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-apple-soft hover:bg-red-500 hover:text-white transition-all"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="apple-btn apple-btn-primary px-8 py-2.5 text-sm"
                >
                  <span>Login</span>
                </Link>
              )}
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-apple-soft"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden pt-32 px-6"
          >
            <div className="apple-glass rounded-[3rem] p-10 space-y-8">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-3xl font-display font-bold text-apple-ink hover:text-apple-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="h-[1px] bg-apple-ink/10" />
              {!user && (
                <Link 
                  to="/auth" 
                  onClick={() => setIsMenuOpen(false)}
                  className="apple-btn apple-btn-primary w-full"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marquee Banner */}
      <div className="mt-40 marquee-container">
        <div className="marquee-content flex gap-16 font-display font-bold uppercase text-2xl md:text-5xl text-apple-ink/80">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>StudyFlow AI</span>
              <span className="w-3 h-3 bg-apple-blue rounded-full" />
              <span>Instant Insights</span>
              <span className="w-3 h-3 bg-apple-green rounded-full" />
              <span>The Future of Learning</span>
              <span className="w-3 h-3 bg-apple-gray rounded-full" />
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-apple-bg border-t border-apple-gray/10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-apple-blue flex items-center justify-center rounded-2xl shadow-lg shadow-apple-blue/20">
                  <Zap size={24} className="text-white" fill="currentColor" />
                </div>
                <span className="text-4xl font-display font-bold tracking-tight text-apple-ink">StudyFlow</span>
              </div>
              <p className="text-xl text-apple-ink/50 font-medium leading-relaxed max-w-md mb-12">
                {t('about.subtitle')}
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-apple-soft rounded-full border border-apple-gray/10 flex items-center gap-2">
                  <div className="w-2 h-2 bg-apple-green rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-apple-ink/60">System Online</span>
                </div>
                <div className="px-4 py-2 bg-apple-soft rounded-full border border-apple-gray/10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-apple-ink/30">v4.0.0-apple</span>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-10 text-apple-ink">Navigation</h4>
              <ul className="space-y-6">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-lg font-semibold text-apple-ink/60 hover:text-apple-blue transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-10 text-apple-ink">Connect</h4>
              <ul className="space-y-6">
                {['Twitter', 'Instagram', 'LinkedIn', 'Github'].map(social => (
                  <li key={social}>
                    <a href="#" className="text-lg font-semibold text-apple-ink/60 hover:text-apple-blue transition-colors flex items-center justify-between group">
                      {social}
                      <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-apple-gray/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-sm text-apple-ink/30 font-medium">
              © 2026 StudyFlow AI. Designed for the future.
            </p>
            <div className="flex gap-12">
              <Link to="/privacy" className="text-sm font-medium text-apple-ink/30 hover:text-apple-ink transition-colors">{t('legal.privacy.title')}</Link>
              <Link to="/cookies" className="text-sm font-medium text-apple-ink/30 hover:text-apple-ink transition-colors">{t('legal.cookies.title')}</Link>
              <a href="#" className="text-sm font-medium text-apple-ink/30 hover:text-apple-ink transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
