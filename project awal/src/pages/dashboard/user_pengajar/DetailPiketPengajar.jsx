import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Camera,
  User,
  FileText,
  Image,
  X,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const DetailPiketPengajar = () => {
  const { theme } = useTheme();
  const { cpmiList } = useCPMI();
  const location = useLocation();
  const navigate = useNavigate();
  const { nama } = useParams();
  
  // State untuk popup gambar
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  // State untuk popup aktivitas
  const [showActivityPopup, setShowActivityPopup] = useState(false);
  const [selectedActivityDetail, setSelectedActivityDetail] = useState(null);
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const periodFilter = queryParams.get('period') || 'hari';
  const startDate = queryParams.get('start');
  const endDate = queryParams.get('end');
  
  // Decode nama dari URL (handle double encoding)
  let decodedNama = nama;
  try {
    decodedNama = decodeURIComponent(nama);
    // Handle double encoding
    if (decodedNama.includes('%')) {
      decodedNama = decodeURIComponent(decodedNama);
    }
  } catch (error) {
    console.error('Error decoding nama:', error);
  }
  
  // Cari data CPMI berdasarkan nama
  const cpmiData = cpmiList.find(cpmi => cpmi.nama === decodedNama);
  
  // Debug log
  console.log('URL nama:', nama);
  console.log('Decoded nama:', decodedNama);
  console.log('CPMI Data found:', cpmiData);
  console.log('Available CPMI names:', cpmiList.map(c => c.nama));

  // Generate dummy data piket berdasarkan filter
  const generatePiketData = () => {
    if (!cpmiData) return [];
    
    const baseActivities = [
      {
        waktu: '06:00',
        kegiatan: 'Memulai hari dengan membersihkan rumah, menyapu halaman depan dan mempersiapkan sarapan untuk keluarga majikan.',
        foto: ['foto1.jpg', 'foto2.jpg']
      },
      {
        waktu: '08:00',
        kegiatan: 'Membantu ibu majikan menyiapkan sarapan tradisional Taiwan. Belajar memasak congee dan dim sum.',
        foto: ['foto3.jpg']
      },
      {
        waktu: '10:00',
        kegiatan: 'Membersihkan dapur dan ruang makan setelah sarapan. Mencuci piring dan peralatan masak.',
        foto: ['foto4.jpg', 'foto5.jpg', 'foto6.jpg']
      },
      {
        waktu: '12:00',
        kegiatan: 'Menyiapkan makan siang dan membantu menyajikan untuk keluarga. Belajar resep masakan lokal.',
        foto: ['foto7.jpg']
      },
      {
        waktu: '14:00',
        kegiatan: 'Mencuci dan menyetrika pakaian keluarga. Belajar cara menggunakan mesin cuci modern.',
        foto: ['foto8.jpg', 'foto9.jpg']
      },
      {
        waktu: '16:00',
        kegiatan: 'Menjaga dan bermain dengan anak-anak majikan di taman. Mengajarkan bahasa Indonesia.',
        foto: ['foto10.jpg']
      },
      {
        waktu: '18:00',
        kegiatan: 'Membantu menyiapkan makan malam dan membereskan meja setelah makan.',
        foto: ['foto11.jpg']
      },
      {
        waktu: '20:00',
        kegiatan: 'Membantu anak-anak mengerjakan PR dan mempersiapkan tidur.',
        foto: ['foto12.jpg', 'foto13.jpg']
      }
    ];
    
    const data = [];
    const today = new Date();
    let startDateObj, endDateObj;
    
    // Tentukan rentang tanggal berdasarkan filter
    switch (periodFilter) {
      case 'hari':
        startDateObj = new Date(today);
        endDateObj = new Date(today);
        break;
      case 'minggu':
        startDateObj = new Date(today);
        startDateObj.setDate(today.getDate() - 6); // 7 hari terakhir
        endDateObj = new Date(today);
        break;
      case 'bulan':
        startDateObj = new Date(today);
        startDateObj.setDate(today.getDate() - 29); // 30 hari terakhir
        endDateObj = new Date(today);
        break;
      case 'custom':
        if (startDate && endDate) {
          startDateObj = new Date(startDate);
          endDateObj = new Date(endDate);
        } else {
          startDateObj = new Date(today);
          endDateObj = new Date(today);
        }
        break;
      default:
        startDateObj = new Date(today);
        endDateObj = new Date(today);
    }
    
    // Generate data untuk setiap hari dalam rentang
    const currentDate = new Date(startDateObj);
    while (currentDate <= endDateObj) {
      const dateStr = currentDate.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Random number of activities per day (4-8)
      const numActivities = Math.floor(Math.random() * 5) + 4;
      const dayActivities = baseActivities.slice(0, numActivities).map((activity, index) => ({
        ...activity,
        id: `${currentDate.getTime()}_${index}`,
        tanggal: dateStr,
        tanggalISO: currentDate.toISOString().split('T')[0]
      }));
      
      data.push(...dayActivities);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return data.sort((a, b) => new Date(b.tanggalISO) - new Date(a.tanggalISO));
  };
  
  const piketData = generatePiketData();
  
  // Group data by date
  const groupedData = piketData.reduce((acc, item) => {
    if (!acc[item.tanggal]) {
      acc[item.tanggal] = [];
    }
    acc[item.tanggal].push(item);
    return acc;
  }, {});
  
  console.log('Piket Data:', piketData);
  console.log('Grouped Data:', groupedData);
  
  // Handle image popup
  const handleImageClick = (images, activity, index = 0) => {
    setSelectedImages(images);
    setSelectedActivity(activity);
    setCurrentImageIndex(index);
    setShowImagePopup(true);
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
  };
  
  // Fungsi untuk popup aktivitas
  const handleActivityClick = (activity) => {
    setSelectedActivityDetail(activity);
    setShowActivityPopup(true);
  };
  
  // Fungsi untuk memotong teks aktivitas
  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Fungsi untuk navigasi ke detail tanggal
  const handleDateClick = (tanggal) => {
    const encodedNama = encodeURIComponent(decodedNama);
    const encodedTanggal = encodeURIComponent(tanggal);
    navigate(`/dashboard/pengajar/laporan-piket/detail/${encodedNama}/tanggal/${encodedTanggal}`);
  };
  
  // Get period display text
  const getPeriodText = () => {
    switch (periodFilter) {
      case 'hari': return 'Hari Ini';
      case 'minggu': return 'Minggu Ini';
      case 'bulan': return 'Bulan Ini';
      case 'custom': return 'Periode Custom';
      default: return 'Hari Ini';
    }
  };

  if (!cpmiData) {
    return (
      <div className="min-h-screen bg-light-body dark:bg-dark-body">
        <BackHeader title="Detail Laporan Piket" />
        <div className="p-4 pt-5 pb-24">
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
              Data tidak ditemukan
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Silakan kembali ke halaman sebelumnya
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title={`Laporan ${decodedNama}`} />
      
      <div className="p-4 pt-5 pb-24">
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-6"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-xl">
              {decodedNama.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-light-text-main dark:text-dark-text-main mb-1">
                {decodedNama}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{cpmiData.alamat || 'Rumah Majikan - Taiwan'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{getPeriodText()}</span>
                </div>
              </div>
              {/* Period Info */}
              <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                {periodFilter === 'custom' && startDate && endDate && (
                  <span>{new Date(startDate).toLocaleDateString('id-ID')} - {new Date(endDate).toLocaleDateString('id-ID')}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-light-body dark:bg-dark-body rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-500 mb-1">
                {Object.keys(groupedData).length}
              </div>
              <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Hari Piket
              </div>
            </div>
            <div className="bg-light-body dark:bg-dark-body rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-green-500 mb-1">
                {piketData.length}
              </div>
              <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Total Aktivitas
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabel Aktivitas Piket */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
              Laporan Aktivitas Piket
            </h3>
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {piketData.length} aktivitas
            </span>
          </div>

          {Object.keys(groupedData).length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
                Tidak ada data piket
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Belum ada laporan aktivitas piket untuk periode yang dipilih
              </p>
            </div>
          ) : periodFilter === 'hari' ? (
            // Tampilan detail untuk hari ini
            <div className="space-y-6">
              {Object.entries(groupedData).map(([tanggal, activities], dateIndex) => (
                <motion.div
                  key={tanggal}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + dateIndex * 0.1 }}
                  className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border overflow-hidden"
                >
                  {/* Date Header */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border-b border-light-border dark:border-dark-border">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h4 className="font-semibold text-light-text-main dark:text-dark-text-main">
                        {tanggal}
                      </h4>
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        ({activities.length} aktivitas)
                      </span>
                    </div>
                  </div>

                  {/* Activities Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-light-body dark:bg-dark-body">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                            Waktu
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                            Aktivitas
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                            Foto
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-light-border dark:divide-dark-border">
                        {activities.map((aktivitas, index) => (
                          <tr key={aktivitas.id} className="hover:bg-light-body dark:hover:bg-dark-body transition-colors">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="font-medium text-light-text-main dark:text-dark-text-main">
                                  {aktivitas.waktu}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-light-text-main dark:text-dark-text-main leading-relaxed">
                                <p className="mb-2">
                                  {truncateText(aktivitas.kegiatan, 100)}
                                </p>
                                {aktivitas.kegiatan.length > 100 && (
                                  <button
                                    onClick={() => handleActivityClick(aktivitas)}
                                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                                  >
                                    Lihat selengkapnya
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              {aktivitas.foto && aktivitas.foto.length > 0 ? (
                                <div className="flex items-center space-x-2">
                                  <div className="flex -space-x-2">
                                    {aktivitas.foto.slice(0, 3).map((foto, fotoIndex) => (
                                      <div
                                        key={fotoIndex}
                                        onClick={() => handleImageClick(aktivitas.foto, aktivitas, fotoIndex)}
                                        className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border-2 border-white dark:border-gray-800"
                                      >
                                        <Image className="w-5 h-5 text-gray-400" />
                                      </div>
                                    ))}
                                  </div>
                                  {aktivitas.foto.length > 3 && (
                                    <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                      +{aktivitas.foto.length - 3} lainnya
                                    </span>
                                  )}
                                  <button
                                    onClick={() => handleImageClick(aktivitas.foto, aktivitas)}
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                  >
                                    Lihat semua
                                  </button>
                                </div>
                              ) : (
                                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                  Tidak ada foto
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Tampilan ringkas untuk periode lainnya (minggu, bulan, custom)
            <div className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-light-body dark:bg-dark-body">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                        Total Aktivitas
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                        Foto
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light-border dark:divide-dark-border">
                    {Object.entries(groupedData).map(([tanggal, activities], dateIndex) => {
                      const totalFoto = activities.reduce((total, act) => total + (act.foto ? act.foto.length : 0), 0);
                      const allPhotos = activities.flatMap(act => act.foto || []);
                      
                      return (
                        <motion.tr
                          key={tanggal}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + dateIndex * 0.1 }}
                          className="hover:bg-light-body dark:hover:bg-dark-body transition-colors"
                        >
                          <td className="px-4 py-4">
                            <button
                              onClick={() => handleDateClick(tanggal)}
                              className="flex items-center space-x-3 text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="font-medium text-light-text-main dark:text-dark-text-main">
                                  {tanggal}
                                </p>
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                  Klik untuk detail
                                </p>
                              </div>
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                              </div>
                              <span className="font-semibold text-light-text-main dark:text-dark-text-main">
                                {activities.length} aktivitas
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            {totalFoto > 0 ? (
                              <div className="flex items-center space-x-2">
                                <div className="flex -space-x-2">
                                  {allPhotos.slice(0, 4).map((foto, fotoIndex) => (
                                    <div
                                      key={fotoIndex}
                                      onClick={() => handleImageClick(allPhotos, { tanggal, kegiatan: `Foto dari ${tanggal}` }, fotoIndex)}
                                      className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border-2 border-white dark:border-gray-800"
                                    >
                                      <Image className="w-4 h-4 text-gray-400" />
                                    </div>
                                  ))}
                                </div>
                                <span className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                                  {totalFoto} foto
                                </span>
                                {totalFoto > 4 && (
                                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                    +{totalFoto - 4} lainnya
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                Tidak ada foto
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => handleDateClick(tanggal)}
                              className="flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              <span className="text-sm font-medium">Lihat Detail</span>
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>

        {/* Activity Detail Popup */}
        {showActivityPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setShowActivityPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-light-card dark:bg-dark-card rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                    Detail Aktivitas
                  </h3>
                </div>
                <button
                  onClick={() => setShowActivityPopup(false)}
                  className="p-2 hover:bg-light-body dark:hover:bg-dark-body rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {selectedActivityDetail && (
                  <div className="space-y-4">
                    {/* Time */}
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Waktu</p>
                        <p className="font-semibold text-light-text-main dark:text-dark-text-main">
                          {selectedActivityDetail.waktu}
                        </p>
                      </div>
                    </div>

                    {/* Activity Description */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-light-text-main dark:text-dark-text-main flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Deskripsi Aktivitas</span>
                      </h4>
                      <div className="bg-light-body dark:bg-dark-body rounded-lg p-4">
                        <p className="text-light-text-main dark:text-dark-text-main leading-relaxed whitespace-pre-wrap">
                          {selectedActivityDetail.kegiatan}
                        </p>
                      </div>
                    </div>

                    {/* Photos */}
                    {selectedActivityDetail.foto && selectedActivityDetail.foto.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-light-text-main dark:text-dark-text-main flex items-center space-x-2">
                          <Camera className="w-4 h-4" />
                          <span>Foto Aktivitas ({selectedActivityDetail.foto.length})</span>
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedActivityDetail.foto.map((foto, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setShowActivityPopup(false);
                                handleImageClick(selectedActivityDetail.foto, selectedActivityDetail, index);
                              }}
                              className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                            >
                              <Image className="w-8 h-8 text-gray-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Image Popup */}
        {showImagePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setShowImagePopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-light-card dark:bg-dark-card rounded-xl max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
                <div>
                  <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                    Foto Aktivitas
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {currentImageIndex + 1} dari {selectedImages.length}
                  </p>
                </div>
                <button
                  onClick={() => setShowImagePopup(false)}
                  className="p-2 hover:bg-light-body dark:hover:bg-dark-body rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                </button>
              </div>

              {/* Image Content */}
              <div className="p-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="w-96 h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Image className="w-24 h-24 text-gray-400" />
                    </div>
                    
                    {/* Navigation Buttons */}
                    {selectedImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Activity Description */}
                {selectedActivity && (
                  <div className="bg-light-body dark:bg-dark-body rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-light-text-main dark:text-dark-text-main">
                        {selectedActivity.waktu}
                      </span>
                    </div>
                    <p className="text-light-text-main dark:text-dark-text-main leading-relaxed">
                      {selectedActivity.kegiatan}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DetailPiketPengajar;