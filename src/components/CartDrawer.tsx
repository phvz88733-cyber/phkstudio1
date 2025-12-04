import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem, Service } from '../types';

interface CartDrawerProps {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  removeFromCart: (id: string) => void;
  setView: (view: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isCartOpen,
  setIsCartOpen,
  cart,
  setCart,
  removeFromCart,
  setView,
}) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {isCartOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsCartOpen(false)} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-slate-800 z-50 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-darker">
            <h2 className="text-xl font-orbitron font-bold flex items-center gap-2"><ShoppingCart size={20}/> TU CARRITO</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white"><X size={24}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
                <p>Tu carrito está vacío</p>
                <button onClick={() => { setIsCartOpen(false); setView('SERVICES'); }} className="mt-4 text-primary hover:underline">Ver Servicios</button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="bg-dark p-4 rounded-lg flex justify-between items-center border border-slate-800">
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.serviceName}</h4>
                    <p className="text-primary font-mono text-sm">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-surface rounded border border-slate-700">
                      <button className="px-2 py-1 hover:bg-white/10" onClick={() => {
                        const newCart = [...cart];
                        if (newCart[idx].quantity > 1) {
                          newCart[idx].quantity--;
                          setCart(newCart);
                        } else {
                          removeFromCart(item.serviceId);
                        }
                      }}><Minus size={14}/></button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button className="px-2 py-1 hover:bg-white/10" onClick={() => {
                         const newCart = [...cart];
                         newCart[idx].quantity++;
                         setCart(newCart);
                      }}><Plus size={14}/></button>
                    </div>
                    <button onClick={() => removeFromCart(item.serviceId)} className="text-red-500 hover:text-red-400"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 bg-darker border-t border-slate-800">
              <div className="flex justify-between mb-6 text-xl font-bold">
                <span>Total Estimado:</span>
                <span className="text-primary">${total}</span>
              </div>
              <button 
                onClick={() => { setIsCartOpen(false); setView('CHECKOUT'); }}
                className="w-full bg-secondary hover:bg-red-700 text-white font-bold py-3 rounded transition-colors"
              >
                PROCESAR PAGO
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;