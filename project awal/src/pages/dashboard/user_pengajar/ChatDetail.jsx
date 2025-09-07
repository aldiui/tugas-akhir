import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { 
  Send, 
  Paperclip,
  Smile,
  Image,
  Camera,
  Mic,
  Clock,
  CheckCheck,
  Check
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const ChatDetail = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  // Get CPMI data from navigation state or fallback
  const cpmi = location.state?.cpmi || {
    id: parseInt(id),
    nama: 'CPMI',
    status: 'Aktif',
    online: true
  };

  // Dummy chat messages data
  const chatMessages = {
    1: [
      {
        id: 1,
        sender: 'cpmi',
        message: 'Selamat pagi pak, hari ini saya mulai piket di rumah majikan',
        time: '08:00',
        status: 'read',
        type: 'text'
      },
      {
        id: 2,
        sender: 'pengajar',
        message: 'Selamat pagi Ahmad. Bagus, semangat ya. Jangan lupa laporkan kegiatan harianmu',
        time: '08:05',
        status: 'read',
        type: 'text'
      },
      {
        id: 3,
        sender: 'cpmi',
        message: 'Siap pak. Saya akan berusaha yang terbaik',
        time: '08:07',
        status: 'read',
        type: 'text'
      },
      {
        id: 4,
        sender: 'cpmi',
        message: 'Pak, saya ada kesulitan berkomunikasi dengan majikan. Bahasa Mandarin saya masih kurang lancar',
        time: '14:25',
        status: 'read',
        type: 'text'
      },
      {
        id: 5,
        sender: 'pengajar',
        message: 'Tidak apa-apa Ahmad, itu wajar. Coba gunakan aplikasi translate dulu, dan perlahan-lahan belajar dari percakapan sehari-hari',
        time: '14:28',
        status: 'read',
        type: 'text'
      },
      {
        id: 6,
        sender: 'cpmi',
        message: 'Terima kasih pak atas bimbingannya hari ini',
        time: '14:30',
        status: 'delivered',
        type: 'text'
      }
    ],
    2: [
      {
        id: 1,
        sender: 'cpmi',
        message: 'Pak, besok ada pelajaran bahasa Mandarin?',
        time: '13:45',
        status: 'read',
        type: 'text'
      },
      {
        id: 2,
        sender: 'pengajar',
        message: 'Ya Siti, besok jam 09:00 ada pelajaran bahasa Mandarin. Jangan lupa bawa buku catatan',
        time: '13:50',
        status: 'sent',
        type: 'text'
      }
    ],
    3: [
      {
        id: 1,
        sender: 'cpmi',
        message: 'Pak, saya sudah sampai di Taiwan dengan selamat',
        time: '10:15',
        status: 'read',
        type: 'text'
      },
      {
        id: 2,
        sender: 'pengajar',
        message: 'Alhamdulillah, selamat ya Budi! Semoga sukses di sana. Jangan lupa jaga kesehatan',
        time: '10:20',
        status: 'read',
        type: 'text'
      },
      {
        id: 3,
        sender: 'cpmi',
        message: 'Terima kasih pak atas semua bimbingannya selama di LPK',
        time: '10:22',
        status: 'delivered',
        type: 'text'
      }
    ],
    4: [
      {
        id: 1,
        sender: 'cpmi',
        message: 'Selamat pagi pak',
        time: '09:10',
        status: 'read',
        type: 'text'
      },
      {
        id: 2,
        sender: 'pengajar',
        message: 'Selamat pagi Dewi. Hari ini siap untuk pelajaran?',
        time: '09:12',
        status: 'read',
        type: 'text'
      },
      {
        id: 3,
        sender: 'cpmi',
        message: 'Baik pak, saya akan datang tepat waktu',
        time: '09:15',
        status: 'sent',
        type: 'text'
      }
    ],
    5: [
      {
        id: 1,
        sender: 'cpmi',
        message: 'Pak, laporan kegiatan hari ini sudah saya kirim',
        time: '16:40',
        status: 'read',
        type: 'text'
      },
      {
        id: 2,
        sender: 'pengajar',
        message: 'Baik Eko, saya sudah terima. Laporannya lengkap sekali',
        time: '16:42',
        status: 'read',
        type: 'text'
      },
      {
        id: 3,
        sender: 'cpmi',
        message: 'Terima kasih pak. Besok saya akan lanjut piket lagi',
        time: '16:45',
        status: 'delivered',
        type: 'text'
      }
    ]
  };

  const messages = chatMessages[cpmi.id] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Dummy send message functionality
      setMessage('');
      // In real app, this would send the message to backend
    }
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif': return 'bg-green-500';
      case 'Piket': return 'bg-blue-500';
      case 'Terbang': return 'bg-purple-500';
      case 'Izin': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-screen bg-light-body dark:bg-dark-body flex flex-col overflow-hidden">
      {/* Custom Header with CPMI Info */}
      <div className="bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border p-4 pt-6 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/dashboard/pengajar/chat')}
            className="p-2 hover:bg-light-body dark:hover:bg-dark-body rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-light-text-main dark:text-dark-text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
              {cpmi.nama.charAt(0)}
            </div>
            {/* Online Status Dot */}
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white dark:border-dark-card rounded-full ${
              cpmi.online ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-light-text-main dark:text-dark-text-main">
              {cpmi.nama}
            </h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {cpmi.online ? 'Online' : 'Offline'}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(cpmi.status)} text-white`}>
                {cpmi.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex ${msg.sender === 'pengajar' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'pengajar'
                ? 'bg-green-500 text-white rounded-br-md'
                : 'bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main border border-light-border dark:border-dark-border rounded-bl-md'
              }`}>
              <p className="text-sm">{msg.message}</p>
              <div className={`flex items-center justify-end space-x-1 mt-1 ${msg.sender === 'pengajar' ? 'text-green-100' : 'text-light-text-secondary dark:text-dark-text-secondary'
                }`}>
                <span className="text-xs">{msg.time}</span>
                {msg.sender === 'pengajar' && getMessageStatusIcon(msg.status)}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input - Sticky at Bottom */}
      <div className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border flex-shrink-0 safe-area-inset-bottom">
        <div className="chat-input-container">
          <button className="chat-input-button text-light-text-secondary dark:text-dark-text-secondary hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20">
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea
            placeholder="Ketik pesan..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            rows={1}
            className="chat-input-textarea border border-light-border dark:border-dark-border bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent"
            style={{
              height: 'auto',
              minHeight: '48px'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
            }}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="chat-input-button bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;