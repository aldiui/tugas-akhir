import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  BookOpen,
  Plus,
  Edit3
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import BackHeader from '../../../layout/BackHeader';

const JadwalPengajar = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('senin');

  // Daftar hari dalam seminggu
  const daysOfWeek = [
    { value: 'senin', label: 'Senin' },
    { value: 'selasa', label: 'Selasa' },
    { value: 'rabu', label: 'Rabu' },
    { value: 'kamis', label: 'Kamis' },
    { value: 'jumat', label: 'Jumat' },
    { value: 'sabtu', label: 'Sabtu' },
    { value: 'minggu', label: 'Minggu' }
  ];

  // Dummy data jadwal per hari
  const jadwalMingguan = {
    senin: {
      status: 'aktif',
      pelajaran: [
        {
          id: 1,
          waktu: '08:00 - 09:30',
          mataPelajaran: 'Bahasa Mandarin Dasar',
          deskripsi: 'Pembelajaran dasar bahasa Mandarin untuk komunikasi sehari-hari'
        },
        {
          id: 2,
          waktu: '10:00 - 11:30',
          mataPelajaran: 'Budaya Taiwan',
          deskripsi: 'Pengenalan budaya, tradisi, dan adat istiadat Taiwan'
        }
      ]
    },
    selasa: {
      status: 'aktif',
      pelajaran: [
        {
          id: 3,
          waktu: '08:00 - 09:30',
          mataPelajaran: 'Keterampilan Kerja',
          deskripsi: 'Pelatihan keterampilan kerja rumah tangga dan industri'
        }
      ]
    },
    rabu: {
      status: 'aktif',
      pelajaran: [
        {
          id: 4,
          waktu: '09:00 - 10:30',
          mataPelajaran: 'Bahasa Mandarin Lanjutan',
          deskripsi: 'Percakapan lanjutan untuk komunikasi di tempat kerja'
        },
        {
          id: 5,
          waktu: '13:00 - 14:30',
          mataPelajaran: 'Etika Kerja',
          deskripsi: 'Pembelajaran tentang etika dan tata cara bekerja di Taiwan'
        }
      ]
    },
    kamis: {
      status: 'aktif',
      pelajaran: [
        {
          id: 6,
          waktu: '08:00 - 09:30',
          mataPelajaran: 'Keterampilan Dapur',
          deskripsi: 'Praktik memasak dan mengelola dapur rumah tangga'
        }
      ]
    },
    jumat: {
      status: 'aktif',
      pelajaran: [
        {
          id: 7,
          waktu: '08:00 - 09:30',
          mataPelajaran: 'Review Mingguan',
          deskripsi: 'Evaluasi dan review materi pembelajaran minggu ini'
        }
      ]
    },
    sabtu: {
      status: 'libur',
      pelajaran: []
    },
    minggu: {
      status: 'libur',
      pelajaran: []
    }
  };



  // Get current day schedule
  const currentDaySchedule = jadwalMingguan[selectedDay];
  
  // Handle navigation to edit/add lesson page
  const handleEditSchedule = (day) => {
    navigate('/dashboard/pengajar/jadwal/edit', { 
      state: { 
        day: day,
        schedule: jadwalMingguan[day]
      }
    });
  };

  const handleViewDetail = (day) => {
    navigate('/dashboard/pengajar/jadwal/detail', { 
      state: { 
        day: day,
        schedule: jadwalMingguan[day]
      }
    });
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Jadwal" />
      
      <div className="p-4 pt-5 pb-24 space-y-6">
        {/* Day Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">Jadwal</h2>
            <button
              onClick={() => handleEditSchedule(selectedDay)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah/Edit</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {daysOfWeek.map((day) => {
              const daySchedule = jadwalMingguan[day.value];
              const isSelected = selectedDay === day.value;
              const isActive = daySchedule.status === 'aktif';
              
              return (
                <button
                  key={day.value}
                  onClick={() => setSelectedDay(day.value)}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-light-border dark:border-dark-border hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="text-center">
                    <p className={`text-sm font-medium ${
                      isSelected
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-light-text-main dark:text-dark-text-main'
                    }`}>
                      {day.label}
                    </p>
                    <div className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                      isActive
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}>
                      {isActive ? 'Aktif' : 'Libur'}
                    </div>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                      {daySchedule.pelajaran.length} pelajaran
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Selected Day Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                {daysOfWeek.find(d => d.value === selectedDay)?.label}
              </h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                currentDaySchedule.status === 'aktif'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}>
                {currentDaySchedule.status === 'aktif' ? 'Hari Aktif' : 'Hari Libur'}
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {currentDaySchedule.pelajaran.length}
              </p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Pelajaran
              </p>
            </div>
          </div>

          {currentDaySchedule.status === 'aktif' && currentDaySchedule.pelajaran.length > 0 ? (
            <div className="space-y-3">
              {currentDaySchedule.pelajaran.map((pelajaran, index) => (
                <motion.div
                  key={pelajaran.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-light-body dark:bg-dark-body rounded-lg p-4 border border-light-border dark:border-dark-border"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-light-text-main dark:text-dark-text-main">
                          {pelajaran.mataPelajaran}
                        </h4>
                        <div className="flex items-center space-x-1 text-sm">
                          <Clock className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                          <span className="text-light-text-main dark:text-dark-text-main">{pelajaran.waktu}</span>
                        </div>
                      </div>
                      {pelajaran.deskripsi && (
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          {pelajaran.deskripsi}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleEditSchedule(selectedDay)}
                      className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : currentDaySchedule.status === 'libur' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center py-8"
            >
              <Calendar className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
              <h4 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
                Hari Libur
              </h4>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Tidak ada pelajaran yang dijadwalkan untuk hari ini.
              </p>
              <button
                onClick={() => {
                  // Handle activate day
                  if (window.confirm(`Apakah Anda ingin mengaktifkan hari ${daysOfWeek.find(d => d.value === selectedDay)?.label} dan menambahkan pelajaran?`)) {
                    handleEditSchedule(selectedDay);
                  }
                }}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Aktifkan Hari Ini
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center py-8"
            >
              <BookOpen className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
              <h4 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
                Belum Ada Pelajaran
              </h4>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Hari ini aktif tetapi belum ada pelajaran yang dijadwalkan.
              </p>
              <button
                onClick={() => handleEditSchedule(selectedDay)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Tambah Pelajaran
              </button>
            </motion.div>
          )}
        </motion.div>


      </div>
    </div>
  );
};

export default JadwalPengajar;