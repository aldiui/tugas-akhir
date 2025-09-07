import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter,
  X,
  Save,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  AlertCircle,
  CheckCircle,
  Clock,
  Plane,
  UserX,
  FileText,
  Eye,
  ChevronRight
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import BackHeader from '../../../layout/BackHeader';

const CPMIManagementAdmin = () => {
  const { cpmiList, setCpmiList } = useCPMI();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterKelas, setFilterKelas] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedCPMI, setSelectedCPMI] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    alamat: '',
    tanggal_lahir: '',
    status: 'Aktif',
    kelas: 'Taiwan Batch 15',
    pengajar: 'Bu Mei Lin',
    tanggal_mulai_pelatihan: '',
    target_keberangkatan: '',
    agency: '',
    lokasi_penempatan: '',
    jenis_pekerjaan: ''
  });
  const [statusFormData, setStatusFormData] = useState({
    status: '',
    tanggal_mulai_piket: '',
    tanggal_selesai_piket: '',
    piket_tidak_terbatas: false,
    lokasi_piket: '',
    tanggal_terbang: '',
    keterangan: ''
  });

  const resetStatusForm = () => {
    setStatusFormData({
      status: '',
      tanggal_mulai_piket: '',
      tanggal_selesai_piket: '',
      piket_tidak_terbatas: false,
      lokasi_piket: '',
      tanggal_terbang: '',
      keterangan: ''
    });
    setShowStatusModal(false);
  };

  // Data lokasi piket yang tersedia
  const lokasiPiketOptions = [
    { id: 'rumah_majikan_1', nama: 'Rumah Majikan - Taipei', alamat: 'Xinyi District, Taipei City' },
    { id: 'rumah_majikan_2', nama: 'Rumah Majikan - Taichung', alamat: 'West District, Taichung City' },
    { id: 'rumah_majikan_3', nama: 'Rumah Majikan - Kaohsiung', alamat: 'Lingya District, Kaohsiung City' },
    { id: 'pabrik_1', nama: 'Pabrik Elektronik - Hsinchu', alamat: 'East District, Hsinchu City' },
    { id: 'pabrik_2', nama: 'Pabrik Tekstil - Taoyuan', alamat: 'Zhongli District, Taoyuan City' },
    { id: 'restoran_1', nama: 'Restoran Taiwan - Tainan', alamat: 'Anping District, Tainan City' },
    { id: 'hotel_1', nama: 'Hotel Mewah - Taipei', alamat: 'Da\'an District, Taipei City' },
    { id: 'peternakan_1', nama: 'Peternakan - Changhua', alamat: 'Changhua City, Changhua County' }
  ];

  const statusOptions = [
    { value: 'Aktif', label: 'Aktif', color: 'green', icon: CheckCircle },
    { value: 'Piket', label: 'Piket', color: 'yellow', icon: Clock },
    { value: 'Terbang', label: 'Terbang', color: 'blue', icon: Plane },
    { value: 'Izin', label: 'Izin', color: 'purple', icon: FileText },
    { value: 'Tidak Aktif', label: 'Mengundurkan Diri', color: 'red', icon: UserX }
  ];

  const kelasOptions = [
    'Taiwan Batch 15',
    'Taiwan Batch 16', 
    'Taiwan Batch 17',
    'Taiwan Batch 18'
  ];

  const pengajarOptions = [
    'Bu Mei Lin',
    'Pak Chen Wei',
    'Bu Li Hua',
    'Pak Wang Ming'
  ];

  // Filter CPMI based on search, status, and class
  const filteredCPMI = cpmiList.filter(cpmi => {
    const matchesSearch = cpmi.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cpmi.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cpmi.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cpmi.status === filterStatus;
    const matchesKelas = filterKelas === 'all' || cpmi.kelas === filterKelas;
    return matchesSearch && matchesStatus && matchesKelas;
  });

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.color : 'gray';
  };

  const getStatusIcon = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.icon : AlertCircle;
  };

  const handleAddCPMI = () => {
    setFormData({
      nama: '',
      email: '',
      telepon: '',
      alamat: '',
      tanggal_lahir: '',
      status: 'Aktif',
      kelas: 'Taiwan Batch 15',
      pengajar: 'Bu Mei Lin',
      tanggal_mulai_pelatihan: '',
      target_keberangkatan: '',
      agency: '',
      lokasi_penempatan: '',
      jenis_pekerjaan: ''
    });
    setShowAddModal(true);
  };

  const handleViewDetail = (cpmi) => {
    navigate('/dashboard/admin/cpmi-detail', { state: { cpmi } });
  };

  const handleEditCPMI = (cpmi) => {
    navigate('/dashboard/admin/cpmi-edit', { state: { cpmi } });
  };

  const handleChangeStatus = (cpmi) => {
    setSelectedCPMI(cpmi);
    setStatusFormData({
      status: cpmi.status,
      tanggal_mulai_piket: cpmi.tanggal_mulai_piket || '',
      tanggal_selesai_piket: cpmi.tanggal_selesai_piket || '',
      piket_tidak_terbatas: !cpmi.tanggal_selesai_piket && cpmi.tanggal_mulai_piket,
      lokasi_piket: cpmi.lokasi_piket || '',
      tanggal_terbang: cpmi.tanggal_terbang || '',
      keterangan: cpmi.keterangan || ''
    });
    setShowStatusModal(true);
  };

  const handleSaveCPMI = () => {
    // Add new CPMI
    const newCPMI = {
      ...formData,
      id: `CPMI${String(cpmiList.length + 1).padStart(3, '0')}`,
      foto: '/images/profile-placeholder.jpg'
    };
    setCpmiList(prev => [...prev, newCPMI]);
    setShowAddModal(false);
  };

  const handleSaveStatus = () => {
    if (selectedCPMI) {
      const updatedCPMI = {
        ...selectedCPMI,
        status: statusFormData.status,
        ...(statusFormData.status === 'Piket' && {
          tanggal_mulai_piket: statusFormData.tanggal_mulai_piket,
          tanggal_selesai_piket: statusFormData.piket_tidak_terbatas ? null : statusFormData.tanggal_selesai_piket,
          lokasi_piket: statusFormData.lokasi_piket
        }),
        ...(statusFormData.status === 'Terbang' && {
          tanggal_terbang: statusFormData.tanggal_terbang
        }),
        ...((statusFormData.status === 'Tidak Aktif' || statusFormData.status === 'Izin') && {
          keterangan: statusFormData.keterangan
        })
      };
      
      setCpmiList(prev => prev.map(cpmi => 
        cpmi.id === selectedCPMI.id ? updatedCPMI : cpmi
      ));
    }
    setShowStatusModal(false);
    setSelectedCPMI(null);
  };

  const handleDeleteCPMI = (cpmiId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus CPMI ini?')) {
      setCpmiList(prev => prev.filter(cpmi => cpmi.id !== cpmiId));
    }
  };

  const renderStatusForm = () => {
    switch (statusFormData.status) {
      case 'Piket':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                Lokasi Piket
              </label>
              <select
                value={statusFormData.lokasi_piket}
                onChange={(e) => setStatusFormData(prev => ({ ...prev, lokasi_piket: e.target.value }))}
                className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Pilih lokasi piket...</option>
                {lokasiPiketOptions.map(lokasi => (
                  <option key={lokasi.id} value={lokasi.id}>
                    {lokasi.nama} - {lokasi.alamat}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                Tanggal Mulai Piket
              </label>
              <input
                type="date"
                value={statusFormData.tanggal_mulai_piket}
                onChange={(e) => setStatusFormData(prev => ({ ...prev, tanggal_mulai_piket: e.target.value }))}
                className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="piket_tidak_terbatas"
                checked={statusFormData.piket_tidak_terbatas}
                onChange={(e) => setStatusFormData(prev => ({ ...prev, piket_tidak_terbatas: e.target.checked }))}
                className="w-4 h-4 text-purple-600 bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border rounded focus:ring-purple-500"
              />
              <label htmlFor="piket_tidak_terbatas" className="text-sm text-light-text-main dark:text-dark-text-main">
                Tanggal selesai tidak ditentukan
              </label>
            </div>
            
            {!statusFormData.piket_tidak_terbatas && (
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Tanggal Selesai Piket
                </label>
                <input
                  type="date"
                  value={statusFormData.tanggal_selesai_piket}
                  onChange={(e) => setStatusFormData(prev => ({ ...prev, tanggal_selesai_piket: e.target.value }))}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            )}
          </div>
        );
      
      case 'Terbang':
        return (
          <div>
            <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
              Tanggal Terbang
            </label>
            <input
              type="date"
              value={statusFormData.tanggal_terbang}
              onChange={(e) => setStatusFormData(prev => ({ ...prev, tanggal_terbang: e.target.value }))}
              className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
        );
      
      case 'Tidak Aktif':
      case 'Izin':
        return (
          <div>
            <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
              Keterangan
            </label>
            <textarea
              value={statusFormData.keterangan}
              onChange={(e) => setStatusFormData(prev => ({ ...prev, keterangan: e.target.value }))}
              placeholder={`Masukkan keterangan ${statusFormData.status.toLowerCase()}...`}
              rows={3}
              className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              required
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Kelola CPMI" />
      
      <div className="p-4 pb-20">
        {/* Header Actions */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari nama, email, atau ID CPMI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-8 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                <option value="all">Semua Status</option>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div className="relative flex-1">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterKelas}
                onChange={(e) => setFilterKelas(e.target.value)}
                className="w-full pl-10 pr-8 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                <option value="all">Semua Kelas</option>
                {kelasOptions.map(kelas => (
                  <option key={kelas} value={kelas}>{kelas}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Add Button */}
          <button
            onClick={handleAddCPMI}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Tambah CPMI Baru</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total CPMI</p>
                <p className="text-2xl font-bold">{cpmiList.length}</p>
              </div>
              <Users className="w-8 h-8 text-green-200" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Aktif</p>
                <p className="text-2xl font-bold">{cpmiList.filter(c => c.status === 'Aktif').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-200" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-4 rounded-xl text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Piket</p>
                <p className="text-2xl font-bold">{cpmiList.filter(c => c.status === 'Piket').length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-200" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Terbang</p>
                <p className="text-2xl font-bold">{cpmiList.filter(c => c.status === 'Terbang').length}</p>
              </div>
              <Plane className="w-8 h-8 text-purple-200" />
            </div>
          </motion.div>
        </div>

        {/* CPMI List */}
        <div className="space-y-4">
          {filteredCPMI.map((cpmi, index) => {
            const StatusIcon = getStatusIcon(cpmi.status);
            const statusColor = getStatusColor(cpmi.status);
            
            return (
              <motion.div
                key={cpmi.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-4 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-light-text-main dark:text-dark-text-main">
                          {cpmi.nama}
                        </h3>
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                          {cpmi.id}
                        </span>
                      </div>
                      <p className="text-sm text-secondary">{cpmi.email}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <StatusIcon className={`w-4 h-4 text-${statusColor}-500`} />
                          <span className={`text-sm font-medium text-${statusColor}-600 dark:text-${statusColor}-400`}>
                            {cpmi.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-secondary">{cpmi.kelas}</span>
                        </div>
                      </div>
                      
                      {/* Tampilkan lokasi piket jika status adalah Piket */}
                      {cpmi.status === 'Piket' && cpmi.lokasi_piket && (
                        <div className="mt-2 text-xs text-secondary">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>
                              {lokasiPiketOptions.find(lokasi => lokasi.id === cpmi.lokasi_piket)?.nama || 'Lokasi tidak ditemukan'}
                            </span>
                          </div>
                          {cpmi.tanggal_mulai_piket && (
                            <div className="mt-1">
                              Mulai: {new Date(cpmi.tanggal_mulai_piket).toLocaleDateString('id-ID')}
                              {cpmi.tanggal_selesai_piket && (
                                <span> - {new Date(cpmi.tanggal_selesai_piket).toLocaleDateString('id-ID')}</span>
                              )}
                              {!cpmi.tanggal_selesai_piket && cpmi.tanggal_mulai_piket && (
                                <span> - Tidak terbatas</span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewDetail(cpmi)}
                      className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleChangeStatus(cpmi)}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Ubah Status"
                    >
                      <StatusIcon className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleEditCPMI(cpmi)}
                      className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                      title="Edit CPMI"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteCPMI(cpmi.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Hapus CPMI"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredCPMI.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
              Tidak ada CPMI ditemukan
            </h3>
            <p className="text-secondary">
              {searchTerm || filterStatus !== 'all' || filterKelas !== 'all'
                ? 'Coba ubah filter atau kata kunci pencarian'
                : 'Belum ada data CPMI yang tersedia'
              }
            </p>
          </div>
        )}
      </div>

      {/* Add CPMI Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-light-card dark:bg-dark-card rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-light-text-main dark:text-dark-text-main">
                  Tambah CPMI Baru
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-light-body dark:hover:bg-dark-body rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    value={formData.telepon}
                    onChange={(e) => setFormData(prev => ({ ...prev, telepon: e.target.value }))}
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Kelas
                  </label>
                  <select
                    value={formData.kelas}
                    onChange={(e) => setFormData(prev => ({ ...prev, kelas: e.target.value }))}
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {kelasOptions.map(kelas => (
                      <option key={kelas} value={kelas}>{kelas}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Pengajar
                  </label>
                  <select
                    value={formData.pengajar}
                    onChange={(e) => setFormData(prev => ({ ...prev, pengajar: e.target.value }))}
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {pengajarOptions.map(pengajar => (
                      <option key={pengajar} value={pengajar}>{pengajar}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-light-border dark:border-dark-border text-light-text-main dark:text-dark-text-main rounded-lg hover:bg-light-body dark:hover:bg-dark-body transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveCPMI}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
                >
                  Simpan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Change Modal */}
      <AnimatePresence>
        {showStatusModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={resetStatusForm}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-light-card dark:bg-dark-card rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-light-text-main dark:text-dark-text-main">
                  Ubah Status CPMI
                </h2>
                <button
                  onClick={resetStatusForm}
                  className="p-2 hover:bg-light-body dark:hover:bg-dark-body rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Status Baru
                  </label>
                  <select
                    value={statusFormData.status}
                    onChange={(e) => setStatusFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih status...</option>
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                {renderStatusForm()}
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={resetStatusForm}
                  className="flex-1 px-4 py-2 border border-light-border dark:border-dark-border text-light-text-main dark:text-dark-text-main rounded-lg hover:bg-light-body dark:hover:bg-dark-body transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveStatus}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
                >
                  Simpan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CPMIManagementAdmin;