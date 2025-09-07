import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, AlertTriangle, Shield, Headphones } from 'lucide-react';
import BackHeader from '../../../layout/BackHeader';
import logoHorizontal from '../../../assets/logohorizontal.png';

const PanggilanDarurat = () => {
  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const emergencyContacts = [
    {
      id: 1,
      title: 'Kantor Pusat',
      subtitle: 'PT. NEW BAHANA MEGA PRESTASI',
      phone: '+62 21 8497 8899',
      icon: '🏢',
      color: 'bg-blue-500',
      available: '24/7'
    },
    {
      id: 2,
      title: 'Hotline Darurat',
      subtitle: 'Bantuan Segera CPMI',
      phone: '+62 21 8497 8899',
      icon: '🚨',
      color: 'bg-red-500',
      available: '24/7'
    },
    {
      id: 3,
      title: 'Support Center',
      subtitle: 'Bantuan Teknis & Informasi',
      phone: '+62 21 8497 8899',
      icon: '💬',
      color: 'bg-green-500',
      available: 'Senin-Jumat 08:00-17:00'
    }
  ];

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body pb-20">
      <BackHeader title="Darurat" />
      
      <div className="p-4 space-y-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-900 dark:text-red-100">
                Layanan Darurat
              </h2>
              <p className="text-red-700 dark:text-red-200 text-sm">
                Hubungi kami kapan saja untuk bantuan segera
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-dark-card rounded-lg p-4 border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-center mb-3">
              <img 
                src={logoHorizontal} 
                alt="LPK Bahana Mega Prestasi" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-light-text-main dark:text-dark-text-main mb-1">
                PT. NEW BAHANA MEGA PRESTASI
              </h3>
              <p className="text-sm text-secondary">
                Siap melayani CPMI Taiwan 24/7
              </p>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
            Kontak Darurat
          </h3>
          
          {emergencyContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="card p-4 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{contact.icon}</div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-light-text-main dark:text-dark-text-main">
                    {contact.title}
                  </h4>
                  <p className="text-sm text-secondary mb-1">
                    {contact.subtitle}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-secondary">
                    <Clock size={12} />
                    <span>{contact.available}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleCall(contact.phone)}
                  className={`${contact.color} hover:opacity-90 text-white p-3 rounded-full transition-all duration-200 active:scale-95`}
                >
                  <Phone size={20} />
                </button>
              </div>
              
              <div className="mt-3 pt-3 border-t border-light-border dark:border-dark-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-light-text-main dark:text-dark-text-main">
                    {contact.phone}
                  </span>
                  <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full">
                    Aktif
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Office Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="text-blue-600 dark:text-blue-400" size={24} />
            <h3 className="text-lg font-semibold text-light-text-main dark:text-dark-text-main">
              Alamat Kantor Pusat
            </h3>
          </div>
          
          <div className="bg-light-border dark:bg-dark-border rounded-lg p-4">
            <div className="space-y-2">
              <p className="font-semibold text-light-text-main dark:text-dark-text-main">
                PT. NEW BAHANA MEGA PRESTASI
              </p>
              <p className="text-secondary text-sm leading-relaxed">
                Jln. Raya Kodau No. 42, Jati Asih, Jati Mekar,<br />
                Kota Bekasi, Jawa Barat – INDONESIA
              </p>
              <div className="flex items-center space-x-2 mt-3">
                <Phone size={16} className="text-blue-600 dark:text-blue-400" />
                <span className="font-mono text-sm text-light-text-main dark:text-dark-text-main">
                  +62 21 8497 8899
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emergency Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="card p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-start space-x-3">
            <Shield className="text-blue-600 dark:text-blue-400 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Tips Panggilan Darurat
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Tetap tenang dan jelaskan situasi dengan jelas</li>
                <li>• Berikan informasi lokasi dan identitas diri</li>
                <li>• Simpan nomor darurat di kontak telepon</li>
                <li>• Hubungi segera jika mengalami masalah serius</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-2 gap-3"
        >
          <button 
            onClick={() => handleCall('+62 21 8497 8899')}
            className="card p-4 text-center hover:shadow-md transition-all duration-200 bg-gradient-to-r from-red-500 to-red-600 text-white"
          >
            <Phone size={24} className="mx-auto mb-2" />
            <p className="text-sm font-medium">Panggil Sekarang</p>
          </button>
          
          <button 
            onClick={() => alert('Fitur dalam pengembangan')}
            className="card p-4 text-center hover:shadow-md transition-all duration-200"
          >
            <Headphones size={24} className="text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
              Live Chat
            </p>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PanggilanDarurat;