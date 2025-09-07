import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserCheck,
  Send,
  MessageSquare
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import BackHeader from '../../../layout/BackHeader';
import NavBottom from '../../../layout/NavBottom';

const BroadcastPengajar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [broadcastType, setBroadcastType] = useState('all'); // 'all' or 'specific'

  const handleSendToAll = () => {
    if (message.trim()) {
      // Dummy send to all functionality
      alert('Pesan berhasil dikirim ke semua CPMI!');
      setMessage('');
      navigate('/dashboard/pengajar/chat');
    }
  };

  const handleSendToSpecific = () => {
    if (message.trim()) {
      // Navigate to CPMI selection page
      navigate('/dashboard/pengajar/broadcast/select', {
        state: { message: message }
      });
    }
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Buat Broadcast" />
      
      <div className="pt-5 px-4">
        {/* Message Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <label className="block text-light-text-main dark:text-dark-text-main font-semibold mb-3">
            <MessageSquare className="inline w-5 h-5 mr-2" />
            Tulis Pesan
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ketik pesan broadcast Anda di sini..."
            rows={6}
            className="w-full p-4 border border-light-border dark:border-dark-border rounded-xl bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
          <div className="text-right mt-2">
            <span className={`text-sm ${
              message.length > 500 
                ? 'text-red-500' 
                : 'text-light-text-secondary dark:text-dark-text-secondary'
            }`}>
              {message.length}/500
            </span>
          </div>
        </motion.div>

        {/* Broadcast Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <label className="block text-light-text-main dark:text-dark-text-main font-semibold mb-3">
            Pilih Penerima
          </label>
          
          <div className="space-y-3">
            {/* Send to All Option */}
            <div 
              onClick={() => setBroadcastType('all')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                broadcastType === 'all'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  broadcastType === 'all'
                    ? 'bg-green-500 text-white'
                    : 'bg-light-accent dark:bg-dark-accent text-light-text-secondary dark:text-dark-text-secondary'
                }`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-light-text-main dark:text-dark-text-main">
                    Kirim ke Semua CPMI
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Pesan akan dikirim ke seluruh CPMI di kelas Anda
                  </p>
                </div>
              </div>
            </div>

            {/* Send to Specific Option */}
            <div 
              onClick={() => setBroadcastType('specific')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                broadcastType === 'specific'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  broadcastType === 'specific'
                    ? 'bg-green-500 text-white'
                    : 'bg-light-accent dark:bg-dark-accent text-light-text-secondary dark:text-dark-text-secondary'
                }`}>
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-light-text-main dark:text-dark-text-main">
                    Kirim ke CPMI Tertentu
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Pilih CPMI tertentu yang akan menerima pesan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Send Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={broadcastType === 'all' ? handleSendToAll : handleSendToSpecific}
            disabled={!message.trim() || message.length > 500}
            className={`w-full p-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all ${
              !message.trim() || message.length > 500
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            <Send className="w-5 h-5" />
            <span>
              {broadcastType === 'all' 
                ? 'Kirim ke Semua CPMI' 
                : 'Pilih Penerima'
              }
            </span>
          </button>
        </motion.div>
      </div>

      <NavBottom />
    </div>
  );
};

export default BroadcastPengajar;