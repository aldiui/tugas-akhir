import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  User, 
  Eye, 
  Edit3, 
  Trash2, 
  Share2, 
  Download, 
  FileText, 
  Bell, 
  AlertTriangle, 
  Info, 
  Megaphone,
  MessageSquare,
  CheckCircle,
  X,
  ChevronLeft,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import BackHeader from '../../../layout/BackHeader';

const InformasiDetailAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Dummy data informasi detail
  const informasiDetail = {
    id: parseInt(id),
    judul: 'Evaluasi Kinerja Pengajar Bulanan',
    konten: 'Akan diadakan evaluasi kinerja pengajar untuk bulan ini. Semua pengajar wajib mengumpulkan laporan progress CPMI dan dokumentasi pembelajaran. Evaluasi akan mencakup:\n\n1. Penilaian kemajuan belajar CPMI\n2. Metode pengajaran yang digunakan\n3. Tingkat kehadiran dan kedisiplinan\n4. Laporan kendala dan solusi\n5. Rencana pembelajaran bulan depan\n\nHarap semua pengajar mempersiapkan dokumen yang diperlukan sebelum tanggal evaluasi.',
    tipe: 'jadwal',
    prioritas: 'urgent',
    target: 'pengajar',
    targetKelas: 'Semua Kelas',
    tanggalBuat: '2024-01-15',
    waktuBuat: '09:30',
    tanggalJadwal: '2024-01-25',
    waktuJadwal: '14:00',
    lokasiJadwal: 'Ruang Meeting Admin',
    status: 'aktif',
    dibaca: 8,
    totalTarget: 8,
    disimpanKeKalender: 6,
    attachments: [
      { nama: 'form_evaluasi.pdf', ukuran: '2.3 MB', tipe: 'pdf' },
      { nama: 'panduan_evaluasi.docx', ukuran: '1.8 MB', tipe: 'docx' }
    ],
    pembuat: 'Admin System',
    targetDetail: [
      { id: 1, nama: 'Ibu Sari', kelas: 'Taiwan Batch 15', sudahBaca: true, waktuBaca: '2024-01-15 10:15' },
      { id: 2, nama: 'Pak Budi', kelas: 'Taiwan Batch 16', sudahBaca: true, waktuBaca: '2024-01-15 11:30' },
      { id: 3, nama: 'Ibu Dewi', kelas: 'Taiwan Batch 17', sudahBaca: true, waktuBaca: '2024-01-15 13:45' },
      { id: 4, nama: 'Pak Ahmad', kelas: 'Taiwan Batch 18', sudahBaca: false, waktuBaca: null }
    ]
  };

  const getPriorityColor = (prioritas) => {
    switch (prioritas) {
      case 'urgent':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'normal':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  const getPriorityIcon = (prioritas) => {
    switch (prioritas) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4" />;
      case 'normal':
        return <Info className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (tipe) => {
    switch (tipe) {
      case 'jadwal':
        return <Calendar className="w-5 h-5" />;
      case 'pengumuman':
        return <Megaphone className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getFileIcon = (tipe) => {
    switch (tipe) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="w-4 h-4 text-blue-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = () => {
    navigate(`/dashboard/admin/informasi/edit/${id}`);
  };

  const handleDelete = () => {
    console.log('Menghapus informasi:', id);
    setShowDeleteModal(false);
    navigate('/dashboard/admin/informasi');
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleDownloadAttachment = (attachment) => {
    console.log('Mengunduh lampiran:', attachment.nama);
  };

  const handleSaveToCalendar = () => {
    console.log('Menyimpan ke kalender');
  };

  const readPercentage = Math.round((informasiDetail.dibaca / informasiDetail.totalTarget) * 100);

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Detail Informasi" />
      
      <div className="p-4 space-y-4">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3 flex-1">
              <div className={`p-3 rounded-lg ${getPriorityColor(informasiDetail.prioritas)}`}>
                {getTypeIcon(informasiDetail.tipe)}
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-light-text-main dark:text-dark-text-main mb-2">
                  {informasiDetail.judul}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  <span className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{informasiDetail.pembuat}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(informasiDetail.tanggalBuat)} • {informasiDetail.waktuBuat}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 border ${getPriorityColor(informasiDetail.prioritas)}`}>
                {getPriorityIcon(informasiDetail.prioritas)}
                <span className="capitalize">{informasiDetail.prioritas}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEdit}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Bagikan</span>
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center space-x-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hapus</span>
            </button>
          </div>
        </motion.div>

        {/* Statistics Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border"
        >
          <h2 className="text-sm font-semibold text-light-text-main dark:text-dark-text-main mb-3">
            Statistik Informasi
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {informasiDetail.dibaca}
              </div>
              <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Sudah Dibaca
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {readPercentage}%
              </div>
              <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Tingkat Baca
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {informasiDetail.disimpanKeKalender}
              </div>
              <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Disimpan
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary mb-1">
              <span>Progress Pembacaan</span>
              <span>{informasiDetail.dibaca}/{informasiDetail.totalTarget}</span>
            </div>
            <div className="w-full bg-light-bg dark:bg-dark-bg rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${readPercentage}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Schedule Info (if jadwal) */}
        {informasiDetail.tipe === 'jadwal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border"
          >
            <h2 className="text-sm font-semibold text-light-text-main dark:text-dark-text-main mb-3">
              Detail Jadwal
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                    {formatDate(informasiDetail.tanggalJadwal)}
                  </div>
                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Tanggal Pelaksanaan
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                    {formatTime(informasiDetail.waktuJadwal)} WIB
                  </div>
                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Waktu Pelaksanaan
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-500" />
                <div>
                  <div className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                    {informasiDetail.lokasiJadwal}
                  </div>
                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Lokasi Pelaksanaan
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleSaveToCalendar}
              className="w-full mt-4 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Simpan ke Kalender</span>
            </button>
          </motion.div>
        )}

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border"
        >
          <h2 className="text-sm font-semibold text-light-text-main dark:text-dark-text-main mb-3">
            Konten Informasi
          </h2>
          <div className="prose prose-sm max-w-none text-light-text-main dark:text-dark-text-main">
            {informasiDetail.konten.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-2 text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Attachments Card */}
        {informasiDetail.attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border"
          >
            <h2 className="text-sm font-semibold text-light-text-main dark:text-dark-text-main mb-3">
              Lampiran Dokumen ({informasiDetail.attachments.length})
            </h2>
            <div className="space-y-2">
              {informasiDetail.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-light-bg dark:bg-dark-bg rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(attachment.tipe)}
                    <div>
                      <div className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                        {attachment.nama}
                      </div>
                      <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        {attachment.ukuran}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadAttachment(attachment)}
                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Target Recipients Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border"
        >
          <h2 className="text-sm font-semibold text-light-text-main dark:text-dark-text-main mb-3">
            Target Penerima ({informasiDetail.targetDetail.length})
          </h2>
          <div className="space-y-2">
            {informasiDetail.targetDetail.map((target) => (
              <div key={target.id} className="flex items-center justify-between p-3 bg-light-bg dark:bg-dark-bg rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {target.nama.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                      {target.nama}
                    </div>
                    <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      {target.kelas}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {target.sudahBaca ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <div className="text-right">
                        <div className="text-xs font-medium text-green-600 dark:text-green-400">
                          Sudah Dibaca
                        </div>
                        <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          {formatDateTime(target.waktuBaca)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-orange-500" />
                      <div className="text-xs font-medium text-orange-600 dark:text-orange-400">
                        Belum Dibaca
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-light-card dark:bg-dark-card rounded-lg p-6 w-full max-w-sm"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-2">
                Hapus Informasi?
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Informasi yang dihapus tidak dapat dikembalikan. Yakin ingin menghapus?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-light-card dark:bg-dark-card rounded-lg p-6 w-full max-w-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                Bagikan Informasi
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg dark:hover:bg-dark-bg rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-light-bg dark:bg-dark-bg rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors">
                <MessageSquare className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-light-text-main dark:text-dark-text-main">WhatsApp</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-light-bg dark:bg-dark-bg rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors">
                <ExternalLink className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-light-text-main dark:text-dark-text-main">Salin Link</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-light-bg dark:bg-dark-bg rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors">
                <Download className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-light-text-main dark:text-dark-text-main">Export PDF</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InformasiDetailAdmin;

