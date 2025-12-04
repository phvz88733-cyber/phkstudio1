import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  setView: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  const [slide, setSlide] = useState(0);
  const slides = [
    { title: "ANIMACIÓN 3D PROFESIONAL", subtitle: "Dale vida a tus ideas con la última tecnología", bg: "from-slate-900 to-blue-900", img: "https://picsum.photos/seed/hero1/1920/1080" },
    { title: "ILUSTRACIÓN DE IMPACTO", subtitle: "Arte conceptual y diseño de personajes únicos", bg: "from-slate-900 to-red-900", img: "https://picsum.photos/seed/hero2/1920/1080" },
    { title: "NUEVOS SERVICIOS 2025", subtitle: "Motion Graphics para llevar tu marca al siguiente nivel", bg: "from-slate-900 to-purple-900", img: "https://picsum.photos/seed/hero3/1920/1080" }
  ];

  useEffect(() => {
    const interval = setInterval(() => setSlide(s => (s + 1) % slides.length), 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img src={s.img} className="w-full h-full object-cover" alt="Banner" />
          <div className={`absolute inset-0 bg-gradient-to-r ${s.bg} opacity-60 mix-blend-multiply`} />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6 tracking-tighter drop-shadow-[0_0_15px_rgba(70,130,180,0.5)]">
                {s.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 mb-10 font-light tracking-wide">{s.subtitle}</p>
              <div className="flex gap-4 justify-center">
                <button onClick={() => setView('SERVICES')} className="px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded shadow-[0_0_20px_rgba(70,130,180,0.4)] transition-all transform hover:scale-105 flex items-center gap-2">
                  VER SERVICIOS <ArrowRight size={20} />
                </button>
                <button onClick={() => {
                  const el = document.getElementById('contact-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }} className="px-8 py-4 border border-white/30 hover:bg-white/10 text-white font-bold rounded backdrop-blur transition-all">
                  CONTACTAR
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-primary w-8' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

export default Hero;