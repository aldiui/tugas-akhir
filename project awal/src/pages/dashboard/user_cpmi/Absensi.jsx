import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Filter,
  Download,
  TrendingUp,
  MapPin,
  Info,
  ChevronRight
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const Absensi = () => {
  const { absensi } = useCPMI();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('semua');
  const [selectedMonth, setSelectedMonth] = useState('januari-2024');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Hadir':
        return { Icon: CheckCircle, className: "text-green-600" };
      case 'Terlambat':
        return { Icon: AlertTriangle, className: "text-yellow-600" };
      case 'Izin':
        return { Icon: Info, className: "text-blue-600" };
      case 'Alpha':
        return { Icon: XCircle, className: "text-red-600" };
      case 'Libur':
        return { Icon: Calendar, className: "text-gray-400" };
      default:
        return { Icon: Clock, className: "text-gray-400" };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hadir':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      case 'Terlambat':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'Izin':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
      case 'Alpha':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
      case 'Libur':
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const filteredAbsensi = absensi.filter(item => {
    if (selectedFilter === 'semua') return true;
    return item.status.toLowerCase() === selectedFilter;
  });

  const calculateStats = () => {
    const workDays = absensi.filter(item => item.status !== 'Libur');
    const hadir = workDays.filter(item => item.status === 'Hadir').length;
    const terlambat = workDays.filter(item => item.status === 'Terlambat').length;
    const izin = workDays.filter(item => item.status === 'Izin').length;
    const alpha = workDays.filter(item => item.status === 'Alpha').length;
    
    const totalWorkDays = workDays.length;
    const kehadiran = totalWorkDays > 0 ? ((hadir + terlambat) / totalWorkDays * 100).toFixed(1) : 0;
    
    return { hadir, terlambat, izin, alpha, totalWorkDays, kehadiran };
  };

  const stats = calculateStats();

  const rightAction = (
    <button className="p-2 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border transition-colors">
      <Download size={18} className="text-light-text-main dark:text-dark-text-main" />
    </button>
  );

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader 
        title="Absensi" 
        rightAction={rightAction}
      />
      
      <div className="p-4 space-y-6">
        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="card p-4 text-center">
            <TrendingUp className="mx-auto mb-2 text-green-600" size={24} />
            <p className="text-2xl font-bold text-light-text-main dark:text-dark-text-main">
              {stats.kehadiran}%
            </p>
            <p className="text-sm text-secondary">Kehadiran</p>
          </div>
          
          <div className="card p-4 text-center">
            <Calendar className="mx-auto mb-2 text-primary-600" size={24} />
            <p className="text-2xl font-bold text-light-text-main dark:text-dark-text-main">
              {stats.totalWorkDays}
            </p>
            <p className="text-sm text-secondary">Hari Kerja</p>
          </div>
        </motion.div>

        {/* Detailed Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="card p-4"
        >
          <h3 className="font-semibold text-light-text-main dark:text-dark-text-main mb-4">
            Statistik Jan 2024
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="text-green-600" size={16} />
              </div>
              <p className="text-lg font-bold text-light-text-main dark:text-dark-text-main">
                {stats.hadir}
              </p>
              <p className="text-xs text-secondary">Hadir</p>
            </div>
            
            <div className="text-center">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <XCircle className="text-red-600" size={16} />
              </div>
              <p className="text-lg font-bold text-light-text-main dark:text-dark-text-main">
                {stats.alpha + stats.terlambat + stats.izin}
              </p>
              <p className="text-xs text-secondary">Tidak Hadir</p>
            </div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex space-x-2 overflow-x-auto pb-2"
        >
          {[
            { key: 'semua', label: 'Semua' },
            { key: 'hadir', label: 'Hadir' },
            { key: 'terlambat', label: 'Terlambat' },
            { key: 'izin', label: 'Izin' },
            { key: 'libur', label: 'Libur' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedFilter === filter.key
                  ? 'bg-light-button-primary dark:bg-dark-button-primary text-white dark:text-dark-body'
                  : 'bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Attendance List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-3"
        >
          {filteredAbsensi.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="card p-4 cursor-pointer hover:shadow-md transition-all duration-200"
              onClick={() => navigate('/dashboard/cpmi/absensi/detail', { state: { absensi: item } })}
            >
              <div className="flex items-center space-x-4">
                {/* Date */}
                <div className="text-center min-w-[60px]">
                  <div className="text-lg font-bold text-light-text-main dark:text-dark-text-main">
                    {new Date(item.tanggal).getDate()}
                  </div>
                  <div className="text-xs text-secondary">
                    {item.hari.substring(0, 3)}
                  </div>
                </div>

                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {(() => {
                    const { Icon, className } = getStatusIcon(item.status);
                    return <Icon className={className} size={18} />;
                  })()}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-light-text-main dark:text-dark-text-main">
                      {new Date(item.tanggal).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  
                  {/* Time Info */}
                  {item.jam_masuk && (
                    <div className="text-sm text-secondary">
                      <span>{item.jam_masuk}</span>
                      {item.jam_pulang && <span> - {item.jam_pulang}</span>}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredAbsensi.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="card p-8 text-center"
          >
            <Clock size={48} className="mx-auto mb-4 text-secondary" />
            <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-2">
              Tidak Ada Data
            </h3>
            <p className="text-secondary">
              Tidak ada data absensi untuk filter yang dipilih
            </p>
          </motion.div>
        )}

        {/* Performance Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="card p-4 bg-gradient-to-r from-blue-50 to-primary-50 dark:from-blue-900/20 dark:to-primary-900/20 border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-start space-x-3">
            <TrendingUp className="text-blue-600 dark:text-blue-400 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Catatan Kinerja
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Tingkat kehadiran kamu {stats.kehadiran}% sangat baik! Pertahankan kedisiplinan ini untuk persiapan ke Taiwan.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Absensi;