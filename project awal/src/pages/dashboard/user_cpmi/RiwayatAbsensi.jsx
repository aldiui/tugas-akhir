import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Filter,
  Download,
  Search,
  ChevronDown,
  User
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';
import NavBottom from '../../../layout/NavBottom';
import { useCPMI } from '../../../context/CPMIContext';

const RiwayatAbsensi = () => {
  const { cpmi } = useCPMI();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Dummy data riwayat absensi
  const riwayatAbsensi = [
    {
      id: 1,
      tanggal: '2024-01-15',
      hari: 'Senin',
      jamMasuk: '08:00',
      jamKeluar: '16:30',
      status: 'hadir',
      keterangan: 'Tepat waktu',
      lokasi: 'LPK Bahana Mega Prestasi',
      jarak: '5m'
    },
    {
      id: 2,
      tanggal: '2024-01-16',
      hari: 'Selasa',
      jamMasuk: '08:15',
      jamKeluar: '16:30',
      status: 'terlambat',
      keterangan: 'Terlambat 15 menit - Macet di jalan',
      lokasi: 'LPK Bahana Mega Prestasi',
      jarak: '3m'
    },
    {
      id: 3,
      tanggal: '2024-01-17',
      hari: 'Rabu',
      jamMasuk: '-',
      jamKeluar: '-',
      status: 'izin',
      keterangan: 'Sakit demam',
      lokasi: '-',
      jarak: '-'
    },
    {
      id: 4,
      tanggal: '2024-01-18',
      hari: 'Kamis',
      jamMasuk: '07:55',
      jamKeluar: '16:35',
      status: 'hadir',
      keterangan: 'Tepat waktu',
      lokasi: 'LPK Bahana Mega Prestasi',
      jarak: '2m'
    },
    {
      id: 5,
      tanggal: '2024-01-19',
      hari: 'Jumat',
      jamMasuk: '-',
      jamKeluar: '-',
      status: 'alpha',
      keterangan: 'Tidak hadir tanpa keterangan',
      lokasi: '-',
      jarak: '-'
    },
    {
      id: 6,
      tanggal: '2024-01-20',
      hari: 'Sabtu',
      jamMasuk: '08:00',
      jamKeluar: '12:00',
      status: 'hadir',
      keterangan: 'Hari Sabtu - Setengah hari',
      lokasi: 'LPK Bahana Mega Prestasi',
      jarak: '4m'
    }
  ];

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const years = [2023, 2024, 2025];

  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'hadir', label: 'Hadir' },
    { value: 'terlambat', label: 'Terlambat' },
    { value: 'izin', label: 'Izin' },
    { value: 'alpha', label: 'Alpha' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'hadir':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'terlambat':
        return <AlertCircle size={18} className="text-yellow-500" />;
      case 'izin':
        return <Clock size={18} className="text-blue-500" />;
      case 'alpha':
        return <XCircle size={18} className="text-red-500" />;
      default:
        return <Clock size={18} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'hadir':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'terlambat':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'izin':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'alpha':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const filteredData = riwayatAbsensi.filter(item => {
    const matchesSearch = item.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.hari.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatistics = () => {
    const total = riwayatAbsensi.length;
    const hadir = riwayatAbsensi.filter(item => item.status === 'hadir').length;
    const terlambat = riwayatAbsensi.filter(item => item.status === 'terlambat').length;
    const izin = riwayatAbsensi.filter(item => item.status === 'izin').length;
    const alpha = riwayatAbsensi.filter(item => item.status === 'alpha').length;
    
    return { total, hadir, terlambat, izin, alpha };
  };

  const stats = getStatistics();

  const handleExport = () => {
    // Simulate export functionality
    console.log('Exporting attendance data...');
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader 
        title="Riwayat Absensi" 
        rightButton={
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download size={16} />
            <span className="text-sm">Export</span>
          </button>
        }
      />
      
      <div className="p-4 pt-5 pb-24">
        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 mb-6 text-white"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{cpmi.nama}</h3>
              <p className="text-white/80 text-sm">{cpmi.kelas} • {cpmi.nik}</p>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-light-text-main dark:text-dark-text-main">
                  {stats.hadir}
                </p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Hadir
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <AlertCircle size={20} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-light-text-main dark:text-dark-text-main">
                  {stats.terlambat}
                </p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Terlambat
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Clock size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-light-text-main dark:text-dark-text-main">
                  {stats.izin}
                </p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Izin
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <XCircle size={20} className="text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-light-text-main dark:text-dark-text-main">
                  {stats.alpha}
                </p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Alpha
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary" />
            <input
              type="text"
              placeholder="Cari berdasarkan keterangan atau hari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main hover:bg-light-body dark:hover:bg-dark-body transition-colors"
          >
            <Filter size={16} />
            <span>Filter</span>
            <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Bulan
                  </label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index}>{month}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Tahun
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Attendance List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {filteredData.length === 0 ? (
            <div className="bg-light-card dark:bg-dark-card rounded-xl p-8 border border-light-border dark:border-dark-border text-center">
              <Clock size={48} className="mx-auto text-light-text-secondary dark:text-dark-text-secondary mb-4" />
              <h3 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
                Tidak ada data
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Tidak ada riwayat absensi yang sesuai dengan filter yang dipilih.
              </p>
            </div>
          ) : (
            filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (index * 0.05) }}
                className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <h4 className="font-medium text-light-text-main dark:text-dark-text-main">
                        {item.hari}, {new Date(item.tanggal).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <Clock size={14} className="text-light-text-secondary dark:text-dark-text-secondary" />
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      Masuk: {item.jamMasuk}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={14} className="text-light-text-secondary dark:text-dark-text-secondary" />
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      Keluar: {item.jamKeluar}
                    </span>
                  </div>
                </div>
                
                {item.lokasi !== '-' && (
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin size={14} className="text-light-text-secondary dark:text-dark-text-secondary" />
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {item.lokasi} • Jarak: {item.jarak}
                    </span>
                  </div>
                )}
                
                <p className="text-sm text-light-text-main dark:text-dark-text-main bg-light-body dark:bg-dark-body rounded-lg p-3">
                  {item.keterangan}
                </p>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
      
      <NavBottom />
    </div>
  );
};

export default RiwayatAbsensi;