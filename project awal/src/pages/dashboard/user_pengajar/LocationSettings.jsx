import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  Target, 
  Save, 
  RefreshCw, 
  AlertCircle,
  Crosshair,
  Ruler
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';

const LocationSettings = () => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  
  // Location settings state
  const [locationSettings, setLocationSettings] = useState({
    className: 'Kelas Bahasa Mandarin A1',
    latitude: -6.2088,
    longitude: 106.8456,
    radius: 50, // in meters
    address: 'Jl. Merdeka No. 123, Jakarta Selatan',
    isActive: true,
    lastUpdated: '2024-01-15 10:30:00'
  });

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation tidak didukung oleh browser ini');
      return;
    }

    setIsGettingLocation(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationSettings(prev => ({
          ...prev,
          latitude: parseFloat(latitude.toFixed(6)),
          longitude: parseFloat(longitude.toFixed(6)),
          lastUpdated: new Date().toLocaleString('id-ID')
        }));
        setIsGettingLocation(false);
        
        // Reverse geocoding simulation (dummy)
        setLocationSettings(prev => ({
          ...prev,
          address: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`
        }));
      },
      (error) => {
        setIsGettingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Izin lokasi ditolak. Aktifkan izin lokasi di browser.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Informasi lokasi tidak tersedia.');
            break;
          case error.TIMEOUT:
            setLocationError('Permintaan lokasi timeout.');
            break;
          default:
            setLocationError('Terjadi kesalahan saat mendapatkan lokasi.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Save location settings
  const handleSaveLocation = () => {
    // Validation
    if (!locationSettings.latitude || !locationSettings.longitude) {
      alert('Koordinat lokasi harus diisi!');
      return;
    }
    
    if (locationSettings.radius < 10 || locationSettings.radius > 500) {
      alert('Radius harus antara 10-500 meter!');
      return;
    }

    // Dummy save functionality
    alert('Pengaturan lokasi berhasil disimpan!');
  };

  // Test location (simulate distance calculation)
  const testLocation = () => {
    // Simulate getting current position and calculating distance
    const testDistance = Math.floor(Math.random() * 100); // Random distance 0-100m
    const isWithinRadius = testDistance <= locationSettings.radius;
    
    alert(
      `Test Lokasi:\n` +
      `Jarak dari titik absen: ${testDistance}m\n` +
      `Status: ${isWithinRadius ? 'Dalam radius ✓' : 'Di luar radius ✗'}\n` +
      `Radius yang diizinkan: ${locationSettings.radius}m`
    );
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Pengaturan Lokasi" />
      
      <div className="p-4 pt-5 pb-20">
        {/* Location Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                  Lokasi Kelas
                </h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {locationSettings.className}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              locationSettings.isActive 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            }`}>
              {locationSettings.isActive ? 'Aktif' : 'Nonaktif'}
            </span>
          </div>
          
          <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <p>Terakhir diperbarui: {locationSettings.lastUpdated}</p>
          </div>
        </motion.div>

        {/* Class Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border mb-6"
        >
          <h4 className="font-semibold text-light-text-main dark:text-dark-text-main mb-4">
            Nama Kelas
          </h4>
          <input
            type="text"
            value={locationSettings.className}
            onChange={(e) => setLocationSettings(prev => ({...prev, className: e.target.value}))}
            className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Masukkan nama kelas"
          />
        </motion.div>

        {/* Coordinates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-light-text-main dark:text-dark-text-main">
              Koordinat Lokasi
            </h4>
            <button
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGettingLocation ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Crosshair className="w-4 h-4" />
              )}
              <span className="text-sm">
                {isGettingLocation ? 'Mencari...' : 'Lokasi Saat Ini'}
              </span>
            </button>
          </div>
          
          {locationError && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-sm text-red-600 dark:text-red-400">{locationError}</span>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                Latitude
              </label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                <input
                  type="number"
                  step="0.000001"
                  value={locationSettings.latitude}
                  onChange={(e) => setLocationSettings(prev => ({...prev, latitude: parseFloat(e.target.value) || 0}))}
                  className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="-6.208800"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                Longitude
              </label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                <input
                  type="number"
                  step="0.000001"
                  value={locationSettings.longitude}
                  onChange={(e) => setLocationSettings(prev => ({...prev, longitude: parseFloat(e.target.value) || 0}))}
                  className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="106.845600"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Alamat
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
              <textarea
                value={locationSettings.address}
                onChange={(e) => setLocationSettings(prev => ({...prev, address: e.target.value}))}
                rows={3}
                className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Alamat lokasi kelas"
              />
            </div>
          </div>
        </motion.div>

        {/* Radius Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border mb-6"
        >
          <h4 className="font-semibold text-light-text-main dark:text-dark-text-main mb-4">
            Radius Absensi
          </h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Jarak Maksimal (meter)
            </label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
              <input
                type="number"
                min="10"
                max="500"
                value={locationSettings.radius}
                onChange={(e) => setLocationSettings(prev => ({...prev, radius: parseInt(e.target.value) || 50}))}
                className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
              CPMI hanya dapat absen dalam radius {locationSettings.radius} meter dari titik ini
            </p>
          </div>
          
          {/* Radius Slider */}
          <div className="mb-4">
            <input
              type="range"
              min="10"
              max="500"
              value={locationSettings.radius}
              onChange={(e) => setLocationSettings(prev => ({...prev, radius: parseInt(e.target.value)}))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
              <span>10m</span>
              <span>250m</span>
              <span>500m</span>
            </div>
          </div>
          
          {/* Visual Indicator */}
          <div className="flex items-center justify-between p-4 bg-light-body dark:bg-dark-body rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-green-300 rounded-full opacity-50"
                  style={{
                    width: `${Math.min(locationSettings.radius / 5, 40)}px`,
                    height: `${Math.min(locationSettings.radius / 5, 40)}px`
                  }}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                  Area Absensi
                </p>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  Radius {locationSettings.radius}m
                </p>
              </div>
            </div>
            <button
              onClick={testLocation}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm"
            >
              Test Lokasi
            </button>
          </div>
        </motion.div>

        {/* Status Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-light-text-main dark:text-dark-text-main mb-1">
                Status Lokasi
              </h4>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {locationSettings.isActive 
                  ? 'Lokasi aktif dan dapat digunakan untuk absensi'
                  : 'Lokasi nonaktif, CPMI tidak dapat melakukan absensi'
                }
              </p>
            </div>
            <button
              onClick={() => setLocationSettings(prev => ({...prev, isActive: !prev.isActive}))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                locationSettings.isActive 
                  ? 'bg-green-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  locationSettings.isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={handleSaveLocation}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            <span>Simpan Pengaturan Lokasi</span>
          </button>
        </motion.div>
      </div>
      

    </div>
  );
};

export default LocationSettings;