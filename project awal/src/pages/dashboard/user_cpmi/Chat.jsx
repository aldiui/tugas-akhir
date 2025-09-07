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

const Chat = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data chat untuk CPMI
  const chatList = [
    {
      id: 1,
      nama: 'Bu Sari (Pengajar)',
      status: 'Online',
      avatar: null,
      lastMessage: 'Jangan lupa besok ada ujian Mandarin ya',
      lastTime: '14:30',
      unread: 2,
      online: true
    },
    {
      id: 2,
      nama: 'Admin LPK',
      status: 'Online',
      avatar: null,
      lastMessage: 'Dokumen visa sudah siap diambil',
      lastTime: '11:45',
      unread: 0,
      online: false
    },
    {
      id: 3,
      nama: 'Pak Chen (Pengajar)',
      status: 'Offline',
      avatar: null,
      lastMessage: '你好! 明天见',
      lastTime: 'Kemarin',
      unread: 0,
      online: false
    }
  ];

  const filteredChats = chatList.filter(chat => 
    chat.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatClick = (chat) => {
    navigate(`/dashboard/cpmi/chat/${chat.id}`, { state: { chat } });
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Chat" />
      
      <div className="pt-5 px-4">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
            <input
              type="text"
              placeholder="Cari chat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-xl bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
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
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
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
                      <h3 className="font-semibold text-light-text-main dark:text-dark-text-main truncate">
                        {chat.nama}
                      </h3>
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

export default Chat;