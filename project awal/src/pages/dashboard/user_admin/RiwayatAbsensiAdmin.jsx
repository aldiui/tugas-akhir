import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar,
  Clock,
  Filter,
  Download,
  Search,
  CheckCircle,
  AlertCircle,
  XCircle,
  Building2,
  ChevronDown,
  Eye,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';

const RiwayatAbsensiAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [selectedStatus, setSelectedStatus] = useState('semua');
  const [showFilter, setShowFilter] = useState(false);

  // Dummy data riwayat absensi lengkap
  const riwayatData = {
    cpmi: {
      nama: 'Ahmad Fauzi',
      kelas: 'Taiwan A',
      pengajar: 'Bu Sari Dewi',
      nomorInduk: 'TW-A-001',
      tanggalMasuk: '2024-01-01'
    },
    statistik: {
      totalHari: 20,
      hadir: 16,
      telat: 3,
      alpha: 1,
      persentaseKehadiran: 95,
      trendKehadiran: 'naik' // naik, turun, stabil
    },
    riwayat: [
      {
        id: 1,
        tanggal: '2024-01-20',
        hari: 'Sabtu',
        status: 'hadir',
        jamMasuk: '07:45',
        jamPulang: '16:30',
        keterangan: '-',
        materiPelajaran: ['Bahasa Mandarin Lanjutan', 'Praktik Memasak Taiwan']
      },
      {
        id: 2,
        tanggal: '2024-01-19',
        hari: 'Jumat',
        status: 'telat',
        jamMasuk: '08:15',
        jamPulang: '16:30',
        keterangan: 'Terlambat karena hujan deras dan macet',
        materiPelajaran: ['Budaya Taiwan', 'Etika Kerja', 'Keterampilan Komunikasi']
      },
      {
        id: 3,
        tanggal: '2024-01-18',
        hari: 'Kamis',
        status: 'hadir',
        jamMasuk: '07:50',
        jamPulang: '16:25',
        keterangan: '-',
        materiPelajaran: ['Bahasa Mandarin Dasar', 'Orientasi Kerja']
      },
      {
        id: 4,
        tanggal: '2024-01-17',
        hari: 'Rabu',
        status: 'alpha',
        jamMasuk: '-',
        jamPulang: '-',
        keterangan: 'Sakit demam, sudah izin ke pengajar',
        materiPelajaran: ['Keterampilan Rumah Tangga', 'Praktik Bahasa']
      },
      {
        id: 5,
        tanggal: '2024-01-16',
        hari: 'Selasa',
        status: 'hadir',
        jamMasuk: '07:55',
        jamPulang: '16:30',
        keterangan: '-',
        materiPelajaran: ['Budaya dan Tradisi Taiwan', 'Keterampilan Dasar']
      },
      {
        id: 6,
        tanggal: '2024-01-15',
        hari: 'Senin',
        status: 'telat',
        jamMasuk: '08:15',
        jamPulang: '16:30',
        keterangan: 'Macet di jalan raya',
        materiPelajaran: ['Bahasa Mandarin Dasar', 'Budaya Taiwan']
      },
      {
        id: 7,
        tanggal: '2024-01-14',
        hari: 'Minggu',
        status: 'hadir',
        jamMasuk: '08:00',
        jamPulang: '15:00',
        keterangan: 'Kelas tambahan hari Minggu',
        materiPelajaran: ['Review Materi Minggu', 'Praktik Percakapan']
      },
      {
        id: 8,
        tanggal: '2024-01-13',
        hari: 'Sabtu',
        status: 'hadir',
        jamMasuk: '07:45',
        jamPulang: '16:30',
        keterangan: '-',
        materiPelajaran: ['Keterampilan Memasak', 'Bahasa Mandarin']
      },
      {
        id: 9,
        tanggal: '2024-01-12',
        hari: 'Jumat',
        status: 'telat',
        jamMasuk: '08:20',
        jamPulang: '16:30',
        keterangan: 'Bangun kesiangan',
        materiPelajaran: ['Orientasi Budaya', 'Praktik Kerja']
      },
      {
        id: 10,
        tanggal: '2024-01-11',
        hari: 'Kamis',
        status: 'hadir',
        jamMasuk: '07:40',
        jamPulang: '16:35',
        keterangan: '-',
        materiPelajaran: ['Bahasa Mandarin', 'Keterampilan Dasar']
      }
    ]
  };

  const statusOptions = [
    { value: 'semua', label: 'Semua Status' },
    { value: 'hadir', label: 'Hadir' },
    { value: 'telat', label: 'Telat' },
    { value: 'alpha', label: 'Alpha' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'hadir':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'telat':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'alpha':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'hadir':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'telat':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'alpha':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'naik':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'turun':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredData = riwayatData.riwayat.filter(item => {
    const matchesStatus = selectedStatus === 'semua' || item.status === selectedStatus;
    const matchesMonth = item.tanggal.startsWith(selectedMonth);
    return matchesStatus && matchesMonth;
  });

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Riwayat Absensi" />
      
      <div className="p-4 pt-5">
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold">
              {riwayatData.cpmi.nama.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-xl font-bold">{riwayatData.cpmi.nama}</h1>
              <p className="text-blue-100">{riwayatData.cpmi.kelas} • {riwayatData.cpmi.pengajar}</p>
              <div className="flex items-center space-x-4 mt-1 text-sm">
                <span>ID: {riwayatData.cpmi.nomorInduk}</span>
                <span>•</span>
                <span>Bergabung: {new Date(riwayatData.cpmi.tanggalMasuk).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Total Hari</span>
            </div>
            <div className="text-xl font-bold text-light-text-main dark:text-dark-text-main">{riwayatData.statistik.totalHari}</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Hadir</span>
            </div>
            <div className="text-xl font-bold text-green-600">{riwayatData.statistik.hadir}</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Telat</span>
            </div>
            <div className="text-xl font-bold text-yellow-600">{riwayatData.statistik.telat}</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Alpha</span>
            </div>
            <div className="text-xl font-bold text-red-600">{riwayatData.statistik.alpha}</div>
          </div>
        </motion.div>

        {/* Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-5 border border-light-border dark:border-dark-border mb-6"
        >
          <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-purple-600" />
            <span>Ringkasan Performa</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{riwayatData.statistik.persentaseKehadiran}%</div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Persentase Kehadiran</div>
              <div className="flex items-center justify-center space-x-1">
                {getTrendIcon(riwayatData.statistik.trendKehadiran)}
                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary capitalize">
                  Trend {riwayatData.statistik.trendKehadiran}
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.round((riwayatData.statistik.hadir / riwayatData.statistik.totalHari) * 100)}%
              </div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Tingkat Kehadiran</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {Math.round((riwayatData.statistik.telat / riwayatData.statistik.totalHari) * 100)}%
              </div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Tingkat Keterlambatan</div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
              Riwayat Detail
            </h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="px-4 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main hover:bg-light-hover dark:hover:bg-dark-hover transition-colors flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
              </button>
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {showFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-4 mb-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Pilih Bulan
                  </label>
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Status Kehadiran
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Attendance History List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          {filteredData.map((item, index) => (
            <div
              key={item.id}
              className="bg-light-card dark:bg-dark-card rounded-xl p-5 border border-light-border dark:border-dark-border hover:shadow-md transition-all duration-200"
            >
              {/* Date Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
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
                      <span>{item.jamMasuk || '-'} - {item.jamPulang || '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  {getStatusIcon(item.status)}
                </div>
              </div>

              {/* Keterangan */}
              {item.keterangan && item.keterangan !== '-' && (
                <div className="mb-4 p-3 bg-light-body dark:bg-dark-body rounded-lg">
                  <h4 className="text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">Keterangan:</h4>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{item.keterangan}</p>
                </div>
              )}

              {/* Materi Pelajaran */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">Materi Pelajaran:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.materiPelajaran.map((materi, materiIndex) => (
                    <span
                      key={materiIndex}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-medium"
                    >
                      {materi}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate(`/dashboard/admin/detail-absensi/${item.id}`)}
                className="w-full py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Lihat Detail Lengkap</span>
              </button>
            </div>
          ))}
        </motion.div>

        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Calendar className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-2">
              Tidak ada data riwayat
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Belum ada riwayat absensi untuk filter yang dipilih
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RiwayatAbsensiAdmin;