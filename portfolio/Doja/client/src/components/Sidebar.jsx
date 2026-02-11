import React from 'react';
import { LayoutDashboard, PieChart, BarChart3, Wallet, Settings, LogOut, Hexagon } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
  // Lista dei bottoni del menu
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <PieChart size={20} /> },
    { id: 'market',    label: 'Market',    icon: <BarChart3 size={20} /> },
    { id: 'wallet',    label: 'Wallet',    icon: <Wallet size={20} /> },
    { id: 'settings',  label: 'Settings',  icon: <Settings size={20} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-[#0A0B0D]/80 backdrop-blur-xl border-r border-white/5 flex flex-col transition-all duration-300 z-50">
      
      {/* LOGO DOJA */}
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/5">
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Hexagon className="text-amber-500 relative z-10" size={32} />
        </div>
        <span className="hidden lg:block ml-4 font-bold text-xl tracking-widest text-white">
          DÓJA
        </span>
      </div>

      {/* LISTA MENU */}
      <nav className="flex-1 py-8 flex flex-col gap-2 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`
              w-full flex items-center justify-center lg:justify-start gap-4 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden
              ${activePage === item.id 
                ? 'bg-gradient-to-r from-amber-500/20 to-transparent text-amber-500 border border-amber-500/10' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'}
            `}
          >
            <div className="relative z-10">{item.icon}</div>
            <span className="hidden lg:block font-medium relative z-10">{item.label}</span>
            
            {/* Barra luminosa laterale se attivo */}
            {activePage === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
            )}
          </button>
        ))}
      </nav>

      {/* TASTO LOGOUT */}
      <div className="p-4 border-t border-white/5">
        <button className="w-full flex items-center justify-center lg:justify-start gap-4 p-3 rounded-xl text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer">
          <LogOut size={20} />
          <span className="hidden lg:block font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;