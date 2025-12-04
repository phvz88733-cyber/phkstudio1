import React from 'react';
import { Settings } from 'lucide-react';
import { User } from '../types';

interface FloatingAdminBtnProps {
  currentUser: User | null;
  setView: (view: string) => void;
  setIsLoginOpen: (isOpen: boolean) => void;
}

const FloatingAdminBtn: React.FC<FloatingAdminBtnProps> = ({
  currentUser,
  setView,
  setIsLoginOpen,
}) => {
  return (
    <button 
      onClick={() => {
        if (currentUser?.role === 'admin') setView('ADMIN');
        else setIsLoginOpen(true);
      }}
      className="fixed bottom-4 left-4 z-40 bg-slate-800/50 hover:bg-slate-700 text-slate-500 p-2 rounded-full backdrop-blur transition-all"
      title="Staff Access"
    >
      <Settings size={16} />
    </button>
  );
};

export default FloatingAdminBtn;