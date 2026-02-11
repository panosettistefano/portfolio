import React, { useState } from 'react';
import { Moon, Globe, Wallet, Bell, ChevronRight, RefreshCw } from 'lucide-react';

const Settings = () => {
  // Stati finti per la UI (in futuro li collegheremo alla memoria)
  const [currency, setCurrency] = useState('EUR');
  const [lang, setLang] = useState('IT');
  const [notif, setNotif] = useState(true);

  return (
    <div className="p-6 lg:p-10 animate-fade-in max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Impostazioni</h1>
        <p className="text-gray-400">Preferenze sistema e configurazione terminale.</p>
      </div>

      {/* Sezione Preferenze Generali */}
      <div className="glass-card rounded-2xl p-1 overflow-hidden">
        
        {/* Lingua */}
        <div className="p-6 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500/10 text-blue-400"><Globe size={24} /></div>
                <div>
                    <div className="text-white font-bold">Lingua Sistema</div>
                    <div className="text-xs text-gray-500">Seleziona la lingua dell'interfaccia</div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button onClick={() => setLang('IT')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${lang === 'IT' ? 'bg-amber-500 text-black' : 'bg-white/10 text-gray-400'}`}>IT</button>
                <button onClick={() => setLang('EN')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${lang === 'EN' ? 'bg-amber-500 text-black' : 'bg-white/10 text-gray-400'}`}>EN</button>
            </div>
        </div>

        {/* Valuta */}
        <div className="p-6 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-500/10 text-green-400"><Wallet size={24} /></div>
                <div>
                    <div className="text-white font-bold">Valuta Principale</div>
                    <div className="text-xs text-gray-500">Valuta di riferimento per il portfolio</div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button onClick={() => setCurrency('EUR')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${currency === 'EUR' ? 'bg-amber-500 text-black' : 'bg-white/10 text-gray-400'}`}>EUR</button>
                <button onClick={() => setCurrency('USD')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${currency === 'USD' ? 'bg-amber-500 text-black' : 'bg-white/10 text-gray-400'}`}>USD</button>
            </div>
        </div>

        {/* Tema (Solo visuale per ora) */}
        <div className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-500/10 text-purple-400"><Moon size={24} /></div>
                <div>
                    <div className="text-white font-bold">Tema Interfaccia</div>
                    <div className="text-xs text-gray-500">Attualmente bloccato su 'Obsidian Dark'</div>
                </div>
            </div>
            <div className="px-3 py-1 rounded-lg bg-white/5 text-gray-500 text-xs font-mono">LOCKED</div>
        </div>
      </div>

      {/* Sezione Sistema */}
      <div className="glass-card rounded-2xl p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-500/10 text-amber-500"><RefreshCw size={24} /></div>
            <div>
                <div className="text-white font-bold">Versione Sistema</div>
                <div className="text-xs text-gray-500">Doja v2.0.4 (React Core)</div>
            </div>
        </div>
        <button className="text-xs text-amber-500 uppercase tracking-widest hover:text-white transition-colors">Check Updates</button>
      </div>

    </div>
  );
};

export default Settings;