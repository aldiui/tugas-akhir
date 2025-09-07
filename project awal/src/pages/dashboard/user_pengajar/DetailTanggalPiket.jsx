import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useParams } from 'react-router-dom';
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
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const DetailTanggalPiket = () => {
  const { theme } = useTheme();
  const { cpmiList } = useCPMI();
  const location = useLocation();
  const { nama, tanggal } = useParams();
  
  // State untuk popup gambar
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  // Decode nama dan tanggal dari URL
  let decodedNama = nama;
  let decodedTanggal = tanggal;
  try {
    decodedNama = decodeURIComponent(nama);
    decodedTanggal = decodeURIComponent(tanggal);
    // Handle double encoding
    if (decodedNama.includes('%')) {
      decodedNama = decodeURIComponent(decodedNama);
    }
    if (decodedTanggal.includes('%')) {
      decodedTanggal = decodeURIComponent(decodedTanggal);
    }
  } catch (error) {
    console.error('Error decoding parameters:', error);
  }
  
  // Cari data CPMI berdasarkan nama
  const cpmiData = cpmiList.find(cpmi => cpmi.nama === decodedNama);
  
  // Generate dummy data aktivitas untuk tanggal tertentu
  const generateActivitiesForDate = () => {
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
    
    // Random number of activities (4-8)
    const numActivities = Math.floor(Math.random() * 5) + 4;
    return baseActivities.slice(0, numActivities).map((activity, index) => ({
      ...activity,
      id: `${Date.now()}_${index}`,
      tanggal: decodedTanggal
    }));
  };
  
  const activities = generateActivitiesForDate();
  
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

  if (!cpmiData) {
    return (
      <div className="min-h-screen bg-light-body dark:bg-dark-body">
        <BackHeader title="Detail Aktivitas Tanggal" />
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
      <BackHeader title={`Aktivitas ${decodedTanggal}`} />
      
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
                  <span>{decodedTanggal}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-light-body dark:bg-dark-body rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-500 mb-1">
                {activities.length}
              </div>
              <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Total Aktivitas
              </div>
            </div>
            <div className="bg-light-body dark:bg-dark-body rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-green-500 mb-1">
                {activities.reduce((total, act) => total + (act.foto ? act.foto.length : 0), 0)}
              </div>
              <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Total Foto
              </div>
            </div>
          </div>
        </motion.div>

        {/* Aktivitas Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
              Aktivitas Lengkap
            </h3>
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {activities.length} aktivitas
            </span>
          </div>

          {activities.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
                Tidak ada aktivitas
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Belum ada aktivitas untuk tanggal ini
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((aktivitas, index) => (
                <motion.div
                  key={aktivitas.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border"
                >
                  {/* Time Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-light-text-main dark:text-dark-text-main">
                        {aktivitas.waktu}
                      </h4>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Aktivitas #{index + 1}
                      </p>
                    </div>
                  </div>

                  {/* Activity Description */}
                  <div className="mb-4">
                    <p className="text-light-text-main dark:text-dark-text-main leading-relaxed">
                      {aktivitas.kegiatan}
                    </p>
                  </div>

                  {/* Photos */}
                  {aktivitas.foto && aktivitas.foto.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                        Foto Aktivitas ({aktivitas.foto.length})
                      </h5>
                      <div className="grid grid-cols-4 gap-2">
                        {aktivitas.foto.map((foto, fotoIndex) => (
                          <div
                            key={fotoIndex}
                            onClick={() => handleImageClick(aktivitas.foto, aktivitas, fotoIndex)}
                            className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                          >
                            <Image className="w-6 h-6 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

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
              className="bg-light-card dark:bg-dark-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
                <div className="flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                    Foto Aktivitas
                  </h3>
                  <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {currentImageIndex + 1} dari {selectedImages.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowImagePopup(false)}
                  className="p-2 hover:bg-light-body dark:hover:bg-dark-body rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                </button>
              </div>

              {/* Image Content */}
              <div className="relative">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <Image className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {selectedImages[currentImageIndex]}
                    </p>
                  </div>
                </div>

                {/* Navigation Buttons */}
                {selectedImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Activity Info */}
              {selectedActivity && (
                <div className="p-4 border-t border-light-border dark:border-dark-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-light-text-main dark:text-dark-text-main">
                      {selectedActivity.waktu}
                    </span>
                  </div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm leading-relaxed">
                    {selectedActivity.kegiatan}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DetailTanggalPiket;