import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { Results } from '../components/Results';
import { analyzeContent } from '../services/geminiService';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AlertCircle, Zap, Cpu, Monitor, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    summary: '',
    concepts: [] as string[]
  });

  const handleAnalyze = async (content: string, type: 'text' | 'url') => {
    setIsAnalyzing(true);
    setShowResults(false);
    setError(null);

    try {
      const result = await analyzeContent(content, type);
      setData(result);
      setShowResults(true);
      
      // Save to Firestore if user is logged in
      if (user) {
        try {
          await addDoc(collection(db, 'analyses'), {
            userId: user.uid,
            content: content.substring(0, 1000), // Store first 1000 chars
            type,
            summary: result.summary,
            concepts: result.concepts,
            createdAt: serverTimestamp()
          });
        } catch (dbErr) {
          console.error("Error saving analysis to DB:", dbErr);
        }
      }

      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <Hero onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      
      {error && (
        <div className="max-w-4xl mx-auto px-6 mb-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-3xl flex items-center gap-6 shadow-xl shadow-red-500/5"
          >
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
              <AlertCircle size={24} />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-1">{t('results.error')}</h4>
              <p className="text-sm opacity-80 font-medium">{error}</p>
            </div>
          </motion.div>
        </div>
      )}

      <div id="results-section">
        <Results 
          isVisible={showResults} 
          summary={data.summary} 
          concepts={data.concepts} 
        />
      </div>
      
      {!showResults && !isAnalyzing && (
        <section className="py-40 relative overflow-hidden transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-32"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-apple-blue/10 rounded-full mb-8">
                <Zap size={16} className="text-apple-blue" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-apple-ink/60">{t('hero.features.badge')}</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-10 text-apple-ink">
                {t('hero.subtitle')}
              </h2>
              <p className="text-xl text-apple-gray max-w-2xl mx-auto font-medium leading-relaxed">
                {t('hero.description')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: t('hero.features.speed'), 
                  desc: t('hero.features.speedDesc'),
                  img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800',
                  icon: Zap,
                  color: 'bg-orange-100 text-orange-600'
                },
                { 
                  title: t('hero.features.precision'), 
                  desc: t('hero.features.precisionDesc'),
                  img: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800',
                  icon: Cpu,
                  color: 'bg-blue-100 text-blue-600'
                },
                { 
                  title: t('hero.features.design'), 
                  desc: t('hero.features.designDesc'),
                  img: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=800',
                  icon: Monitor,
                  color: 'bg-green-100 text-green-600'
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="apple-card group hover:-translate-y-4 shadow-2xl shadow-black/5"
                >
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-12`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-3xl font-display font-bold tracking-tight mb-6 text-apple-ink">
                    {feature.title}
                  </h3>
                  <p className="text-base text-apple-gray font-medium leading-relaxed mb-10">
                    {feature.desc}
                  </p>
                  <div className="overflow-hidden rounded-3xl aspect-video relative shadow-inner">
                    <img 
                      src={feature.img} 
                      alt={feature.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
