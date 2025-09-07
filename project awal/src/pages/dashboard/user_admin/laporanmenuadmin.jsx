import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  UserCheck, 
  BarChart3,
  ChevronRight,
  Users,
  Building
} from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';

const LaporanMenuAdmin = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'absen',
      title: 'Laporan Absensi',
      description: 'Lihat data kehadiran semua CPMI',
      icon: UserCheck,
      color: 'from-blue-500 to-blue-600',
      path: '/dashboard/admin/laporan-absen',
      stats: 'Semua Kelas'
    },
    {
      id: 'piket',
      title: 'Laporan Piket',
      description: 'Lihat aktivitas harian CPMI piket',
      icon: ClipboardList,
      color: 'from-green-500 to-green-600',
      path: '/dashboard/admin/laporan-piket',
      stats: 'Semua CPMI Piket'
    }
  ];

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body">
      <BackHeader title="Laporan" />
      
      <div className="p-4 pt-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-light-text-main dark:text-dark-text-main mb-2">
            Pilih Jenis Laporan
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Kelola dan pantau laporan semua CPMI Taiwan - LPK Bahana Mega Prestasi
          </p>
        </motion.div>

        {/* Menu Cards */}
        <div className="space-y-4">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(item.path)}
                className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                        <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          {item.stats}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border"
        >
          <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main mb-4">
            Ringkasan Hari Ini
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">45</div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Total CPMI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">38</div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Hadir</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">7</div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Piket</div>
            </div>
          </div>
        </motion.div>

        {/* Additional Admin Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Building className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Akses Admin</h3>
          </div>
          <p className="text-purple-100 text-sm mb-4">
            Sebagai admin, Anda memiliki akses penuh untuk melihat laporan dari semua kelas dan pengajar di LPK Bahana Mega Prestasi.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <div>
                  <p className="text-xs text-purple-100">Total Kelas</p>
                  <p className="text-sm font-bold">3 Kelas</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4" />
                <div>
                  <p className="text-xs text-purple-100">Pengajar</p>
                  <p className="text-sm font-bold">5 Pengajar</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LaporanMenuAdmin;