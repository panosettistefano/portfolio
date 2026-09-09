import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Chrome, Smartphone, CheckCircle2, LogIn, ArrowRight, Zap, Globe, Cpu, Rocket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const GetStarted: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLaunchApp = () => {
    if (user) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="pt-48 pb-32 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-apple-blue/20 rounded-full mb-8"
          >
            <Rocket size={16} className="text-apple-blue" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-apple-ink/60">Launch Guide</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[100px] font-display font-bold tracking-tight mb-10 text-apple-ink leading-[0.9]"
          >
            {t('pricing.getStarted')} <span className="text-apple-blue">StudyFlow</span>
          </motion.h1>
          <p className="text-xl text-apple-gray max-w-2xl mx-auto font-medium leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {[
            { 
              icon: BookOpen, 
              title: 'Web App', 
              desc: t('hero.features.designDesc'),
              cta: user ? t('nav.home') : t('nav.signIn'),
              onClick: handleLaunchApp,
              primary: true,
              color: 'bg-orange-500/20 text-orange-500'
            },
            { 
              icon: Chrome, 
              title: 'Extension', 
              desc: t('hero.features.speedDesc'),
              cta: 'Install Now',
              onClick: () => {},
              primary: false,
              color: 'bg-blue-500/20 text-blue-500'
            },
            { 
              icon: Smartphone, 
              title: 'Mobile', 
              desc: t('hero.features.precisionDesc'),
              cta: 'Download App',
              onClick: () => {},
              primary: false,
              color: 'bg-emerald-500/20 text-emerald-500'
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="apple-card flex flex-col h-full group shadow-2xl shadow-black/5"
            >
              <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mb-10 transition-transform group-hover:rotate-12`}>
                <item.icon size={36} />
              </div>
              <h3 className="text-3xl font-display font-bold tracking-tight mb-6 text-apple-ink">{item.title}</h3>
              <p className="text-base text-apple-gray font-medium leading-relaxed mb-12">
                {item.desc}
              </p>
              <button 
                onClick={item.onClick}
                className={`apple-btn w-full py-5 text-lg group/btn ${
                  item.primary ? 'apple-btn-primary' : 'apple-btn-outline'
                }`}
              >
                {!user && item.primary && <LogIn size={20} />}
                <span className="font-bold">{item.cta}</span>
                <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="apple-card bg-apple-bg shadow-2xl shadow-black/10 p-16 md:p-24">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-20 text-center text-apple-ink">
              Installation Steps
            </h2>
            <div className="space-y-12">
              {[
                { title: 'Create your account', desc: 'Sign up with Email or Google to save your analyses and sync across devices.' },
                { title: 'Choose your input', desc: 'Paste a URL or simply type your notes into the analyzer.' },
                { title: 'Get instant insights', desc: 'Review your AI-generated summary and key concepts in seconds.' },
                { title: 'Save and organize', desc: 'Your history is automatically saved to your account for later review.' }
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-10 group"
                >
                  <div className="w-16 h-16 bg-apple-ink text-apple-bg rounded-2xl flex items-center justify-center font-display font-bold text-3xl shrink-0 group-hover:bg-apple-blue group-hover:text-white transition-colors duration-300">
                    {i + 1}
                  </div>
                  <div className="flex-grow pt-2">
                    <h4 className="text-3xl font-display font-bold tracking-tight mb-4 text-apple-ink group-hover:text-apple-blue transition-colors duration-300">{step.title}</h4>
                    <p className="text-lg text-apple-gray font-medium leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="hidden sm:block pt-4 text-apple-ink/5 group-hover:text-apple-blue/10 transition-colors duration-300">
                    <CheckCircle2 size={48} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
