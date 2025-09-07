import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Megaphone, 
  Send, 
  Calendar, 
  Clock, 
  Users, 
  User, 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Download,
  MapPin,
  FileText,
  ChevronRight,
  X
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const Informasi = () => {
  const { isDarkMode } = useTheme();
  const { cpmiList } = useCPMI();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buat');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('semua');
  const [filterStatus, setFilterStatus] = useState('semua');

  // Form state
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    tipe: 'pengumuman',
    prioritas: 'normal',
    target: 'semua',
    selectedCPMI: [],
    tanggalJadwal: '',
    waktuJadwal: '',
    lokasiJadwal: '',
    attachments: []
  });

  // Dummy data informasi
  const informasiData = [
    {
      id: 1,
      judul: 'Interview dengan Agency Taiwan Excellence',
      konten: 'Akan diadakan sesi interview dengan perwakilan dari Agency Taiwan Excellence untuk seleksi penempatan kerja.',
      tipe: 'jadwal',
      prioritas: 'urgent',
      target: 'kelas',
      targetKelas: 'Taiwan Batch 15',
      tanggalBuat: '2024-01-15',
      waktuBuat: '09:30',
      tanggalJadwal: '2024-01-20',
      waktuJadwal: '10:00',
      lokasiJadwal: 'Ruang Meeting LPK',
      status: 'aktif',
      dibaca: 12,
      totalTarget: 15,
      disimpanKeKalender: 8,
      attachments: ['panduan_interview.pdf']
    },
    {
      id: 2,
      judul: 'Perubahan Jadwal Pelajaran Bahasa Mandarin',
      konten: 'Jadwal pelajaran Bahasa Mandarin untuk hari Rabu akan dimajukan menjadi pukul 08:00 - 10:00.',
      tipe: 'jadwal',
      prioritas: 'normal',
      target: 'kelas',
      targetKelas: 'Taiwan Batch 15',
      tanggalBuat: '2024-01-14',
      waktuBuat: '15:20',
      tanggalJadwal: '2024-01-17',
      waktuJadwal: '08:00',
      lokasiJadwal: 'Ruang Kelas A',
      status: 'aktif',
      dibaca: 15,
      totalTarget: 15,
      disimpanKeKalender: 12,
      attachments: []
    },
    {
      id: 3,
      judul: 'Pengumuman Evaluasi Mingguan',
      konten: 'Akan diadakan evaluasi mingguan untuk mengukur progress pembelajaran CPMI Taiwan Batch 15.',
      tipe: 'pengumuman',
      prioritas: 'normal',
      target: 'kelas',
      targetKelas: 'Taiwan Batch 15',
      tanggalBuat: '2024-01-13',
      waktuBuat: '11:45',
      status: 'aktif',
      dibaca: 14,
      totalTarget: 15,
      disimpanKeKalender: 0,
      attachments: []
    },
    {
      id: 4,
      judul: 'Pelatihan Keselamatan Kerja',
      konten: 'Akan diadakan pelatihan khusus mengenai keselamatan kerja di lingkungan rumah tangga Taiwan.',
      tipe: 'jadwal',
      prioritas: 'urgent',
      target: 'kelas',
      targetKelas: 'Taiwan Batch 15',
      tanggalBuat: '2024-01-12',
      waktuBuat: '14:15',
      tanggalJadwal: '2024-01-18',
      waktuJadwal: '13:00',
      lokasiJadwal: 'Ruang Praktik',
      status: 'aktif',
      dibaca: 13,
      totalTarget: 15,
      disimpanKeKalender: 10,
      attachments: ['materi_keselamatan.pdf', 'checklist_keamanan.pdf']
    },
    {
      id: 5,
      judul: 'Reminder: Tugas Bahasa Mandarin',
      konten: 'Reminder untuk semua CPMI Taiwan Batch 15 yang belum mengumpulkan tugas percakapan bahasa Mandarin.',
      tipe: 'pengumuman',
      prioritas: 'normal',
      target: 'kelas',
      targetKelas: 'Taiwan Batch 15',
      tanggalBuat: '2024-01-11',
      waktuBuat: '10:30',
      status: 'aktif',
      dibaca: 12,
      totalTarget: 15,
      disimpanKeKalender: 0,
      attachments: []
    }
  ];

  // Filter informasi
  const filteredInformasi = informasiData.filter(info => {
    const matchesSearch = info.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         info.konten.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'semua' || info.tipe === filterType;
    const matchesStatus = filterStatus === 'semua' || info.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Statistics
  const stats = {
    totalInformasi: informasiData.length,
    pengumuman: informasiData.filter(i => i.tipe === 'pengumuman').length,
    jadwal: informasiData.filter(i => i.tipe === 'jadwal').length,
    urgent: informasiData.filter(i => i.prioritas === 'urgent').length
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCPMISelection = (cpmiId) => {
    setFormData(prev => ({
      ...prev,
      selectedCPMI: prev.selectedCPMI.includes(cpmiId)
        ? prev.selectedCPMI.filter(id => id !== cpmiId)
        : [...prev.selectedCPMI, cpmiId]
    }));
  };

  const handleSelectAllCPMI = () => {
    const allCPMIIds = cpmiList.map(cpmi => cpmi.id);
    setFormData(prev => ({
      ...prev,
      selectedCPMI: prev.selectedCPMI.length === allCPMIIds.length ? [] : allCPMIIds
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.target === 'spesifik' && formData.selectedCPMI.length === 0) {
      alert('Pilih minimal satu CPMI untuk mengirim informasi');
      return;
    }
    
    console.log('Mengirim informasi:', formData);
    setFormData({
      judul: '',
      konten: '',
      tipe: 'pengumuman',
      prioritas: 'normal',
      target: 'semua',
      selectedCPMI: [],
      tanggalJadwal: '',
      waktuJadwal: '',
      lokasiJadwal: '',
      attachments: []
    });
    setShowCreateModal(false);
  };

  const getPriorityColor = (prioritas) => {
    switch (prioritas) {
      case 'urgent':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'normal':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  const getPriorityIcon = (prioritas) => {
    switch (prioritas) {
      case 'urgent':
        return <AlertTriangle className="w-3 h-3" />;
      case 'normal':
        return <Info className="w-3 h-3" />;
      default:
        return <Bell className="w-3 h-3" />;
    }
  };

  const getTypeIcon = (tipe) => {
    switch (tipe) {
      case 'jadwal':
        return <Calendar className="w-4 h-4" />;
      case 'pengumuman':
        return <Megaphone className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const handleViewDetail = (info) => {
    navigate(`/dashboard/pengajar/informasi/detail/${info.id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short'
    });
  };

  const truncateText = (text, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Informasi & Pengumuman" />
      
      <div className="p-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-light-text-main dark:text-dark-text-main">
              {stats.totalInformasi}
            </div>
            <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              Total
            </div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {stats.jadwal}
            </div>
            <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              Jadwal
            </div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {stats.pengumuman}
            </div>
            <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              Pengumuman
            </div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              {stats.urgent}
            </div>
            <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              Urgent
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-light-card dark:bg-dark-card rounded-lg p-1 mb-4">
          <button
            onClick={() => setActiveTab('buat')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'buat'
                ? 'bg-blue-500 text-white'
                : 'text-light-text-secondary dark:text-dark-text-secondary'
            }`}
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Buat
          </button>
          <button
            onClick={() => setActiveTab('riwayat')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'riwayat'
                ? 'bg-blue-500 text-white'
                : 'text-light-text-secondary dark:text-dark-text-secondary'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-1" />
            Riwayat
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'buat' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-light-card dark:bg-dark-card rounded-lg p-4"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Judul */}
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                  Judul Informasi *
                </label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan judul informasi"
                />
              </div>

              {/* Tipe & Prioritas */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                    Tipe Informasi *
                  </label>
                  <select
                    name="tipe"
                    value={formData.tipe}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pengumuman">Pengumuman</option>
                    <option value="jadwal">Jadwal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                    Prioritas *
                  </label>
                  <select
                    name="prioritas"
                    value={formData.prioritas}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Target */}
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                  Target Penerima *
                </label>
                <select
                  name="target"
                  value={formData.target}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="semua">Semua CPMI</option>
                  <option value="spesifik">CPMI Spesifik</option>
                </select>
              </div>

              {/* CPMI Selection */}
              {formData.target === 'spesifik' && (
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Pilih CPMI *
                  </label>
                  <div className="bg-light-body dark:bg-dark-body rounded-lg p-3 border border-light-border dark:border-dark-border max-h-40 overflow-y-auto">
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-light-border dark:border-dark-border">
                      <span className="text-xs font-medium text-light-text-main dark:text-dark-text-main">
                        Pilih CPMI ({formData.selectedCPMI.length}/{cpmiList.length})
                      </span>
                      <button
                        type="button"
                        onClick={handleSelectAllCPMI}
                        className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                      >
                        {formData.selectedCPMI.length === cpmiList.length ? 'Batal Semua' : 'Pilih Semua'}
                      </button>
                    </div>
                    <div className="space-y-1">
                      {cpmiList.map((cpmi) => (
                        <label key={cpmi.id} className="flex items-center space-x-2 p-1 rounded hover:bg-light-card dark:hover:bg-dark-card cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.selectedCPMI.includes(cpmi.id)}
                            onChange={() => handleCPMISelection(cpmi.id)}
                            className="w-3 h-3 text-blue-500 border-light-border dark:border-dark-border rounded focus:ring-1 focus:ring-blue-500"
                          />
                          <div className="flex items-center space-x-2 flex-1">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                              {cpmi.nama.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-light-text-main dark:text-dark-text-main">
                                {cpmi.nama}
                              </p>
                              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                {cpmi.kelas}
                              </p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Jadwal Fields */}
              {formData.tipe === 'jadwal' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                        Tanggal Jadwal *
                      </label>
                      <input
                        type="date"
                        name="tanggalJadwal"
                        value={formData.tanggalJadwal}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                        Waktu Jadwal *
                      </label>
                      <input
                        type="time"
                        name="waktuJadwal"
                        value={formData.waktuJadwal}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                      Lokasi Jadwal *
                    </label>
                    <input
                      type="text"
                      name="lokasiJadwal"
                      value={formData.lokasiJadwal}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan lokasi jadwal"
                    />
                  </div>
                </>
              )}

              {/* Konten */}
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                  Konten Informasi *
                </label>
                <textarea
                  name="konten"
                  value={formData.konten}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Masukkan konten informasi"
                />
              </div>

              {/* Lampiran Dokumen */}
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                  Lampiran Dokumen (Opsional)
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {formData.attachments.length > 0 && (
                    <div className="bg-light-card dark:bg-dark-card rounded-lg p-3">
                      <p className="text-xs font-medium text-light-text-main dark:text-dark-text-main mb-2">
                        Lampiran ({formData.attachments.length})
                      </p>
                      <div className="space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-light-body dark:bg-dark-body rounded border border-light-border dark:border-dark-border">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-blue-500" />
                              <div>
                                <p className="text-xs font-medium text-light-text-main dark:text-dark-text-main">
                                  {file.name}
                                </p>
                                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                  {(file.size / 1024 / 1024).toFixed(1)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFormData({
                    judul: '',
                    konten: '',
                    tipe: 'pengumuman',
                    prioritas: 'normal',
                    target: 'semua',
                    selectedCPMI: [],
                    tanggalJadwal: '',
                    waktuJadwal: '',
                    lokasiJadwal: '',
                    attachments: []
                  })}
                  className="flex-1 px-4 py-2 border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary rounded-lg hover:bg-light-card dark:hover:bg-dark-card transition-colors text-sm"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Informasi</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {activeTab === 'riwayat' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Search & Filter */}
            <div className="bg-light-card dark:bg-dark-card rounded-lg p-3">
              <div className="flex space-x-2 mb-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari informasi..."
                    className="w-full pl-10 pr-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="semua">Semua Tipe</option>
                  <option value="pengumuman">Pengumuman</option>
                  <option value="jadwal">Jadwal</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="semua">Semua Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Non-aktif</option>
                </select>
              </div>
            </div>

            {/* Informasi List */}
            <div className="space-y-2">
              {filteredInformasi.map((info) => (
                <motion.div
                  key={info.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-light-card dark:bg-dark-card rounded-lg p-3 border border-light-border dark:border-dark-border"
                  onClick={() => handleViewDetail(info)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getPriorityColor(info.prioritas)}`}>
                      {getTypeIcon(info.tipe)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-medium text-light-text-main dark:text-dark-text-main text-sm leading-tight">
                          {truncateText(info.judul, 50)}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary flex-shrink-0 ml-2" />
                      </div>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2 leading-relaxed">
                        {truncateText(info.konten, 80)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(info.tanggalBuat)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{info.dibaca}/{info.totalTarget}</span>
                          </div>
                          {info.attachments.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <FileText className="w-3 h-3" />
                              <span>{info.attachments.length}</span>
                            </div>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getPriorityColor(info.prioritas)}`}>
                          {getPriorityIcon(info.prioritas)}
                          <span>{info.prioritas}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredInformasi.length === 0 && (
              <div className="bg-light-card dark:bg-dark-card rounded-lg p-8 text-center">
                <Megaphone className="w-12 h-12 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-3" />
                <h3 className="font-medium text-light-text-main dark:text-dark-text-main mb-1">
                  Tidak ada informasi
                </h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Belum ada informasi yang sesuai dengan filter Anda
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Informasi;