import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MessageCircle,
  Clock,
  Plus,
  Users,
  GraduationCap
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';

const ChatAdmin = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, pengajar, cpmi

  // Dummy data untuk chat admin dengan pengajar dan CPMI
  const chatList = [
    // Pengajar
    {
      id: 1,
      nama: 'Bu Sari Dewi',
      role: 'pengajar',
      kelas: 'Kelas A',
      avatar: null,
      lastMessage: 'Laporan absensi kelas A sudah saya kirim',
      lastTime: '15:30',
      unread: 2,
      online: true
    },
    {
      id: 2,
      nama: 'Pak Ahmad Fauzi',
      role: 'pengajar',
      kelas: 'Kelas B',
      avatar: null,
      lastMessage: 'Ada 3 CPMI yang perlu perhatian khusus',
      lastTime: '14:45',
      unread: 0,
      online: false
    },
    {
      id: 3,
      nama: 'Bu Rina Susanti',
      role: 'pengajar',
      kelas: 'Kelas C',
      avatar: null,
      lastMessage: 'Jadwal ujian Mandarin sudah diatur',
      lastTime: '13:20',
      unread: 1,
      online: true
    },
    // CPMI
    {
      id: 4,
      nama: 'Siti Nurhaliza',
      role: 'cpmi',
      kelas: 'Kelas A',
      status: 'Aktif',
      avatar: null,
      lastMessage: 'Pak, saya ingin mengajukan izin sakit',
      lastTime: '12:15',
      unread: 3,
      online: true
    },
    {
      id: 5,
      nama: 'Ahmad Rizki',
      role: 'cpmi',
      kelas: 'Kelas B',
      status: 'Piket',
      avatar: null,
      lastMessage: 'Terima kasih atas bantuannya pak',
      lastTime: '11:30',
      unread: 0,
      online: false
    },
    {
      id: 6,
      nama: 'Dewi Sartika',
      role: 'cpmi',
      kelas: 'Kelas A',
      status: 'Aktif',
      avatar: null,
      lastMessage: 'Kapan jadwal interview dengan agency?',
      lastTime: '10:45',
      unread: 1,
      online: true
    },
    {
      id: 7,
      nama: 'Budi Santoso',
      role: 'cpmi',
      kelas: 'Kelas C',
      status: 'Terbang',
      avatar: null,
      lastMessage: 'Sudah sampai Taiwan dengan selamat pak',
      lastTime: 'Kemarin',
      unread: 0,
      online: false
    }
  ];

  const getRoleColor = (role) => {
    return role === 'pengajar' ? 'bg-blue-500' : 'bg-green-500';
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

  const filteredChats = chatList.filter(chat => {
    const matchesSearch = chat.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || chat.role === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleChatClick = (chat) => {
    navigate(`/dashboard/admin/chat/${chat.id}`, { state: { chat } });
  };

  const handleBroadcastClick = () => {
    navigate('/dashboard/admin/broadcast');
  };

  const getTabCount = (tab) => {
    if (tab === 'all') return chatList.length;
    return chatList.filter(chat => chat.role === tab).length;
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Chat Management" />
      
      <div className="pt-5 px-4 pb-20">
        {/* Header Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 space-y-4"
        >
          {/* Broadcast Button */}
          <button
            onClick={handleBroadcastClick}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-xl p-4 flex items-center justify-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Buat Pesan Broadcast</span>
          </button>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
            <input
              type="text"
              placeholder="Cari pengajar atau CPMI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-xl bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filter Tabs - Compact Sliding Navigation */}
          <div className="relative bg-light-card dark:bg-dark-card rounded-xl p-1 border border-light-border dark:border-dark-border">
            {/* Sliding Background Indicator */}
            <div 
              className={`absolute top-1 bottom-1 rounded-lg transition-all duration-300 ease-in-out ${
                activeTab === 'all' ? 'bg-primary-500' :
                activeTab === 'pengajar' ? 'bg-blue-500' : 'bg-green-500'
              }`}
              style={{
                left: activeTab === 'all' ? '4px' : activeTab === 'pengajar' ? '33.33%' : '66.66%',
                width: 'calc(33.33% - 4px)',
                transform: activeTab === 'pengajar' ? 'translateX(-2px)' : activeTab === 'cpmi' ? 'translateX(-4px)' : 'none'
              }}
            />
            
            <div className="relative flex">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-2.5 px-3 text-sm font-medium transition-colors duration-300 relative z-10 flex items-center justify-center space-x-1 ${
                  activeTab === 'all'
                    ? 'text-white'
                    : 'text-light-text-main dark:text-dark-text-main hover:text-primary-500'
                }`}
              >
                <span>Semua</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === 'all' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-light-body dark:bg-dark-body text-light-text-secondary dark:text-dark-text-secondary'
                }`}>
                  {getTabCount('all')}
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('pengajar')}
                className={`flex-1 py-2.5 px-3 text-sm font-medium transition-colors duration-300 relative z-10 flex items-center justify-center space-x-1 ${
                  activeTab === 'pengajar'
                    ? 'text-white'
                    : 'text-light-text-main dark:text-dark-text-main hover:text-blue-500'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pengajar</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === 'pengajar' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-light-body dark:bg-dark-body text-light-text-secondary dark:text-dark-text-secondary'
                }`}>
                  {getTabCount('pengajar')}
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('cpmi')}
                className={`flex-1 py-2.5 px-3 text-sm font-medium transition-colors duration-300 relative z-10 flex items-center justify-center space-x-1 ${
                  activeTab === 'cpmi'
                    ? 'text-white'
                    : 'text-light-text-main dark:text-dark-text-main hover:text-green-500'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CPMI</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === 'cpmi' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-light-body dark:bg-dark-body text-light-text-secondary dark:text-dark-text-secondary'
                }`}>
                  {getTabCount('cpmi')}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Chat List */}
        <div className="space-y-3">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleChatClick(chat)}
                className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  {/* Avatar with Online Status */}
                  <div className="relative">
                    <div className={`w-12 h-12 ${getRoleColor(chat.role)} rounded-full flex items-center justify-center text-white font-semibold text-lg`}>
                      {chat.nama.charAt(0)}
                    </div>
                    {/* Online Status Dot */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white dark:border-dark-card rounded-full ${
                      chat.online ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-light-text-main dark:text-dark-text-main truncate">
                          {chat.nama}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full text-white ${
                          chat.role === 'pengajar' ? 'bg-blue-500' : 'bg-green-500'
                        }`}>
                          {chat.role === 'pengajar' ? 'Pengajar' : 'CPMI'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-light-text-secondary dark:text-dark-text-secondary" />
                          <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                            {chat.lastTime}
                          </span>
                        </div>
                        {chat.unread > 0 && (
                          <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary truncate flex-1 mr-2">
                        {chat.lastMessage}
                      </p>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          {chat.kelas}
                        </span>
                        {chat.status && (
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(chat.status)} text-white`}>
                            {chat.status}
                          </span>
                        )}
                      </div>
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
                Coba ubah kata kunci pencarian atau filter
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatAdmin;