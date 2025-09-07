import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Check,
  Send,
  Users
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import BackHeader from '../../../layout/BackHeader';
import NavBottom from '../../../layout/NavBottom';

const BroadcastSelectPengajar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || '';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCPMI, setSelectedCPMI] = useState([]);

  // Dummy CPMI data
  const cpmiList = [
    {
      id: 1,
      name: 'Siti Nurhaliza',
      status: 'Aktif',
      avatar: 'SN',
      kelas: 'Taiwan Batch 15'
    },
    {
      id: 2,
      name: 'Ahmad Fauzi',
      status: 'Aktif',
      avatar: 'AF',
      kelas: 'Taiwan Batch 15'
    },
    {
      id: 3,
      name: 'Dewi Sartika',
      status: 'Piket',
      avatar: 'DS',
      kelas: 'Taiwan Batch 15'
    },
    {
      id: 4,
      name: 'Budi Santoso',
      status: 'Aktif',
      avatar: 'BS',
      kelas: 'Taiwan Batch 15'
    },
    {
      id: 5,
      name: 'Rina Wati',
      status: 'Izin',
      avatar: 'RW',
      kelas: 'Taiwan Batch 15'
    },
    {
      id: 6,
      name: 'Joko Widodo',
      status: 'Aktif',
      avatar: 'JW',
      kelas: 'Taiwan Batch 15'
    }
  ];

  const filteredCPMI = cpmiList.filter(cpmi =>
    cpmi.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleSelect = (cpmiId) => {
    setSelectedCPMI(prev => 
      prev.includes(cpmiId)
        ? prev.filter(id => id !== cpmiId)
        : [...prev, cpmiId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCPMI.length === filteredCPMI.length) {
      setSelectedCPMI([]);
    } else {
      setSelectedCPMI(filteredCPMI.map(cpmi => cpmi.id));
    }
  };

  const handleSendMessage = () => {
    if (selectedCPMI.length > 0) {
      const selectedNames = cpmiList
        .filter(cpmi => selectedCPMI.includes(cpmi.id))
        .map(cpmi => cpmi.name)
        .join(', ');
      
      alert(`Pesan berhasil dikirim ke: ${selectedNames}`);
      navigate('/dashboard/pengajar/chat');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Piket': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Izin': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Terbang': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Pilih Penerima" />
      
      <div className="pt-5 px-4">
        {/* Message Preview */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border"
        >
          <h3 className="font-semibold text-light-text-main dark:text-dark-text-main mb-2">
            Pesan yang akan dikirim:
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm bg-light-accent dark:bg-dark-accent p-3 rounded-lg">
            {message || 'Tidak ada pesan'}
          </p>
        </motion.div>

        {/* Search and Select All */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 space-y-3"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
            <input
              type="text"
              placeholder="Cari CPMI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-xl bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Select All Button */}
          <button
            onClick={handleSelectAll}
            className="w-full p-3 bg-light-accent dark:bg-dark-accent text-light-text-main dark:text-dark-text-main rounded-xl flex items-center justify-center space-x-2 hover:bg-light-border dark:hover:bg-dark-border transition-colors"
          >
            <Users className="w-5 h-5" />
            <span>
              {selectedCPMI.length === filteredCPMI.length ? 'Batalkan Semua' : 'Pilih Semua'}
            </span>
          </button>
        </motion.div>

        {/* Selected Count */}
        {selectedCPMI.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
          >
            <p className="text-green-800 dark:text-green-400 text-sm font-medium">
              {selectedCPMI.length} CPMI dipilih
            </p>
          </motion.div>
        )}

        {/* CPMI List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-3 mb-6"
        >
          {filteredCPMI.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Tidak ada CPMI ditemukan
              </p>
            </div>
          ) : (
            filteredCPMI.map((cpmi, index) => (
              <motion.div
                key={cpmi.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleToggleSelect(cpmi.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedCPMI.includes(cpmi.id)
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card hover:border-green-300 dark:hover:border-green-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      {cpmi.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-light-text-main dark:text-dark-text-main">
                        {cpmi.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cpmi.status)}`}>
                          {cpmi.status}
                        </span>
                        <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          {cpmi.kelas}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedCPMI.includes(cpmi.id) && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Send Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="fixed bottom-24 left-4 right-4"
        >
          <button
            onClick={handleSendMessage}
            disabled={selectedCPMI.length === 0}
            className={`w-full p-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all ${
              selectedCPMI.length === 0
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            <Send className="w-5 h-5" />
            <span>
              Kirim Pesan ({selectedCPMI.length})
            </span>
          </button>
        </motion.div>
      </div>

      <NavBottom />
    </div>
  );
};

export default BroadcastSelectPengajar;