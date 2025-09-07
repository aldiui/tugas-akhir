import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  ClipboardList, 
  MessageCircle, 
  Bell, 
  Info,
  Filter,
  Search,
  Calendar,
  User,
  Clock
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';

const Activity = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Extended activities data
  const allActivities = [
    {
      id: 1,
      type: 'attendance',
      cpmi: 'Siti Nurhaliza',
      message: 'Absen masuk pukul 07:45',
      time: '2 menit yang lalu',
      date: '2025-01-31',
      icon: UserCheck,
      color: 'bg-green-500',
      category: 'Absensi'
    },
    {
      id: 2,
      type: 'piket',
      cpmi: 'Ahmad Fauzi',
      message: 'Mengisi laporan aktivitas piket harian',
      time: '15 menit yang lalu',
      date: '2025-01-31',
      icon: ClipboardList,
      color: 'bg-orange-500',
      category: 'Piket'
    },
    {
      id: 3,
      type: 'message',
      cpmi: 'Dewi Sartika',
      message: 'Mengirim pesan: "Pak, saya izin terlambat 10 menit"',
      time: '30 menit yang lalu',
      date: '2025-01-31',
      icon: MessageCircle,
      color: 'bg-blue-500',
      category: 'Pesan'
    },
    {
      id: 4,
      type: 'notification',
      cpmi: 'Budi Santoso',
      message: 'Menerima notifikasi jadwal interview dengan agency',
      time: '1 jam yang lalu',
      date: '2025-01-31',
      author: 'Admin LPK',
      icon: Bell,
      color: 'bg-purple-500',
      category: 'Notifikasi'
    },
    {
      id: 5,
      type: 'attendance',
      cpmi: 'Rina Wati',
      message: 'Absen pulang pukul 16:30',
      time: '2 jam yang lalu',
      date: '2025-01-31',
      icon: UserCheck,
      color: 'bg-green-500',
      category: 'Absensi'
    },
    {
      id: 6,
      type: 'info',
      cpmi: 'Semua CPMI',
      message: 'Informasi: Libur nasional tanggal 17 Agustus 2025',
      time: '3 jam yang lalu',
      date: '2025-01-31',
      author: 'Pengajar',
      icon: Info,
      color: 'bg-indigo-500',
      category: 'Informasi'
    },
    {
      id: 7,
      type: 'piket',
      cpmi: 'Joko Widodo',
      message: 'Upload foto kegiatan piket di rumah majikan',
      time: '4 jam yang lalu',
      date: '2025-01-31',
      icon: ClipboardList,
      color: 'bg-orange-500',
      category: 'Piket'
    },
    {
      id: 8,
      type: 'message',
      cpmi: 'Sri Mulyani',
      message: 'Mengirim pesan: "Terima kasih atas penjelasan materi hari ini"',
      time: '5 jam yang lalu',
      date: '2025-01-31',
      icon: MessageCircle,
      color: 'bg-blue-500',
      category: 'Pesan'
    },
    {
      id: 9,
      type: 'attendance',
      cpmi: 'Mega Wati',
      message: 'Absen masuk dengan alasan terlambat: Macet di jalan',
      time: '1 hari yang lalu',
      date: '2025-01-30',
      icon: UserCheck,
      color: 'bg-yellow-500',
      category: 'Absensi'
    },
    {
      id: 10,
      type: 'notification',
      cpmi: 'Semua CPMI Kelas A',
      message: 'Notifikasi: Perubahan jadwal pelajaran Bahasa Mandarin',
      time: '1 hari yang lalu',
      date: '2025-01-30',
      author: 'Admin LPK',
      icon: Bell,
      color: 'bg-purple-500',
      category: 'Notifikasi'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'Semua', count: allActivities.length },
    { value: 'attendance', label: 'Absensi', count: allActivities.filter(a => a.type === 'attendance').length },
    { value: 'piket', label: 'Piket', count: allActivities.filter(a => a.type === 'piket').length },
    { value: 'message', label: 'Pesan', count: allActivities.filter(a => a.type === 'message').length },
    { value: 'notification', label: 'Notifikasi', count: allActivities.filter(a => a.type === 'notification').length },
    { value: 'info', label: 'Informasi', count: allActivities.filter(a => a.type === 'info').length }
  ];

  const filteredActivities = allActivities.filter(activity => {
    const matchesFilter = selectedFilter === 'all' || activity.type === selectedFilter;
    const matchesSearch = activity.cpmi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = activity.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hari Ini';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Kemarin';
    } else {
      return date.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <BackHeader title="Aktivitas CPMI" />
      
      <div className="p-4 pb-20">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
            <input
              type="text"
              placeholder="Cari aktivitas atau nama CPMI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl text-light-text-main dark:text-dark-text-main placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedFilter === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main border border-light-border dark:border-dark-border'
                }`}
              >
                <span>{option.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedFilter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-light-bg dark:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary'
                }`}>
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Activities List */}
        <div className="space-y-6">
          {Object.entries(groupedActivities).map(([date, activities], dateIndex) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dateIndex * 0.1 }}
            >
              {/* Date Header */}
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                  {formatDate(date)}
                </h3>
                <div className="flex-1 h-px bg-light-border dark:bg-dark-border"></div>
              </div>

              {/* Activities for this date */}
              <div className="space-y-3">
                {activities.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (dateIndex * 0.1) + (index * 0.05) }}
                      className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Activity Icon */}
                        <div className={`p-3 rounded-xl ${activity.color} flex-shrink-0`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>

                        {/* Activity Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                              <span className="font-medium text-light-text-main dark:text-dark-text-main">
                                {activity.cpmi}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                activity.type === 'attendance' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                activity.type === 'piket' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                                activity.type === 'message' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                activity.type === 'notification' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                                'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
                              }`}>
                                {activity.category}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-light-text-secondary dark:text-dark-text-secondary">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{activity.time}</span>
                            </div>
                          </div>
                          
                          <p className="text-light-text-main dark:text-dark-text-main mb-2">
                            {activity.message}
                          </p>
                          
                          {activity.author && (
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary italic">
                              oleh {activity.author}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-light-card dark:bg-dark-card rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-light-text-secondary dark:text-dark-text-secondary" />
            </div>
            <h3 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
              Tidak ada aktivitas
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Tidak ditemukan aktivitas yang sesuai dengan filter atau pencarian Anda.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Activity;