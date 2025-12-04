import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
  handleLogin: (email: string, pass: string) => Promise<void>;
  handleRegister: (first_name: string, last_name: string, email: string, pass: string) => Promise<void>;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isLoginOpen,
  setIsLoginOpen,
  handleLogin,
  handleRegister,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-surface border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up">
        <div className="p-6 bg-darker border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-orbitron font-bold">{isRegister ? 'CREAR CUENTA' : 'INICIAR SESIÓN'}</h3>
          <button onClick={() => setIsLoginOpen(false)} className="text-slate-400 hover:text-white"><X size={24}/></button>
        </div>
        <div className="p-8 space-y-4">
          {isRegister && (
            <>
              <input 
                type="text" 
                placeholder="Nombre" 
                className="w-full bg-dark border border-slate-700 p-3 rounded text-white focus:border-primary focus:outline-none"
                value={firstName} onChange={e => setFirstName(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Apellido" 
                className="w-full bg-dark border border-slate-700 p-3 rounded text-white focus:border-primary focus:outline-none"
                value={lastName} onChange={e => setLastName(e.target.value)}
              />
            </>
          )}
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-dark border border-slate-700 p-3 rounded text-white focus:border-primary focus:outline-none"
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="w-full bg-dark border border-slate-700 p-3 rounded text-white focus:border-primary focus:outline-none"
            value={password} onChange={e => setPassword(e.target.value)}
          />
          <button 
            onClick={() => isRegister ? handleRegister(firstName, lastName, email, password) : handleLogin(email, password)}
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded transition-all transform hover:scale-[1.02]"
          >
            {isRegister ? 'REGISTRARSE' : 'ENTRAR'}
          </button>
          <div className="text-center text-sm text-slate-400 mt-4">
            {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
            <button onClick={() => setIsRegister(!isRegister)} className="text-primary hover:underline ml-1 font-bold">
              {isRegister ? 'Inicia Sesión' : 'Regístrate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;