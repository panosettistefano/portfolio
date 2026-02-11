import React, { useState } from 'react';
import { Hexagon, ArrowRight, Lock } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simuliamo un caricamento per l'effetto scenico
    setTimeout(() => {
      onLogin(); // Entra nell'app
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050607] flex items-center justify-center p-4">
      {/* Sfondo decorativo */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 relative z-10 animate-fade-in">
        
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="relative group">
             <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse"></div>
             <Hexagon className="text-amber-500 relative z-10" size={64} strokeWidth={1.5} />
          </div>
        </div>

        {/* Card di Login */}
        <div className="glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-center mb-1">Welcome Back</h2>
            <p className="text-center text-gray-400 mb-8 text-sm">Accesso al terminale istituzionale</p>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Codice Accesso</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                        <input 
                          type="password" 
                          placeholder="••••••••" 
                          className="w-full bg-[#0A0B0D] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-mono"
                          required
                        />
                    </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <span className="animate-pulse">Autenticazione...</span>
                    ) : (
                        <>Entra nel Caveau <ArrowRight size={20} /></>
                    )}
                </button>
            </form>
        </div>
        
        <p className="text-center text-gray-600 text-xs mt-8">
            DÓJA &copy; 2024 Institutional Art & Finance. <br/>Protected by Quantum Encryption.
        </p>
      </div>
    </div>
  );
};

export default Login;