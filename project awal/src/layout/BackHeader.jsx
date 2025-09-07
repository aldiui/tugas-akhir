import React from 'react';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackHeader = ({ 
  title, 
  onBack, 
  showMenu = false, 
  menuItems = [],
  rightAction = null,
  compact = false 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`header safe-area-top sticky top-0 z-50 bg-light-body/95 dark:bg-dark-body/95 backdrop-blur-sm border-b border-light-border/50 dark:border-dark-border/50 ${compact ? 'py-2 pt-4' : 'py-4 pt-6'} min-h-[60px] flex items-center`}>
      <div className="flex items-center justify-between w-full">
        {/* Left Section - Back Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className={`${compact ? 'p-1.5' : 'p-2'} rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border transition-colors flex items-center justify-center`}
            aria-label="Kembali"
          >
            <ArrowLeft size={compact ? 18 : 20} className="text-light-text-main dark:text-dark-text-main" />
          </button>
          
          <div className="flex items-center">
            <h1 className={`font-semibold ${compact ? 'text-base' : 'text-lg'} text-light-text-main dark:text-dark-text-main leading-none`}>
              {title}
            </h1>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Custom Right Action */}
          {rightAction && (
            <div className="flex items-center">
              {rightAction}
            </div>
          )}

          {/* Menu Button */}
          {showMenu && menuItems.length > 0 && (
            <div className="relative">
              <button className={`${compact ? 'p-1.5' : 'p-2'} rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border transition-colors flex items-center justify-center`}>
                <MoreVertical size={compact ? 18 : 20} className="text-light-text-main dark:text-dark-text-main" />
              </button>
              
              {/* Dropdown Menu - This would need state management for show/hide */}
              {/* For now, just the button structure */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackHeader;