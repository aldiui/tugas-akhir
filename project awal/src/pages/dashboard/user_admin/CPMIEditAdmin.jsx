import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Users,
  Save,
  X,
  Building,
  Globe,
  Target,
  BookOpen,
  AlertTriangle
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCPMI } from '../../../context/CPMIContext';
import { useTheme } from '../../../context/ThemeContext';
import BackHeader from '../../../layout/BackHeader';

const CPMIEditAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cpmiList, setCpmiList } = useCPMI();
  const { theme } = useTheme();
  const [originalCpmi, setOriginalCpmi] = useState(null);
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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (location.state?.cpmi) {
      const cpmi = location.state.cpmi;
      setOriginalCpmi(cpmi);
      setFormData({
        nama: cpmi.nama || '',
        email: cpmi.email || '',
        telepon: cpmi.telepon || '',
        alamat: cpmi.alamat || '',
        tanggal_lahir: cpmi.tanggal_lahir || '',
        status: cpmi.status || 'Aktif',
        kelas: cpmi.kelas || 'Taiwan Batch 15',
        pengajar: cpmi.pengajar || 'Bu Mei Lin',
        tanggal_mulai_pelatihan: cpmi.tanggal_mulai_pelatihan || '',
        target_keberangkatan: cpmi.target_keberangkatan || '',
        agency: cpmi.agency || '',
        lokasi_penempatan: cpmi.lokasi_penempatan || '',
        jenis_pekerjaan: cpmi.jenis_pekerjaan || ''
      });
    } else {
      // Redirect back if no CPMI data
      navigate('/dashboard/admin/cpmi-management');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (originalCpmi) {
      const hasChanged = Object.keys(formData).some(key => {
        return formData[key] !== (originalCpmi[key] || '');
      });
      setHasChanges(hasChanged);
    }
  }, [formData, originalCpmi]);

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

  const statusOptions = [
    { value: 'Aktif', label: 'Aktif' },
    { value: 'Piket', label: 'Piket' },
    { value: 'Terbang', label: 'Terbang' },
    { value: 'Izin', label: 'Izin' },
    { value: 'Tidak Aktif', label: 'Mengundurkan Diri' }
  ];

  const jenisPekerjaanOptions = [
    'Perawat Lansia',
    'Pembantu Rumah Tangga',
    'Perawat Anak',
    'Tukang Kebun',
    'Supir Pribadi',
    'Pekerja Pabrik',
    'Pelayan Restoran',
    'Pekerja Hotel'
  ];

  const lokasiPenempatanOptions = [
    'Taipei',
    'Taichung',
    'Kaohsiung',
    'Tainan',
    'Hsinchu',
    'Taoyuan',
    'Changhua',
    'Keelung'
  ];

  const agencyOptions = [
    'Taiwan Care Agency',
    'Golden Bridge Manpower',
    'Asia Pacific Employment',
    'Formosa Workers Agency',
    'United Manpower Services',
    'Dragon Gate Employment',
    'Sunrise Recruitment',
    'Pacific Star Agency'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.telepon.trim()) {
      newErrors.telepon = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.telepon)) {
      newErrors.telepon = 'Format nomor telepon tidak valid';
    }

    if (!formData.alamat.trim()) {
      newErrors.alamat = 'Alamat wajib diisi';
    }

    if (!formData.tanggal_lahir) {
      newErrors.tanggal_lahir = 'Tanggal lahir wajib diisi';
    } else {
      const birthDate = new Date(formData.tanggal_lahir);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18 || age > 65) {
        newErrors.tanggal_lahir = 'Usia harus antara 18-65 tahun';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update CPMI in context
      const updatedCpmi = {
        ...originalCpmi,
        ...formData
      };
      
      setCpmiList(prev => prev.map(cpmi => 
        cpmi.id === originalCpmi.id ? updatedCpmi : cpmi
      ));
      
      // Navigate back to detail page with updated data
      navigate('/dashboard/admin/cpmi-detail', { 
        state: { cpmi: updatedCpmi },
        replace: true
      });
    } catch (error) {
      console.error('Error saving CPMI:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('Anda memiliki perubahan yang belum disimpan. Yakin ingin keluar?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  if (!originalCpmi) {
    return (
      <div className="min-h-screen bg-light-body dark:bg-dark-body flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-light-text-main dark:text-dark-text-main">Memuat data CPMI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Edit CPMI" />
      
      <div className="p-4 pb-20">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white mb-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Edit Data CPMI</h1>
              <p className="text-purple-100">{originalCpmi.id} • {originalCpmi.nama}</p>
              {hasChanges && (
                <div className="flex items-center space-x-1 mt-1">
                  <AlertTriangle className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm text-yellow-300">Ada perubahan yang belum disimpan</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <div className="space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-purple-500" />
              Informasi Dasar
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => handleInputChange('nama', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.nama ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                  }`}
                  placeholder="Masukkan nama lengkap"
                />
                {errors.nama && (
                  <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                  }`}
                  placeholder="Masukkan email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Nomor Telepon *
                </label>
                <input
                  type="tel"
                  value={formData.telepon}
                  onChange={(e) => handleInputChange('telepon', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.telepon ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                  }`}
                  placeholder="Masukkan nomor telepon"
                />
                {errors.telepon && (
                  <p className="text-red-500 text-sm mt-1">{errors.telepon}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Tanggal Lahir *
                </label>
                <input
                  type="date"
                  value={formData.tanggal_lahir}
                  onChange={(e) => handleInputChange('tanggal_lahir', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.tanggal_lahir ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                  }`}
                />
                {errors.tanggal_lahir && (
                  <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Alamat *
                </label>
                <textarea
                  value={formData.alamat}
                  onChange={(e) => handleInputChange('alamat', e.target.value)}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none ${
                    errors.alamat ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                  }`}
                  placeholder="Masukkan alamat lengkap"
                />
                {errors.alamat && (
                  <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Class & Training Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
              Informasi Kelas & Pelatihan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Kelas
                </label>
                <select
                  value={formData.kelas}
                  onChange={(e) => handleInputChange('kelas', e.target.value)}
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
                  onChange={(e) => handleInputChange('pengajar', e.target.value)}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {pengajarOptions.map(pengajar => (
                    <option key={pengajar} value={pengajar}>{pengajar}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Tanggal Mulai Pelatihan
                </label>
                <input
                  type="date"
                  value={formData.tanggal_mulai_pelatihan}
                  onChange={(e) => handleInputChange('tanggal_mulai_pelatihan', e.target.value)}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Target Keberangkatan
                </label>
                <input
                  type="date"
                  value={formData.target_keberangkatan}
                  onChange={(e) => handleInputChange('target_keberangkatan', e.target.value)}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* Placement Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-purple-500" />
              Informasi Penempatan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Agency
                </label>
                <select
                  value={formData.agency}
                  onChange={(e) => handleInputChange('agency', e.target.value)}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Pilih agency...</option>
                  {agencyOptions.map(agency => (
                    <option key={agency} value={agency}>{agency}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Lokasi Penempatan
                </label>
                <select
                  value={formData.lokasi_penempatan}
                  onChange={(e) => handleInputChange('lokasi_penempatan', e.target.value)}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Pilih lokasi...</option>
                  {lokasiPenempatanOptions.map(lokasi => (
                    <option key={lokasi} value={lokasi}>{lokasi}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  Jenis Pekerjaan
                </label>
                <select
                  value={formData.jenis_pekerjaan}
                  onChange={(e) => handleInputChange('jenis_pekerjaan', e.target.value)}
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Pilih jenis pekerjaan...</option>
                  {jenisPekerjaanOptions.map(jenis => (
                    <option key={jenis} value={jenis}>{jenis}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-4 mt-8"
        >
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-3 border border-light-border dark:border-dark-border text-light-text-main dark:text-dark-text-main rounded-lg hover:bg-light-body dark:hover:bg-dark-body transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center space-x-2">
              <X className="w-5 h-5" />
              <span>Batal</span>
            </div>
          </button>
          
          <button
            onClick={handleSave}
            disabled={isLoading || !hasChanges}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center space-x-2">
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CPMIEditAdmin;