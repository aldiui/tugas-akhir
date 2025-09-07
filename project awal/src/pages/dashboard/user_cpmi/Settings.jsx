import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Bell, 
  MapPin, 
  LogOut, 
  ChevronRight, 
  Info,
  Moon,
  Sun,
  HelpCircle,
  BookOpen,
  Shield
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';
import NavBottom from '../../../layout/NavBottom';
import CacheQuickAction from '../../../components/CacheQuickAction';
import { useTheme } from '../../../context/ThemeContext';
import { useCPMI } from '../../../context/CPMIContext';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { cpmi } = useCPMI();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Quick actions untuk CPMI
  const quickActions = [
    {
      id: 'profile',
      title: 'Profile',
      description: 'Edit profil dan ubah password',
      icon: User,
      path: '/dashboard/cpmi/profile-detail',
      color: 'blue'
    },
    {
      id: 'notification',
      title: 'Notification',
      description: 'Pengaturan notifikasi dan alert',
      icon: Bell,
      path: '/dashboard/cpmi/notification-settings',
      color: 'green'
    },
    {
      id: 'permissions',
      title: 'Pengaturan Izin',
      description: 'Kelola izin aplikasi browser',
      icon: Shield,
      path: '/dashboard/cpmi/permission-settings',
      color: 'red'
    }
  ];

  // Help actions untuk CPMI
  const helpActions = [
    {
      id: 'faq',
      title: 'FAQ',
      description: 'Pertanyaan yang sering diajukan',
      icon: HelpCircle,
      path: '/dashboard/cpmi/faq',
      color: 'orange'
    },
    {
      id: 'guide',
      title: 'Panduan Penggunaan',
      description: 'Tutorial menggunakan sistem',
      icon: BookOpen,
      path: '/dashboard/cpmi/user-guide',
      color: 'indigo'
    }
  ];

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Simulate logout process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clear authentication
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('demoStatus');
    localStorage.removeItem('selectedCPMI');
    
    // Navigate to login
    navigate('/login');
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
      red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif':
        return 'text-green-600 dark:text-green-400';
      case 'Piket':
        return 'text-blue-600 dark:text-blue-400';
      case 'Terbang':
        return 'text-purple-600 dark:text-purple-400';
      case 'Izin':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Tidak Aktif':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Settings" />
      
      <div className="p-4 pt-5 pb-24">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border mb-6"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-light-text-main dark:text-dark-text-main truncate">
                {cpmi.nama}
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary truncate">
                {cpmi.kelas} • NIK: {cpmi.nik}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className={`text-sm font-bold ${getStatusColor(cpmi.status)}`}>
                {cpmi.status}
              </p>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Status
              </p>
            </div>
          </div>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <button
            onClick={toggleTheme}
            className="w-full bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border hover:bg-light-body dark:hover:bg-dark-body transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 text-left">
                <h5 className="font-medium text-light-text-main dark:text-dark-text-main group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </h5>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {isDarkMode ? 'Beralih ke tema terang' : 'Beralih ke tema gelap'}
                </p>
              </div>
              <div className={`w-12 h-6 ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'} rounded-full relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h4 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4">
            Aksi Cepat
          </h4>
          
          <CacheQuickAction />
          <div className="space-y-3 mt-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (index + 4) }}
                  onClick={() => navigate(action.path)}
                  className="w-full bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border hover:bg-light-body dark:hover:bg-dark-body transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${getColorClasses(action.color)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <h5 className="font-medium text-light-text-main dark:text-dark-text-main group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {action.title}
                      </h5>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {action.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Help Center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <h4 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4">
            Pusat Bantuan
          </h4>
          
          <div className="space-y-3">
            {helpActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (index + 8) }}
                  onClick={() => navigate(action.path)}
                  className="w-full bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border hover:bg-light-body dark:hover:bg-dark-body transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${getColorClasses(action.color)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <h5 className="font-medium text-light-text-main dark:text-dark-text-main group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {action.title}
                      </h5>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {action.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gray-100 dark:bg-gray-900/30 rounded-lg">
              <Info className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <h4 className="font-semibold text-light-text-main dark:text-dark-text-main">
              Informasi Sistem
            </h4>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-light-text-secondary dark:text-dark-text-secondary">Versi Aplikasi</span>
              <span className="text-light-text-main dark:text-dark-text-main font-medium">v1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-light-text-secondary dark:text-dark-text-secondary">Role</span>
              <span className="text-light-text-main dark:text-dark-text-main font-medium">CPMI</span>
            </div>
            <div className="flex justify-between">
              <span className="text-light-text-secondary dark:text-dark-text-secondary">Status</span>
              <span className={`font-medium ${getStatusColor(cpmi.status)}`}>{cpmi.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-light-text-secondary dark:text-dark-text-secondary">Kelas</span>
              <span className="text-light-text-main dark:text-dark-text-main font-medium">{cpmi.kelas}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-light-text-secondary dark:text-dark-text-secondary">Last Login</span>
              <span className="text-light-text-main dark:text-dark-text-main font-medium">
                {new Date().toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center space-x-3 py-4 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoggingOut ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <LogOut className="w-5 h-5" />
          )}
          <span className="font-medium">
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </span>
        </motion.button>
      </div>
      
      <NavBottom />
    </div>
  );
};

export default Settings;