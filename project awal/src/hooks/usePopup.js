import { useState, useCallback } from 'react';

/**
 * Custom hook untuk mengelola state popup modal
 * @param {boolean} initialState - State awal popup (default: false)
 * @returns {object} - Object berisi state dan fungsi untuk mengelola popup
 */
const usePopup = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [popupData, setPopupData] = useState(null);

  // Fungsi untuk membuka popup
  const openPopup = useCallback((data = null) => {
    setPopupData(data);
    setIsOpen(true);
  }, []);

  // Fungsi untuk menutup popup
  const closePopup = useCallback(() => {
    setIsOpen(false);
    // Delay untuk menunggu animasi selesai sebelum clear data
    setTimeout(() => {
      setPopupData(null);
    }, 200);
  }, []);

  // Fungsi untuk toggle popup
  const togglePopup = useCallback((data = null) => {
    if (isOpen) {
      closePopup();
    } else {
      openPopup(data);
    }
  }, [isOpen, openPopup, closePopup]);

  return {
    isOpen,
    popupData,
    openPopup,
    closePopup,
    togglePopup
  };
};

export default usePopup;