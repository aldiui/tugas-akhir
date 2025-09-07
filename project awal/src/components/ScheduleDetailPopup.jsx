import React from 'react';
import PopupModal from './PopupModal';
import { Clock, BookOpen, Info } from 'lucide-react';

const ScheduleDetailPopup = ({ isOpen, onClose, scheduleData }) => {
  if (!scheduleData) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Berlangsung':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'Akan Datang':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'Selesai':
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <PopupModal
      isOpen={isOpen}
      onClose={onClose}
      title="Detail Jadwal"
      size="sm"
      type="default"
    >
      <div className="space-y-3">
        {/* Status Badge */}
        <div className="flex justify-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            scheduleData?.status === 'Berlangsung' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            scheduleData?.status === 'Akan Datang' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
          }`}>
            {scheduleData?.status || 'Tidak Diketahui'}
          </span>
        </div>

        {/* Schedule Details */}
        <div className="space-y-3">
          {/* Subject */}
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Mata Pelajaran</p>
              <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main truncate">
                {scheduleData?.subject || '-'}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Waktu</p>
              <p className="text-sm font-medium text-light-text-main dark:text-dark-text-main">
                {scheduleData?.time || '-'}
              </p>
            </div>
          </div>



          {/* Material */}
          <div className="flex items-start space-x-2">
            <Info className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Materi</p>
              <p className="text-sm text-light-text-main dark:text-dark-text-main leading-relaxed">
                {scheduleData?.material || '-'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </PopupModal>
  );
};

export default ScheduleDetailPopup;