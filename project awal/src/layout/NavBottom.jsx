import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Clock, 
  MessageCircle, 
  User,
  ClipboardList,
  Bell,
  Settings,
  Users,
  FileText,
  BarChart3,
  Info
} from 'lucide-react';
import { useCPMI } from '../context/CPMIContext';

const NavBottom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cpmi } = useCPMI();
  const userRole = localStorage.getItem('userRole') || 'cpmi';

  // Navigation items based on user role
  const getNavItems = () => {
    if (userRole === 'admin') {
      return [
        {
          id: 'home',
          label: 'Beranda',
          icon: Home,
          path: '/dashboard/admin',
          show: true
        },
        {
          id: 'manajemen',
          label: 'Kelola',
          icon: Users,
          path: '/dashboard/admin/manajemen-cpmi',
          show: true
        },
        {
          id: 'laporan',
          label: 'Laporan',
          icon: BarChart3,
          path: '/dashboard/admin/laporan-menu',
          show: true
        },
        {
          id: 'chat',
          label: 'Chat',
          icon: MessageCircle,
          path: '/dashboard/admin/chat',
          show: true
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: Settings,
          path: '/dashboard/admin/settings',
          show: true
        }
      ];
    }
    
    if (userRole === 'pengajar') {
      return [
        {
          id: 'home',
          label: 'Beranda',
          icon: Home,
          path: '/dashboard/pengajar',
          show: true
        },
        {
          id: 'jadwal',
          label: 'Jadwal',
          icon: Calendar,
          path: '/dashboard/pengajar/jadwal',
          show: true
        },
        {
          id: 'laporan',
          label: 'Laporan',
          icon: FileText,
          path: '/dashboard/pengajar/laporan',
          show: true
        },
        {
          id: 'chat',
          label: 'Chat',
          icon: MessageCircle,
          path: '/dashboard/pengajar/chat',
          show: true
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: Settings,
          path: '/dashboard/pengajar/settings',
          show: true
        }
      ];
    }
    

    
    // Default CPMI navigation
    const baseItems = [
      {
        id: 'home',
        label: 'Beranda',
        icon: Home,
        path: '/dashboard/cpmi/home',
        show: true
      },
      {
        id: 'absensi',
        label: cpmi.status === 'Piket' ? 'Laporan' : 'Absensi',
        icon: cpmi.status === 'Piket' ? ClipboardList : Clock,
        path: cpmi.status === 'Piket' ? '/dashboard/cpmi/piket-laporan' : '/dashboard/cpmi/absensi',
        show: cpmi.status !== 'Terbang' && cpmi.status !== 'Tidak Aktif'
      },
      {
        id: 'chat',
        label: 'Chat',
        icon: MessageCircle,
        path: '/dashboard/cpmi/chat',
        show: cpmi.status !== 'Terbang'
      },
      {
        id: 'info',
        label: 'Info',
        icon: Bell,
        path: '/dashboard/cpmi/notifikasi',
        show: true,
        badge: 3 // Notification count
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        path: '/dashboard/cpmi/settings',
        show: true
      }
    ];

    return baseItems.filter(item => item.show);
  };

  const navItems = getNavItems();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Don't show navigation on login page and chat detail page
  if (location.pathname === '/login' || location.pathname === '/' || location.pathname.includes('/dashboard/cpmi/chat/') || location.pathname.includes('/dashboard/pengajar/chat/') || location.pathname.includes('/dashboard/admin/chat/')) {
    return null;
  }

  // Special message for "Terbang" status
  if (cpmi.status === 'Terbang') {
    return (
      <div className="nav-bottom">
        <div className="flex items-center justify-center py-4">
          <div className="text-center">
            <div className="text-2xl mb-2">✈️</div>
            <p className="text-sm text-secondary">
              Selamat! Kamu sudah diberangkatkan ke Taiwan
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nav-bottom safe-area-bottom">
      <div className="grid grid-cols-5 gap-1">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`nav-item py-2 px-1 transition-all duration-200 ${
                active ? 'active' : 'hover:text-light-text-main dark:hover:text-dark-text-main'
              }`}
            >
              <div className="relative">
                <Icon 
                  size={20} 
                  className={`mx-auto mb-1 ${
                    active ? 'text-light-button-primary dark:text-dark-button-primary' : ''
                  }`} 
                />
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </div>
                )}
              </div>
              <span className={`text-xs font-medium ${
                active ? 'text-light-button-primary dark:text-dark-button-primary' : ''
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      

    </div>
  );
};

export default NavBottom;