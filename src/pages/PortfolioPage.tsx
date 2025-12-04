import React, { useState } from 'react';
import { Play, ZoomIn, X } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioPageProps {
  setView: (view: string) => void;
}

const MOCK_PORTFOLIO: PortfolioItem[] = [
  // Frame by Frame (Simulated with static keyframes)
  { id: 'p1', title: 'The Running Wolf', category: 'FRAME_BY_FRAME', image: 'https://picsum.photos/seed/wolf/800/600', description: 'Ciclo de caminata animado a mano, 12 fps, estilo boceto tradicional.', client: 'Indie Game Studio' },
  { id: 'p2', title: 'Cyberpunk Chase', category: 'FRAME_BY_FRAME', image: 'https://picsum.photos/seed/cyber/800/600', description: 'Secuencia de acción de alta velocidad. Animación tradicional digital.', client: 'Music Video' },
  { id: 'p3', title: 'Liquid Morph', category: 'FRAME_BY_FRAME', image: 'https://picsum.photos/seed/liquid/800/600', description: 'Transformaciones fluidas abstractas frame a frame.', client: 'Personal Project' },
  { id: 'p4', title: 'Character Acting', category: 'FRAME_BY_FRAME', image: 'https://picsum.photos/seed/acting/800/600', description: 'Prueba de actuación de personaje y sincronización labial.', client: 'Short Film' },
  
  // Illustration
  { id: 'p5', title: 'Neon Cityscapes', category: 'ILLUSTRATION', image: 'https://picsum.photos/seed/neon/800/800', description: 'Arte conceptual ambiental para videojuego RPG.', client: 'Game Dev Co' },
  { id: 'p6', title: 'Fantasy Warrior', category: 'ILLUSTRATION', image: 'https://picsum.photos/seed/warrior/800/1000', description: 'Diseño de personaje completo con armadura detallada.', client: 'Book Cover' },
  { id: 'p7', title: 'Editorial Tech', category: 'ILLUSTRATION', image: 'https://picsum.photos/seed/tech/800/600', description: 'Ilustración isométrica para artículo de revista tecnológica.', client: 'Tech Weekly' },
  { id: 'p8', title: 'Album Cover Art', category: 'ILLUSTRATION', image: 'https://picsum.photos/seed/album/800/800', description: 'Arte surrealista para portada de álbum musical.', client: 'Band Release' },
];

const PortfolioPage: React.FC<PortfolioPageProps> = ({ setView }) => {
  const [filter, setFilter] = useState<'ALL' | 'FRAME_BY_FRAME' | 'ILLUSTRATION'>('ALL');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filteredItems = MOCK_PORTFOLIO.filter(item => {
    if (filter === 'ALL') return true;
    return item.category === filter;
  });

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-orbitron font-bold text-white mb-4">PORTFOLIO</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Una selección de nuestros mejores trabajos en animación e ilustración.</p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <button 
          onClick={() => setFilter('ALL')}
          className={`px-6 py-2 rounded-full border transition-all ${filter === 'ALL' ? 'bg-primary border-primary text-white' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
        >
          Todos
        </button>
        <button 
          onClick={() => setFilter('FRAME_BY_FRAME')}
          className={`px-6 py-2 rounded-full border transition-all ${filter === 'FRAME_BY_FRAME' ? 'bg-primary border-primary text-white' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
        >
          Animación Frame-by-Frame
        </button>
        <button 
          onClick={() => setFilter('ILLUSTRATION')}
          className={`px-6 py-2 rounded-full border transition-all ${filter === 'ILLUSTRATION' ? 'bg-primary border-primary text-white' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
        >
          Ilustración Digital
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-surface aspect-square"
            onClick={() => setLightboxItem(item)}
          >
            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
              <h4 className="font-bold text-white text-lg mb-1">{item.title}</h4>
              <p className="text-primary text-xs uppercase tracking-wider mb-3">
                {item.category === 'FRAME_BY_FRAME' ? 'Animación' : 'Ilustración'}
              </p>
              <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
                <ZoomIn className="text-white" size={20} />
              </div>
            </div>
            {item.category === 'FRAME_BY_FRAME' && (
              <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full backdrop-blur-sm">
                <Play className="text-white w-4 h-4 fill-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLightboxItem(null)}>
          <div className="max-w-5xl w-full bg-surface border border-slate-700 rounded-2xl overflow-hidden relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-primary transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 bg-black flex items-center justify-center min-h-[400px] md:min-h-[600px]">
                <img src={lightboxItem.image} alt={lightboxItem.title} className="max-w-full max-h-[80vh] object-contain" />
              </div>
              <div className="md:w-1/3 p-8 flex flex-col justify-center">
                <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2">
                  {lightboxItem.category === 'FRAME_BY_FRAME' ? 'Animación Frame-by-Frame' : 'Ilustración Digital'}
                </span>
                <h3 className="text-3xl font-orbitron font-bold text-white mb-4">{lightboxItem.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {lightboxItem.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-800">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Cliente</p>
                  <p className="text-white font-medium">{lightboxItem.client}</p>
                </div>

                <button 
                  onClick={() => {
                    setLightboxItem(null);
                    const el = document.getElementById('custom-request');
                    if (el) {
                      setView('SERVICES');
                      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
                    } else {
                      setView('SERVICES');
                    }
                  }}
                  className="mt-8 w-full bg-slate-800 hover:bg-primary text-white py-3 rounded transition-colors font-bold text-sm"
                >
                  SOLICITAR ALGO SIMILAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;