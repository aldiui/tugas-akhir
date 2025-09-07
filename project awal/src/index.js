import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker untuk optimasi cache browser
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Tampilkan notifikasi update tersedia
                const updateNotification = document.createElement('div');
                updateNotification.innerHTML = `
                  <div style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #3b82f6;
                    color: white;
                    padding: 16px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 9999;
                    max-width: 300px;
                    font-family: system-ui, -apple-system, sans-serif;
                  ">
                    <div style="font-weight: 600; margin-bottom: 8px;">Update Tersedia</div>
                    <div style="font-size: 14px; margin-bottom: 12px;">Versi baru aplikasi sudah siap. Refresh untuk mendapatkan fitur terbaru.</div>
                    <div style="display: flex; gap: 8px;">
                      <button onclick="window.location.reload()" style="
                        background: white;
                        color: #3b82f6;
                        border: none;
                        padding: 6px 12px;
                        border-radius: 4px;
                        font-size: 12px;
                        font-weight: 600;
                        cursor: pointer;
                      ">Refresh Sekarang</button>
                      <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                        background: transparent;
                        color: white;
                        border: 1px solid rgba(255,255,255,0.3);
                        padding: 6px 12px;
                        border-radius: 4px;
                        font-size: 12px;
                        cursor: pointer;
                      ">Nanti</button>
                    </div>
                  </div>
                `;
                document.body.appendChild(updateNotification);
                
                // Auto remove after 10 seconds
                setTimeout(() => {
                  if (updateNotification.parentElement) {
                    updateNotification.remove();
                  }
                }, 10000);
              }
            });
          }
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Enable background sync jika didukung
if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
  console.log('Background sync supported');
}

// Request notification permission
if ('Notification' in window && 'serviceWorker' in navigator) {
  if (Notification.permission === 'default') {
    Notification.requestPermission().then((permission) => {
      console.log('Notification permission:', permission);
    });
  }
}