import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  User, 
  MapPin, 
  BookOpen, 
  Star, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowLeft
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const JadwalDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cpmi } = useCPMI();
  const pelajaran = location.state?.pelajaran;

  // If no pelajaran data, redirect back
  if (!pelajaran) {
    navigate('/dashboard/cpmi/jadwal');
    return null;
  }

  const getTimeStatus = (jamMulai, jamSelesai) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [startHour, startMin] = jamMulai.split(':').map(Number);
    const [endHour, endMin] = jamSelesai.split(':').map(Number);
    
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    
    if (currentTime < startTime) return 'Akan Datang';
    if (currentTime >= startTime && currentTime <= endTime) return 'Sedang Berlangsung';
    return 'Selesai';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sedang Berlangsung':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Akan Datang':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Selesai':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDetailedDescription = (nama) => {
    const descriptions = {
      'Bahasa Mandarin Dasar': 'Pelajaran dasar bahasa Mandarin untuk komunikasi sehari-hari di Taiwan. Meliputi perkenalan diri, angka, waktu, dan percakapan sederhana dengan majikan. Siswa akan belajar cara menyapa, meminta tolong, dan mengekspresikan kebutuhan dasar dalam bahasa Mandarin.',
      'Perawatan Lansia': 'Teknik dan prosedur merawat lansia dengan aman dan nyaman. Termasuk cara memandikan, mobilisasi, pemberian obat, dan penanganan darurat. Materi mencakup psikologi lansia dan cara berkomunikasi yang efektif.',
      'Budaya Taiwan': 'Memahami budaya, tradisi, dan etika dalam keluarga Taiwan. Penting untuk adaptasi dan menghindari kesalahpahaman budaya. Meliputi tata krama, festival tradisional, dan norma sosial yang berlaku.',
      'Praktik Memasak Taiwan': 'Belajar memasak makanan khas Taiwan yang disukai keluarga lokal. Dari makanan sehari-hari hingga makanan khusus untuk acara tertentu. Termasuk teknik memasak dan penggunaan bumbu khas Taiwan.',
      'Simulasi Interview': 'Persiapan menghadapi wawancara dengan agency dan calon majikan. Latihan menjawab pertanyaan, presentasi diri, dan tips sukses interview. Simulasi berbagai skenario interview yang mungkin dihadapi.',
      'Bahasa Mandarin Lanjutan': 'Lanjutan dari bahasa Mandarin dasar dengan fokus pada percakapan yang lebih kompleks dan situasi kerja sehari-hari di Taiwan.',
      'Teknik Komunikasi': 'Cara berkomunikasi efektif dengan majikan dan keluarga Taiwan, termasuk bahasa tubuh dan etika komunikasi.',
      'Perawatan Anak': 'Teknik merawat anak-anak dengan aman, termasuk bermain edukatif dan menangani situasi darurat.',
      'Housekeeping Taiwan Style': 'Standar kebersihan dan penataan rumah sesuai dengan kebiasaan keluarga Taiwan.',
      'Olahraga & Kesehatan': 'Menjaga kesehatan fisik dan mental selama bekerja, termasuk olahraga ringan dan manajemen stres.'
    };
    return descriptions[nama] || 'Deskripsi detail akan segera tersedia.';
  };

  const getLearningObjectives = (nama) => {
    const objectives = {
      'Bahasa Mandarin Dasar': [
        'Mampu memperkenalkan diri dalam bahasa Mandarin',
        'Menguasai angka dan waktu dalam bahasa Mandarin',
        'Dapat berkomunikasi dasar dengan majikan',
        'Memahami instruksi sederhana dalam bahasa Mandarin'
      ],
      'Perawatan Lansia': [
        'Menguasai teknik memandikan lansia dengan aman',
        'Dapat melakukan mobilisasi lansia',
        'Memahami cara pemberian obat yang benar',
        'Mampu menangani situasi darurat'
      ],
      'Budaya Taiwan': [
        'Memahami tata krama dan etika Taiwan',
        'Mengenal festival dan tradisi Taiwan',
        'Dapat beradaptasi dengan norma sosial Taiwan',
        'Menghindari kesalahpahaman budaya'
      ],
      'Praktik Memasak Taiwan': [
        'Menguasai resep makanan Taiwan populer',
        'Memahami teknik memasak khas Taiwan',
        'Dapat menggunakan bumbu dan rempah Taiwan',
        'Mampu menyajikan makanan sesuai selera Taiwan'
      ],
      'Simulasi Interview': [
        'Dapat mempresentasikan diri dengan percaya diri',
        'Mampu menjawab pertanyaan interview dengan baik',
        'Memahami ekspektasi majikan Taiwan',
        'Siap menghadapi berbagai skenario interview'
      ]
    };
    return objectives[nama] || [
      'Memahami materi pelajaran dengan baik',
      'Dapat menerapkan ilmu dalam praktik',
      'Siap untuk implementasi di Taiwan'
    ];
  };

  const status = getTimeStatus(pelajaran.jam_mulai, pelajaran.jam_selesai);
  const objectives = getLearningObjectives(pelajaran.nama);

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Detail Pelajaran" />
      
      <div className="p-4 space-y-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-light-text-main dark:text-dark-text-main mb-2">
                {pelajaran.nama}
              </h1>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>
          </div>

          {/* Time & Location Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-secondary">Waktu</p>
                <p className="font-medium text-light-text-main dark:text-dark-text-main">
                  {pelajaran.jam_mulai} - {pelajaran.jam_selesai}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <MapPin size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-secondary">Ruang</p>
                <p className="font-medium text-light-text-main dark:text-dark-text-main">
                  {pelajaran.ruang}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <User size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-secondary">Pengajar</p>
                <p className="font-medium text-light-text-main dark:text-dark-text-main">
                  {pelajaran.pengajar}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <BookOpen size={20} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-secondary">Kelas</p>
                <p className="font-medium text-light-text-main dark:text-dark-text-main">
                  {cpmi.kelas}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
            <Info size={20} className="mr-2" />
            Deskripsi Pelajaran
          </h2>
          <p className="text-secondary leading-relaxed">
            {getDetailedDescription(pelajaran.nama)}
          </p>
        </motion.div>

        {/* Learning Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
            <Star size={20} className="mr-2" />
            Tujuan Pembelajaran
          </h2>
          <div className="space-y-3">
            {objectives.map((objective, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle size={14} className="text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-secondary">{objective}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Materi */}
        {pelajaran.materi && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="card p-6"
          >
            <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
              <BookOpen size={20} className="mr-2" />
              Materi Hari Ini
            </h2>
            <div className="bg-light-body dark:bg-dark-body p-4 rounded-lg">
              <p className="text-secondary">{pelajaran.materi}</p>
            </div>
          </motion.div>
        )}

        {/* Status Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`card p-4 border-l-4 ${
            status === 'Sedang Berlangsung' 
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
              : status === 'Akan Datang'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-500 bg-gray-50 dark:bg-gray-900/20'
          }`}
        >
          <div className="flex items-center space-x-3">
            {status === 'Sedang Berlangsung' ? (
              <AlertCircle size={20} className="text-green-600 dark:text-green-400" />
            ) : status === 'Akan Datang' ? (
              <Clock size={20} className="text-blue-600 dark:text-blue-400" />
            ) : (
              <CheckCircle size={20} className="text-gray-600 dark:text-gray-400" />
            )}
            <div>
              <p className="font-medium text-light-text-main dark:text-dark-text-main">
                {status === 'Sedang Berlangsung' 
                  ? 'Pelajaran Sedang Berlangsung'
                  : status === 'Akan Datang'
                  ? 'Bersiap untuk Pelajaran'
                  : 'Pelajaran Telah Selesai'
                }
              </p>
              <p className="text-sm text-secondary">
                {status === 'Sedang Berlangsung' 
                  ? 'Segera menuju ruang kelas jika belum hadir'
                  : status === 'Akan Datang'
                  ? 'Pastikan sudah menyiapkan materi dan alat tulis'
                  : 'Terima kasih telah mengikuti pelajaran hari ini'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JadwalDetail;