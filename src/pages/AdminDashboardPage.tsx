import React from 'react';
import { BarChart, Users, Package, Settings, LogOut, AlertCircle } from 'lucide-react';
import { User, Order } from '../types';

interface AdminDashboardPageProps {
  currentUser: User | null;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  logout: () => void;
  setView: (view: string) => void;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  currentUser,
  orders,
  setOrders,
  logout,
  setView,
}) => {
  if (!currentUser || currentUser.role !== 'admin') {
    return <div className="p-12 text-center">Acceso denegado. <button onClick={() => setView('HOME')} className="text-primary">Volver</button></div>;
  }

  const revenue = orders.filter(o => o.status === 'completed').reduce((acc, o) => acc + o.total, 0);
  const pending = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-orbitron font-bold text-white">PANEL ADMINISTRACIÓN</h2>
        <button onClick={logout} className="flex items-center gap-2 text-secondary hover:text-red-400">
          <LogOut size={20} /> Salir
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="p-4 bg-primary/20 rounded-full text-primary"><Package size={32} /></div>
          <div>
            <p className="text-slate-400 text-sm">Pedidos Totales</p>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="p-4 bg-yellow-500/20 rounded-full text-yellow-500"><AlertCircle size={32} /></div>
          <div>
            <p className="text-slate-400 text-sm">Pendientes</p>
            <p className="text-2xl font-bold">{pending}</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="p-4 bg-green-500/20 rounded-full text-green-500"><BarChart size={32} /></div>
          <div>
            <p className="text-slate-400 text-sm">Ingresos (Simulados)</p>
            <p className="text-2xl font-bold">${revenue}</p>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="font-bold text-lg">Pedidos Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-darker text-slate-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Servicio</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-slate-400">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{order.userName}</div>
                    <div className="text-xs text-slate-500">{order.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">{order.items.length} items ({order.items[0]?.serviceName}...)</td>
                  <td className="px-6 py-4 font-bold text-primary">${order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                      ${order.status === 'completed' ? 'bg-green-500/20 text-green-500' : 
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        order.status === 'in_progress' ? 'bg-blue-500/20 text-blue-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      className="bg-dark border border-slate-700 rounded px-2 py-1 text-xs text-white"
                      value={order.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as Order['status'];
                        const updated = orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o);
                        setOrders(updated);
                        localStorage.setItem('phk_orders', JSON.stringify(updated));
                      }}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="in_progress">En Progreso</option>
                      <option value="completed">Completado</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;