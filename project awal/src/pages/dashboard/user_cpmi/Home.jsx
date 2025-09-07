import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  BookOpen,
  Users,
  Target,
  Bell,
  ArrowRight,
  Eye,
  MapPin,
  FileText,
  MessageCircle
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import logoHorizontal from '../../../assets/logohorizontal.png';

const Home = () => {
  const navigate = useNavigate();
  const { 
    cpmi, 
    jadwal, 
    getCurrentTime, 
    isLate, 
    isInClassRadius, 
    getDistanceFromClass,
    absenMasuk,
    absenPulang,
    isAbsenMasuk,
    isAbsenPulang,
    jam_operasional,
    notifikasi
  } = useCPMI();

  const [showAlasanTelat, setShowAlasanTelat] = useState(false);
  const [alasanTelat, setAlasanTelat] = useState('');
  const [isSubmittingAbsen, setIsSubmittingAbsen] = useState(false);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  // Get quick action cards
  const getQuickActions = () => {
    const actions = [];
    
    // For Piket status, show different actions
    if (cpmi.status === 'Piket') {
      actions.push(
        {
          id: 'piket-laporan',
          title: 'Laporan',
          icon: FileText,
          path: '/dashboard/cpmi/piket-laporan',
          color: 'bg-blue-500'
        },
        {
          id: 'chat',
          title: 'Chat',
          icon: MessageCircle,
          path: '/dashboard/cpmi/chat',
          color: 'bg-green-500'
        },
        {
          id: 'notifikasi',
          title: 'Info',
          icon: Bell,
          path: '/dashboard/cpmi/notifikasi',
          color: 'bg-orange-500',
          badge: notifikasi?.filter(n => !n.dibaca).length || 0
        }
      );
    } else {
      // For other statuses, show regular actions
      actions.push(
        {
          id: 'jadwal',
          title: 'Kelas',
          icon: Calendar,
          path: '/dashboard/cpmi/jadwal',
          color: 'bg-blue-500',
          show: cpmi.status === 'Aktif' || cpmi.status === 'Izin'
        },
        {
          id: 'pelajaran',
          title: 'Matpel',
          icon: BookOpen,
          path: '/dashboard/cpmi/pelajaran',
          color: 'bg-green-500',
          show: cpmi.status === 'Aktif' || cpmi.status === 'Izin'
        },
        {
          id: 'notifikasi',
          title: 'Info',
          icon: Bell,
          path: '/dashboard/cpmi/notifikasi',
          color: 'bg-orange-500',
          show: cpmi.status !== 'Terbang',
          badge: notifikasi?.filter(n => !n.dibaca).length || 0
        }
      );
    }

    return cpmi.status === 'Piket' ? actions : actions.filter(action => action.show);
  };

  const currentTime = getCurrentTime();
  const distance = getDistanceFromClass();
  const inRadius = isInClassRadius();
  const isLateNow = isLate();

  const handleAbsenMasuk = async () => {
    if (isLateNow && !alasanTelat.trim()) {
      setShowAlasanTelat(true);
      return;
    }

    setIsSubmittingAbsen(true);
    
    // Simulate API call
    setTimeout(() => {
      absenMasuk(alasanTelat);
      setShowAlasanTelat(false);
      setAlasanTelat('');
      setIsSubmittingAbsen(false);
    }, 1000);
  };

  const handleAbsenPulang = async () => {
    setIsSubmittingAbsen(true);
    
    // Simulate API call
    setTimeout(() => {
      absenPulang();
      setIsSubmittingAbsen(false);
    }, 1000);
  };



  const getTodaySchedule = () => {
    return jadwal.mata_pelajaran.slice(0, 3); // Show first 3 classes
  };

  // Don't show absensi features for certain statuses
  const showAbsensiFeatures = cpmi.status === 'Aktif';
  const showJadwalInfo = cpmi.status === 'Aktif' || cpmi.status === 'Izin';
  const showPiketFeatures = cpmi.status === 'Piket';

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <div className="p-4 space-y-6 pt-8">
        {/* Greeting Card - Credit Card Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 dark:from-indigo-600 dark:via-indigo-700 dark:to-indigo-800 p-6 text-white shadow-xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/20"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-white/10"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">{getGreeting()}</h1>
                <p className="text-primary-100 text-sm">{cpmi.nama}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <img 
                  src={logoHorizontal} 
                  alt="LPK Bahana Mega Prestasi" 
                  className="h-6 w-auto object-contain opacity-80"
                />
                <div className="text-right">
                  <p className="text-primary-100 text-xs mb-1">STATUS</p>
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl">
                      {cpmi.status === 'Aktif' && '📚'}
                      {cpmi.status === 'Piket' && '🏠'}
                      {cpmi.status === 'Terbang' && '✈️'}
                      {cpmi.status === 'Izin' && '🏥'}
                      {cpmi.status === 'Tidak Aktif' && '⏸️'}
                    </div>
                    <span className="font-semibold">{cpmi.status}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-primary-100 text-xs mb-1">TANGGAL</p>
                <p className="font-mono text-sm">
                  {new Date().toLocaleDateString('id-ID', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short'
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-primary-100 text-xs mb-1">NO. REG</p>
                <p className="font-mono text-sm">{cpmi.no_register}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        {getQuickActions().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-base font-semibold text-light-text-main dark:text-dark-text-main px-2">
              Menu
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {getQuickActions().map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (index * 0.1), duration: 0.3 }}
                    onClick={() => navigate(action.path)}
                    className="card p-4 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`relative w-12 h-12 ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <IconComponent className="text-white" size={20} />
                        {action.badge > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {action.badge > 9 ? '9+' : action.badge}
                            </span>
                          </div>
                        )}
                      </div>
                      <h4 className="font-medium text-sm text-light-text-main dark:text-dark-text-main">
                        {action.title}
                      </h4>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Absensi Card - Only for Aktif status */}
        {showAbsensiFeatures && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
              <Clock className="mr-2" size={20} />
              Absensi Hari Ini
            </h3>
            
            {/* Current Time & Location */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-light-body dark:bg-dark-body rounded-lg">
                <p className="text-xs text-secondary mb-1">Waktu Sekarang</p>
                <p className="font-mono text-lg font-bold text-light-text-main dark:text-dark-text-main">
                  {currentTime}
                </p>
              </div>
              <div className="text-center p-3 bg-light-body dark:bg-dark-body rounded-lg">
                <p className="text-xs text-secondary mb-1">Jarak ke Kelas</p>
                <p className={`font-bold text-lg ${
                  inRadius ? 'text-green-600' : 'text-red-600'
                }`}>
                  {distance ? `${distance}m` : 'Mencari...'}
                </p>
              </div>
            </div>

            {/* Location Status */}
            <div className={`p-3 rounded-lg mb-4 ${
              inRadius 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-center space-x-2">
                {inRadius ? (
                  <CheckCircle className="text-green-600" size={18} />
                ) : (
                  <XCircle className="text-red-600" size={18} />
                )}
                <p className={`text-sm ${
                  inRadius ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                }`}>
                  {inRadius 
                    ? 'Dalam radius kelas' 
                    : 'Di luar radius kelas'
                  }
                </p>
              </div>
            </div>

            {/* Late Warning */}
            {isLateNow && !isAbsenMasuk && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="text-yellow-600" size={18} />
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Terlambat! Batas: {jam_operasional.batas_telat}
                  </p>
                </div>
              </div>
            )}

            {/* Alasan Telat Form */}
            {showAlasanTelat && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
              >
                <label className="block text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  Alasan Telat:
                </label>
                <textarea
                  value={alasanTelat}
                  onChange={(e) => setAlasanTelat(e.target.value)}
                  className="w-full p-3 border border-yellow-300 dark:border-yellow-700 rounded-lg bg-white dark:bg-dark-card text-light-text-main dark:text-dark-text-main"
                  rows={3}
                  placeholder="Alasan telat..."
                />
              </motion.div>
            )}

            {/* Absen Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAbsenMasuk}
                disabled={!inRadius || isAbsenMasuk || isSubmittingAbsen}
                className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isAbsenMasuk
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200 cursor-not-allowed'
                    : !inRadius
                    ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                    : 'btn-primary hover:scale-105'
                }`}
              >
                {isSubmittingAbsen ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                ) : isAbsenMasuk ? (
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle size={18} />
                    <span>Sudah Masuk</span>
                  </div>
                ) : (
                  'Absen Masuk'
                )}
              </button>
              
              <button
                onClick={handleAbsenPulang}
                disabled={!inRadius || !isAbsenMasuk || isAbsenPulang || isSubmittingAbsen}
                className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isAbsenPulang
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200 cursor-not-allowed'
                    : !inRadius || !isAbsenMasuk
                    ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                    : 'btn-primary hover:scale-105'
                }`}
              >
                {isAbsenPulang ? (
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle size={18} />
                    <span>Sudah Pulang</span>
                  </div>
                ) : (
                  'Absen Pulang'
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Piket Section - Only for Piket status */}
        {showPiketFeatures && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main flex items-center">
                <MapPin className="mr-2" size={20} />
                Status Piket Aktif
              </h3>
              <div className="text-2xl">🏠</div>
            </div>

            {/* Piket Info */}
            <div className="p-4 rounded-lg mb-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/40 rounded-lg flex items-center justify-center mt-1">
                  <span className="text-lg">📋</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                    Status Piket Aktif
                  </h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">
                    Isi laporan aktivitas harian sebagai bukti kegiatan magang.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard/cpmi/piket-laporan')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-4 px-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center space-x-3"
              >
                <FileText size={20} />
                <span>Buat Laporan Harian</span>
                <ArrowRight size={16} />
              </button>
              

            </div>
          </motion.div>
        )}

        {/* Today's Schedule - Only for Aktif and Izin */}
        {showJadwalInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-light-text-main dark:text-dark-text-main flex items-center">
                <Calendar className="mr-2" size={18} />
                Jadwal Hari Ini
              </h3>
              <button 
                onClick={() => navigate('/dashboard/cpmi/jadwal')}
                className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                <Eye size={16} className="mr-1" />
                Lihat Semua
              </button>
            </div>
            
            <div className="space-y-3">
              {getTodaySchedule().map((pelajaran, index) => (
                <div 
                  key={pelajaran.id} 
                  className="flex items-center space-x-3 p-3 bg-light-body dark:bg-dark-body rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => navigate('/dashboard/cpmi/jadwal/detail', { state: { pelajaran } })}
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-primary-600 dark:text-primary-400" size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-light-text-main dark:text-dark-text-main">
                      {pelajaran.nama}
                    </h4>
                    <p className="text-xs text-secondary">
                      {pelajaran.jam_mulai} - {pelajaran.jam_selesai} • {pelajaran.pengajar}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      pelajaran.status === 'Berlangsung' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {pelajaran.status}
                    </div>
                    <ArrowRight size={14} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="card p-4 text-center">
            <Users className="mx-auto mb-2 text-primary-600 dark:text-primary-400" size={24} />
            <p className="text-sm text-secondary mb-1">Kelas</p>
            <p className="font-semibold text-light-text-main dark:text-dark-text-main">
              {cpmi.kelas}
            </p>
          </div>
          
          <div className="card p-4 text-center">
            <Target className="mx-auto mb-2 text-primary-600 dark:text-primary-400" size={24} />
            <p className="text-sm text-secondary mb-1">Target Terbang</p>
            <p className="font-semibold text-light-text-main dark:text-dark-text-main text-xs">
              {new Date(cpmi.target_keberangkatan).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;