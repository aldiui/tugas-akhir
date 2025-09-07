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

const InformasiAdmin = () => {
  const { isDarkMode } = useTheme();
  const { cpmiList } = useCPMI();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buat');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('semua');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [filterKelas, setFilterKelas] = useState('semua');

  // Form state
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    tipe: 'pengumuman',
    prioritas: 'normal',
    target: 'semua',
    targetKelas: 'semua',
    selectedCPMI: [],
    selectedPengajar: [],
    tanggalJadwal: '',
    waktuJadwal: '',
    lokasiJadwal: '',
    attachments: []
  });

  // Dummy data informasi admin
  const informasiData = [
    {
      id: 1,
      judul: 'Evaluasi Kinerja Pengajar Bulanan',
      konten: 'Akan diadakan evaluasi kinerja pengajar untuk bulan ini. Semua pengajar wajib mengumpulkan laporan progress CPMI dan dokumentasi pembelajaran.',
      tipe: 'jadwal',
      prioritas: 'urgent',
      target: 'pengajar',
      targetKelas: 'Semua Kelas',
      tanggalBuat: '2024-01-15',
      waktuBuat: '09:30',
      tanggalJadwal: '2024-01-25',
      waktuJadwal: '14:00',
      lokasiJadwal: 'Ruang Meeting Admin',
      status: 'aktif',
      dibaca: 8,
      totalTarget: 8,
      disimpanKeKalender: 6,
      attachments: ['form_evaluasi.pdf'],
      pembuat: 'Admin System'
    },
    {
      id: 2,
      judul: 'Update Sistem Absensi',
      konten: 'Sistem absensi akan diperbarui dengan fitur baru. Harap semua pengguna memperhatikan perubahan interface dan prosedur absensi yang baru.',
      tipe: 'pengumuman',
      prioritas: 'normal',
      target: 'semua',
      targetKelas: 'Semua Kelas',
      tanggalBuat: '2024-01-14',
      waktuBuat: '11:20',
      status: 'aktif',
      dibaca: 45,
      totalTarget: 58,
      disimpanKeKalender: 0,
      attachments: [],
      pembuat: 'Admin System'
    },
    {
      id: 3,
      judul: 'Pelatihan Penggunaan Aplikasi Baru',
      konten: 'Akan diadakan pelatihan penggunaan aplikasi manajemen LPK yang baru untuk semua pengajar dan admin.',
      tipe: 'jadwal',
      prioritas: 'urgent',
      target: 'pengajar',
      targetKelas: 'Semua Kelas',
      tanggalBuat: '2024-01-13',
      waktuBuat: '15:45',
      tanggalJadwal: '2024-01-20',
      waktuJadwal: '09:00',
      lokasiJadwal: 'Lab Komputer',
      status: 'aktif',
      dibaca: 7,
      totalTarget: 8,
      disimpanKeKalender: 5,
      attachments: ['panduan_aplikasi.pdf'],
      pembuat: 'Admin System'
    },
    {
      id: 4,
      judul: 'Reminder: Laporan Piket Mingguan',
      konten: 'Reminder untuk semua pengajar agar mengumpulkan laporan evaluasi piket CPMI minggu ini sebelum hari Jumat.',
      tipe: 'pengumuman',
      prioritas: 'normal',
      target: 'pengajar',
      targetKelas: 'Semua Kelas',
      tanggalBuat: '2024-01-12',
      waktuBuat: '10:15',
      status: 'aktif',
      dibaca: 6,
      totalTarget: 8,
      disimpanKeKalender: 0,
      attachments: [],
      pembuat: 'Admin System'
    },
    {
      id: 5,
      judul: 'Pengumuman Libur Nasional',
      konten: 'Pemberitahuan bahwa LPK akan libur pada tanggal 17 Agustus dalam rangka memperingati Hari Kemerdekaan RI.',
      tipe: 'pengumuman',
      prioritas: 'normal',
      target: 'semua',
      targetKelas: 'Semua Kelas',
      tanggalBuat: '2024-01-11',
      waktuBuat: '08:30',
      status: 'aktif',
      dibaca: 52,
      totalTarget: 58,
      disimpanKeKalender: 0,
      attachments: [],
      pembuat: 'Admin System'
    }
  ];

  // Dummy data pengajar
  const pengajarList = [
    { id: 1, nama: 'Ibu Sari', kelas: 'Taiwan Batch 15' },
    { id: 2, nama: 'Pak Budi', kelas: 'Taiwan Batch 16' },
    { id: 3, nama: 'Ibu Dewi', kelas: 'Taiwan Batch 17' },
    { id: 4, nama: 'Pak Ahmad', kelas: 'Taiwan Batch 18' }
  ];

  // Filter informasi
  const filteredInformasi = informasiData.filter(info => {
    const matchesSearch = info.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         info.konten.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'semua' || info.tipe === filterType;
    const matchesStatus = filterStatus === 'semua' || info.status === filterStatus;
    const matchesKelas = filterKelas === 'semua' || info.targetKelas.includes(filterKelas);
    
    return matchesSearch && matchesType && matchesStatus && matchesKelas;
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

  const handlePengajarSelection = (pengajarId) => {
    setFormData(prev => ({
      ...prev,
      selectedPengajar: prev.selectedPengajar.includes(pengajarId)
        ? prev.selectedPengajar.filter(id => id !== pengajarId)
        : [...prev.selectedPengajar, pengajarId]
    }));
  };

  const handleSelectAllCPMI = () => {
    const safeCpmiList = Array.isArray(cpmiList) ? cpmiList : [];
    const allCPMIIds = safeCpmiList.map(cpmi => cpmi.id);
    setFormData(prev => ({
      ...prev,
      selectedCPMI: prev.selectedCPMI.length === allCPMIIds.length ? [] : allCPMIIds
    }));
  };

  const handleSelectAllPengajar = () => {
    const allPengajarIds = pengajarList.map(pengajar => pengajar.id);
    setFormData(prev => ({
      ...prev,
      selectedPengajar: prev.selectedPengajar.length === allPengajarIds.length ? [] : allPengajarIds
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
    
    if (formData.target === 'cpmi' && formData.selectedCPMI.length === 0) {
      alert('Pilih minimal satu CPMI untuk mengirim informasi');
      return;
    }
    
    if (formData.target === 'pengajar' && formData.selectedPengajar.length === 0) {
      alert('Pilih minimal satu Pengajar untuk mengirim informasi');
      return;
    }
    
    console.log('Mengirim informasi:', formData);
    setFormData({
      judul: '',
      konten: '',
      tipe: 'pengumuman',
      prioritas: 'normal',
      target: 'semua',
      targetKelas: 'semua',
      selectedCPMI: [],
      selectedPengajar: [],
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
    navigate(`/dashboard/admin/informasi/detail/${info.id}`);
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

  const safeCpmiList = Array.isArray(cpmiList) ? cpmiList : [];

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Kelola Informasi" />
      
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
                  <option value="semua">Semua (CPMI & Pengajar)</option>
                  <option value="cpmi">CPMI Spesifik</option>
                  <option value="pengajar">Pengajar Spesifik</option>
                </select>
              </div>

              {/* CPMI Selection */}
              {formData.target === 'cpmi' && (
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Pilih CPMI *
                  </label>
                  <div className="bg-light-body dark:bg-dark-body rounded-lg p-3 border border-light-border dark:border-dark-border max-h-40 overflow-y-auto">
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-light-border dark:border-dark-border">
                      <span className="text-xs font-medium text-light-text-main dark:text-dark-text-main">
                        Pilih CPMI ({formData.selectedCPMI.length}/{safeCpmiList.length})
                      </span>
                      <button
                        type="button"
                        onClick={handleSelectAllCPMI}
                        className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                      >
                        {formData.selectedCPMI.length === safeCpmiList.length ? 'Batal Semua' : 'Pilih Semua'}
                      </button>
                    </div>
                    <div className="space-y-1">
                      {safeCpmiList.map((cpmi) => (
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

              {/* Pengajar Selection */}
              {formData.target === 'pengajar' && (
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Pilih Pengajar *
                  </label>
                  <div className="bg-light-body dark:bg-dark-body rounded-lg p-3 border border-light-border dark:border-dark-border max-h-40 overflow-y-auto">
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-light-border dark:border-dark-border">
                      <span className="text-xs font-medium text-light-text-main dark:text-dark-text-main">
                        Pilih Pengajar ({formData.selectedPengajar.length}/{pengajarList.length})
                      </span>
                      <button
                        type="button"
                        onClick={handleSelectAllPengajar}
                        className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                      >
                        {formData.selectedPengajar.length === pengajarList.length ? 'Batal Semua' : 'Pilih Semua'}
                      </button>
                    </div>
                    <div className="space-y-1">
                      {pengajarList.map((pengajar) => (
                        <label key={pengajar.id} className="flex items-center space-x-2 p-1 rounded hover:bg-light-card dark:hover:bg-dark-card cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.selectedPengajar.includes(pengajar.id)}
                            onChange={() => handlePengajarSelection(pengajar.id)}
                            className="w-3 h-3 text-blue-500 border-light-border dark:border-dark-border rounded focus:ring-1 focus:ring-blue-500"
                          />
                          <div className="flex items-center space-x-2 flex-1">
                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                              {pengajar.nama.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-light-text-main dark:text-dark-text-main">
                                {pengajar.nama}
                              </p>
                              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                {pengajar.kelas}
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
                  Lampiran Dokumen
                </label>
                <div className="border-2 border-dashed border-light-border dark:border-dark-border rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <FileText className="w-8 h-8 text-light-text-secondary dark:text-dark-text-secondary mb-2" />
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary text-center">
                      Klik untuk upload atau drag & drop<br />
                      PDF, DOC, JPG, PNG (Max 10MB)
                    </span>
                  </label>
                </div>

                {/* Preview Attachments */}
                {formData.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-light-bg dark:bg-dark-bg rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-light-text-main dark:text-dark-text-main">
                            {file.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Informasi</span>
              </button>
            </form>
          </motion.div>
        )}

        {/* Riwayat Tab */}
        {activeTab === 'riwayat' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Search and Filter */}
            <div className="bg-light-card dark:bg-dark-card rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary" />
                  <input
                    type="text"
                    placeholder="Cari informasi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 border border-light-border dark:border-dark-border rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg">
                  <Filter className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
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
                
                <select
                  value={filterKelas}
                  onChange={(e) => setFilterKelas(e.target.value)}
                  className="px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="semua">Semua Target</option>
                  <option value="CPMI">CPMI</option>
                  <option value="Pengajar">Pengajar</option>
                </select>
              </div>
            </div>

            {/* Informasi List */}
            <div className="space-y-3">
              {filteredInformasi.map((info) => (
                <motion.div
                  key={info.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-2 rounded-lg ${getPriorityColor(info.prioritas)}`}>
                        {getTypeIcon(info.tipe)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-light-text-main dark:text-dark-text-main text-sm mb-1">
                          {info.judul}
                        </h3>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2">
                          {truncateText(info.konten)}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(info.tanggalBuat)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{info.dibaca}/{info.totalTarget}</span>
                          </span>
                          {info.attachments.length > 0 && (
                            <span className="flex items-center space-x-1">
                              <FileText className="w-3 h-3" />
                              <span>{info.attachments.length}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getPriorityColor(info.prioritas)}`}>
                        {getPriorityIcon(info.prioritas)}
                        <span>{info.prioritas}</span>
                      </span>
                      <button
                        onClick={() => handleViewDetail(info)}
                        className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredInformasi.length === 0 && (
              <div className="bg-light-card dark:bg-dark-card rounded-lg p-8 text-center">
                <Info className="w-12 h-12 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-3" />
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Tidak ada informasi yang ditemukan
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InformasiAdmin;