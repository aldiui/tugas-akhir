import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  MapPin, 
  Camera
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';

const PermissionSettings = () => {
  // State untuk izin browser
  const [browserPermissions, setBrowserPermissions] = useState({
    location: 'default',
    notification: 'default',
    camera: 'default'
  });

  // Fungsi untuk request permission browser
  const requestPermission = async (type) => {
    let permission = 'denied';
    
    try {
      switch (type) {
        case 'notification':
          if ('Notification' in window) {
            permission = await Notification.requestPermission();
          }
          break;
        case 'location':
          if ('geolocation' in navigator) {
            await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            permission = 'granted';
          }
          break;
        case 'camera':
          if ('mediaDevices' in navigator) {
            await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            permission = 'granted';
          }
          break;
      }
    } catch (error) {
      permission = 'denied';
    }
    
    setBrowserPermissions(prev => ({
      ...prev,
      [type]: permission
    }));
  };

  // Fungsi untuk check current permissions
  const checkPermissions = async () => {
    const permissions = { ...browserPermissions };
    
    // Check notification permission
    if ('Notification' in window) {
      permissions.notification = Notification.permission;
    }
    
    // Check location permission
    if ('permissions' in navigator) {
      try {
        const locationPermission = await navigator.permissions.query({ name: 'geolocation' });
        permissions.location = locationPermission.state;
      } catch (error) {
        permissions.location = 'default';
      }
    }
    
    setBrowserPermissions(permissions);
  };

  // Check permissions on component mount
  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Pengaturan Izin" />
      
      <div className="p-4 pt-5 pb-8">
        {/* Browser Permissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border"
        >
          <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-6">
            Izin Aplikasi
          </h3>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">
            Kelola izin yang diperlukan aplikasi untuk berfungsi dengan optimal
          </p>
          <div className="space-y-4">
            {/* Location Permission */}
            <div className="flex items-center justify-between p-4 bg-light-body dark:bg-dark-body rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <span className="text-light-text-main dark:text-dark-text-main font-medium">Lokasi</span>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Diperlukan untuk absensi dan validasi lokasi kelas
                  </p>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    Status: {browserPermissions.location === 'granted' ? 'Diizinkan' : 
                            browserPermissions.location === 'denied' ? 'Ditolak' : 'Belum Diatur'}
                  </p>
                </div>
              </div>
              {browserPermissions.location !== 'granted' && (
                <button
                  onClick={() => requestPermission('location')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Izinkan
                </button>
              )}
            </div>

            {/* Notification Permission */}
            <div className="flex items-center justify-between p-4 bg-light-body dark:bg-dark-body rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <span className="text-light-text-main dark:text-dark-text-main font-medium">Notifikasi</span>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Untuk menerima pemberitahuan jadwal dan pengumuman penting
                  </p>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    Status: {browserPermissions.notification === 'granted' ? 'Diizinkan' : 
                            browserPermissions.notification === 'denied' ? 'Ditolak' : 'Belum Diatur'}
                  </p>
                </div>
              </div>
              {browserPermissions.notification !== 'granted' && (
                <button
                  onClick={() => requestPermission('notification')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Izinkan
                </button>
              )}
            </div>

            {/* Camera Permission */}
            <div className="flex items-center justify-between p-4 bg-light-body dark:bg-dark-body rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Camera className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <span className="text-light-text-main dark:text-dark-text-main font-medium">Foto dan Video</span>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Untuk mengambil foto profil dan dokumentasi laporan piket
                  </p>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    Status: {browserPermissions.camera === 'granted' ? 'Diizinkan' : 
                            browserPermissions.camera === 'denied' ? 'Ditolak' : 'Belum Diatur'}
                  </p>
                </div>
              </div>
              {browserPermissions.camera !== 'granted' && (
                <button
                  onClick={() => requestPermission('camera')}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                >
                  Izinkan
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PermissionSettings;