import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Save, 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  User, 
  FileText, 
  Upload, 
  Trash2,
  AlertTriangle,
  Info,
  Bell
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const InformasiEditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { cpmiList } = useCPMI();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    attachments: [],
    status: 'aktif'
  });

  // Dummy data pengajar
  const pengajarList = [
    { id: 1, nama: 'Ibu Sari', kelas: 'Taiwan Batch 15' },
    { id: 2, nama: 'Pak Budi', kelas: 'Taiwan Batch 16' },
    { id: 3, nama: 'Ibu Dewi', kelas: 'Taiwan Batch 17' },
    { id: 4, nama: 'Pak Ahmad', kelas: 'Taiwan Batch 18' }
  ];

  // Load existing data
  useEffect(() => {
    // Simulate loading existing data
    const existingData = {
      judul: 'Evaluasi Kinerja Pengajar Bulanan',
      konten: 'Akan diadakan evaluasi kinerja pengajar untuk bulan ini. Semua pengajar wajib mengumpulkan laporan progress CPMI dan dokumentasi pembelajaran. Evaluasi akan mencakup:\n\n1. Penilaian kemajuan belajar CPMI\n2. Metode pengajaran yang digunakan\n3. Tingkat kehadiran dan kedisiplinan\n4. Laporan kendala dan solusi\n5. Rencana pembelajaran bulan depan\n\nHarap semua pengajar mempersiapkan dokumen yang diperlukan sebelum tanggal evaluasi.',
      tipe: 'jadwal',
      prioritas: 'urgent',
      target: 'pengajar',
      targetKelas: 'semua',
      selectedCPMI: [],
      selectedPengajar: [1, 2, 3, 4],
      tanggalJadwal: '2024-01-25',
      waktuJadwal: '14:00',
      lokasiJadwal: 'Ruang Meeting Admin',
      attachments: [
        { id: 1, nama: 'form_evaluasi.pdf', ukuran: '2.3 MB', tipe: 'pdf', existing: true },
        { id: 2, nama: 'panduan_evaluasi.docx', ukuran: '1.8 MB', tipe: 'docx', existing: true }
      ],
      status: 'aktif'
    };
    
    setFormData(existingData);
  }, [id]);

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
    const newAttachments = files.map((file, index) => ({
      id: Date.now() + index,
      nama: file.name,
      ukuran: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      tipe: file.name.split('.').pop().toLowerCase(),
      file: file,
      existing: false
    }));
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  const removeAttachment = (attachmentId) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== attachmentId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validation
    if (formData.target === 'cpmi' && formData.selectedCPMI.length === 0) {
      alert('Pilih minimal satu CPMI untuk mengirim informasi');
      setIsLoading(false);
      return;
    }
    
    if (formData.target === 'pengajar' && formData.selectedPengajar.length === 0) {
      alert('Pilih minimal satu Pengajar untuk mengirim informasi');
      setIsLoading(false);
      return;
    }
    
    if (formData.tipe === 'jadwal') {
      if (!formData.tanggalJadwal || !formData.waktuJadwal || !formData.lokasiJadwal) {
        alert('Lengkapi semua field jadwal');
        setIsLoading(false);
        return;
      }
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Memperbarui informasi:', formData);
      navigate(`/dashboard/admin/informasi/detail/${id}`);
    } catch (error) {
      console.error('Error updating informasi:', error);
      alert('Gagal memperbarui informasi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    navigate(`/dashboard/admin/informasi/detail/${id}`);
  };

  const getFileIcon = (tipe) => {
    switch (tipe) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileText className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const safeCpmiList = Array.isArray(cpmiList) ? cpmiList : [];

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Edit Informasi" />
      
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border"
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

            {/* Tipe, Prioritas & Status */}
            <div className="grid grid-cols-3 gap-3">
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
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Non-aktif</option>
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
                rows={6}
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
                  <Upload className="w-8 h-8 text-light-text-secondary dark:text-dark-text-secondary mb-2" />
                  <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary text-center">
                    Klik untuk upload atau drag & drop<br />
                    PDF, DOC, JPG, PNG (Max 10MB)
                  </span>
                </label>
              </div>

              {/* Preview Attachments */}
              {formData.attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                    Lampiran ({formData.attachments.length})
                  </div>
                  {formData.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between p-2 bg-light-bg dark:bg-dark-bg rounded-lg">
                      <div className="flex items-center space-x-2">
                        {getFileIcon(attachment.tipe)}
                        <div>
                          <span className="text-sm text-light-text-main dark:text-dark-text-main">
                            {attachment.nama}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                              {attachment.ukuran}
                            </span>
                            {attachment.existing && (
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                                Existing
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(attachment.id)}
                        className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main hover:bg-light-bg dark:hover:bg-dark-bg transition-colors font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-light-card dark:bg-dark-card rounded-lg p-6 w-full max-w-sm"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-2">
                Batalkan Perubahan?
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Perubahan yang belum disimpan akan hilang. Yakin ingin membatalkan?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
                >
                  Lanjut Edit
                </button>
                <button
                  onClick={confirmCancel}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Ya, Batalkan
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InformasiEditAdmin;

