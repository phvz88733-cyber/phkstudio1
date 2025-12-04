import React, { useState, useRef } from 'react';
import { Upload, Shield } from 'lucide-react';
import { User, CartItem, Order } from '../types';

interface CheckoutPageProps {
  currentUser: User | null;
  cart: CartItem[];
  notify: (message: string, type?: 'success' | 'error' | 'info') => void;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setIsLoginOpen: (isOpen: boolean) => void;
  setView: (view: string) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  currentUser,
  cart,
  notify,
  setOrders,
  setCart,
  setIsLoginOpen,
  setView,
}) => {
  const [step, setStep] = useState(1); // Not used for visual steps, but could be for validation
  const [formData, setFormData] = useState({
    name: currentUser?.first_name || currentUser?.email.split('@')[0] || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    style: 'Realista',
    software: [],
    budget: '$100-500',
    specs: '',
    paymentMethod: 'credit_card'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<string[]>([]);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => f.name);
      setFiles(prev => [...prev, ...newFiles].slice(0, 3));
    }
  };

  const submitOrder = () => {
    if (!currentUser) {
      notify('Debes iniciar sesión para completar el pedido', 'error');
      setIsLoginOpen(true);
      return;
    }

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      userId: currentUser.id,
      userEmail: formData.email,
      userName: formData.name,
      date: new Date().toISOString(),
      items: [...cart],
      total,
      status: 'pending',
      priority: 'normal',
      specifications: {
        style: formData.style,
        software: [], // Simplified for demo
        description: formData.specs,
        budgetRange: formData.budget,
        files
      }
    };

    const existingOrders = JSON.parse(localStorage.getItem('phk_orders') || '[]');
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem('phk_orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setCart([]);
    notify('¡Pedido enviado con éxito!', 'success');
    setView('PROFILE');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-orbitron font-bold mb-8 text-white border-b border-slate-700 pb-4">CHECKOUT</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Contact Info */}
          <div className="bg-surface p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Datos de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nombre Completo" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-dark border border-slate-700 p-3 rounded text-white" />
              <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-dark border border-slate-700 p-3 rounded text-white" />
              <input type="tel" placeholder="Teléfono (Opcional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-dark border border-slate-700 p-3 rounded text-white" />
            </div>
          </div>

          {/* Step 2: Project Specs */}
          <div className="bg-surface p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Especificaciones del Proyecto
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <select className="bg-dark border border-slate-700 p-3 rounded text-white" value={formData.style} onChange={e => setFormData({...formData, style: e.target.value})}>
                   <option>Realista</option>
                   <option>Cartoon</option>
                   <option>Anime</option>
                   <option>Low Poly</option>
                 </select>
                 <select className="bg-dark border border-slate-700 p-3 rounded text-white" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
                   <option>$100 - $500</option>
                   <option>$500 - $1000</option>
                   <option>$1000+</option>
                   <option>Presupuesto Personalizado</option>
                 </select>
              </div>
              <textarea 
                placeholder="Describe tu proyecto en detalle..." 
                className="w-full bg-dark border border-slate-700 p-3 rounded text-white h-32"
                value={formData.specs}
                onChange={e => setFormData({...formData, specs: e.target.value})}
              ></textarea>
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mx-auto mb-2 text-slate-400" />
                <p className="text-sm text-slate-400">Arrastra archivos o haz clic para subir referencias</p>
                <p className="text-xs text-slate-600 mt-1">(Máx 3 archivos, JPG/PNG/PDF)</p>
                <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />
              </div>
              {files.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {files.map((f, i) => <span key={i} className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">{f}</span>)}
                </div>
              )}
            </div>
          </div>

           {/* Step 3: Payment */}
           <div className="bg-surface p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Método de Pago (Simulado)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setFormData({...formData, paymentMethod: 'credit_card'})}
                className={`p-4 rounded border ${formData.paymentMethod === 'credit_card' ? 'border-primary bg-primary/10' : 'border-slate-700 hover:border-slate-500'}`}
              >
                Tarjeta Crédito/Débito
              </button>
              <button 
                onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                className={`p-4 rounded border ${formData.paymentMethod === 'paypal' ? 'border-primary bg-primary/10' : 'border-slate-700 hover:border-slate-500'}`}
              >
                PayPal
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-surface p-6 rounded-xl border border-slate-800 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Resumen</h3>
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto custom-scrollbar">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-slate-300">{item.quantity}x {item.serviceName}</span>
                  <span className="font-medium">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-700 pt-4 flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span className="text-primary">${total}</span>
            </div>
            <button 
              onClick={submitOrder}
              className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-4 rounded shadow-lg transform transition-all hover:scale-[1.02]"
            >
              CONFIRMAR PEDIDO
            </button>
            <p className="text-xs text-center text-slate-500 mt-4">
              <Shield size={12} className="inline mr-1" />
              Pago 100% Seguro y Encriptado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;