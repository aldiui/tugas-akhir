import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, LogIn, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import logoHorizontal from '../assets/logohorizontal.png';
import SplashScreen from '../components/SplashScreen';

const Login = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSplash, setShowSplash] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    navigate('/dashboard');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple validation
    if (!formData.username || !formData.password) {
      setError('Username dan password harus diisi');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Dummy validation - accept any username/password for demo
      if (formData.username.length >= 3 && formData.password.length >= 3) {
        // Store login state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'cpmi');
        localStorage.setItem('username', formData.username);
        // Set default status for manual login
        localStorage.setItem('demoStatus', 'Aktif');
        
        // Trigger status update event
        window.dispatchEvent(new Event('statusUpdate'));
        
        // Show splash screen before navigating to dashboard
        setIsLoading(false);
        setShowSplash(true);
      } else {
        setError('Username dan password minimal 3 karakter');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleDemoLogin = (role, username, status = null) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
    if (status) {
      localStorage.setItem('demoStatus', status);
    }
    
    // Trigger status update event
    window.dispatchEvent(new Event('statusUpdate'));
    
    // Navigate based on role
    setIsLoading(false);
    if (role === 'cpmi') {
      setShowSplash(true);
    } else if (role === 'pengajar') {
      navigate('/dashboard/pengajar');
    } else if (role === 'admin') {
      navigate('/dashboard/admin');
    }
  };

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-dark-body dark:to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      {/* Theme Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onClick={toggleTheme}
        className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/30"
      >
        {isDark ? (
          <Sun size={18} className="text-yellow-300" />
        ) : (
          <Moon size={18} className="text-white/80" />
        )}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-3 flex items-center justify-center"
          >
            <img 
              src={logoHorizontal} 
              alt="LPK Bahana Mega Prestasi" 
              className="h-12 w-auto object-contain filter brightness-0 invert"
            />
          </motion.div>
          <h1 className="text-xl font-bold text-white mb-1">
            CPMI Absensi
          </h1>
          <p className="text-white/80 text-sm">
            LPK Bahana Mega Prestasi
          </p>
          <p className="text-white/60 text-xs mt-1">
            Sistem Absensi & Pelatihan Taiwan
          </p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1.5">
                Username / NIK
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                  placeholder="Masukkan username atau NIK"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                  placeholder="Masukkan password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-2.5 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg"
              >
                <p className="text-sm text-red-200">{error}</p>
              </motion.div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600/80 hover:bg-blue-600 backdrop-blur-sm border border-blue-400/30 text-white font-medium py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Masuk</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-4 space-y-3">
            <p className="text-sm text-white/80 text-center font-medium mb-3">
              Akses Demo Cepat:
            </p>
            
            {/* Demo Buttons Grid */}
            <div className="grid grid-cols-1 gap-2">
              {/* CPMI Aktif Demo */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDemoLogin('cpmi', 'cpmi_aktif', 'Aktif')}
                className="w-full p-2.5 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg hover:bg-green-500/30 transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-200">
                      CPMI Aktif
                    </p>
                    <p className="text-xs text-green-300/80">
                      Absensi & Jadwal
                    </p>
                  </div>
                  <div className="text-green-300">✅</div>
                </div>
              </motion.button>

              {/* CPMI Piket Demo */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDemoLogin('cpmi', 'cpmi_piket', 'Piket')}
                className="w-full p-2.5 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-lg hover:bg-yellow-500/30 transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-200">
                      CPMI Piket
                    </p>
                    <p className="text-xs text-yellow-300/80">
                      Laporan Harian
                    </p>
                  </div>
                  <div className="text-yellow-300">🏠</div>
                </div>
              </motion.button>

              {/* Pengajar Demo */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDemoLogin('pengajar', 'pengajar_demo')}
                className="w-full p-2.5 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-lg hover:bg-blue-500/30 transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-200">
                      Pengajar
                    </p>
                    <p className="text-xs text-blue-300/80">
                      Kelola Kelas
                    </p>
                  </div>
                  <div className="text-blue-300">👨‍🏫</div>
                </div>
              </motion.button>

              {/* Admin Demo */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDemoLogin('admin', 'admin_demo')}
                className="w-full p-2.5 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-lg hover:bg-purple-500/30 transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-200">
                      Admin
                    </p>
                    <p className="text-xs text-purple-300/80">
                      Kelola Sistem
                    </p>
                  </div>
                  <div className="text-purple-300">⚙️</div>
                </div>
              </motion.button>

            </div>

            {/* Manual Login Info */}
            <div className="p-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg mt-3">
              <p className="text-xs text-white/70 text-center">
                Atau login manual (min. 3 karakter)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-4"
        >
          <p className="text-xs text-white/60">
            © 2024 LPK Bahana Mega Prestasi
          </p>
          <p className="text-xs text-white/50 mt-1">
            Sistem Pelatihan CPMI Taiwan
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;