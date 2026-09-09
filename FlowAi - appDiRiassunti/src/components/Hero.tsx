import React, { useState } from 'react';
import { Search, Globe, Zap, Sparkles, ArrowRight, Monitor, Terminal, Cpu, Play, CheckCircle2, Loader2, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onAnalyze: (content: string, type: 'text' | 'url') => void;
  isAnalyzing: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyze, isAnalyzing }) => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'text' | 'url'>('text');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAnalyze(input, mode);
    }
  };

  return (
    <section className="relative pt-48 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-apple-blue/20 text-apple-blue rounded-full mb-10"
          >
            <Zap size={14} fill="currentColor" />
            <span className="text-xs font-bold uppercase tracking-widest">{t('hero.integration')}</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[100px] font-display font-bold leading-[0.95] tracking-tight mb-10 text-apple-ink"
          >
            {t('hero.title')} <br />
            <span className="text-apple-blue">{t('hero.titleBlue')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-apple-gray font-medium max-w-2xl mx-auto leading-relaxed mb-14"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="apple-glass p-4 rounded-[3rem] flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center gap-3 px-6 pt-4">
                <button
                  onClick={() => setMode('text')}
                  className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    mode === 'text' ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/20' : 'text-apple-gray hover:bg-apple-soft'
                  }`}
                >
                  {t('hero.text')}
                </button>
                <button
                  onClick={() => setMode('url')}
                  className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    mode === 'url' ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/20' : 'text-apple-gray hover:bg-apple-soft'
                  }`}
                >
                  {t('hero.url')}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 p-2">
                <div className="flex-grow relative">
                  {mode === 'url' && (
                    <Globe className="absolute left-8 top-1/2 -translate-y-1/2 text-apple-gray/60" size={22} />
                  )}
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'text' ? t('hero.inputPlaceholder') : "https://example.com/article"}
                    className={`w-full bg-transparent border-none px-8 py-6 text-xl focus:outline-none min-h-[160px] md:min-h-0 resize-none font-medium placeholder:text-apple-gray/60 ${mode === 'url' ? 'pl-18' : ''}`}
                    rows={mode === 'text' ? 5 : 1}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAnalyzing || !input.trim()}
                  className="apple-btn apple-btn-primary px-14 py-8 text-xl group shadow-2xl shadow-apple-blue/30 flex items-center justify-center gap-4 self-center md:self-end"
                >
                  {isAnalyzing ? (
                    <Loader2 className="animate-spin" size={28} />
                  ) : (
                    <>
                      <span className="font-bold tracking-tight">{t('hero.analyzeBtn')}</span>
                      <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={28} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: t('hero.features.speed'), desc: t('hero.features.speedDesc'), color: 'text-orange-500' },
            { icon: Layout, title: t('hero.features.design'), desc: t('hero.features.designDesc'), color: 'text-blue-500' },
            { icon: CheckCircle2, title: t('hero.features.precision'), desc: t('hero.features.precisionDesc'), color: 'text-green-500' }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="apple-card group"
            >
              <div className={`w-14 h-14 bg-apple-soft rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110`}>
                <feature.icon size={28} className={feature.color} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-apple-ink">{feature.title}</h3>
              <p className="text-apple-gray font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-apple-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-apple-green/5 rounded-full blur-[120px]" />
      </div>
    </section>
  );
};
