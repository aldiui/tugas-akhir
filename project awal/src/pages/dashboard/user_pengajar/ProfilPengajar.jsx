import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen,
  Camera,
  Save,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Smartphone,
  GraduationCap,
  Briefcase,
  Users,
  Star
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';

const ProfilPengajar = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profil');

  // Dummy data profil pengajar
  const [profilData, setProfilData] = useState({
    nama: 'Budi Hartono, S.Pd',
    email: 'budi.hartono@lpkbahanamega.com',
    telepon: '+62 812-3456-7890',
    alamat: 'Jl. Merdeka No. 123, Jakarta Selatan',
    tanggalLahir: '1985-03-15',
    jenisKelamin: 'Laki-laki',
    pendidikan: 'S1 Pendidikan Bahasa Mandarin',
    pengalaman: '8 tahun',
    spesialisasi: 'Bahasa Mandarin, Budaya Taiwan',
    nip: 'PGJ001',
    tanggalBergabung: '2020-01-15',
    status: 'Aktif',
    avatar: null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    chatNotifications: true,
    reportNotifications: true
  });

  // Statistik pengajar
  const statistik = {
    totalCPMI: 25,
    cpmiAktif: 18,
    cpmiPiket: 4,
    cpmiTerbang: 3,
    ratingRataRata: 4.8,
    totalPelajaran: 156,
    jamMengajar: 312
  };

  const handleSaveProfile = () => {
    // Dummy save functionality
    setIsEditing(false);
    // In real app, this would save to backend
  };

  const handleChangePassword = () => {
    // Dummy change password functionality
    if (passwordData.newPassword === passwordData.confirmPassword) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      // Show success message
    }
  };

  const handleNotificationChange = (key) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Profil Pengajar" />
      
      <div className="p-4 pt-5 pb-24">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border mb-6"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profilData.nama.charAt(0)}
              </div>
              <button className="absolute -bottom-1 -right-1 p-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-light-text-main dark:text-dark-text-main">
                {profilData.nama}
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                {profilData.spesialisasi}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  {renderStars(statistik.ratingRataRata)}
                  <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary ml-1">
                    {statistik.ratingRataRata}
                  </span>
                </div>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                  {profilData.status}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-light-body dark:bg-dark-body rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{statistik.totalCPMI}</div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Total CPMI</div>
            </div>
            <div className="text-center p-3 bg-light-body dark:bg-dark-body rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{statistik.totalPelajaran}</div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Pelajaran</div>
            </div>
            <div className="text-center p-3 bg-light-body dark:bg-dark-body rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{statistik.jamMengajar}</div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Jam Mengajar</div>
            </div>
            <div className="text-center p-3 bg-light-body dark:bg-dark-body rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{statistik.ratingRataRata}</div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border mb-6"
        >
          <div className="flex border-b border-light-border dark:border-dark-border">
            {[
              { id: 'profil', label: 'Profil', icon: User },
              { id: 'keamanan', label: 'Keamanan', icon: Shield },
              { id: 'notifikasi', label: 'Notifikasi', icon: Bell }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400'
                      : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-main dark:hover:text-dark-text-main'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {/* Profil Tab */}
            {activeTab === 'profil' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                      <input
                        type="text"
                        value={profilData.nama}
                        onChange={(e) => setProfilData({...profilData, nama: e.target.value})}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                      <input
                        type="email"
                        value={profilData.email}
                        onChange={(e) => setProfilData({...profilData, email: e.target.value})}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                      Telepon
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                      <input
                        type="tel"
                        value={profilData.telepon}
                        onChange={(e) => setProfilData({...profilData, telepon: e.target.value})}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                      Tanggal Lahir
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                      <input
                        type="date"
                        value={profilData.tanggalLahir}
                        onChange={(e) => setProfilData({...profilData, tanggalLahir: e.target.value})}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                      Pendidikan
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                      <input
                        type="text"
                        value={profilData.pendidikan}
                        onChange={(e) => setProfilData({...profilData, pendidikan: e.target.value})}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                      Pengalaman
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                      <input
                        type="text"
                        value={profilData.pengalaman}
                        onChange={(e) => setProfilData({...profilData, pengalaman: e.target.value})}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                    Alamat
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                    <textarea
                      value={profilData.alamat}
                      onChange={(e) => setProfilData({...profilData, alamat: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 resize-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                    Spesialisasi
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                    <input
                      type="text"
                      value={profilData.spesialisasi}
                      onChange={(e) => setProfilData({...profilData, spesialisasi: e.target.value})}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-main dark:hover:text-dark-text-main transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Keamanan Tab */}
            {activeTab === 'keamanan' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4">
                    Ubah Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Password Saat Ini
                      </label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className="w-full pl-10 pr-12 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-main dark:hover:text-dark-text-main"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Password Baru
                      </label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Konfirmasi Password Baru
                      </label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-body dark:bg-dark-body text-light-text-main dark:text-dark-text-main focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleChangePassword}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Ubah Password
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifikasi Tab */}
            {activeTab === 'notifikasi' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4">
                    Pengaturan Notifikasi
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Notifikasi Email', icon: Mail },
                      { key: 'pushNotifications', label: 'Notifikasi Push', icon: Smartphone },
                      { key: 'smsNotifications', label: 'Notifikasi SMS', icon: Phone },
                      { key: 'chatNotifications', label: 'Notifikasi Chat', icon: Users },
                      { key: 'reportNotifications', label: 'Notifikasi Laporan', icon: BookOpen }
                    ].map((setting) => {
                      const Icon = setting.icon;
                      return (
                        <div key={setting.key} className="flex items-center justify-between p-4 bg-light-body dark:bg-dark-body rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                            <span className="font-medium text-light-text-main dark:text-dark-text-main">
                              {setting.label}
                            </span>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(setting.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notificationSettings[setting.key]
                                ? 'bg-green-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notificationSettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilPengajar;