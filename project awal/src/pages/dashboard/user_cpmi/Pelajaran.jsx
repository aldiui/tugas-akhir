import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  MapPin, 
  User, 
  Target,
  FileText,
  Star,
  ChevronDown,
  ChevronUp,
  Play,
  CheckCircle
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const Pelajaran = () => {
  const { jadwal, cpmi } = useCPMI();
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
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

  const getSubjectIcon = (nama) => {
    if (nama.toLowerCase().includes('mandarin') || nama.toLowerCase().includes('bahasa')) {
      return '🗣️';
    } else if (nama.toLowerCase().includes('perawatan') || nama.toLowerCase().includes('kesehatan')) {
      return '🏥';
    } else if (nama.toLowerCase().includes('budaya')) {
      return '🏮';
    } else if (nama.toLowerCase().includes('masak') || nama.toLowerCase().includes('memasak')) {
      return '👨‍🍳';
    } else if (nama.toLowerCase().includes('interview') || nama.toLowerCase().includes('simulasi')) {
      return '💼';
    }
    return '📚';
  };

  const getDetailedDescription = (pelajaran) => {
    const descriptions = {
      'Bahasa Mandarin Dasar': 'Pelajaran dasar bahasa Mandarin untuk komunikasi sehari-hari di Taiwan. Meliputi perkenalan diri, angka, waktu, dan percakapan sederhana dengan majikan.',
      'Perawatan Lansia': 'Teknik dan prosedur merawat lansia dengan aman dan nyaman. Termasuk cara memandikan, mobilisasi, pemberian obat, dan penanganan darurat.',
      'Budaya Taiwan': 'Memahami budaya, tradisi, dan etika dalam keluarga Taiwan. Penting untuk adaptasi dan menghindari kesalahpahaman budaya.',
      'Praktik Memasak Taiwan': 'Belajar memasak makanan khas Taiwan yang disukai keluarga lokal. Dari makanan sehari-hari hingga makanan khusus.',
      'Simulasi Interview': 'Persiapan menghadapi wawancara dengan agency dan calon majikan. Latihan menjawab pertanyaan dan presentasi diri.'
    };
    return descriptions[pelajaran.nama] || 'Deskripsi detail akan ditambahkan segera.';
  };

  const getLearningObjectives = (pelajaran) => {
    const objectives = {
      'Bahasa Mandarin Dasar': [
        'Mampu memperkenalkan diri dalam bahasa Mandarin',
        'Menguasai angka dan waktu',
        'Dapat berkomunikasi sederhana dengan majikan',
        'Memahami instruksi dasar dalam bahasa Mandarin'
      ],
      'Perawatan Lansia': [
        'Menguasai teknik memandikan lansia dengan aman',
        'Dapat melakukan mobilisasi dan transfer pasien',
        'Memahami cara pemberian obat yang benar',
        'Mengetahui tanda-tanda darurat dan penanganannya'
      ],
      'Budaya Taiwan': [
        'Memahami nilai-nilai keluarga Taiwan',
        'Mengetahui etika dan sopan santun',
        'Dapat beradaptasi dengan lingkungan baru',
        'Menghindari kesalahpahaman budaya'
      ],
      'Praktik Memasak Taiwan': [
        'Dapat memasak makanan khas Taiwan',
        'Menguasai teknik memasak yang disukai keluarga Taiwan',
        'Memahami bahan-bahan dan bumbu Taiwan',
        'Dapat menyajikan makanan dengan presentasi menarik'
      ],
      'Simulasi Interview': [
        'Dapat mempresentasikan diri dengan percaya diri',
        'Menguasai teknik menjawab pertanyaan interview',
        'Memahami ekspektasi majikan',
        'Siap menghadapi proses seleksi'
      ]
    };
    return objectives[pelajaran.nama] || ['Tujuan pembelajaran akan ditambahkan segera.'];
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Pelajaran" />
      
      <div className="p-4 space-y-6">
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-4"
        >
          <div className="text-center">
            <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-2">
              Pelajaran Hari Ini
            </h2>
            <p className="text-sm text-secondary">
              {jadwal.mata_pelajaran.length} mata pelajaran
            </p>
          </div>
        </motion.div>

        {/* Pelajaran List */}
        <div className="space-y-4">
          {jadwal.mata_pelajaran.map((pelajaran, index) => {
            const status = getTimeStatus(pelajaran.jam_mulai, pelajaran.jam_selesai);
            const isExpanded = expandedCard === pelajaran.id;
            const objectives = getLearningObjectives(pelajaran);
            
            return (
              <motion.div
                key={pelajaran.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card overflow-hidden"
              >
                {/* Main Content */}
                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Icon & Time */}
                    <div className="text-center min-w-[70px]">
                      <div className="text-2xl mb-2">
                        {getSubjectIcon(pelajaran.nama)}
                      </div>
                      <div className="text-sm font-bold text-light-text-main dark:text-dark-text-main">
                        {pelajaran.jam_mulai}
                      </div>
                      <div className="text-xs text-secondary">
                        {pelajaran.jam_selesai}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-light-text-main dark:text-dark-text-main pr-2">
                          {pelajaran.nama}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(status)}`}>
                          {status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </div>
  );
};

export default Pelajaran;