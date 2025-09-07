import React from 'react';
import PopupModal from './PopupModal';
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const InfoPopup = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'info', // info, success, warning, error
  showIcon = true,
  actionButton = null
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />;
      case 'error':
        return <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />;
      default:
        return <Info className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-700 dark:text-green-300';
      case 'warning':
        return 'text-yellow-700 dark:text-yellow-300';
      case 'error':
        return 'text-red-700 dark:text-red-300';
      default:
        return 'text-blue-700 dark:text-blue-300';
    }
  };

  return (
    <PopupModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      type={type}
    >
      <div className="text-center space-y-3">
        {/* Icon */}
        {showIcon && (
          <div className="flex justify-center">
            {getIcon()}
          </div>
        )}

        {/* Message */}
        <div>
          <p className="text-sm text-light-text-main dark:text-dark-text-main leading-relaxed">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          {actionButton ? (
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="flex-1 bg-light-bg dark:bg-dark-bg hover:bg-light-border dark:hover:bg-dark-border text-light-text-main dark:text-dark-text-main font-medium py-2 px-3 rounded-lg text-sm transition-colors"
              >
                Batal
              </button>
              {actionButton}
            </div>
          ) : (
            <button
              onClick={onClose}
              className={`w-full font-medium py-2 px-3 rounded-lg text-sm transition-colors ${
                type === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' :
                type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700 text-white' :
                type === 'error' ? 'bg-red-600 hover:bg-red-700 text-white' :
                'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </PopupModal>
  );
};

export default InfoPopup;