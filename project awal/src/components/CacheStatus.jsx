import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, Download, CheckCircle, AlertCircle, Trash2, RefreshCw } from 'lucide-react';

const CacheStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cacheStatus, setCacheStatus] = useState('checking');
  const [showStatus, setShowStatus] = useState(false);
  const [swRegistration, setSwRegistration] = useState(null);
  const [cacheSize, setCacheSize] = useState(0);
  const [showCacheInfo, setShowCacheInfo] = useState(false);

  const calculateCacheSize = async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        // Use service worker to get cache size more efficiently
        const messageChannel = new MessageChannel();
        
        messageChannel.port1.onmessage = (event) => {
          if (event.data && event.data.size !== undefined) {
            setCacheSize(event.data.size);
          }
        };
        
        navigator.serviceWorker.controller.postMessage(
          { type: 'GET_CACHE_SIZE' },
          [messageChannel.port2]
        );
      } catch (error) {
        console.error('Error calculating cache size:', error);
        // Fallback to direct cache API
        await calculateCacheSizeDirect();
      }
    } else {
      await calculateCacheSizeDirect();
    }
  };

  const calculateCacheSizeDirect = async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        let totalSize = 0;
        
        for (const cacheName of cacheNames) {
          const cache = await caches.open(cacheName);
          const requests = await cache.keys();
          
          for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
              const blob = await response.blob();
              totalSize += blob.size;
            }
          }
        }
        
        setCacheSize(totalSize);
      } catch (error) {
        console.error('Error calculating cache size:', error);
      }
    }
  };

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check service worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        setSwRegistration(registration);
        setCacheStatus('ready');
        calculateCacheSize();
      }).catch(() => {
        setCacheStatus('error');
      });
    } else {
      setCacheStatus('unsupported');
    }

    // Update cache size periodically
    const cacheInterval = setInterval(calculateCacheSize, 30000); // setiap 30 detik

    // Listen for service worker messages
    const handleSWMessage = (event) => {
      if (event.data && event.data.type === 'CACHE_UPDATE') {
        calculateCacheSize();
        setShowStatus(true);
        setTimeout(() => setShowStatus(false), 3000);
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleSWMessage);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(cacheInterval);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleSWMessage);
      }
    };
  }, []);

  const clearCache = async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        setCacheSize(0);
        setShowStatus(true);
        setTimeout(() => setShowStatus(false), 3000);
        
        // Notify service worker about cache clear
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'CACHE_CLEARED',
            timestamp: Date.now()
          });
        }
        
        // Reload service worker to refresh cache
        if (swRegistration) {
          await swRegistration.update();
        }
        
        // Show success notification
        const notification = document.createElement('div');
        notification.innerHTML = `
          <div style="
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 14px;
            font-weight: 500;
          ">
            ✅ Cache berhasil dibersihkan
          </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 3000);
        
      } catch (error) {
        console.error('Error clearing cache:', error);
        
        // Show error notification
        const errorNotification = document.createElement('div');
        errorNotification.innerHTML = `
          <div style="
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ef4444;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 14px;
            font-weight: 500;
          ">
            ❌ Gagal membersihkan cache
          </div>
        `;
        document.body.appendChild(errorNotification);
        
        setTimeout(() => {
          if (errorNotification.parentElement) {
            errorNotification.remove();
          }
        }, 3000);
      }
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCacheStatusInfo = () => {
    switch (cacheStatus) {
      case 'ready':
        return {
          icon: CheckCircle,
          text: 'Cache Aktif',
          color: 'text-green-600 dark:text-green-400',
          title: 'Cache Siap',
          description: 'Aplikasi siap digunakan offline'
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: 'Cache Error',
          color: 'text-red-600 dark:text-red-400',
          title: 'Cache Bermasalah',
          description: 'Terjadi kesalahan pada cache'
        };
      case 'unsupported':
        return {
          icon: AlertCircle,
          text: 'Cache Tidak Didukung',
          color: 'text-yellow-600 dark:text-yellow-400',
          title: 'Cache Tidak Tersedia',
          description: 'Browser tidak mendukung cache'
        };
      default:
        return {
          icon: Download,
          text: 'Memuat Cache...',
          color: 'text-blue-600 dark:text-blue-400',
          title: 'Memuat Cache',
          description: 'Sedang menyiapkan cache aplikasi'
        };
    }
  };

  const statusInfo = getCacheStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {showStatus && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-2 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-3">
               <StatusIcon className="w-5 h-5" />
               <div>
                 <p className="text-sm font-medium text-gray-900 dark:text-white">
                   {getCacheStatusInfo().title}
                 </p>
                 <p className="text-xs text-gray-500 dark:text-gray-400">
                   {getCacheStatusInfo().description}
                 </p>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Status Koneksi */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                isOnline 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <button
              onClick={() => setShowCacheInfo(!showCacheInfo)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showCacheInfo ? 'Sembunyikan' : 'Detail'}
            </button>
          </div>
        </div>

        {/* Info Cache */}
        <AnimatePresence>
          {showCacheInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 space-y-3"
            >
              <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                   <StatusIcon className="w-4 h-4" />
                   <span className="text-xs text-gray-600 dark:text-gray-400">
                     Cache: {formatBytes(cacheSize)}
                   </span>
                 </div>
                <div className="flex space-x-1">
                  <button
                    onClick={calculateCacheSize}
                    className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                    title="Refresh Cache Info"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                  <button
                    onClick={clearCache}
                    className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    title="Bersihkan Cache"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                 <p>{getCacheStatusInfo().description}</p>
                 {cacheSize > 0 && (
                   <p className="mt-1">
                     Cache membantu aplikasi berjalan lebih cepat saat offline
                   </p>
                 )}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CacheStatus;