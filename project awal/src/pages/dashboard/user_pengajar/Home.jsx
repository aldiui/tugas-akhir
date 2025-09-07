import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  ClipboardList, 
  MessageCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowRight,
  UserCheck,
  Eye,
  Filter,
  Megaphone,
  MapPin,
  User,
  Send,
  Bell,
  Info
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useCPMI } from '../../../context/CPMIContext';
import logoHorizontal from '../../../assets/logohorizontal.png';
import scheduleData from '../../../data/dummy_jadwal.json';
import ScheduleDetailPopup from '../../../components/ScheduleDetailPopup';
import usePopup from '../../../hooks/usePopup';

const HomePengajar = () => {
  const { isDarkMode } = useTheme();
  const { cpmiList } = useCPMI();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const { isOpen, openPopup, closePopup } = usePopup();
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate statistics
  const safeCpmiList = cpmiList || [];
  const totalCPMI = safeCpmiList.length;
  const activeCPMI = safeCpmiList.filter(cpmi => cpmi && cpmi.status === 'Aktif').length;
  const piketCPMI = safeCpmiList.filter(cpmi => cpmi && cpmi.status === 'Piket').length;
  const terbangCPMI = safeCpmiList.filter(cpmi => cpmi && cpmi.status === 'Terbang').length;

  // Get today's schedule from dummy data
  const todaySchedule = scheduleData.jadwal_harian.mata_pelajaran.map(pelajaran => ({
    id: pelajaran.id,
    time: `${pelajaran.jam_mulai} - ${pelajaran.jam_selesai}`,
    subject: pelajaran.nama,
    room: pelajaran.ruang,
    teacher: pelajaran.pengajar,
    material: pelajaran.materi,
    status: pelajaran.status,
    students: Math.floor(Math.random() * 10) + 15 // Random students 15-25
  }));

  const quickActions = [
    {
      title: 'Jadwal Hari Ini',
      description: `${todaySchedule.length} kelas dijadwalkan`,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      path: '/dashboard/pengajar/jadwal'
    },
    {
      title: 'Kelola CPMI',
      description: `${safeCpmiList.length} CPMI terdaftar`,
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      path: '/dashboard/pengajar/cpmi-management'
    },
    {
      title: 'Informasi & Pengumuman',
      description: 'Buat dan kelola informasi',
      icon: Megaphone,
      color: 'from-green-500 to-green-600',
      path: '/dashboard/pengajar/informasi'
    }
  ];

  // Handle schedule detail preview
  const handleScheduleDetail = (schedule) => {
    setSelectedSchedule(schedule);
    openPopup();
  };

  // Handle view all activities
  const handleViewAllActivities = () => {
    navigate('/dashboard/pengajar/activity');
  };

  const recentActivities = [
    {
      type: 'absen',
      message: 'Ahmad Rizki melakukan absen masuk',
      time: '5 menit lalu',
      icon: UserCheck,
      color: 'text-green-500',
      cpmi: 'Ahmad Rizki'
    },
    {
      type: 'piket',
      message: 'Siti Nurhaliza mengisi laporan piket harian',
      time: '15 menit lalu',
      icon: ClipboardList,
      color: 'text-orange-500',
      cpmi: 'Siti Nurhaliza'
    },
    {
      type: 'chat',
      message: 'Budi Santoso mengirim pesan ke pengajar',
      time: '25 menit lalu',
      icon: MessageCircle,
      color: 'text-blue-500',
      cpmi: 'Budi Santoso'
    },
    {
      type: 'informasi',
      message: 'Informasi baru: Interview Golden Bridge Agency',
      time: '30 menit lalu',
      icon: Bell,
      color: 'text-purple-500',
      author: 'Admin'
    },
    {
      type: 'absen',
      message: 'Dewi Sartika melakukan absen pulang',
      time: '45 menit lalu',
      icon: UserCheck,
      color: 'text-green-500',
      cpmi: 'Dewi Sartika'
    },
    {
      type: 'piket',
      message: 'Andi Wijaya mengisi laporan aktivitas piket',
      time: '1 jam lalu',
      icon: ClipboardList,
      color: 'text-orange-500',
      cpmi: 'Andi Wijaya'
    },
    {
      type: 'informasi',
      message: 'Pengumuman: Medical Check-up Batch 15',
      time: '2 jam lalu',
      icon: Info,
      color: 'text-indigo-500',
      author: 'Pengajar'
    }
  ];

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white p-4 sm:p-6 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between max-w-7xl mx-auto"
        >
          {/* Logo Only */}
          <div className="flex justify-center w-full">
            <div className="flex-shrink-0">
              <img 
                src={logoHorizontal} 
                alt="LPK Bahana Mega Prestasi" 
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-6 space-y-6">
        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-light-text-main dark:text-dark-text-main">{totalCPMI}</p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Total CPMI</p>
              </div>
            </div>
          </div>

          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-light-text-main dark:text-dark-text-main">{activeCPMI}</p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Aktif</p>
              </div>
            </div>
          </div>

          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <ClipboardList className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-light-text-main dark:text-dark-text-main">{piketCPMI}</p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Piket</p>
              </div>
            </div>
          </div>

          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-light-text-main dark:text-dark-text-main">{terbangCPMI}</p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Terbang</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-light-text-main dark:text-dark-text-main mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(action.path)}
                  className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-200 text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-gradient-to-r ${action.color} rounded-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-light-text-main dark:text-dark-text-main">{action.title}</h3>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{action.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Today's Schedule Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-light-text-main dark:text-dark-text-main">Jadwal Hari Ini</h2>
            <button
              onClick={() => navigate('/dashboard/pengajar/jadwal')}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {todaySchedule.slice(0, 3).map((schedule, index) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => handleScheduleDetail(schedule)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      schedule.status === 'Berlangsung' ? 'bg-green-100 dark:bg-green-900/30' :
                      schedule.status === 'Akan Datang' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      'bg-gray-100 dark:bg-gray-900/30'
                    }`}>
                      <Clock className={`w-4 h-4 ${
                        schedule.status === 'Berlangsung' ? 'text-green-600 dark:text-green-400' :
                        schedule.status === 'Akan Datang' ? 'text-blue-600 dark:text-blue-400' :
                        'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-light-text-main dark:text-dark-text-main">{schedule.subject}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          schedule.status === 'Berlangsung' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          schedule.status === 'Akan Datang' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                          {schedule.status}
                        </span>
                      </div>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                        {schedule.time}
                      </p>
                    </div>
                  </div>
                  <Eye className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-light-text-main dark:text-dark-text-main">Aktivitas Terbaru</h2>
            <button
              onClick={handleViewAllActivities}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.slice(0, 5).map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-gray-100 dark:bg-gray-800 rounded-lg`}>
                      <IconComponent className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main">{activity.message}</p>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">{activity.time}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Schedule Detail Popup */}
       <ScheduleDetailPopup
         isOpen={isOpen}
         onClose={closePopup}
         scheduleData={selectedSchedule}
       />
    </div>
  );
};

export default HomePengajar;