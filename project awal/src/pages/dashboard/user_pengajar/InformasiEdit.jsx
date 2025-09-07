import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Save,
  Calendar, 
  Clock, 
  Users, 
  User, 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  MapPin,
  FileText,
  X,
  Upload,
  Send
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useCPMI } from '../../../context/CPMIContext';

const InformasiEdit = () => {
  const { isDarkMode } = useTheme();
  const { cpmiList } = useCPMI();
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;

  // Form state - diisi dengan data yang akan diedit
  const [formData, setFormData] = useState({
    judul: editData?.judul || '',
    konten: editData?.konten || '',
    tipe: editData?.tipe || 'pengumuman',
    prioritas: editData?.prioritas || 'normal',
    target: editData?.targetCPMI === 'Semua CPMI' ? 'semua' : 'pilih',
    selectedCPMI: [],
    tanggalJadwal: editData?.tanggalJadwal || '',
    waktuJadwal: editData?.waktuJadwal?.split(' - ')[0] || '',
    waktuJadwalSelesai: editData?.waktuJadwal?.split(' - ')[1] || '',
    lokasiJadwal: editData?.lokasiJadwal || '',
    attachments: editData?.attachments || []
  });

  const [selectAllCPMI, setSelectAllCPMI] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dummy CPMI data
  const dummyCPMI = [
    { id: 1, nama: 'Ahmad Rizki', kelas: 'Kelas A', status: 'Aktif' },
    { id: 2, nama: 'Siti Nurhaliza', kelas: 'Kelas A', status: 'Aktif' },
    { id: 3, nama: 'Budi Santoso', kelas: 'Kelas B', status: 'Piket' },
    { id: 4, nama: 'Dewi Sartika', kelas: 'Kelas B', status: 'Aktif' },
    { id: 5, nama: 'Eko Prasetyo', kelas: 'Kelas C', status: 'Aktif' }
  ];

  // Redirect jika tidak ada data edit
  useEffect(() => {
    if (!editData) {
      navigate('/dashboard/pengajar/informasi');
    }
  }, [editData, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectAllCPMI = (checked) => {
    setSelectAllCPMI(checked);
    if (checked) {
      handleInputChange('selectedCPMI', dummyCPMI.map(cpmi => cpmi.id));
    } else {
      handleInputChange('selectedCPMI', []);
    }
  };

  const handleCPMISelect = (cpmiId, checked) => {
    let newSelected;
    if (checked) {
      newSelected = [...formData.selectedCPMI, cpmiId];
    } else {
      newSelected = formData.selectedCPMI.filter(id => id !== cpmiId);
    }
    handleInputChange('selectedCPMI', newSelected);
    setSelectAllCPMI(newSelected.length === dummyCPMI.length);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }));
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulasi update data
      console.log('Data yang akan diupdate:', formData);
      
      // Simulasi delay untuk loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect kembali ke detail
      navigate(`/dashboard/pengajar/informasi/detail/${editData.id}`, {
        state: { 
          updatedData: formData,
          message: 'Informasi berhasil diperbarui!' 
        }
      });
    } catch (error) {
      console.error('Error updating information:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!editData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate('/dashboard/pengajar/informasi')}
            className="p-2 hover:bg-light-bg dark:hover:bg-dark-bg rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-light-text-main dark:text-dark-text-main" />
          </button>
          <h1 className="font-semibold text-light-text-main dark:text-dark-text-main">Edit Informasi</h1>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Menyimpan...' : 'Simpan'}</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-light-card dark:bg-dark-card rounded-lg p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                Judul Informasi *
              </label>
              <input
                type="text"
                value={formData.judul}
                onChange={(e) => handleInputChange('judul', e.target.value)}
                className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan judul informasi"
                required
              />
            </div>

            {/* Tipe dan Prioritas */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                  Tipe Informasi *
                </label>
                <select
                  value={formData.tipe}
                  onChange={(e) => handleInputChange('tipe', e.target.value)}
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
                  value={formData.prioritas}
                  onChange={(e) => handleInputChange('prioritas', e.target.value)}
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
                value={formData.target}
                onChange={(e) => handleInputChange('target', e.target.value)}
                className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="semua">Semua CPMI</option>
                <option value="pilih">CPMI Spesifik</option>
              </select>
            </div>

            {/* CPMI Selection - Conditional */}
            {formData.target === 'pilih' && (
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                  Pilih CPMI *
                </label>
                <div className="max-h-32 overflow-y-auto border border-light-border dark:border-dark-border rounded-lg p-2 bg-light-body dark:bg-dark-body">
                  <div className="flex items-center mb-3 pb-2 border-b border-light-border dark:border-dark-border">
                    <input
                      type="checkbox"
                      checked={selectAllCPMI}
                      onChange={(e) => handleSelectAllCPMI(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                       Pilih Semua ({dummyCPMI.length})
                     </span>
                  </div>
                  
                  <div className="space-y-2">
                    {dummyCPMI.map((cpmi) => (
                      <label key={cpmi.id} className="flex items-center p-2 hover:bg-light-bg dark:hover:bg-dark-bg rounded">
                        <input
                          type="checkbox"
                          checked={formData.selectedCPMI.includes(cpmi.id)}
                          onChange={(e) => handleCPMISelect(cpmi.id, e.target.checked)}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                            {cpmi.nama}
                          </p>
                          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                            {cpmi.kelas} • {cpmi.status}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Konten */}
            <div>
              <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                Konten Informasi *
              </label>
              <textarea
                value={formData.konten}
                onChange={(e) => handleInputChange('konten', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Masukkan konten informasi"
                required
              />
            </div>

            {/* Upload Dokumen */}
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
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                    File Terlampir:
                  </h4>
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-light-bg dark:bg-dark-bg rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                            {typeof file === 'string' ? file : file.name}
                          </p>
                          {typeof file !== 'string' && (
                            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                              {formatFileSize(file.size)}
                            </p>
                          )}
                        </div>
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

            {/* Detail Jadwal - hanya tampil jika tipe jadwal */}
            {formData.tipe === 'jadwal' && (
              <div className="bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <h3 className="text-sm font-semibold text-light-text-main dark:text-dark-text-main">
                    Detail Jadwal
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                      Tanggal *
                    </label>
                    <input
                      type="date"
                      value={formData.tanggalJadwal}
                      onChange={(e) => handleInputChange('tanggalJadwal', e.target.value)}
                      className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                        Waktu Mulai *
                      </label>
                      <input
                        type="time"
                        value={formData.waktuJadwal}
                        onChange={(e) => handleInputChange('waktuJadwal', e.target.value)}
                        className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                        Waktu Selesai *
                      </label>
                      <input
                        type="time"
                        value={formData.waktuJadwalSelesai}
                        onChange={(e) => handleInputChange('waktuJadwalSelesai', e.target.value)}
                        className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-1">
                      Lokasi *
                    </label>
                    <input
                      type="text"
                      value={formData.lokasiJadwal}
                      onChange={(e) => handleInputChange('lokasiJadwal', e.target.value)}
                      className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan lokasi jadwal"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/dashboard/pengajar/informasi')}
                className="flex-1 px-4 py-2 border border-light-border dark:border-dark-border text-light-text-main dark:text-dark-text-main rounded-lg hover:bg-light-card dark:hover:bg-dark-card transition-colors text-sm font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm font-medium"
              >
                <Save className="h-4 w-4" />
                <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InformasiEdit;