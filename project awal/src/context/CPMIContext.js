import React, { createContext, useContext, useState, useEffect } from 'react';
import cpmiData from '../data/dummy_cpmi_taiwan.json';
import jadwalData from '../data/dummy_jadwal.json';
import absensiData from '../data/dummy_absensi.json';

const CPMIContext = createContext();

export const useCPMI = () => {
  const context = useContext(CPMIContext);
  if (!context) {
    throw new Error('useCPMI must be used within a CPMIProvider');
  }
  return context;
};

export const CPMIProvider = ({ children }) => {
  // Initialize CPMI data with demo status if available
  const initializeCPMI = () => {
    try {
      const demoStatus = localStorage.getItem('demoStatus');
      if (demoStatus) {
        return { ...cpmiData.cpmi, status: demoStatus };
      }
      return cpmiData.cpmi;
    } catch (error) {
      console.error('Error initializing CPMI:', error);
      return {
        id: "CPMI001",
        nama: "Siti Nurhaliza",
        status: "Aktif",
        kelas: "Taiwan Batch 15"
      };
    }
  };

  // Create dummy CPMI list for pengajar/admin dashboard
  const createCPMIList = () => {
    try {
      const statuses = ['Aktif', 'Piket', 'Terbang', 'Izin', 'Tidak Aktif'];
      const names = [
        'Siti Nurhaliza', 'Dewi Sartika', 'Kartini Putri', 'Mega Wati', 'Sri Mulyani',
        'Rina Kartika', 'Maya Sari', 'Indah Permata', 'Lestari Wulan', 'Fitri Handayani',
        'Nur Azizah', 'Ratna Dewi', 'Sari Indah', 'Wulan Dari', 'Putri Ayu'
      ];
      
      const result = names.map((nama, index) => ({
        id: `CPMI${String(index + 1).padStart(3, '0')}`,
        nama,
        kelas: 'Taiwan Batch 15',
        status: statuses[index % statuses.length],
        pengajar: 'Bu Mei Lin',
        tanggal_mulai_pelatihan: '2024-01-15',
        target_keberangkatan: '2024-06-15'
      }));
      
      console.log('CPMI List created:', result);
      return result;
    } catch (error) {
      console.error('Error creating CPMI list:', error);
      return [];
    }
  };

  const [cpmi, setCpmi] = useState(() => initializeCPMI());
  const [cpmiList, setCpmiList] = useState(() => createCPMIList());
  const [jadwal, setJadwal] = useState(() => {
    try {
      return jadwalData.jadwal_harian || [];
    } catch (error) {
      console.error('Error loading jadwal:', error);
      return [];
    }
  });
  const [absensi, setAbsensi] = useState(() => {
    try {
      return absensiData.riwayat_absensi || [];
    } catch (error) {
      console.error('Error loading absensi:', error);
      return [];
    }
  });
  const [laporanPiket, setLaporanPiket] = useState(() => {
    try {
      return absensiData.laporan_piket || [];
    } catch (error) {
      console.error('Error loading laporan piket:', error);
      return [];
    }
  });
  const [notifikasi, setNotifikasi] = useState(jadwalData.pengumuman_jadwal || []);
  const [isAbsenMasuk, setIsAbsenMasuk] = useState(false);
  const [isAbsenPulang, setIsAbsenPulang] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Update CPMI status when demo status changes
  useEffect(() => {
    const handleStorageChange = () => {
      const demoStatus = localStorage.getItem('demoStatus');
      if (demoStatus && demoStatus !== cpmi.status) {
        setCpmi(prev => ({ ...prev, status: demoStatus }));
      }
    };

    // Listen for storage changes from other tabs
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom event for same-tab updates
    window.addEventListener('statusUpdate', handleStorageChange);
    
    // Also check on mount
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('statusUpdate', handleStorageChange);
    };
  }, [cpmi.status]);

  // Simulate getting current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
          // Set dummy location for demo
          setCurrentLocation({
            latitude: -6.4817,
            longitude: 106.8540
          });
        }
      );
    } else {
      // Set dummy location for demo
      setCurrentLocation({
        latitude: -6.4817,
        longitude: 106.8540
      });
    }
  }, []);

  // Calculate distance from class location
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const getDistanceFromClass = () => {
    if (!currentLocation) return null;
    
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      cpmiData.lokasi_kelas.latitude,
      cpmiData.lokasi_kelas.longitude
    );
    
    return Math.round(distance);
  };

  const isInClassRadius = () => {
    const distance = getDistanceFromClass();
    return distance !== null && distance <= cpmiData.lokasi_kelas.radius;
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const isLate = () => {
    const currentTime = getCurrentTime();
    const batasTelat = cpmiData.jam_operasional.batas_telat;
    return currentTime > batasTelat;
  };

  const absenMasuk = (alasanTelat = null) => {
    const now = new Date();
    const newAbsen = {
      id: `ABS${Date.now()}`,
      tanggal: now.toISOString().split('T')[0],
      hari: now.toLocaleDateString('id-ID', { weekday: 'long' }),
      jam_masuk: getCurrentTime(),
      jam_pulang: null,
      status: isLate() ? 'Terlambat' : 'Hadir',
      keterangan: isLate() ? `Terlambat - ${alasanTelat || 'Tidak ada keterangan'}` : 'Tepat waktu',
      lokasi_absen: cpmiData.lokasi_kelas.nama,
      jarak_dari_kelas: `${getDistanceFromClass()}m`,
      alasan_telat: alasanTelat
    };
    
    setAbsensi(prev => [newAbsen, ...prev]);
    setIsAbsenMasuk(true);
    return newAbsen;
  };

  const absenPulang = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayAbsen = absensi.find(a => a.tanggal === today);
    
    if (todayAbsen) {
      const updatedAbsen = {
        ...todayAbsen,
        jam_pulang: getCurrentTime()
      };
      
      setAbsensi(prev => prev.map(a => 
        a.tanggal === today ? updatedAbsen : a
      ));
      setIsAbsenPulang(true);
      return updatedAbsen;
    }
    return null;
  };

  const addLaporanPiket = (kegiatan, fotoKegiatan = []) => {
    const now = new Date();
    const newLaporan = {
      id: `PIKET${Date.now()}`,
      tanggal: now.toISOString().split('T')[0],
      jam_input: getCurrentTime(),
      kegiatan,
      foto_kegiatan: fotoKegiatan,
      lokasi: 'Lokasi Piket',
      evaluasi_majikan: 'Menunggu evaluasi'
    };
    
    setLaporanPiket(prev => [newLaporan, ...prev]);
    return newLaporan;
  };

  const updateCPMIStatus = (newStatus) => {
    setCpmi(prev => ({ ...prev, status: newStatus }));
    // Trigger custom event for same-tab updates
    window.dispatchEvent(new Event('statusUpdate'));
  };

  const updateProfile = (updatedData) => {
    setCpmi(prev => ({ ...prev, ...updatedData }));
  };

  // Filter CPMI yang sedang piket
  const cpmiPiket = (cpmiList || []).filter(cpmi => cpmi && cpmi.status === 'Piket');

  const value = {
    cpmi,
    cpmiList,
    cpmiPiket,
    jadwal,
    absensi,
    laporanPiket,
    notifikasi,
    isAbsenMasuk,
    isAbsenPulang,
    currentLocation,
    getDistanceFromClass,
    isInClassRadius,
    getCurrentTime,
    isLate,
    absenMasuk,
    absenPulang,
    addLaporanPiket,
    updateCPMIStatus,
    updateProfile,
    lokasi_kelas: cpmiData.lokasi_kelas,
    jam_operasional: cpmiData.jam_operasional,
    status_options: cpmiData.status_options
  };

  return (
    <CPMIContext.Provider value={value}>
      {children}
    </CPMIContext.Provider>
  );
};

export default CPMIContext;