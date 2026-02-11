import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { TrendingUp, Wallet, Crown } from 'lucide-react'; // Icone per abbellire

const Dashboard = () => {
  // Stato per i dati REALI dal database
  const [stats, setStats] = useState({
    totalValue: 0,
    totalCount: 0,
    topAsset: 'N/A'
  });

  // Stato per il caricamento
  const [loading, setLoading] = useState(true);

  // 1. SCARICHIAMO I DATI VERI DAL SERVER
  useEffect(() => {
    fetch('http://localhost:3000/api/portfolio')
      .then(res => res.json())
      .then(data => {
        // Calcoliamo la somma totale dei prezzi
        const total = data.reduce((acc, curr) => acc + Number(curr.price), 0);
        
        // Troviamo l'opera più costosa (Top Asset)
        const mostExpensive = data.sort((a, b) => b.price - a.price)[0];

        setStats({
          totalValue: total,
          totalCount: data.length,
          topAsset: mostExpensive ? mostExpensive.title : 'Nessuna Opera'
        });
        setLoading(false);
      })
      .catch(err => console.error("Errore fetch dashboard:", err));
  }, []);

  // 2. CONFIGURAZIONE GRAFICO (Simuliamo l'andamento storico basato sul valore attuale)
  // Nel tuo HTML era statico, qui lo rendiamo dinamico visivamente
  const chartData = {
    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
    datasets: [{
      label: 'Valore Portfolio',
      // Creiamo una curva finta che finisce col valore REALE attuale
      data: [
        stats.totalValue * 0.85, 
        stats.totalValue * 0.88, 
        stats.totalValue * 0.82, 
        stats.totalValue * 0.95, 
        stats.totalValue * 0.98, 
        stats.totalValue
      ],
      borderColor: '#EF9B0F',
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(239, 155, 15, 0.2)');
        gradient.addColorStop(1, 'rgba(239, 155, 15, 0)');
        return gradient;
      },
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#050607',
      pointBorderColor: '#EF9B0F',
      pointBorderWidth: 2,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666' } }
    },
    interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
    }
  };

  // Funzione per formattare i soldi (Es. 1.200,00 €)
  const formatMoney = (amount) => {
    return Number(amount).toLocaleString('it-IT', { minimumFractionDigits: 2 });
  };

  return (
    <div className="p-6 lg:p-10 animate-fade-in space-y-8">
      
      {/* HEADER: Titolo e Valore Totale Gigante */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
         <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-white">Institutional Dashboard</h1>
            <p className="text-gray-400">Panoramica asset e performance in tempo reale.</p>
         </div>
         
         <div className="text-right glass-card p-4 rounded-xl border-amber-500/20 bg-amber-500/5 min-w-[250px]">
            <div className="text-xs text-amber-500 font-bold uppercase tracking-widest mb-1">NET ASSET VALUE</div>
            {loading ? (
                <div className="h-10 w-32 bg-gray-700/50 animate-pulse rounded ml-auto"></div>
            ) : (
                <div className="text-3xl lg:text-4xl font-bold font-mono text-white">
                    € {formatMoney(stats.totalValue)}
                </div>
            )}
         </div>
      </div>

      {/* GRAFICO */}
      <div className="glass-card p-6 rounded-2xl h-80 w-full relative border-t border-white/10 shadow-lg">
         <Line data={chartData} options={chartOptions} />
      </div>

      {/* CARDS STATISTICHE (Ora collegate al DB) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
         {/* Totale Assets */}
         <div className="glass-card p-6 rounded-2xl hover:border-amber-500/30 transition-all hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="text-gray-400 text-xs uppercase tracking-wider">Total Assets</div>
                <Wallet className="text-amber-500" size={20} />
            </div>
            <div className="text-4xl font-bold text-white font-mono">{stats.totalCount}</div>
            <div className="text-xs text-gray-500 mt-2">Opere in caveau</div>
         </div>

         {/* Rendimento (Calcolato finto per ora, ma realistico) */}
         <div className="glass-card p-6 rounded-2xl hover:border-green-500/30 transition-all hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="text-gray-400 text-xs uppercase tracking-wider">Yearly Return</div>
                <TrendingUp className="text-green-500" size={20} />
            </div>
            <div className="text-4xl font-bold text-green-400 font-mono">+18.5%</div>
            <div className="text-xs text-gray-500 mt-2">Performance stimata</div>
         </div>

         {/* Top Asset (Vero dal DB) */}
         <div className="glass-card p-6 rounded-2xl hover:border-purple-500/30 transition-all hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="text-gray-400 text-xs uppercase tracking-wider">Top Asset</div>
                <Crown className="text-purple-500" size={20} />
            </div>
            <div className="text-xl font-bold text-white truncate font-mono" title={stats.topAsset}>
                {stats.topAsset}
            </div>
            <div className="text-xs text-gray-500 mt-2">Opera di maggior valore</div>
         </div>

      </div>
    </div>
  );
};

export default Dashboard;