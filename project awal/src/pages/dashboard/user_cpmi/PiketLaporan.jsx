import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Camera, 
  Clock, 
  CheckCircle,
  Image,
  MapPin,
  ClipboardList,
  AlertCircle
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const PiketLaporan = () => {
  const navigate = useNavigate();
  const { laporanPiket } = useCPMI();



  const groupLaporanByDate = () => {
    const grouped = {};
    laporanPiket.forEach(laporan => {
      const date = laporan.tanggal;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(laporan);
    });
    return grouped;
  };

  const groupedLaporan = groupLaporanByDate();
  const sortedDates = Object.keys(groupedLaporan).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Laporan" />
      
      <div className="p-4 space-y-6">
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/40 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏠</span>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-yellow-900 dark:text-yellow-100">
                Status Piket Aktif
              </h2>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Kamu sedang magang di rumah calon majikan. Jangan lupa isi laporan harian!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Add Report Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <button
            onClick={() => navigate('/dashboard/cpmi/tambah-laporan')}
            className="w-full card p-4 hover:shadow-md transition-all duration-200 border-2 border-dashed border-primary-300 dark:border-primary-700 hover:border-primary-400 dark:hover:border-primary-600 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-center space-x-3 text-primary-600 dark:text-primary-400">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                <Plus size={20} />
              </div>
              <div className="text-left">
                <span className="font-semibold block">
                  Tambah Laporan Baru
                </span>
                <span className="text-sm text-secondary">
                  Buat laporan aktivitas harian
                </span>
              </div>
            </div>
          </button>
        </motion.div>



        {/* Laporan History */}
        <div className="space-y-4">
          {sortedDates.length > 0 ? (
            sortedDates.map((date, dateIndex) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (dateIndex + 1) * 0.1, duration: 0.5 }}
                className="space-y-3"
              >
                {/* Date Header */}
                <div className="flex items-center space-x-3">
                  <div className="flex-1 h-px bg-light-border dark:bg-dark-border"></div>
                  <div className="px-3 py-1 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-full">
                    <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                      {new Date(date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-light-border dark:bg-dark-border"></div>
                </div>

                {/* Laporan Items */}
                {groupedLaporan[date].map((laporan, index) => (
                  <motion.div
                    key={laporan.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="card p-4"
                  >
                    <div className="flex items-start space-x-3">
                      {/* Time */}
                      <div className="text-center min-w-[60px]">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-1">
                          <Clock className="text-primary-600 dark:text-primary-400" size={16} />
                        </div>
                        <p className="text-xs font-medium text-light-text-main dark:text-dark-text-main">
                          {laporan.jam_input}
                        </p>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-light-text-main dark:text-dark-text-main">
                            Laporan Aktivitas
                          </h4>
                          <div className="flex items-center space-x-1 text-xs text-green-600 dark:text-green-400">
                            <CheckCircle size={14} />
                            <span>Terkirim</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-secondary leading-relaxed mb-3">
                          {laporan.kegiatan}
                        </p>
                        
                        {/* Foto */}
                        {laporan.foto_kegiatan && laporan.foto_kegiatan.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-secondary mb-2 flex items-center">
                              <Camera size={12} className="mr-1" />
                              {laporan.foto_kegiatan.length} foto dilampirkan
                            </p>
                            <div className="flex space-x-2">
                              {laporan.foto_kegiatan.slice(0, 3).map((foto, fotoIndex) => (
                                <div key={fotoIndex} className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                  <Image size={20} className="text-gray-400" />
                                </div>
                              ))}
                              {laporan.foto_kegiatan.length > 3 && (
                                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                  <span className="text-xs text-gray-500">+{laporan.foto_kegiatan.length - 3}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Location & Evaluation */}
                        <div className="flex items-center justify-between text-xs text-secondary">
                          <div className="flex items-center space-x-1">
                            <MapPin size={12} />
                            <span>{laporan.lokasi}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>Evaluasi: {laporan.evaluasi_majikan}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
              <ClipboardList size={48} className="mx-auto mb-4 text-secondary" />
              <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-2">
                Belum Ada Laporan
              </h3>
              <p className="text-secondary mb-4">
                Mulai isi laporan aktivitas harian kamu selama piket
              </p>
              <button
                onClick={() => navigate('/dashboard/cpmi/tambah-laporan')}
                className="btn-primary"
              >
                Buat Laporan Pertama
              </button>
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
            <AlertCircle className="text-blue-600 dark:text-blue-400 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Tips Laporan Piket
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Isi laporan setiap hari secara detail dan jujur</li>
                <li>• Sertakan foto kegiatan sebagai bukti (jika memungkinkan)</li>
                <li>• Ceritakan interaksi dengan majikan dan keluarga</li>
                <li>• Catat hal-hal yang dipelajari atau kesulitan yang dihadapi</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PiketLaporan;