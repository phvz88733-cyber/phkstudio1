import React from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { ToastNotification } from '../types';

interface ToastProps {
  notifications: ToastNotification[];
  remove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ notifications, remove }) => (
  <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
    {notifications.map(n => (
      <div key={n.id} className={`p-4 rounded shadow-lg flex items-center gap-3 min-w-[300px] animate-fade-in ${n.type === 'success' ? 'bg-green-600' : n.type === 'error' ? 'bg-red-600' : 'bg-primary'} text-white`}>
        {n.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
        <span className="text-sm font-medium">{n.message}</span>
        <button onClick={() => remove(n.id)} className="ml-auto hover:text-slate-200"><X size={16} /></button>
      </div>
    ))}
  </div>
);

export default Toast;