import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Search,
  User,
  Eye,
  Calendar,
  Filter,
  ChevronDown,
  Download,
  FileText,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const LaporanPiketAdmin = () => {
  const { cpmiPiket } = useCPMI();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [periodFilter, setPeriodFilter] = useState('hari'); // hari, minggu, bulan, custom
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('semua');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [piketData, setPiketData] = useState([]);

  // Get today's date
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate dummy data untuk berbagai periode
  const generateDummyPiketData = () => {
    const baseData = [
      {
        id: 1,
        nama: 'Maya Sari',
        kelas: 'Taiwan A',
        pengajar: 'Bu Sari Dewi',
        lokasi: 'Rumah Ibu Chen - Taipei',
        foto: 'avatar1.jpg',
        totalAktivitas: 8
      },
      {
        id: 2,
        nama: 'Siti Aminah',
        kelas: 'Taiwan B',
        pengajar: 'Pak Budi Santoso',
        lokasi: 'Rumah Pak Wang - Kaohsiung',
        foto: 'avatar2.jpg',
        totalAktivitas: 6
      },
      {
        id: 3,
        nama: 'Rina Kartika',
        kelas: 'Taiwan C',
        pengajar: 'Bu Indira Wati',
        lokasi: 'Rumah Ibu Liu - Taichung',
        foto: 'avatar3.jpg',
        totalAktivitas: 7
      },
      {
        id: 4,
        nama: 'Dewi Sartika',
        kelas: 'Taiwan A',
        pengajar: 'Bu Sari Dewi',
        lokasi: 'Rumah Pak Lin - Tainan',
        foto: 'avatar4.jpg',
        totalAktivitas: 5
      },
      {
        id: 5,
        nama: 'Fitri Handayani',
        kelas: 'Taiwan B',
        pengajar: 'Pak Budi Santoso',
        lokasi: 'Rumah Ibu Zhang - Hsinchu',
        foto: 'avatar5.jpg',
        totalAktivitas: 9
      }
    ];
    
    // Generate more data for different periods
    const extendedData = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      baseData.forEach((cpmi, index) => {
        if (Math.random() > 0.3) { // 70% chance of having piket data
          extendedData.push({
            ...cpmi,
            id: `${cpmi.id}_${i}`,
            tanggal: dateStr,
            waktuInput: `${Math.floor(Math.random() * 4) + 18}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            totalLaporan: Math.floor(Math.random() * 5) + 1,
            fotoCount: Math.floor(Math.random() * 8) + 2,
            statusTerakhir: [
              'Selesai memasak makan malam',
              'Membersihkan dapur setelah makan malam',
              'Bermain dengan anak-anak sebelum tidur',
              'Membantu persiapan sarapan untuk besok',
              'Menyelesaikan pekerjaan rumah tangga'
            ][Math.floor(Math.random() * 5)],
            ringkasan: [
              'Membantu memasak, membersihkan rumah, dan merawat anak',
              'Membantu pekerjaan rumah tangga dan belajar bahasa Mandarin',
              'Merawat anak, membantu pekerjaan rumah, dan belajar budaya Taiwan',
              'Hari pertama piket, masih adaptasi dengan rutinitas keluarga',
              'Membantu kegiatan sehari-hari dan belajar komunikasi'
            ][Math.floor(Math.random() * 5)]
          });
        }
      });
    }
    
    return extendedData;
  };

  useEffect(() => {
    setPiketData(generateDummyPiketData());
  }, []);

  const kelasOptions = [
    { value: 'semua', label: 'Semua Kelas' },
    { value: 'Taiwan A', label: 'Taiwan A' },
    { value: 'Taiwan B', label: 'Taiwan B' },
    { value: 'Taiwan C', label: 'Taiwan C' }
  ];

  // Filter data berdasarkan periode
  const getFilteredData = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    switch (periodFilter) {
      case 'hari':
        return piketData.filter(item => item.tanggal === todayStr);
      case 'minggu':
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return piketData.filter(item => {
          const itemDate = new Date(item.tanggal);
          return itemDate >= weekAgo && itemDate <= today;
        });
      case 'bulan':
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        return piketData.filter(item => {
          const itemDate = new Date(item.tanggal);
          return itemDate >= monthAgo && itemDate <= today;
        });
      case 'custom':
        if (startDate && endDate) {
          return piketData.filter(item => {
            const itemDate = new Date(item.tanggal);
            return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
          });
        }
        return piketData;
      default:
        return piketData.filter(item => item.tanggal === todayStr);
    }
  };

  const filteredPiketData = getFilteredData();

  // Gabungkan data CPMI berdasarkan nama untuk filter selain 'hari'
  const processedPiketData = periodFilter === 'hari' 
    ? filteredPiketData 
    : filteredPiketData.reduce((acc, current) => {
        const existing = acc.find(item => item.nama === current.nama);
        if (existing) {
          existing.totalAktivitas += current.totalAktivitas;
          existing.totalLaporan += current.totalLaporan || 0;
          existing.fotoCount += current.fotoCount || 0;
        } else {
          acc.push({ ...current });
        }
        return acc;
      }, []);

  // Filter CPMI berdasarkan pencarian dan kelas
  const filteredData = processedPiketData.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKelas = selectedKelas === 'semua' || item.kelas === selectedKelas;
    return matchesSearch && matchesKelas;
  });

  const stats = {
    total: filteredData.length,
    totalLaporan: filteredData.reduce((sum, item) => sum + (item.totalLaporan || 0), 0),
    totalFoto: filteredData.reduce((sum, item) => sum + (item.fotoCount || 0), 0),
    totalAktivitas: filteredData.reduce((sum, item) => sum + (item.totalAktivitas || 0), 0),
    rataAktivitas: filteredData.length > 0 ? Math.round(filteredData.reduce((sum, item) => sum + (item.totalAktivitas || 0), 0) / filteredData.length) : 0
  };

  // Handle click to detail page
  const handleDetailClick = (cpmi) => {
    navigate(`/dashboard/admin/laporan-piket/detail/${encodeURIComponent(cpmi.nama)}`, {
      state: { 
        cpmiData: cpmi,
        periodFilter,
        startDate,
        endDate
      }
    });
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Laporan Piket" />
      
      <div className="p-4 pt-5">
        {/* Header & Export */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-light-text-main dark:text-dark-text-main">
                Laporan Piket
              </h1>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Aktivitas harian CPMI yang sedang piket
              </p>
            </div>
            <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
            <input
              type="text"
              placeholder="Cari nama CPMI atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </motion.div>

        {/* Filter Periode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-6"
        >
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
            <span className="text-sm font-medium text-light-text-main dark:text-dark-text-main">Filter Periode</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {[
              { value: 'hari', label: 'Hari Ini' },
              { value: 'minggu', label: 'Minggu Ini' },
              { value: 'bulan', label: 'Bulan Ini' },
              { value: 'custom', label: 'Custom' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setPeriodFilter(option.value);
                  if (option.value !== 'custom') {
                    setShowDatePicker(false);
                  } else {
                    setShowDatePicker(true);
                  }
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  periodFilter === option.value
                    ? 'bg-purple-500 text-white'
                    : 'bg-light-body dark:bg-dark-body text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-main dark:hover:text-dark-text-main'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Custom Date Range */}
          {periodFilter === 'custom' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
            >
              <div>
                <label className="block text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </motion.div>
          )}

          {/* Class Filter */}
          <div>
            <label className="block text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
              Filter Kelas
            </label>
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="w-full px-3 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {kelasOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <User className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">CPMI Piket</span>
            </div>
            <div className="text-xl font-bold text-light-text-main dark:text-dark-text-main">{stats.total}</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Total Laporan</span>
            </div>
            <div className="text-xl font-bold text-blue-600">{stats.totalLaporan}</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <Camera className="w-4 h-4 text-green-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Total Foto</span>
            </div>
            <div className="text-xl font-bold text-green-600">{stats.totalFoto}</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-orange-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Rata-rata</span>
            </div>
            <div className="text-xl font-bold text-orange-600">{stats.rataAktivitas}</div>
          </div>
        </motion.div>

        {/* CPMI Piket List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pb-24"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-light-text-main dark:text-dark-text-main">
              {periodFilter === 'hari' ? 'CPMI Piket Hari Ini' :
               periodFilter === 'minggu' ? 'CPMI Piket Minggu Ini' :
               periodFilter === 'bulan' ? 'CPMI Piket Bulan Ini' :
               'CPMI Piket Periode Custom'}
            </h2>
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {filteredData.length} CPMI ditemukan
            </span>
          </div>

          <div className="space-y-4">
            {filteredData.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <User className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  {periodFilter === 'hari' ? 'Tidak ada CPMI piket hari ini' :
                   periodFilter === 'minggu' ? 'Tidak ada CPMI piket minggu ini' :
                   periodFilter === 'bulan' ? 'Tidak ada CPMI piket bulan ini' :
                   'Tidak ada CPMI piket pada periode yang dipilih'}
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  {periodFilter === 'hari' ? `Belum ada CPMI yang sedang piket pada ${today}` :
                   'Belum ada data laporan piket untuk periode yang dipilih'}
                </p>
              </motion.div>
            ) : (
              filteredData.map((cpmi, index) => (
                <motion.div
                  key={cpmi.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleDetailClick(cpmi)}
                  className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-purple-500"
                >
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        {cpmi.nama.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-light-text-main dark:text-dark-text-main mb-1">
                        {cpmi.nama}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{cpmi.lokasi}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{cpmi.kelas}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Pengajar: {cpmi.pengajar}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-light-text-secondary dark:text-dark-text-secondary">
                            Aktivitas: <span className="font-medium text-purple-500">{cpmi.totalAktivitas}</span>
                          </span>
                          {periodFilter === 'hari' && cpmi.totalLaporan && (
                            <span className="text-light-text-secondary dark:text-dark-text-secondary">
                              Laporan: <span className="font-medium text-blue-500">{cpmi.totalLaporan}</span>
                            </span>
                          )}
                          {periodFilter === 'hari' && cpmi.fotoCount && (
                            <span className="text-light-text-secondary dark:text-dark-text-secondary">
                              Foto: <span className="font-medium text-green-500">{cpmi.fotoCount}</span>
                            </span>
                          )}
                        </div>
                        <Eye className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                      </div>
                      {periodFilter === 'hari' && cpmi.statusTerakhir && (
                        <div className="mt-2 p-2 bg-light-body dark:bg-dark-body rounded-lg">
                          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                            Status terakhir: <span className="text-light-text-main dark:text-dark-text-main">{cpmi.statusTerakhir}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LaporanPiketAdmin;