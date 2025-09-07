import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
  MapPin,
  User
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const RiwayatPiket = () => {
  const navigate = useNavigate();
  const { cpmi, laporanPiket } = useCPMI();
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [selectedDate, setSelectedDate] = useState(null);

  // Dummy data riwayat piket per tanggal untuk CPMI
  const piketHistory = {
    cpmi: {
      nama: cpmi?.nama || 'Maya Sari',
      kelas: cpmi?.kelas || 'Taiwan A',
      pengajar: cpmi?.pengajar || 'Bu Sari Dewi',
      lokasi: cpmi?.lokasi_piket || 'Rumah Majikan - Taiwan'
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
        ringkasan: 'Hari pertama piket berjalan dengan baik. Saya menunjukkan adaptasi yang cepat dengan rutinitas keluarga majikan.',
        aktivitasUtama: ['Membantu sarapan', 'Antar jemput anak', 'Belajar bahasa', 'Bantu masak malam'],
        evaluasiMajikan: 'Sangat baik, Maya cepat beradaptasi'
      },
      {
        tanggal: '2024-01-14',
        hari: 'Minggu',
        totalLaporan: 6,
        totalFoto: 8,
        jamMulai: '07:00',
        jamSelesai: '20:00',
        status: 'lengkap',
        ringkasan: 'Hari libur keluarga, saya ikut kegiatan rekreasi ke taman dan museum bersama keluarga majikan.',
        aktivitasUtama: ['Sarapan keluarga', 'Jalan-jalan ke taman', 'Kunjungi museum', 'Makan malam bersama'],
        evaluasiMajikan: 'Baik, ikut serta dalam kegiatan keluarga'
      },
      {
        tanggal: '2024-01-13',
        hari: 'Sabtu',
        totalLaporan: 7,
        totalFoto: 10,
        jamMulai: '06:30',
        jamSelesai: '21:00',
        status: 'lengkap',
        ringkasan: 'Hari Sabtu dengan aktivitas belanja dan persiapan untuk minggu depan. Belajar cara berbelanja di Taiwan.',
        aktivitasUtama: ['Bersih-bersih rumah', 'Belanja groceries', 'Masak bersama', 'Persiapan sekolah'],
        evaluasiMajikan: 'Baik, membantu dengan antusias'
      },
      {
        tanggal: '2024-01-12',
        hari: 'Jumat',
        totalLaporan: 8,
        totalFoto: 11,
        jamMulai: '06:00',
        jamSelesai: '21:15',
        status: 'lengkap',
        ringkasan: 'Hari kerja normal dengan fokus pada rutinitas harian dan pembelajaran bahasa Mandarin.',
        aktivitasUtama: ['Persiapan sarapan', 'Sekolah anak-anak', 'Kelas bahasa', 'Makan malam'],
        evaluasiMajikan: 'Sangat baik, progress bahasa bagus'
      },
      {
        tanggal: '2024-01-11',
        hari: 'Kamis',
        totalLaporan: 5,
        totalFoto: 6,
        jamMulai: '06:15',
        jamSelesai: '19:30',
        status: 'terlambat',
        ringkasan: 'Laporan terlambat karena ada kendala teknis dengan aplikasi. Aktivitas berjalan normal.',
        aktivitasUtama: ['Sarapan', 'Aktivitas rumah', 'Jemput anak', 'Makan malam'],
        evaluasiMajikan: 'Baik, meski laporan terlambat'
      },
      {
        tanggal: '2024-01-10',
        hari: 'Rabu',
        totalLaporan: 9,
        totalFoto: 13,
        jamMulai: '05:45',
        jamSelesai: '21:45',
        status: 'lengkap',
        ringkasan: 'Hari pertama piket dengan orientasi lengkap dari keluarga majikan. Sangat bersemangat memulai.',
        aktivitasUtama: ['Orientasi rumah', 'Kenalan keluarga', 'Belajar rutinitas', 'Evaluasi hari pertama'],
        evaluasiMajikan: 'Sangat baik, antusias dan sopan'
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
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Riwayat Piket Saya" />
      
      <div className="p-4 pt-5">
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white mb-6"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold">
              {piketHistory.cpmi.nama.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-xl font-bold">{piketHistory.cpmi.nama}</h1>
              <p className="text-blue-100">{piketHistory.cpmi.kelas} • {piketHistory.cpmi.pengajar}</p>
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
              <div className="text-xs text-blue-100">Hari</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <FileText className="w-5 h-5 mx-auto mb-1" />
              <div className="text-lg font-bold">{stats.totalLaporan}</div>
              <div className="text-xs text-blue-100">Laporan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <Camera className="w-5 h-5 mx-auto mb-1" />
              <div className="text-lg font-bold">{stats.totalFoto}</div>
              <div className="text-xs text-blue-100">Foto</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <CheckCircle2 className="w-5 h-5 mx-auto mb-1" />
              <div className="text-lg font-bold">{stats.rataLaporan}</div>
              <div className="text-xs text-blue-100">Rata-rata</div>
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
              <Filter className="w-5 h-5 text-blue-600" />
              <span>Filter Periode</span>
            </h2>
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
                className="w-full px-4 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500"
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
              className="bg-light-card dark:bg-dark-card rounded-xl p-5 border border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-200"
            >
              {/* Date Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
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
                <h4 className="text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">Ringkasan Hari Ini:</h4>
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
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-medium"
                    >
                      {aktivitas}
                    </span>
                  ))}
                </div>
              </div>

              {/* Evaluasi Majikan */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">Evaluasi Majikan:</h4>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-sm text-green-800 dark:text-green-400">
                    "{item.evaluasiMajikan}"
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  navigate(`/dashboard/cpmi/piket-laporan`);
                }}
                className="w-full py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Lihat Detail Lengkap</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Ringkasan Performa Saya</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-green-100 text-sm">Konsistensi Laporan</p>
              <p className="text-xl font-bold">95%</p>
            </div>
            <div>
              <p className="text-green-100 text-sm">Rating Majikan</p>
              <p className="text-xl font-bold">Sangat Baik</p>
            </div>
          </div>
          
          <p className="text-green-100 text-sm leading-relaxed">
            Saya menunjukkan konsistensi yang sangat baik dalam melaporkan aktivitas harian. 
            Dokumentasi lengkap dengan foto-foto yang mendukung setiap aktivitas dan mendapat apresiasi dari majikan.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RiwayatPiket;