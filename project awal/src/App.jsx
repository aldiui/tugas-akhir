import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CPMIProvider } from './context/CPMIContext';
import NavBottom from './layout/NavBottom';

import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
// CPMI Components
import Home from './pages/dashboard/user_cpmi/Home';
import Jadwal from './pages/dashboard/user_cpmi/Jadwal';
import JadwalDetail from './pages/dashboard/user_cpmi/JadwalDetail';
import Pelajaran from './pages/dashboard/user_cpmi/Pelajaran';
import Absensi from './pages/dashboard/user_cpmi/Absensi';
import AbsensiDetail from './pages/dashboard/user_cpmi/AbsensiDetail';
import Chat from './pages/dashboard/user_cpmi/Chat';
import ChatDetail from './pages/dashboard/user_cpmi/ChatDetail';
import PanggilanDarurat from './pages/dashboard/user_cpmi/PanggilanDarurat';

import PiketLaporan from './pages/dashboard/user_cpmi/PiketLaporan';
import TambahLaporan from './pages/dashboard/user_cpmi/TambahLaporan';
import Notifikasi from './pages/dashboard/user_cpmi/Notifikasi';
import PermissionSettings from './pages/dashboard/user_cpmi/PermissionSettings';
import Settings from './pages/dashboard/user_cpmi/Settings';
import ProfileDetail from './pages/dashboard/user_cpmi/ProfileDetail';
import NotificationSettings from './pages/dashboard/user_cpmi/NotificationSettings';
import RiwayatAbsensi from './pages/dashboard/user_cpmi/RiwayatAbsensi';

// Pengajar Components
import HomePengajar from './pages/dashboard/user_pengajar/Home';
import JadwalPengajar from './pages/dashboard/user_pengajar/JadwalPengajar';
import ChatPengajar from './pages/dashboard/user_pengajar/ChatPengajar';
import ChatDetailPengajar from './pages/dashboard/user_pengajar/ChatDetail';
import BroadcastPengajar from './pages/dashboard/user_pengajar/BroadcastPengajar';
import BroadcastSelectPengajar from './pages/dashboard/user_pengajar/BroadcastSelectPengajar';
import ProfilPengajar from './pages/dashboard/user_pengajar/ProfilPengajar';
import SettingsPengajar from './pages/dashboard/user_pengajar/Settings';
import ProfileDetailPengajar from './pages/dashboard/user_pengajar/ProfileDetail';
import PermissionSettingsPengajar from './pages/dashboard/user_pengajar/PermissionSettings';
import LocationSettingsPengajar from './pages/dashboard/user_pengajar/LocationSettings';
import LaporanPiketPengajar from './pages/dashboard/user_pengajar/LaporanPiketPengajar';
import DetailPiketPengajar from './pages/dashboard/user_pengajar/DetailPiketPengajar';
import DetailTanggalPiket from './pages/dashboard/user_pengajar/DetailTanggalPiket';
import LaporanMenu from './pages/dashboard/user_pengajar/LaporanMenu';
import LaporanAbsenPengajar from './pages/dashboard/user_pengajar/LaporanAbsenPengajar';
import DetailAbsensiCPMI from './pages/dashboard/user_pengajar/DetailAbsensiCPMI';
import EditJadwalPengajar from './pages/dashboard/user_pengajar/EditJadwalPengajar';
import CPMIManagement from './pages/dashboard/user_pengajar/CPMIManagement';
import InformasiPengajar from './pages/dashboard/user_pengajar/Informasi';
import InformasiDetail from './pages/dashboard/user_pengajar/InformasiDetail';
import InformasiEdit from './pages/dashboard/user_pengajar/InformasiEdit';
import Activity from './pages/dashboard/user_pengajar/Activity';

