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
  ChevronRight
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const LaporanAbsenPengajar = () => {
  const { cpmiList } = useCPMI();
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [periodFilter, setPeriodFilter] = useState('hari'); // Default ke hari ini
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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

  // Dummy data absensi dengan beberapa hari
  const generateDummyData = () => {
    const today = new Date();
    const data = [];
    const names = [
      { nama: 'Siti Nurhaliza', foto: '/api/placeholder/40/40', status_cpmi: 'Aktif' },
      { nama: 'Ahmad Rizki', foto: '/api/placeholder/40/40', status_cpmi: 'Aktif' },
      { nama: 'Dewi Sartika', foto: '/api/placeholder/40/40', status_cpmi: 'Piket' },
      { nama: 'Budi Santoso', foto: '/api/placeholder/40/40', status_cpmi: 'Aktif' },
      { nama: 'Rina Wati', foto: '/api/placeholder/40/40', status_cpmi: 'Piket' }
    ];
    
    // Generate data untuk 30 hari terakhir
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      names.forEach((person, index) => {
        let statuses;
        if (person.status_cpmi === 'Piket') {
          statuses = ['piket'];
        } else {
          statuses = ['hadir', 'terlambat', 'tidak_hadir', 'izin'];
        }
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        let keterangan = '';
        if (randomStatus === 'terlambat') {
          const alasanTerlambat = [
            'Terjebak macet di jalan raya',
            'Kendaraan mogok',
            'Hujan deras',
            'Bangun kesiangan',
            'Antre di bank'
          ];
          keterangan = alasanTerlambat[Math.floor(Math.random() * alasanTerlambat.length)];
        } else if (randomStatus === 'tidak_hadir') {
          keterangan = 'Sakit';
        } else if (randomStatus === 'izin') {
          keterangan = 'Keperluan keluarga';
        } else if (randomStatus === 'piket') {
          keterangan = 'Magang di rumah majikan';
        }
        
        data.push({
          id: `${dateStr}-${index}`,
          nama: person.nama,
          foto: person.foto,
          status: randomStatus,
          tanggal: dateStr,
          keterangan: keterangan,
          status_cpmi: person.status_cpmi
        });
      });
    }
    
    return data;
  };
  
  const absensiData = generateDummyData();

  // Group data by CPMI
  // Filter data berdasarkan status, pencarian, dan date range
  const filteredAbsensi = absensiData.filter(absen => {
    const matchesFilter = selectedFilter === 'semua' || absen.status === selectedFilter;
    const matchesSearch = absen.nama.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter berdasarkan date range
    let matchesDate = true;
    if (startDate && endDate) {
      const itemDate = new Date(absen.tanggal);
      const start = new Date(startDate);
      const end = new Date(endDate);
      matchesDate = itemDate >= start && itemDate <= end;
    }
    
    return matchesFilter && matchesSearch && matchesDate;
  });

  // Group data by CPMI
  const groupedByCPMI = () => {
    const grouped = {};
    
    filteredAbsensi.forEach(absen => {
      if (!grouped[absen.nama]) {
        grouped[absen.nama] = {
          nama: absen.nama,
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
    hadir: filteredAbsensi.filter(item => item.status === 'hadir').length,
    tidak_hadir: filteredAbsensi.filter(item => item.status === 'tidak_hadir').length,
    piket: filteredAbsensi.filter(item => item.status === 'piket').length,
    izin: filteredAbsensi.filter(item => item.status === 'izin').length
  };

  // Filter absensi LPK (tanpa piket)
  const absensiLPK = filteredAbsensi.filter(item => item.status !== 'piket');

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Laporan Absensi" />
      
      <div className="p-4 pt-5 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-light-text-main dark:text-dark-text-main mb-2">
            Laporan Absensi CPMI
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Pantau kehadiran CPMI Taiwan Batch 15
          </p>
        </motion.div>

        {/* Hero Section - Overall Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Taiwan Batch 15</h2>
              <p className="text-blue-100">LPK Bahana Mega Prestasi</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{cpmiGrouped.length}</p>
              <p className="text-blue-100">Total CPMI</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <div>
                  <p className="text-sm text-blue-100">Hadir</p>
                  <p className="text-lg font-bold">{overallStats.hadir}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-300" />
                <div>
                  <p className="text-sm text-blue-100">Tidak Hadir</p>
                  <p className="text-lg font-bold">{overallStats.tidak_hadir}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-purple-300" />
                <div>
                  <p className="text-sm text-blue-100">Piket</p>
                  <p className="text-lg font-bold">{overallStats.piket}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-yellow-300" />
                <div>
                  <p className="text-sm text-blue-100">Izin</p>
                  <p className="text-lg font-bold">{overallStats.izin}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-6"
        >
          <div className="space-y-4">
            {/* Filter Periode */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'hari', label: 'Hari Ini' },
                { key: 'minggu', label: 'Minggu Ini' },
                { key: 'bulan', label: 'Bulan Ini' },
                { key: 'tahun', label: 'Tahun Ini' },
                { key: 'custom', label: 'Custom' }
              ].map((period) => (
                <button
                  key={period.key}
                  onClick={() => setPeriodFilter(period.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    periodFilter === period.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main hover:bg-light-border dark:hover:bg-dark-border'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>

            {/* Custom Date Range */}
            {periodFilter === 'custom' && (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tanggal Mulai"
                  />
                </div>
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tanggal Akhir"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                <input
                  type="text"
                  placeholder="Cari nama CPMI..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="semua">Semua Status</option>
                  <option value="hadir">Hadir</option>
                  <option value="terlambat">Terlambat</option>
                  <option value="tidak_hadir">Tidak Hadir</option>
                  <option value="izin">Izin</option>
                  <option value="piket">Piket</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daftar CPMI dengan Summary - Hidden ketika filter hari ini */}
        {periodFilter !== 'hari' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-light-text-main dark:text-dark-text-main">Daftar CPMI</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {cpmiGrouped.length} CPMI ditemukan
                </span>
                <button className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-main dark:hover:text-dark-text-main hover:bg-light-body dark:hover:bg-dark-body rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

          {cpmiGrouped.length > 0 ? (
            <div className="space-y-4">
              {cpmiGrouped.map((cpmi, index) => (
                <motion.div
                  key={cpmi.nama}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border overflow-hidden"
                >
                  {/* Header CPMI - Clickable */}
                   <div 
                     className="p-4 cursor-pointer hover:bg-light-body dark:hover:bg-dark-body transition-colors"
                     onClick={() => {
                       const params = new URLSearchParams({
                         period: periodFilter,
                         start: startDate,
                         end: endDate
                       });
                       navigate(`/dashboard/pengajar/laporan-piket/detail/${encodeURIComponent(cpmi.nama)}?${params.toString()}`);
                     }}
                   >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {/* Foto Profil */}
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <img 
                            src={cpmi.foto} 
                            alt={cpmi.nama}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full flex items-center justify-center text-white font-semibold text-lg" style={{display: 'none'}}>
                            {cpmi.nama.charAt(0)}
                          </div>
                        </div>
                        
                        {/* Nama dan Status */}
                        <div>
                          <h3 className="font-semibold text-light-text-main dark:text-dark-text-main">
                            {cpmi.nama}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            cpmi.status_cpmi === 'Aktif' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          }`}>
                            {cpmi.status_cpmi}
                          </span>
                        </div>
                      </div>
                      
                      {/* Summary Stats dan Arrow */}
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            Total: {cpmi.summary.total} hari
                          </p>
                          <div className="flex space-x-2 mt-1">
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                              H: {cpmi.summary.hadir}
                            </span>
                            <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded">
                              TH: {cpmi.summary.tidak_hadir}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                              I: {cpmi.summary.izin}
                            </span>
                            {cpmi.summary.piket > 0 && (
                              <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded">
                                P: {cpmi.summary.piket}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-light-text-secondary dark:text-dark-text-secondary">
              <UserCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Tidak ada data CPMI ditemukan</p>
            </div>
          )}
          </motion.div>
        )}

        {/* Section Absensi LPK (Tanpa Piket) - Hanya tampil ketika filter hari ini */}
        {periodFilter === 'hari' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-light-text-main dark:text-dark-text-main">Absensi LPK Hari Ini</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {absensiLPK.length} data absensi hari ini
                </span>
              </div>
            </div>

          {absensiLPK.length > 0 ? (
            <div className="space-y-3">
              {absensiLPK.map((absen, index) => (
                <motion.div
                  key={absen.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.02 }}
                  className={`bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-200 ${
                    absen.status === 'piket' ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => {
                    if (absen.status === 'piket') {
                      const params = new URLSearchParams({
                        period: periodFilter,
                        start: startDate,
                        end: endDate
                      });
                      navigate(`/dashboard/pengajar/laporan-piket/detail/${encodeURIComponent(absen.nama)}?${params.toString()}`);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Foto Profil */}
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <img 
                          src={absen.foto} 
                          alt={absen.nama}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full flex items-center justify-center text-white font-semibold text-sm" style={{display: 'none'}}>
                          {absen.nama.charAt(0)}
                        </div>
                      </div>
                      
                      {/* Nama dan Tanggal */}
                      <div>
                        <h3 className="font-medium text-light-text-main dark:text-dark-text-main">
                          {absen.nama}
                        </h3>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          {new Date(absen.tanggal).toLocaleDateString('id-ID', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Status */}
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        absen.status === 'hadir' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        absen.status === 'terlambat' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        absen.status === 'tidak_hadir' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {absen.status === 'hadir' ? 'Hadir' :
                         absen.status === 'terlambat' ? 'Terlambat' :
                         absen.status === 'tidak_hadir' ? 'Tidak Hadir' : 'Izin'}
                      </span>
                      
                      {absen.keterangan && (
                        <p className="text-xs mt-1 text-light-text-secondary dark:text-dark-text-secondary">
                          {absen.keterangan}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-light-text-secondary dark:text-dark-text-secondary">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Tidak ada data absensi LPK untuk hari ini</p>
            </div>
          )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LaporanAbsenPengajar;