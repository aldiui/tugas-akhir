import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Download, CheckCircle, AlertCircle, Trash2, RefreshCw } from 'lucide-react';

const CacheQuickAction = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cacheStatus, setCacheStatus] = useState('checking');
  const [swRegistration, setSwRegistration] = useState(null);
  const [cacheSize, setCacheSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const calculateCacheSize = async () => {
    setIsLoading(true);
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        // Use service worker to get cache size more efficiently
        const messageChannel = new MessageChannel();
        
        messageChannel.port1.onmessage = (event) => {
          if (event.data && event.data.size !== undefined) {
            setCacheSize(event.data.size);
            setIsLoading(false);
          }
        };
        
        navigator.serviceWorker.controller.postMessage(
          { type: 'GET_CACHE_SIZE' },
          [messageChannel.port2]
        );
      } catch (error) {
        console.error('Error calculating cache size:', error);
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
        setIsLoading(false);
      } catch (error) {
        console.error('Error calculating cache size:', error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
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
    if (!isOnline) {
      return {
        icon: WifiOff,
        title: 'Offline',
        description: 'Tidak ada koneksi internet',
        className: 'text-red-500'
      };
    }

    if (cacheSize === 0) {
      return {
        icon: AlertCircle,
        title: 'Cache Kosong',
        description: 'Belum ada data tersimpan',
        className: 'text-yellow-500'
      };
    }

    return {
      icon: CheckCircle,
      title: 'Cache Aktif',
      description: `${formatBytes(cacheSize)} data tersimpan`,
      className: 'text-green-500'
    };
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial cache size calculation
    calculateCacheSize();

    // Register service worker if available
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        setSwRegistration(registration);
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const clearCache = async () => {
    setIsLoading(true);
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        setCacheSize(0);
        
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
    setIsLoading(false);
  };

  const statusInfo = getCacheStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-4 mb-3"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
            {isOnline ? (
              <Wifi size={20} className="text-green-500" />
            ) : (
              <WifiOff size={20} className="text-red-500" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-light-text-main dark:text-dark-text-main">
              Status Koneksi & Cache
            </h3>
            <p className="text-sm text-secondary">
              {isOnline ? 'Online' : 'Offline'} • {statusInfo.description}
            </p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${
          isOnline ? 'bg-green-500' : 'bg-red-500'
        }`} />
      </div>

      {/* Cache Info */}
      <div className="bg-light-body dark:bg-dark-body rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <StatusIcon size={16} className={statusInfo.className} />
            <span className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
              {statusInfo.title}
            </span>
          </div>
          <span className="text-xs text-secondary">
            {formatBytes(cacheSize)}
          </span>
        </div>
        
        {cacheSize > 0 && (
          <p className="text-xs text-secondary">
            Cache membantu aplikasi berjalan lebih cepat saat offline
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={calculateCacheSize}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          <span className="text-sm font-medium">Refresh</span>
        </button>
        
        <button
          onClick={clearCache}
          disabled={isLoading || cacheSize === 0}
          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
        >
          <Trash2 size={14} />
          <span className="text-sm font-medium">Bersihkan</span>
        </button>
      </div>
    </motion.div>
  );
};

export default CacheQuickAction;