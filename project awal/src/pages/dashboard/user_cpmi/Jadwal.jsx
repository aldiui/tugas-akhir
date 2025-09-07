import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BookOpen,
  ChevronRight,
  Filter,
  RefreshCw
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const Jadwal = () => {
  const { jadwal, cpmi } = useCPMI();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('semua');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Berlangsung':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      case 'Akan Datang':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
      case 'Selesai':
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getTimeStatus = (jamMulai, jamSelesai) => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    
    if (currentTime < jamMulai) {
      return 'Akan Datang';
    } else if (currentTime >= jamMulai && currentTime <= jamSelesai) {
      return 'Berlangsung';
    } else {
      return 'Selesai';
    }
  };

  const filteredPelajaran = jadwal.mata_pelajaran.filter(pelajaran => {
    if (selectedFilter === 'semua') return true;
    const status = getTimeStatus(pelajaran.jam_mulai, pelajaran.jam_selesai);
    return status.toLowerCase().replace(' ', '-') === selectedFilter;
  });

  const getCurrentPelajaran = () => {
    return jadwal.mata_pelajaran.find(p => 
      getTimeStatus(p.jam_mulai, p.jam_selesai) === 'Berlangsung'
    );
  };

  const getNextPelajaran = () => {
    return jadwal.mata_pelajaran.find(p => 
      getTimeStatus(p.jam_mulai, p.jam_selesai) === 'Akan Datang'
    );
  };

  const currentPelajaran = getCurrentPelajaran();
  const nextPelajaran = getNextPelajaran();

  const rightAction = (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="p-2 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border transition-colors disabled:opacity-50"
    >
      <RefreshCw 
        size={18} 
        className={`text-light-text-main dark:text-dark-text-main ${
          isRefreshing ? 'animate-spin' : ''
        }`} 
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader 
        title="Jadwal" 
        rightAction={rightAction}
      />
      
      <div className="p-4 space-y-6">
        {/* Date Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                {jadwal.hari}, {new Date(jadwal.tanggal).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </h2>
              <p className="text-sm text-secondary">
                {jadwal.mata_pelajaran.length} matpel
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-secondary">Kelas</p>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">
                {cpmi.kelas}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Current/Next Class Alert */}
        {(currentPelajaran || nextPelajaran) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="card p-3 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800"
          >
            <div className="flex items-center space-x-2">
              <BookOpen className="text-primary-600 dark:text-primary-400" size={16} />
              <div className="flex-1">
                <p className="text-sm font-medium text-primary-800 dark:text-primary-200">
                  {currentPelajaran ? 'Berlangsung' : 'Selanjutnya'}: {(currentPelajaran || nextPelajaran).nama}
                </p>
                <p className="text-xs text-primary-700 dark:text-primary-300">
                  {(currentPelajaran || nextPelajaran).jam_mulai} - {(currentPelajaran || nextPelajaran).jam_selesai}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex space-x-2 overflow-x-auto pb-2"
        >
          {[
            { key: 'semua', label: 'Semua' },
            { key: 'berlangsung', label: 'Berlangsung' },
            { key: 'akan-datang', label: 'Akan Datang' },
            { key: 'selesai', label: 'Selesai' }
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

        {/* Schedule List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-3"
        >
          {filteredPelajaran.map((pelajaran, index) => {
            const status = getTimeStatus(pelajaran.jam_mulai, pelajaran.jam_selesai);
            
            return (
              <motion.div
                key={pelajaran.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="card p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/dashboard/cpmi/jadwal/detail', { state: { pelajaran } })}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-light-text-main dark:text-dark-text-main">
                        {pelajaran.nama}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {status}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-secondary">
                      <span>{pelajaran.jam_mulai} - {pelajaran.jam_selesai}</span>
                      <span>{pelajaran.ruang}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight size={20} className="text-secondary" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredPelajaran.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="card p-8 text-center"
          >
            <Calendar size={48} className="mx-auto mb-4 text-secondary" />
            <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-2">
              Tidak Ada Jadwal
            </h3>
            <p className="text-secondary">
              Tidak ada pelajaran untuk filter yang dipilih
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Jadwal;