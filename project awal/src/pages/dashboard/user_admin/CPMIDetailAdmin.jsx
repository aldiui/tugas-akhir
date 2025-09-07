import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Users,
  Edit3,
  ArrowLeft,
  CheckCircle,
  Clock,
  Plane,
  UserX,
  FileText,
  AlertCircle,
  Building,
  Globe,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  Activity,
  BarChart3
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import BackHeader from '../../../layout/BackHeader';

const CPMIDetailAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [cpmi, setCpmi] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (location.state?.cpmi) {
      setCpmi(location.state.cpmi);
    } else {
      // Redirect back if no CPMI data
      navigate('/dashboard/admin/cpmi-management');
    }
  }, [location.state, navigate]);

  if (!cpmi) {
    return (
      <div className="min-h-screen bg-light-body dark:bg-dark-body flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-light-text-main dark:text-dark-text-main">Memuat data CPMI...</p>
        </div>
      </div>
    );
  }

  const statusOptions = [
    { value: 'Aktif', label: 'Aktif', color: 'green', icon: CheckCircle },
    { value: 'Piket', label: 'Piket', color: 'yellow', icon: Clock },
    { value: 'Terbang', label: 'Terbang', color: 'blue', icon: Plane },
    { value: 'Izin', label: 'Izin', color: 'purple', icon: FileText },
    { value: 'Tidak Aktif', label: 'Mengundurkan Diri', color: 'red', icon: UserX }
  ];

  const lokasiPiketOptions = [
    { id: 'rumah_majikan_1', nama: 'Rumah Majikan - Taipei', alamat: 'Xinyi District, Taipei City' },
    { id: 'rumah_majikan_2', nama: 'Rumah Majikan - Taichung', alamat: 'West District, Taichung City' },
    { id: 'rumah_majikan_3', nama: 'Rumah Majikan - Kaohsiung', alamat: 'Lingya District, Kaohsiung City' },
    { id: 'pabrik_1', nama: 'Pabrik Elektronik - Hsinchu', alamat: 'East District, Hsinchu City' },
    { id: 'pabrik_2', nama: 'Pabrik Tekstil - Taoyuan', alamat: 'Zhongli District, Taoyuan City' },
    { id: 'restoran_1', nama: 'Restoran Taiwan - Tainan', alamat: 'Anping District, Tainan City' },
    { id: 'hotel_1', nama: 'Hotel Mewah - Taipei', alamat: 'Da\'an District, Taipei City' },
    { id: 'peternakan_1', nama: 'Peternakan - Changhua', alamat: 'Changhua City, Changhua County' }
  ];

  const getStatusInfo = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption || { value: status, label: status, color: 'gray', icon: AlertCircle };
  };

  const handleEdit = () => {
    navigate('/dashboard/admin/cpmi-edit', { state: { cpmi } });
  };

  const statusInfo = getStatusInfo(cpmi.status);
  const StatusIcon = statusInfo.icon;

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'training', label: 'Pelatihan', icon: BookOpen },
    { id: 'performance', label: 'Performa', icon: TrendingUp },
    { id: 'documents', label: 'Dokumen', icon: FileText }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-purple-500" />
          Informasi Dasar
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-secondary">Nama Lengkap</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">{cpmi.nama}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-secondary">Email</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">{cpmi.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-secondary">Telepon</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">{cpmi.telepon || 'Belum diisi'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-secondary">Alamat</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">{cpmi.alamat || 'Belum diisi'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <p className="text-sm text-secondary">Tanggal Lahir</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">
                {cpmi.tanggal_lahir ? new Date(cpmi.tanggal_lahir).toLocaleDateString('id-ID') : 'Belum diisi'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-${statusInfo.color}-100 dark:bg-${statusInfo.color}-900/20 rounded-lg flex items-center justify-center`}>
              <StatusIcon className={`w-5 h-5 text-${statusInfo.color}-600 dark:text-${statusInfo.color}-400`} />
            </div>
            <div>
              <p className="text-sm text-secondary">Status</p>
              <p className={`font-medium text-${statusInfo.color}-600 dark:text-${statusInfo.color}-400`}>
                {statusInfo.label}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Class & Training Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-purple-500" />
          Informasi Kelas & Pelatihan
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-secondary">Kelas</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">{cpmi.kelas}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <p className="text-sm text-secondary">Pengajar</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">{cpmi.pengajar}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-secondary">Mulai Pelatihan</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">
                {cpmi.tanggal_mulai_pelatihan ? new Date(cpmi.tanggal_mulai_pelatihan).toLocaleDateString('id-ID') : 'Belum diisi'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-sm text-secondary">Target Keberangkatan</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">
                {cpmi.target_keberangkatan ? new Date(cpmi.target_keberangkatan).toLocaleDateString('id-ID') : 'Belum diisi'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Placement Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-purple-500" />
          Informasi Penempatan
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-secondary">Agency</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">{cpmi.agency || 'Belum diisi'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <p className="text-sm text-secondary">Lokasi Penempatan</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">{cpmi.lokasi_penempatan || 'Belum diisi'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-secondary">Jenis Pekerjaan</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">{cpmi.jenis_pekerjaan || 'Belum diisi'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Status Specific Info */}
      {cpmi.status === 'Piket' && cpmi.lokasi_piket && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Informasi Piket
          </h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Lokasi Piket</p>
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                {lokasiPiketOptions.find(lokasi => lokasi.id === cpmi.lokasi_piket)?.nama || 'Lokasi tidak ditemukan'}
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                {lokasiPiketOptions.find(lokasi => lokasi.id === cpmi.lokasi_piket)?.alamat}
              </p>
            </div>
            
            {cpmi.tanggal_mulai_piket && (
              <div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">Periode Piket</p>
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                  {new Date(cpmi.tanggal_mulai_piket).toLocaleDateString('id-ID')}
                  {cpmi.tanggal_selesai_piket ? (
                    <span> - {new Date(cpmi.tanggal_selesai_piket).toLocaleDateString('id-ID')}</span>
                  ) : (
                    <span> - Tidak terbatas</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {cpmi.status === 'Terbang' && cpmi.tanggal_terbang && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
            <Plane className="w-5 h-5 mr-2" />
            Informasi Keberangkatan
          </h3>
          
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">Tanggal Terbang</p>
            <p className="font-medium text-blue-800 dark:text-blue-200">
              {new Date(cpmi.tanggal_terbang).toLocaleDateString('id-ID')}
            </p>
          </div>
        </motion.div>
      )}

      {(cpmi.status === 'Tidak Aktif' || cpmi.status === 'Izin') && cpmi.keterangan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`bg-gradient-to-br ${cpmi.status === 'Tidak Aktif' ? 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700' : 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700'} border rounded-xl p-6`}
        >
          <h3 className={`text-lg font-semibold ${cpmi.status === 'Tidak Aktif' ? 'text-red-800 dark:text-red-200' : 'text-purple-800 dark:text-purple-200'} mb-4 flex items-center`}>
            {cpmi.status === 'Tidak Aktif' ? <UserX className="w-5 h-5 mr-2" /> : <FileText className="w-5 h-5 mr-2" />}
            Keterangan {cpmi.status}
          </h3>
          
          <div>
            <p className={`text-sm ${cpmi.status === 'Tidak Aktif' ? 'text-red-700 dark:text-red-300' : 'text-purple-700 dark:text-purple-300'}`}>Keterangan</p>
            <p className={`font-medium ${cpmi.status === 'Tidak Aktif' ? 'text-red-800 dark:text-red-200' : 'text-purple-800 dark:text-purple-200'}`}>
              {cpmi.keterangan}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderTrainingTab = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
          Progress Pelatihan
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">Bahasa Mandarin Dasar</p>
                <p className="text-sm text-green-600 dark:text-green-400">Selesai - 95%</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-600 dark:text-green-400">40 jam</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200">Keterampilan Rumah Tangga</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Sedang Berlangsung - 75%</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600 dark:text-blue-400">30/40 jam</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/20 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">Budaya Taiwan</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Belum Dimulai - 0%</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">0/20 jam</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
          Statistik Kehadiran
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">95%</div>
            <div className="text-sm text-green-700 dark:text-green-300">Kehadiran</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">87</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Hari Hadir</div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">3</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">Terlambat</div>
          </div>
          
          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">2</div>
            <div className="text-sm text-red-700 dark:text-red-300">Tidak Hadir</div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-purple-500" />
          Penilaian Keterampilan
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-light-text-main dark:text-dark-text-main">Bahasa Mandarin</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">85%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-light-text-main dark:text-dark-text-main">Keterampilan Memasak</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">78%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-light-text-main dark:text-dark-text-main">Kebersihan Rumah</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">92%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-light-text-main dark:text-dark-text-main">Perawatan Lansia</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">70%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-purple-500" />
          Dokumen Persyaratan
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-800 dark:text-green-200">KTP</span>
            </div>
            <span className="text-sm text-green-600 dark:text-green-400">Lengkap</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-800 dark:text-green-200">Kartu Keluarga</span>
            </div>
            <span className="text-sm text-green-600 dark:text-green-400">Lengkap</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-800 dark:text-green-200">Ijazah Terakhir</span>
            </div>
            <span className="text-sm text-green-600 dark:text-green-400">Lengkap</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span className="text-yellow-800 dark:text-yellow-200">Sertifikat Kesehatan</span>
            </div>
            <span className="text-sm text-yellow-600 dark:text-yellow-400">Proses</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="text-red-800 dark:text-red-200">Paspor</span>
            </div>
            <span className="text-sm text-red-600 dark:text-red-400">Belum</span>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Detail CPMI" />
      
      <div className="p-4 pb-20">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{cpmi.nama}</h1>
                <p className="text-purple-100">{cpmi.id} • {cpmi.kelas}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <StatusIcon className="w-4 h-4" />
                  <span className="text-sm">{statusInfo.label}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleEdit}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title="Edit CPMI"
            >
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-light-card dark:bg-dark-card rounded-lg p-1">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'text-light-text-main dark:text-dark-text-main hover:bg-light-body dark:hover:bg-dark-body'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'training' && renderTrainingTab()}
            {activeTab === 'performance' && renderPerformanceTab()}
            {activeTab === 'documents' && renderDocumentsTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CPMIDetailAdmin;