import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoHorizontal from '../assets/logohorizontal.png';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [connectionSpeed, setConnectionSpeed] = useState('fast');

  // Detect connection speed on mount
  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const effectiveType = connection.effectiveType;
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        setConnectionSpeed('slow');
      } else if (effectiveType === '3g') {
        setConnectionSpeed('medium');
      } else {
        setConnectionSpeed('fast');
      }
    }
  }, []);

  // Progress animation
  useEffect(() => {
    const duration = connectionSpeed === 'slow' ? 4000 : connectionSpeed === 'medium' ? 2500 : 1500;
    const interval = duration / 100;
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onComplete(), 500);
          }, 300);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, [connectionSpeed, onComplete]);

  const fingerPrintVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const loaderVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.2),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.2),transparent_50%)]" />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 relative z-10"
          >
            <img 
              src={logoHorizontal} 
              alt="LPK Bahana Mega Prestasi" 
              className="h-16 w-auto object-contain filter drop-shadow-2xl"
            />
          </motion.div>

          {/* Fingerprint Icon with Animation */}
          <motion.div
            variants={fingerPrintVariants}
            animate="animate"
            className="mb-8 relative z-10"
          >
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-blue-300"
            >
              <path 
                d="M12 2C8.686 2 6 4.686 6 8c0 1.5.5 3 1.5 4.5L12 22l4.5-9.5C17.5 11 18 9.5 18 8c0-3.314-2.686-6-6-6z" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="rgba(147, 197, 253, 0.1)"
              />
              <circle 
                cx="12" 
                cy="8" 
                r="3" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                fill="none"
              />
              <path 
                d="M12 5v6M9.5 6.5l5 5M14.5 6.5l-5 5" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Circular Progress Loader */}
          <div className="relative mb-6">
            <motion.div
              variants={loaderVariants}
              animate="animate"
              className="w-16 h-16 relative"
            >
              {/* Background Circle */}
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="rgba(148, 163, 184, 0.3)"
                  strokeWidth="4"
                  fill="none"
                />
                {/* Progress Circle */}
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                  className="transition-all duration-300 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            
            {/* Progress Percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span 
                key={progress}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-white font-semibold text-sm"
              >
                {progress}%
              </motion.span>
            </div>
          </div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center relative z-10"
          >
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-blue-200 text-sm font-medium tracking-wide"
            >
              Memuat Aplikasi...
            </motion.p>
          </motion.div>

          {/* Scanning Animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent w-full origin-center"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;