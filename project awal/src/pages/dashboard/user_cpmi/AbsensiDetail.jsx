import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  User,
  FileText,
  Camera,
  Navigation,
  Info
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const AbsensiDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cpmi } = useCPMI();
  const absensi = location.state?.absensi;

  // If no absensi data, redirect back
  if (!absensi) {
    navigate('/dashboard/cpmi/absensi');
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'hadir':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'telat':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'tidak_hadir':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'izin':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'sakit':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'hadir':
        return { Icon: CheckCircle, className: "text-green-600" };
      case 'telat':
        return { Icon: AlertTriangle, className: "text-yellow-600" };
      case 'tidak_hadir':
        return { Icon: XCircle, className: "text-red-600" };
      case 'izin':
      case 'sakit':
        return { Icon: FileText, className: "text-blue-600" };
      default:
        return { Icon: Info, className: "text-gray-600" };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'hadir':
        return 'Hadir';
      case 'telat':
        return 'Terlambat';
      case 'tidak_hadir':
        return 'Tidak Hadir';
      case 'izin':
        return 'Izin';
      case 'sakit':
        return 'Sakit';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    return timeString;
  };

  const calculateLateDuration = (jamMasuk, jamMasukSeharusnya) => {
    if (!jamMasuk || !jamMasukSeharusnya) return null;
    
    const [actualHour, actualMin] = jamMasuk.split(':').map(Number);
    const [expectedHour, expectedMin] = jamMasukSeharusnya.split(':').map(Number);
    
    const actualMinutes = actualHour * 60 + actualMin;
    const expectedMinutes = expectedHour * 60 + expectedMin;
    
    const diffMinutes = actualMinutes - expectedMinutes;
    
    if (diffMinutes <= 0) return null;
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    if (hours > 0) {
      return `${hours} jam ${minutes} menit`;
    }
    return `${minutes} menit`;
  };

  const getLocationAccuracy = () => {
    // Simulate location accuracy
    const accuracies = ['Sangat Akurat (±5m)', 'Akurat (±10m)', 'Cukup Akurat (±20m)'];
    return accuracies[Math.floor(Math.random() * accuracies.length)];
  };

  const getAttendanceInsight = (status) => {
    switch (status) {
      case 'hadir':
        return {
          title: 'Kehadiran Tepat Waktu',
          description: 'Terima kasih telah hadir tepat waktu. Konsistensi kehadiran Anda sangat baik untuk persiapan ke Taiwan.',
          tips: [
            'Pertahankan kedisiplinan waktu',
            'Jadilah contoh untuk teman-teman lain',
            'Terus fokus pada pembelajaran'
          ]
        };
      case 'telat':
        return {
          title: 'Keterlambatan Tercatat',
          description: 'Keterlambatan dapat mempengaruhi penilaian dan persiapan Anda. Mari tingkatkan kedisiplinan waktu.',
          tips: [
            'Atur alarm lebih awal',
            'Persiapkan keperluan dari malam sebelumnya',
            'Berangkat 15-30 menit lebih awal',
            'Hindari keterlambatan berulang'
          ]
        };
      case 'tidak_hadir':
        return {
          title: 'Ketidakhadiran Tanpa Keterangan',
          description: 'Ketidakhadiran tanpa keterangan dapat mempengaruhi evaluasi dan kesempatan penempatan ke Taiwan.',
          tips: [
            'Segera hubungi pengajar untuk klarifikasi',
            'Berikan keterangan yang valid',
            'Pelajari materi yang terlewat',
            'Hindari ketidakhadiran berulang'
          ]
        };
      case 'izin':
        return {
          title: 'Izin Resmi',
          description: 'Izin Anda telah dicatat. Pastikan untuk mengejar materi yang terlewat.',
          tips: [
            'Koordinasi dengan teman untuk catatan',
            'Tanyakan materi yang terlewat ke pengajar',
            'Pelajari materi secara mandiri'
          ]
        };
      case 'sakit':
        return {
          title: 'Sakit dengan Surat Keterangan',
          description: 'Semoga cepat sembuh. Jaga kesehatan untuk persiapan optimal ke Taiwan.',
          tips: [
            'Istirahat yang cukup',
            'Minum obat sesuai anjuran',
            'Pelajari materi yang terlewat setelah sembuh',
            'Jaga pola makan dan olahraga'
          ]
        };
      default:
        return {
          title: 'Status Kehadiran',
          description: 'Data kehadiran tercatat dalam sistem.',
          tips: ['Selalu patuhi aturan kehadiran']
        };
    }
  };

  const lateDuration = calculateLateDuration(absensi.jam_masuk, '08:00');
  const insight = getAttendanceInsight(absensi.status);

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Detail Absensi" />
      
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
                Absensi {formatDate(absensi.tanggal)}
              </h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(absensi.status)}`}>
                {(() => {
                  const { Icon, className } = getStatusIcon(absensi.status);
                  return <Icon className={className} size={16} />;
                })()}
                <span className="ml-2">{getStatusText(absensi.status)}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-secondary">Tanggal</p>
                <p className="font-medium text-light-text-main dark:text-dark-text-main">
                  {formatDate(absensi.tanggal)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-secondary">Jam Masuk</p>
                <p className="font-medium text-light-text-main dark:text-dark-text-main">
                  {formatTime(absensi.jam_masuk)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-secondary">Jam Pulang</p>
                <p className="font-medium text-light-text-main dark:text-dark-text-main">
                  {formatTime(absensi.jam_pulang)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <User size={20} className="text-purple-600 dark:text-purple-400" />
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

        {/* Late Duration (if applicable) */}
        {lateDuration && absensi.status === 'telat' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="card p-6 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle size={20} className="text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="font-medium text-light-text-main dark:text-dark-text-main">
                  Durasi Keterlambatan
                </p>
                <p className="text-sm text-secondary">
                  Terlambat {lateDuration} dari jam masuk seharusnya (08:00)
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reason (if applicable) */}
        {absensi.alasan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="card p-6"
          >
            <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
              <FileText size={20} className="mr-2" />
              Keterangan
            </h2>
            <div className="bg-light-body dark:bg-dark-body p-4 rounded-lg">
              <p className="text-secondary">{absensi.alasan}</p>
            </div>
          </motion.div>
        )}

        {/* Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
            <MapPin size={20} className="mr-2" />
            Informasi Lokasi
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Navigation size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-secondary">Akurasi Lokasi</p>
                <p className="font-medium text-light-text-main dark:text-dark-text-main">
                  {getLocationAccuracy()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <MapPin size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-secondary">Lokasi Absen</p>
                <p className="font-medium text-light-text-main dark:text-dark-text-main">
                  LPK Bahana Mega Prestasi
                </p>
                <p className="text-xs text-secondary">
                  Dalam radius yang diizinkan
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Attendance Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
            <Info size={20} className="mr-2" />
            {insight.title}
          </h2>
          
          <p className="text-secondary mb-4 leading-relaxed">
            {insight.description}
          </p>
          
          <div className="space-y-3">
            <h3 className="font-medium text-light-text-main dark:text-dark-text-main">
              Tips untuk Kedepan:
            </h3>
            {insight.tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle size={14} className="text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-secondary">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Photo Evidence (if available) */}
        {absensi.foto && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="card p-6"
          >
            <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4 flex items-center">
              <Camera size={20} className="mr-2" />
              Foto Absensi
            </h2>
            <div className="bg-light-body dark:bg-dark-body p-4 rounded-lg text-center">
              <Camera size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-secondary text-sm">
                Foto absensi tersimpan dalam sistem
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AbsensiDetail;