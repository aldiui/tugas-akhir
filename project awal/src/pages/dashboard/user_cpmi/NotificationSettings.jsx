import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  BellRing, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Clock, 
  AlertTriangle,
  Save
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';
import NavBottom from '../../../layout/NavBottom';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    // Push Notifications
    pushEnabled: true,
    absensiReminder: true,
    jadwalUpdate: true,
    informasiPenting: true,
    chatMessage: true,
    
    // Sound Settings
    soundEnabled: true,
    vibrationEnabled: true,
    
    // Email Notifications
    emailEnabled: false,
    emailWeeklyReport: false,
    
    // Timing Settings
    quietHoursEnabled: true,
    quietStart: '22:00',
    quietEnd: '06:00',
    
    // Specific Notifications
    lateWarning: true,
    piketReminder: true,
    scheduleChange: true
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTimeChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Saving notification settings:', settings);
    setIsSaving(false);
  };

  const ToggleSwitch = ({ enabled, onToggle, disabled = false }) => (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled
          ? 'bg-blue-500'
          : 'bg-gray-300 dark:bg-gray-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const notificationGroups = [
    {
      title: 'Notifikasi Push',
      icon: Bell,
      items: [
        {
          key: 'pushEnabled',
          label: 'Aktifkan Notifikasi Push',
          description: 'Terima notifikasi langsung di perangkat',
          icon: BellRing
        },
        {
          key: 'absensiReminder',
          label: 'Pengingat Absensi',
          description: 'Ingatkan saat waktu absensi tiba',
          icon: Clock,
          dependent: 'pushEnabled'
        },
        {
          key: 'jadwalUpdate',
          label: 'Update Jadwal',
          description: 'Notifikasi perubahan jadwal pelajaran',
          icon: Calendar,
          dependent: 'pushEnabled'
        },
        {
          key: 'informasiPenting',
          label: 'Informasi Penting',
          description: 'Pengumuman dan informasi dari pengajar',
          icon: AlertTriangle,
          dependent: 'pushEnabled'
        },
        {
          key: 'chatMessage',
          label: 'Pesan Chat',
          description: 'Notifikasi pesan baru dari pengajar',
          icon: MessageSquare,
          dependent: 'pushEnabled'
        }
      ]
    },
    {
      title: 'Pengaturan Suara',
      icon: Volume2,
      items: [
        {
          key: 'soundEnabled',
          label: 'Suara Notifikasi',
          description: 'Putar suara saat ada notifikasi',
          icon: Volume2
        },
        {
          key: 'vibrationEnabled',
          label: 'Getaran',
          description: 'Aktifkan getaran untuk notifikasi',
          icon: Smartphone
        }
      ]
    },
    {
      title: 'Email Notifikasi',
      icon: Mail,
      items: [
        {
          key: 'emailEnabled',
          label: 'Notifikasi Email',
          description: 'Terima notifikasi melalui email',
          icon: Mail
        },
        {
          key: 'emailWeeklyReport',
          label: 'Laporan Mingguan',
          description: 'Ringkasan aktivitas mingguan via email',
          icon: Calendar,
          dependent: 'emailEnabled'
        }
      ]
    }
  ];

  const specificNotifications = [
    {
      key: 'lateWarning',
      label: 'Peringatan Terlambat',
      description: 'Notifikasi jika berpotensi terlambat absensi',
      icon: AlertTriangle
    },
    {
      key: 'piketReminder',
      label: 'Pengingat Piket',
      description: 'Ingatkan untuk mengisi laporan aktivitas piket',
      icon: Clock
    },
    {
      key: 'scheduleChange',
      label: 'Perubahan Jadwal',
      description: 'Notifikasi perubahan mendadak pada jadwal',
      icon: Calendar
    }
  ];

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader 
        title="Pengaturan Notifikasi" 
        rightButton={
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={16} />
            )}
            <span className="text-sm">{isSaving ? 'Menyimpan...' : 'Simpan'}</span>
          </button>
        }
      />
      
      <div className="p-4 pt-5 pb-24">
        {/* Notification Groups */}
        {notificationGroups.map((group, groupIndex) => {
          const GroupIcon = group.icon;
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <GroupIcon size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
                  {group.title}
                </h3>
              </div>
              
              <div className="space-y-3">
                {group.items.map((item, itemIndex) => {
                  const ItemIcon = item.icon;
                  const isDependent = item.dependent && !settings[item.dependent];
                  
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (groupIndex * 0.1) + (itemIndex * 0.05) }}
                      className={`bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border ${
                        isDependent ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <ItemIcon size={18} className="text-gray-600 dark:text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-light-text-main dark:text-dark-text-main">
                              {item.label}
                            </h4>
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          enabled={settings[item.key]}
                          onToggle={() => handleToggle(item.key)}
                          disabled={isDependent}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* Quiet Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <VolumeX size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
              Jam Tenang
            </h3>
          </div>
          
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium text-light-text-main dark:text-dark-text-main">
                  Aktifkan Jam Tenang
                </h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Nonaktifkan notifikasi pada jam tertentu
                </p>
              </div>
              <ToggleSwitch
                enabled={settings.quietHoursEnabled}
                onToggle={() => handleToggle('quietHoursEnabled')}
              />
            </div>
            
            {settings.quietHoursEnabled && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-light-border dark:border-dark-border">
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Mulai
                  </label>
                  <input
                    type="time"
                    value={settings.quietStart}
                    onChange={(e) => handleTimeChange('quietStart', e.target.value)}
                    className="w-full px-3 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text-main dark:text-dark-text-main mb-2">
                    Selesai
                  </label>
                  <input
                    type="time"
                    value={settings.quietEnd}
                    onChange={(e) => handleTimeChange('quietEnd', e.target.value)}
                    className="w-full px-3 py-2 bg-light-body dark:bg-dark-body border border-light-border dark:border-dark-border rounded-lg text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Specific Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <AlertTriangle size={20} className="text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
              Notifikasi Khusus
            </h3>
          </div>
          
          <div className="space-y-3">
            {specificNotifications.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.05) }}
                  className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <ItemIcon size={18} className="text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-light-text-main dark:text-dark-text-main">
                          {item.label}
                        </h4>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings[item.key]}
                      onToggle={() => handleToggle(item.key)}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
        >
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
              <Bell size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Tips Notifikasi
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Aktifkan notifikasi penting seperti pengingat absensi dan informasi dari pengajar agar tidak melewatkan hal-hal penting dalam pelatihan Anda.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <NavBottom />
    </div>
  );
};

export default NotificationSettings;