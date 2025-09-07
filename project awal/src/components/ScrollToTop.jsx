import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll ke atas setiap kali route berubah
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Langsung tanpa animasi untuk performa lebih baik
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;