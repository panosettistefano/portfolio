import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ShieldCheck, Plus, X, Save } from 'lucide-react';

const Portfolio = () => {
  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  // Stato per il form di aggiunta
  const [newAsset, setNewAsset] = useState({
      artist: '', title: '', price: '', year: '', status: 'In Vault', img: '', description: ''
  });

  // Funzione per caricare i dati
  const fetchAssets = () => {
    fetch('http://localhost:3000/api/portfolio')
      .then(res => res.json())
      .then(data => setAssets(data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchAssets(); }, []);

  // Funzione per salvare
  const handleSave = (e) => {
      e.preventDefault();
      fetch('http://localhost:3000/api/assets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAsset)
      }).then(() => {
          setShowModal(false);
          fetchAssets(); // Ricarica la lista
          setNewAsset({ artist: '', title: '', price: '', year: '', status: 'In Vault', img: '', description: '' }); // Reset
      });
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-fade-in relative">
      
      {/* Header con Bottone Aggiungi */}
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">Portfolio & Assets</h2>
            <p className="text-gray-400">Collezione privata e valorizzazione asset.</p>
        </div>
        <button 
            onClick={() => setShowModal(true)}
            className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(239,155,15,0.3)]"
        >
            <Plus size={20} /> <span className="hidden md:inline">Aggiungi Opera</span>
        </button>
      </div>

      {/* Griglia Assets */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(239,155,15,0.15)]">
            <div className="h-64 overflow-hidden relative">
                <img src={asset.img} alt={asset.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-amber-500" />
                    <span className="text-xs font-bold text-white tracking-wider uppercase">{asset.status}</span>
                </div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-1">{asset.artist}</div>
                        <h3 className="text-2xl font-bold text-white leading-tight">{asset.title}</h3>
                    </div>
                    <span className="text-gray-500 font-mono text-sm">{asset.year}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Valore Stimato</div>
                        <div className="text-xl font-mono text-white font-bold">
                          € {Number(asset.price).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all cursor-pointer">
                        <ArrowUpRight size={20} />
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DI AGGIUNTA (Finestra a comparsa) */}
      {showModal && (
          <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#0A0B0D] border border-white/10 w-full max-w-lg rounded-2xl p-8 relative animate-fade-in shadow-2xl">
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X /></button>
                  
                  <h3 className="text-2xl font-bold mb-6 text-amber-500">Nuova Acquisizione</h3>
                  
                  <form onSubmit={handleSave} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="Artista" className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 outline-none" 
                            onChange={e => setNewAsset({...newAsset, artist: e.target.value})} required />
                          <input type="text" placeholder="Titolo Opera" className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 outline-none" 
                            onChange={e => setNewAsset({...newAsset, title: e.target.value})} required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <input type="number" placeholder="Prezzo (€)" className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 outline-none" 
                            onChange={e => setNewAsset({...newAsset, price: e.target.value})} required />
                          <input type="text" placeholder="Anno" className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 outline-none" 
                            onChange={e => setNewAsset({...newAsset, year: e.target.value})} />
                      </div>
                      <input type="text" placeholder="URL Immagine" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 outline-none" 
                            onChange={e => setNewAsset({...newAsset, img: e.target.value})} />
                      
                      <textarea placeholder="Descrizione breve..." className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 outline-none h-24"
                            onChange={e => setNewAsset({...newAsset, description: e.target.value})}></textarea>

                      <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 mt-4">
                          <Save size={20} /> Salva nel Database
                      </button>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default Portfolio;