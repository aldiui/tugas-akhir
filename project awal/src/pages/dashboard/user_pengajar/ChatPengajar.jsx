import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MessageCircle,
  Clock,
  Plus
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import BackHeader from '../../../layout/BackHeader';
import NavBottom from '../../../layout/NavBottom';

const ChatPengajar = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data CPMI untuk chat
  const cpmiList = [
    {
      id: 1,
      nama: 'Ahmad Rizki',
      status: 'Piket',
      avatar: null,
      lastMessage: 'Terima kasih pak atas bimbingannya hari ini',
      lastTime: '14:30',
      unread: 2,
      online: true
    },
    {
      id: 2,
      nama: 'Siti Nurhaliza',
      status: 'Aktif',
      avatar: null,
      lastMessage: 'Pak, besok ada pelajaran bahasa Mandarin?',
      lastTime: '13:45',
      unread: 0,
      online: false
    },
    {
      id: 3,
      nama: 'Budi Santoso',
      status: 'Terbang',
      avatar: null,
      lastMessage: 'Sudah sampai Taiwan pak, terima kasih',
      lastTime: '10:20',
      unread: 1,
      online: false
    },
    {
      id: 4,
      nama: 'Dewi Sartika',
      status: 'Aktif',
      avatar: null,
      lastMessage: 'Baik pak, saya akan datang tepat waktu',
      lastTime: '09:15',
      unread: 0,
      online: true
    },
    {
      id: 5,
      nama: 'Eko Prasetyo',
      status: 'Piket',
      avatar: null,
      lastMessage: 'Laporan kegiatan hari ini sudah saya kirim',
      lastTime: '16:45',
      unread: 3,
      online: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif': return 'bg-green-500';
      case 'Piket': return 'bg-blue-500';
      case 'Terbang': return 'bg-purple-500';
      case 'Izin': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredCPMI = cpmiList.filter(cpmi => 
    cpmi.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatClick = (cpmi) => {
    navigate(`/dashboard/pengajar/chat/${cpmi.id}`, { state: { cpmi } });
  };

  const handleBroadcastClick = () => {
    navigate('/dashboard/pengajar/broadcast');
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Chat CPMI" />
      
      <div className="pt-5 px-4">
        {/* Header Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 space-y-4"
        >
          {/* Broadcast Button */}
          <button
            onClick={handleBroadcastClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 flex items-center justify-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Buat Pesan Broadcast</span>
          </button>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
            <input
              type="text"
              placeholder="Cari CPMI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-xl bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Chat List */}
        <div className="space-y-3">
          {filteredCPMI.length > 0 ? (
            filteredCPMI.map((cpmi, index) => (
              <motion.div
                key={cpmi.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleChatClick(cpmi)}
                className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  {/* Avatar with Online Status */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {cpmi.nama.charAt(0)}
                    </div>
                    {/* Online Status Dot */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white dark:border-dark-card rounded-full ${
                      cpmi.online ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-light-text-main dark:text-dark-text-main truncate">
                        {cpmi.nama}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-light-text-secondary dark:text-dark-text-secondary" />
                          <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                            {cpmi.lastTime}
                          </span>
                        </div>
                        {cpmi.unread > 0 && (
                          <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cpmi.unread}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary truncate flex-1 mr-2">
                        {cpmi.lastMessage}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(cpmi.status)} text-white flex-shrink-0`}>
                        {cpmi.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MessageCircle className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
                Tidak ada chat ditemukan
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Coba ubah kata kunci pencarian
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <NavBottom />
    </div>
  );
};

export default ChatPengajar;