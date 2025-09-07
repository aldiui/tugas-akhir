import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Calendar, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock, 
  User, 
  Users, 
  Filter, 
  Search,
  Download,
  ExternalLink,
  Star,
  Archive,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const Notifikasi = () => {
  const { cpmi } = useCPMI();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  // Dummy notifications data
  const [notifications] = useState([
    {
      id: 1,
      judul: 'Interview dengan Agency Taiwan',
      isi: 'Akan diadakan interview dengan perwakilan agency Taiwan pada tanggal 15 Januari 2024, pukul 09:00 WIB. Tempat: Ruang Meeting LPK. Harap datang tepat waktu dan bawa dokumen lengkap.',
      tanggal: '2024-01-10',
      jam: '14:30',
      pengirim: 'Admin LPK',
      avatar: '👨‍💼',
      tipe: 'jadwal',
      prioritas: 'urgent',
      status: 'belum_dibaca',
      target: 'semua',
      jadwal_info: {
        tanggal_acara: '2024-01-15',
        jam_acara: '09:00',
        lokasi: 'Ruang Meeting LPK',
        durasi: '2 jam'
      }
    },
    {
      id: 2,
      judul: 'Pengumuman Libur Tahun Baru',
      isi: 'Dalam rangka perayaan Tahun Baru 2024, LPK akan libur pada tanggal 1 Januari 2024. Kegiatan pelatihan akan dimulai kembali pada tanggal 2 Januari 2024.',
      tanggal: '2024-01-08',
      jam: '10:15',
      pengirim: 'Bu Sari (Pengajar)',
      avatar: '👩‍🏫',
      tipe: 'normal',
      prioritas: 'normal',
      status: 'dibaca',
      target: 'kelas_a'
    },
    {
      id: 3,
      judul: 'Ujian Mandarin Minggu Depan',
      isi: 'Ujian Mandarin akan dilaksanakan pada hari Jumat, 12 Januari 2024. Materi yang diujikan meliputi percakapan sehari-hari, angka, dan kosakata dasar. Silakan persiapkan diri dengan baik.',
      tanggal: '2024-01-07',
      jam: '16:45',
      pengirim: 'Pak Chen (Pengajar)',
      avatar: '👨‍🏫',
      tipe: 'jadwal',
      prioritas: 'normal',
      status: 'dibaca',
      target: 'semua',
      jadwal_info: {
        tanggal_acara: '2024-01-12',
        jam_acara: '10:00',
        lokasi: 'Ruang Kelas A',
        durasi: '1.5 jam'
      }
    },
    {
      id: 4,
      judul: 'Update Dokumen Visa',
      isi: 'Dokumen visa untuk batch Taiwan sudah selesai diproses. Silakan ambil di kantor admin pada jam kerja. Jangan lupa bawa KTP asli.',
      tanggal: '2024-01-06',
      jam: '11:20',
      pengirim: 'Admin LPK',
      avatar: '👨‍💼',
      tipe: 'normal',
      prioritas: 'urgent',
      status: 'dibaca',
      target: 'spesifik'
    },
    {
      id: 5,
      judul: 'Pelatihan Memasak Taiwan',
      isi: 'Besok akan ada pelatihan khusus memasak makanan Taiwan. Peserta diharapkan membawa apron dan catatan. Pelatihan dimulai pukul 13:00.',
      tanggal: '2024-01-05',
      jam: '18:30',
      pengirim: 'Chef Lin',
      avatar: '👨‍🍳',
      tipe: 'jadwal',
      prioritas: 'normal',
      status: 'dibaca',
      target: 'semua',
      jadwal_info: {
        tanggal_acara: '2024-01-06',
        jam_acara: '13:00',
        lokasi: 'Dapur Pelatihan',
        durasi: '3 jam'
      }
    },
    {
      id: 6,
      judul: 'Reminder: Medical Check-up',
      isi: 'Jangan lupa untuk melakukan medical check-up di RS Mitra Keluarga pada tanggal yang sudah dijadwalkan. Bawa surat pengantar dari LPK.',
      tanggal: '2024-01-04',
      jam: '09:00',
      pengirim: 'Admin LPK',
      avatar: '👨‍💼',
      tipe: 'normal',
      prioritas: 'normal',
      status: 'dibaca',
      target: 'spesifik'
    }
  ]);

  const filteredNotifications = (notifications && Array.isArray(notifications)) ? notifications.filter(notif => {
    const matchesFilter = filter === 'semua' || 
      (filter === 'belum_dibaca' && notif.status === 'belum_dibaca') ||
      (filter === 'jadwal' && notif.tipe === 'jadwal') ||
      (filter === 'urgent' && notif.prioritas === 'urgent');
    
    const matchesSearch = notif.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.isi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.pengirim.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  }) : [];

  const unreadCount = (notifications && Array.isArray(notifications)) ? notifications.filter(n => n.status === 'belum_dibaca').length : 0;
  const urgentCount = (notifications && Array.isArray(notifications)) ? notifications.filter(n => n.prioritas === 'urgent').length : 0;
  const scheduleCount = (notifications && Array.isArray(notifications)) ? notifications.filter(n => n.tipe === 'jadwal').length : 0;

  const handleSaveToCalendar = (notification) => {
    // In real app, this would integrate with device calendar
    console.log('Saving to calendar:', notification.jadwal_info);
    alert('Jadwal berhasil disimpan ke kalender! (Demo mode)');
  };

  const markAsRead = (id) => {
    // In real app, this would update the backend
    console.log('Marking as read:', id);
  };

  const getPriorityColor = (prioritas) => {
    switch (prioritas) {
      case 'urgent':
        return 'text-red-600 dark:text-red-400';
      case 'normal':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getPriorityBg = (prioritas) => {
    switch (prioritas) {
      case 'urgent':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'normal':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hari ini';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Kemarin';
    } else {
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Notifikasi" />
      
      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="card p-3 text-center">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Bell className="text-red-600 dark:text-red-400" size={16} />
            </div>
            <p className="text-lg font-bold text-light-text-main dark:text-dark-text-main">{unreadCount}</p>
            <p className="text-xs text-secondary">Belum Dibaca</p>
          </div>
          
          <div className="card p-3 text-center">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="text-orange-600 dark:text-orange-400" size={16} />
            </div>
            <p className="text-lg font-bold text-light-text-main dark:text-dark-text-main">{urgentCount}</p>
            <p className="text-xs text-secondary">Urgent</p>
          </div>
          
          <div className="card p-3 text-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Calendar className="text-blue-600 dark:text-blue-400" size={16} />
            </div>
            <p className="text-lg font-bold text-light-text-main dark:text-dark-text-main">{scheduleCount}</p>
            <p className="text-xs text-secondary">Jadwal</p>
          </div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-3"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" size={18} />
            <input
              type="text"
              placeholder="Cari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main placeholder-secondary focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[
              { key: 'semua', label: 'Semua', icon: Bell },
              { key: 'belum_dibaca', label: 'Belum Dibaca', icon: Info },
              { key: 'jadwal', label: 'Jadwal', icon: Calendar },
              { key: 'urgent', label: 'Urgent', icon: AlertTriangle }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter === key
                    ? 'bg-primary-500 text-white'
                    : 'bg-light-card dark:bg-dark-card text-secondary hover:text-light-text-main dark:hover:text-dark-text-main border border-light-border dark:border-dark-border'
                }`}
              >
                <Icon size={14} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.1, duration: 0.5 }}
                className={`card p-4 cursor-pointer ${notif.status === 'belum_dibaca' ? 'ring-2 ring-primary-200 dark:ring-primary-800' : ''} ${
                  notif.prioritas === 'urgent' ? getPriorityBg(notif.prioritas) : ''
                }`}
                onClick={() => {
                  markAsRead(notif.id);
                  navigate('/dashboard/cpmi/notifikasi/detail', { state: { notifikasi: notif } });
                }}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{notif.avatar}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold text-light-text-main dark:text-dark-text-main ${
                            notif.status === 'belum_dibaca' ? 'font-bold' : ''
                          }`}>
                            {notif.judul}
                          </h3>
                          
                          {/* Badges */}
                          <div className="flex items-center space-x-1">
                            {notif.status === 'belum_dibaca' && (
                              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            )}
                            
                            {notif.tipe === 'jadwal' && (
                              <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs rounded-full flex items-center space-x-1">
                                <Calendar size={10} />
                                <span>📅</span>
                              </div>
                            )}
                            
                            {notif.prioritas === 'urgent' && (
                              <div className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-xs rounded-full flex items-center space-x-1">
                                <AlertTriangle size={10} />
                                <span>🚨</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-xs text-secondary mb-2">
                          <span>{notif.pengirim}</span>
                          <span>•</span>
                          <span>{formatDate(notif.tanggal)}</span>
                          <span>•</span>
                          <span>{notif.jam}</span>
                        </div>
                      </div>
                      
                      <button className="p-1 hover:bg-light-border dark:hover:bg-dark-border rounded transition-colors">
                        <MoreVertical size={16} className="text-secondary" />
                      </button>
                    </div>
                    
                    {/* Message */}
                    <p className="text-sm text-secondary leading-relaxed mb-3">
                      {notif.isi}
                    </p>
                    
                    {/* Schedule Info */}
                    {notif.jadwal_info && (
                      <div className="bg-light-border dark:bg-dark-border rounded-lg p-3 mb-3">
                        <h4 className="text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2 flex items-center">
                          <Calendar className="mr-1" size={14} />
                          Detail Jadwal
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs text-secondary">
                          <div>
                            <span className="font-medium">Tanggal:</span>
                            <br />
                            {new Date(notif.jadwal_info.tanggal_acara).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                          <div>
                            <span className="font-medium">Waktu:</span>
                            <br />
                            {notif.jadwal_info.jam_acara} ({notif.jadwal_info.durasi})
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium">Lokasi:</span>
                            <br />
                            {notif.jadwal_info.lokasi}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      {notif.tipe === 'jadwal' && notif.jadwal_info && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveToCalendar(notif);
                          }}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
                        >
                          <Calendar size={12} />
                          <span>Simpan ke Kalender</span>
                        </button>
                      )}
                      
                      <div className="flex items-center space-x-1 text-xs text-secondary">
                        <Clock size={12} />
                        <span>
                          {notif.target === 'semua' ? 'Untuk semua CPMI' :
                           notif.target === 'kelas_a' ? 'Untuk Kelas A' :
                           'Untuk kamu'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="card p-8 text-center"
            >
              <Bell size={48} className="mx-auto mb-4 text-secondary" />
              <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-2">
                {searchQuery ? 'Tidak Ada Hasil' : 'Tidak Ada Notifikasi'}
              </h3>
              <p className="text-secondary">
                {searchQuery 
                  ? `Tidak ditemukan notifikasi dengan kata kunci "${searchQuery}"`
                  : filter === 'belum_dibaca' 
                    ? 'Semua notifikasi sudah dibaca'
                    : 'Belum ada notifikasi untuk kategori ini'
                }
              </p>
            </motion.div>
          )}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="card p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-start space-x-3">
            <Info className="text-blue-600 dark:text-blue-400 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Tips Notifikasi
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Notifikasi dengan badge 📅 bisa disimpan ke kalender</li>
                <li>• Notifikasi urgent (🚨) perlu perhatian segera</li>
                <li>• Gunakan filter untuk mencari notifikasi tertentu</li>
                <li>• Tap notifikasi untuk menandai sebagai sudah dibaca</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifikasi;