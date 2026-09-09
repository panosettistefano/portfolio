import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-48 pb-32 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-apple-blue/20 rounded-full mb-8">
            <Shield size={16} className="text-apple-blue" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-apple-ink/60">{t('legal.privacy.badge')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 text-apple-ink">
            {t('legal.privacy.title')}
          </h1>
          <p className="text-xl text-apple-gray font-medium leading-relaxed max-w-2xl mx-auto">
            {t('legal.privacy.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-16">
          <section className="apple-card shadow-2xl shadow-black/5 p-12 md:p-16">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-14 h-14 bg-apple-blue/20 text-apple-blue rounded-2xl flex items-center justify-center">
                <FileText size={28} />
              </div>
              <h2 className="text-3xl font-display font-bold tracking-tight text-apple-ink">{t('legal.privacy.sections.0.title')}</h2>
            </div>
            <div className="prose prose-lg text-apple-gray font-medium leading-relaxed">
              <p className="mb-6">
                {t('legal.privacy.sections.0.content')}
              </p>
            </div>
          </section>

          <section className="apple-card shadow-2xl shadow-black/5 p-12 md:p-16">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-14 h-14 bg-apple-blue/20 text-apple-blue rounded-2xl flex items-center justify-center">
                <Lock size={28} />
              </div>
              <h2 className="text-3xl font-display font-bold tracking-tight text-apple-ink">{t('legal.privacy.sections.1.title')}</h2>
            </div>
            <div className="prose prose-lg text-apple-gray font-medium leading-relaxed">
              <p className="mb-6">
                {t('legal.privacy.sections.1.content')}
              </p>
            </div>
          </section>

          <section className="apple-card shadow-2xl shadow-black/5 p-12 md:p-16">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-14 h-14 bg-apple-blue/20 text-apple-blue rounded-2xl flex items-center justify-center">
                <Eye size={28} />
              </div>
              <h2 className="text-3xl font-display font-bold tracking-tight text-apple-ink">{t('legal.privacy.sections.2.title')}</h2>
            </div>
            <div className="prose prose-lg text-apple-gray font-medium leading-relaxed">
              <p className="mb-6">
                {t('legal.privacy.sections.2.content')}
              </p>
              <p className="mt-8">
                To exercise any of these rights, please contact us at <span className="text-apple-blue font-bold">privacy@studyflow.ai</span>.
              </p>
            </div>
          </section>

          <section className="apple-card bg-apple-ink text-apple-bg p-12 md:p-16 relative overflow-hidden group border-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-apple-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl font-display font-bold tracking-tight mb-6">{t('legal.privacy.retention')}</h2>
              <p className="text-apple-bg/60 font-medium leading-relaxed mb-10">
                {t('legal.privacy.retentionDesc')}
              </p>
              <div className="flex items-center gap-4 text-apple-blue font-bold uppercase tracking-widest text-[10px]">
                <span>{t('legal.privacy.updated')}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
