import React from 'react';
import { ShoppingCart, User as UserIcon, LogIn, Settings, LogOut } from 'lucide-react';
import { User, CartItem } from '../types';

interface NavbarProps {
  view: string;
  setView: (view: string) => void;
  currentUser: User | null;
  loadingAuth: boolean;
  cart: CartItem[];
  setIsCartOpen: (isOpen: boolean) => void;
  setIsLoginOpen: (isOpen: boolean) => void;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  view,
  setView,
  currentUser,
  loadingAuth,
  cart,
  setIsCartOpen,
  setIsLoginOpen,
  logout,
}) => (
  <nav className="sticky top-0 z-40 bg-dark/80 backdrop-blur-lg border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center cursor-pointer" onClick={() => setView('HOME')}>
          <div className="text-2xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
            PHK<span className="text-secondary">Studio</span>
          </div>
        </div>
        
        <div className="hidden md:block">
          <div className="flex items-baseline space-x-8 font-medium text-sm">
            <button onClick={() => setView('HOME')} className={`hover:text-primary transition-colors uppercase tracking-widest ${view === 'HOME' ? 'text-primary' : 'text-slate-300'}`}>Inicio</button>
            <button onClick={() => setView('SERVICES')} className={`hover:text-primary transition-colors uppercase tracking-widest ${view === 'SERVICES' ? 'text-primary' : 'text-slate-300'}`}>Servicios</button>
            <button onClick={() => setView('PORTFOLIO')} className={`hover:text-primary transition-colors uppercase tracking-widest ${view === 'PORTFOLIO' ? 'text-primary' : 'text-slate-300'}`}>Portfolio</button>
            <button onClick={() => {
              const el = document.getElementById('contact-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-slate-300 hover:text-primary transition-colors uppercase tracking-widest">Contacto</button>
            
            {currentUser?.role === 'admin' && (
              <button onClick={() => setView('ADMIN')} className="text-secondary hover:text-red-400 uppercase tracking-widest">Dashboard</button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-slate-300 hover:text-white relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
          
          {loadingAuth ? (
            <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse"></div> // Loading spinner
          ) : currentUser ? (
            <div className="relative group">
              <button onClick={() => setView('PROFILE')} className="flex items-center gap-2 text-slate-300 hover:text-white">
                <UserIcon size={24} />
                <span className="hidden md:inline">{currentUser.first_name || currentUser.email.split('@')[0]}</span>
              </button>
            </div>
          ) : (
            <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 text-primary hover:text-blue-300">
              <LogIn size={20} />
              <span className="hidden md:inline font-bold">LOGIN</span>
            </button>
          )}
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;