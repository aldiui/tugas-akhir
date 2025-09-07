import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Camera, 
  Clock, 
  Calendar,
  Send,
  Image,
  X,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const TambahLaporan = () => {
  const navigate = useNavigate();
  const { addLaporanPiket, getCurrentTime } = useCPMI();
  const [formData, setFormData] = useState({
    kegiatan: '',
    jam: getCurrentTime(),
    foto: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    // Validasi ukuran file (maksimal 5MB per file)
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);
    
    if (validFiles.length !== files.length) {
      alert('Beberapa file melebihi ukuran maksimal 5MB dan tidak akan diupload.');
    }
    
    // Untuk demo, simpan nama file
    const fileNames = validFiles.map(file => file.name);
    setFormData(prev => ({
      ...prev,
      foto: [...prev.foto, ...fileNames]
    }));
  };

  const removeFoto = (index) => {
    setFormData(prev => ({
      ...prev,
      foto: prev.foto.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.kegiatan.trim()) return;
    
    // Validasi minimal karakter
    if (formData.kegiatan.trim().length < 50) {
      alert('Laporan kegiatan minimal 50 karakter. Jelaskan aktivitas secara detail.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulasi API call
    setTimeout(() => {
      addLaporanPiket(formData.kegiatan, formData.foto);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Auto redirect setelah 2 detik
      setTimeout(() => {
        navigate('/dashboard/cpmi/piket-laporan');
      }, 2000);
    }, 1500);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-light-body dark:bg-dark-body flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-8 text-center max-w-sm w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
          </motion.div>
          
          <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-2">
            Laporan Berhasil Dikirim!
          </h3>
          
          <p className="text-sm text-secondary mb-4">
            Laporan aktivitas harian kamu telah tersimpan dan akan dilihat oleh pengajar.
          </p>
          
          <div className="w-full bg-light-border dark:bg-dark-border rounded-full h-1 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              className="bg-primary-500 h-1 rounded-full"
            />
          </div>
          
          <p className="text-xs text-secondary">
            Kembali ke halaman laporan...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Tambah Laporan" />
      
      <div className="p-4">
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 mb-6"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
              <FileText className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-blue-900 dark:text-blue-100">
                Laporan Aktivitas Harian
              </h2>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Ceritakan kegiatan kamu hari ini secara detail dan kronologis
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="card p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tanggal & Jam */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2 flex items-center">
                  <Calendar className="mr-2" size={16} />
                  Tanggal
                </label>
                <div className="input-field bg-gray-50 dark:bg-gray-800 cursor-not-allowed flex items-center">
                  <span className="text-light-text-main dark:text-dark-text-main">
                    {getCurrentDate()}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2 flex items-center">
                  <Clock className="mr-2" size={16} />
                  Jam Input
                </label>
                <input
                  type="time"
                  name="jam"
                  value={formData.jam}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Kegiatan */}
            <div>
              <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                Kegiatan Harian <span className="text-red-500">*</span>
              </label>
              <textarea
                name="kegiatan"
                value={formData.kegiatan}
                onChange={handleInputChange}
                rows={8}
                className="input-field resize-none"
                placeholder="Ceritakan aktivitas kamu hari ini dari bangun pagi hingga malam secara detail dan kronologis.\n\nContoh:\nPagi ini saya bangun jam 05:30, langsung membantu Oma Chen menyiapkan sarapan. Setelah sarapan bersama, saya membersihkan dapur dan ruang makan. Pukul 08:00 saya membantu Oma mandi dan berpakaian, lalu menemani beliau duduk di teras sambil menikmati udara pagi.\n\nSiang hari saya memasak makan siang menu sup ayam dan tumis sayuran sesuai yang diajarkan di LPK. Setelah makan siang, Oma istirahat dan saya membersihkan rumah bagian dalam. Sore hari kami jalan-jalan ke taman dekat rumah selama 30 menit.\n\nMalam ini saya membantu menyiapkan makan malam dan menemani Oma menonton TV. Sebelum tidur, saya memastikan semua pintu terkunci dan lampu sudah dimatikan."
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-secondary">
                  Minimal 50 karakter. Jelaskan aktivitas secara detail dan kronologis.
                </p>
                <p className={`text-xs ${
                  formData.kegiatan.length >= 50 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-500 dark:text-red-400'
                }`}>
                  {formData.kegiatan.length}/50
                </p>
              </div>
            </div>

            {/* Upload Foto */}
            <div>
              <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2 flex items-center">
                <Camera className="mr-2" size={16} />
                Foto Kegiatan (Opsional)
              </label>
              <div className="border-2 border-dashed border-light-border dark:border-dark-border rounded-lg p-6">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="foto-upload"
                />
                <label
                  htmlFor="foto-upload"
                  className="flex flex-col items-center justify-center cursor-pointer hover:bg-light-border dark:hover:bg-dark-border transition-colors rounded-lg p-4"
                >
                  <Camera className="text-secondary mb-3" size={32} />
                  <span className="text-sm text-light-text-main dark:text-dark-text-main font-medium mb-1">
                    Klik untuk upload foto kegiatan
                  </span>
                  <span className="text-xs text-secondary text-center">
                    JPG, PNG, maksimal 5MB per foto<br/>
                    Bisa upload beberapa foto sekaligus
                  </span>
                </label>
                
                {/* Preview Uploaded Files */}
                {formData.foto.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                      Foto yang akan diupload:
                    </p>
                    {formData.foto.map((foto, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-3 bg-light-body dark:bg-dark-body rounded-lg border border-light-border dark:border-dark-border"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                            <Image size={16} className="text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-sm text-light-text-main dark:text-dark-text-main font-medium">
                            {foto}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFoto(index)}
                          className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                        >
                          <X size={12} className="text-red-600 dark:text-red-400" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4"
            >
              <div className="flex items-start space-x-3">
                <AlertTriangle className="text-amber-600 dark:text-amber-400 mt-0.5" size={16} />
                <div>
                  <h4 className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">
                    Tips Menulis Laporan yang Baik:
                  </h4>
                  <ul className="text-xs text-amber-800 dark:text-amber-200 space-y-1">
                    <li>• Tulis aktivitas secara kronologis (urut waktu)</li>
                    <li>• Sertakan jam untuk kegiatan penting</li>
                    <li>• Jelaskan interaksi dengan majikan/keluarga</li>
                    <li>• Ceritakan tantangan dan cara mengatasinya</li>
                    <li>• Gunakan bahasa yang sopan dan profesional</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Submit Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard/cpmi/piket-laporan')}
                className="flex-1 btn-secondary"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.kegiatan.trim() || formData.kegiatan.length < 50}
                className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Mengirim Laporan...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Kirim Laporan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default TambahLaporan;