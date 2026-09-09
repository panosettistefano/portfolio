import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Copy, Share2, Lightbulb, Headphones, Play, Square, Download, Loader2, Sparkles, BookOpen, Zap, Terminal, Cpu, Database, ArrowRight, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { generateSpeech, playPCMAudio } from '../services/ttsService';
import { generateFlashcards, Flashcard } from '../services/geminiService';
import { Flashcards } from './Flashcards';

interface ResultsProps {
  summary: string;
  concepts: string[];
  isVisible: boolean;
}

export const Results: React.FC<ResultsProps> = ({ summary, concepts, isVisible }) => {
  const { t, language } = useLanguage();
  const [isGeneratingAudio, setIsGeneratingAudio] = React.useState(false);
  const [audioBase64, setAudioBase64] = React.useState<string | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audioSource, setAudioSource] = React.useState<any>(null);
  const [audioCtx, setAudioCtx] = React.useState<AudioContext | null>(null);

  const [isGeneratingFlashcards, setIsGeneratingFlashcards] = React.useState(false);
  const [flashcards, setFlashcards] = React.useState<Flashcard[] | null>(null);
  const [showFlashcards, setShowFlashcards] = React.useState(false);

  const handleGenerateAudio = async () => {
    if (isPlaying) {
      audioSource?.stop();
      setIsPlaying(false);
      return;
    }

    if (audioBase64) {
      const { source, audioContext } = await playPCMAudio(audioBase64, () => setIsPlaying(false));
      setAudioSource(source);
      setAudioCtx(audioContext);
      setIsPlaying(true);
      return;
    }

    setIsGeneratingAudio(true);
    try {
      const base64 = await generateSpeech(summary, language);
      setAudioBase64(base64);
      const { source, audioContext } = await playPCMAudio(base64, () => setIsPlaying(false));
      setAudioSource(source);
      setAudioCtx(audioContext);
      setIsPlaying(true);
    } catch (error) {
      console.error("Audio generation failed:", error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handleGenerateFlashcards = async () => {
    if (flashcards) {
      setShowFlashcards(true);
      return;
    }

    setIsGeneratingFlashcards(true);
    try {
      const cards = await generateFlashcards(summary, language);
      setFlashcards(cards);
      setShowFlashcards(true);
    } catch (error) {
      console.error("Flashcards generation failed:", error);
    } finally {
      setIsGeneratingFlashcards(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (audioSource) audioSource.stop();
      if (audioCtx) audioCtx.close();
    };
  }, [audioSource, audioCtx]);

  if (!isVisible) return null;

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Core Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 space-y-10"
          >
            <div className="glass-card">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-apple-blue/10 text-apple-blue rounded-3xl flex items-center justify-center shadow-inner">
                    <FileText size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-apple-ink">
                      {t('results.summary')}
                    </h2>
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-apple-gray/50">{t('results.coreInsights')}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="w-14 h-14 flex items-center justify-center rounded-full bg-apple-soft text-apple-ink hover:bg-apple-blue hover:text-white transition-all duration-300 shadow-sm backdrop-blur-md">
                    <Copy size={22} />
                  </button>
                  <button className="w-14 h-14 flex items-center justify-center rounded-full bg-apple-soft text-apple-ink hover:bg-apple-blue hover:text-white transition-all duration-300 shadow-sm backdrop-blur-md">
                    <Share2 size={22} />
                  </button>
                </div>
              </div>

              <div className="text-xl md:text-2xl font-medium leading-[1.7] text-apple-ink/90 whitespace-pre-wrap">
                {summary || t('results.placeholder')}
              </div>
            </div>

            {/* AI Audio Briefing */}
            <div className="glass-card bg-apple-ink text-apple-bg overflow-hidden relative group border-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-apple-blue/15 rounded-full blur-[120px] group-hover:scale-110 transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="flex items-center gap-10">
                    <div className="w-28 h-28 bg-apple-bg/10 rounded-[2.5rem] flex items-center justify-center text-apple-blue backdrop-blur-xl shadow-2xl">
                      <Headphones size={56} />
                    </div>
                    <div>
                      <div className="flex items-center gap-5 mb-3">
                        <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{t('premium.audioBriefing')}</h3>
                        <span className="text-[11px] bg-apple-blue text-white px-4 py-1.5 rounded-full font-bold uppercase tracking-[0.2em]">AI Voice</span>
                      </div>
                      <p className="text-apple-gray font-bold uppercase tracking-[0.25em] text-[10px] opacity-60">
                        {isPlaying ? t('premium.playing') : t('premium.statusReady')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    {audioBase64 && (
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = `data:audio/wav;base64,${audioBase64}`;
                          link.download = "studyflow-briefing.wav";
                          link.click();
                        }}
                        className="w-18 h-18 flex items-center justify-center rounded-full bg-apple-bg/10 hover:bg-apple-bg/20 transition-all text-apple-ink backdrop-blur-xl border border-apple-ink/10"
                        title="Download"
                      >
                        <Download size={32} />
                      </button>
                    )}
                    
                    <button
                      onClick={handleGenerateAudio}
                      disabled={isGeneratingAudio}
                      className="apple-btn apple-btn-primary min-w-[280px] py-7 text-xl shadow-2xl shadow-apple-blue/30"
                    >
                      {isGeneratingAudio ? (
                        <Loader2 size={32} className="animate-spin" />
                      ) : isPlaying ? (
                        <>
                          <Square size={28} fill="currentColor" />
                          <span>{t('premium.stopBriefing')}</span>
                        </>
                      ) : (
                        <>
                          <Play size={28} fill="currentColor" />
                          <span>{t('premium.playBriefing')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Modern Audio Visualizer */}
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 100 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-end justify-center gap-2 mt-16 h-24 overflow-hidden"
                    >
                      {[...Array(80)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            height: [15, Math.random() * 80 + 15, 15] 
                          }}
                          transition={{ 
                            duration: 0.3 + Math.random() * 0.4, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-1.5 bg-apple-blue/60 rounded-full"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Key Concepts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="glass-card">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 bg-apple-green/10 text-apple-green rounded-3xl flex items-center justify-center shadow-inner">
                  <Lightbulb size={32} />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-apple-ink">
                    {t('results.concepts')}
                  </h2>
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-apple-gray/50">{t('results.keyTakeaways')}</span>
                </div>
              </div>
              
              <ul className="space-y-5">
                {concepts.length > 0 ? (
                  concepts.map((concept, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-5 p-6 bg-apple-soft rounded-3xl border border-apple-gray/10 hover:border-apple-blue/30 hover:brightness-105 transition-all duration-300 cursor-default group shadow-sm"
                    >
                      <div className="w-12 h-12 bg-apple-bg rounded-2xl flex items-center justify-center text-base font-bold text-apple-gray group-hover:bg-apple-blue group-hover:text-white transition-all duration-300 shadow-sm">
                        {index + 1}
                      </div>
                      <span className="text-lg font-bold text-apple-ink/90 group-hover:text-apple-ink transition-colors">
                        {concept}
                      </span>
                    </motion.li>
                  ))
                ) : (
                  <li className="text-center py-16 text-apple-gray/40 font-bold uppercase tracking-widest text-xs">{t('results.noConcepts')}</li>
                )}
              </ul>
            </div>

            {/* Interactive Learning CTA */}
            <div className="glass-card bg-apple-blue text-white overflow-hidden group border-none shadow-2xl shadow-apple-blue/20">
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/15 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/15 rounded-[2rem] flex items-center justify-center mb-10 backdrop-blur-xl shadow-2xl">
                  <BookOpen size={36} />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-5">{t('premium.masterContent')}</h3>
                <p className="text-white/80 font-medium mb-12 leading-relaxed text-lg md:text-xl">
                  {t('premium.masterDesc')}
                </p>
                <button 
                  onClick={handleGenerateFlashcards}
                  disabled={isGeneratingFlashcards}
                  className="apple-btn bg-white text-apple-blue w-full py-7 text-xl group/btn shadow-2xl shadow-black/10 hover:scale-[1.02] transition-all"
                >
                  {isGeneratingFlashcards ? (
                    <Loader2 size={32} className="animate-spin" />
                  ) : (
                    <>
                      <span className="font-bold">{t('premium.generateFlashcards')}</span>
                      <ArrowRight size={28} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Flashcards Modal */}
      <AnimatePresence>
        {showFlashcards && flashcards && (
          <Flashcards 
            cards={flashcards} 
            onClose={() => setShowFlashcards(false)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};
