import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Filter, 
  Search, 
  Download, 
  UserCheck, 
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Coffee,
  User
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';
import { useCPMI } from '../../../context/CPMIContext';

const DetailAbsensiCPMI = () => {
  const { nama } = useParams();
  const location = useLocation();
  const { cpmiList } = useCPMI();
  
  // Parse query parameters dari URL
  const queryParams = new URLSearchParams(location.search);
  const periodFilter = queryParams.get('period') || 'hari';
  const startDate = queryParams.get('start') || '';
  const endDate = queryParams.get('end') || '';
  const selectedFilter = queryParams.get('filter') || 'semua';
  
  // Decode nama dari URL parameter
  const decodedNama = decodeURIComponent(nama || '');
  
  // Cari data CPMI berdasarkan nama
  const cpmiData = cpmiList.find(cpmi => cpmi.nama === decodedNama);

  // Generate dummy data for specific CPMI
  const generateDummyData = () => {
    if (!cpmiData) return [];
    
    const dummyAbsensi = [];
    const today = new Date();
    
    // Generate data untuk 30 hari terakhir
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Skip weekend (Saturday = 6, Sunday = 0)
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      // Adjust status generation based on CPMI status
      let statuses = ['hadir', 'terlambat', 'tidak_hadir', 'izin'];
      if (cpmiData.status_cpmi === 'Piket') {
        statuses = ['piket', 'hadir', 'izin']; // Lebih banyak piket untuk status piket
      }
      
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      let keterangan = '';
      if (randomStatus === 'terlambat') {
        const reasons = ['Macet', 'Bangun kesiangan', 'Kendaraan rusak', 'Hujan deras'];
        keterangan = reasons[Math.floor(Math.random() * reasons.length)];
      } else if (randomStatus === 'tidak_hadir') {
        const reasons = ['Sakit', 'Keperluan keluarga', 'Tidak ada kabar'];
        keterangan = reasons[Math.floor(Math.random() * reasons.length)];
      } else if (randomStatus === 'izin') {
        const reasons = ['Sakit', 'Keperluan keluarga', 'Urusan dokumen', 'Checkup kesehatan'];
        keterangan = reasons[Math.floor(Math.random() * reasons.length)];
      } else if (randomStatus === 'piket') {
        const reasons = ['Magang di rumah majikan', 'Praktik kerja lapangan', 'Training di lokasi kerja'];
        keterangan = reasons[Math.floor(Math.random() * reasons.length)];
      }
      
      dummyAbsensi.push({
        id: `abs-${i}`,
        tanggal: date.toISOString().split('T')[0],
        status: randomStatus,
        jam_masuk: randomStatus === 'hadir' ? '08:00' : randomStatus === 'terlambat' ? '08:30' : null,
        jam_keluar: randomStatus === 'hadir' || randomStatus === 'terlambat' ? '16:00' : null,
        keterangan: keterangan
      });
    }
    
    return dummyAbsensi;
  };

  const absensi = generateDummyData();
  
  // Jika CPMI tidak ditemukan, tampilkan pesan error
  if (!cpmiData) {
    return (
      <div className="min-h-screen bg-light-body dark:bg-dark-body">
        <BackHeader title="Detail Absensi - CPMI Tidak Ditemukan" />
        <div className="p-4 pt-5 pb-24">
          <div className="text-center py-12">
            <User className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
              CPMI Tidak Ditemukan
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Data CPMI dengan nama "{decodedNama}" tidak ditemukan.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Filter data
  const filteredAbsensi = absensi.filter(item => {
    const matchesFilter = selectedFilter === 'semua' || item.status === selectedFilter;
    
    let matchesDate = true;
    if (startDate && endDate) {
      const itemDate = new Date(item.tanggal);
      const start = new Date(startDate);
      const end = new Date(endDate);
      matchesDate = itemDate >= start && itemDate <= end;
    }
    
    return matchesFilter && matchesDate;
  });

  // Calculate statistics
  const stats = {
    hadir: filteredAbsensi.filter(item => item.status === 'hadir').length,
    terlambat: filteredAbsensi.filter(item => item.status === 'terlambat').length,
    tidak_hadir: filteredAbsensi.filter(item => item.status === 'tidak_hadir').length,
    izin: filteredAbsensi.filter(item => item.status === 'izin').length,
    piket: filteredAbsensi.filter(item => item.status === 'piket').length,
    total: filteredAbsensi.length
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'hadir': return <CheckCircle className="w-4 h-4" />;
      case 'terlambat': return <Clock className="w-4 h-4" />;
      case 'tidak_hadir': return <XCircle className="w-4 h-4" />;
      case 'izin': return <AlertCircle className="w-4 h-4" />;
      case 'piket': return <Coffee className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'hadir': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'terlambat': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'tidak_hadir': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'izin': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'piket': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'hadir': return 'Hadir';
      case 'terlambat': return 'Terlambat';
      case 'tidak_hadir': return 'Tidak Hadir';
      case 'izin': return 'Izin';
      case 'piket': return 'Piket';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title={`Detail Absensi - ${decodedNama}`} />
      
      <div className="p-4 pt-5 pb-24">
        {/* CPMI Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-6 text-white"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
              {cpmiData ? (
                <img 
                  src={cpmiData.foto} 
                  alt={cpmiData.nama}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="w-full h-full flex items-center justify-center text-white font-semibold text-xl" style={{display: cpmiData ? 'none' : 'flex'}}>
                {decodedNama.charAt(0)}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{decodedNama}</h2>
              {cpmiData && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                  cpmiData.status_cpmi === 'Aktif' ? 'bg-green-500/20 text-green-100' : 'bg-purple-500/20 text-purple-100'
                }`}>
                  {cpmiData.status_cpmi}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6"
        >
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Hadir</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.hadir}</p>
          </div>
          
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Terlambat</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.terlambat}</p>
          </div>
          
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Tidak Hadir</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{stats.tidak_hadir}</p>
          </div>
          
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Izin</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.izin}</p>
          </div>
          
          {stats.piket > 0 && (
            <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
              <div className="flex items-center space-x-2 mb-2">
                <Coffee className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Piket</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{stats.piket}</p>
            </div>
          )}
        </motion.div>

        {/* Info Periode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 mb-6 border border-light-border dark:border-dark-border"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                Periode Laporan
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {periodFilter === 'hari' ? 'Hari Ini' : 
                 periodFilter === 'minggu' ? 'Minggu Ini' :
                 periodFilter === 'bulan' ? 'Bulan Ini' : 'Periode Kustom'}
                {startDate && endDate && (
                  <span className="ml-2">({new Date(startDate).toLocaleDateString('id-ID')} - {new Date(endDate).toLocaleDateString('id-ID')})</span>
                )}
              </p>
            </div>
            <div>
              <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                Filter: {selectedFilter === 'semua' ? 'Semua Status' : 
                        selectedFilter === 'hadir' ? 'Hadir' :
                        selectedFilter === 'terlambat' ? 'Terlambat' :
                        selectedFilter === 'tidak_hadir' ? 'Tidak Hadir' :
                        selectedFilter === 'izin' ? 'Izin' : 'Piket'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Attendance List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-light-text-main dark:text-dark-text-main">
              Riwayat Absensi
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {filteredAbsensi.length} data ditemukan
              </span>
              <button className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-main dark:hover:text-dark-text-main hover:bg-light-body dark:hover:bg-dark-body rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {filteredAbsensi.length > 0 ? (
            <div className="space-y-3">
              {filteredAbsensi.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.02 }}
                  className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-light-text-main dark:text-dark-text-main">
                          {new Date(item.tanggal).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          {item.jam_masuk && (
                            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                              Masuk: {item.jam_masuk}
                            </span>
                          )}
                          {item.jam_keluar && (
                            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                              Pulang: {item.jam_keluar}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                      
                      {item.keterangan && (
                        <p className="text-xs mt-2 text-light-text-secondary dark:text-dark-text-secondary max-w-48 text-right">
                          {item.keterangan}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-light-text-secondary dark:text-dark-text-secondary">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Tidak ada data absensi ditemukan</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DetailAbsensiCPMI;