// Admin Components
import HomeAdmin from './pages/dashboard/user_admin/Home';
import SettingsAdmin from './pages/dashboard/user_admin/SettingsAdmin';
import ChatAdmin from './pages/dashboard/user_admin/chatadmin';
import ChatDetailAdmin from './pages/dashboard/user_admin/ChatDetailAdmin';
import BroadcastAdmin from './pages/dashboard/user_admin/BroadcastAdmin';
import ProfileDetailAdmin from './pages/dashboard/user_admin/ProfileDetailAdmin';
import LocationSettingsAdmin from './pages/dashboard/user_admin/LocationSettingsAdmin';
import PermissionSettingsAdmin from './pages/dashboard/user_admin/PermissionSettingsAdmin';
import LaporanMenuAdmin from './pages/dashboard/user_admin/laporanmenuadmin';
import LaporanAbsenAdmin from './pages/dashboard/user_admin/laporanabsenadmin';
import LaporanPiketAdmin from './pages/dashboard/user_admin/laporanpiketadmin';
import DetailPiketAdmin from './pages/dashboard/user_admin/detailpiketadmin';
import DetailTanggalPiketAdmin from './pages/dashboard/user_admin/detailtanggalpiketadmin';
import DetailAbsensiCPMIAdmin from './pages/dashboard/user_admin/DetailAbsensiCPMIAdmin';
import RiwayatAbsensiAdmin from './pages/dashboard/user_admin/RiwayatAbsensiAdmin';
import CPMIManagementAdmin from './pages/dashboard/user_admin/CPMIManagementAdmin';
import CPMIDetailAdmin from './pages/dashboard/user_admin/CPMIDetailAdmin';
import CPMIEditAdmin from './pages/dashboard/user_admin/CPMIEditAdmin';
import InformasiAdmin from './pages/dashboard/user_admin/InformasiAdmin';
import InformasiDetailAdmin from './pages/dashboard/user_admin/InformasiDetailAdmin';
import InformasiEditAdmin from './pages/dashboard/user_admin/InformasiEditAdmin';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Role-based Dashboard Route Component
const DashboardRoute = () => {
  const userRole = localStorage.getItem('userRole');
  
  switch(userRole) {
    case 'admin':
      return <HomeAdmin />;
    case 'pengajar':
      return <HomePengajar />;
    case 'cpmi':
    default:
      return <Home key={localStorage.getItem('demoStatus') || 'default'} />;
  }
};

