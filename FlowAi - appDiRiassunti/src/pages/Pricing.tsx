import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Pricing: React.FC = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('pricing.plans.free.name'),
      price: '0',
      description: 'Perfect for getting started',
      features: t('pricing.plans.free.features'),
      cta: t('pricing.getStarted'),
      popular: false,
      color: 'bg-apple-bg text-apple-ink border-apple-gray/10'
    },
    {
      name: t('pricing.plans.pro.name'),
      price: '12',
      description: 'Most popular for students',
      features: t('pricing.plans.pro.features'),
      cta: t('pricing.getStarted'),
      popular: true,
      color: 'bg-apple-ink text-apple-bg border-none'
    },
    {
      name: t('pricing.plans.team.name'),
      price: '39',
      description: 'Best for research groups',
      features: t('pricing.plans.team.features'),
      cta: t('pricing.getStarted'),
      popular: false,
      color: 'bg-apple-bg text-apple-ink border-apple-gray/10'
    }
  ];

  return (
    <div className="pt-48 pb-32 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-apple-blue/20 rounded-full mb-8"
          >
            <Star size={16} className="text-apple-blue" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-apple-ink/60">Simple Pricing</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[100px] font-display font-bold tracking-tight mb-10 text-apple-ink leading-[0.9]"
          >
            {t('pricing.title')}
          </motion.h1>
          <p className="text-xl text-apple-gray max-w-2xl mx-auto font-medium leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className={`apple-card flex flex-col h-full relative group ${plan.popular ? 'ring-4 ring-apple-blue shadow-2xl shadow-apple-blue/20' : 'shadow-2xl shadow-black/5'} ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-apple-blue text-white px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-apple-blue/30">
                  Most Popular
                </div>
              )}
              
              <div className="mb-12">
                <h3 className="text-3xl font-display font-bold tracking-tight mb-3">{plan.name}</h3>
                <p className={`text-sm font-medium ${plan.popular ? 'text-white/60' : 'text-apple-gray'}`}>{plan.description}</p>
              </div>

              <div className="mb-12 flex items-baseline gap-2">
                <span className="text-7xl font-display font-bold tracking-tight">${plan.price}</span>
                <span className={`text-sm font-bold uppercase tracking-widest ${plan.popular ? 'text-white/40' : 'text-apple-gray/40'}`}>/{t('pricing.monthly')}</span>
              </div>

              <div className={`h-[1px] w-full mb-12 ${plan.popular ? 'bg-white/10' : 'bg-apple-ink/5'}`} />

              <ul className="space-y-6 mb-16 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? 'bg-apple-bg/10 text-apple-bg' : 'bg-apple-blue/10 text-apple-blue'}`}>
                      <Check size={14} />
                    </div>
                    <span className={`text-sm font-bold leading-tight ${plan.popular ? 'text-apple-bg/80' : 'text-apple-ink/70'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`apple-btn w-full py-6 text-lg group/btn ${
                plan.popular ? 'bg-apple-bg text-apple-ink hover:brightness-110' : 'apple-btn-primary'
              }`}>
                <span className="font-bold">{plan.cta}</span>
                <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Education Discount */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-apple-ink text-apple-bg rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-apple-blue/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 text-apple-blue mb-8">
              <Zap size={24} fill="currentColor" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Education Discount</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">Student or Educator?</h2>
            <p className="text-xl text-apple-bg/60 font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
              Get 50% off any paid plan. We support the next generation of thinkers and creators.
            </p>
            <a href="#" className="apple-btn bg-apple-bg text-apple-ink inline-flex px-14 py-7 text-xl group/btn shadow-2xl shadow-black/20">
              <span className="font-bold">Verify Status</span>
              <ArrowRight size={28} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
