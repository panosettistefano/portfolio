import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Flashcard } from '../services/geminiService';

interface FlashcardsProps {
  cards: Flashcard[];
  onClose: () => void;
}

export const Flashcards: React.FC<FlashcardsProps> = ({ cards, onClose }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 50);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex - 1), 50);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-3xl w-full glass-card p-10 md:p-16 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)]"
      >
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 w-14 h-14 flex items-center justify-center rounded-full bg-apple-soft text-apple-ink hover:bg-apple-blue hover:text-white transition-all duration-300 shadow-sm backdrop-blur-xl border border-apple-gray/10"
        >
          <XCircle size={28} />
        </button>

        <div className="text-center mb-14">
          <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-apple-ink mb-5">
            {t('premium.studyFlashcards')}
          </h3>
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-apple-blue/20 text-apple-blue rounded-full text-sm font-bold shadow-inner">
            Card {currentIndex + 1} of {cards.length}
          </div>
        </div>

        <div className="relative h-[450px] w-full perspective-1000 mb-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + (isFlipped ? '-back' : '-front')}
              initial={{ opacity: 0, rotateY: isFlipped ? -90 : 90, x: direction * 50 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: isFlipped ? 90 : -90, x: -direction * 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              onClick={handleFlip}
              className={`w-full h-full p-12 md:p-20 flex flex-col items-center justify-center text-center cursor-pointer rounded-[3.5rem] transition-all duration-500 shadow-2xl ${
                isFlipped 
                  ? 'bg-apple-blue text-white shadow-apple-blue/30' 
                  : 'bg-apple-bg/80 text-apple-ink border border-apple-gray/20 backdrop-blur-xl'
              }`}
            >
              <span className={`absolute top-10 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50`}>
                {isFlipped ? t('premium.back') : t('premium.front')}
              </span>
              
              <h4 className="text-3xl md:text-5xl font-display font-bold leading-tight tracking-tight px-6">
                {isFlipped ? currentCard.back : currentCard.front}
              </h4>

              <div className="absolute bottom-10 flex items-center gap-3 opacity-50 text-[10px] font-bold uppercase tracking-[0.2em]">
                <RotateCcw size={18} />
                {t('premium.flip')}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 apple-btn apple-btn-secondary py-6 flex items-center justify-center gap-4 disabled:opacity-30 shadow-sm"
          >
            <ChevronLeft size={28} />
            <span className="text-xl font-bold">Previous</span>
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            className="flex-1 apple-btn apple-btn-primary py-6 flex items-center justify-center gap-4 disabled:opacity-30 shadow-xl shadow-apple-blue/20"
          >
            <span className="text-xl font-bold">Next</span>
            <ChevronRight size={28} />
          </button>
        </div>

        {currentIndex === cards.length - 1 && isFlipped && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onClose}
            className="w-full mt-8 apple-btn bg-apple-green text-white flex items-center justify-center gap-3 py-6 text-xl shadow-xl shadow-apple-green/20"
          >
            <CheckCircle2 size={28} />
            <span>{t('premium.done')}</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};
