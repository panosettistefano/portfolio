import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Shield, Heart, ArrowRight, Zap, Globe, Cpu, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-48 pb-32 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-apple-blue/20 rounded-full mb-8">
              <Target size={16} className="text-apple-blue" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-apple-ink/60">Our Mission</span>
            </div>
            <h1 className="text-6xl md:text-[100px] font-display font-bold leading-[0.9] tracking-tight mb-10 text-apple-ink">
              {t('about.title')}
            </h1>
            <p className="text-xl md:text-2xl text-apple-gray font-medium leading-relaxed max-w-2xl mb-12">
              {t('about.missionDesc')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="apple-card bg-apple-bg shadow-2xl shadow-black/5">
                <h4 className="text-5xl font-display font-bold text-apple-blue mb-2 tracking-tight">12k+</h4>
                <p className="text-[10px] font-bold text-apple-gray/60 uppercase tracking-widest">Active Learners</p>
              </div>
              <div className="apple-card bg-apple-bg shadow-2xl shadow-black/5">
                <h4 className="text-5xl font-display font-bold text-apple-ink mb-2 tracking-tight">1.5M</h4>
                <p className="text-[10px] font-bold text-apple-gray/60 uppercase tracking-widest">Insights Generated</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-black/20 group">
              <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" 
                alt="Our Team" 
                className="w-full h-auto aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-apple-ink/60 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="bg-apple-bg/10 backdrop-blur-xl border border-apple-bg/20 p-8 rounded-3xl">
                  <p className="text-white font-medium text-lg leading-relaxed italic mb-6">
                    "We're not just building a tool, we're building a new way to interact with information."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-[2px] bg-apple-blue" />
                    <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">The Founders</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-40">
          {[
            { icon: Zap, title: t('about.values.speed'), desc: t('about.values.speedDesc'), color: 'bg-orange-500/20 text-orange-500' },
            { icon: Target, title: t('about.values.clarity'), desc: t('about.values.clarityDesc'), color: 'bg-blue-500/20 text-blue-500' },
            { icon: Globe, title: t('about.values.accessibility'), desc: t('about.values.accessibilityDesc'), color: 'bg-emerald-500/20 text-emerald-500' },
            { icon: Cpu, title: "AI Power", desc: "Leveraging the latest in neural networks to provide instant insights.", color: 'bg-purple-500/20 text-purple-500' }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="apple-card group hover:bg-apple-ink hover:text-apple-bg transition-all duration-500 shadow-xl shadow-black/5"
            >
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-12`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-display font-bold tracking-tight mb-4">{item.title}</h3>
              <p className="text-sm font-medium leading-relaxed opacity-60">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-apple-blue rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none grid-pattern" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-10 text-white leading-tight">
              {t('about.cta')}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-16 text-xl font-medium leading-relaxed">
              {t('about.subtitle')}
            </p>
            <button className="apple-btn bg-apple-bg text-apple-blue px-14 py-7 text-xl group/btn shadow-2xl shadow-black/20">
              <span className="font-bold">{t('about.ctaBtn')}</span>
              <ArrowRight size={28} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
