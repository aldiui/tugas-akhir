import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Calendar,
  MessageSquare,
  Settings,
  Bell,
  TrendingUp,
  AlertTriangle,
  Clock,
  MapPin,
  BarChart3,
  UserPlus,
  BookOpen,
  Activity,
  FileText,
  Shield,
  User,
  ClipboardList,
  Send,
  Info
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useCPMI } from '../../../context/CPMIContext.js';
import logo from '../../../assets/logohorizontal.png';

const HomeAdmin = () => {
  const { isDark } = useTheme();
  const { cpmiList } = useCPMI() || {};
  const safeCpmiList = useMemo(() => {
    if (!cpmiList || !Array.isArray(cpmiList)) {
      return [];
    }
    return cpmiList;
  }, [cpmiList]);
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    totalCPMI: 0,
    activeCPMI: 0,
    piketCPMI: 0,
    totalPengajar: 0,
    todayAttendance: 0,
    pendingReports: 0,
    totalMessages: 0,
    pendingPiketReports: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Calculate statistics from dummy data
    if (!safeCpmiList || !Array.isArray(safeCpmiList)) {
      setStats({
        totalCPMI: 0,
        activeCPMI: 0,
        piketCPMI: 0,
        totalPengajar: 8,
        todayAttendance: 0,
        pendingReports: 0
      });
      return;
    }
    
    const totalCPMI = safeCpmiList.length;
    const activeCPMI = safeCpmiList.filter(cpmi => cpmi && cpmi.status === 'Aktif').length;
    const piketCPMI = safeCpmiList.filter(cpmi => cpmi && cpmi.status === 'Piket').length;
    const totalPengajar = 8; // Dummy data
    const todayAttendance = Math.floor(Math.random() * (totalCPMI + 1));
    const pendingReports = Math.floor(Math.random() * 10);
    const totalMessages = Math.floor(Math.random() * 50) + 20;
    const pendingPiketReports = Math.floor(Math.random() * 15) + 5;

    setStats({
      totalCPMI,
      activeCPMI,
      piketCPMI,
      totalPengajar,
      todayAttendance,
      pendingReports,
      totalMessages,
      pendingPiketReports
    });
  }, [safeCpmiList]);

  const quickActions = [
    {
      icon: Users,
      title: 'Kelola CPMI',
      subtitle: 'Manajemen data CPMI',
      color: 'bg-blue-500',
      path: '/dashboard/admin/manajemen-cpmi'
    },
    {
      icon: MessageSquare,
      title: 'Chat Admin',
      subtitle: 'Komunikasi dengan tim',
      color: 'bg-green-500',
      path: '/dashboard/admin/chat'
    },
    {
      icon: Send,
      title: 'Broadcast',
      subtitle: 'Kirim pesan broadcast',
      color: 'bg-orange-500',
      path: '/dashboard/admin/broadcast'
    },
    {
      icon: FileText,
      title: 'Laporan Menu',
      subtitle: 'Akses semua laporan',
      color: 'bg-purple-500',
      path: '/dashboard/admin/laporan-menu'
    },
    {
      icon: FileText,
      title: 'Kelola Informasi',
      subtitle: 'Manajemen informasi',
      color: 'bg-purple-500',
      path: '/dashboard/admin/informasi'
    },
    {
      icon: BarChart3,
      title: 'Laporan Absen',
      subtitle: 'Data kehadiran CPMI',
      color: 'bg-indigo-500',
      path: '/dashboard/admin/laporan-absen'
    },
    {
      icon: ClipboardList,
      title: 'Laporan Piket',
      subtitle: 'Aktivitas piket harian',
      color: 'bg-teal-500',
      path: '/dashboard/admin/laporan-piket'
    },
    {
      icon: Calendar,
      title: 'Riwayat Absensi',
      subtitle: 'History kehadiran',
      color: 'bg-cyan-500',
      path: '/dashboard/admin/riwayat-absensi'
    },
    {
      icon: Settings,
      title: 'Pengaturan',
      subtitle: 'Konfigurasi sistem',
      color: 'bg-gray-500',
      path: '/dashboard/admin/settings'
    },
    {
      icon: MapPin,
      title: 'Lokasi',
      subtitle: 'Pengaturan lokasi',
      color: 'bg-red-500',
      path: '/dashboard/admin/location-settings'
    },
    {
      icon: Shield,
      title: 'Izin Akses',
      subtitle: 'Manajemen permission',
      color: 'bg-yellow-500',
      path: '/dashboard/admin/permission-settings'
    },
    {
      icon: User,
      title: 'Profil Detail',
      subtitle: 'Informasi admin',
      color: 'bg-pink-500',
      path: '/dashboard/admin/profile-detail'
    }
  ];

  const recentActivities = [
    {
      icon: UserCheck,
      title: 'CPMI baru terdaftar',
      subtitle: 'Siti Aminah - Kelas A',
      time: '2 jam lalu',
      color: 'text-green-500'
    },
    {
      icon: ClipboardList,
      title: 'Laporan piket baru',
      subtitle: `${stats.pendingPiketReports} laporan menunggu verifikasi`,
      time: '3 jam lalu',
      color: 'text-orange-500'
    },
    {
      icon: MessageSquare,
      title: 'Pesan chat masuk',
      subtitle: `${stats.totalMessages} pesan dari pengajar & CPMI`,
      time: '4 jam lalu',
      color: 'text-blue-500'
    },
    {
      icon: BarChart3,
      title: 'Laporan absensi harian',
      subtitle: `${stats.todayAttendance} dari ${stats.totalCPMI} CPMI hadir`,
      time: '5 jam lalu',
      color: 'text-purple-500'
    },
    {
      icon: AlertTriangle,
      title: 'Pengaturan lokasi diperbarui',
      subtitle: 'Radius absensi kelas B disesuaikan',
      time: '6 jam lalu',
      color: 'text-yellow-500'
    },
    {
      icon: Send,
      title: 'Broadcast terkirim',
      subtitle: 'Pengumuman interview Taiwan',
      time: '8 jam lalu',
      color: 'text-indigo-500'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pb-20`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <div>
                <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Admin Panel
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  LPK Bahana Mega Prestasi
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {currentTime.toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentTime.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total CPMI
                </p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stats.totalCPMI}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  CPMI Aktif
                </p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stats.activeCPMI}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  CPMI Piket
                </p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stats.piketCPMI}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Activity className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Pengajar
                </p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stats.totalPengajar}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Pesan
                </p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stats.totalMessages}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Laporan Tertunda
                </p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stats.pendingPiketReports}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <ClipboardList className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(action.path)}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-left hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`${action.color} p-2 rounded-lg`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {action.title}
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {action.subtitle}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Aktivitas Terbaru
          </h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {activity.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {activity.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;

