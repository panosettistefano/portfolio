import React, { useState } from 'react';
import Navbar from './components/Navbar';        // <--- La barra in alto
import MobileMenu from './components/MobileMenu'; // <--- Il menu a scomparsa
import Portfolio from './components/Portfolio';
import Cursor from './components/Cursor';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!isLoggedIn) {
    return (
      <>
        <Cursor />
        <Login onLogin={() => setIsLoggedIn(true)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#050607] text-white font-sans selection:bg-amber-500/30">
      
      <Cursor />

      {/* 1. NAVBAR FISSA IN ALTO (Desktop & Mobile Header) */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        toggleMobileMenu={() => setIsMobileMenuOpen(true)} 
      />

      {/* 2. MENU MOBILE (A scomparsa) */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* 3. CONTENUTO PRINCIPALE */}
      {/* Nota: pt-24 serve per non finire sotto la navbar fissa */}
      <main className="pt-24 min-h-screen w-full max-w-[1600px] mx-auto transition-all duration-300">
        
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'portfolio' && <Portfolio />}
        {activePage === 'settings' && <Settings />}

        {/* Pagine Placeholder */}
        {['market', 'wallet'].includes(activePage) && (
           <div className="p-10 text-center mt-20">
             <h1 className="text-4xl font-bold text-white mb-4 capitalize opacity-50">{activePage}</h1>
             <p className="text-gray-500">Funzionalità in arrivo.</p>
           </div>
        )}

      </main>
    </div>
  );
}

export default App;