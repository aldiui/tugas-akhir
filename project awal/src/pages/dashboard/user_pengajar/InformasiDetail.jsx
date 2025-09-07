import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Eye,
  FileText,
  Download,
  Edit3,
  Trash2,
  Megaphone,
  AlertTriangle,
  Info,
  CheckCircle,
  Share2,
  Copy
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const InformasiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [informasi, setInformasi] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy data - sesuai dengan data di Informasi.jsx
  const dummyInformasi = [
    {
      id: 1,
      judul: "Interview dengan Agency Taiwan Excellence",
      tipe: "jadwal",
      prioritas: "urgent",
      konten: "Akan diadakan sesi interview dengan perwakilan Agency Taiwan Excellence untuk seleksi penempatan kerja. Semua CPMI wajib hadir tepat waktu dan membawa dokumen lengkap. Interview akan dilakukan secara bertahap sesuai dengan jadwal yang telah ditentukan.",
      targetKelas: "Taiwan Batch 15",
      targetCPMI: "Semua CPMI",
      tanggalBuat: "2024-01-15",
      waktuBuat: "09:30",
      dibaca: 45,
      totalTarget: 50,
      tanggalJadwal: "2024-01-20",
      waktuJadwal: "09:00 - 12:00",
      lokasiJadwal: "Ruang Meeting LPK Bahana Mega Prestasi",
      disimpanKeKalender: 38,
      attachments: ["Panduan_Interview.pdf", "Daftar_Dokumen.pdf"],
      status: "aktif",
      pembuat: "Ibu Sari (Pengajar)"
    },
    {
      id: 2,
      judul: "Perubahan Jadwal Pelajaran Bahasa Mandarin",
      tipe: "jadwal",
      prioritas: "normal",
      konten: "Jadwal pelajaran Bahasa Mandarin untuk hari Rabu akan dimajukan menjadi pukul 08:00 - 10:00. Harap semua peserta mempersiapkan diri dan datang tepat waktu. Materi yang akan dipelajari adalah percakapan sehari-hari dalam bahasa Mandarin.",
      targetKelas: "Taiwan Batch 15",
      targetCPMI: "Semua CPMI",
      tanggalBuat: "2024-01-14",
      waktuBuat: "15:20",
      dibaca: 42,
      totalTarget: 50,
      tanggalJadwal: "2024-01-17",
      waktuJadwal: "08:00 - 10:00",
      lokasiJadwal: "Ruang Kelas A",
      disimpanKeKalender: 35,
      attachments: [],
      status: "aktif",
      pembuat: "Ibu Sari (Pengajar)"
    },
    {
      id: 3,
      judul: "Pengumuman Evaluasi Mingguan",
      tipe: "pengumuman",
      prioritas: "normal",
      konten: "Akan diadakan evaluasi mingguan untuk mengukur progress pembelajaran CPMI Taiwan Batch 15. Evaluasi meliputi tes bahasa Mandarin dan praktik budaya Taiwan. Semua peserta wajib mengikuti evaluasi ini.",
      targetKelas: "Taiwan Batch 15",
      targetCPMI: "Semua CPMI",
      tanggalBuat: "2024-01-13",
      waktuBuat: "11:15",
      dibaca: 28,
      totalTarget: 30,
      attachments: [],
      status: "aktif",
      pembuat: "Ibu Sari (Pengajar)"
    },
    {
      id: 4,
      judul: "Pelatihan Keselamatan Kerja",
      tipe: "jadwal",
      prioritas: "urgent",
      konten: "Akan diadakan pelatihan khusus mengenai keselamatan kerja di lingkungan rumah tangga Taiwan. Materi akan mencakup penggunaan alat-alat rumah tangga modern dan prosedur keamanan yang harus dipatuhi.",
      targetKelas: "Taiwan Batch 15",
      targetCPMI: "Semua CPMI",
      tanggalBuat: "2024-01-12",
      waktuBuat: "14:15",
      dibaca: 40,
      totalTarget: 50,
      tanggalJadwal: "2024-01-18",
      waktuJadwal: "13:00 - 16:00",
      lokasiJadwal: "Ruang Praktik",
      disimpanKeKalender: 32,
      attachments: ["Materi_Keselamatan.pdf", "Checklist_Keamanan.pdf"],
      status: "aktif",
      pembuat: "Ibu Sari (Pengajar)"
    },
    {
      id: 5,
      judul: "Reminder: Tugas Bahasa Mandarin",
      tipe: "pengumuman",
      prioritas: "normal",
      konten: "Reminder untuk semua CPMI Taiwan Batch 15 yang belum mengumpulkan tugas percakapan bahasa Mandarin untuk segera diserahkan sebelum hari Jumat. Tugas berupa rekaman percakapan dengan durasi minimal 5 menit.",
      targetKelas: "Taiwan Batch 15",
      targetCPMI: "Semua CPMI",
      tanggalBuat: "2024-01-11",
      waktuBuat: "10:30",
      dibaca: 35,
      totalTarget: 50,
      attachments: [],
      status: "aktif",
      pembuat: "Ibu Sari (Pengajar)"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundInfo = dummyInformasi.find(info => info.id === parseInt(id));
      setInformasi(foundInfo);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  const getPriorityColor = (prioritas) => {
    switch (prioritas) {
      case 'urgent':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'normal':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'rendah':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  const getPriorityIcon = (prioritas) => {
    switch (prioritas) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4" />;
      case 'normal':
        return <Info className="w-4 h-4" />;
      case 'rendah':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (tipe) => {
    switch (tipe) {
      case 'pengumuman':
        return <Megaphone className="w-5 h-5" />;
      case 'jadwal':
        return <Calendar className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
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

  const formatDateShort = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleDownload = (filename) => {
    // Simulasi download
    console.log('Downloading:', filename);
    alert(`Mengunduh file: ${filename}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: informasi.judul,
        text: informasi.konten,
        url: window.location.href
      });
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin ke clipboard');
    }
  };

  const handleEdit = () => {
    // Navigasi ke halaman form edit dengan data informasi
    navigate('/dashboard/pengajar/informasi/edit', {
      state: {
        editData: informasi
      }
    });
  };

  const handleDelete = () => {
    // Konfirmasi sebelum menghapus
    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus informasi "${informasi.judul}"?\n\nTindakan ini tidak dapat dibatalkan.`
    );
    
    if (confirmDelete) {
      // Simulasi penghapusan data
      console.log('Menghapus informasi:', informasi.id);
      alert('Informasi berhasil dihapus!');
      
      // Kembali ke halaman informasi setelah menghapus
      navigate('/dashboard/pengajar/informasi');
    }
   };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-body dark:bg-dark-body">
        <div className="sticky top-0 z-10 bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border">
          <div className="flex items-center justify-between p-4">
            <div className="w-8 h-8 bg-light-bg dark:bg-dark-bg rounded animate-pulse"></div>
            <div className="w-32 h-6 bg-light-bg dark:bg-dark-bg rounded animate-pulse"></div>
            <div className="w-16 h-8 bg-light-bg dark:bg-dark-bg rounded animate-pulse"></div>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 animate-pulse">
            <div className="h-6 bg-light-bg dark:bg-dark-bg rounded mb-3"></div>
            <div className="h-4 bg-light-bg dark:bg-dark-bg rounded mb-2"></div>
            <div className="h-4 bg-light-bg dark:bg-dark-bg rounded mb-2"></div>
            <div className="h-4 bg-light-bg dark:bg-dark-bg rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!informasi) {
    return (
      <div className="min-h-screen bg-light-body dark:bg-dark-body">
        <div className="sticky top-0 z-10 bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => navigate('/dashboard/pengajar/informasi')}
              className="p-2 hover:bg-light-bg dark:hover:bg-dark-bg rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-light-text-main dark:text-dark-text-main" />
            </button>
            <h1 className="font-semibold text-light-text-main dark:text-dark-text-main">Detail Informasi</h1>
            <div className="w-10"></div>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-2">
              Informasi Tidak Ditemukan
            </h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
              Informasi yang Anda cari tidak dapat ditemukan atau telah dihapus.
            </p>
            <button
              onClick={() => navigate('/dashboard/pengajar/informasi')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Kembali ke Informasi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate('/dashboard/pengajar/informasi')}
            className="p-2 hover:bg-light-bg dark:hover:bg-dark-bg rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-light-text-main dark:text-dark-text-main" />
          </button>
          <h1 className="font-semibold text-light-text-main dark:text-dark-text-main">Detail Informasi</h1>
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleShare}
              className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={handleEdit}
              className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDelete}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Main Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border mb-4"
        >
          {/* Header Info */}
          <div className="p-4 border-b border-light-border dark:border-dark-border">
            <div className="flex items-start space-x-3 mb-3">
              <div className={`p-2 rounded-lg ${getPriorityColor(informasi.prioritas)}`}>
                {getTypeIcon(informasi.tipe)}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-light-text-main dark:text-dark-text-main leading-tight mb-2">
                  {informasi.judul}
                </h1>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    <div className="flex items-center space-x-1 mb-1">
                      <Clock className="w-3 h-3" />
                      <span>Dibuat: {formatDateShort(informasi.tanggalBuat)} • {informasi.waktuBuat}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{informasi.targetKelas}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getPriorityColor(informasi.prioritas)}`}>
                    {getPriorityIcon(informasi.prioritas)}
                    <span>{informasi.prioritas}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-light-bg dark:bg-dark-bg rounded-lg p-2 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Eye className="w-3 h-3 text-blue-500" />
                </div>
                <div className="text-sm font-semibold text-light-text-main dark:text-dark-text-main">
                  {informasi.dibaca}
                </div>
                <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  Dibaca
                </div>
              </div>
              <div className="bg-light-bg dark:bg-dark-bg rounded-lg p-2 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-3 h-3 text-green-500" />
                </div>
                <div className="text-sm font-semibold text-light-text-main dark:text-dark-text-main">
                  {informasi.totalTarget}
                </div>
                <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  Target
                </div>
              </div>
              {informasi.tipe === 'jadwal' && (
                <div className="bg-light-bg dark:bg-dark-bg rounded-lg p-2 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="w-3 h-3 text-purple-500" />
                  </div>
                  <div className="text-sm font-semibold text-light-text-main dark:text-dark-text-main">
                    {informasi.disimpanKeKalender}
                  </div>
                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Tersimpan
                  </div>
                </div>
              )}
              <div className="bg-light-bg dark:bg-dark-bg rounded-lg p-2 text-center">
                <div className="flex items-center justify-center mb-1">
                  <FileText className="w-3 h-3 text-orange-500" />
                </div>
                <div className="text-sm font-semibold text-light-text-main dark:text-dark-text-main">
                  {informasi.attachments?.length || 0}
                </div>
                <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  Lampiran
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h2 className="font-semibold text-light-text-main dark:text-dark-text-main mb-3 text-sm">
              Isi Informasi
            </h2>
            <div className="text-sm text-light-text-main dark:text-dark-text-main leading-relaxed">
              {informasi.konten}
            </div>
          </div>
        </motion.div>

        {/* Schedule Details */}
        {informasi.tipe === 'jadwal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border mb-4"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-light-text-main dark:text-dark-text-main text-sm">
                  Detail Jadwal
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Tanggal</p>
                    <p className="font-medium text-light-text-main dark:text-dark-text-main text-sm">
                      {formatDate(informasi.tanggalJadwal)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Waktu</p>
                    <p className="font-medium text-light-text-main dark:text-dark-text-main text-sm">
                      {informasi.waktuJadwal}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <MapPin className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Lokasi</p>
                    <p className="font-medium text-light-text-main dark:text-dark-text-main text-sm">
                      {informasi.lokasiJadwal}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Attachments */}
        {informasi.attachments && informasi.attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border mb-4"
          >
            <div className="p-4">
              <h3 className="font-semibold text-light-text-main dark:text-dark-text-main mb-3 text-sm">
                Lampiran ({informasi.attachments.length})
              </h3>
              <div className="space-y-2">
                {informasi.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-light-bg dark:bg-dark-bg rounded-lg border border-light-border dark:border-dark-border"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-light-text-main dark:text-dark-text-main text-sm truncate">
                          {file}
                        </p>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          PDF • 2.5 MB
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDownload(file)}
                      className="flex items-center space-x-1 px-3 py-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors text-xs"
                    >
                      <Download className="w-3 h-3" />
                      <span>Unduh</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border"
        >
          <div className="p-4">
            <h3 className="font-semibold text-light-text-main dark:text-dark-text-main mb-3 text-sm">
              Informasi Tambahan
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Dibuat oleh:</span>
                <span className="text-light-text-main dark:text-dark-text-main font-medium">{informasi.pembuat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Status:</span>
                <span className="text-green-600 dark:text-green-400 font-medium capitalize">{informasi.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Target:</span>
                <span className="text-light-text-main dark:text-dark-text-main font-medium">{informasi.targetCPMI}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Tingkat Baca:</span>
                <span className="text-light-text-main dark:text-dark-text-main font-medium">
                  {Math.round((informasi.dibaca / informasi.totalTarget) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InformasiDetail;