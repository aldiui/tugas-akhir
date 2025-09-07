import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Users,
  UserCheck,
  MessageCircle,
  AlertCircle,
  Mail,
  X,
  Check
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import BackHeader from '../../../layout/BackHeader';

const BroadcastAdmin = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('personal'); // personal, urgent, announcement
  const [targetType, setTargetType] = useState('all'); // all, specific, kelas
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState('');
  const [showUserSelector, setShowUserSelector] = useState(false);

  // Dummy data untuk user selection
  const allUsers = [
    // Pengajar
    { id: 1, nama: 'Bu Sari Dewi', role: 'pengajar', kelas: 'Kelas A' },
    { id: 2, nama: 'Pak Ahmad Fauzi', role: 'pengajar', kelas: 'Kelas B' },
    { id: 3, nama: 'Bu Rina Susanti', role: 'pengajar', kelas: 'Kelas C' },
    // CPMI
    { id: 4, nama: 'Siti Nurhaliza', role: 'cpmi', kelas: 'Kelas A', status: 'Aktif' },
    { id: 5, nama: 'Ahmad Rizki', role: 'cpmi', kelas: 'Kelas B', status: 'Piket' },
    { id: 6, nama: 'Dewi Sartika', role: 'cpmi', kelas: 'Kelas A', status: 'Aktif' },
    { id: 7, nama: 'Budi Santoso', role: 'cpmi', kelas: 'Kelas C', status: 'Terbang' },
    { id: 8, nama: 'Rina Wati', role: 'cpmi', kelas: 'Kelas B', status: 'Aktif' },
    { id: 9, nama: 'Joko Widodo', role: 'cpmi', kelas: 'Kelas C', status: 'Izin' }
  ];

  const kelasList = ['Kelas A', 'Kelas B', 'Kelas C'];

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-500';
      case 'announcement': return 'bg-blue-500';
      default: return 'bg-green-500';
    }
  };

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case 'urgent': return AlertCircle;
      case 'announcement': return Mail;
      default: return MessageCircle;
    }
  };

  const getRoleColor = (role) => {
    return role === 'pengajar' ? 'bg-blue-500' : 'bg-green-500';
  };

  const handleUserToggle = (user) => {
    setSelectedUsers(prev => {
      const isSelected = prev.find(u => u.id === user.id);
      if (isSelected) {
        return prev.filter(u => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const handleSelectAllUsers = () => {
    if (selectedUsers.length === allUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers([...allUsers]);
    }
  };

  const getTargetDescription = () => {
    if (targetType === 'all') {
      return 'Semua pengguna (Pengajar & CPMI)';
    } else if (targetType === 'kelas') {
      return selectedKelas ? `Semua anggota ${selectedKelas}` : 'Pilih kelas';
    } else {
      return selectedUsers.length > 0 ? `${selectedUsers.length} pengguna dipilih` : 'Pilih pengguna';
    }
  };

  const handleSendBroadcast = () => {
    if (!message.trim()) {
      alert('Pesan tidak boleh kosong!');
      return;
    }

    if (targetType === 'specific' && selectedUsers.length === 0) {
      alert('Pilih minimal satu pengguna!');
      return;
    }

    if (targetType === 'kelas' && !selectedKelas) {
      alert('Pilih kelas terlebih dahulu!');
      return;
    }

    // Simulate sending message
    alert('Pesan berhasil dikirim!');
    navigate('/dashboard/admin/chat');
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Kirim Pesan" />
      
      <div className="pt-5 px-4 pb-6 space-y-6">
        {/* Message Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border"
        >
          <h3 className="font-semibold text-light-text-main dark:text-dark-text-main mb-3">
            Jenis Pesan
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'personal', label: 'Personal', icon: MessageCircle, color: 'green' },
              { value: 'urgent', label: 'Urgent', icon: AlertCircle, color: 'red' },
              { value: 'announcement', label: 'Pengumuman', icon: Mail, color: 'blue' }
            ].map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => setMessageType(type.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    messageType === type.value
                      ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20`
                      : 'border-light-border dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1 ${
                    messageType === type.value ? `text-${type.color}-500` : 'text-gray-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    messageType === type.value ? `text-${type.color}-600 dark:text-${type.color}-400` : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>



        {/* Target Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border"
        >
          <h3 className="font-semibold text-light-text-main dark:text-dark-text-main mb-3">
            Penerima Pesan
          </h3>
          <div className="space-y-3">
            {[
              { value: 'all', label: 'Semua Pengguna', icon: Users },
              { value: 'kelas', label: 'Per Kelas', icon: Users },
              { value: 'specific', label: 'Pengguna Spesifik', icon: UserCheck }
            ].map((target) => {
              const Icon = target.icon;
              return (
                <button
                  key={target.value}
                  onClick={() => setTargetType(target.value)}
                  className={`w-full p-3 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                    targetType === target.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-light-border dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${
                    targetType === target.value ? 'text-primary-500' : 'text-gray-500'
                  }`} />
                  <span className={`font-medium ${
                    targetType === target.value ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {target.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Kelas Selection */}
          {targetType === 'kelas' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                Pilih Kelas
              </label>
              <select
                value={selectedKelas}
                onChange={(e) => setSelectedKelas(e.target.value)}
                className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Pilih Kelas</option>
                {kelasList.map((kelas) => (
                  <option key={kelas} value={kelas}>{kelas}</option>
                ))}
              </select>
            </div>
          )}

          {/* Specific Users Selection */}
          {targetType === 'specific' && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Pilih Pengguna ({selectedUsers.length}/{allUsers.length})
                </span>
                <button
                  onClick={handleSelectAllUsers}
                  className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                >
                  {selectedUsers.length === allUsers.length ? 'Batal Pilih Semua' : 'Pilih Semua'}
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {allUsers.map((user) => {
                  const isSelected = selectedUsers.find(u => u.id === user.id);
                  return (
                    <div
                      key={user.id}
                      onClick={() => handleUserToggle(user)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-light-border dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${getRoleColor(user.role)} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                          {user.nama.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-light-text-main dark:text-dark-text-main">
                              {user.nama}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full text-white ${
                              user.role === 'pengajar' ? 'bg-blue-500' : 'bg-green-500'
                            }`}>
                              {user.role === 'pengajar' ? 'Pengajar' : 'CPMI'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                              {user.kelas}
                            </span>
                            {user.status && (
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                {user.status}
                              </span>
                            )}
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5 text-primary-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Message Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border"
        >
          <h3 className="font-semibold text-light-text-main dark:text-dark-text-main mb-3">
            Isi Pesan
          </h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={messageType === 'personal' 
              ? 'Tulis pesan personal Anda di sini...'
              : messageType === 'urgent'
              ? 'Tulis pesan urgent yang perlu segera disampaikan...'
              : 'Tulis pengumuman untuk semua anggota...'
            }
            rows={6}
            className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {message.length}/500 karakter
            </span>
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Penerima: {getTargetDescription()}
            </span>
          </div>
        </motion.div>

        {/* Preview */}
        {message.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border"
          >
            <h3 className="font-semibold text-light-text-main dark:text-dark-text-main mb-3">
              Preview Pesan
            </h3>
            <div className="bg-light-body dark:bg-dark-body rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                {(() => {
                  const Icon = getMessageTypeIcon(messageType);
                  return (
                    <div className={`w-6 h-6 ${getMessageTypeColor(messageType)} rounded-full flex items-center justify-center`}>
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                  );
                })()}
                <span className="font-medium text-light-text-main dark:text-dark-text-main">
                  Admin LPK Bahana Mega Prestasi
                </span>
                <span className={`text-xs px-2 py-1 rounded-full text-white ${
                  getMessageTypeColor(messageType)
                }`}>
                  {messageType === 'urgent' ? 'URGENT' : messageType === 'announcement' ? 'PENGUMUMAN' : 'PERSONAL'}
                </span>
              </div>
              

              
              <p className="text-light-text-main dark:text-dark-text-main whitespace-pre-wrap">
                {message}
              </p>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-light-border dark:border-dark-border">
                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  Sekarang
                </span>
                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  Untuk: {getTargetDescription()}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Send Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleSendBroadcast}
          disabled={!message.trim()}
          className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
            message.trim()
              ? 'bg-primary-500 hover:bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
          <span>Kirim Pesan</span>
        </motion.button>
      </div>
    </div>
  );
};

export default BroadcastAdmin;