// Public Route Component (redirect if already authenticated)
const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <CPMIProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <ScrollToTop />
          <div className="App min-h-screen bg-light-body dark:bg-dark-body transition-colors duration-200">
            <Routes>
              {/* Public Routes */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardRoute />
                  </ProtectedRoute>
                } 
              />
              
              {/* Pengajar Routes */}
              <Route 
                path="/dashboard/pengajar" 
                element={
                  <ProtectedRoute>
                    <HomePengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/jadwal" 
                element={
                  <ProtectedRoute>
                    <JadwalPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/jadwal/edit" 
                element={
                  <ProtectedRoute>
                    <EditJadwalPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/chat" 
                element={
                  <ProtectedRoute>
                    <ChatPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/chat/:id" 
                element={
                  <ProtectedRoute>
                    <ChatDetailPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/broadcast" 
                element={
                  <ProtectedRoute>
                    <BroadcastPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/broadcast/select" 
                element={
                  <ProtectedRoute>
                    <BroadcastSelectPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/cpmi-management" 
                element={
                  <ProtectedRoute>
                    <CPMIManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/informasi" 
                element={
                  <ProtectedRoute>
                    <InformasiPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/informasi/detail/:id" 
                element={
                  <ProtectedRoute>
                    <InformasiDetail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/informasi/edit" 
                element={
                  <ProtectedRoute>
                    <InformasiEdit />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/activity" 
                element={
                  <ProtectedRoute>
                    <Activity />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/profil" 
                element={
                  <ProtectedRoute>
                    <ProfilPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/settings" 
                element={
                  <ProtectedRoute>
                    <SettingsPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/profile-detail" 
                element={
                  <ProtectedRoute>
                    <ProfileDetailPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/notification-settings" 
                element={
                  <ProtectedRoute>
                    <PermissionSettingsPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/location-settings" 
                element={
                  <ProtectedRoute>
                    <LocationSettingsPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/laporan" 
                element={
                  <ProtectedRoute>
                    <LaporanMenu />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/laporan-piket" 
                element={
                  <ProtectedRoute>
                    <LaporanPiketPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/laporan-piket/detail/:nama" 
                element={
                  <ProtectedRoute>
                    <DetailPiketPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/laporan-piket/detail/:nama/tanggal/:tanggal" 
                element={
                  <ProtectedRoute>
                    <DetailTanggalPiket />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/laporan-absen" 
                element={
                  <ProtectedRoute>
                    <LaporanAbsenPengajar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/pengajar/laporan-absen/detail/:nama" 
                element={
                  <ProtectedRoute>
                    <DetailAbsensiCPMI />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route 
                path="/dashboard/admin" 
                element={
                  <ProtectedRoute>
                    <HomeAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/home" 
                element={
                  <ProtectedRoute>
                    <HomeAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/settings" 
                element={
                  <ProtectedRoute>
                    <SettingsAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/chat" 
                element={
                  <ProtectedRoute>
                    <ChatAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/chat/:id" 
                element={
                  <ProtectedRoute>
                    <ChatDetailAdmin />
                  </ProtectedRoute>
                } 
              />
              {/* Admin Management Routes */}
              <Route 
                path="/dashboard/admin/manage/cpmi" 
                element={
                  <ProtectedRoute>
                    <HomeAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/manage/cpmi/add" 
                element={
                  <ProtectedRoute>
                    <HomeAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/manage/pengajar" 
                element={
                  <ProtectedRoute>
                    <HomeAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/reports/daily" 
                element={
                  <ProtectedRoute>
                    <HomeAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/broadcast" 
                element={
                  <ProtectedRoute>
                    <BroadcastAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/manajemen-cpmi" 
                element={
                  <ProtectedRoute>
                    <CPMIManagementAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/cpmi-management" 
                element={
                  <ProtectedRoute>
                    <CPMIManagementAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/cpmi-detail" 
                element={
                  <ProtectedRoute>
                    <CPMIDetailAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/cpmi-edit" 
                element={
                  <ProtectedRoute>
                    <CPMIEditAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/laporan" 
                element={
                  <ProtectedRoute>
                    <HomeAdmin />
                  </ProtectedRoute>
                } 
              />
              {/* Admin Settings Sub-routes */}
              <Route 
                path="/dashboard/admin/settings/users" 
                element={
                  <ProtectedRoute>
                    <SettingsAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/settings/backup" 
                element={
                  <ProtectedRoute>
                    <SettingsAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/settings/logs" 
                element={
                  <ProtectedRoute>
                    <SettingsAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/profile-detail" 
                element={
                  <ProtectedRoute>
                    <ProfileDetailAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/location-settings" 
                element={
                  <ProtectedRoute>
                    <LocationSettingsAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/permission-settings" 
                element={
                  <ProtectedRoute>
                    <PermissionSettingsAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/laporan-menu" 
                element={
                  <ProtectedRoute>
                    <LaporanMenuAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/laporan-absen" 
                element={
                  <ProtectedRoute>
                    <LaporanAbsenAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/laporan-piket" 
                element={
                  <ProtectedRoute>
                    <LaporanPiketAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/laporan-piket/detail/:nama" 
                element={
                  <ProtectedRoute>
                    <DetailPiketAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/laporan-piket/detail/:nama/tanggal/:tanggal" 
                element={
                  <ProtectedRoute>
                    <DetailTanggalPiketAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/detail-tanggal-piket/:tanggal" 
                element={
                  <ProtectedRoute>
                    <DetailTanggalPiketAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/detail-absensi/:id" 
                element={
                  <ProtectedRoute>
                    <DetailAbsensiCPMIAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/riwayat-absensi/:id" 
                element={
                  <ProtectedRoute>
                    <RiwayatAbsensiAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/informasi" 
                element={
                  <ProtectedRoute>
                    <InformasiAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/informasi/detail/:id" 
                element={
                  <ProtectedRoute>
                    <InformasiDetailAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/admin/informasi/edit/:id" 
                element={
                  <ProtectedRoute>
                    <InformasiEditAdmin />
                  </ProtectedRoute>
                } 
              />

              
              {/* CPMI Routes */}
              <Route 
                path="/dashboard/cpmi/home" 
                element={
                  <ProtectedRoute>
                    <Home key={localStorage.getItem('demoStatus') || 'default'} />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/jadwal" 
                element={
                  <ProtectedRoute>
                    <Jadwal />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/jadwal/detail" 
                element={
                  <ProtectedRoute>
                    <JadwalDetail />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/pelajaran" 
                element={
                  <ProtectedRoute>
                    <Pelajaran />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/absensi" 
                element={
                  <ProtectedRoute>
                    <Absensi />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/absensi/detail" 
                element={
                  <ProtectedRoute>
                    <AbsensiDetail />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/chat" 
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/chat/:id" 
                element={
                  <ProtectedRoute>
                    <ChatDetail />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/panggilan-darurat" 
                element={
                  <ProtectedRoute>
                    <PanggilanDarurat />
                  </ProtectedRoute>
                } 
              />
              

              
              <Route 
                path="/dashboard/cpmi/piket-laporan" 
                element={
                  <ProtectedRoute>
                    <PiketLaporan />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/tambah-laporan" 
                element={
                  <ProtectedRoute>
                    <TambahLaporan />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/notifikasi" 
                element={
                  <ProtectedRoute>
                    <Notifikasi />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/permission-settings" 
                element={
                  <ProtectedRoute>
                    <PermissionSettings />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/profile-detail" 
                element={
                  <ProtectedRoute>
                    <ProfileDetail />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/notification-settings" 
                element={
                  <ProtectedRoute>
                    <NotificationSettings />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/cpmi/riwayat-absensi" 
                element={
                  <ProtectedRoute>
                    <RiwayatAbsensi />
                  </ProtectedRoute>
                } 
              />
              
              {/* Default Redirects */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            
            {/* Bottom Navigation - Only show on protected routes */}
            <NavBottom />
            

          </div>
        </Router>
      </CPMIProvider>
    </ThemeProvider>
  );
}

export default App;