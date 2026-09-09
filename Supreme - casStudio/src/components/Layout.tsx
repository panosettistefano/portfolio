import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Menu, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BoxLogo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`bg-supreme-red text-white px-2 py-1 inline-block futura-bold-oblique text-2xl ${className}`}>
    Supreme
  </Link>
);

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { cart, removeFromCart, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] border-l-4 border-black p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="futura-bold-oblique text-3xl">Cart</h2>
              <button onClick={onClose} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20 opacity-20">
                  <ShoppingCart size={80} className="mx-auto mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Your cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-black/5 pb-4">
                    <img src={item.image} className="w-20 h-20 object-cover border border-black/5" />
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase tracking-tight">{item.name}</p>
                      <p className="text-[10px] font-bold text-black/60 uppercase mt-1">Size: {item.size}</p>
                      <div className="flex justify-between items-end mt-2">
                        <p className="text-sm font-black">${item.price} x {item.quantity}</p>
                        <button 
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-[10px] font-black uppercase text-supreme-red hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-8 pt-8 border-t-4 border-black space-y-4">
                <div className="flex justify-between text-xl font-black uppercase">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-black text-white py-4 futura-bold-oblique text-xl hover:bg-supreme-red transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  const navItems = [
    { name: 'Shop', path: '/shop' },
    { name: 'Jackets', path: '/shop/jackets' },
    { name: 'Shirts', path: '/shop/shirts' },
    { name: 'Tees', path: '/shop/tees' },
    { name: 'News', path: '/news' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-1 hover:bg-black/5 rounded-sm transition-colors"
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
          <BoxLogo className="scale-90 origin-left" />
        </div>
        
        <nav className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest font-bold">
          {navItems.map(item => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`hover:underline transition-all ${location.pathname === item.path ? 'underline text-supreme-red' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative group p-1"
            aria-label="View Cart"
          >
            <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-supreme-red text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cart.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
          </button>
          <div className="hidden sm:block text-[11px] font-bold uppercase tracking-widest opacity-40">
            {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-[85%] max-w-sm bg-white z-[101] border-r-4 border-black p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <BoxLogo />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:rotate-90 transition-transform">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link 
                      to={item.path} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-2xl font-black uppercase tracking-tighter hover:text-supreme-red transition-colors ${location.pathname === item.path ? 'text-supreme-red' : ''}`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t border-black/10">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Supreme Core Engine v1.0</p>
                <div className="flex gap-4">
                  <span className="w-3 h-3 bg-supreme-red rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase">System Online</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-24">
        {children}
      </main>

      <footer className="border-t-4 border-black py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <BoxLogo className="scale-125" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-[10px] font-bold uppercase tracking-widest">
            <div className="space-y-4">
              <p className="opacity-40">Help</p>
              <a href="#" className="block hover:underline">Shipping</a>
              <a href="#" className="block hover:underline">Returns</a>
              <a href="#" className="block hover:underline">Contact</a>
            </div>
            <div className="space-y-4">
              <p className="opacity-40">Legal</p>
              <Link to="/privacy" className="block hover:underline">Privacy</Link>
              <Link to="/cookie" className="block hover:underline">Cookie Policy</Link>
              <a href="#" className="block hover:underline">Terms</a>
            </div>
            <div className="space-y-4">
              <p className="opacity-40">Social</p>
              <a href="#" className="block hover:underline">Instagram</a>
              <a href="#" className="block hover:underline">Twitter</a>
            </div>
            <div className="space-y-4">
              <p className="opacity-40">Newsletter</p>
              <div className="flex border-b border-black pb-1">
                <input type="email" placeholder="Email Address" className="bg-transparent outline-none w-full" />
                <button><ArrowRight size={14} /></button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-[9px] font-bold text-black/20 uppercase tracking-[0.5em] text-center mt-20">
          © 2026 Supreme Core. All Rights Reserved.
        </p>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};
