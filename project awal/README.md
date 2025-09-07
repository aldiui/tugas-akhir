# 📱 WebApp Absensi CPMI - LPK Bahana Mega Prestasi

## 🎯 Deskripsi Project
WebApp Absensi & Pelatihan untuk **Calon Pekerja Migran Indonesia (CPMI)** yang menjalani pelatihan di LPK Bahana Mega Prestasi dengan tujuan penempatan ke Taiwan.

**Tahap 1**: Frontend-only prototype untuk presentasi visual dan demo internal.

## 🔧 Teknologi yang Digunakan

| Komponen | Teknologi |
|----------|----------|
| Framework | ReactJS (Functional Components) |
| Styling | Tailwind CSS (Dark + Light Mode) |
| Animasi | Framer Motion |
| Icons | Lucide React |
| Routing | React Router DOM |
| Maps UI | Google Maps Embed / Leaflet |
| Export | UI-only (dummy buttons) |

## 🎨 Design System

### 🌞 Light Mode
- **bg-body**: #F8FAFC
- **bg-card**: #FFFFFF
- **text-main**: #0F172A
- **text-secondary**: #475569
- **border**: #E2E8F0
- **button-primary**: #0F172A

### 🌙 Dark Mode
- **bg-body**: #0F172A
- **bg-card**: #1E293B
- **text-main**: #F8FAFC
- **text-secondary**: #CBD5E1
- **border**: #334155
- **button-primary**: #38BDF8

## 📁 Struktur Project

```
/src/
├── components/
│   ├── layout/
│   │   ├── NavBottom.jsx      # Bottom navigation
│   │   ├── MainHeader.jsx     # Dashboard header
│   │   └── BackHeader.jsx     # Detail page header
│   └── ui/
│       └── StatusBadge.jsx    # Status indicator component
├── contexts/
│   ├── ThemeContext.jsx       # Dark/Light mode
│   └── CPMIContext.jsx        # CPMI data management
├── data/
│   ├── dummy_cpmi_taiwan.json # Sample CPMI data
│   ├── dummy_jadwal.json      # Sample schedule data
│   └── dummy_absensi.json     # Sample attendance data
├── pages/
│   ├── Login.jsx              # Authentication page
│   └── dashboard/user_cpmi/
│       ├── Home.jsx           # Main dashboard
│       ├── Jadwal.jsx         # Daily schedule
│       ├── Pelajaran.jsx      # Lesson details
│       ├── Absensi.jsx        # Attendance history
│       ├── Chat.jsx           # Communication
│       ├── Profil.jsx         # Profile management
│       ├── PiketLaporan.jsx   # Duty reports
│       └── Notifikasi.jsx     # Notifications
└── App.jsx                    # Main routing
```

## 👤 Role: CPMI (Calon Pekerja Migran Indonesia)

### 🏠 Halaman Dashboard
1. **Login** - Form autentikasi dummy
2. **Home** - Dashboard utama dengan status dan tombol absen
3. **Jadwal** - Jadwal pelajaran harian
4. **Pelajaran** - Detail mata pelajaran hari ini
5. **Absensi** - Riwayat kehadiran pribadi
6. **Chat** - Komunikasi dengan pengajar/admin
7. **Profil** - Edit informasi pribadi
8. **Piket Laporan** - Laporan aktivitas harian (khusus status Piket)
9. **Notifikasi** - Pengumuman dan informasi

### 🔄 Status CPMI

| Status | Fitur Aktif |
|--------|-------------|
| **Aktif** | Semua fitur kecuali laporan piket |
| **Piket** | Chat, Profil, dan Laporan Piket saja |
| **Terbang** | Semua fitur dinonaktifkan (info keberangkatan) |
| **Izin** | Absen dinonaktifkan, fitur lain aktif |
| **Tidak Aktif** | Hanya Profil dan Info |

## 🚀 Cara Menjalankan Project

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn

### Instalasi
```bash
# Clone repository
git clone [repository-url]
cd blk

# Install dependencies
npm install

# Jalankan development server
npm start
```

Project akan berjalan di `http://localhost:3000`

## 📱 Fitur Utama

### ✅ Sudah Diimplementasi
- [x] Sistem autentikasi dummy
- [x] Dashboard responsif dengan status CPMI
- [x] Absensi masuk/pulang dengan validasi lokasi
- [x] Form alasan telat
- [x] Jadwal pelajaran harian
- [x] Detail mata pelajaran Taiwan
- [x] Riwayat absensi dengan filter
- [x] Chat dengan pengajar/admin
- [x] Edit profil lengkap
- [x] Laporan piket harian (khusus status Piket)
- [x] Notifikasi dan pengumuman
- [x] Dark/Light mode toggle
- [x] Bottom navigation mobile-first
- [x] Animasi transisi dengan Framer Motion

### 🎯 Konteks Taiwan
Semua dummy data dan konten disesuaikan dengan:
- Pelatihan bahasa Mandarin
- Budaya Taiwan
- Perawatan lansia
- Masakan Taiwan
- Persiapan interview
- Aktivitas magang di rumah majikan

## 🔧 Konfigurasi

### Theme Toggle
Aplikasi mendukung dark/light mode yang dapat diubah melalui toggle di header.

### Responsive Design
- Mobile-first approach
- Optimized untuk layar 375px - 1200px
- Bottom navigation untuk mobile
- Card-based layout

## 📝 Catatan Pengembangan

- **Frontend-only**: Tidak terhubung ke backend atau database
- **Dummy Data**: Semua data bersifat simulasi untuk demo
- **UI/UX Focus**: Prioritas pada pengalaman pengguna mobile
- **PWA-ready**: Struktur siap untuk Progressive Web App

## 🎨 Design Principles

1. **Mobile-First**: Dioptimalkan untuk penggunaan mobile
2. **Intuitive Navigation**: Bottom tab navigation yang familiar
3. **Consistent UI**: Design system yang konsisten
4. **Accessibility**: Mendukung dark mode dan readable fonts
5. **Performance**: Lightweight dan fast loading

## 📞 Support

Untuk pertanyaan atau dukungan teknis, hubungi tim pengembang LPK Bahana Mega Prestasi.

---

**© 2024 LPK Bahana Mega Prestasi - WebApp Absensi CPMI Taiwan**