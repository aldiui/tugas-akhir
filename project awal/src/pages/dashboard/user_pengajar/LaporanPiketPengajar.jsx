import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Search,
  User,
  Eye,
  Calendar,
  Filter,
  ChevronDown
} from 'lucide-react';
import { useCPMI } from '../../../context/CPMIContext';
import BackHeader from '../../../layout/BackHeader';

const LaporanPiketPengajar = () => {
  const { cpmiPiket } = useCPMI();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [periodFilter, setPeriodFilter] = useState('hari'); // hari, minggu, bulan, custom
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Get today's date
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate dummy data untuk berbagai periode
  const generateDummyPiketData = () => {
    const baseData = [
      {
        id: 1,
        nama: 'Siti Nurhaliza',
        lokasi: 'Rumah Majikan - Taipei',
        foto: 'avatar1.jpg',
        tanggal: '2024-01-15',
        totalAktivitas: 8
      },
      {
        id: 2,
        nama: 'Dewi Sartika',
        lokasi: 'Rumah Majikan - Kaohsiung',
        foto: 'avatar2.jpg',
        tanggal: '2024-01-14',
        totalAktivitas: 6
      },
      {
        id: 3,
        nama: 'Rina Kartika',
        lokasi: 'Rumah Majikan - Taichung',
        foto: 'avatar3.jpg',
        tanggal: '2024-01-13',
        totalAktivitas: 7
      }
    ];
    
    // Generate more data for different periods
    const extendedData = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      baseData.forEach((cpmi, index) => {
        if (Math.random() > 0.3) { // 70% chance of having piket data
          extendedData.push({
            ...cpmi,
            id: `${cpmi.id}_${i}`,
            tanggal: dateStr,
            totalAktivitas: Math.floor(Math.random() * 10) + 3
          });
        }
      });
    }
    
    return extendedData;
  };

  const allPiketData = generateDummyPiketData();

  // Filter data berdasarkan periode
  const getFilteredData = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    switch (periodFilter) {
      case 'hari':
        return allPiketData.filter(item => item.tanggal === todayStr);
      case 'minggu':
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return allPiketData.filter(item => {
          const itemDate = new Date(item.tanggal);
          return itemDate >= weekAgo && itemDate <= today;
        });
      case 'bulan':
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        return allPiketData.filter(item => {
          const itemDate = new Date(item.tanggal);
          return itemDate >= monthAgo && itemDate <= today;
        });
      case 'custom':
        if (startDate && endDate) {
          return allPiketData.filter(item => {
            const itemDate = new Date(item.tanggal);
            return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
          });
        }
        return allPiketData;
      default:
        return allPiketData.filter(item => item.tanggal === todayStr);
    }
  };

  const filteredPiketData = getFilteredData();

  // Dummy data CPMI yang sedang piket hari ini (untuk backward compatibility)
  const cpmiPiketHariIni = [
    {
      id: 1,
      nama: 'Siti Nurhaliza',
      lokasi: 'Rumah Majikan - Taipei',
      foto: 'avatar1.jpg',
      totalAktivitas: 8,
      aktivitas: [
        {
          waktu: '05:30',
          kegiatan: 'Bangun pagi, mandi dan sarapan. Mempersiapkan diri untuk memulai aktivitas harian.',
          foto: ['foto1.jpg']
        },
        {
          waktu: '06:00',
          kegiatan: 'Membantu ibu majikan menyiapkan sarapan untuk keluarga. Memasak nasi, telur, dan sayuran.',
          foto: ['foto2.jpg', 'foto3.jpg']
        },
        {
          waktu: '07:00',
          kegiatan: 'Membersihkan dapur dan ruang makan setelah sarapan keluarga selesai.',
          foto: ['foto4.jpg']
        },
        {
          waktu: '08:00',
          kegiatan: 'Mengurus anak-anak, memandikan dan menyiapkan mereka untuk sekolah.',
          foto: ['foto5.jpg', 'foto6.jpg']
        },
        {
          waktu: '09:30',
          kegiatan: 'Membereskan kamar tidur dan mengganti seprai tempat tidur.',
          foto: ['foto7.jpg']
        },
        {
          waktu: '11:00',
          kegiatan: 'Mencuci pakaian kotor dan menjemur di halaman belakang.',
          foto: ['foto8.jpg']
        },
        {
          waktu: '13:00',
          kegiatan: 'Menyiapkan makan siang untuk keluarga dan membantu menyajikan.',
          foto: ['foto9.jpg', 'foto10.jpg']
        },
        {
          waktu: '15:00',
          kegiatan: 'Membersihkan rumah secara menyeluruh, menyapu dan mengepel lantai.',
          foto: ['foto11.jpg']
        }
      ]
    },
    {
      id: 2,
      nama: 'Dewi Sartika',
      lokasi: 'Kantor Agency - Taichung',
      foto: 'avatar2.jpg',
      totalAktivitas: 5,
      aktivitas: [
        {
          waktu: '08:00',
          kegiatan: 'Tiba di kantor agency untuk mengikuti orientasi kerja dan pelatihan.',
          foto: ['foto12.jpg']
        },
        {
          waktu: '09:00',
          kegiatan: 'Mengikuti sesi pembelajaran tentang budaya Taiwan dan tata cara bekerja.',
          foto: ['foto13.jpg', 'foto14.jpg']
        },
        {
          waktu: '11:00',
          kegiatan: 'Praktik komunikasi dasar dalam bahasa Mandarin dengan instruktur.',
          foto: ['foto15.jpg']
        },
        {
          waktu: '14:00',
          kegiatan: 'Mempelajari hak dan kewajiban sebagai pekerja migran di Taiwan.',
          foto: ['foto16.jpg']
        },
        {
          waktu: '16:00',
          kegiatan: 'Evaluasi dan diskusi tentang materi yang telah dipelajari hari ini.',
          foto: ['foto17.jpg']
        }
      ]
    },
    {
      id: 3,
      nama: 'Rina Kartika',
      lokasi: 'Rumah Majikan - Kaohsiung',
      foto: 'avatar3.jpg',
      totalAktivitas: 6,
      aktivitas: [
        {
          waktu: '06:00',
          kegiatan: 'Memulai hari dengan membersihkan rumah, menyapu halaman depan.',
          foto: ['foto18.jpg']
        },
        {
          waktu: '07:30',
          kegiatan: 'Menyiapkan sarapan untuk majikan dan keluarga.',
          foto: ['foto19.jpg', 'foto20.jpg']
        },
        {
          waktu: '09:00',
          kegiatan: 'Mengepel lantai di seluruh rumah dan membereskan kamar tidur.',
          foto: ['foto21.jpg']
        },
        {
          waktu: '11:30',
          kegiatan: 'Mencuci pakaian dan peralatan rumah tangga.',
          foto: ['foto22.jpg']
        },
        {
          waktu: '13:30',
          kegiatan: 'Memasak makan siang dan membantu menyajikan untuk keluarga.',
          foto: ['foto23.jpg', 'foto24.jpg']
        },
        {
          waktu: '15:30',
          kegiatan: 'Menjaga dan bermain dengan anak-anak majikan di taman.',
          foto: ['foto25.jpg']
        }
      ]
    }
  ];

  // Gabungkan data CPMI berdasarkan nama untuk filter selain 'hari'
  const processedPiketData = periodFilter === 'hari' 
    ? filteredPiketData 
    : filteredPiketData.reduce((acc, current) => {
        const existing = acc.find(item => item.nama === current.nama);
        if (existing) {
          existing.totalAktivitas += current.totalAktivitas;
        } else {
          acc.push({ ...current });
        }
        return acc;
      }, []);

  // Filter CPMI berdasarkan pencarian
  const filteredCPMI = processedPiketData.filter(cpmi => 
    cpmi.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cpmi.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click to detail page
  const handleDetailClick = (cpmi) => {
    const queryParams = new URLSearchParams({
      period: periodFilter,
      ...(startDate && { start: startDate }),
      ...(endDate && { end: endDate })
    });
    
    navigate(`/dashboard/pengajar/laporan-piket/detail/${encodeURIComponent(cpmi.nama)}?${queryParams.toString()}`, {
      state: { cpmiData: cpmi }
    });
  };





  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body transition-colors duration-200">
      <BackHeader title="Laporan Piket" />
      
      <div className="p-4 pt-5 pb-24">

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
            <input
              type="text"
              placeholder="Cari nama CPMI atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </motion.div>

        {/* Filter Periode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-6"
        >
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
            <span className="text-sm font-medium text-light-text-main dark:text-dark-text-main">Filter Periode</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {[
              { value: 'hari', label: 'Hari Ini' },
              { value: 'minggu', label: 'Minggu Ini' },
              { value: 'bulan', label: 'Bulan Ini' },
              { value: 'custom', label: 'Custom' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setPeriodFilter(option.value);
                  if (option.value !== 'custom') {
                    setShowDatePicker(false);
                  } else {
                    setShowDatePicker(true);
                  }
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  periodFilter === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-light-body dark:bg-dark-body text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-main dark:hover:text-dark-text-main'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Custom Date Range */}
          {periodFilter === 'custom' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{cpmiPiket.length}</div>
            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">CPMI Piket</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{filteredCPMI.length}</div>
            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {periodFilter === 'hari' ? 'Piket Hari Ini' :
               periodFilter === 'minggu' ? 'Piket Minggu Ini' :
               periodFilter === 'bulan' ? 'Piket Bulan Ini' :
               'Piket Periode Custom'}
            </div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {filteredCPMI.reduce((total, cpmi) => total + cpmi.totalAktivitas, 0)}
            </div>
            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Total Aktivitas</div>
          </div>
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(filteredCPMI.reduce((total, cpmi) => total + cpmi.totalAktivitas, 0) / Math.max(filteredCPMI.length, 1))}
            </div>
            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Rata-rata</div>
          </div>
        </motion.div>

        {/* CPMI Piket Hari Ini */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-light-text-main dark:text-dark-text-main">
              {periodFilter === 'hari' ? 'CPMI Piket Hari Ini' :
               periodFilter === 'minggu' ? 'CPMI Piket Minggu Ini' :
               periodFilter === 'bulan' ? 'CPMI Piket Bulan Ini' :
               'CPMI Piket Periode Custom'}
            </h2>
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {filteredCPMI.length} CPMI ditemukan
            </span>
          </div>

          <div className="space-y-4">
            {filteredCPMI.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <User className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-light-text-main dark:text-dark-text-main mb-2">
                  {periodFilter === 'hari' ? 'Tidak ada CPMI piket hari ini' :
                   periodFilter === 'minggu' ? 'Tidak ada CPMI piket minggu ini' :
                   periodFilter === 'bulan' ? 'Tidak ada CPMI piket bulan ini' :
                   'Tidak ada CPMI piket pada periode yang dipilih'}
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  {periodFilter === 'hari' ? `Belum ada CPMI yang sedang piket pada ${today}` :
                   'Belum ada data laporan piket untuk periode yang dipilih'}
                </p>
              </motion.div>
            ) : (
              filteredCPMI.map((cpmi, index) => (
                <motion.div
                  key={cpmi.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleDetailClick(cpmi)}
                  className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-500"
                >
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {cpmi.nama.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-light-text-main dark:text-dark-text-main mb-1">
                        {cpmi.nama}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{cpmi.lokasi}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Piket Hari Ini</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          Total Aktivitas: <span className="font-medium text-blue-500">{cpmi.totalAktivitas}</span>
                        </span>
                        <Eye className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LaporanPiketPengajar;