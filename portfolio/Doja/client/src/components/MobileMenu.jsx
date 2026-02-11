import React from 'react';
import { X, LayoutDashboard, Briefcase, TrendingUp, Wallet, Settings, LogOut } from 'lucide-react';

const MobileMenu = ({ isOpen, onClose, activePage, setActivePage }) => {
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'market', label: 'Market', icon: TrendingUp },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Overlay Sfondo Scuro */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Menu Laterale */}
      <div className={`
        fixed top-0 left-0 w-[280px] h-full bg-[#0A0B0D] z-[70] border-r border-white/10 flex flex-col
        transform transition-transform duration-300 lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Header Menu */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
            <span className="text-xl font-bold tracking-widest text-white">MENU</span>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
            </button>
        </div>

        {/* Link */}
        <div className="flex-1 py-6 px-4 space-y-2">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => { setActivePage(item.id); onClose(); }}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300
                        ${isActive 
                            ? 'bg-amber-500 text-black font-bold shadow-[0_0_20px_rgba(239,155,15,0.3)]' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                        `}
                    >
                        <Icon size={20} />
                        <span className="uppercase tracking-wider text-sm">{item.label}</span>
                    </button>
                )
            })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5">
            <button className="w-full flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors px-4 py-2">
                <LogOut size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">Logout</span>
            </button>
        </div>

      </div>
    </>
  );
};

export default MobileMenu;