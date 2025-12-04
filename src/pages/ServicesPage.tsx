import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Service, ServiceCategory, User, Order } from '../types';
import CustomServiceSection from '../components/CustomServiceSection';

interface ServicesPageProps {
  services: Service[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToCart: (service: Service) => void;
  currentUser: User | null;
  notify: (message: string, type?: 'success' | 'error' | 'info') => void;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setView: (view: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  searchQuery,
  setSearchQuery,
  addToCart,
  currentUser,
  notify,
  setOrders,
  setView,
}) => {
  const categories: ServiceCategory[] = ['ILUSTRACIÓN DIGITAL', 'ANIMACIÓN 2D', 'ANIMACIÓN 3D', 'MOTION GRAPHICS', 'CHARACTER DESIGN', 'STORYBOARDS'];
  const filteredServices = services.filter(s => 
    s.active && 
    (s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     s.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-orbitron font-bold mb-4 text-white">NUESTROS SERVICIOS</h2>
        <div className="max-w-xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Buscar servicio..." 
            className="w-full bg-surface border border-slate-700 rounded-full py-3 px-12 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
        </div>
      </div>

      {categories.map(cat => {
        const catServices = filteredServices.filter(s => s.category === cat);
        if (catServices.length === 0) return null;
        return (
          <div key={cat} className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-secondary rounded-sm"></span>
              {cat}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {catServices.map(service => (
                <div key={service.id} className="bg-surface border border-slate-800 rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(70,130,180,0.15)] transition-all group">
                  <div className="h-48 overflow-hidden relative">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white">
                      {service.deliveryTime}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2">{service.name}</h4>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{service.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.variations.map(v => (
                        <span key={v} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">{v}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-white">
                        <span className="text-2xl font-bold text-primary">${service.price}</span>
                        <span className="text-xs text-slate-500 ml-1">/{service.unit}</span>
                      </div>
                      <button 
                        onClick={() => addToCart(service)}
                        className="bg-slate-700 hover:bg-white hover:text-black text-white p-2 rounded-full transition-all"
                      >
                        <Plus size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      
      <CustomServiceSection 
        currentUser={currentUser} 
        notify={notify} 
        setOrders={setOrders} 
      />
    </div>
  );
};

export default ServicesPage;