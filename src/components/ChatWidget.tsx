import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatWidgetProps {
  notify: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ notify }) => (
  <a 
    href="#" // Simulated link
    onClick={(e) => { e.preventDefault(); notify('Conectando con WhatsApp...', 'info'); }}
    className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg shadow-green-900/40 hover:scale-110 transition-transform"
  >
    <MessageCircle size={28} />
  </a>
);

export default ChatWidget;