import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar,
  Clock,
  FileText,
  Camera,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  Building2,
  X,
  Image
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';

const DetailTanggalPiketAdmin = () => {
  const { nama, tanggal } = useParams();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [selectedDate, setSelectedDate] = useState(null);
  
  // State untuk popup gambar
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  // State untuk popup aktivitas detail
  const [showActivityPopup, setShowActivityPopup] = useState(false);
  const [selectedActivityDetail, setSelectedActivityDetail] = useState(null);
  
  // Decode nama dari URL
  let decodedNama = nama;
  let decodedTanggal = tanggal;
  try {
    decodedNama = decodeURIComponent(nama);
    decodedTanggal = decodeURIComponent(tanggal);
    if (decodedNama.includes('%')) {
      decodedNama = decodeURIComponent(decodedNama);
    }
    if (decodedTanggal.includes('%')) {
      decodedTanggal = decodeURIComponent(decodedTanggal);
    }
  } catch (error) {
    console.error('Error decoding parameters:', error);
  }
  
  // Handler untuk popup gambar
  const handleImageClick = (images, activity, index = 0) => {
    setSelectedImages(images);
    setSelectedActivity(activity);
    setCurrentImageIndex(index);
    setShowImagePopup(true);
  };
  
  // Handler untuk navigasi gambar
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selectedImages.length - 1);
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex(prev => prev < selectedImages.length - 1 ? prev + 1 : 0);
  };
  
  // Handler untuk popup aktivitas detail
  const handleActivityClick = (activity) => {
    setSelectedActivityDetail(activity);
    setShowActivityPopup(true);
  };
  
  // Close popups
  const closeImagePopup = () => {
    setShowImagePopup(false);
    setSelectedImages([]);
    setSelectedActivity(null);
    setCurrentImageIndex(0);
  };
  
  const closeActivityPopup = () => {
    setShowActivityPopup(false);
    setSelectedActivityDetail(null);
  };

  // Dummy data riwayat piket per tanggal
  const piketHistory = {
    cpmi: {
      nama: decodedNama || 'Maya Sari',
      kelas: 'Taiwan A',
      pengajar: 'Bu Sari Dewi',
      lokasi: 'Rumah Majikan - Taiwan'
    },
    riwayat: [
      {
        tanggal: '2024-01-15',
        hari: 'Senin',
        totalLaporan: 9,
        totalFoto: 12,
        jamMulai: '06:00',
        jamSelesai: '21:30',
        status: 'lengkap',
        ringkasan: 'Hari pertama piket berjalan dengan baik. Maya menunjukkan adaptasi yang cepat.',
        aktivitasUtama: ['Membantu sarapan', 'Antar jemput anak', 'Belajar bahasa', 'Bantu masak malam']
      },
      {
        tanggal: '2024-01-14',
        hari: 'Minggu',
        totalLaporan: 6,
        totalFoto: 8,
        jamMulai: '07:00',
        jamSelesai: '20:00',
        status: 'lengkap',
        ringkasan: 'Hari libur keluarga, Maya ikut kegiatan rekreasi ke taman dan museum.',
        aktivitasUtama: ['Sarapan keluarga', 'Jalan-jalan ke taman', 'Kunjungi museum', 'Makan malam bersama']
      },
      {
        tanggal: '2024-01-13',
        hari: 'Sabtu',
        totalLaporan: 7,
        totalFoto: 10,
        jamMulai: '06:30',
        jamSelesai: '21:00',
        status: 'lengkap',
        ringkasan: 'Hari Sabtu dengan aktivitas belanja dan persiapan untuk minggu depan.',
        aktivitasUtama: ['Bersih-bersih rumah', 'Belanja groceries', 'Masak bersama', 'Persiapan sekolah']
      },
      {
        tanggal: '2024-01-12',
        hari: 'Jumat',
        totalLaporan: 8,
        totalFoto: 11,
        jamMulai: '06:00',
        jamSelesai: '21:15',
        status: 'lengkap',
        ringkasan: 'Hari kerja normal dengan fokus pada rutinitas harian dan pembelajaran.',
        aktivitasUtama: ['Persiapan sarapan', 'Sekolah anak-anak', 'Kelas bahasa', 'Makan malam']
      },
      {
        tanggal: '2024-01-11',
        hari: 'Kamis',
        totalLaporan: 5,
        totalFoto: 6,
        jamMulai: '06:15',
        jamSelesai: '19:30',
        status: 'terlambat',
        ringkasan: 'Laporan terlambat karena ada kendala teknis dengan aplikasi.',
        aktivitasUtama: ['Sarapan', 'Aktivitas rumah', 'Jemput anak', 'Makan malam']
      },
      {
        tanggal: '2024-01-10',
        hari: 'Rabu',
        totalLaporan: 9,
        totalFoto: 13,
        jamMulai: '05:45',
        jamSelesai: '21:45',
        status: 'lengkap',
        ringkasan: 'Hari pertama piket dengan orientasi lengkap dari keluarga majikan.',
        aktivitasUtama: ['Orientasi rumah', 'Kenalan keluarga', 'Belajar rutinitas', 'Evaluasi hari pertama']
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'lengkap':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'terlambat':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'tidak_lengkap':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'lengkap':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'terlambat':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'tidak_lengkap':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const stats = {
    totalHari: piketHistory.riwayat.length,
    totalLaporan: piketHistory.riwayat.reduce((sum, item) => sum + item.totalLaporan, 0),
    totalFoto: piketHistory.riwayat.reduce((sum, item) => sum + item.totalFoto, 0),
    rataLaporan: Math.round(piketHistory.riwayat.reduce((sum, item) => sum + item.totalLaporan, 0) / piketHistory.riwayat.length * 10) / 10
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Riwayat Piket" />
      
      <div className="p-4 pt-5">
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white mb-6"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold">
              {piketHistory.cpmi.nama.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-xl font-bold">{piketHistory.cpmi.nama}</h1>
              <p className="text-purple-100">{piketHistory.cpmi.kelas} • {piketHistory.cpmi.pengajar}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">{piketHistory.cpmi.lokasi}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-1" />
              <div className="text-lg font-bold">{stats.totalHari}</div>
              <div className="text-xs text-purple-100">Hari</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <FileText className="w-5 h-5 mx-auto mb-1" />
              <div className="text-lg font-bold">{stats.totalLaporan}</div>
              <div className="text-xs text-purple-100">Laporan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <Camera className="w-5 h-5 mx-auto mb-1" />
              <div className="text-lg font-bold">{stats.totalFoto}</div>
              <div className="text-xs text-purple-100">Foto</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <CheckCircle2 className="w-5 h-5 mx-auto mb-1" />
              <div className="text-lg font-bold">{stats.rataLaporan}</div>
              <div className="text-xs text-purple-100">Rata-rata</div>
            </div>
          </div>
        </motion.div>

        {/* Month Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main flex items-center space-x-2">
              <Filter className="w-5 h-5 text-purple-600" />
              <span>Filter Periode</span>
            </h2>
            <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
              <ChevronLeft className="w-5 h-5 text-light-text-main dark:text-dark-text-main" />
            </button>
            <div className="flex-1">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="p-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
              <ChevronRight className="w-5 h-5 text-light-text-main dark:text-dark-text-main" />
            </button>
          </div>
        </motion.div>

        {/* Daily Reports Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Riwayat Harian - {new Date(selectedMonth).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
          </h2>
          
          {piketHistory.riwayat.map((item, index) => (
            <div
              key={item.tanggal}
              onClick={() => handleActivityClick(item)}
              className="bg-light-card dark:bg-dark-card rounded-xl p-5 border border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-purple-500"
            >
              {/* Date Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {new Date(item.tanggal).getDate()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-light-text-main dark:text-dark-text-main">
                      {item.hari}, {new Date(item.tanggal).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <Clock className="w-4 h-4" />
                      <span>{item.jamMulai} - {item.jamSelesai}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status === 'lengkap' ? 'Lengkap' : item.status === 'terlambat' ? 'Terlambat' : 'Tidak Lengkap'}
                  </span>
                  {getStatusIcon(item.status)}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-light-body dark:bg-dark-body rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Laporan</span>
                  </div>
                  <div className="text-xl font-bold text-light-text-main dark:text-dark-text-main">{item.totalLaporan}</div>
                </div>
                <div className="bg-light-body dark:bg-dark-body rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Camera className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Foto</span>
                  </div>
                  <div className="text-xl font-bold text-light-text-main dark:text-dark-text-main">{item.totalFoto}</div>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">Ringkasan:</h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  {item.ringkasan}
                </p>
              </div>

              {/* Main Activities */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">Aktivitas Utama:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.aktivitasUtama.map((aktivitas, aktIndex) => (
                    <span
                      key={aktIndex}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-xs font-medium"
                    >
                      {aktivitas}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  navigate(-1); // Kembali ke halaman detail CPMI
                }}
                className="w-full py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors flex items-center justify-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali ke Detail CPMI</span>
              </button>
            </div>
          ))}
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Ringkasan Periode</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-blue-100 text-sm">Konsistensi Laporan</p>
              <p className="text-xl font-bold">95%</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Kualitas Dokumentasi</p>
              <p className="text-xl font-bold">Sangat Baik</p>
            </div>
          </div>
          
          <p className="text-blue-100 text-sm leading-relaxed">
            Maya menunjukkan konsistensi yang sangat baik dalam melaporkan aktivitas harian. 
            Dokumentasi lengkap dengan foto-foto yang mendukung setiap aktivitas.
          </p>
        </motion.div>
      </div>
      
      {/* Image Popup */}
      {showImagePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeImagePopup}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeImagePopup}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Image */}
            <div className="relative">
              <img
                src={`/images/${selectedImages[currentImageIndex]}`}
                alt={`Foto ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Navigation Buttons */}
              {selectedImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {selectedImages.length}
              </div>
            </div>
            
            {/* Activity Info */}
            {selectedActivity && (
              <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedActivity.tanggal}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {selectedActivity.kegiatan}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Activity Detail Popup */}
      {showActivityPopup && selectedActivityDetail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeActivityPopup}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-light-card dark:bg-dark-card rounded-xl p-6 max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                Detail Aktivitas
              </h3>
              <button
                onClick={closeActivityPopup}
                className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-main dark:hover:text-dark-text-main"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                <Calendar className="w-4 h-4" />
                <span>{selectedActivityDetail.tanggal}</span>
                <Clock className="w-4 h-4 ml-4" />
                <span>{selectedActivityDetail.jamMulai} - {selectedActivityDetail.jamSelesai}</span>
              </div>
              
              <div>
                <h4 className="font-medium text-light-text-main dark:text-dark-text-main mb-2 flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Ringkasan Aktivitas</span>
                </h4>
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm leading-relaxed">
                  {selectedActivityDetail.ringkasan}
                </p>
              </div>
              
              {selectedActivityDetail.aktivitasUtama && (
                <div>
                  <h4 className="font-medium text-light-text-main dark:text-dark-text-main mb-2">Aktivitas Utama:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedActivityDetail.aktivitasUtama.map((aktivitas, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-xs font-medium"
                      >
                        {aktivitas}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-light-border dark:border-dark-border">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-500">{selectedActivityDetail.totalLaporan}</div>
                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Total Laporan</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-500">{selectedActivityDetail.totalFoto}</div>
                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Total Foto</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DetailTanggalPiketAdmin;