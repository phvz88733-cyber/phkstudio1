import React from 'react';
import { Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-darker border-t border-slate-800 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="text-2xl font-orbitron font-bold text-white mb-4">PHK<span className="text-secondary">Studio</span></div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Transformamos ideas en experiencias visuales de alto impacto. Especialistas en animación, modelado 3D y narrativa visual.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Servicios</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#" className="hover:text-primary">Animación 3D</a></li>
            <li><a href="#" className="hover:text-primary">Motion Graphics</a></li>
            <li><a href="#" className="hover:text-primary">Ilustración</a></li>
            <li><a href="#" className="hover:text-primary">Concept Art</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#" className="hover:text-primary">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-primary">Política de Privacidad</a></li>
            <li><a href="#" className="hover:text-primary">Política de Reembolso</a></li>
          </ul>
        </div>
        <div id="contact-section">
          <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Contacto</h4>
          <div className="flex gap-4 mb-4">
            <Instagram className="text-slate-400 hover:text-secondary cursor-pointer" />
            <Youtube className="text-slate-400 hover:text-secondary cursor-pointer" />
            <Facebook className="text-slate-400 hover:text-secondary cursor-pointer" />
            <Linkedin className="text-slate-400 hover:text-secondary cursor-pointer" />
          </div>
          <p className="text-sm text-slate-400">info@phkstudio.com</p>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
        &copy; 2025 PHKStudio. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;