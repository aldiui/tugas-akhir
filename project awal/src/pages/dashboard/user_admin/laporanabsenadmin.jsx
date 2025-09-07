import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  User, 
  Filter,
  Search,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Building2,
  Users,
  Eye
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';

const LaporanAbsenAdmin = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [periodFilter, setPeriodFilter] = useState('hari');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('semua');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  // Set default date range based on period
  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    switch (periodFilter) {
      case 'hari':
        setStartDate(todayStr);
        setEndDate(todayStr);
        break;
      case 'minggu':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        setStartDate(startOfWeek.toISOString().split('T')[0]);
        setEndDate(endOfWeek.toISOString().split('T')[0]);
        break;
      case 'bulan':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        setStartDate(startOfMonth.toISOString().split('T')[0]);
        setEndDate(endOfMonth.toISOString().split('T')[0]);
        break;
      case 'tahun':
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const endOfYear = new Date(today.getFullYear(), 11, 31);
        setStartDate(startOfYear.toISOString().split('T')[0]);
        setEndDate(endOfYear.toISOString().split('T')[0]);
        break;
      default:
        break;
    }
  }, [periodFilter]);

  // Generate dummy data untuk semua kelas
  const generateDummyData = () => {
    const today = new Date();
    const data = [];
    const cpmiData = [
      { nama: 'Siti Nurhaliza', kelas: 'Taiwan A', pengajar: 'Bu Sari Dewi', foto: '/api/placeholder/40/40', status_cpmi: 'Aktif' },
      { nama: 'Ahmad Fauzi', kelas: 'Taiwan A', pengajar: 'Bu Sari Dewi', foto: '/api/placeholder/40/40', status_cpmi: 'Aktif' },
      { nama: 'Rina Kartika', kelas: 'Taiwan B', pengajar: 'Pak Budi Santoso', foto: '/api/placeholder/40/40', status_cpmi: 'Piket' },
      { nama: 'Dedi Kurniawan', kelas: 'Taiwan B', pengajar: 'Pak Budi Santoso', foto: '/api/placeholder/40/40', status_cpmi: 'Aktif' },
      { nama: 'Maya Sari', kelas: 'Taiwan C', pengajar: 'Bu Indira Wati', foto: '/api/placeholder/40/40', status_cpmi: 'Piket' },
      { nama: 'Budi Santoso', kelas: 'Taiwan C', pengajar: 'Bu Indira Wati', foto: '/api/placeholder/40/40', status_cpmi: 'Aktif' },
      { nama: 'Dewi Sartika', kelas: 'Taiwan A', pengajar: 'Bu Sari Dewi', foto: '/api/placeholder/40/40', status_cpmi: 'Aktif' },
      { nama: 'Ahmad Rizki', kelas: 'Taiwan B', pengajar: 'Pak Budi Santoso', foto: '/api/placeholder/40/40', status_cpmi: 'Aktif' }
    ];
    
    // Generate data untuk 30 hari terakhir
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      cpmiData.forEach((person, index) => {
        let statuses;
        if (person.status_cpmi === 'Piket') {
          statuses = ['piket'];
        } else {
          statuses = ['hadir', 'terlambat', 'tidak_hadir', 'izin'];
        }
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        let keterangan = '';
        let jamMasuk = '';
        let jamPulang = '';
        
        if (randomStatus === 'hadir') {
          jamMasuk = '07:' + (30 + Math.floor(Math.random() * 30)).toString().padStart(2, '0');
          jamPulang = '16:' + (15 + Math.floor(Math.random() * 30)).toString().padStart(2, '0');
        } else if (randomStatus === 'terlambat') {
          jamMasuk = '08:' + (0 + Math.floor(Math.random() * 30)).toString().padStart(2, '0');
          jamPulang = '16:' + (15 + Math.floor(Math.random() * 30)).toString().padStart(2, '0');
          const alasanTerlambat = [
            'Terjebak macet di jalan raya',
            'Kendaraan mogok',
            'Hujan deras',
            'Bangun kesiangan',
            'Antre di bank'
          ];
          keterangan = alasanTerlambat[Math.floor(Math.random() * alasanTerlambat.length)];
        } else if (randomStatus === 'tidak_hadir') {
          jamMasuk = '-';
          jamPulang = '-';
          keterangan = 'Sakit';
        } else if (randomStatus === 'izin') {
          jamMasuk = '-';
          jamPulang = '-';
          keterangan = 'Keperluan keluarga';
        } else if (randomStatus === 'piket') {
          jamMasuk = '-';
          jamPulang = '-';
          keterangan = 'Magang di rumah majikan';
        }
        
        data.push({
          id: `${dateStr}-${index}`,
          nama: person.nama,
          kelas: person.kelas,
          pengajar: person.pengajar,
          foto: person.foto,
          status: randomStatus,
          tanggal: dateStr,
          jamMasuk: jamMasuk,
          jamPulang: jamPulang,
          lokasi: randomStatus === 'piket' ? 'Rumah Majikan' : (randomStatus === 'hadir' || randomStatus === 'terlambat' ? 'Dalam Radius' : '-'),
          keterangan: keterangan,
          status_cpmi: person.status_cpmi
        });
      });
    }
    
    return data;
  };
  
  const absensiData = generateDummyData();

  const kelasOptions = [
    { value: 'semua', label: 'Semua Kelas' },
    { value: 'Taiwan A', label: 'Taiwan A' },
    { value: 'Taiwan B', label: 'Taiwan B' },
    { value: 'Taiwan C', label: 'Taiwan C' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'hadir':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'terlambat':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'tidak_hadir':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'izin':
        return <User className="w-5 h-5 text-blue-500" />;
      case 'piket':
        return <Building2 className="w-5 h-5 text-purple-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'hadir':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'terlambat':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'tidak_hadir':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'izin':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'piket':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  // Filter data berdasarkan status, pencarian, kelas, dan date range
  const filteredAbsensi = absensiData.filter(absen => {
    const matchesFilter = selectedFilter === 'semua' || absen.status === selectedFilter;
    const matchesSearch = absen.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         absen.kelas.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKelas = selectedKelas === 'semua' || absen.kelas === selectedKelas;
    
    // Filter berdasarkan date range
    let matchesDate = true;
    if (startDate && endDate) {
      const itemDate = new Date(absen.tanggal);
      const start = new Date(startDate);
      const end = new Date(endDate);
      matchesDate = itemDate >= start && itemDate <= end;
    }
    
    return matchesFilter && matchesSearch && matchesKelas && matchesDate;
  });

  // Group data by CPMI untuk tampilan summary
  const groupedByCPMI = () => {
    const grouped = {};
    
    filteredAbsensi.forEach(absen => {
      if (!grouped[absen.nama]) {
        grouped[absen.nama] = {
          nama: absen.nama,
          kelas: absen.kelas,
          pengajar: absen.pengajar,
          foto: absen.foto,
          status_cpmi: absen.status_cpmi,
          absensi: [],
          summary: {
            hadir: 0,
            terlambat: 0,
            tidak_hadir: 0,
            izin: 0,
            piket: 0,
            total: 0
          }
        };
      }
      
      grouped[absen.nama].absensi.push(absen);
      grouped[absen.nama].summary[absen.status]++;
      grouped[absen.nama].summary.total++;
    });
    
    return Object.values(grouped);
  };

  const cpmiGrouped = groupedByCPMI();

  // Calculate overall statistics
  const overallStats = {
    total: cpmiGrouped.length,
    hadir: filteredAbsensi.filter(item => item.status === 'hadir').length,
    terlambat: filteredAbsensi.filter(item => item.status === 'terlambat').length,
    tidak_hadir: filteredAbsensi.filter(item => item.status === 'tidak_hadir').length,
    izin: filteredAbsensi.filter(item => item.status === 'izin').length,
    piket: filteredAbsensi.filter(item => item.status === 'piket').length
  };

  // Data untuk tampilan hari ini (individual records)
  const todayData = filteredAbsensi.filter(item => {
    return periodFilter === 'hari' && item.tanggal === currentDate;
  });

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Laporan Absensi" />
      
      <div className="p-4 pt-5">
        {/* Header & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-light-text-main dark:text-dark-text-main">
                Laporan Absensi
              </h1>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Data kehadiran semua CPMI Taiwan
              </p>
            </div>
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>

          {/* Period Filter */}
          <div className="flex space-x-2 mb-4">
            {[
              { value: 'hari', label: 'Hari Ini' },
              { value: 'minggu', label: 'Minggu Ini' },
              { value: 'bulan', label: 'Bulan Ini' },
              { value: 'custom', label: 'Custom' }
            ].map(period => (
              <button
                key={period.value}
                onClick={() => setPeriodFilter(period.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  periodFilter === period.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main hover:bg-light-hover dark:hover:bg-dark-hover'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>

          {/* Custom Date Range */}
          {periodFilter === 'custom' && (
            <div className="flex space-x-2 mb-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-main dark:text-dark-text-main text-sm"
              />
              <span className="flex items-center text-light-text-secondary dark:text-dark-text-secondary">-</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-main dark:text-dark-text-main text-sm"
              />
            </div>
          )}

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary w-4 h-4" />
              <input
                type="text"
                placeholder="Cari nama atau kelas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-main dark:text-dark-text-main text-sm"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-main dark:text-dark-text-main text-sm"
            >
              <option value="semua">Semua Status</option>
              <option value="hadir">Hadir</option>
              <option value="terlambat">Terlambat</option>
              <option value="tidak_hadir">Tidak Hadir</option>
              <option value="izin">Izin</option>
              <option value="piket">Piket</option>
            </select>

            {/* Kelas Filter */}
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="px-4 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-light-text-main dark:text-dark-text-main text-sm"
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
          className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-6"
        >
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Total CPMI</span>
            </div>
            <div className="text-xl font-bold text-light-text-main dark:text-dark-text-main">{overallStats.total}</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Hadir</span>
            </div>
            <div className="text-xl font-bold text-green-600">{overallStats.hadir}</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Terlambat</span>
            </div>
            <div className="text-xl font-bold text-yellow-600">{overallStats.terlambat}</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Tidak Hadir</span>
            </div>
            <div className="text-xl font-bold text-red-600">{overallStats.tidak_hadir}</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Izin</span>
            </div>
            <div className="text-xl font-bold text-blue-600">{overallStats.izin}</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-1">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Piket</span>
            </div>
            <div className="text-xl font-bold text-purple-600">{overallStats.piket}</div>
          </div>
        </motion.div>

        {/* Content based on period filter */}
        {periodFilter === 'hari' ? (
          /* Today's Individual Records */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-light-card dark:bg-dark-card rounded-lg shadow-sm overflow-hidden border border-light-border dark:border-dark-border"
          >
            <div className="p-4 border-b border-light-border dark:border-dark-border">
              <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                Absensi Hari Ini ({todayData.length} data)
              </h2>
            </div>
            <div className="divide-y divide-light-border dark:divide-dark-border">
              {todayData.map((item, index) => (
                <div key={item.id} className="p-4 hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {item.nama.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-medium text-light-text-main dark:text-dark-text-main text-sm">{item.nama}</h3>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.kelas}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main">{item.jamMasuk}</p>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.lokasi}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status === 'hadir' ? 'Hadir' :
                           item.status === 'terlambat' ? 'Terlambat' :
                           item.status === 'tidak_hadir' ? 'Tidak Hadir' :
                           item.status === 'izin' ? 'Izin' :
                           item.status === 'piket' ? 'Piket' : item.status}
                        </span>
                      </div>
                      <button className="p-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-main dark:hover:text-dark-text-main">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {item.keterangan && (
                    <div className="mt-2 ml-13">
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        <span className="font-medium">Keterangan:</span> {item.keterangan}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Summary by CPMI for other periods */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-light-card dark:bg-dark-card rounded-lg shadow-sm overflow-hidden border border-light-border dark:border-dark-border"
          >
            <div className="p-4 border-b border-light-border dark:border-dark-border">
              <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                Ringkasan Absensi ({cpmiGrouped.length} CPMI)
              </h2>
            </div>
            <div className="divide-y divide-light-border dark:divide-dark-border">
              {cpmiGrouped.map((cpmi, index) => (
                <div key={cpmi.nama} className="p-4 hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {cpmi.nama.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-medium text-light-text-main dark:text-dark-text-main text-sm">{cpmi.nama}</h3>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{cpmi.kelas} • {cpmi.pengajar}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cpmi.status_cpmi === 'Aktif' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        cpmi.status_cpmi === 'Piket' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {cpmi.status_cpmi}
                      </span>
                      <button className="p-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-main dark:hover:text-dark-text-main">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Attendance Summary */}
                  <div className="grid grid-cols-5 gap-2 text-center">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                      <div className="text-lg font-bold text-green-600">{cpmi.summary.hadir}</div>
                      <div className="text-xs text-green-600">Hadir</div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-2">
                      <div className="text-lg font-bold text-yellow-600">{cpmi.summary.terlambat}</div>
                      <div className="text-xs text-yellow-600">Terlambat</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2">
                      <div className="text-lg font-bold text-red-600">{cpmi.summary.tidak_hadir}</div>
                      <div className="text-xs text-red-600">Tidak Hadir</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                      <div className="text-lg font-bold text-blue-600">{cpmi.summary.izin}</div>
                      <div className="text-xs text-blue-600">Izin</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
                      <div className="text-lg font-bold text-purple-600">{cpmi.summary.piket}</div>
                      <div className="text-xs text-purple-600">Piket</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {((periodFilter === 'hari' && todayData.length === 0) || 
          (periodFilter !== 'hari' && cpmiGrouped.length === 0)) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-light-card dark:bg-dark-card rounded-lg shadow-sm p-12 text-center border border-light-border dark:border-dark-border"
          >
            <Users className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
              Tidak ada data absensi
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Belum ada data absensi untuk periode yang dipilih
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LaporanAbsenAdmin;

