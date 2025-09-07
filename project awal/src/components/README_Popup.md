# Popup Template Components

Komponen popup template yang dapat digunakan kembali di seluruh aplikasi untuk menampilkan informasi dengan overlay yang mencegah scrolling halaman.

## Komponen yang Tersedia

### 1. PopupModal (Base Component)
Komponen dasar untuk membuat popup modal dengan berbagai konfigurasi.

#### Props:
- `isOpen` (boolean): Status popup terbuka/tertutup
- `onClose` (function): Fungsi untuk menutup popup
- `title` (string): Judul popup
- `children` (ReactNode): Konten popup
- `showCloseButton` (boolean): Tampilkan tombol close (default: true)
- `size` (string): Ukuran popup - 'sm' (max-w-xs), 'md' (max-w-sm), 'lg' (max-w-md), 'xl' (max-w-lg) (default: 'md')
- `type` (string): Tipe popup - 'default', 'success', 'warning', 'error', 'info' (default: 'default')

#### Contoh Penggunaan:
```jsx
import PopupModal from '../components/PopupModal';
import usePopup from '../hooks/usePopup';

const MyComponent = () => {
  const { isOpen, openPopup, closePopup } = usePopup();

  return (
    <>
      <button onClick={openPopup}>Buka Popup</button>
      
      <PopupModal
        isOpen={isOpen}
        onClose={closePopup}
        title="Judul Popup"
        size="md"
        type="info"
      >
        <p>Konten popup di sini...</p>
      </PopupModal>
    </>
  );
};
```

### 2. ScheduleDetailPopup
Komponen khusus untuk menampilkan detail jadwal pelajaran.

#### Props:
- `isOpen` (boolean): Status popup terbuka/tertutup
- `onClose` (function): Fungsi untuk menutup popup
- `scheduleData` (object): Data jadwal dengan struktur:
  ```javascript
  {
    subject: string,    // Mata pelajaran
    time: string,       // Waktu (jam mulai - jam selesai)
    room: string,       // Ruang kelas
    teacher: string,    // Nama pengajar
    material: string,   // Materi pelajaran
    status: string      // Status: 'Berlangsung', 'Akan Datang', 'Selesai'
  }
  ```

#### Contoh Penggunaan:
```jsx
import ScheduleDetailPopup from '../components/ScheduleDetailPopup';
import usePopup from '../hooks/usePopup';

const ScheduleComponent = () => {
  const { isOpen, openPopup, closePopup } = usePopup();
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    openPopup();
  };

  return (
    <>
      {/* Schedule items */}
      <div onClick={() => handleScheduleClick(scheduleData)}>
        {/* Schedule card */}
      </div>
      
      <ScheduleDetailPopup
        isOpen={isOpen}
        onClose={closePopup}
        scheduleData={selectedSchedule}
      />
    </>
  );
};
```

### 3. InfoPopup
Komponen untuk menampilkan informasi, peringatan, atau konfirmasi dengan ikon.

#### Props:
- `isOpen` (boolean): Status popup terbuka/tertutup
- `onClose` (function): Fungsi untuk menutup popup
- `title` (string): Judul popup
- `message` (string): Pesan yang ditampilkan
- `type` (string): Tipe popup - 'info', 'success', 'warning', 'error' (default: 'info')
- `showIcon` (boolean): Tampilkan ikon (default: true)
- `actionButton` (ReactNode): Tombol aksi tambahan (opsional)

#### Contoh Penggunaan:
```jsx
import InfoPopup from '../components/InfoPopup';
import usePopup from '../hooks/usePopup';

const MyComponent = () => {
  const { isOpen, openPopup, closePopup } = usePopup();

  const showSuccessMessage = () => {
    openPopup();
  };

  return (
    <>
      <button onClick={showSuccessMessage}>Tampilkan Sukses</button>
      
      <InfoPopup
        isOpen={isOpen}
        onClose={closePopup}
        title="Berhasil!"
        message="Data telah berhasil disimpan."
        type="success"
      />
    </>
  );
};
```

## Hook usePopup

Hook custom untuk mengelola state popup dengan mudah.

#### Return Values:
- `isOpen` (boolean): Status popup terbuka/tertutup
- `popupData` (any): Data yang disimpan saat membuka popup
- `openPopup(data)` (function): Fungsi untuk membuka popup dengan data opsional
- `closePopup()` (function): Fungsi untuk menutup popup
- `togglePopup(data)` (function): Fungsi untuk toggle popup

#### Contoh Penggunaan:
```jsx
import usePopup from '../hooks/usePopup';

const MyComponent = () => {
  const { isOpen, popupData, openPopup, closePopup } = usePopup();

  const handleItemClick = (item) => {
    openPopup(item); // Simpan data item saat membuka popup
  };

  return (
    <>
      {/* Component content */}
      <PopupModal isOpen={isOpen} onClose={closePopup}>
        {popupData && (
          <div>
            <h3>{popupData.title}</h3>
            <p>{popupData.description}</p>
          </div>
        )}
      </PopupModal>
    </>
  );
};
```

## Fitur Utama

1. **Prevent Body Scroll**: Otomatis mencegah scrolling halaman saat popup terbuka
2. **ESC Key Support**: Popup dapat ditutup dengan menekan tombol ESC
3. **Backdrop Click**: Popup dapat ditutup dengan mengklik area di luar popup
4. **Compact Design**: Tampilan yang ringkas dan tidak terlalu besar
5. **Responsive Design**: Mendukung berbagai ukuran layar dengan optimal
6. **Dark/Light Mode**: Otomatis mengikuti tema aplikasi
7. **Smooth Animations**: Animasi masuk dan keluar yang halus menggunakan Framer Motion
8. **Accessibility**: Mendukung ARIA labels dan keyboard navigation
9. **Reusable**: Dapat digunakan di berbagai komponen dengan mudah
10. **Mobile Optimized**: Dioptimalkan untuk tampilan mobile-first

## Tips Penggunaan

1. Selalu gunakan hook `usePopup` untuk mengelola state popup
2. Pastikan untuk menutup popup setelah aksi selesai
3. Gunakan tipe popup yang sesuai dengan konteks (info, success, warning, error)
4. Untuk popup dengan konten kompleks, buat komponen khusus seperti `ScheduleDetailPopup`
5. Jangan lupa menambahkan loading state jika popup menampilkan data dari API
6. **Gunakan ukuran 'sm' untuk konten ringkas** dan 'md' untuk konten standar
7. **Manfaatkan truncate class** untuk teks panjang agar tetap rapi
8. **Prioritaskan informasi penting** di bagian atas popup