import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, AlertCircle, LogIn, UserPlus, Zap, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const Auth: React.FC = () => {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { loginWithEmail, registerWithEmail, login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      setError('Inserisci un indirizzo email valido.');
      return;
    }

    if (password.length < 6) {
      setError('La password deve avere almeno 6 caratteri.');
      return;
    }

    if (!isLogin && name.trim().length < 2) {
      setError('Inserisci un nome valido.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, name);
      }
      navigate('/');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Email o password non corretti.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Questa email è già registrata.');
      } else {
        setError('Si è verificato un errore. Riprova più tardi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await login();
      navigate('/');
    } catch (err) {
      setError('Errore durante l\'accesso con Google.');
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-32 flex items-center justify-center px-6 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 opacity-10 pointer-events-none grid-pattern" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full relative z-10"
      >
        <div className="apple-card bg-apple-bg shadow-2xl shadow-black/10 p-12 md:p-16">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 bg-apple-blue rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-apple-blue/20"
            >
              <Zap size={40} className="text-white" fill="currentColor" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-apple-ink">
              {isLogin ? t('auth.welcome') : t('auth.signUp')}
            </h1>
            <p className="text-lg text-apple-gray font-medium leading-relaxed max-w-sm mx-auto">
              {isLogin 
                ? t('auth.subtitle') 
                : t('hero.description')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <label className="text-[10px] font-bold text-apple-gray/60 uppercase tracking-[0.2em] ml-4">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-apple-gray/50" size={20} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Mario Rossi"
                      className="apple-input w-full pl-16 pr-6 py-5"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-apple-gray/60 uppercase tracking-[0.2em] ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-apple-gray/50" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mario@esempio.it"
                  className="apple-input w-full pl-16 pr-6 py-5"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-apple-gray/60 uppercase tracking-[0.2em] ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-apple-gray/50" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="apple-input w-full pl-16 pr-6 py-5"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 p-6 bg-red-500/10 text-red-500 rounded-3xl border border-red-500/20"
              >
                <AlertCircle size={20} className="shrink-0" />
                <span className="text-sm font-bold uppercase tracking-tight">{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="apple-btn apple-btn-primary w-full py-6 text-xl group/btn"
            >
              {loading ? (
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="font-bold">{isLogin ? t('nav.signIn') : t('auth.signUp')}</span>
                  <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          <div className="mt-16">
            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-apple-ink/10"></div>
              </div>
              <div className="relative flex justify-center text-[10px]">
                <span className="px-6 bg-apple-bg text-apple-gray/50 font-bold uppercase tracking-[0.3em]">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="apple-btn apple-btn-outline w-full py-5 group"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span className="text-base font-bold">Google Account</span>
            </button>
          </div>

          <div className="mt-16 pt-12 border-t border-apple-ink/10 text-center">
            <p className="text-sm text-apple-gray/60 font-bold uppercase tracking-widest">
              {isLogin ? t('auth.noAccount') : t('auth.welcome')}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-4 text-apple-blue hover:underline font-bold"
              >
                {isLogin ? t('auth.signUp') : t('nav.signIn')}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
