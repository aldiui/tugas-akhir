import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  AlertCircle,
  XCircle,
  Phone,
  Mail,
  Building2,
  Navigation,
  Camera,
  FileText,
  Download,
  Eye,
  ChevronRight,
  ArrowLeft,
  Star
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';

const DetailAbsensiCPMIAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLocationDetails, setShowLocationDetails] = useState(false);

  // Dummy data detail absensi berdasarkan ID
  const absensiDetail = {
    id: 1,
    nama: 'Ahmad Fauzi',
    kelas: 'Taiwan A',
    pengajar: 'Bu Sari Dewi',
    tanggal: '2024-01-15',
    hari: 'Senin',
    status: 'telat',
    kontak: {
      phone: '+62-812-3456-7890',
      email: 'ahmad.fauzi@lpkbmp.com'
    },
    absenMasuk: {
      waktu: '08:15',
      lokasi: {
        latitude: -6.2088,
        longitude: 106.8456,
        alamat: 'LPK Bahana Mega Prestasi, Jakarta Pusat',
        jarak: 15,
        status: 'dalam_radius'
      },
      foto: 'selfie_masuk.jpg',
      keterangan: 'Terlambat karena macet di jalan raya. Sudah berangkat dari rumah jam 07:00 tapi terjebak macet parah di Jalan Sudirman.'
    },
    absenPulang: {
      waktu: '16:30',
      lokasi: {
        latitude: -6.2088,
        longitude: 106.8456,
        alamat: 'LPK Bahana Mega Prestasi, Jakarta Pusat',
        jarak: 8,
        status: 'dalam_radius'
      },
      foto: 'selfie_pulang.jpg',
      keterangan: 'Pulang tepat waktu setelah menyelesaikan semua materi hari ini.'
    },
    jadwalKelas: {
      jamMasuk: '08:00',
      jamTelat: '08:10',
      jamPulang: '16:30',
      toleransiLokasi: 50, // dalam meter
      materiHariIni: [
        'Bahasa Mandarin Dasar - Perkenalan Diri',
        'Budaya Taiwan - Etika dan Sopan Santun',
        'Keterampilan Rumah Tangga - Memasak Tradisional',
        'Orientasi Kerja - Hak dan Kewajiban TKI'
      ]
    },
    riwayatAbsensi: {
      mingguIni: {
        hadir: 4,
        telat: 1,
        alpha: 0,
        persentaseKehadiran: 100
      },
      bulanIni: {
        hadir: 18,
        telat: 2,
        alpha: 0,
        persentaseKehadiran: 100
      }
    },
    evaluasiPengajar: {
      catatan: 'Ahmad menunjukkan komitmen yang baik meskipun terlambat hari ini. Dia selalu memberikan alasan yang jelas dan berusaha untuk tidak mengulangi kesalahan yang sama.',
      rekomendasi: [
        'Disarankan untuk berangkat lebih awal mengantisipasi macet',
        'Pertimbangkan rute alternatif untuk menghindari kemacetan',
        'Tetap pertahankan konsistensi dalam mengikuti pembelajaran'
      ],
      skorKedisiplinan: 8.5,
      skorPartisipasi: 9.2
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'hadir':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'telat':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      case 'alpha':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'hadir':
        return 'from-green-500 to-green-600';
      case 'telat':
        return 'from-yellow-500 to-yellow-600';
      case 'alpha':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getLocationStatusColor = (status) => {
    return status === 'dalam_radius' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Detail Absensi" />
      
      <div className="p-4 pt-5 pb-20">
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${getStatusColor(absensiDetail.status)} rounded-xl p-5 text-white mb-4`}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-lg font-bold">
              {absensiDetail.nama.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold">{absensiDetail.nama}</h1>
              <p className="text-white/80 text-sm">{absensiDetail.kelas} • {absensiDetail.pengajar}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">
                  {absensiDetail.hari}, {new Date(absensiDetail.tanggal).toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
            <div className="text-right">
              {getStatusIcon(absensiDetail.status)}
              <div className="text-xs font-medium mt-1 capitalize">
                {absensiDetail.status}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Informasi Absensi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-4"
        >
          <h2 className="text-base font-semibold text-light-text-main dark:text-dark-text-main mb-3 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Detail Absensi</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-light-body dark:bg-dark-body rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Masuk</span>
              </div>
              <p className="font-semibold text-light-text-main dark:text-dark-text-main">{absensiDetail.absenMasuk.waktu}</p>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                Jarak: {absensiDetail.absenMasuk.lokasi.jarak}m
              </p>
            </div>
            <div className="bg-light-body dark:bg-dark-body rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Pulang</span>
              </div>
              <p className="font-semibold text-light-text-main dark:text-dark-text-main">{absensiDetail.absenPulang.waktu}</p>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                Jarak: {absensiDetail.absenPulang.lokasi.jarak}m
              </p>
            </div>
          </div>
          
          {/* Keterangan */}
          {absensiDetail.absenMasuk.keterangan && (
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-yellow-800 dark:text-yellow-400 mb-1">Keterangan Keterlambatan</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">{absensiDetail.absenMasuk.keterangan}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Lokasi & Kontak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-4"
        >
          <h2 className="text-base font-semibold text-light-text-main dark:text-dark-text-main mb-3 flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span>Lokasi & Kontak</span>
          </h2>
          
          <div className="space-y-3">
            <div className="bg-light-body dark:bg-dark-body rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Alamat LPK</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLocationStatusColor(absensiDetail.absenMasuk.lokasi.status)}`}>
                  {absensiDetail.absenMasuk.lokasi.status === 'dalam_radius' ? 'Dalam Radius' : 'Luar Radius'}
                </span>
              </div>
              <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                {absensiDetail.absenMasuk.lokasi.alamat}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Telepon</p>
                  <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main">{absensiDetail.kontak.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Email</p>
                  <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main">{absensiDetail.kontak.email}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Jadwal Kelas Hari Ini */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-4"
        >
          <h2 className="text-base font-semibold text-light-text-main dark:text-dark-text-main mb-3 flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-green-600" />
            <span>Jadwal Kelas Hari Ini</span>
          </h2>
          
          <div className="space-y-2">
            {absensiDetail.jadwalKelas.materiHariIni.map((materi, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-light-body dark:bg-dark-body rounded-lg">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">{index + 1}</span>
                </div>
                <span className="text-sm text-light-text-main dark:text-dark-text-main">{materi}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Statistik Kehadiran */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-4"
        >
          <h2 className="text-base font-semibold text-light-text-main dark:text-dark-text-main mb-3 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Statistik Kehadiran</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-light-body dark:bg-dark-body rounded-lg p-3">
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-1">Minggu Ini</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-light-text-main dark:text-dark-text-main">
                  {absensiDetail.riwayatAbsensi.mingguIni.hadir + absensiDetail.riwayatAbsensi.mingguIni.telat}/5 Hari
                </span>
                <span className="text-xs text-green-600 font-medium">
                  {absensiDetail.riwayatAbsensi.mingguIni.persentaseKehadiran}%
                </span>
              </div>
            </div>
            <div className="bg-light-body dark:bg-dark-body rounded-lg p-3">
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-1">Bulan Ini</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-light-text-main dark:text-dark-text-main">
                  {absensiDetail.riwayatAbsensi.bulanIni.hadir + absensiDetail.riwayatAbsensi.bulanIni.telat}/20 Hari
                </span>
                <span className="text-xs text-green-600 font-medium">
                  {absensiDetail.riwayatAbsensi.bulanIni.persentaseKehadiran}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Evaluasi Pengajar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-4"
        >
          <h2 className="text-base font-semibold text-light-text-main dark:text-dark-text-main mb-3 flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-600" />
            <span>Evaluasi Pengajar</span>
          </h2>
          
          <div className="space-y-3">
            <div className="p-3 bg-light-body dark:bg-dark-body rounded-lg">
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-1">Catatan</p>
              <p className="text-sm text-light-text-main dark:text-dark-text-main">{absensiDetail.evaluasiPengajar.catatan}</p>
            </div>
            
            <div>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2">Rekomendasi</p>
              <div className="space-y-1">
                {absensiDetail.evaluasiPengajar.rekomendasi.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span className="text-sm text-light-text-main dark:text-dark-text-main">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-3"
        >
          <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export PDF</span>
          </button>
          <button 
            onClick={() => navigate('/dashboard/admin/riwayat-absensi/' + absensiDetail.id)}
            className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Lihat Riwayat</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DetailAbsensiCPMIAdmin;