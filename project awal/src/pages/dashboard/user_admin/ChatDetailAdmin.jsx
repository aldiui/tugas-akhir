import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Send,
  Paperclip,
  Image,
  FileText,
  Download,
  MoreVertical,
  Info,
  Archive,
  Trash2,
  Clock,
  Check,
  CheckCheck
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import BackHeader from '../../../layout/BackHeader';

const ChatDetailAdmin = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { chat } = location.state || {};
  const [message, setMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Dummy messages data
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: chat?.role === 'pengajar' ? chat.id : 'admin',
      senderName: chat?.role === 'pengajar' ? chat.nama : 'Admin',
      message: chat?.role === 'pengajar' 
        ? 'Selamat pagi Pak Admin, saya ingin melaporkan kondisi kelas hari ini'
        : 'Pak Admin, saya ingin mengajukan izin sakit untuk hari ini',
      timestamp: '09:15',
      date: 'Hari ini',
      type: 'text',
      status: 'read'
    },
    {
      id: 2,
      senderId: 'admin',
      senderName: 'Admin',
      message: chat?.role === 'pengajar'
        ? 'Selamat pagi Bu Sari, silakan laporkan kondisi kelasnya'
        : 'Baik Siti, bisa kirimkan surat keterangan dokter?',
      timestamp: '09:16',
      date: 'Hari ini',
      type: 'text',
      status: 'read'
    },
    {
      id: 3,
      senderId: chat?.role === 'pengajar' ? chat.id : chat?.id,
      senderName: chat?.nama,
      message: chat?.role === 'pengajar'
        ? 'Hari ini ada 2 CPMI yang terlambat dan 1 yang tidak masuk tanpa keterangan'
        : 'Baik pak, ini surat keterangan dari dokter',
      timestamp: '09:18',
      date: 'Hari ini',
      type: chat?.role === 'cpmi' ? 'file' : 'text',
      fileName: chat?.role === 'cpmi' ? 'surat_dokter.pdf' : null,
      fileSize: chat?.role === 'cpmi' ? '245 KB' : null,
      status: 'read'
    },
    {
      id: 4,
      senderId: 'admin',
      senderName: 'Admin',
      message: chat?.role === 'pengajar'
        ? 'Terima kasih laporannya. Untuk yang tidak masuk, sudah dikonfirmasi ke yang bersangkutan?'
        : 'Terima kasih Siti, izin diterima. Jangan lupa istirahat yang cukup',
      timestamp: '09:20',
      date: 'Hari ini',
      type: 'text',
      status: 'delivered'
    }
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: 'admin',
        senderName: 'Admin',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('id-ID', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        date: 'Hari ini',
        type: 'text',
        status: 'sent'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (type) => {
    if (type === 'image') {
      imageInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
    setShowAttachMenu(false);
  };

  const handleFileSelect = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const newMessage = {
        id: messages.length + 1,
        senderId: 'admin',
        senderName: 'Admin',
        message: type === 'image' ? 'Mengirim gambar' : 'Mengirim file',
        timestamp: new Date().toLocaleTimeString('id-ID', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        date: 'Hari ini',
        type: type,
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(0)} KB`,
        status: 'sent'
      };
      setMessages([...messages, newMessage]);
    }
  };

  const getStatusIcon = (status) => {
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

  if (!chat) {
    return (
      <div className="min-h-screen bg-light-body dark:bg-dark-body flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-light-text-main dark:text-dark-text-main mb-2">
            Chat tidak ditemukan
          </h2>
          <button
            onClick={() => navigate('/dashboard/admin/chat')}
            className="text-primary-500 hover:text-primary-600"
          >
            Kembali ke daftar chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body flex flex-col">
      {/* Header */}
      <div className="bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/dashboard/admin/chat')}
              className="p-2 hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-light-text-main dark:text-dark-text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className={`w-10 h-10 ${getRoleColor(chat.role)} rounded-full flex items-center justify-center text-white font-semibold`}>
                  {chat.nama.charAt(0)}
                </div>
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-dark-card rounded-full"></div>
                )}
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-semibold text-light-text-main dark:text-dark-text-main">
                    {chat.nama}
                  </h1>
                  <span className={`text-xs px-2 py-1 rounded-full text-white ${
                    chat.role === 'pengajar' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {chat.role === 'pengajar' ? 'Pengajar' : 'CPMI'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {chat.online ? 'Online' : 'Terakhir dilihat 2 jam lalu'}
                  </p>
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
          
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-2 hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-light-text-main dark:text-dark-text-main" />
            </button>
            
            <AnimatePresence>
              {showMoreMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-12 w-48 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-lg z-50"
                >
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left hover:bg-light-hover dark:hover:bg-dark-hover flex items-center space-x-2">
                      <Info className="w-4 h-4" />
                      <span>Info Kontak</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-light-hover dark:hover:bg-dark-hover flex items-center space-x-2">
                      <Archive className="w-4 h-4" />
                      <span>Arsipkan Chat</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-light-hover dark:hover:bg-dark-hover flex items-center space-x-2 text-red-500">
                      <Trash2 className="w-4 h-4" />
                      <span>Hapus Chat</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.senderId === 'admin' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              msg.senderId === 'admin'
                ? 'bg-primary-500 text-white'
                : 'bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main border border-light-border dark:border-dark-border'
            }`}>
              {msg.type === 'text' && (
                <p className="text-sm">{msg.message}</p>
              )}
              
              {msg.type === 'image' && (
                <div className="space-y-2">
                  <div className="w-48 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-xs opacity-75">{msg.fileName}</p>
                </div>
              )}
              
              {msg.type === 'file' && (
                <div className="flex items-center space-x-3 p-2 bg-white bg-opacity-10 rounded-lg">
                  <FileText className="w-8 h-8 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{msg.fileName}</p>
                    <p className="text-xs opacity-75">{msg.fileSize}</p>
                  </div>
                  <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <div className={`flex items-center justify-between mt-1 ${
                msg.senderId === 'admin' ? 'justify-end' : 'justify-start'
              }`}>
                <span className={`text-xs ${
                  msg.senderId === 'admin' ? 'text-white text-opacity-75' : 'text-light-text-secondary dark:text-dark-text-secondary'
                }`}>
                  {msg.timestamp}
                </span>
                {msg.senderId === 'admin' && (
                  <div className="ml-2">
                    {getStatusIcon(msg.status)}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border p-4">
        <div className="flex items-end space-x-2">
          {/* Attachment Button */}
          <div className="relative">
            <button
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <AnimatePresence>
              {showAttachMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute bottom-12 left-0 w-48 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-lg z-50"
                >
                  <div className="py-2">
                    <button
                      onClick={() => handleFileUpload('image')}
                      className="w-full px-4 py-2 text-left hover:bg-light-hover dark:hover:bg-dark-hover flex items-center space-x-2"
                    >
                      <Image className="w-4 h-4 text-green-500" />
                      <span>Gambar</span>
                    </button>
                    <button
                      onClick={() => handleFileUpload('file')}
                      className="w-full px-4 py-2 text-left hover:bg-light-hover dark:hover:bg-dark-hover flex items-center space-x-2"
                    >
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span>Dokumen</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Message Input */}
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan..."
              rows={1}
              className="w-full px-4 py-2 border border-light-border dark:border-dark-border rounded-xl bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          
          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-2 rounded-xl transition-colors ${
              message.trim()
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt,.xlsx,.xls"
        onChange={(e) => handleFileSelect(e, 'file')}
        className="hidden"
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e, 'image')}
        className="hidden"
      />
    </div>
  );
};

export default ChatDetailAdmin;