import React from 'react';
import { Sun, Moon, Bell, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCPMI } from '../context/CPMIContext';
import logoHorizontal from '../assets/logohorizontal.png';

const MainHeader = ({ title = "Dashboard CPMI", showNotification = true, compact = false, hidden = false }) => {
  const { isDark, toggleTheme } = useTheme();
  const { cpmi, notifikasi } = useCPMI();

  // Count unread notifications (dummy logic)
  const unreadCount = (notifikasi && Array.isArray(notifikasi)) ? notifikasi.filter(n => n.prioritas === 'urgent').length : 0;

  // Hide header if hidden prop is true
  if (hidden) {
    return null;
  }

  const getStatusColor = (status) => {
    const colors = {
      'Aktif': 'status-aktif',
      'Piket': 'status-piket',
      'Terbang': 'status-terbang',
      'Izin': 'status-izin',
      'Tidak Aktif': 'status-tidak-aktif'
    };
    return colors[status] || 'status-aktif';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <div className={`header safe-area-top ${compact ? 'py-2 px-3' : 'py-3 px-4'} sm:px-6 transition-all duration-300`}>
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Left Section - Logo & User Info */}
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={logoHorizontal} 
              alt="LPK Bahana Mega Prestasi" 
              className={`${compact ? 'h-5 sm:h-6' : 'h-6 sm:h-8'} w-auto object-contain max-w-[120px] sm:max-w-none`}
            />
          </div>
          
          {/* User Info - Compact Version */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0 flex-1">
            <div className={`${compact ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-7 h-7 sm:w-8 sm:h-8'} bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0`}>
              <span className={`text-white font-semibold ${compact ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'}`}>
                {cpmi?.nama?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'CP'}
              </span>
            </div>
            
            <div className="min-w-0 flex-1 hidden sm:block">
              {!compact ? (
                <div>
                  <p className="text-xs text-secondary truncate">{getGreeting()}</p>
                  <h1 className="font-semibold text-sm text-light-text-main dark:text-dark-text-main truncate">
                    {cpmi?.nama?.split(' ')[0] || 'CPMI'}
                  </h1>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <span className={`status-badge ${getStatusColor(cpmi?.status)} text-xs px-1.5 py-0.5`}>
                      {cpmi?.status || 'Aktif'}
                    </span>
                    <span className="text-xs text-secondary truncate">
                      {cpmi?.kelas || 'Kelas A'}
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="font-semibold text-sm text-light-text-main dark:text-dark-text-main truncate">
                    {title}
                  </h1>
                  <p className="text-xs text-secondary truncate">
                    {cpmi?.nama?.split(' ')[0] || 'CPMI'}
                  </p>
                </div>
              )}
            </div>
            
            {/* Mobile Title - Only show on mobile when compact */}
            {compact && (
              <div className="min-w-0 flex-1 sm:hidden">
                <h1 className="font-semibold text-sm text-light-text-main dark:text-dark-text-main truncate">
                  {title}
                </h1>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-1.5 flex-shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`${compact ? 'p-1.5' : 'p-2'} rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border transition-all duration-200 hover:scale-105`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={compact ? 14 : 16} className="text-yellow-500" />
            ) : (
              <Moon size={compact ? 14 : 16} className="text-slate-600" />
            )}
          </button>

          {/* Notification Bell */}
          {showNotification && (
            <button className={`relative ${compact ? 'p-1.5' : 'p-2'} rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border transition-all duration-200 hover:scale-105`}>
              <Bell size={compact ? 14 : 16} className="text-light-text-main dark:text-dark-text-main" />
              {unreadCount > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full ${compact ? 'w-3.5 h-3.5 text-[10px]' : 'w-4 h-4 text-xs'} flex items-center justify-center font-medium`}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Status Info Bar */}
      {cpmi.status === 'Piket' && (
        <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Kamu sedang dalam periode <strong>Piket</strong>. Jangan lupa isi laporan harian!
            </p>
          </div>
        </div>
      )}

      {cpmi.status === 'Terbang' && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-lg">✈️</span>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Selamat!</strong> Kamu sudah diberangkatkan ke Taiwan. Semoga sukses!
            </p>
          </div>
        </div>
      )}

      {cpmi.status === 'Izin' && (
        <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <p className="text-sm text-purple-800 dark:text-purple-200">
              Kamu sedang dalam status <strong>Izin</strong>. Segera kembali ke pelatihan!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainHeader;