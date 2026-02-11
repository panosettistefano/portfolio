import React from 'react';
import { Menu, Bell, User, Hexagon } from 'lucide-react';

const Navbar = ({ activePage, setActivePage, toggleMobileMenu }) => {
  
  // Lista dei link per il menu Desktop
  const navLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'market', label: 'Market' },
    { id: 'wallet', label: 'Wallet' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050607]/80 backdrop-blur-md border-b border-white/5 h-20 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('dashboard')}>
           <div className="relative group">
              <div className="absolute inset-0 bg-amber-500/20 blur-lg rounded-full animate-pulse"></div>
              <Hexagon className="text-amber-500 relative z-10" strokeWidth={2} />
           </div>
           <span className="text-2xl font-bold tracking-[0.2em] text-white">DÓJA</span>
        </div>

        {/* DESKTOP MENU (Visibile solo su schermi grandi) */}
        <div className="hidden lg:flex items-center gap-8 bg-white/5 px-8 py-3 rounded-full border border-white/5">
           {navLinks.map((link) => (
             <button
               key={link.id}
               onClick={() => setActivePage(link.id)}
               className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative
                 ${activePage === link.id ? 'text-amber-500' : 'text-gray-400 hover:text-white'}
               `}
             >
               {link.label}
               {/* Puntino luminoso sotto la voce attiva */}
               {activePage === link.id && (
                 <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full shadow-[0_0_10px_#EF9B0F]"></span>
               )}
             </button>
           ))}
        </div>

        {/* AZIONI DESTRA (Notifiche e Utente) */}
        <div className="hidden lg:flex items-center gap-6">
           <button className="relative text-gray-400 hover:text-amber-500 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
           </button>
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 p-[1px]">
              <div className="w-full h-full rounded-full bg-[#050607] flex items-center justify-center text-amber-500 font-bold">
                 JS
              </div>
           </div>
        </div>

        {/* HAMBURGER BUTTON (Visibile solo su Mobile) */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-white hover:text-amber-500 transition-colors"
        >
          <Menu size={28} />
        </button>

      </div>
    </nav>
  );
};

export default Navbar;